'use client';

// RegionPopularCitiesSection.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegionPopularCitiesSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Explore Fostering Opportunities Across the Region`;
  const description = data?.description || `Discover areas where your skills and compassion can make the biggest impact`;
  const cities = data?.cities || [
    { name: "Major City", link: "#", population: "Urban", reason: "High demand for foster carers" },
    { name: "Coastal Town", link: "#", population: "Mixed", reason: "Growing need for stable homes" },
    { name: "Rural Area", link: "#", population: "Rural", reason: "Close-knit communities needing support" }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 border border-brand-white/30 shadow-sm mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MapPin className="w-5 h-5 text-brand-blue" />
              <span className="text-sm font-medium text-brand-black font-heading">Regional Coverage</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6 font-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-text.medium max-w-3xl mx-auto font-body leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </motion.div>
          
          {/* Enhanced city cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="rounded-2xl p-6 shadow-lg border border-brand-white/50 bg-white h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-brand-black font-heading">{city.name}</h3>
                    <div className="px-2 py-1 bg-brand-blue/10 text-brand-blue rounded-lg text-xs font-medium font-heading">
                      {city.population}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm text-text.medium font-body">Why foster here</span>
                  </div>
                  
                  <p className="text-text.medium mb-6 font-body">{city.reason}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border-brand-blue text-brand-blue hover:bg-brand-blue/10 font-body"
                    asChild
                  >
                    <Link href={city.link}>
                      Explore Opportunities
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}