'use client';

import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const SpeakToAdvisor = () => {
  return (
    <section className="py-8 bg-gradient-to-br from-teal-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white">
                <Phone className="w-8 h-8" />
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl font-bold text-text-charcoal mb-2 font-heading">
                Speak to a Fostering Advisor
              </h2>
              <p className="text-gray-700 text-sm font-body mb-4">
                Get personalized guidance from our experienced team. We're here to answer your questions 
                and help you take the next step in your fostering journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <GradientButton size="sm" className="rounded-lg px-4 py-2 text-sm font-medium">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: 0800 123 4567
                </GradientButton>
                
                <GradientButton 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg px-4 py-2 text-sm font-medium border-2"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Online
                </GradientButton>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-xs font-body flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Available Monday-Sunday, 8am-8pm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};