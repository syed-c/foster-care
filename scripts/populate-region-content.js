// Script to populate region content for South East England with proper section structure
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function populateRegionContent() {
  try {
    console.log('Populating region content for South East England with section structure...');
    
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
    
    console.log('Found England with ID:', england.id);
    
    // Find South East region
    const { data: southEast, error: regionError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .eq('country_id', england.id)
      .eq('slug', 'south-east')
      .single();
    
    if (regionError) {
      console.error('Error finding South East region:', regionError.message);
      return;
    }
    
    console.log('Found South East region with ID:', southEast.id, 'slug:', southEast.slug, 'title:', southEast.title);
    
    // Check if there's already a location entry for this region
    let { data: locationEntry, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('name', southEast.title)
      .eq('type', 'region')
      .maybeSingle();
    
    let locationId;
    
    if (!locationEntry) {
      // Create a location entry for this region
      console.log('Creating location entry for South East region...');
      
      const { data: newLocation, error: createError } = await supabase
        .from('locations')
        .insert({
          name: southEast.title,
          slug: southEast.slug,
          type: 'region',
          canonical_slug: `/foster-agency/england/${southEast.slug}`
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
    
    // Define the content structure for South East with proper sections
    const regionContent = {
      sections: [
        {
          type: 'hero',
          key: 'hero',
          data: {
            heading: 'Fostering Agencies in South East England',
            subheading: 'South East England has one of the highest needs for foster carers in the UK. Many children across Kent, Surrey, Sussex, Berkshire, Oxfordshire, Buckinghamshire, and Hampshire need safe, loving homes where they can feel supported and understood.',
            cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
            cta_secondary: { text: 'Explore Counties', link: '#counties' }
          }
        },
        {
          type: 'about',
          key: 'about',
          data: {
            title: 'Why Fostering in South East England Matters',
            body: '<p>Families across the South East are already making a huge difference in children\'s lives. With busy towns, coastal communities, and rural areas, the region sees a wide range of fostering needs. Every child deserves consistency and care, and fostering gives them the stability they\'ve been searching for.</p><p>Understanding fostering in the South East helps you see how your home, routine, and lifestyle can offer a life-changing opportunity to a child.</p>'
          }
        },
        {
          type: 'benefitsSupport',
          key: 'benefitsSupport',
          data: {
            title: 'Independent and Local Authority Fostering Agencies in South East England',
            description: 'When looking for an agency, you\'ll find two main choices—both valid and both important.',
            items: [
              {
                title: 'Independent Fostering Agencies in the South East',
                description: 'Independent agencies support carers with flexible training, regular supervision, and dedicated support workers. Many offer: 24/7 support, Therapeutic training, Community events, Strong networks of local carers. These agencies often work with complex placements and understand the high demand across the region.'
              },
              {
                title: 'Local Authority Fostering in the South East',
                description: 'Local councils across Kent, Surrey, West Sussex, East Sussex, Hampshire, and other counties offer their own fostering services. People choose councils because: Many placements happen within the child\'s home area, You work closely with the local children\'s services, The support often ties directly into local schools and community networks. Choosing between independent fostering agencies and local authorities is a personal decision—your comfort matters most.'
              }
            ]
          }
        },
        {
          type: 'popularCities',
          key: 'popularCities',
          data: {
            title: 'Fostering Across the South East: Counties We Cover',
            description: 'You can explore fostering opportunities across all major South East areas, including:',
            cities: [
              { 
                name: 'Kent', 
                link: '#', 
                population: 'High demand', 
                reason: 'High demand and strong support services' 
              },
              { 
                name: 'Surrey', 
                link: '#', 
                population: 'Varies', 
                reason: 'Supportive networks and community-focused agencies' 
              },
              { 
                name: 'East Sussex & West Sussex', 
                link: '#', 
                population: 'Coastal and rural', 
                reason: 'Mix of coastal and rural fostering needs' 
              },
              { 
                name: 'Hampshire', 
                link: '#', 
                population: 'Large', 
                reason: 'Large fostering community with growing demand' 
              },
              { 
                name: 'Oxfordshire', 
                link: '#', 
                population: 'Varies', 
                reason: 'Strong council-led and independent fostering services' 
              },
              { 
                name: 'Buckinghamshire', 
                link: '#', 
                population: 'Varies', 
                reason: 'Supportive training and carer development' 
              },
              { 
                name: 'Berkshire', 
                link: '#', 
                population: 'Growing', 
                reason: 'Growing need for both short-term and long-term placements' 
              }
            ]
          }
        },
        {
          type: 'allowances',
          key: 'allowances',
          data: {
            title: 'Support for Foster Carers in South East England',
            description: 'Support systems in the South East are strong. Carers receive a combination of emotional, practical, and financial help.',
            allowances: [
              {
                title: 'Financial Support and Allowances',
                description: 'Agencies provide allowances tailored to each child\'s needs, plus additional support for specialist placements.'
              },
              {
                title: 'Training and Professional Development',
                description: 'You\'ll gain new skills through ongoing training, workshops, and specialist sessions.'
              },
              {
                title: 'Emotional and Practical Support',
                description: 'Support workers are available 24/7. Carer groups, mentoring, and peer support networks help you feel understood, especially during challenging moments.'
              }
            ]
          }
        },
        {
          type: 'faq',
          key: 'faq',
          data: {
            title: 'South East England Foster Care FAQ',
            description: 'Common questions about fostering in South East England',
            faqs: [
              {
                question: 'Do I need experience to foster?',
                answer: 'No. Agencies provide training and ongoing guidance.'
              },
              {
                question: 'Can I foster if I rent?',
                answer: 'Yes—stable housing and space for a child are what matter.'
              },
              {
                question: 'Are carers paid in the South East?',
                answer: 'Yes. Allowances vary by agency and the child\'s needs.'
              },
              {
                question: 'How long does approval take?',
                answer: 'Around four to six months for most people.'
              },
              {
                question: 'Can I foster if I work full-time?',
                answer: 'Yes, depending on placement type and your support system.'
              }
            ]
          }
        },
        {
          type: 'trustBar',
          key: 'trustBar',
          data: {
            title: 'Safeguarding and Responsibility',
            authorityName: 'Ofsted',
            authorityUrl: 'https://www.ofsted.gov.uk',
            ofstedNote: 'All agencies meet strict regulatory standards',
            safeguardingNote: 'Child safety—and your safety—always come first'
          }
        },
        {
          type: 'finalCta',
          key: 'finalCta',
          data: {
            title: 'Start Exploring Fostering Agencies in South East England',
            subtitle: 'Take your time, explore profiles, compare support, and choose the agency that feels right for your home. Your fostering journey can begin with one simple step—and we\'re here to guide you with warmth and clarity.',
            primaryCta: { label: 'Contact Us Today', href: '/contact' }
          }
        }
      ]
    };
    
    // Create the canonical slug
    const canonicalSlug = `/foster-agency/england/${southEast.slug}`;
    
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
    
    console.log('✅ Successfully populated region content for South East England with section structure');
    
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

populateRegionContent();