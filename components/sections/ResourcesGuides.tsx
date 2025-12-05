'use client';

import Link from 'next/link';
import { BookOpen, Lightbulb, FileText, Clipboard } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  excerpt: string;
  icon: React.ReactNode;
  href: string;
}

export const ResourcesGuides = () => {
  const resources: Resource[] = [
    {
      id: 1,
      title: "Understanding the Fostering Journey",
      excerpt: "From initial inquiry to placement, we guide you through each milestone.",
      icon: <Heart className="w-4 h-4" />,
      href: "/resources/beginners-guide"
    },
    {
      id: 2,
      title: "Financial Support for Foster Families",
      excerpt: "Navigate allowances, benefits, and tax considerations.",
      icon: <Clipboard className="w-4 h-4" />,
      href: "/resources/financial-support"
    },
    {
      id: 3,
      title: "Preparing Your Home for a Child",
      excerpt: "Create a welcoming, safe environment for children.",
      icon: <Home className="w-4 h-4" />,
      href: "/resources/home-preparation"
    },
    {
      id: 4,
      title: "Supporting Children with Trauma",
      excerpt: "Essential techniques for helping children heal and build trust.",
      icon: <Lightbulb className="w-4 h-4" />,
      href: "/resources/trauma-support"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-2 font-heading">
            Empowering Your Fostering Journey
          </h2>
          
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-body">
            Access expert insights and practical advice to help you succeed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {resources.map((resource) => (
            <Link key={resource.id} href={resource.href} className="group block">
              <div className="p-4 rounded-md border border-gray-100 hover:border-teal-200 transition-all duration-300 bg-gray-50">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-7 h-7 rounded-md bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                    {resource.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-text-charcoal font-heading group-hover:text-teal-600 transition-colors">
                    {resource.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-xs font-body">
                  {resource.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Adding missing icons
const Heart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Home = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);