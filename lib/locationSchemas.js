// Location schemas that map to front-end templates
export const locationSchemas = {
  country: {
    template: 'country',
    label: 'Country Template (e.g. England)',
    description: 'Template for country-level pages showing regions and fostering overview',
    sections: [
      { 
        key: 'hero', 
        label: 'Hero Section', 
        description: 'Main hero section with call-to-action buttons. Include heading, subheading, and CTAs.',
        contentGuidance: 'Create a compelling hero section that encourages users to explore foster agencies in this country.',
        fields: [
          { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Foster Agencies in [Country]' },
          { name: 'subheading', type: 'textarea', label: 'Subheading', placeholder: 'Find accredited foster agencies in [Country]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Get Foster Agency Support' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '/contact' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Explore Regions' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#regions' }
            ]
          }
        ] 
      },
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Foster Agency Finder by Region' },
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Featured Popular Locations in [Country]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Discover top cities and towns in [Country] with high demand for foster carers' },
          { 
            name: 'locations', 
            type: 'array', 
            label: 'Locations',
            itemFields: [
              { name: 'name', type: 'text', label: 'Location Name', placeholder: 'London' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '/foster-agency/england/london' },
              { name: 'demand', type: 'text', label: 'Demand', placeholder: 'High' },
              { name: 'agencies', type: 'text', label: 'Number of Agencies', placeholder: '200+' }
            ]
          }
        ] 
      },
      { 
        key: 'topAgencies', 
        label: 'Top Agencies in Country', 
        description: 'Featured foster agencies in this country. Include agency names, summaries, and links.',
        contentGuidance: 'Highlight the top-rated foster agencies in this country with brief descriptions and links.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Top Foster Agencies in [Country]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Connect with trusted fostering services across [Country]' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Agencies',
            itemFields: [
              { name: 'name', type: 'text', label: 'Agency Name', placeholder: '[Country] Family Care' },
              { name: 'summary', type: 'textarea', label: 'Summary', placeholder: 'Leading local foster agency with over 10 years of experience providing quality care and support.' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'featured', type: 'boolean', label: 'Featured', placeholder: 'true' },
              { name: 'type', type: 'text', label: 'Type', placeholder: 'National' },
              { name: 'rating', type: 'number', label: 'Rating', placeholder: '4.8' },
              { name: 'reviewCount', type: 'number', label: 'Review Count', placeholder: '42' },
              { name: 'phone', type: 'text', label: 'Phone', placeholder: '+44 123 456 7890' },
              { name: 'email', type: 'text', label: 'Email', placeholder: 'info@agency.com' },
              { name: 'website', type: 'text', label: 'Website', placeholder: 'https://agency.com' }
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'What is the Foster Care System Like in [Country]?' },
          { 
            name: 'sections', 
            type: 'array', 
            label: 'System Sections',
            itemFields: [
              { name: 'title', type: 'text', label: 'Section Title', placeholder: 'Allowances & Support' },
              { 
                name: 'items', 
                type: 'array', 
                label: 'Items',
                itemFields: [
                  { name: 'title', type: 'text', label: 'Item Title', placeholder: 'Weekly fostering allowances to cover child care costs' }
                ]
              }
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Why Choose to Foster in [Country]?' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Make a meaningful difference in the lives of children in your community' },
          { 
            name: 'points', 
            type: 'array', 
            label: 'Reasons',
            itemFields: [
              { name: 'text', type: 'text', label: 'Reason', placeholder: 'Help Children Locally' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Provide stable, loving homes for children in your own community who need care and support.' }
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'FAQs About Fostering in [Country]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Common questions about becoming a foster carer in [Country]' },
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
      },
      { 
        key: 'regulated', 
        label: 'Regulated & Trusted by UK Authorities', 
        description: 'Information about regulation and trust by UK authorities.',
        contentGuidance: 'Explain how the country\'s fostering system is regulated and trusted by UK authorities.',
        fields: [
          { name: 'regulator', type: 'text', label: 'Regulator', placeholder: 'Ofsted' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'All agencies meet strict regulatory standards' }
        ] 
      },
      { 
        key: 'findAgencies', 
        label: 'Find Agencies Near You', 
        description: 'Section to help users find agencies near them.',
        contentGuidance: 'Encourage users to find agencies near them.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Find Agencies Near You' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Connect with local fostering services in [Country]' }
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
        key: 'hero', 
        label: 'Hero Section', 
        description: 'Main hero section with call-to-action buttons. Include heading, subheading, and CTAs.',
        contentGuidance: 'Create a compelling hero section that encourages users to explore foster agencies in this region.',
        fields: [
          { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Foster Agencies in [Region], [Country]' },
          { name: 'subheading', type: 'textarea', label: 'Subheading', placeholder: 'Find accredited foster agencies in [Region], [Country]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Get Foster Agency Support' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '/contact' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Explore Cities' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#cities' }
            ]
          }
        ] 
      },
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
        label: 'Benefits and Support for Foster Carers', 
        description: 'Local benefits and support services available to foster carers. Include financial and practical support.',
        contentGuidance: 'Detail the specific benefits and support services available to foster carers in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Benefits and Support for Foster Carers in [Region]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Comprehensive support system for foster carers in [Region]' },
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
        key: 'support', 
        label: 'Professional Support', 
        description: 'Professional support services available to foster carers in this region.',
        contentGuidance: 'Detail the professional support services available to foster carers in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Professional Support' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Support Items',
            itemFields: [
              { name: 'title', type: 'text', label: 'Support Title', placeholder: '24/7 support helpline for emergency assistance' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Access to 24/7 support helpline for emergency assistance.' }
            ]
          }
        ] 
      },
      { 
        key: 'training', 
        label: 'Training and Development', 
        description: 'Local training programs and development opportunities. Include information about initial and ongoing training.',
        contentGuidance: 'Provide information about training programs and development opportunities available to foster carers in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Training and Development' },
          { 
            name: 'programs', 
            type: 'array', 
            label: 'Programs',
            itemFields: [
              { name: 'name', type: 'text', label: 'Program Name', placeholder: 'Pre-approval Training' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Initial preparation courses before approval' }
            ]
          }
        ] 
      },
      { 
        key: 'popularCities', 
        label: 'Popular Cities in Region', 
        description: 'Featured cities within this region. Include links to city pages.',
        contentGuidance: 'Highlight the most popular or significant cities for fostering in this region.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Popular Cities in [Region]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Explore fostering opportunities in key cities across [Region]' },
          { 
            name: 'cities', 
            type: 'array', 
            label: 'Cities',
            itemFields: [
              { name: 'name', type: 'text', label: 'City Name', placeholder: 'Central [Region]' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'population', type: 'text', label: 'Population', placeholder: 'Varies' },
              { name: 'reason', type: 'textarea', label: 'Reason', placeholder: 'The heart of [Region] with excellent fostering opportunities and strong community support.' }
            ]
          }
        ] 
      },
      { 
        key: 'topAgencies', 
        label: 'Featured Agencies', 
        description: 'Featured foster agencies in this region. Include agency names, summaries, and links.',
        contentGuidance: 'Highlight the top-rated foster agencies in this region with brief descriptions and links.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Top Foster Agencies in [Region]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Discover the leading foster agencies in [Region] with excellent ratings and comprehensive support' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Agencies',
            itemFields: [
              { name: 'name', type: 'text', label: 'Agency Name', placeholder: '[Region] Family Care' },
              { name: 'summary', type: 'textarea', label: 'Summary', placeholder: 'Leading local foster agency with over 10 years of experience providing quality care and support.' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'featured', type: 'boolean', label: 'Featured', placeholder: 'true' },
              { name: 'type', type: 'text', label: 'Type', placeholder: 'Local Authority' },
              { name: 'rating', type: 'number', label: 'Rating', placeholder: '4.8' },
              { name: 'reviewCount', type: 'number', label: 'Review Count', placeholder: '42' },
              { name: 'phone', type: 'text', label: 'Phone', placeholder: '+44 123 456 7890' },
              { name: 'email', type: 'text', label: 'Email', placeholder: 'info@agency.com' },
              { name: 'website', type: 'text', label: 'Website', placeholder: 'https://agency.com' }
            ]
          }
        ] 
      },
      { 
        key: 'faqs', 
        label: 'FAQs', 
        description: 'Common questions and answers about fostering in this region. Include regional-specific information.',
        contentGuidance: 'Answer common questions about fostering in this region, including local requirements and processes.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Frequently Asked Questions About Fostering in [Region]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Get answers to common questions about becoming a foster carer in [Region]' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'FAQ Items',
            itemFields: [
              { name: 'question', type: 'text', label: 'Question', placeholder: 'How many foster families are needed in [Region]?' },
              { name: 'answer', type: 'textarea', label: 'Answer', placeholder: '[Region] has a continuous need for foster families to provide care for children and young people...' }
            ]
          }
        ] 
      },
      { 
        key: 'cta', 
        label: 'CTA Section', 
        description: 'Call-to-action section to encourage users to take the next step.',
        contentGuidance: 'Encourage users to take the next step in their fostering journey.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Ready to Start Your Fostering Journey?' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Take the first step towards making a difference in a child\'s life in [Region]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Talk to a Foster Advisor' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '/contact' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Download Information Pack' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#' }
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
          { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Foster Agencies in [City]' },
          { name: 'subheading', type: 'textarea', label: 'Subheading', placeholder: 'Find accredited foster agencies in [City], [Region]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Talk to a Foster Advisor' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '/contact' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'View Agencies' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#agencies' }
            ]
          }
        ] 
      },
      { 
        key: 'about', 
        label: 'City Overview Content', 
        description: 'Introduction to fostering in this city with local information. Include city-specific details.',
        contentGuidance: 'Provide information specific to fostering in this city, including local support services and city statistics.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'About Fostering in [City]' },
          { name: 'body', type: 'textarea', label: 'Body Content', rows: 6, placeholder: 'Welcome to our directory of foster agencies in [City]. We\'ve compiled a list of accredited and trusted agencies to help you start your fostering journey...' }
        ] 
      },
      { 
        key: 'types', 
        label: 'Types of Fostering in City', 
        description: 'Different types of fostering available in this city. Include descriptions of each type.',
        contentGuidance: 'Explain the different types of fostering opportunities available in this city.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Types of Fostering Available in [City]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Various fostering opportunities are available to suit different circumstances and preferences' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Fostering Types',
            itemFields: [
              { name: 'name', type: 'text', label: 'Type Name', placeholder: 'Short-term Fostering' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Providing temporary care for children while plans are made for their future. This could last from a few days to several months.' }
            ]
          }
        ] 
      },
      { 
        key: 'topAgencies', 
        label: 'Top Agencies in City', 
        description: 'Featured foster agencies in this city. Include agency names, summaries, and links.',
        contentGuidance: 'Highlight the top-rated foster agencies in this city with brief descriptions and links.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Top Foster Agencies in [City]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Connect with trusted fostering services in your local area' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Agencies',
            itemFields: [
              { name: 'name', type: 'text', label: 'Agency Name', placeholder: '[City] Family Care' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Leading local foster agency with over 10 years of experience providing quality care and support.' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'featured', type: 'boolean', label: 'Featured', placeholder: 'true' },
              { name: 'type', type: 'text', label: 'Type', placeholder: 'Local Authority' },
              { name: 'rating', type: 'number', label: 'Rating', placeholder: '4.8' },
              { name: 'reviewCount', type: 'number', label: 'Review Count', placeholder: '42' },
              { name: 'phone', type: 'text', label: 'Phone', placeholder: '+44 123 456 7890' },
              { name: 'email', type: 'text', label: 'Email', placeholder: 'info@agency.com' },
              { name: 'website', type: 'text', label: 'Website', placeholder: 'https://agency.com' }
            ]
          }
        ] 
      },
      { 
        key: 'whyFoster', 
        label: 'Why Foster in City', 
        description: 'Reasons why people should consider fostering in this city. Include compelling local reasons.',
        contentGuidance: 'Provide compelling reasons why someone should consider becoming a foster carer in this city.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Why Foster in [City]?' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Make a meaningful difference in the lives of children in your community' },
          { 
            name: 'points', 
            type: 'array', 
            label: 'Reasons',
            itemFields: [
              { name: 'text', type: 'text', label: 'Reason', placeholder: 'Community Support' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Access local support networks and resources specific to [City]' }
            ]
          }
        ] 
      },
      { 
        key: 'allowances', 
        label: 'Foster Allowances & Support in City', 
        description: 'Financial allowances and support services available in this city. Include local support details.',
        contentGuidance: 'Detail the financial allowances and support services available to foster carers in this city.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Foster Allowances & Support in [City]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Comprehensive support system for foster carers in [City]' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Support Items',
            itemFields: [
              { name: 'title', type: 'text', label: 'Title', placeholder: 'Weekly fostering allowances to cover child care costs' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Receive weekly fostering allowances to cover the costs of caring for a child.' }
            ]
          }
        ] 
      },
      { 
        key: 'resources', 
        label: 'Local Support & Resources', 
        description: 'Local resources and organizations that support foster carers. Include links and descriptions.',
        contentGuidance: 'Provide links to local resources and organizations that support foster carers in this city.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Local Support & Resources in [City]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Access community resources and support networks in [City]' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'Resources',
            itemFields: [
              { name: 'title', type: 'text', label: 'Title', placeholder: '[Region] [Local Authority]' },
              { name: 'link', type: 'text', label: 'Link', placeholder: '#' },
              { name: 'description', type: 'textarea', label: 'Description', placeholder: 'The local authority provides additional resources and support for foster carers in [City].' }
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
          { name: 'title', type: 'text', label: 'Title', placeholder: 'FAQs About Fostering in [City]' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Common questions about becoming a foster carer in [City]' },
          { 
            name: 'items', 
            type: 'array', 
            label: 'FAQ Items',
            itemFields: [
              { name: 'question', type: 'text', label: 'Question', placeholder: 'How do I find foster agencies in [City]?' },
              { name: 'answer', type: 'textarea', label: 'Answer', placeholder: 'There are several ways to find foster agencies in [City]...' }
            ]
          }
        ] 
      },
      { 
        key: 'regulated', 
        label: 'Trust Assurance / Regulation Bar', 
        description: 'Information about regulation and trust by UK authorities.',
        contentGuidance: 'Explain how the city\'s fostering system is regulated and trusted by UK authorities.',
        fields: [
          { name: 'regulator', type: 'text', label: 'Regulator', placeholder: 'Ofsted' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'All agencies meet strict regulatory standards' }
        ] 
      },
      { 
        key: 'cta', 
        label: 'Final CTA Section', 
        description: 'Final call-to-action section to encourage users to take the next step.',
        contentGuidance: 'Encourage users to take the next step in their fostering journey.',
        fields: [
          { name: 'title', type: 'text', label: 'Title', placeholder: 'Ready to Start Fostering in [City]?' },
          { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Speak with a foster care advisor today to learn more about opportunities in [City]' },
          { 
            name: 'cta_primary', 
            type: 'object', 
            label: 'Primary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'Talk to a Foster Advisor' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '/contact' }
            ]
          },
          { 
            name: 'cta_secondary', 
            type: 'object', 
            label: 'Secondary CTA',
            fields: [
              { name: 'text', type: 'text', label: 'Button Text', placeholder: 'View Agencies in [City]' },
              { name: 'link', type: 'text', label: 'Button Link', placeholder: '#agencies' }
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
        hero: {
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Get Foster Agency Support", link: "/contact" },
          cta_secondary: { text: "Explore Regions", link: "#regions" }
        },
        overview: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        },
        agencyFinder: {
          title: `Foster Agency Finder by Region`,
          intro: `Discover the best foster agencies across ${locationName} by region. Our comprehensive directory helps you find the perfect match for your fostering journey.`,
          ctaText: "Find Agencies by Region"
        },
        popularLocations: {
          title: `Featured Popular Locations in ${locationName}`,
          description: `Discover top cities and towns in ${locationName} with high demand for foster carers`,
          locations: [
            { name: "London", link: "#", demand: "High", agencies: "200+" },
            { name: "Manchester", link: "#", demand: "High", agencies: "75+" },
            { name: "Birmingham", link: "#", demand: "High", agencies: "65+" }
          ]
        },
        topAgencies: {
          title: `Top Foster Agencies in ${locationName}`,
          description: `Connect with trusted fostering services across ${locationName}`,
          items: [
            {
              name: `${locationName} Family Care`,
              summary: `Dedicated fostering service providing compassionate care for children in ${locationName}.`,
              link: "#",
              featured: true,
              type: "National",
              rating: 4.8,
              reviewCount: 42,
              phone: "+44 123 456 7890",
              email: `info@${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
              website: `https://${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
            }
          ]
        },
        fosterSystem: {
          title: `What is the Foster Care System Like in ${locationName}?`,
          sections: [
            {
              title: "Allowances & Support",
              items: [
                { title: "Weekly fostering allowances to cover child care costs" },
                { title: "24/7 support helpline for emergency assistance" },
                { title: "Regular supervision and mentoring" },
                { title: "Access to training and professional development" }
              ]
            },
            {
              title: "Matching Process",
              items: [
                { title: "Initial enquiry and information session" },
                { title: "Formal application and documentation" },
                { title: "Home study and assessment" },
                { title: "Approval panel review" }
              ]
            }
          ]
        },
        whyFoster: {
          title: `Why Choose to Foster in ${locationName}?`,
          description: `Make a meaningful difference in the lives of children in your community`,
          points: [
            { 
              text: "Help Children Locally", 
              description: "Provide stable, loving homes for children in your own community who need care and support." 
            },
            { 
              text: "Professional Support", 
              description: "Access comprehensive training, 24/7 support, and ongoing guidance from experienced professionals." 
            },
            { 
              text: "Make a Lasting Impact", 
              description: "Contribute to positive outcomes for vulnerable children and strengthen your local community." 
            }
          ]
        },
        faqs: {
          title: `FAQs About Fostering in ${locationName}`,
          description: `Common questions about becoming a foster carer in ${locationName}`,
          items: [
            {
              question: `Do you get paid to foster in ${locationName}?`,
              answer: `Yes, foster carers in ${locationName} receive a fostering allowance to cover the costs of caring for a child. The amount varies depending on the agency and the child's needs, typically ranging from £400-£600 per week per child.`
            },
            {
              question: `Who can foster in ${locationName}?`,
              answer: `To foster in ${locationName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. [Regulator] sets the standards for approval.`
            }
          ]
        },
        regulated: {
          regulator: "[Regulator]",
          description: "All agencies meet strict regulatory standards"
        },
        findAgencies: {
          title: "Find Agencies Near You",
          description: `Connect with local fostering services in ${locationName}`
        }
      };
      
    case 'region':
    case 'county':
      return {
        slug: location.canonical_slug || `/foster-agency/${location.slug}`,
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        hero: {
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Get Foster Agency Support", link: "/contact" },
          cta_secondary: { text: "Explore Cities", link: "#cities" }
        },
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.`
        },
        benefits: {
          title: `Benefits and Support for Foster Carers in ${locationName}`,
          description: `Comprehensive support system for foster carers in ${locationName}`,
          items: [
            {
              title: "Financial Support",
              description: "Receive competitive fostering allowances to cover the costs of caring for a child."
            },
            {
              title: "Additional Payments",
              description: "Additional payments for special circumstances."
            }
          ]
        },
        support: {
          title: "Professional Support",
          items: [
            {
              title: "24/7 support helpline for emergency assistance",
              description: "Access to 24/7 support helpline for emergency assistance."
            },
            {
              title: "Regular supervision and mentoring",
              description: "Regular supervision and mentoring from experienced professionals."
            }
          ]
        },
        training: {
          title: "Training and Development",
          programs: [
            {
              name: "Pre-approval Training",
              description: "Initial preparation courses before approval"
            },
            {
              name: "Induction Program",
              description: "Post-approval training for new carers"
            }
          ]
        },
        popularCities: {
          title: `Popular Cities in ${locationName}`,
          description: `Explore fostering opportunities in key cities across ${locationName}`,
          cities: [
            { 
              name: `Central ${locationName}`, 
              link: "#", 
              population: "Varies", 
              reason: `The heart of ${locationName} with excellent fostering opportunities and strong community support.` 
            },
            { 
              name: `Northern ${locationName}`, 
              link: "#", 
              population: "Varies", 
              reason: `Growing area with increasing demand for foster carers to support local children.` 
            }
          ]
        },
        topAgencies: {
          title: `Top Foster Agencies in ${locationName}`,
          description: `Discover the leading foster agencies in ${locationName} with excellent ratings and comprehensive support`,
          items: [
            {
              name: `${locationName} Family Care`,
              summary: `Dedicated fostering service providing compassionate care for children in ${locationName}.`,
              link: "#",
              featured: true,
              type: "Local Authority",
              rating: 4.8,
              reviewCount: 42,
              phone: "+44 123 456 7890",
              email: `info@${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
              website: `https://${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
            }
          ]
        },
        faqs: {
          title: `Frequently Asked Questions About Fostering in ${locationName}`,
          description: `Get answers to common questions about becoming a foster carer in ${locationName}`,
          items: [
            {
              question: `How many foster families are needed in ${locationName}?`,
              answer: `${locationName} has a continuous need for foster families to provide care for children and young people. The exact number varies based on local demand, but there is always a need for dedicated carers who can provide stable, loving homes.`
            },
            {
              question: `Who can foster a child in ${locationName}?`,
              answer: `To foster in ${locationName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. [Regulator] sets the standards for approval.`
            }
          ]
        },
        cta: {
          title: "Ready to Start Your Fostering Journey?",
          description: `Take the first step towards making a difference in a child's life in ${locationName}`,
          cta_primary: { text: "Talk to a Foster Advisor", link: "/contact" },
          cta_secondary: { text: "Download Information Pack", link: "#" }
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
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Talk to a Foster Advisor", link: "/contact" },
          cta_secondary: { text: "View Agencies", link: "#agencies" }
        },
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        },
        types: {
          title: `Types of Fostering Available in ${locationName}`,
          description: `Various fostering opportunities are available to suit different circumstances and preferences`,
          items: [
            {
              name: "Short-term Fostering",
              description: "Providing temporary care for children while plans are made for their future. This could last from a few days to several months."
            },
            {
              name: "Long-term Fostering",
              description: "Providing stable, long-term care for children who cannot return to their birth families. This often lasts until the child reaches adulthood."
            },
            {
              name: "Specialist Fostering",
              description: "Caring for children with specific needs, including disabilities, behavioral challenges, or those requiring therapeutic support."
            }
          ]
        },
        topAgencies: {
          title: `Top Foster Agencies in ${locationName}`,
          description: `Connect with trusted fostering services in your local area`,
          items: [
            {
              name: `${locationName} Family Care`,
              description: `Dedicated fostering service providing compassionate care for children in ${locationName}.`,
              link: "#",
              featured: true,
              type: "Local Authority",
              rating: 4.8,
              reviewCount: 42,
              phone: "+44 123 456 7890",
              email: `info@${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
              website: `https://${locationName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
            }
          ]
        },
        whyFoster: {
          title: `Why Foster in ${locationName}?`,
          description: `Make a meaningful difference in the lives of children in your community`,
          points: [
            { 
              text: "Community Support", 
              description: `Access local support networks and resources specific to ${locationName}` 
            },
            { 
              text: "Professional Training", 
              description: `Receive specialized training from [Regulator] approved programs` 
            },
            { 
              text: "Lasting Impact", 
              description: `Contribute to positive outcomes for vulnerable children in ${locationName}` 
            }
          ]
        },
        allowances: {
          title: `Foster Allowances & Support in ${locationName}`,
          description: `Comprehensive support system for foster carers in ${locationName}`,
          items: [
            {
              title: "Weekly fostering allowances to cover child care costs",
              description: "Receive weekly fostering allowances to cover the costs of caring for a child."
            },
            {
              title: "Additional payments for special circumstances",
              description: "Additional payments for special circumstances."
            }
          ]
        },
        resources: {
          title: `Local Support & Resources in ${locationName}`,
          description: `Access community resources and support networks in ${locationName}`,
          items: [
            {
              title: `[Region] [Local Authority]`,
              link: "#",
              description: `The local authority provides additional resources and support for foster carers in ${locationName}.`
            }
          ]
        },
        faqs: {
          title: `FAQs About Fostering in ${locationName}`,
          description: `Common questions about becoming a foster carer in ${locationName}`,
          items: [
            {
              question: `How do I find foster agencies in ${locationName}?`,
              answer: `There are several ways to find foster agencies in ${locationName}. You can browse our directory above, contact your local authority ([Regulator]) for recommendations, or search online for local fostering services. Most agencies offer initial consultations to discuss your interest in fostering.`
            },
            {
              question: `Who can foster a child in ${locationName}?`,
              answer: `To foster in ${locationName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. [Regulator] sets the standards for approval.`
            }
          ]
        },
        regulated: {
          regulator: "[Regulator]",
          description: "All agencies meet strict regulatory standards"
        },
        cta: {
          title: `Ready to Start Fostering in ${locationName}?`,
          description: `Speak with a foster care advisor today to learn more about opportunities in ${locationName}`,
          cta_primary: { text: "Talk to a Foster Advisor", link: "/contact" },
          cta_secondary: { text: `View Agencies in ${locationName}`, link: "#agencies" }
        }
      };
  }
};