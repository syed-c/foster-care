import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createCheckoutSession, getOrCreateCustomer, SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId || !SUBSCRIPTION_PLANS[planId]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const plan = SUBSCRIPTION_PLANS[planId];

    if (!plan.priceId) {
      return NextResponse.json({ error: 'Price ID not configured' }, { status: 400 });
    }

    // Get or create Stripe customer
    const customerResult = await getOrCreateCustomer({
      email: session.user.email,
      name: session.user.name,
      metadata: {
        userId: session.user.id,
      },
    });

    if (!customerResult.success) {
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }

    // Get agency to update with customer ID
    const { data: agencies } = await supabaseAdmin
      .from('agencies')
      .select('id')
      .eq('user_id', session.user.id)
      .limit(1);

    if (!agencies || agencies.length === 0) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    // Update agency with Stripe customer ID
    await supabaseAdmin
      .from('agencies')
      .update({ stripe_customer_id: customerResult.customer.id })
      .eq('id', agencies[0].id);

    // Create checkout session
    const checkoutResult = await createCheckoutSession({
      customerId: customerResult.customer.id,
      priceId: plan.priceId,
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subscription?canceled=true`,
      metadata: {
        userId: session.user.id,
        agencyId: agencies[0].id,
        planId: plan.id,
      },
    });

    if (!checkoutResult.success) {
      return NextResponse.json({ error: checkoutResult.error }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      sessionId: checkoutResult.sessionId,
      url: checkoutResult.url 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
