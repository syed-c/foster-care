export type PageType = 'country' | 'region' | 'city';

export interface BaseSeo {
  title?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface HeroSection {
  heading: string;
  subheading?: string;
  body?: string;
  cta_primary_text?: string;
  cta_primary_href?: string;
  cta_secondary_text?: string;
  cta_secondary_href?: string;
  image_url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PopularLocationItem {
  name: string;
  link: string; // canonical slug or URL
}

export interface ReasonItem {
  title: string;
  description: string;
}

export interface FosterSystemItem {
  title: string;
  description: string;
}

export interface TrustBarItem {
  label: string;
  sublabel?: string;
  icon_key?: string; // Ofsted, CIW, CareInspectorate, LocalAuthority, etc
}

export interface CtaSection {
  heading: string;
  subheading?: string;
  cta_text: string;
  cta_href: string;
}

/**
 * COUNTRY PAGE CONTENT SHAPE
 */
export interface CountryPageContent extends BaseSeo {
  hero?: HeroSection;
  overview?: {
    heading?: string;
    subheading?: string;
    body: string; // 500+ words rich text
  };
  foster_system?: {
    heading?: string;
    subheading?: string;
    description?: string;
    items?: FosterSystemItem[];
  };
  reasons_to_foster?: {
    heading?: string;
    subheading?: string;
    items?: ReasonItem[];
  };
  featured_popular_areas?: {
    heading?: string;
    subheading?: string;
    locations?: PopularLocationItem[];
  };
  faqs?: {
    heading?: string;
    items?: FaqItem[];
  };
  regulatory_trust_bar?: {
    heading?: string;
    items?: TrustBarItem[];
  };
  final_cta?: CtaSection;
}

/**
 * REGION PAGE CONTENT SHAPE
 */
export interface RegionPageContent extends BaseSeo {
  hero?: HeroSection;
  about_region?: {
    heading?: string;
    subheading?: string;
    body: string;
  };
  benefits_support?: {
    heading?: string;
    subheading?: string;
    items?: ReasonItem[];
  };
  popular_cities?: {
    heading?: string;
    subheading?: string;
    cities?: PopularLocationItem[]; // ideally link to cities table
  };
  allowances_support?: {
    heading?: string;
    subheading?: string;
    body?: string;
  };
  testimonials?: {
    heading?: string;
    items?: {
      name: string;
      location?: string;
      quote: string;
    }[];
  };
  faqs?: {
    heading?: string;
    items?: FaqItem[];
  };
  regulatory_trust_bar?: {
    heading?: string;
    items?: TrustBarItem[];
  };
  final_cta?: CtaSection;
}

/**
 * CITY PAGE CONTENT SHAPE
 */
export interface CityPageContent extends BaseSeo {
  hero?: HeroSection;
  overview?: {
    heading?: string;
    subheading?: string;
    body: string; // 400–500 words
  };
  fostering_types?: {
    heading?: string;
    items?: {
      title: string;
      description: string;
    }[];
  };
  top_agencies?: {
    heading?: string;
    note?: string;
    // front-end will actually query agencies table filtered by city slug; this is just config
  };
  why_foster_city?: {
    heading?: string;
    subheading?: string;
    items?: ReasonItem[];
  };
  allowances_support?: {
    heading?: string;
    body?: string;
  };
  local_support_resources?: {
    heading?: string;
    items?: {
      name: string;
      description?: string;
      link?: string;
    }[];
  };
  faqs?: {
    heading?: string;
    items?: FaqItem[];
  };
  regulatory_trust_bar?: {
    heading?: string;
    items?: TrustBarItem[];
  };
  final_cta?: CtaSection;
}

export type LocationPageJson = CountryPageContent | RegionPageContent | CityPageContent;

export interface LocationPage {
  id: string;
  canonical_slug: string;
  template_type: PageType;
  content_json: LocationPageJson;
  created_at: string;
  updated_at: string;
}