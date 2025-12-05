'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, FileText, Users, Home, Award } from 'lucide-react';

export const FosteringPathTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 1,
      title: "Enquiry",
      description: "Reach out to us with your questions about fostering",
      icon: <Search className="w-6 h-6" />,
      duration: "1-2 days"
    },
    {
      id: 2,
      title: "Initial Assessment",
      description: "We'll discuss your situation and match you with agencies",
      icon: <FileText className="w-6 h-6" />,
      duration: "1-2 weeks"
    },
    {
      id: 3,
      title: "Agency Matching",
      description: "Connect with 2-3 carefully selected agencies",
      icon: <Users className="w-6 h-6" />,
      duration: "1 week"
    },
    {
      id: 4,
      title: "Application Process",
      description: "Complete forms and background checks",
      icon: <FileText className="w-6 h-6" />,
      duration: "4-6 weeks"
    },
    {
      id: 5,
      title: "Approval",
      description: "Receive your fostering approval",
      icon: <Award className="w-6 h-6" />,
      duration: "6-8 weeks"
    },
    {
      id: 6,
      title: "Placement",
      description: "Welcome your foster child home",
      icon: <Home className="w-6 h-6" />,
      duration: "Ongoing"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-teal-500/20 to-cyan-500/10 blur-3xl animate-gradient-orb" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-amber-500/20 to-peach-500/10 blur-3xl animate-gradient-orb" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Your <span className="gradient-text">Fostering Journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We guide you through every step of the process with personalized support and expert advice
          </motion.p>
        </div>
        
        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
            <motion.div 
              className="h-full gradient-bg rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center relative cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Circle */}
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  index <= activeStep 
                    ? 'gradient-bg text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}>
                  {step.icon}
                  
                  {/* Ripple Effect */}
                  {index === activeStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full gradient-bg opacity-30"
                      animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
                
                {/* Step Info */}
                <div className="text-center max-w-24">
                  <h3 className={`font-semibold font-heading mb-1 text-sm ${
                    index <= activeStep ? 'text-teal-700' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-body">
                    {step.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Active Step Details */}
        <motion.div 
          className="mt-16 max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
              {steps[activeStep].icon}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-charcoal mb-2 font-heading">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-gray-700 mb-3 font-body">
                {steps[activeStep].description}
              </p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700">
                <span className="text-xs font-medium font-body">Duration:</span>
                <span className="text-xs font-semibold font-body">{steps[activeStep].duration}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};