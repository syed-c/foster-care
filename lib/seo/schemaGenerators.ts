/**
 * SEO Schema Generators for Foster Care Directory
 * 
 * This file contains functions to generate structured data (JSON-LD) for various
 * entity types to improve SEO and search engine understanding of the site.
 */

// Organization Schema
export function generateOrganizationSchema(organization: {
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    description: organization.description,
    ...(organization.foundingDate && { foundingDate: organization.foundingDate }),
    ...(organization.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: organization.address.streetAddress,
        addressLocality: organization.address.addressLocality,
        addressRegion: organization.address.addressRegion,
        postalCode: organization.address.postalCode,
        addressCountry: organization.address.addressCountry
      }
    }),
    ...(organization.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: organization.contactPoint.telephone,
        contactType: organization.contactPoint.contactType
      }
    })
  };
}

// Local Business Schema
export function generateLocalBusinessSchema(business: {
  name: string;
  url: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  priceRange?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    url: business.url,
    description: business.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry
    },
    ...(business.telephone && { telephone: business.telephone }),
    ...(business.priceRange && { priceRange: business.priceRange }),
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude
      }
    })
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// FAQ Schema
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
}

// Review Schema
export function generateReviewSchema(reviews: Array<{
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.ratingValue,
        ...(review.bestRating && { bestRating: review.bestRating }),
        ...(review.worstRating && { worstRating: review.worstRating })
      }
    }))
  };
}

// Article Schema
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  publisher: {
    name: string;
    logo: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.image && { image: article.image }),
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo
      }
    }
  };
}

// Foster Agency Schema
export function generateFosterAgencySchema(agency: {
  name: string;
  url: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  ratingValue?: number;
  reviewCount?: number;
  serviceArea?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService', // Using GovernmentService as closest match for fostering services
    name: agency.name,
    url: agency.url,
    description: agency.description,
    serviceType: 'Foster Care Services',
    provider: {
      '@type': 'Organization',
      name: agency.name,
      ...(agency.address && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: agency.address.streetAddress,
          addressLocality: agency.address.addressLocality,
          addressRegion: agency.address.addressRegion,
          postalCode: agency.address.postalCode,
          addressCountry: agency.address.addressCountry
        }
      }),
      ...(agency.telephone && { telephone: agency.telephone }),
      ...(agency.email && { email: agency.email })
    },
    ...(agency.ratingValue && agency.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: agency.ratingValue,
        reviewCount: agency.reviewCount
      }
    }),
    ...(agency.serviceArea && {
      areaServed: agency.serviceArea.map(area => ({
        '@type': 'Place',
        name: area
      }))
    })
  };
}

// Location Schema
export function generateLocationSchema(location: {
  name: string;
  url: string;
  description: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    url: location.url,
    description: location.description,
    ...(location.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.geo.latitude,
        longitude: location.geo.longitude
      }
    })
  };
}