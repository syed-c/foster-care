// Generic script to populate region content with proper section structure
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Content templates for different regions
const regionTemplates = {
  'north-west': {
    title: 'North West England',
    subheading: 'Discover rewarding fostering opportunities across Manchester, Liverpool, Lancashire, and Cheshire. Help provide stable, loving homes for children in the North West.',
    areas: [
      { name: 'Greater Manchester', population: 'Urban', reason: 'Major cities including Manchester with strong fostering communities' },
      { name: 'Merseyside', population: 'Urban', reason: 'Liverpool and surrounding areas with established fostering services' },
      { name: 'Lancashire', population: 'Mixed', reason: 'Combination of urban centers and rural communities' },
      { name: 'Cheshire', population: 'Mixed', reason: 'Prosperous areas with growing demand for foster carers' },
      { name: 'Cumbria', population: 'Rural', reason: 'Beautiful rural areas with close-knit communities' }
    ],
    faqs: [
      {
        question: 'What qualifications do I need to foster in the North West?',
        answer: 'No formal qualifications are required, but you must be over 21, financially stable, and able to provide a safe, nurturing environment. Agencies provide comprehensive training.'
      },
      {
        question: 'Can I foster in the North West if I rent?',
        answer: 'Yes, as long as you have a spare bedroom and stable housing. Landlord permission may be required.'
      }
    ]
  },
  'yorkshire': {
    title: 'Yorkshire and the Humber',
    subheading: 'Explore fostering opportunities across Yorkshire\'s diverse communities, from the bustling cities of Leeds and Sheffield to the scenic beauty of the Yorkshire Dales.',
    areas: [
      { name: 'West Yorkshire', population: 'Urban', reason: 'Major cities including Leeds and Bradford with strong fostering networks' },
      { name: 'South Yorkshire', population: 'Urban', reason: 'Sheffield and surrounding areas with established services' },
      { name: 'North Yorkshire', population: 'Rural', reason: 'Beautiful rural areas including the Yorkshire Dales and Moors' },
      { name: 'East Riding of Yorkshire', population: 'Mixed', reason: 'Combination of market towns and rural communities' },
      { name: 'Kingston upon Hull', population: 'Urban', reason: 'Major port city with dedicated fostering services' }
    ],
    faqs: [
      {
        question: 'How long does the fostering approval process take in Yorkshire?',
        answer: 'The process typically takes 4-6 months, including application, training, assessments, and panel review.'
      },
      {
        question: 'Are there specialist fostering opportunities in Yorkshire?',
        answer: 'Yes, many agencies offer specialist fostering for children with complex needs, sibling groups, and babies.'
      }
    ]
  },
  'east-england': {
    title: 'East of England',
    subheading: 'Make a difference in the lives of children across Cambridgeshire, Norfolk, Suffolk, Essex, Hertfordshire, and Bedfordshire. Join our community of dedicated foster carers.',
    areas: [
      { name: 'Cambridgeshire', population: 'Mixed', reason: 'University city and rural areas with growing fostering needs' },
      { name: 'Norfolk', population: 'Rural', reason: 'Beautiful countryside with close-knit fostering communities' },
      { name: 'Suffolk', population: 'Rural', reason: 'Coastal and rural areas with strong local support networks' },
      { name: 'Essex', population: 'Mixed', reason: 'Combination of urban centers and rural communities' },
      { name: 'Hertfordshire', population: 'Mixed', reason: 'Prosperous county with diverse fostering opportunities' },
      { name: 'Bedfordshire', population: 'Mixed', reason: 'Market towns and urban areas with growing demand' }
    ],
    faqs: [
      {
        question: 'Can single people foster in the East of England?',
        answer: 'Absolutely. Single people make excellent foster carers. What matters most is your ability to provide a stable, loving home.'
      },
      {
        question: 'What support is available for new foster carers in the East of England?',
        answer: 'Comprehensive support including 24/7 helplines, regular supervision, training opportunities, and access to support groups.'
      }
    ]
  },
  'west-midlands': {
    title: 'West Midlands',
    subheading: 'Help children thrive in the heart of England. From Birmingham to Shropshire, discover fulfilling fostering opportunities in the West Midlands.',
    areas: [
      { name: 'Birmingham', population: 'Urban', reason: 'Major city with diverse fostering needs and strong agency presence' },
      { name: 'Coventry', population: 'Urban', reason: 'Industrial city with established fostering services' },
      { name: 'Wolverhampton', population: 'Urban', reason: 'Major town with comprehensive fostering support' },
      { name: 'Staffordshire', population: 'Mixed', reason: 'Combination of urban centers and rural areas' },
      { name: 'Shropshire', population: 'Rural', reason: 'Beautiful rural areas with close-knit communities' },
      { name: 'Herefordshire', population: 'Rural', reason: 'Scenic county with growing fostering opportunities' },
      { name: 'Worcestershire', population: 'Mixed', reason: 'Market towns and rural areas with strong support networks' }
    ],
    faqs: [
      {
        question: 'Can I work full-time and foster in the West Midlands?',
        answer: 'Yes, many foster carers work full-time. However, you\'ll need flexibility for meetings, training, and supporting your foster child.'
      },
      {
        question: 'What are the age requirements for fostering in the West Midlands?',
        answer: 'You must be at least 21 years old with no upper age limit. Your health, energy, and commitment matter more than age.'
      }
    ]
  },
  'east-midlands': {
    title: 'East Midlands',
    subheading: 'Provide stable, loving homes for children across Derbyshire, Leicestershire, Lincolnshire, Nottinghamshire, and Northamptonshire. Make a lasting impact in the East Midlands.',
    areas: [
      { name: 'Derbyshire', population: 'Mixed', reason: 'Peak District and urban centers with diverse fostering needs' },
      { name: 'Leicestershire', population: 'Mixed', reason: 'Historic county with strong fostering communities' },
      { name: 'Lincolnshire', population: 'Rural', reason: 'Largest county in England with beautiful rural areas' },
      { name: 'Nottinghamshire', population: 'Mixed', reason: 'Major cities and rural areas with growing demand' },
      { name: 'Northamptonshire', population: 'Mixed', reason: 'Market towns and urban centers with diverse opportunities' }
    ],
    faqs: [
      {
        question: 'Do I need a spare room to foster in the East Midlands?',
        answer: 'Yes, you need a spare room to provide privacy and space for a foster child. This is a legal requirement.'
      },
      {
        question: 'How much are foster carers paid in the East Midlands?',
        answer: 'Foster carers receive tax-free allowances that vary by agency and the child\'s needs, typically £400-£600 per week per child.'
      }
    ]
  },
  'london': {
    title: 'London',
    subheading: 'Make a difference in one of the world\'s greatest cities. Help children from diverse backgrounds thrive in London\'s vibrant communities.',
    areas: [
      { name: 'Central London', population: 'Urban', reason: 'High demand with diverse fostering opportunities' },
      { name: 'North London', population: 'Urban', reason: 'Established fostering communities with strong agency presence' },
      { name: 'South London', population: 'Urban', reason: 'Growing need for foster carers in diverse neighborhoods' },
      { name: 'East London', population: 'Urban', reason: 'Dynamic areas with comprehensive fostering services' },
      { name: 'West London', population: 'Urban', reason: 'Prosperous areas with specialized fostering opportunities' }
    ],
    faqs: [
      {
        question: 'Is it difficult to foster in London?',
        answer: 'London has a high need for foster carers from all backgrounds. Agencies provide extensive support to help you succeed.'
      },
      {
        question: 'Can I foster in London if I live in a flat?',
        answer: 'Yes, as long as you have a spare room. Many London foster carers live in flats.'
      }
    ]
  },
  'south-west': {
    title: 'South West England',
    subheading: 'From Cornwall to Gloucestershire, discover rewarding fostering opportunities in the scenic South West. Help children thrive in our beautiful region.',
    areas: [
      { name: 'Cornwall', population: 'Rural', reason: 'Coastal county with close-knit fostering communities' },
      { name: 'Devon', population: 'Rural', reason: 'Beautiful rural areas with strong local support networks' },
      { name: 'Somerset', population: 'Rural', reason: 'Market towns and rural areas with growing fostering needs' },
      { name: 'Gloucestershire', population: 'Mixed', reason: 'Combination of Cotswolds and urban centers' },
      { name: 'Wiltshire', population: 'Rural', reason: 'Historic county with established fostering services' },
      { name: 'Dorset', population: 'Rural', reason: 'Coastal and rural areas with strong communities' },
      { name: 'Bristol', population: 'Urban', reason: 'Major city with diverse fostering opportunities' }
    ],
    faqs: [
      {
        question: 'What\'s the approval process like in the South West?',
        answer: 'The process takes 4-6 months and includes application, training, assessments, and panel review. Agencies provide support throughout.'
      },
      {
        question: 'Are there specialist fostering opportunities in the South West?',
        answer: 'Yes, agencies offer specialist fostering for children with complex needs, sibling groups, and babies.'
      }
    ]
  }
};

