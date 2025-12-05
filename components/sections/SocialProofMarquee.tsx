'use client';

import { motion } from 'framer-motion';

export const SocialProofMarquee = () => {
  // Testimonials data
  const testimonials = [
    { id: 1, name: "Sarah J.", role: "Foster Parent", quote: "Life-changing experience for our whole family" },
    { id: 2, name: "Michael T.", role: "Former Foster Child", quote: "Found my forever family through this platform" },
    { id: 3, name: "Priya P.", role: "Agency Director", quote: "Highest quality families we've ever worked with" },
    { id: 4, name: "James W.", role: "Social Worker", quote: "Streamlined process saves us countless hours" },
    { id: 5, name: "Emma R.", role: "Foster Parent", quote: "Support exceeded our expectations completely" }
  ];
  
  // Media mentions
  const mediaMentions = [
    { id: 1, name: "BBC News", logo: "BBC" },
    { id: 2, name: "The Guardian", logo: "TG" },
    { id: 3, name: "Daily Mail", logo: "DM" },
    { id: 4, name: "Sky News", logo: "SN" },
    { id: 5, name: " ITV News", logo: "ITV" }
  ];
  
  // Authority logos
  const authorities = [
    { id: 1, name: "Ofsted", logo: "OF" },
    { id: 2, name: "National Fostering Association", logo: "NFA" },
    { id: 3, name: "The Fostering Network", logo: "TFN" },
    { id: 4, name: "Local Government Association", logo: "LGA" },
    { id: 5, name: "Department for Education", logo: "DfE" }
  ];

  return (
    <section className="py-12 relative overflow-hidden bg-white">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-teal-500/10 to-cyan-500/5 blur-3xl animate-gradient-orb" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-radial from-amber-500/10 to-peach-500/5 blur-3xl animate-gradient-orb" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-3 font-heading">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto font-body">
            Families, agencies, and authorities across the UK rely on our platform
          </p>
        </motion.div>
        
        {/* Testimonials Marquee */}
        <div className="mb-8 overflow-hidden">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="mx-3 inline-flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 min-w-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold mb-3 text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="text-gray-700 font-body text-center italic text-xs mb-2">"{testimonial.quote}"</p>
                  <p className="text-xs font-semibold text-text-charcoal font-heading">{testimonial.name}</p>
                  <p className="text-[10px] text-gray-500 font-body">{testimonial.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Media Mentions */}
        <div className="mb-8 overflow-hidden">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...mediaMentions, ...mediaMentions].map((media, index) => (
                <motion.div
                  key={`${media.id}-${index}`}
                  className="mx-6 inline-flex items-center justify-center p-3 bg-white rounded-md shadow-xs border border-gray-100 min-w-[120px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-base font-bold text-gray-700 font-heading">{media.logo}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Authority Logos */}
        <div className="overflow-hidden">
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...authorities, ...authorities].map((authority, index) => (
                <motion.div
                  key={`${authority.id}-${index}`}
                  className="mx-6 inline-flex items-center justify-center p-3 bg-white rounded-md shadow-xs border border-gray-100 min-w-[150px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-sm font-bold text-gray-700 font-heading">{authority.logo}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};