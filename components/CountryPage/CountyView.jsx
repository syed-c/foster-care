'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CountyView({ county, onClose, initialPosition }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          x: initialPosition.x,
          y: initialPosition.y,
          width: initialPosition.width,
          height: initialPosition.height,
          borderRadius: '0.75rem', // tailwind rounded-xl
        }}
        animate={{
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,
        }}
        exit={{
          x: initialPosition.x,
          y: initialPosition.y,
          width: initialPosition.width,
          height: initialPosition.height,
          borderRadius: '0.75rem',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="fixed inset-0 z-50 bg-white overflow-y-auto"
      >
        {/* Close Button */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="site-container py-4 flex justify-end">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close county view"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="site-container py-8">
          {/* County Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4">
              {county.title}
            </h1>
            {county.summary && (
              <p className="text-xl text-gray-600">
                {county.summary}
              </p>
            )}
          </header>

          {/* Stats Section */}
          {county.statsJson && (
            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {county.statsJson.population && (
                  <div className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {county.statsJson.population.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Population</div>
                  </div>
                )}
                {county.statsJson.agencies && (
                  <div className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {county.statsJson.agencies}
                    </div>
                    <div className="text-gray-600">Foster Agencies</div>
                  </div>
                )}
                {county.statsJson.averageAllowance && (
                  <div className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {county.statsJson.averageAllowance}
                    </div>
                    <div className="text-gray-600">Average Allowance</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Long Description */}
          {county.longHtml && (
            <section className="mb-12 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: county.longHtml }} />
            </section>
          )}

          {/* FAQ Section */}
          {county.faqJson && county.faqJson.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-text-charcoal mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {county.faqJson.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button className="w-full text-left p-6 font-semibold text-text-charcoal hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex justify-between items-center">
                        <span>{faq.question}</span>
                        <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* CTA Section */}
          <section className="py-12 text-center bg-primary-green/5 rounded-xl">
            <h2 className="text-2xl font-bold text-text-charcoal mb-4">
              Interested in Fostering in {county.title}?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Connect with local agencies and start your fostering journey today.
            </p>
            <button className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-4 text-lg font-semibold rounded-xl transition-opacity">
              Contact Local Agencies
            </button>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}