// Script to populate region content for South East England
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function populateRegionContent() {
  try {
    console.log('Populating region content for South East England...');
    
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
    
    // Define the content structure for South East
    const regionContent = {
      about: "South East England has one of the highest needs for foster carers in the UK. Many children across Kent, Surrey, Sussex, Berkshire, Oxfordshire, Buckinghamshire, and Hampshire need safe, loving homes where they can feel supported and understood. Our platform helps you explore fostering agencies in South East England with clear guidance, honest information, and a warm, friendly tone that makes your journey feel steady and manageable. Whether you're beginning your research or ready to take the next step, this page helps you navigate foster care South East with confidence.",
      why: "Families across the South East are already making a huge difference in children's lives. With busy towns, coastal communities, and rural areas, the region sees a wide range of fostering needs. Every child deserves consistency and care, and fostering gives them the stability they've been searching for. Understanding fostering in the South East helps you see how your home, routine, and lifestyle can offer a life-changing opportunity to a child.",
      types: [
        "Short-Term and Long-Term Fostering - Short-term fostering offers care during transitions. Long-term fostering provides a stable home until adulthood or independence.",
        "Emergency and Respite Fostering - Emergency foster carers help children who need immediate support. Respite carers offer short breaks to families or other carers.",
        "Therapeutic and Specialist Fostering - Some children need more emotional support. Agencies provide specialist training and guidance so you feel confident and prepared.",
        "Parent and Child Fostering - You support a young parent and their baby, helping them develop parenting skills in a safe environment."
      ],
      support: [
        "Financial Support and Allowances - Agencies provide allowances tailored to each child's needs, plus additional support for specialist placements.",
        "Training and Professional Development - You'll gain new skills through ongoing training, workshops, and specialist sessions.",
        "Emotional and Practical Support - Support workers are available 24/7. Carer groups, mentoring, and peer support networks help you feel understood, especially during challenging moments.",
        "24/7 Emergency Assistance - Round-the-clock support for urgent matters and crisis situations."
      ],
      faq: [
        { q: "Do I need experience to foster?", a: "No. Agencies provide training and ongoing guidance." },
        { q: "Can I foster if I rent?", a: "Yes—stable housing and space for a child are what matter." },
        { q: "Are carers paid in the South East?", a: "Yes. Allowances vary by agency and the child's needs." },
        { q: "How long does approval take?", a: "Around four to six months for most people." },
        { q: "Can I foster if I work full-time?", a: "Yes, depending on placement type and your support system." }
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
    
    console.log('✅ Successfully populated region content for South East England');
    
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
    console.log('Content keys:', Object.keys(verifyData.content_json));
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating region content:', error);
    process.exit(1);
  }
}

populateRegionContent();