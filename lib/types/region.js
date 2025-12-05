// Region content schema type

/**
 * @typedef {Object} BreadcrumbSection
 * @property {'breadcrumb'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {Array<{label: string, href: string}>} data.items
 */

/**
 * @typedef {Object} HeroSection
 * @property {'hero'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.heading
 * @property {string} data.subheading
 * @property {Object} data.cta_primary
 * @property {string} data.cta_primary.text
 * @property {string} data.cta_primary.link
 * @property {Object} data.cta_secondary
 * @property {string} data.cta_secondary.text
 * @property {string} data.cta_secondary.link
 */

/**
 * @typedef {Object} AboutSection
 * @property {'about'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.body
 */

/**
 * @typedef {Object} BenefitsSupportSection
 * @property {'benefitsSupport'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.description
 * @property {Array<{title: string, description: string}>} data.items
 */

/**
 * @typedef {Object} PopularCitiesSection
 * @property {'popularCities'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.description
 * @property {Array<{name: string, link: string, population: string, reason: string}>} data.cities
 */

/**
 * @typedef {Object} AllowancesSection
 * @property {'allowances'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.description
 * @property {Array<{title: string, description: string}>} data.allowances
 */

/**
 * @typedef {Object} TestimonialsSection
 * @property {'testimonials'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {Array<{name: string, location: string, quote: string, rating: number}>} data.testimonials
 */

/**
 * @typedef {Object} FaqSection
 * @property {'faq'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.description
 * @property {Array<{question: string, answer: string}>} data.faqs
 */

/**
 * @typedef {Object} TrustBarSection
 * @property {'trustBar'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.authorityName
 * @property {string} data.authorityUrl
 * @property {string} data.ofstedNote
 * @property {string} [data.safeguardingNote]
 */

/**
 * @typedef {Object} FinalCtaSection
 * @property {'finalCta'} type
 * @property {string} [id]
 * @property {string} [key]
 * @property {Object} data
 * @property {string} data.title
 * @property {string} data.subtitle
 * @property {Object} data.primaryCta
 * @property {string} data.primaryCta.label
 * @property {string} data.primaryCta.href
 * @property {Object} [data.secondaryCta]
 * @property {string} data.secondaryCta.label
 * @property {string} data.secondaryCta.href
 */

/**
 * @typedef {BreadcrumbSection | HeroSection | AboutSection | BenefitsSupportSection | PopularCitiesSection | AllowancesSection | TestimonialsSection | FaqSection | TrustBarSection | FinalCtaSection} RegionSection
 */

/**
 * @typedef {Object} RegionPage
 * @property {string} id
 * @property {string} slug
 * @property {string} countrySlug
 * @property {string} h1
 * @property {string} heroSubtitle
 * @property {Object} heroCtas
 * @property {string} heroCtas.primaryLabel
 * @property {string} heroCtas.primaryHref
 * @property {string} [heroCtas.secondaryLabel]
 * @property {string} [heroCtas.secondaryHref]
 * @property {RegionSection[]} sections
 */

// Export empty object to make this a module
// This file provides JSDoc type definitions for region content
// Import this file for type checking in JavaScript files

export {}