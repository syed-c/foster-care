'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, Download, ExternalLink } from 'lucide-react';

export const ResourcesGuides = () => {
  const resources = [
    {
      id: 1,
      title: "Fostering Handbook",
      description: "Comprehensive guide covering everything you need to know about becoming a foster parent",
      type: "PDF Guide",
      icon: <BookOpen className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 2,
      title: "Financial Support Information",
      description: "Detailed breakdown of allowances, benefits, and financial assistance available",
      type: "Document",
      icon: <FileText className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 3,
      title: "Training Videos",
      description: "Essential training modules covering child development, trauma-informed care, and more",
      type: "Video Series",
      icon: <Video className="w-6 h-6" />,
      link: "#"
    },
    {
      id: 4,
      title: "Legal Framework",
      description: "Understanding your rights and responsibilities as a foster parent",
      type: "Guide",
      icon: <FileText className="w-6 h-6" />,
      link: "#"
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
              <Download className="w-5 h-5" />
              <span className="text-base font-medium font-body">Helpful Resources</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Essential <span className="text-brand-blue">Guides & Resources</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Access our library of resources designed to support you through every stage of your fostering journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="bg-brand-white rounded-3xl p-6 shadow-xl border border-brand-blue hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-brand-black font-heading">{resource.title}</h3>
                      <ExternalLink className="w-5 h-5 text-brand-blue" />
                    </div>
                    <p className="text-text.medium font-body mb-3">{resource.description}</p>
                    <div className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-body">
                      {resource.type}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-4 bg-brand-blue text-white rounded-2xl font-bold font-heading text-lg hover:bg-brand-blue/90 transition-colors"
            >
              View All Resources
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};