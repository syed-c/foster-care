// Location schemas that map to front-end templates
export const locationSchemas = {
  country: {
    template: 'country',
    label: 'Country Template (e.g. England)',
    description: 'Template for country-level pages showing regions and fostering overview',
    sections: [
      { 
        key: 'overview', 
        label: 'Overview of Fostering', 
        description: 'Introduction to fostering in this country with general information. Include statistics, legal framework, and national support systems.',
        contentGuidance: 'Provide a comprehensive introduction to fostering in this country, including national statistics, key legislation, and major support organizations.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'About Fostering in [Country]' },
          { name: 'body', type: 'textarea', label: 'Body Content', rows: 6, placeholder: 'Welcome to our directory of foster agencies in [Country]. We\'ve compiled a list of accredited and trusted agencies to help you start your fostering journey...' }
        ] 
      },
      { 
        key: 'agencyFinder', 
        label: 'Foster Agency Finder by Region', 
        description: 'Section to help users find agencies by region. Include an introduction and call-to-action.',
        contentGuidance: 'Explain how users can find foster agencies by region and encourage them to explore regional options.',
        fields: [
          { name: 'intro', type: 'textarea', label: 'Introduction', placeholder: 'Discover the best foster agencies across [Country] by region. Our comprehensive directory helps you find the perfect match for your fostering journey.' },
          { name: 'ctaText', type: 'text', label: 'Call to Action Text', placeholder: 'Find Agencies by Region' }
        ] 
      },
      { 
        key: 'popularLocations', 
        label: 'Featured Popular Locations', 
        description: 'Showcase popular regions or cities within the country. Include links to these locations.',
        contentGuidance: 'Highlight the most popular or significant regions/cities for fostering in this country.',
        fields: [
          { 
            name: 'locations', 
            type: 'array', 
            label: 'Locations',
            itemFields: [
              { name: 'name', type: 'text', label: 'Location Name', placeholder: 'London' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '/foster-agency/england/london' }
            ]
          }
        ] 
      },
      { 
        key: 'fosterSystem', 
        label: 'Foster Care System', 
        description: 'Information about the country\'s foster care system and regulations. Include key aspects of the system.',
        contentGuidance: 'Explain the regulatory framework, key organizations, and important aspects of the foster care system in this country.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'System Items',
            itemFields: [
              { name: 'title', type: 'text', label: 'Title', placeholder: 'Regulatory Framework' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: '[Country] follows strict regulatory guidelines to ensure the safety and well-being of all children in foster care.' }
            ]
          }
        ] 
      },
      { 
        key: 'whyFoster', 
        label: 'Why Choose to Foster', 
        description: 'Reasons why people should consider fostering in this country. Include compelling reasons and benefits.',
        contentGuidance: 'Provide compelling reasons why someone should consider becoming a foster carer in this country.',
        fields: [
          { 
            name: 'points', 
            type: 'array', 
            label: 'Reasons',
            itemFields: [
              { name: 'text', type: 'text', label: 'Reason', placeholder: 'Make a lasting impact on a child\'s life' }
            ]
          }
        ] 
      },
      { 
        key: 'faqs', 
        label: 'Frequently Asked Questions', 
        description: 'Common questions and answers about fostering in this country. Include practical information.',
        contentGuidance: 'Answer common questions about the fostering process, requirements, and support available in this country.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'FAQ Items',
            itemFields: [
              { name: 'question', type: 'text', label: 'Question', placeholder: 'How do I become a foster carer?' },
              { name: 'answer', type: 'textarea', label: 'Answer', placeholder: 'Becoming a foster carer involves several steps including an application, assessments, training, and approval process...' }
            ]
          }
        ] 
      }
    ]
  },

  county: {
    template: 'county',
    label: 'County/Region Template (e.g. Bath and North East Somerset)',
    description: 'Template for county/region-level pages showing cities and local information',
    sections: [
      { 
        key: 'about', 
        label: 'About Fostering', 
        description: 'Introduction to fostering in this region with local information. Include regional statistics and key organizations.',
        contentGuidance: 'Provide information specific to fostering in this region, including local support services and regional statistics.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'About Fostering in [Region]' },
          { name: 'body', type: 'textarea', label: 'Body Content', rows: 6, placeholder: 'Welcome to our directory of foster agencies in [Region]. We\'ve compiled a list of accredited and trusted agencies to help you start your fostering journey...' }
        ] 
      },
      { 
        key: 'benefits', 
        label: 'Benefits and Support', 
        description: 'Local benefits and support services available to foster carers. Include financial and practical support.',
        contentGuidance: 'Detail the specific benefits and support services available to foster carers in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Benefits and Support for Foster Carers' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Benefits',
            itemFields: [
              { name: 'title', type: 'text', label: 'Benefit Title', placeholder: 'Financial Support' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Receive competitive fostering allowances to cover the costs of caring for a child.' }
            ]
          }
        ] 
      },
      { 
        key: 'training', 
        label: 'Training & Development', 
        description: 'Local training programs and development opportunities. Include information about initial and ongoing training.',
        contentGuidance: 'Provide information about training programs and development opportunities available to foster carers in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Training & Development Programs' },
          { 
            name: 'programs', 
            type: 'array', 
            label: 'Programs',
            itemFields: [
              { name: 'name', type: 'text', label: 'Program Name', placeholder: 'Initial Training' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Comprehensive training program to prepare you for your fostering journey.' }
            ]
          }
        ] 
      },
      { 
        key: 'popularCities', 
        label: 'Popular Cities', 
        description: 'Featured cities within this region. Include links to city pages.',
        contentGuidance: 'Highlight the most popular or significant cities for fostering in this region.',
        fields: [
          { 
            name: 'cities', 
            type: 'array', 
            label: 'Cities',
            itemFields: [
              { name: 'name', type: 'text', label: 'City Name', placeholder: 'Bath' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '/foster-agency/england/bath-and-north-east-somerset/bath' }
            ]
          }
        ] 
      },
      { 
        key: 'testimonials', 
        label: 'Testimonials', 
        description: 'Success stories from local foster carers. Include real experiences and quotes.',
        contentGuidance: 'Share inspiring testimonials from local foster carers to encourage others to consider fostering.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Testimonials',
            itemFields: [
              { name: 'name', type: 'text', label: 'Person Name', placeholder: 'Sarah M.' },
              { name: 'text', type: 'textarea', label: 'Testimonial Text', placeholder: 'Fostering has been one of the most rewarding experiences of my life. The support I received was exceptional.' }
            ]
          }
        ] 
      },
      { 
        key: 'topAgencies', 
        label: 'Top Foster Agencies', 
        description: 'Featured foster agencies in this region. Include agency names, summaries, and links.',
        contentGuidance: 'Highlight the top-rated foster agencies in this region with brief descriptions and links.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Agencies',
            itemFields: [
              { name: 'name', type: 'text', label: 'Agency Name', placeholder: '[Region] Family Care' },
              { name: 'summary', type: 'textarea', label: 'Summary', placeholder: 'Leading local foster agency with over 10 years of experience providing quality care and support.' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' }
            ]
          }
        ] 
      },
      { 
        key: 'faqs', 
        label: 'Frequently Asked Questions', 
        description: 'Common questions and answers about fostering in this region. Include regional-specific information.',
        contentGuidance: 'Answer common questions about fostering in this region, including local requirements and processes.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'FAQ Items',
            itemFields: [
              { name: 'question', type: 'text', label: 'Question', placeholder: 'How do I become a foster carer in [Region]?' },
              { name: 'answer', type: 'textarea', label: 'Answer', placeholder: 'Becoming a foster carer in [Region] involves several steps including an application, assessments, training, and approval process...' }
            ]
          }
        ] 
      }
    ]
  },

  city: {
    template: 'city',
    label: 'City Template (e.g. Bath)',
    description: 'Template for city-level pages with detailed local information',
    sections: [
      { 
        key: 'hero', 
        label: 'Hero Section', 
        description: 'Main hero section with call-to-action buttons. Include heading, subheading, and CTAs.',
        contentGuidance: 'Create a compelling hero section that encourages users to explore foster agencies in this city.',
        fields: [
          { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Find the Best Foster Agencies in [City]' },
          { name: 'subheading', type: 'textarea', label: 'Subheading', placeholder: 'Find the perfect foster agency in [City]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Talk to a Foster Advisor' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'View Agencies' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#' }
            ]
          }
        ] 
      },
      { 
        key: 'about', 
        label: 'About Fostering', 
        description: 'Introduction to fostering in this city with local information. Include city-specific details.',
        contentGuidance: 'Provide information specific to fostering in this city, including local support services and city statistics.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'About Fostering in [City]' },
          { name: 'body', type: 'textarea', label: 'Body Content', rows: 6, placeholder: 'Welcome to our directory of foster agencies in [City]. We\'ve compiled a list of accredited and trusted agencies to help you start your fostering journey...' }
        ] 
      },
      { 
        key: 'types', 
        label: 'Types of Fostering', 
        description: 'Different types of fostering available in this city. Include descriptions of each type.',
        contentGuidance: 'Explain the different types of fostering opportunities available in this city.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Fostering Types',
            itemFields: [
              { name: 'name', type: 'text', label: 'Type Name', placeholder: 'Short-term Fostering' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Short-term fostering placements typically last from a few days to two years...' }
            ]
          }
        ] 
      },
      { 
        key: 'topAgencies', 
        label: 'Top Foster Agencies', 
        description: 'Featured foster agencies in this city. Include agency names, summaries, and links.',
        contentGuidance: 'Highlight the top-rated foster agencies in this city with brief descriptions and links.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Agencies',
            itemFields: [
              { name: 'name', type: 'text', label: 'Agency Name', placeholder: '[City] Family Care' },
              { name: 'summary', type: 'textarea', label: 'Summary', placeholder: 'Leading local foster agency with over 10 years of experience providing quality care and support.' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' }
            ]
          }
        ] 
      },
      { 
        key: 'whyFoster', 
        label: 'Why Foster', 
        description: 'Reasons why people should consider fostering in this city. Include compelling local reasons.',
        contentGuidance: 'Provide compelling reasons why someone should consider becoming a foster carer in this city.',
        fields: [
          { 
            name: 'points', 
            type: 'array', 
            label: 'Reasons',
            itemFields: [
              { name: 'text', type: 'text', label: 'Reason', placeholder: 'Community Support' }
            ]
          }
        ] 
      },
      { 
        key: 'allowances', 
        label: 'Allowances & Support', 
        description: 'Financial allowances and support services available in this city. Include local support details.',
        contentGuidance: 'Detail the financial allowances and support services available to foster carers in this city.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Support Items',
            itemFields: [
              { name: 'title', type: 'text', label: 'Title', placeholder: 'Financial Support' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Receive competitive fostering allowances to cover the costs of caring for a child.' }
            ]
          }
        ] 
      },
      { 
        key: 'resources', 
        label: 'Local Resources', 
        description: 'Local resources and organizations that support foster carers. Include links and descriptions.',
        contentGuidance: 'Provide links to local resources and organizations that support foster carers in this city.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'Resources',
            itemFields: [
              { name: 'title', type: 'text', label: 'Title', placeholder: '[City] County Council' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Local authority responsible for children\'s services and fostering support.' }
            ]
          }
        ] 
      },
      { 
        key: 'faqs', 
        label: 'FAQs', 
        description: 'Common questions and answers about fostering in this city. Include city-specific information.',
        contentGuidance: 'Answer common questions about fostering in this city, including local requirements and processes.',
        fields: [
          { 
            name: 'items', 
            type: 'array', 
            label: 'FAQ Items',
            itemFields: [
              { name: 'question', type: 'text', label: 'Question', placeholder: 'How do I become a foster carer in [City]?' },
              { name: 'answer', type: 'textarea', label: 'Answer', placeholder: 'Becoming a foster carer in [City] involves several steps including an application, assessments, training, and approval process...' }
            ]
          }
        ] 
      }
    ]
  }
};

