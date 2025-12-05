# SEO Schema Generators

## Overview
This document defines the SEO schema generators for all entity types in the Foster Care Directory UK platform. These generators will produce structured data in JSON-LD format to enhance search engine visibility and rich snippets.

## Schema Generator Functions

### 1. Organization Schema
```typescript
// lib/seo/schemaGenerators.ts

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export const generateOrganizationSchema = (data: OrganizationData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    ...(data.foundingDate && { foundingDate: data.foundingDate }),
    ...(data.address && { 
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.streetAddress,
        addressLocality: data.address.addressLocality,
        addressRegion: data.address.addressRegion,
        postalCode: data.address.postalCode,
        addressCountry: data.address.addressCountry
      }
    }),
    ...(data.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType
      }
    })
  };
};
```

### 2. LocalBusiness Schema
```typescript
interface LocalBusinessData {
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
}

export const generateLocalBusinessSchema = (data: LocalBusinessData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    image: data.image,
    '@id': data['@id'],
    url: data.url,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry
    },
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude
      }
    }),
    ...(data.openingHoursSpecification && {
      openingHoursSpecification: data.openingHoursSpecification.map(spec => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: spec.dayOfWeek,
        opens: spec.opens,
        closes: spec.closes
      }))
    })
  };
};
```

### 3. Breadcrumb Schema
```typescript
interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.item
    }))
  };
};
```

### 4. FAQ Schema
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

export const generateFAQSchema = (faqItems: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};
```

### 5. Review Schema
```typescript
interface ReviewData {
  reviewBody: string;
  reviewRating: number;
  author: string;
  datePublished: string;
  itemReviewed: {
    '@type': string;
    name: string;
  };
}

export const generateReviewSchema = (data: ReviewData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: data.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.reviewRating,
      bestRating: 5
    },
    author: {
      '@type': 'Person',
      name: data.author
    },
    datePublished: data.datePublished,
    itemReviewed: {
      '@type': data.itemReviewed['@type'],
      name: data.itemReviewed.name
    }
  };
};
```

### 6. Article/Blog Schema
```typescript
interface ArticleData {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  publisher: {
    name: string;
    logo: string;
  };
  articleBody?: string;
}

export const generateArticleSchema = (data: ArticleData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: data.image,
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo
      }
    },
    ...(data.articleBody && { articleBody: data.articleBody })
  };
};
```

### 7. Agency Profile Schema
```typescript
interface AgencySchemaData {
  name: string;
  description: string;
  url: string;
  logo: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  priceRange?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const generateAgencySchema = (data: AgencySchemaData) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry
    },
    telephone: data.telephone,
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude
      }
    })
  };

  // Add aggregate rating if available
  if (data.aggregateRating) {
    return {
      ...baseSchema,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount
      }
    };
  }

  return baseSchema;
};
```

### 8. Location Schema
```typescript
interface LocationSchemaData {
  name: string;
  description: string;
  url: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  containsPlace?: Array<{
    '@type': string;
    name: string;
    url: string;
  }>;
}

export const generateLocationSchema = (data: LocationSchemaData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude
      }
    }),
    ...(data.containsPlace && {
      containsPlace: data.containsPlace
    })
  };
};
```

## Implementation in Components

### Using Schema Generators in Pages
```tsx
// Example: Agency Profile Page
import { generateAgencySchema, generateBreadcrumbSchema, generateReviewSchema } from '@/lib/seo/schemaGenerators';

export default function AgencyProfilePage({ agency, reviews }) {
  // Generate schemas
  const agencySchema = generateAgencySchema({
    name: agency.name,
    description: agency.description,
    url: `https://fostercare.co.uk/fostering-agencies-uk/${agency.country}/${agency.region}/${agency.city}/${agency.slug}`,
    logo: agency.logo_url,
    address: {
      streetAddress: agency.address,
      addressLocality: agency.city,
      addressRegion: agency.region,
      postalCode: agency.postcode,
      addressCountry: agency.country
    },
    telephone: agency.contact_phone,
    geo: {
      latitude: agency.latitude,
      longitude: agency.longitude
    },
    aggregateRating: {
      ratingValue: agency.rating,
      reviewCount: agency.review_count
    }
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { position: 1, name: 'Home', item: 'https://fostercare.co.uk/' },
    { position: 2, name: 'Fostering Agencies', item: 'https://fostercare.co.uk/fostering-agencies-uk' },
    { position: 3, name: agency.country, item: `https://fostercare.co.uk/fostering-agencies-uk/${agency.country}` },
    { position: 4, name: agency.region, item: `https://fostercare.co.uk/fostering-agencies-uk/${agency.country}/${agency.region}` },
    { position: 5, name: agency.city, item: `https://fostercare.co.uk/fostering-agencies-uk/${agency.country}/${agency.region}/${agency.city}` },
    { position: 6, name: agency.name, item: `https://fostercare.co.uk/fostering-agencies-uk/${agency.country}/${agency.region}/${agency.city}/${agency.slug}` }
  ]);

  const reviewSchemas = reviews.map(review => generateReviewSchema({
    reviewBody: review.comment,
    reviewRating: review.stars,
    author: review.user_name,
    datePublished: review.created_at,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: agency.name
    }
  }));

  return (
    <>
      {/* Render JSON-LD Schemas */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      {reviewSchemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
        />
      ))}
      
      {/* Rest of the page content */}
      <div>...</div>
    </>
  );
}
```

## Dynamic Sitemap Generation

### Sitemap Generator Function
```typescript
// lib/seo/sitemapGenerator.ts

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (entries: SitemapEntry[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  
  const xmlUrls = entries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''}
  </url>`).join('');
  
  const xmlFooter = '\n</urlset>';
  
  return xmlHeader + xmlUrls + xmlFooter;
};
```

## Robots.txt Generation

### Dynamic Robots.txt
```typescript
// app/robots.ts

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/agency-dashboard/', '/auth/']
    },
    sitemap: 'https://fostercare.co.uk/sitemap.xml'
  };
}
```

## Meta Tag Generation

### Dynamic Meta Tags
```typescript
// lib/seo/metaTags.ts

interface MetaTags {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}

export const generateMetaTags = (data: MetaTags) => {
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url,
      siteName: 'Foster Care Directory UK',
      images: data.image ? [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.title
        }
      ] : undefined,
      locale: 'en_GB',
      type: data.type || 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.image ? [data.image] : undefined
    }
  };
};
```

## Implementation Strategy

1. **Schema Generation**: Each page will generate relevant schema markup based on its content
2. **Dynamic Updates**: Schemas will update when content changes
3. **Performance**: Schemas will be generated server-side to minimize client-side processing
4. **Validation**: All generated schemas will be validated against schema.org standards
5. **Testing**: Schema markup will be tested using Google's Rich Results Test tool

This comprehensive SEO implementation will ensure maximum visibility in search engines and rich snippet generation for improved click-through rates.