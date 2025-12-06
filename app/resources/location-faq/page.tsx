'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Home,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

// Mock data - would be replaced with API calls in production
const locationFAQs = [
  {
    id: '1',
    location: 'England',
    faqs: [
      {
        id: '1-1',
        question: 'How do I become a foster carer in England?',
        answer: 'To become a foster carer in England, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. Ofsted sets the standards for approval. The process typically takes 4-6 months and includes an application, assessments, training, and approval panel review.'
      },
      {
        id: '1-2',
        question: 'What financial support is available for foster carers in England?',
        answer: 'Foster carers in England receive a fostering allowance to cover the costs of caring for a child. The amount varies depending on the agency and the child\'s needs, typically ranging from £400-£600 per week per child. Additional payments may be available for special circumstances, holidays, and birthdays. Most agencies also provide professional indemnity insurance and pension contributions.'
      },
      {
        id: '1-3',
        question: 'What types of fostering are available in England?',
        answer: 'England offers various fostering opportunities including short-term (emergency/respite), long-term, parent and child, teenage, sibling groups, and specialized care for children with disabilities or complex needs. Each type requires different skills and commitment levels, and agencies provide specific training for specialized placements.'
      },
      {
        id: '1-4',
        question: 'Can single people foster in England?',
        answer: 'Yes, single people can foster in England. What matters most is your ability to provide a stable, loving home for a child in need. All applicants go through the same assessment and approval process regardless of marital status. Many successful foster carers are single parents, retirees, or professionals.'
      },
      {
        id: '1-5',
        question: 'How long does the fostering approval process take in England?',
        answer: 'The fostering approval process in England typically takes 4-6 months. This includes initial enquiry, formal application, home study assessment, background checks, training completion, and panel review. The timeline can vary based on individual circumstances and the specific agency. Some agencies offer fast-track processes for emergency placements.'
      }
    ]
  },
  {
    id: '2',
    location: 'Scotland',
    faqs: [
      {
        id: '2-1',
        question: 'What are the requirements to foster in Scotland?',
        answer: 'To foster in Scotland, you must be at least 21 years old, have a spare bedroom, pass PVG (Protecting Vulnerable Groups) checks, and complete comprehensive training. You can be single, married, in a civil partnership, or cohabiting. The Scottish Fostering Network and Social Care Scotland oversee standards. The process includes preparation, assessment, and approval stages.'
      },
      {
        id: '2-2',
        question: 'How much do foster carers earn in Scotland?',
        answer: 'Foster carers in Scotland receive a weekly fostering allowance that varies by local authority and placement type. Typical allowances range from £350-£500 per week per child. Additional payments may be available for special needs, birthdays, holidays, and clothing. Some local authorities also provide pension contributions and professional development opportunities.'
      },
      {
        id: '2-3',
        question: 'Are there different fostering services in Scotland?',
        answer: 'Scotland offers various fostering services including local authority, private/voluntary agencies, and self-employed foster carers. Each has different support structures and benefits. Local authority fostering typically provides more comprehensive support packages, while private agencies may offer more specialized placements. Self-employed fostering is less common but offers greater autonomy.'
      },
      {
        id: '2-4',
        question: 'Can I work and foster in Scotland?',
        answer: 'Yes, many foster carers in Scotland work full-time or part-time. However, you\'ll need to consider the flexibility required for meetings, training, and supporting the child\'s needs. Some fostering roles, particularly for babies or children with complex needs, may require more availability. Discuss your work situation during the application process.'
      },
      {
        id: '2-5',
        question: 'What support is available for foster carers in Scotland?',
        answer: 'Foster carers in Scotland receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Each local authority assigns a supervising social worker, and agencies provide additional support staff. Financial allowances, respite care, and professional development opportunities are also standard.'
      }
    ]
  },
  {
    id: '3',
    location: 'Wales',
    faqs: [
      {
        id: '3-1',
        question: 'What qualifications do I need to foster in Wales?',
        answer: 'No formal qualifications are required to foster in Wales, but you must complete the National Minimum Standards training program. This includes preparation sessions, assessment activities, and ongoing development. Many agencies also offer additional training in specialized areas like trauma-informed care, attachment theory, and behavior management. Previous parenting or childcare experience is beneficial but not mandatory.'
      },
      {
        id: '3-2',
        question: 'How does fostering differ in Wales compared to England?',
        answer: 'While the core principles are similar, Wales has some distinct differences: Welsh language support is more prominent, with many agencies offering bilingual services. The Care Council for Wales oversees registration and standards. Welsh Government funding formulas may result in slightly different allowance structures. Cultural considerations for Welsh heritage and traditions are emphasized in training.'
      },
      {
        id: '3-3',
        question: 'What is the role of the Care Inspectorate Wales?',
        answer: 'The Care Inspectorate Wales (CIW) regulates and inspects fostering services in Wales. They ensure agencies meet National Minimum Standards, investigate complaints, and monitor quality of care. CIW conducts regular inspections of fostering agencies and publishes reports. They also maintain the register of approved foster carers and investigate any concerns about fostering placements.'
      },
      {
        id: '3-4',
        question: 'Can I foster if I live in rural Wales?',
        answer: 'Yes, rural living can actually be advantageous for fostering in Wales. Many rural areas have a high need for foster carers, and agencies actively recruit in these regions. Travel arrangements for meetings and appointments are typically manageable, and rural settings often provide peaceful environments for children. Some agencies offer additional support for rural carers, including travel reimbursements.'
      },
      {
        id: '3-5',
        question: 'What happens after I\'m approved as a foster carer in Wales?',
        answer: 'After approval, you\'ll be matched with a child or young person based on your skills, experience, and preferences. You\'ll have a supervising social worker who provides ongoing support and regular visits. Continuous professional development is required, with training opportunities provided regularly. Annual reviews assess your continuing suitability, and you\'ll have access to 24/7 support for any placement challenges.'
      }
    ]
  }
];

