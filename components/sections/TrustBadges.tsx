'use client';

import { Shield, Award, CheckCircle } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Ofsted Registered",
      description: "Fully compliant with UK fostering standards"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Mark Certified",
      description: "Recognized for excellence in child welfare"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Safeguarding Assured",
      description: "Rigorous vetting processes for all agencies"
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-3 font-heading">
            Trusted by Families and Regulated by Authorities
          </h2>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto font-body">
            Our platform meets the highest standards for child protection and family support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <div key={index} className="text-center p-5 bg-offwhite-50 rounded-lg border border-gray-100">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-teal-50 text-teal-600 mb-3">
                {badge.icon}
              </div>
              <h3 className="text-base font-semibold text-text-charcoal mb-1 font-heading">{badge.title}</h3>
              <p className="text-gray-600 text-sm font-body">{badge.description}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-charcoal mb-3 font-heading">Official Recognition</h3>
            <p className="text-gray-700 font-body text-sm mb-4">
              We work in partnership with local authorities, Ofsted, and national fostering organizations 
              to ensure the highest standards of care for every child in our network.
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-70">
              {['Ofsted', 'National Fostering Association', 'Fostering Network'].map((org, index) => (
                <div key={index} className="text-gray-500 font-heading font-medium text-sm">
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Micro-secondary CTA */}
        <div className="mt-8 text-center">
          <a 
            href="/safeguarding" 
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-body text-sm"
          >
            Learn about our safeguarding policies
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};