'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ClipboardCheck, Home, Users, Award, Heart } from 'lucide-react';

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 1,
      title: "Initial Inquiry",
      description: "Reach out to us with your interest in fostering. We'll schedule a no-obligation chat to answer your questions.",
      icon: <UserCheck className="w-8 h-8" />,
      duration: "15-30 mins"
    },
    {
      id: 2,
      title: "Pre-Approval Assessment",
      description: "Complete our comprehensive assessment including background checks, references, and home visit.",
      icon: <ClipboardCheck className="w-8 h-8" />,
      duration: "4-6 weeks"
    },
    {
      id: 3,
      title: "Approval & Matching",
      description: "Once approved, we'll match you with a child whose needs align with your family situation.",
      icon: <Users className="w-8 h-8" />,
      duration: "2-4 weeks"
    },
    {
      id: 4,
      title: "Placement & Support",
      description: "Begin your fostering journey with ongoing support from our dedicated team and regular check-ins.",
      icon: <Home className="w-8 h-8" />,
      duration: "Ongoing"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-white/30 blur-3xl"
        animate={{ 
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
        animate={{ 
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white text-brand-blue mb-8 border border-brand-blue">
              <Award className="w-5 h-5" />
              <span className="text-base font-medium font-body">Simple Process</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Your Fostering <span className="text-brand-blue">Journey</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              We guide you through every step with compassion, expertise, and unwavering support
            </p>
          </motion.div>
          
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue to-brand-blue/30 transform -translate-x-1/2"></div>
              
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                    <div className="bg-brand-blue text-white rounded-3xl p-6 shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center font-bold text-lg">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-bold font-heading">{step.title}</h3>
                      </div>
                      <p className="text-white/90 font-body mb-4">{step.description}</p>
                      <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-body">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg z-10">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Accordion */}
          <div className="block lg:hidden space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="bg-brand-white rounded-3xl p-6 shadow-xl border border-brand-blue"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setActiveStep(index === activeStep ? -1 : index)}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-black font-heading">{step.title}</h3>
                    <p className="text-text.medium font-body text-sm">{step.duration}</p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg 
                      className={`w-5 h-5 text-brand-blue transform transition-transform ${activeStep === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {activeStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="flex items-center gap-3 mb-4 p-4 bg-brand-blue/10 rounded-2xl">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                        {step.icon}
                      </div>
                      <p className="text-text.medium font-body">{step.description}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-brand-blue text-white rounded-2xl font-bold font-heading text-lg">
              <Heart className="w-6 h-6" />
              <span>Start Your Journey Today</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};