async function populateRegionContent(regionSlug) {
  try {
    console.log(`Populating region content for ${regionSlug} with section structure...`);
    
    // Get region template
    const template = regionTemplates[regionSlug];
    if (!template) {
      console.error(`No template found for region: ${regionSlug}`);
      return;
    }
    
    // First, find England country
    const { data: england, error: englandError } = await supabase
      .from('countries')
      .select('id')
      .eq('slug', 'england')
      .single();
    
    if (englandError) {
      console.error('Error finding England:', englandError.message);
      return;
    }
    
    // Find the region
    const { data: region, error: regionError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .eq('country_id', england.id)
      .eq('slug', regionSlug)
      .single();
    
    if (regionError) {
      console.error(`Error finding ${regionSlug} region:`, regionError.message);
      return;
    }
    
    console.log(`Found ${region.title} region with ID:`, region.id, 'slug:', region.slug);
    
    // Check if there's already a location entry for this region
    let { data: locationEntry, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('name', region.title)
      .eq('type', 'region')
      .maybeSingle();
    
    let locationId;
    
    if (!locationEntry) {
      // Create a location entry for this region
      console.log(`Creating location entry for ${region.title} region...`);
      
      const { data: newLocation, error: createError } = await supabase
        .from('locations')
        .insert({
          name: region.title,
          slug: region.slug,
          type: 'region',
          canonical_slug: `/foster-agency/england/${region.slug}`
        })
        .select('id')
        .single();
      
      if (createError) {
        console.error('Error creating location entry:', createError.message);
        return;
      }
      
      locationId = newLocation.id;
      console.log('Created location entry with ID:', locationId);
    } else {
      locationId = locationEntry.id;
      console.log('Found existing location entry with ID:', locationId);
    }
    
    // Define the content structure with proper sections
    const regionContent = {
      sections: [
        {
          type: 'hero',
          key: 'hero',
          data: {
            heading: `Fostering Agencies in ${template.title}`,
            subheading: template.subheading,
            cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
            cta_secondary: { text: 'Explore Areas', link: '#areas' }
          }
        },
        {
          type: 'about',
          key: 'about',
          data: {
            title: `Why Fostering in ${template.title} Matters`,
            body: `<p>${template.title} has a strong community of dedicated foster carers who make a meaningful difference in children's lives. With diverse communities ranging from bustling cities to scenic rural areas, there's a wide range of fostering opportunities to match your skills and interests.</p><p>Your local knowledge, lifestyle, and commitment can provide the stability and support that vulnerable children desperately need.</p>`
          }
        },
        {
          type: 'benefitsSupport',
          key: 'benefitsSupport',
          data: {
            title: `Independent and Local Authority Fostering Agencies in ${template.title}`,
            description: 'Choose from established independent agencies or local authority services, both offering comprehensive support.',
            items: [
              {
                title: `Independent Fostering Agencies in ${template.title}`,
                description: 'Independent agencies provide personalized training, dedicated supervising social workers, and 24/7 support. Benefits include: Flexible training schedules, Regular supervision visits, Dedicated support teams, Strong local carer networks. These agencies specialize in matching carers with children based on compatibility.'
              },
              {
                title: `Local Authority Fostering in ${template.title}`,
                description: `Local councils across ${template.title} offer their own fostering services. Advantages include: Placements close to the child's familiar area, Direct integration with local children's services, Connections to local schools and healthcare, Comprehensive local authority support. The choice depends on your preferences for support structure and agency size.`
              }
            ]
          }
        },
        {
          type: 'popularCities',
          key: 'popularCities',
          data: {
            title: `Fostering Across ${template.title}: Areas We Cover`,
            description: `Explore fostering opportunities across key areas in ${template.title}:`,
            cities: template.areas.map(area => ({
              name: area.name,
              link: '#',
              population: area.population,
              reason: area.reason
            }))
          }
        },
        {
          type: 'allowances',
          key: 'allowances',
          data: {
            title: `Support for Foster Carers in ${template.title}`,
            description: 'Comprehensive support ensures you\'re never alone in your fostering journey.',
            allowances: [
              {
                title: 'Financial Support and Allowances',
                description: 'Receive tax-free fostering allowances to cover the costs of caring for a child, plus additional payments for special needs or circumstances.'
              },
              {
                title: 'Training and Professional Development',
                description: 'Access initial training courses and ongoing professional development workshops to enhance your skills and confidence.'
              },
              {
                title: 'Emotional and Practical Support',
                description: '24/7 helpline for emergencies, regular supervising visits, peer support groups, and access to therapeutic services when needed.'
              }
            ]
          }
        },
        {
          type: 'faq',
          key: 'faq',
          data: {
            title: `${template.title} Foster Care FAQ`,
            description: `Answers to common questions about fostering in ${template.title}`,
            faqs: [
              ...template.faqs,
              {
                question: 'How long does the approval process take?',
                answer: 'The process typically takes 4-6 months, including application, training, assessments, and panel review.'
              },
              {
                question: 'Can I foster if I work full-time?',
                answer: 'Yes, many foster carers work full-time. However, flexibility is needed for meetings, training, and supporting your foster child\'s needs.'
              }
            ]
          }
        },
        {
          type: 'trustBar',
          key: 'trustBar',
          data: {
            title: `Safeguarding and Regulation in ${template.title}`,
            authorityName: 'Ofsted',
            authorityUrl: 'https://www.ofsted.gov.uk',
            ofstedNote: 'All agencies meet Ofsted\'s strict regulatory standards for child protection and care quality',
            safeguardingNote: 'Robust safeguarding procedures protect both children and foster carers throughout the process'
          }
        },
        {
          type: 'finalCta',
          key: 'finalCta',
          data: {
            title: `Start Exploring Fostering Agencies in ${template.title}`,
            subtitle: `Begin your journey to provide a stable, loving home for a child in ${template.title}. Take your time to research agencies and find the right fit for your family.`,
            primaryCta: { label: 'Contact Agencies Today', href: '/contact' }
          }
        }
      ]
    };
    
    // Create the canonical slug
    const canonicalSlug = `/foster-agency/england/${region.slug}`;
    
    console.log('Creating/updating content for canonical slug:', canonicalSlug);
    
    // Insert or update the location content
    const { data, error } = await supabase
      .from('location_content')
      .upsert({
        location_id: locationId,
        canonical_slug: canonicalSlug,
        content_json: regionContent,
        template_type: 'region'
      }, {
        onConflict: 'canonical_slug'
      });
    
    if (error) {
      console.error('Error inserting region content:', error.message);
      return;
    }
    
    console.log(`✅ Successfully populated region content for ${region.title} with section structure`);
    
    // Verify the content was inserted
    const { data: verifyData, error: verifyError } = await supabase
      .from('location_content')
      .select('content_json, location_id, canonical_slug')
      .eq('canonical_slug', canonicalSlug)
      .single();
    
    if (verifyError) {
      console.error('Error verifying content:', verifyError.message);
      return;
    }
    
    console.log('✅ Verified content insertion. Location ID:', verifyData.location_id, 'Canonical slug:', verifyData.canonical_slug);
    if (verifyData.content_json.sections) {
      console.log('Content sections:', verifyData.content_json.sections.map(s => s.type));
    } else {
      console.log('Content keys:', Object.keys(verifyData.content_json));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating region content:', error);
    process.exit(1);
  }
}

// Get region slug from command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Please provide a region slug as an argument');
  console.log('Available regions:', Object.keys(regionTemplates).join(', '));
  process.exit(1);
}

const regionSlug = args[0];
populateRegionContent(regionSlug);