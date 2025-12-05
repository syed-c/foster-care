// Test page for region template
import { Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import RegionSectionRenderer from '@/components/sections/RegionSectionRenderer';

export default function TestRegionPage() {
  // Mock region data with all required sections
  const mockRegionData = {
    sections: [
      {
        type: 'breadcrumb',
        key: 'breadcrumb',
        data: {
          items: [
            { label: 'Home', href: '/' },
            { label: 'Foster Agencies', href: '/foster-agency' },
            { label: 'England', href: '/foster-agency/england' },
            { label: 'Worcestershire', href: '#' }
          ]
        }
      },
      {
        type: 'hero',
        key: 'hero',
        data: {
          heading: 'Foster Agencies in Worcestershire',
          subheading: 'Find accredited foster agencies in Worcestershire',
          cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
          cta_secondary: { text: 'Explore Cities', link: '#cities' }
        }
      },
      {
        type: 'about',
        key: 'about',
        data: {
          title: 'About Fostering in Worcestershire',
          body: '<p>Welcome to our directory of foster agencies in Worcestershire. We\'ve compiled a list of accredited and trusted agencies to help you start your fostering journey.</p><p>Worcestershire offers diverse fostering opportunities with strong community support networks. The region has a significant need for dedicated foster carers to provide stable, loving homes for children in care.</p>'
        }
      },
      {
        type: 'benefitsSupport',
        key: 'benefitsSupport',
        data: {
          title: 'Benefits and Support for Foster Carers in Worcestershire',
          description: 'Comprehensive support system for foster carers in Worcestershire',
          items: [
            {
              title: 'Financial Support',
              description: 'Receive competitive fostering allowances to cover the costs of caring for a child.'
            },
            {
              title: 'Additional Payments',
              description: 'Additional payments for special circumstances.'
            }
          ]
        }
      },
      {
        type: 'popularCities',
        key: 'popularCities',
        data: {
          title: 'Popular Cities in Worcestershire',
          description: 'Explore fostering opportunities in key cities across Worcestershire',
          cities: [
            { 
              name: 'Worcester', 
              link: '#', 
              population: '100,000+', 
              reason: 'The heart of Worcestershire with excellent fostering opportunities and strong community support.' 
            },
            { 
              name: 'Redditch', 
              link: '#', 
              population: '85,000+', 
              reason: 'Growing area with increasing demand for foster carers to support local children.' 
            },
            { 
              name: 'Kidderminster', 
              link: '#', 
              population: '55,000+', 
              reason: 'Established fostering community with comprehensive support services for carers.' 
            }
          ]
        }
      },
      {
        type: 'allowances',
        key: 'allowances',
        data: {
          title: 'Foster Allowances & Support in Worcestershire',
          description: 'Comprehensive support system for foster carers in Worcestershire',
          allowances: [
            {
              title: 'Weekly fostering allowances to cover child care costs',
              description: 'Receive weekly fostering allowances to cover the costs of caring for a child.'
            },
            {
              title: 'Additional payments for special circumstances',
              description: 'Additional payments for special circumstances.'
            },
            {
              title: 'Holiday pay and special occasion support',
              description: 'Extra allowance for holiday periods and special occasions.'
            }
          ]
        }
      },
      {
        type: 'testimonials',
        key: 'testimonials',
        data: {
          title: 'Hear From Foster Carers in Worcestershire',
          testimonials: [
            {
              name: 'Sarah & James',
              location: 'Worcester',
              quote: 'Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.',
              rating: 5
            },
            {
              name: 'Emma Thompson',
              location: 'Redditch',
              quote: 'As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.',
              rating: 5
            },
            {
              name: 'Michael Davies',
              location: 'Kidderminster',
              quote: 'The process was straightforward and the support from both the platform and the agency was exceptional. We\'re now fostering two amazing children.',
              rating: 5
            }
          ]
        }
      },
      {
        type: 'faq',
        key: 'faq',
        data: {
          title: 'Frequently Asked Questions About Fostering in Worcestershire',
          description: 'Get answers to common questions about becoming a foster carer in Worcestershire',
          faqs: [
            {
              question: 'How many foster families are needed in Worcestershire?',
              answer: 'Worcestershire has a continuous need for foster families to provide care for children and young people. The exact number varies based on local demand, but there is always a need for dedicated carers who can provide stable, loving homes.'
            },
            {
              question: 'Who can foster a child in Worcestershire?',
              answer: 'To foster in Worcestershire, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. Ofsted sets the standards for approval.'
            },
            {
              question: 'Can single people foster in Worcestershire?',
              answer: 'Yes, single people can foster in Worcestershire. What matters most is your ability to provide a stable, loving home for a child in need. All applicants go through the same assessment and approval process regardless of marital status.'
            },
            {
              question: 'What support is available for foster carers in Worcestershire?',
              answer: 'Foster carers in Worcestershire receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care.'
            }
          ]
        }
      },
      {
        type: 'trustBar',
        key: 'trustBar',
        data: {
          title: 'Regulated & Trusted by UK Authorities',
          authorityName: 'Ofsted',
          authorityUrl: 'https://www.ofsted.gov.uk',
          ofstedNote: 'All agencies meet strict regulatory standards',
          safeguardingNote: 'Comprehensive safeguarding policies in place'
        }
      },
      {
        type: 'finalCta',
        key: 'finalCta',
        data: {
          title: 'Ready to Start Your Fostering Journey?',
          subtitle: 'Take the first step towards making a difference in a child\'s life in Worcestershire',
          primaryCta: { label: 'Talk to a Foster Advisor', href: '/contact' },
          secondaryCta: { label: 'Download Information Pack', href: '#' }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background-offwhite">
      <div className="container mx-auto px-4 py-8">
        <Card className="rounded-modern-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Region Template Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This page demonstrates the new region template structure with all 10 required sections.</p>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Template Sections:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                <li>Breadcrumb with schema</li>
                <li>Hero Section: H1, subtitle, CTA</li>
                <li>About Fostering in Region</li>
                <li>Benefits and Support for Foster Carers</li>
                <li>Popular Cities in Region</li>
                <li>Foster Allowances & Agency Support Info</li>
                <li>Testimonials / Local Voices</li>
                <li>Region-Specific FAQs (with FAQ Schema)</li>
                <li>Local Authorities & Regulation Trust Bar</li>
                <li>Final CTA Section</li>
              </ol>
            </div>
            
            <div className="flex gap-4 mb-6">
              <Button asChild>
                <Link href="/foster-agency/england/worcestershire">
                  View Real Region Page
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/pages-editor">
                  Edit in CMS
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Render the mock region sections */}
        <div className="mt-8">
          {mockRegionData.sections.map((section) => (
            <RegionSectionRenderer 
              key={section.key} 
              section={section} 
              regionSlug="worcestershire"
            />
          ))}
        </div>
      </div>
    </div>
  );
}