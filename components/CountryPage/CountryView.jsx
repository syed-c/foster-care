'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountyCard from './CountyCard.jsx';
import CloseButton from './CloseButton.jsx';

export default function CountryView({ countryData }) {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const countyRefs = useRef({});

  // Set up CMS-ready content structure
  const countryContent = {
    hero: {
      title: countryData.title,
      subtitle: `Explore fostering opportunities in ${countryData.title}`
    },
    whyFostering: {
      title: "Why Fostering Matters",
      items: []
    },
    agencyTypes: {
      title: "Agency Types",
      items: []
    },
    typesOfFostering: {
      title: "Types of Fostering",
      items: []
    },
    support: {
      title: "Support Information",
      description: "",
      items: []
    },
    faq: {
      title: "Frequently Asked Questions",
      items: []
    },
    cta: {
      title: "Ready to Make a Difference?",
      subtitle: "Join our community of foster families changing lives across the country.",
      ctaText: "Contact Agencies"
    }
  };

  // Populate content from blocks
  countryData.blocks.forEach(block => {
    switch (block.type) {
      case 'whyFosteringMatters':
        countryContent.whyFostering.items = block.content_json?.items || [];
        break;
      case 'agencyTypes':
        countryContent.agencyTypes.items = block.content_json?.items || [];
        break;
      case 'typesOfFostering':
        countryContent.typesOfFostering.items = block.content_json?.items || [];
        break;
      case 'supportInfo':
        countryContent.support.title = block.content_json?.title || "";
        countryContent.support.description = block.content_json?.description || "";
        countryContent.support.items = block.content_json?.items || [];
        break;
      case 'faq':
        countryContent.faq.items = block.content_json?.items || [];
        break;
      case 'cta':
        countryContent.cta.title = block.content_json?.title || "";
        countryContent.cta.subtitle = block.content_json?.subtitle || "";
        countryContent.cta.ctaText = block.content_json?.ctaText || "";
        break;
    }
  });

  const handleSelectCounty = (county) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const convertedCounty = {
      id: county.id,
      regionId: county.region_id,
      slug: county.slug,
      title: county.title,
      summary: county.summary,
      longHtml: county.long_html || undefined,
      heroImage: county.hero_image || undefined,
      statsJson: county.stats_json,
      faqJson: county.faq_json,
      order: county.order || undefined,
      createdAt: new Date(county.created_at),
      updatedAt: new Date(county.updated_at)
    };
    setSelectedCounty(convertedCounty);
    
    // Animation duration should match the Framer Motion transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleCloseCounty = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animation duration should match the Framer Motion transition
    setTimeout(() => {
      setSelectedCounty(null);
      setIsAnimating(false);
    }, 300);
  };

  const country = countryData;

  return (
    <div className="min-h-screen bg-background-default">
      {/* Country Content */}
      <AnimatePresence mode="wait">
        {!selectedCounty ? (
          <motion.div
            key="country-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section className="w-full bg-brand-blue text-white py-16">
              <div className="max-w-[80vw] xl:max-w-[1100px] mx-auto px-4 text-center">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {countryContent.hero.title}
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-brand-white/80 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {countryContent.hero.subtitle}
                </motion.p>
              </div>
            </section>

            <div className="max-w-[80vw] xl:max-w-[1100px] mx-auto px-4 py-12">
              {/* Intro Block */}
              {country.blocks.find(block => block.type === 'intro') && (
                <motion.section 
                  className="mb-12 prose max-w-none bg-background-soft p-8 rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: country.blocks.find(block => block.type === 'intro')?.content_json?.html || '' 
                    }} 
                  />
                </motion.section>
              )}

              {/* Counties Grid */}
              <section className="mb-16">
                <motion.h2 
                  className="text-3xl font-bold mb-8 text-center text-brand-blue"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Counties in {country.title}
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.counties.map((county) => (
                    <div 
                      key={county.id} 
                      ref={(el) => { countyRefs.current[county.id] = el; }}
                    >
                      <CountyCard 
                        county={{
                          id: county.id,
                          regionId: county.region_id,
                          slug: county.slug,
                          title: county.title,
                          summary: county.summary,
                          longHtml: county.long_html || undefined,
                          heroImage: county.hero_image || undefined,
                          statsJson: county.stats_json,
                          faqJson: county.faq_json,
                          order: county.order || undefined,
                          createdAt: new Date(county.created_at),
                          updatedAt: new Date(county.updated_at)
                        }} 
                        onSelect={() => handleSelectCounty(county)}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Fostering Matters */}
              {countryContent.whyFostering.items.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-brand-blue">
                    {countryContent.whyFostering.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {countryContent.whyFostering.items.map((item, idx) => (
                      <div key={idx} className="bg-card-base p-6 rounded-2xl shadow-sm border border-neutral-100">
                        <h3 className="text-xl font-semibold mb-3 text-brand-blue">{item.title}</h3>
                        <p className="text-text-medium">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Agency Types */}
              {countryContent.agencyTypes.items.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-brand-blue">
                    {countryContent.agencyTypes.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {countryContent.agencyTypes.items.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-background-soft p-6 rounded-2xl">
                        <div className="bg-brand-blue/10 rounded-full p-3 mr-4">
                          <div className="bg-brand-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-brand-blue">{item.title}</h3>
                          <p className="text-text-medium">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Types of Fostering */}
              {countryContent.typesOfFostering.items.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-brand-blue">
                    {countryContent.typesOfFostering.title}
                  </h2>
                  <div className="space-y-6">
                    {countryContent.typesOfFostering.items.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-card-base p-6 rounded-2xl shadow-sm border border-neutral-100">
                        <div className="bg-brand-blue/10 rounded-full p-3 mr-4">
                          <div className="bg-brand-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-brand-blue">{item.title}</h3>
                          <p className="text-text-medium">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Support Info */}
              {countryContent.support.items.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-3xl font-bold mb-4 text-center text-brand-blue">
                    {countryContent.support.title}
                  </h2>
                  <p className="text-text-medium text-center mb-8 max-w-2xl mx-auto">
                    {countryContent.support.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {countryContent.support.items.map((item, idx) => (
                      <div key={idx} className="flex items-center bg-card-base p-4 rounded-2xl shadow-sm border border-neutral-100">
                        <div className="bg-brand-blue/10 rounded-full p-2 mr-3">
                          <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-text-dark">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* FAQ */}
              {countryContent.faq.items.length > 0 && (
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-center text-brand-blue">
                    {countryContent.faq.title}
                  </h2>
                  <div className="max-w-3xl mx-auto space-y-4">
                    {countryContent.faq.items.map((item, idx) => (
                      <div key={idx} className="border border-neutral-200 rounded-2xl p-6 bg-card-base">
                        <h3 className="text-lg font-semibold mb-2 text-brand-blue">{item.question}</h3>
                        <p className="text-text-medium">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Final CTA */}
              <motion.section
                className="mb-16 text-center bg-gradient-to-r from-brand-blue to-brand-blue/90 text-white p-12 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-3xl font-bold mb-4">{countryContent.cta.title}</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-brand-white/90">
                  {countryContent.cta.subtitle}
                </p>
                <button 
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-white text-brand-blue hover:bg-neutral-100 transition-colors"
                >
                  {countryContent.cta.ctaText}
                </button>
              </motion.section>
            </div>
          </motion.div>
        ) : (
          /* County Detail View */
          <motion.div
            key="county-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            {/* Close Button */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
              <div className="max-w-[80vw] xl:max-w-[1100px] mx-auto px-4 py-4 flex justify-end">
                <CloseButton onClick={handleCloseCounty} className="p-2 rounded-full hover:bg-neutral-100 transition-colors" />
              </div>
            </div>

            <div className="max-w-[80vw] xl:max-w-[1100px] mx-auto px-4 py-8">
              {/* County Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                  {selectedCounty.title}
                </h1>
                {selectedCounty.summary && (
                  <p className="text-xl text-text-medium">
                    {selectedCounty.summary}
                  </p>
                )}
              </header>

              {/* Stats Section */}
              {selectedCounty.statsJson && (
                <section className="mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {selectedCounty.statsJson.population && (
                      <div className="bg-background-soft p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-brand-blue mb-2">
                          {selectedCounty.statsJson.population.toLocaleString()}
                        </div>
                        <div className="text-text-medium">Population</div>
                      </div>
                    )}
                    {selectedCounty.statsJson.agencies && (
                      <div className="bg-background-soft p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-brand-blue mb-2">
                          {selectedCounty.statsJson.agencies}
                        </div>
                        <div className="text-text-medium">Foster Agencies</div>
                      </div>
                    )}
                    {selectedCounty.statsJson.averageAllowance && (
                      <div className="bg-background-soft p-6 rounded-2xl text-center">
                        <div className="text-3xl font-bold text-brand-blue mb-2">
                          {selectedCounty.statsJson.averageAllowance}
                        </div>
                        <div className="text-text-medium">Average Allowance</div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Long Description */}
              {selectedCounty.longHtml && (
                <section className="mb-12 prose max-w-none bg-background-soft p-8 rounded-2xl">
                  <div dangerouslySetInnerHTML={{ __html: selectedCounty.longHtml }} />
                </section>
              )}

              {/* FAQ Section */}
              {selectedCounty.faqJson && selectedCounty.faqJson.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-text-dark mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {selectedCounty.faqJson.map((faq, index) => (
                      <div key={index} className="border border-neutral-200 rounded-2xl bg-card-base">
                        <button className="w-full text-left p-6 font-semibold text-text-dark hover:bg-neutral-50 rounded-2xl transition-colors">
                          <div className="flex justify-between items-center">
                            <span>{faq.question}</span>
                            <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </button>
                        <div className="px-6 pb-6 text-text-medium">
                          <p>{faq.answer}</p>
                          {faq.link && (
                            <a href={faq.link} className="text-brand-blue hover:underline mt-2 inline-block">
                              Learn more →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section className="py-12 text-center bg-brand-blue/5 rounded-2xl">
                <h2 className="text-2xl font-bold text-text-dark mb-4">
                  Interested in Fostering in {selectedCounty.title}?
                </h2>
                <p className="text-text-medium mb-6 max-w-2xl mx-auto">
                  Connect with local agencies and start your fostering journey today.
                </p>
                <button 
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-opacity"
                >
                  Contact Local Agencies
                </button>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}