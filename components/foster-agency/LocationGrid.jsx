import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { slugify } from '@/lib/locationData';

export default function LocationGrid({ items = [], baseHref, title, type = 'city' }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      {title && (
        <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-poppins">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const displayName = item.name || item;
          const slug = typeof item === 'string' ? slugify(item) : item.slug || slugify(displayName);
          const href = item.url || `${baseHref}/${slug}`;
          
          return (
            <Link key={item.slug || slug || index} href={href}>
              <Card className="hover-lift cursor-pointer h-full transition-all hover:shadow-lg hover:border-[#7CE2A7] bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-[#2C2C2C] font-poppins">{displayName}</CardTitle>
                  <CardDescription className="text-[#2C2C2C] font-inter">
                    {type === 'region'
                      ? 'View cities in this region'
                      : 'View foster agencies'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}