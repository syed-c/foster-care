// Script to populate CMS with all regions content
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define the content structure templates for different regions
const regionTemplates = {
  'south-east': {
    title: 'Fostering Agencies in South East England',
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
  },
  'north-east': {
    title: 'Fostering Agencies in North East England',
    sections: [
      {
        type: 'hero',
        key: 'hero',
        data: {
          heading: 'Fostering Agencies in North East England',
          subheading: 'North East England has a significant need for foster carers to provide stable, loving homes for children. Areas including Newcastle upon Tyne, Sunderland, County Durham, Northumberland, and Teesside rely on dedicated foster families to make a lasting impact.',
          cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
          cta_secondary: { text: 'Explore Counties', link: '#counties' }
        }
      },
      {
        type: 'about',
        key: 'about',
        data: {
          title: 'Why Fostering in North East England Matters',
          body: '<p>The North East community is known for its warmth and resilience, qualities that make excellent foster carers. From urban centers to rural villages, children across the region benefit from the strong sense of community and support available to foster families.</p><p>With a mix of industrial heritage and growing modern developments, the region offers diverse fostering opportunities that suit various family lifestyles.</p>'
        }
      },
      {
        type: 'benefitsSupport',
        key: 'benefitsSupport',
        data: {
          title: 'Fostering Agencies in North East England',
          description: 'Both independent and local authority agencies operate throughout the region, each offering distinct benefits.',
          items: [
            {
              title: 'Independent Fostering Agencies in the North East',
              description: 'These agencies provide personalized support, specialized training, and 24/7 assistance. They often work with children who have complex needs and offer: Flexible training schedules, Dedicated supervising social workers, Regular support group meetings, Strong regional networks.'
            },
            {
              title: 'Local Authority Fostering in the North East',
              description: 'Council-run fostering services offer close integration with local schools, healthcare, and community services. Benefits include: Direct placement opportunities within your local area, Integrated support with children\'s services, Access to local authority benefits and allowances, Strong connections to educational resources.'
            }
          ]
        }
      },
      {
        type: 'popularCities',
        key: 'popularCities',
        data: {
          title: 'Fostering Across the North East: Areas We Cover',
          description: 'Discover fostering opportunities across major North East areas:',
          cities: [
            { 
              name: 'Newcastle upon Tyne', 
              link: '#', 
              population: 'Urban hub', 
              reason: 'Diverse fostering needs and strong support services' 
            },
            { 
              name: 'Sunderland', 
              link: '#', 
              population: 'Coastal city', 
              reason: 'Community-focused fostering with good agency support' 
            },
            { 
              name: 'County Durham', 
              link: '#', 
              population: 'Rural and semi-urban', 
              reason: 'Mix of rural and suburban fostering opportunities' 
            },
            { 
              name: 'Northumberland', 
              link: '#', 
              population: 'Rural', 
              reason: 'Unique rural fostering experiences with strong community ties' 
            },
            { 
              name: 'Teesside (Middlesbrough, Stockton)', 
              link: '#', 
              population: 'Industrial area', 
              reason: 'High demand for foster carers with growing support services' 
            }
          ]
        }
      },
      {
        type: 'allowances',
        key: 'allowances',
        data: {
          title: 'Support for Foster Carers in North East England',
          description: 'Comprehensive support ensures foster carers feel equipped and valued throughout their journey.',
          allowances: [
            {
              title: 'Financial Support and Allowances',
              description: 'Competitive allowances tailored to each child\'s needs, with additional payments for specialized care.'
            },
            {
              title: 'Training and Professional Development',
              description: 'Ongoing training programs covering child development, trauma-informed care, and specialized topics.'
            },
            {
              title: 'Emotional and Practical Support',
              description: '24/7 helplines, peer support groups, and dedicated social workers ensure continuous support.'
            }
          ]
        }
      },
      {
        type: 'faq',
        key: 'faq',
        data: {
          title: 'North East England Foster Care FAQ',
          description: 'Common questions about fostering in North East England',
          faqs: [
            {
              question: 'What qualifications do I need to foster?',
              answer: 'No formal qualifications are required, but you\'ll complete comprehensive training.'
            },
            {
              question: 'Can I foster if I live in rented accommodation?',
              answer: 'Yes, as long as you have a spare room and stable housing situation.'
            },
            {
              question: 'How much are foster carers paid in the North East?',
              answer: 'Allowances vary by agency and placement type, typically ranging from £400-£600 per week per child.'
            },
            {
              question: 'How long does the approval process take?',
              answer: 'Generally 4-6 months, though this can vary based on individual circumstances.'
            },
            {
              question: 'Can I work and be a foster carer?',
              answer: 'Many foster carers work, particularly with school-age children or respite placements.'
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
          title: 'Start Exploring Fostering Agencies in North East England',
          subtitle: 'Begin your fostering journey today by connecting with agencies that align with your values and lifestyle. Our team is ready to support you through every step of the process with personalized guidance and genuine care.',
          primaryCta: { label: 'Contact Us Today', href: '/contact' }
        }
      }
    ]
  }
};

async function populateAllRegionsCMS() {
  console.log('Populating CMS with all regions content...');
  
  try {
    // Get England country
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
    
    // Get all regions
    const { data: regions, error: regionsError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .eq('country_id', england.id);
    
    if (regionsError) {
      console.error('Error fetching regions:', regionsError.message);
      return;
    }
    
    console.log(`Found ${regions.length} regions`);
    
    // Process each region
    for (const region of regions) {
      try {
        console.log(`Processing region: ${region.title} (${region.slug})`);
        
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
          console.log(`Creating location entry for ${region.title}...`);
          
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
            console.error(`Error creating location entry for ${region.title}:`, createError.message);
            continue;
          }
          
          locationId = newLocation.id;
          console.log(`Created location entry with ID: ${locationId}`);
        } else {
          locationId = locationEntry.id;
          console.log(`Found existing location entry with ID: ${locationId}`);
        }
        
        // Create a CMS page entry
        const pageName = region.title;
        const pageSlug = `england/${region.slug}`;
        const pageType = 'location';
        
        const { data: cmsPage, error: pageError } = await supabase
          .from('cms_pages')
          .upsert({
            name: pageName,
            slug: pageSlug,
            type: pageType,
            description: `CMS page for ${pageName}`
          }, { onConflict: 'slug' })
          .select()
          .single();
        
        if (pageError) {
          console.error(`Error creating CMS page for ${pageName}:`, pageError.message);
          continue;
        }
        
        console.log(`Created/updated CMS page: ${pageName}`);
        
        // Get content template or create a basic one
        const template = regionTemplates[region.slug] || {
          title: `Fostering Agencies in ${region.title}`,
          sections: [
            {
              type: 'hero',
              key: 'hero',
              data: {
                heading: `Fostering Agencies in ${region.title}`,
                subheading: `Discover fostering opportunities in ${region.title}. Many children in this area need safe, loving homes.`,
                cta_primary: { text: 'Get Foster Agency Support', link: '/contact' },
                cta_secondary: { text: 'Explore Areas', link: '#areas' }
              }
            },
            {
              type: 'finalCta',
              key: 'finalCta',
              data: {
                title: `Start Exploring Fostering in ${region.title}`,
                subtitle: 'Begin your fostering journey today by connecting with local agencies that align with your values.',
                primaryCta: { label: 'Contact Us Today', href: '/contact' }
              }
            }
          ]
        };
        
        // Process sections
        for (const [index, section] of template.sections.entries()) {
          // Create CMS section
          const { data: cmsSection, error: sectionError } = await supabase
            .from('cms_page_sections')
            .upsert({
              page_id: cmsPage.id,
              section_key: section.key || section.type || `section_${index}`,
              section_type: section.type || 'unknown',
              title: section.data?.title || section.type,
              content: section.data,
              sort_order: index
            }, { onConflict: 'page_id,section_key' })
            .select()
            .single();
          
          if (sectionError) {
            console.error(`Error creating section for ${pageName}:`, sectionError.message);
            continue;
          }
          
          console.log(`  Created section: ${section.type}`);
          
          // Create fields for this section
          if (section.data) {
            let fieldIndex = 0;
            for (const [fieldKey, fieldValue] of Object.entries(section.data)) {
              // Skip complex objects for now, handle them separately
              if (typeof fieldValue === 'object' && fieldValue !== null) {
                continue;
              }
              
              const { error: fieldError } = await supabase
                .from('cms_section_fields')
                .upsert({
                  section_id: cmsSection.id,
                  field_key: fieldKey,
                  field_type: typeof fieldValue,
                  field_label: fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                  field_value: String(fieldValue),
                  sort_order: fieldIndex++
                }, { onConflict: 'section_id,field_key' });
              
              if (fieldError) {
                console.error(`Error creating field ${fieldKey}:`, fieldError.message);
              } else {
                console.log(`    Created field: ${fieldKey}`);
              }
            }
          }
        }
        
        console.log(`✅ Completed processing ${region.title}`);
      } catch (err) {
        console.error(`Error processing region ${region.slug}:`, err.message);
      }
    }
    
    console.log('✅ Content population completed for all regions');
    process.exit(0);
  } catch (error) {
    console.error('Error populating regions content:', error);
    process.exit(1);
  }
}

populateAllRegionsCMS();