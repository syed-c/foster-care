// Script to seed content blocks for the England country page
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedContentBlocks() {
  console.log('Seeding content blocks for England...');
  
  try {
    // First, get the England country ID
    const { data: england, error: countryError } = await supabase
      .from('countries')
      .select('id')
      .eq('slug', 'england')
      .single();
      
    if (countryError || !england) {
      console.error('❌ Error finding England:', countryError?.message || 'Country not found');
      return;
    }
    
    console.log(`✅ Found England with ID: ${england.id}`);
    
    // Define the content blocks
    const blocks = [
      {
        type: 'hero',
        country_id: england.id,
        content_json: {
          title: 'Fostering Agencies in England',
          subtitle: 'England has one of the most active fostering communities in the UK, and many children still need safe, caring families every single day.',
          ctaText: 'Get Foster Agency Support',
          ctaLink: '/contact'
        },
        order: 1
      },
      {
        type: 'intro',
        country_id: england.id,
        content_json: {
          html: `
            <p>Our platform helps you explore fostering agencies in England in a simple and supportive way, giving you clear information, trusted guidance, and space to choose the right agency at your own pace.</p>
            <p>Whether you're just beginning or already comparing options, this page helps you understand the entire landscape of foster care England with confidence and clarity.</p>
          `
        },
        order: 2
      },
      {
        type: 'whyFosteringMatters',
        country_id: england.id,
        content_json: {
          title: 'Why Fostering in England Matters',
          items: [
            {
              title: 'Every Child Deserves Stability',
              description: 'Many children across England face difficult situations, and foster carers become the steady support they need to grow and feel safe again.'
            },
            {
              title: 'Your Meaningful Role',
              description: 'Understanding fostering in England helps you see how meaningful your role can be—whether you care for a child for a short period or give them a long-term home.'
            },
            {
              title: 'Supported Journey',
              description: 'Your journey matters, and the support you receive from the right agency will shape your entire experience.'
            }
          ]
        },
        order: 3
      },
      {
        type: 'typesOfFostering',
        country_id: england.id,
        content_json: {
          title: 'Types of Fostering in England',
          items: [
            {
              title: 'Short-Term and Long-Term Fostering',
              description: 'Short-term fostering supports children during transitions, while long-term fostering provides stability until adulthood or independence.'
            },
            {
              title: 'Emergency and Respite Fostering',
              description: 'Emergency fostering helps children who need immediate safety. Respite fostering gives families short breaks to recharge and continue offering strong care.'
            },
            {
              title: 'Therapeutic and Specialist Fostering',
              description: 'These placements support children with higher emotional or behavioural needs. Agencies offer strong training and wraparound support for carers in these roles.'
            },
            {
              title: 'Parent and Child Fostering',
              description: 'You support a young parent and their baby, helping them build stability and develop parenting skills within your home.'
            }
          ]
        },
        order: 4
      },
      {
        type: 'supportInfo',
        country_id: england.id,
        content_json: {
          title: 'Support for Foster Carers in England',
          description: 'Strong support makes fostering sustainable and rewarding. Agencies in England usually provide a mix of emotional, practical, and financial help.',
          items: [
            'Financial Support and Allowances',
            'Training and Professional Development',
            'Emotional and Practical Support',
            '24/7 Emergency Assistance'
          ]
        },
        order: 5
      },
      {
        type: 'faq',
        country_id: england.id,
        content_json: {
          title: 'England Foster Care FAQ',
          items: [
            {
              question: 'Do I need experience to foster in England?',
              answer: 'No. Agencies provide full training and guidance to help you begin confidently.'
            },
            {
              question: 'How long does the approval process take?',
              answer: 'On average, approval takes four to six months.'
            },
            {
              question: 'Can I foster if I work full-time?',
              answer: 'Yes, depending on your schedule, placement type, and support system.'
            },
            {
              question: 'Are foster carers paid in England?',
              answer: 'Yes. Allowances and additional support vary depending on the agency and the needs of the child.'
            },
            {
              question: 'Can I foster if I rent my home?',
              answer: 'Yes. Renting is fine as long as your home is stable and has enough space.'
            }
          ]
        },
        order: 6
      },
      {
        type: 'cta',
        country_id: england.id,
        content_json: {
          title: 'Start Exploring Fostering Agencies in England',
          subtitle: 'Take your time, read profiles, compare support, and choose the agency that feels right for your home.',
          ctaText: 'Contact Us Today',
          ctaLink: '/contact'
        },
        order: 7
      }
    ];
    
    // Insert the blocks
    const { data: insertedBlocks, error: blocksError } = await supabase
      .from('country_page_blocks')
      .insert(blocks)
      .select();
      
    if (blocksError) {
      console.error('❌ Error inserting content blocks:', blocksError.message);
      return;
    }
    
    console.log(`✅ Inserted ${insertedBlocks.length} content blocks`);
    
    console.log('\n🎉 Content blocks seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Visit /foster-agency/england to see the updated page');
    
  } catch (error) {
    console.error('❌ Seeding failed with unexpected error:', error.message);
    console.error('Full error:', error);
  }
}

seedContentBlocks();