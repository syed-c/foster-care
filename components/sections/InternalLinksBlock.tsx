'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const InternalLinksBlock = () => {
  const linkCategories = [
    {
      title: "Fostering Resources",
      links: [
        { name: "Fostering Guides", href: "/resources/fostering-guides" },
        { name: "Financial Support", href: "/resources/financial-support" },
        { name: "Training Programs", href: "/resources/training" },
        { name: "Legal Framework", href: "/resources/legal-framework" }
      ]
    },
    {
      title: "Agency Directory",
      links: [
        { name: "Find by Location", href: "/fostering-agencies-uk" },
        { name: "Specialist Agencies", href: "/specialist-agencies" },
        { name: "Independent Reviews", href: "/agency-reviews" },
        { name: "Compare Services", href: "/compare-agencies" }
      ]
    },
    {
      title: "Support Networks",
      links: [
        { name: "Support Groups", href: "/support-groups" },
        { name: "Professional Help", href: "/professional-help" },
        { name: "Online Communities", href: "/communities" },
        { name: "Emergency Contacts", href: "/emergency-contacts" }
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="site-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-4 font-heading">
              Explore Our <span className="text-brand-blue">Resources</span>
            </h2>
            <p className="text-lg sm:text-xl text-text.medium max-w-2xl mx-auto font-body">
              Comprehensive information to support your fostering journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {linkCategories.map((category, index) => (
              <div key={index} className="glass-card rounded-3xl p-6 border border-brand-cream shadow-xl">
                <h3 className="text-xl font-bold text-brand-black font-heading mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-brand-black font-body text-base group-hover:text-brand-blue transition-colors">
                          {link.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-text.light group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};