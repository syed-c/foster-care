// RegionBreadcrumbSection.js
import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import { ChevronRight } from 'lucide-react';

export default function RegionBreadcrumbSection({ data, regionSlug }) {
  // If no breadcrumb data, don't render
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  // Generate breadcrumb schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.items
      .filter(item => item.href && item.label)
      .map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": typeof window !== 'undefined' ? 
          (window.location.origin + item.href) : 
          (`https://your-domain.com${item.href}`)
      }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </Head>
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 font-inter">
            {data.items.map((item, index) => (
              <Fragment key={index}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary-green transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-text-charcoal font-medium">{item.label}</span>
                )}
                {index < data.items.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}