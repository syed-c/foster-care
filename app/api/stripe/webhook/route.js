import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// This needs to be configured in Stripe Dashboard
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!webhookSecret) {
    console.error('Webhook secret not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update agency subscription status
        await supabaseAdmin
          .from('agencies')
          .update({
            subscription_plan: session.metadata.planId,
            subscription_status: 'active',
            stripe_subscription_id: session.subscription,
            subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
          .eq('id', session.metadata.agencyId);

        console.log('Subscription activated:', session.metadata.agencyId);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Update subscription status
        const status = subscription.status === 'active' ? 'active' : 
                      subscription.status === 'canceled' ? 'canceled' : 'inactive';

        await supabaseAdmin
          .from('agencies')
          .update({
            subscription_status: status,
            subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log('Subscription updated:', subscription.id, status);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Downgrade to free plan
        await supabaseAdmin
          .from('agencies')
          .update({
            subscription_plan: 'free',
            subscription_status: 'canceled',
            stripe_subscription_id: null,
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log('Subscription canceled:', subscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        
        // Mark subscription as past_due
        await supabaseAdmin
          .from('agencies')
          .update({
            subscription_status: 'past_due',
          })
          .eq('stripe_customer_id', invoice.customer);

        console.log('Payment failed for customer:', invoice.customer);
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
