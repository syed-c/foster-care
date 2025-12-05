import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables');
  console.error('Please set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN');
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-10-30',
  useCdn: false
});

// Define initial pages
const initialPages = [
  {
    title: 'Home Page',
    slug: 'home',
    seo: {
      title: 'Foster Care Directory UK - Connecting Families with Fostering Agencies',
      description: 'The UK\'s most trusted fostering directory. Find verified fostering agencies, read reviews, and connect with caring opportunities across the United Kingdom.'
    }
  },
  {
    title: 'About Us',
    slug: 'about',
    seo: {
      title: 'About Foster Care UK - Our Mission and Story',
      description: 'Learn about our mission to connect caring hearts with children in need through fostering opportunities across the UK.'
    }
  },
  {
    title: 'Contact',
    slug: 'contact',
    seo: {
      title: 'Contact Foster Care UK - Get in Touch',
      description: 'Contact our team for questions about fostering, agency partnerships, or support services.'
    }
  },
  {
    title: 'Becoming a Foster Carer',
    slug: 'becoming-a-foster-carer',
    seo: {
      title: 'Becoming a Foster Carer - Your Journey Starts Here',
      description: 'Everything you need to know about becoming a foster carer in the UK, from requirements to the application process.'
    }
  },
  {
    title: 'Types of Fostering',
    slug: 'types-of-fostering',
    seo: {
      title: 'Types of Fostering - Find Your Perfect Match',
      description: 'Explore different types of fostering opportunities available in the UK, from short-term to long-term placements.'
    }
  },
  {
    title: 'Support Services',
    slug: 'support-services',
    seo: {
      title: 'Support Services for Foster Carers - Ongoing Help',
      description: 'Discover the comprehensive support services available to foster carers throughout their journey.'
    }
  },
  {
    title: 'Resources',
    slug: 'resources',
    seo: {
      title: 'Fostering Resources and Guides - Helpful Information',
      description: 'Access helpful resources, guides, and information about fostering in the UK.'
    }
  },
  {
    title: 'FAQ',
    slug: 'faq',
    seo: {
      title: 'Frequently Asked Questions - Fostering FAQ',
      description: 'Find answers to common questions about fostering, agencies, and the application process.'
    }
  },
  {
    title: 'Blog',
    slug: 'blog',
    seo: {
      title: 'Fostering Blog - Stories and Insights',
      description: 'Read stories from foster carers, agency insights, and helpful articles about fostering in the UK.'
    }
  }
];

async function createInitialPages() {
  console.log('Creating initial pages...');
  
  for (const page of initialPages) {
    try {
      // Check if page already exists
      const existingPage = await client.fetch(
        `*[_type == "page" && slug.current == $slug][0]`,
        { slug: page.slug }
      );
      
      if (existingPage) {
        console.log(`Page "${page.title}" already exists, skipping...`);
        continue;
      }
      
      // Create new page
      const newPage = {
        _type: 'page',
        title: page.title,
        slug: {
          _type: 'slug',
          current: page.slug
        },
        seo: {
          _type: 'seo',
          title: page.seo.title,
          description: page.seo.description
        }
      };
      
      const result = await client.create(newPage);
      console.log(`Created page: ${page.title} (${result._id})`);
    } catch (error) {
      console.error(`Error creating page "${page.title}":`, error.message);
    }
  }
  
  console.log('Finished creating initial pages.');
}

createInitialPages().catch(console.error);