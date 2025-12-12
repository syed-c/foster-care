// Script to populate region content for North East England with proper section structure
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function populateNorthEastContent() {
  try {
    console.log('Populating region content for North East England with section structure...');
    
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
    
    // Find North East region
    const { data: northEast, error: regionError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .eq('country_id', england.id)
      .eq('slug', 'north-east')
      .single();
    
    if (regionError) {
      console.error('Error finding North East region:', regionError.message);
      return;
    }
    
    console.log('Found North East region with ID:', northEast.id, 'slug:', northEast.slug, 'title:', northEast.title);
    
    // Check if there's already a location entry for this region
    let { data: locationEntry, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('name', northEast.title)
      .eq('type', 'region')
      .maybeSingle();
    
    let locationId;
    
    if (!locationEntry) {
      // Create a location entry for this region
      console.log('Creating location entry for North East region...');
      
      const { data: newLocation, error: createError } = await supabase
        .from('locations')
        .insert({
          name: northEast.title,
          slug: northEast.slug,
          type: 'region',
          canonical_slug: `/foster-agency/england/${northEast.slug}`
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
    
    // Define the content structure for North East with proper sections
    const regionContent = {
      sections: [
        {
          type: 'hero',
          key: 'hero',
          data: {
            heading: 'Fostering Agencies in North East England',
            subheading: 'North East England offers rewarding opportunities to make a positive impact on children\'s lives. Discover accredited foster agencies in Tyne and Wear, County Durham, and Northumberland.',
            cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
            cta_secondary: { text: 'Explore Areas', link: '#areas' }
          }
        },
        {
          type: 'about',
          key: 'about',
          data: {
            title: 'Why Fostering in North East England Matters',
            body: '<p>The North East community is passionate about supporting vulnerable children. With a mix of urban centers like Newcastle and Sunderland, and rural areas across County Durham and Northumberland, there\'s a diverse range of fostering needs.</p><p>Your home, routine, and local knowledge can offer life-changing stability to children who need it most.</p>'
          }
        },
        {
          type: 'benefitsSupport',
          key: 'benefitsSupport',
          data: {
            title: 'Independent and Local Authority Fostering Agencies in North East England',
            description: 'Choose from established independent agencies or local authority services, both offering comprehensive support.',
            items: [
              {
                title: 'Independent Fostering Agencies in the North East',
                description: 'Independent agencies provide personalized training, dedicated supervising social workers, and 24/7 support. Benefits include: Flexible training schedules, Regular supervision visits, Dedicated support teams, Strong local carer networks. These agencies specialize in matching carers with children based on compatibility.'
              },
              {
                title: 'Local Authority Fostering in the North East',
                description: 'Local councils in Newcastle, Sunderland, Middlesbrough, and County Durham offer their own fostering services. Advantages include: Placements close to the child\'s familiar area, Direct integration with local children\'s services, Connections to local schools and healthcare, Comprehensive local authority support. The choice depends on your preferences for support structure and agency size.'
              }
            ]
          }
        },
        {
          type: 'popularCities',
          key: 'popularCities',
          data: {
            title: 'Fostering Across the North East: Areas We Cover',
            description: 'Explore fostering opportunities across key North East areas:',
            cities: [
              { 
                name: 'Tyne and Wear', 
                link: '#', 
                population: 'Urban', 
                reason: 'Major cities including Newcastle and Sunderland with strong fostering communities' 
              },
              { 
                name: 'County Durham', 
                link: '#', 
                population: 'Mixed', 
                reason: 'Combination of urban centers and rural communities with growing demand' 
              },
              { 
                name: 'Northumberland', 
                link: '#', 
                population: 'Rural', 
                reason: 'Beautiful rural areas with close-knit fostering communities' 
              },
              { 
                name: 'Teesside', 
                link: '#', 
                population: 'Industrial', 
                reason: 'Former industrial areas with strong community support networks' 
              }
            ]
          }
        },
        {
          type: 'allowances',
          key: 'allowances',
          data: {
            title: 'Support for Foster Carers in North East England',
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
            title: 'North East England Foster Care FAQ',
            description: 'Answers to common questions about fostering in the North East',
            faqs: [
              {
                question: 'Do I need experience to foster in the North East?',
                answer: 'No previous experience is required. Agencies provide comprehensive training and ongoing support throughout your fostering journey.'
              },
              {
                question: 'Can I foster in the North East if I rent?',
                answer: 'Yes, as long as you have a spare bedroom and stable housing situation. Landlord permission may be required.'
              },
              {
                question: 'How much are foster carers paid in the North East?',
                answer: 'Foster carers receive tax-free allowances that vary by agency and the child\'s needs, typically ranging from £400-£600 per week per child.'
              },
              {
                question: 'How long does the approval process take?',
                answer: 'The process typically takes 4-6 months, including application, training, assessments, and panel review.'
              },
              {
                question: 'Can I work full-time and foster in the North East?',
                answer: 'Yes, many foster carers work full-time. However, flexibility is needed for meetings, training, and supporting your foster child\'s needs.'
              }
            ]
          }
        },
        {
          type: 'trustBar',
          key: 'trustBar',
          data: {
            title: 'Safeguarding and Regulation in the North East',
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
            title: 'Start Exploring Fostering Agencies in North East England',
            subtitle: 'Begin your journey to provide a stable, loving home for a child in the North East. Take your time to research agencies and find the right fit for your family.',
            primaryCta: { label: 'Contact Agencies Today', href: '/contact' }
          }
        }
      ]
    };
    
    // Create the canonical slug
    const canonicalSlug = `/foster-agency/england/${northEast.slug}`;
    
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
    
    console.log('✅ Successfully populated region content for North East England with section structure');
    
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

populateNorthEastContent();