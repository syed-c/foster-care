'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, MapPin } from 'lucide-react';
import CloseButton from '@/components/CountryPage/CloseButton';

type View = 
  | { type: 'country' }
  | { type: 'region'; slug: string };

export default function CountryPageClient({ countryData }: { countryData: any }) {
  const { title, regions, counties, blocks } = countryData;
  
  // Convert counties to regions for consistent data structure
  const regionsData = regions && regions.length > 0 ? regions : counties;
  
  const [view, setView] = useState<View>(() => {
    // Check if there's a hash in the URL on initial load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        return { type: 'region', slug: hash };
      }
    }
    return { type: 'country' };
  });
  
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Stats data (this would typically come from the database)
  const stats = [
    { icon: Users, value: '120+', label: 'Fostering Agencies' },
    { icon: Clock, value: '30 days', label: 'Avg. Approval Time' },
    { icon: MapPin, value: `${regionsData.length}`, label: 'Regions' },
  ];

  // Fostering types data (this would typically come from the database)
  const fosteringTypes = [
    { number: '1', title: 'Short-term Care', description: 'Providing temporary care while families address challenges.' },
    { number: '2', title: 'Long-term Care', description: 'Offering stable, permanent homes for children who cannot return to their birth families.' },
    { number: '3', title: 'Respite Care', description: 'Giving primary carers a planned break while ensuring continuity of care.' },
    { number: '4', title: 'Emergency Care', description: 'Responding immediately to protect children in crisis situations.' },
  ];

  // Support data (this would typically come from the database)
  const supportItems = [
    { title: 'Financial Support', description: 'Competitive allowances and benefits to support your fostering journey.' },
    { title: 'Training & Development', description: 'Comprehensive initial training and ongoing professional development.' },
    { title: 'Emotional & Practical Support', description: 'Access to support groups, therapy, and practical assistance.' },
    { title: '24/7 Emergency Assistance', description: 'Round-the-clock helpline for urgent matters and crisis support.' },
  ];

  // FAQ data (this would typically come from the database)
  const faqs = [
    { question: 'What are the requirements to become a foster carer?', answer: 'You must be over 21, financially stable, and able to provide a safe, nurturing environment. We welcome singles, couples, and people from all backgrounds.' },
    { question: 'How long does the approval process take?', answer: 'The process typically takes 4-6 months, including application, training, assessments, and panel review.' },
    { question: 'Can I work while being a foster carer?', answer: 'Yes, many foster carers work. However, you\'ll need flexible arrangements to attend meetings, training, and support your foster child\'s needs.' },
    { question: 'Will I get to choose the child I foster?', answer: 'We match children with carers based on compatibility, but you can express preferences regarding age, gender, and specific needs.' },
  ];

  // Handle region selection
  const handleRegionSelect = useCallback((regionSlug: string, element: HTMLDivElement) => {
    // Store the element's position for animation
    cardRefs.current[regionSlug] = element;
    
    // Update UI state first for instant animation
    setView({ type: 'region', slug: regionSlug });
    
    // Update URL hash without triggering navigation
    history.pushState(null, '', `#${regionSlug}`);
  }, []);

  // Handle returning to country view
  const handleBackToCountry = useCallback(() => {
    // Animate back
    setView({ type: 'country' });
    
    // Remove hash from URL
    history.pushState(null, '', window.location.pathname);
  }, []);

  // Handle popstate events (browser back/forward)
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setView({ type: 'region', slug: hash });
      } else {
        setView({ type: 'country' });
      }
    };
    
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Find selected region data if a region is selected
  const selectedRegionData = view.type === 'region' 
    ? regionsData.find((region: any) => region.slug === view.slug)
    : null;
  
  // Get region content if available
  const selectedRegionContent = view.type === 'region' 
    ? countryData.regionContent?.[view.slug]
    : null;

  return (
    <div className="w-full">
      {/* Header - stays consistent between views */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="site-container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-brand-main">
              {view.type === 'region' && selectedRegionData 
                ? selectedRegionData.title 
                : title}
            </h1>
            {view.type === 'region' && (
              <CloseButton onClick={handleBackToCountry} />
            )}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view.type === 'country' ? (
          // Country View
          <motion.main
            key="country"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            {/* Country Hero */}
            <section className="py-16 bg-gradient-to-r from-brand-main to-blue-900 w-full">
              <div className="site-container">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                    {title}
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                    {`Explore fostering opportunities in ${title}`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-brand-accent text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
                      {`Find Fostering Agencies in ${title}`}
                    </button>
                    <button className="bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors">
                      Talk to a Support Advisor
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Chips */}
            <section className="py-12 bg-white w-full">
              <div className="site-container">
                <div className="flex flex-wrap justify-center gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-brand-accentSoft rounded-full px-4 py-2"
                    >
                      <stat.icon className="w-5 h-5 text-brand-accent mr-2" />
                      <span className="text-sm font-medium text-brand-dark">
                        {stat.value} {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Regions Grid */}
            <section className="py-16 bg-white w-full">
              <div className="site-container">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Regions in {title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionsData.map((region: any) => (
                    <div 
                      key={region.id}
                      ref={(el) => { cardRefs.current[region.slug] = el; }}
                      onClick={(e) => handleRegionSelect(region.slug, e.currentTarget)}
                      className="bg-card-base rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-brand-blue group-hover:text-brand-blue/80 transition-colors">
                            {region.title}
                          </h3>
                          {region.summary && (
                            <p className="text-text-medium mt-2 line-clamp-2">
                              {region.summary}
                            </p>
                          )}
                        </div>
                        <svg 
                          className="w-5 h-5 text-neutral-400 group-hover:text-brand-blue transition-colors" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                      
                      {region.statsJson && (
                        <div className="mt-4 pt-4 border-t border-neutral-100">
                          <div className="flex flex-wrap gap-3">
                            {region.statsJson.population && (
                              <div className="text-sm">
                                <span className="font-medium text-text-dark">Population:</span> {region.statsJson.population.toLocaleString()}
                              </div>
                            )}
                            {region.statsJson.agencies && (
                              <div className="text-sm">
                                <span className="font-medium text-text-dark">Agencies:</span> {region.statsJson.agencies}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* "Fostering Agencies in England" Highlight Section */}
            <section className="py-16 bg-brand-accentSoft w-full">
              <div className="site-container text-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Fostering Agencies in {title}
                  </h2>
                  <p className="text-xl text-brand-dark/80 mb-8 max-w-2xl mx-auto">
                    Discover verified fostering agencies in {title} that are committed to providing exceptional care and support.
                  </p>
                  <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors text-lg">
                    Browse Agencies
                  </button>
                </div>
              </div>
            </section>

            {/* "Why Fostering in England Matters" (3 Cards) */}
            <section className="py-16 bg-white w-full">
              <div className="site-container">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Why Fostering in {title} Matters
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">Every Child Deserves Stability</h3>
                    <p className="text-neutral-700">
                      Providing a stable, loving home can transform a child's life and future prospects.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">Your Meaningful Role</h3>
                    <p className="text-neutral-700">
                      As a foster carer, you play a crucial role in shaping a child's development and wellbeing.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">Supported Journey</h3>
                    <p className="text-neutral-700">
                      You'll receive comprehensive training, ongoing support, and a dedicated team behind you.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* "Types of Fostering in England" (Numbered List) */}
            <section className="py-16 bg-white w-full">
              <div className="site-container">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Types of Fostering in {title}
                  </h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
                  {fosteringTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-start border-b border-neutral-200 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0">
                        {type.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-brand-dark mb-2">{type.title}</h3>
                        <p className="text-neutral-700">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* "Support for Foster Carers" Section */}
            <section className="py-16 bg-white w-full">
              <div className="site-container">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Support for Foster Carers
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
                    >
                      <h3 className="text-xl font-semibold text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-neutral-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* England FAQ Section */}
            <section className="py-16 bg-white w-full">
              <div className="site-container">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-neutral-200 rounded-2xl bg-white"
                    >
                      <button className="w-full text-left p-6 font-semibold text-brand-dark hover:bg-neutral-50 rounded-2xl transition-colors">
                        <div className="flex justify-between items-center">
                          <span>{faq.question}</span>
                          <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </button>
                      <div className="px-6 pb-6 text-neutral-700">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA Band */}
            <section className="py-16 bg-brand-main w-full">
              <div className="site-container text-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                    {`Start Exploring Fostering Agencies in ${title}`}
                  </h2>
                  <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                    Take the first step toward making a meaningful difference in a child's life.
                  </p>
                  <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors text-lg">
                    Contact Us Today
                  </button>
                </div>
              </div>
            </section>
          </motion.main>
        ) : (
          // Region View
          <motion.main
            key="region"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45 }}
            className="w-full"
          >
            {selectedRegionData && (
              <div className="site-container py-8">
                {/* Region Header */}
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                    {selectedRegionData.title}
                  </h1>
                  {selectedRegionData.summary && (
                    <p className="text-xl text-gray-600">
                      {selectedRegionData.summary}
                    </p>
                  )}
                </header>

                {/* ABOUT SECTION */}
                {selectedRegionContent?.about && (
                  <section className="mb-10">
                    <p className="text-gray-700 leading-7">{selectedRegionContent.about}</p>
                  </section>
                )}

                {/* WHY SECTION */}
                {selectedRegionContent?.why && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Why Fostering in {selectedRegionData?.title} Matters</h2>
                    <p className="text-gray-700 leading-7">{selectedRegionContent.why}</p>
                  </section>
                )}

                {/* TYPES OF FOSTERING */}
                {selectedRegionContent?.types && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Types of Fostering</h2>
                    <ul className="space-y-4">
                      {selectedRegionContent.types.map((t: string, i: number) => (
                        <li key={i} className="p-4 bg-gray-50 rounded-md border">{t}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* SUPPORT SECTION */}
                {selectedRegionContent?.support && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">Support for Foster Carers</h2>
                    <ul className="space-y-4">
                      {selectedRegionContent.support.map((t: string, i: number) => (
                        <li key={i} className="p-4 bg-gray-50 rounded-md border">{t}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* FAQ */}
                {selectedRegionContent?.faq && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
                    <ul className="space-y-4">
                      {selectedRegionContent.faq.map((f: any, i: number) => (
                        <li key={i} className="p-4 bg-gray-50 rounded-md border">
                          <strong>{f.q}</strong>
                          <p className="text-gray-700 mt-2">{f.a}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Stats Section */}
                {selectedRegionData.statsJson && (
                  <section className="mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {selectedRegionData.statsJson.population && (
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                          <div className="text-3xl font-bold text-brand-accent mb-2">
                            {selectedRegionData.statsJson.population.toLocaleString()}
                          </div>
                          <div className="text-gray-600">Population</div>
                        </div>
                      )}
                      {selectedRegionData.statsJson.agencies && (
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                          <div className="text-3xl font-bold text-brand-accent mb-2">
                            {selectedRegionData.statsJson.agencies}
                          </div>
                          <div className="text-gray-600">Foster Agencies</div>
                        </div>
                      )}
                      {selectedRegionData.statsJson.averageAllowance && (
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                          <div className="text-3xl font-bold text-brand-accent mb-2">
                            {selectedRegionData.statsJson.averageAllowance}
                          </div>
                          <div className="text-gray-600">Average Allowance</div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Long Description */}
                {selectedRegionData.longHtml && (
                  <section className="mb-12 prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedRegionData.longHtml }} />
                  </section>
                )}

                {/* FAQ Section from region data */}
                {selectedRegionData.faqJson && selectedRegionData.faqJson.length > 0 && !selectedRegionContent?.faq && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {selectedRegionData.faqJson.map((faq: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <button className="w-full text-left p-6 font-semibold text-brand-dark hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex justify-between items-center">
                              <span>{faq.question}</span>
                              <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </button>
                          <div className="px-6 pb-6 text-gray-600">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* CTA */}
                <div className="bg-green-100 p-8 rounded-xl text-center">
                  <h3 className="text-xl font-semibold mb-3">
                    Start Exploring Fostering Agencies in {selectedRegionData?.title}
                  </h3>
                  <button className="bg-green-600 text-white py-2 px-6 rounded-md">
                    Contact Local Agencies
                  </button>
                </div>
              </div>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}