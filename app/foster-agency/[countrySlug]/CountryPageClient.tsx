'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin } from 'lucide-react';

export default function CountryPageClient({ countryData }: { countryData: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCounty = searchParams.get("county");
  
  const { title, regions, counties, blocks } = countryData;

  // Stats data (this would typically come from the database)
  const stats = [
    { icon: Users, value: '120+', label: 'Fostering Agencies' },
    { icon: Clock, value: '30 days', label: 'Avg. Approval Time' },
    { icon: MapPin, value: `${counties.length}`, label: 'Counties' },
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

  // Handle county selection
  const handleCountySelect = (countySlug: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("county", countySlug);
    router.push(`?${params.toString()}`);
  };

  // Handle returning to country view
  const handleBackToCountry = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("county");
    router.push(`?${params.toString()}`);
  };

  // Find selected county data if a county is selected
  const selectedCountyData = selectedCounty 
    ? counties.find((county: any) => county.slug === selectedCounty)
    : null;

  return (
    <div className="w-full">
      {/* Country Hero */}
      <section className="py-16 bg-gradient-to-r from-brand-main to-blue-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {selectedCountyData ? selectedCountyData.title : title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {selectedCountyData 
                ? `Explore fostering opportunities in ${selectedCountyData.title}`
                : `Explore fostering opportunities in ${title}`}
            </p>
            {selectedCountyData && (
              <button 
                onClick={handleBackToCountry}
                className="bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors mb-6"
              >
                ← Back to {title}
              </button>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-accent text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
                {selectedCountyData 
                  ? `Find Fostering Agencies in ${selectedCountyData.title}`
                  : `Find Fostering Agencies in ${title}`}
              </button>
              <button className="bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors">
                Talk to a Support Advisor
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Chips */}
      {!selectedCountyData && (
        <section className="py-12 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center bg-brand-accentSoft rounded-full px-4 py-2"
                >
                  <stat.icon className="w-5 h-5 text-brand-accent mr-2" />
                  <span className="text-sm font-medium text-brand-dark">
                    {stat.value} {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* County / Region Cards or County Detail */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCountyData ? (
            // County Detail View
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  About {selectedCountyData.title}
                </h2>
                {selectedCountyData.summary && (
                  <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
                    {selectedCountyData.summary}
                  </p>
                )}
              </motion.div>
              
              {/* County Specific Content Would Go Here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-accentSoft rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-brand-dark mb-4">Fostering in {selectedCountyData.title}</h3>
                  <p className="text-neutral-700 mb-6">
                    {selectedCountyData.description || `Learn more about fostering opportunities in ${selectedCountyData.title}.`}
                  </p>
                  <button className="bg-brand-accent text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
                    Explore Agencies in {selectedCountyData.title}
                  </button>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                  <h3 className="text-2xl font-semibold text-brand-dark mb-4">Key Statistics</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-neutral-700">Approved Agencies</span>
                      <span className="font-semibold">24</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-neutral-700">Average Approval Time</span>
                      <span className="font-semibold">32 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-neutral-700">Active Carers</span>
                      <span className="font-semibold">180+</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Country Overview View
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Counties in {title}
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counties.map((county: any, index: number) => (
                  <motion.div
                    key={county.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => handleCountySelect(county.slug)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-brand-main group-hover:text-brand-accent transition-colors">
                          {county.title}
                        </h3>
                        {county.summary && (
                          <p className="text-neutral-700 mt-2 line-clamp-2">
                            {county.summary}
                          </p>
                        )}
                      </div>
                      <svg 
                        className="w-5 h-5 text-neutral-400 group-hover:text-brand-accent transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Conditional Sections - Only show when not viewing a specific county */}
      {!selectedCountyData && (
        <>
          {/* "Fostering Agencies in England" Highlight Section */}
          <section className="py-16 bg-brand-accentSoft w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Fostering Agencies in {title}
                </h2>
                <p className="text-xl text-brand-dark/80 mb-8 max-w-2xl mx-auto">
                  Discover verified fostering agencies in {title} that are committed to providing exceptional care and support.
                </p>
                <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors text-lg">
                  Browse Agencies
                </button>
              </motion.div>
            </div>
          </section>

          {/* "Why Fostering in England Matters" (3 Cards) */}
          <section className="py-16 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Why Fostering in {title} Matters
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Every Child Deserves Stability</h3>
                  <p className="text-neutral-700">
                    Providing a stable, loving home can transform a child's life and future prospects.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Your Meaningful Role</h3>
                  <p className="text-neutral-700">
                    As a foster carer, you play a crucial role in shaping a child's development and wellbeing.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Supported Journey</h3>
                  <p className="text-neutral-700">
                    You'll receive comprehensive training, ongoing support, and a dedicated team behind you.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* "Types of Fostering in England" (Numbered List) */}
          <section className="py-16 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Types of Fostering in {title}
                </h2>
              </motion.div>
              <div className="max-w-3xl mx-auto space-y-6">
                {fosteringTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start border-b border-neutral-200 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0">
                      {type.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-brand-dark mb-2">{type.title}</h3>
                      <p className="text-neutral-700">{type.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* "Support for Foster Carers" Section */}
          <section className="py-16 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Support for Foster Carers
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
                  >
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">{item.title}</h3>
                    <p className="text-neutral-700">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* England FAQ Section */}
          <section className="py-16 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                  Frequently Asked Questions
                </h2>
              </motion.div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Final CTA Band */}
      <section className="py-16 bg-brand-main w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {selectedCountyData 
                ? `Start Exploring Fostering Agencies in ${selectedCountyData.title}`
                : `Start Exploring Fostering Agencies in ${title}`}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Take the first step toward making a meaningful difference in a child's life.
            </p>
            <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors text-lg">
              Contact Us Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}