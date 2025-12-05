'use client';

import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah & James Wilson",
      role: "Foster Parents for 3 Years",
      content: "Finding the right agency through this platform was life-changing. The support we received went beyond what we expected.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Agency Director",
      content: "As an agency, we've seen remarkable improvements in our placement success rates since partnering with this directory.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Thompson",
      role: "Former Foster Child",
      content: "The family I was placed with through this network gave me stability during my most vulnerable years.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-3 h-3 ${index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-3 font-heading">
            Stories That Change Lives
          </h2>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto font-body">
            These authentic experiences reflect the profound impact fostering has on children and families.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-offwhite-50 rounded-lg p-5 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 mb-4 font-body text-sm italic">
                "{testimonial.content}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-text-charcoal text-sm font-heading">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-xs font-body">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Micro-secondary CTA */}
        <div className="mt-8 text-center">
          <a 
            href="/testimonials" 
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-body text-sm"
          >
            Read more stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};