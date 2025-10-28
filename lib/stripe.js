import Stripe from 'stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic listing',
      'Contact information',
      'Up to 3 photos',
      'Standard support',
    ],
    limits: {
      photos: 3,
      locations: 1,
      featured: false,
    },
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'month',
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      'Enhanced listing',
      'Priority placement',
      'Up to 10 photos',
      'Multiple locations',
      'Email support',
    ],
    limits: {
      photos: 10,
      locations: 3,
      featured: false,
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 79,
    interval: 'month',
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      'Featured listing',
      'Top placement',
      'Unlimited photos',
      'Unlimited locations',
      'Analytics dashboard',
      'Priority support',
    ],
    limits: {
      photos: -1, // unlimited
      locations: -1, // unlimited
      featured: true,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    interval: 'month',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Everything in Premium',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      '24/7 priority support',
    ],
    limits: {
      photos: -1,
      locations: -1,
      featured: true,
    },
  },
};

// Helper to get plan details
export function getPlanDetails(planId) {
  return SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS.free;
}

// Helper to create checkout session
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata = {},
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return { success: false, error: error.message };
  }
}

// Helper to create customer portal session
export async function createPortalSession({ customerId, returnUrl }) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error('Stripe portal error:', error);
    return { success: false, error: error.message };
  }
}

// Helper to create or get Stripe customer
export async function getOrCreateCustomer({ email, name, metadata = {} }) {
  try {
    // Search for existing customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length > 0) {
      return { success: true, customer: customers.data[0] };
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata,
    });

    return { success: true, customer };
  } catch (error) {
    console.error('Stripe customer error:', error);
    return { success: false, error: error.message };
  }
}

// Helper to get subscription details
export async function getSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return { success: true, subscription };
  } catch (error) {
    console.error('Stripe subscription error:', error);
    return { success: false, error: error.message };
  }
}

// Helper to cancel subscription
export async function cancelSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return { success: true, subscription };
  } catch (error) {
    console.error('Stripe cancel error:', error);
    return { success: false, error: error.message };
  }
}
