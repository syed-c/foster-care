// RegionBreadcrumbSection.js
import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';

export default function RegionBreadcrumbSection({ data, regionSlug }) {
  // If no breadcrumb data, don't render
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
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
  );
}