// Default content generators for each location type
export const getDefaultContent = (location) => {
  const locationName = location.name || 'Location';
  
  switch (location.type) {
    case 'country':
      return {
        slug: location.canonical_slug || `/foster-agency/${location.slug}`,
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        overview: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        },
        agencyFinder: {
          intro: `Discover the best foster agencies across ${locationName} by region. Our comprehensive directory helps you find the perfect match for your fostering journey.`,
          ctaText: "Find Agencies by Region"
        },
        popularLocations: {
          locations: [
            { name: "London", link: "#" },
            { name: "Manchester", link: "#" },
            { name: "Birmingham", link: "#" }
          ]
        },
        fosterSystem: {
          items: [
            {
              title: "Regulatory Framework",
              description: `${locationName} follows strict regulatory guidelines to ensure the safety and well-being of all children in foster care.`
            },
            {
              title: "Support Services",
              description: "Comprehensive support services are available for foster carers and families throughout their journey."
            }
          ]
        },
        whyFoster: {
          points: [
            "Make a lasting impact on a child's life",
            "Join a supportive community of carers",
            "Receive professional training and development",
            "Financial support and allowances provided"
          ]
        },
        faqs: {
          items: [
            {
              question: "How do I become a foster carer?",
              answer: "Becoming a foster carer involves several steps including an application, assessments, training, and approval process. Contact your local foster agency to begin your journey."
            },
            {
              question: "What are the requirements to be a foster carer?",
              answer: "Requirements vary by agency but typically include being over 21, having a spare room, passing background checks, and completing training programs."
            }
          ]
        }
      };
      
    case 'region':
    case 'county':
      return {
        slug: location.canonical_slug || `/foster-agency/${location.slug}`,
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.`
        },
        benefits: {
          title: "Benefits and Support for Foster Carers",
          items: [
            {
              title: "Financial Support",
              description: "Receive competitive fostering allowances to cover the costs of caring for a child."
            },
            {
              title: "Professional Development",
              description: "Access to ongoing training, supervision, and 24/7 support from experienced professionals."
            }
          ]
        },
        training: {
          title: "Training & Development Programs",
          programs: [
            {
              name: "Initial Training",
              description: "Comprehensive training program to prepare you for your fostering journey."
            },
            {
              name: "Ongoing Development",
              description: "Continuous professional development opportunities to enhance your skills."
            }
          ]
        },
        popularCities: {
          cities: [
            { name: "City 1", link: "#" },
            { name: "City 2", link: "#" },
            { name: "City 3", link: "#" }
          ]
        },
        testimonials: {
          items: [
            {
              name: "Sarah M.",
              text: "Fostering has been one of the most rewarding experiences of my life. The support I received was exceptional."
            },
            {
              name: "James T.",
              text: "The training and ongoing support helped me feel confident in my role as a foster carer."
            }
          ]
        },
        topAgencies: {
          items: [
            {
              name: `${locationName} Family Care`,
              summary: "Leading local foster agency with over 10 years of experience providing quality care and support.",
              link: "#"
            }
          ]
        },
        faqs: {
          items: [
            {
              question: "How do I become a foster carer?",
              answer: "Becoming a foster carer involves several steps including an application, assessments, training, and approval process. Contact your local foster agency to begin your journey."
            },
            {
              question: "What are the requirements to be a foster carer?",
              answer: "Requirements vary by agency but typically include being over 21, having a spare room, passing background checks, and completing training programs."
            }
          ]
        }
      };
      
    case 'city':
    default:
      return {
        slug: location.canonical_slug || `/foster-agency/${location.slug}`,
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        hero: {
          heading: `Find the Best Foster Agencies in ${locationName}`,
          subheading: `Find the perfect foster agency in ${locationName}`,
          cta_primary: { text: "Talk to a Foster Advisor", link: "#" },
          cta_secondary: { text: "View Agencies", link: "#" }
        },
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        },
        types: {
          items: [
            {
              name: "Short-term Fostering",
              description: "Short-term fostering placements typically last from a few days to two years. These placements can provide emergency care or respite for permanent carers."
            },
            {
              name: "Long-term Fostering",
              description: "Long-term fostering involves caring for a child until they reach adulthood. This provides stability and security for children who cannot return to their birth families."
            },
            {
              name: "Respite Fostering",
              description: "Respite fostering provides short breaks for both children and their permanent carers. This can be for a few hours, days, or weekends."
            }
          ]
        },
        topAgencies: {
          items: [
            {
              name: `${locationName} Family Care`,
              summary: "Leading local foster agency with over 10 years of experience providing quality care and support.",
              link: "#"
            }
          ]
        },
        whyFoster: {
          points: [
            "Community Support",
            "Professional Training",
            "Lasting Impact"
          ]
        },
        allowances: {
          items: [
            {
              title: "Financial Support",
              description: "Receive competitive fostering allowances to cover the costs of caring for a child."
            },
            {
              title: "Professional Support",
              description: "Access to ongoing training, supervision, and 24/7 support from experienced professionals."
            }
          ]
        },
        resources: {
          items: [
            {
              title: `${locationName} County Council`,
              link: "#",
              description: "Local authority responsible for children's services and fostering support."
            }
          ]
        },
        faqs: {
          items: [
            {
              question: "How do I become a foster carer?",
              answer: "Becoming a foster carer involves several steps including an application, assessments, training, and approval process. Contact your local foster agency to begin your journey."
            },
            {
              question: "What are the requirements to be a foster carer?",
              answer: "Requirements vary by agency but typically include being over 21, having a spare room, passing background checks, and completing training programs."
            },
            {
              question: "How long does the fostering process take?",
              answer: "The process typically takes 4-6 months from initial enquiry to approval, depending on your circumstances and the agency."
            }
          ]
        }
      };
  }
};