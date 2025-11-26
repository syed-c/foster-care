import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { createPortalSession } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get agency with Stripe customer ID
    const { data: agencies } = await supabaseAdmin
      .from('agencies')
      .select('stripe_customer_id')
      .eq('user_id', session.user.id)
      .limit(1);

    if (!agencies || agencies.length === 0 || !agencies[0].stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Create portal session
    const portalResult = await createPortalSession({
      customerId: agencies[0].stripe_customer_id,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/subscription`,
    });

    if (!portalResult.success) {
      return NextResponse.json({ error: portalResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: portalResult.url });

  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
