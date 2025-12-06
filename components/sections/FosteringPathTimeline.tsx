'use client';

import { motion } from 'framer-motion';
import { UserCheck, ClipboardCheck, BookOpen, Users, Home, Award, Heart } from 'lucide-react';

export const FosteringPathTimeline = () => {
  const milestones = [
    {
      id: 1,
      title: "Initial Inquiry",
      description: "Reach out to express interest in fostering",
      icon: <UserCheck className="w-6 h-6" />,
      completed: true
    },
    {
      id: 2,
      title: "Information Session",
      description: "Attend our virtual or in-person session",
      icon: <BookOpen className="w-6 h-6" />,
      completed: true
    },
    {
      id: 3,
      title: "Application Submission",
      description: "Complete and submit your fostering application",
      icon: <ClipboardCheck className="w-6 h-6" />,
      completed: true
    },
    {
      id: 4,
      title: "Assessment Phase",
      description: "Comprehensive evaluation including home visits",
      icon: <Users className="w-6 h-6" />,
      completed: false
    },
    {
      id: 5,
      title: "Panel Review",
      description: "Independent panel reviews your application",
      icon: <Award className="w-6 h-6" />,
      completed: false
    },
    {
      id: 6,
      title: "Matching & Placement",
      description: "Find the right match and begin fostering",
      icon: <Home className="w-6 h-6" />,
      completed: false
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-white/30 blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
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
              <span className="text-base font-medium font-body">Your Path Forward</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Fostering <span className="text-brand-blue">Milestones</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Track your progress through our structured fostering pathway designed for your success
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue to-brand-blue/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  className="relative flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Icon Container */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
                    milestone.completed 
                      ? 'bg-brand-blue text-white' 
                      : 'bg-brand-white text-brand-blue border-2 border-brand-blue'
                  }`}>
                    {milestone.icon}
                    {milestone.completed && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 bg-brand-white rounded-3xl p-6 shadow-xl border border-brand-blue flex-1">
                    <h3 className={`text-xl font-bold mb-2 font-heading ${
                      milestone.completed ? 'text-brand-blue' : 'text-brand-black'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-text.medium font-body">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <span>Begin Your Journey</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};