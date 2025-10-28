'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X, Zap, Crown, Building2, Rocket, CheckCircle2, AlertCircle } from 'lucide-react';

const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    icon: Building2,
    color: '#6B7280',
    features: [
      { text: 'Basic listing', included: true },
      { text: 'Contact information', included: true },
      { text: 'Up to 3 photos', included: true },
      { text: 'Standard support', included: true },
      { text: 'Priority placement', included: false },
      { text: 'Featured listing', included: false },
      { text: 'Analytics dashboard', included: false },
    ],
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 29,
    icon: Zap,
    color: '#E3B5A4',
    features: [
      { text: 'Enhanced listing', included: true },
      { text: 'Priority placement', included: true },
      { text: 'Up to 10 photos', included: true },
      { text: 'Multiple locations (3)', included: true },
      { text: 'Email support', included: true },
      { text: 'Featured listing', included: false },
      { text: 'Analytics dashboard', included: false },
    ],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 79,
    icon: Crown,
    color: '#773344',
    popular: true,
    features: [
      { text: 'Featured listing', included: true },
      { text: 'Top placement', included: true },
      { text: 'Unlimited photos', included: true },
      { text: 'Unlimited locations', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom branding', included: false },
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    icon: Rocket,
    color: '#773344',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Custom branding', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: '24/7 priority support', included: true },
    ],
  },
};

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [agency, setAgency] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard/subscription');
    } else if (status === 'authenticated') {
      fetchAgency();
    }

    // Check for success/cancel params
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    if (searchParams.get('canceled') === 'true') {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [status, searchParams, router]);

  const fetchAgency = async () => {
    try {
      const response = await fetch(`/api/agencies?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.agencies && data.agencies.length > 0) {
          setAgency(data.agencies[0]);
          setCurrentPlan(data.agencies[0].subscription_plan || 'free');
        }
      }
    } catch (error) {
      console.error('Error fetching agency:', error);
    }
  };

  const handleUpgrade = async (planId) => {
    if (planId === 'free' || planId === currentPlan) return;

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to open billing portal');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] via-white to-[#F5E9E2]/30">
      {/* Modern Hero Header */}
      <section className="relative overflow-hidden pt-32 pb-12">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Zap className="w-4 h-4 text-[#773344]" />
            <span className="text-sm font-medium text-[#2C2C2C]">Subscription Plans</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upgrade your agency listing to reach more families and grow your fostering services
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Success/Error Alerts */}
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Subscription activated successfully! Your plan has been upgraded.
            </AlertDescription>
          </Alert>
        )}

        {showError && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Checkout was canceled. You can try again anytime.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Plan Badge */}
        {currentPlan !== 'free' && (
          <div className="text-center mb-8">
            <Badge className="bg-[#773344] text-white px-6 py-2 text-lg">
              Current Plan: {PLANS[currentPlan]?.name}
            </Badge>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(PLANS).map(([planId, plan]) => {
            const Icon = plan.icon;
            const isCurrentPlan = planId === currentPlan;

            return (
              <Card 
                key={planId}
                className={`relative ${plan.popular ? 'border-2 border-[#773344] shadow-xl' : ''} ${
                  isCurrentPlan ? 'ring-2 ring-[#773344]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#773344]">Most Popular</Badge>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-600">Current Plan</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: plan.color }} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#2C2C2C]">
                      £{plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500">/month</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {planId === 'free' ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : isCurrentPlan ? (
                    <Button
                      variant="outline"
                      className="w-full glass border-2 hover:bg-white/50 rounded-xl"
                      onClick={handleManageSubscription}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Manage Subscription'}
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-[#773344] to-[#E3B5A4]"
                      onClick={() => handleUpgrade(planId)}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Upgrade Now'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <Card className="mt-12 glass-strong rounded-3xl">
          <CardHeader>
            <CardTitle>Need help choosing?</CardTitle>
            <CardDescription>
              All plans include basic features. Upgrade for priority placement and advanced tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What's included in all plans:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Agency profile page
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Contact information display
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Review system
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Search visibility
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Stripe integration requires API keys. Add your Stripe test keys to the .env file to enable payments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