export default function LocationFAQPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('England');

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const currentLocationFAQs = locationFAQs.find(loc => loc.location === selectedLocation)?.faqs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-ivory to-white">
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 font-body">
            <Link href="/" className="hover:text-primary-mint transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/resources" className="hover:text-primary-mint transition-colors">Resources</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-text-charcoal font-medium">Location FAQs</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <AnimatedSection>
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary-mint/15 rounded-full blur-3xl float-animation" />
            <div 
              className="absolute bottom-10 right-10 w-80 h-80 bg-primary-sky/15 rounded-full blur-3xl float-animation"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <HelpCircle className="w-4 h-4 text-primary-mint" />
                <span className="text-sm font-medium text-text-charcoal font-body">
                  Frequently Asked Questions
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-heading">
                Location-Specific Fostering FAQs
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-body">
                Find answers to common questions about fostering in different regions of the UK
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {locationFAQs.map((loc) => (
                  <GradientButton
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.location)}
                    variant={selectedLocation === loc.location ? 'default' : 'outline'}
                    className="px-6 py-2"
                  >
                    {loc.location}
                  </GradientButton>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Content */}
      <AnimatedSection delay={0.1}>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading mb-2 text-center">Frequently Asked Questions About Fostering in {selectedLocation}</h2>
              <p className="text-gray-600 text-center mb-12 font-body">
                Common questions and answers about becoming a foster carer in {selectedLocation}
              </p>
              
              <div className="space-y-4">
                {currentLocationFAQs.map((faq) => (
                  <GlassCard key={faq.id} className="rounded-xxl">
                    <details 
                      className="group p-6"
                      open={openFAQ === faq.id}
                      onToggle={() => toggleFAQ(faq.id)}
                    >
                      <summary className="list-none cursor-pointer flex justify-between items-center font-heading text-lg">
                        <span>{faq.question}</span>
                        <div className="ml-4 flex-shrink-0">
                          <svg 
                            className="w-5 h-5 text-primary-mint group-open:rotate-180 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </summary>
                      <div className="mt-4 text-gray-600 font-body">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </GlassCard>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <GradientButton asChild>
                  <Link href="/resources">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Resources
                  </Link>
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.2}>
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-mint/40 to-primary-sky/40" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-mint/30 rounded-full blur-3xl float-animation-slow" />
            <div 
              className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-sky/30 rounded-full blur-3xl float-animation-slow"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <GlassCard className="border-0 text-text-charcoal rounded-xxl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white drop-shadow-md">
                    Still Have Questions?
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-white/90 font-body">
                    Connect with our team for personalized guidance about fostering in your area
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GradientButton asChild size="lg" className="px-8 py-6 text-lg font-semibold">
                      <Link href="/contact">
                        Contact Us
                      </Link>
                    </GradientButton>
                    <GradientButton asChild size="lg" variant="outline" className="bg-white text-text-charcoal hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                      <Link href="/fostering-agencies-uk">
                        <BookOpen className="mr-2 w-5 h-5" />
                        Browse Agencies
                      </Link>
                    </GradientButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}