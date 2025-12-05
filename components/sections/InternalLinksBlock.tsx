'use client';

export const InternalLinksBlock = () => {
  const links = [
    {
      title: "Fostering in London",
      description: "Explore agencies and support in the capital",
      href: "/fostering-agencies-uk/england/london"
    },
    {
      title: "Fostering in Birmingham",
      description: "Midlands fostering opportunities and resources",
      href: "/fostering-agencies-uk/england/birmingham"
    },
    {
      title: "Fostering in Manchester",
      description: "Northern fostering communities and support",
      href: "/fostering-agencies-uk/england/manchester"
    },
    {
      title: "Beginner's Guide to Fostering",
      description: "Everything you need to know to get started",
      href: "/resources/beginners-guide"
    },
    {
      title: "Compare Agencies",
      description: "Find the right fit for your family",
      href: "/compare-agencies"
    },
    {
      title: "Fostering in Scotland",
      description: "Scottish fostering opportunities and support",
      href: "/fostering-agencies-uk/scotland"
    },
    {
      title: "Fostering Requirements",
      description: "Learn about the requirements to become a foster parent",
      href: "/resources/fostering-requirements"
    }
  ];

  return (
    <section className="py-12 bg-offwhite-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-6 font-heading text-center">
            Explore Our Resources
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="block p-5 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-all duration-300 group"
              >
                <h3 className="font-semibold text-text-charcoal font-heading group-hover:text-teal-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 font-body">
                  {link.description}
                </p>
                <div className="mt-3 text-teal-600 text-sm font-body flex items-center gap-1">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};