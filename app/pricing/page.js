import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight, DollarSign, CreditCard, Users, Heart } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "£0",
      period: "forever",
      description: "Perfect for individuals starting their fostering journey",
      features: [
        "Access to agency directory",
        "Basic search filters",
        "Email support",
        "Community forum access",
        "Monthly newsletter"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "£29",
      period: "per month",
      description: "Ideal for foster carers seeking comprehensive support",
      features: [
        "Everything in Basic",
        "Advanced search filters",
        "Priority email support",
        "Exclusive resources",
        "Webinar access",
        "Personalized agency recommendations"
      ],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Agency",
      price: "£99",
      period: "per month",
      description: "For fostering agencies managing multiple carers",
      features: [
        "Everything in Professional",
        "Unlimited agency listings",
        "Carer management dashboard",
        "24/7 dedicated support",
        "Custom reporting",
        "API access",
        "White-label options"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer special pricing for registered non-profit fostering agencies. Please contact our sales team for more information."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, and American Express. We also support bank transfers for annual subscriptions."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the subscription price listed."
    }
  ];

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green to-secondary-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Choose the perfect plan for your fostering journey. All plans include our core features with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`rounded-modern-xl overflow-hidden relative ${plan.popular ? 'ring-2 ring-primary-green scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-green text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-primary-green mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary-green hover:bg-primary-green/90' : ''}`}
                    asChild
                  >
                    <Link href="/contact">{plan.cta} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These essential features are available in every plan to support your fostering journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Guidance</h3>
              <p className="text-gray-600">
                Comprehensive information about fostering allowances and financial support
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Access</h3>
              <p className="text-gray-600">
                Connect with other foster carers and share experiences in our private community
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Access to emergency support helpline and professional guidance whenever you need it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing plans
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have more questions? We're here to help.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Our Team <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}