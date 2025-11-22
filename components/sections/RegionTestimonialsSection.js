'use client';

// RegionTestimonialsSection.js
import { Card } from '@/components/ui/card';
import { Users, Star } from 'lucide-react';

export default function RegionTestimonialsSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Testimonials from Foster Carers`;
  const testimonials = data?.testimonials || [
    {
      name: "Sarah & James",
      location: "Manchester",
      quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      location: "London",
      quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
      rating: 5
    },
    {
      name: "Michael Davies",
      location: "Birmingham",
      quote: "The process was straightforward and the support from both the platform and the agency was exceptional. We're now fostering two amazing children.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Users className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="section-card rounded-modern-xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic font-inter">"{testimonial.quote}"</p>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.location}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}