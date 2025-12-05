import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function UsefulResources({ resources = [], title = 'Useful Resources' }) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-poppins">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="hover-lift bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#2C2C2C] font-poppins">{resource.title}</CardTitle>
                <ExternalLink className="h-4 w-4 text-[#F9CBA2]" />
              </div>
            </CardHeader>
            <CardContent>
              {resource.description && (
                <CardDescription className="mb-4 text-[#2C2C2C] font-inter">
                  {resource.description}
                </CardDescription>
              )}
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7DC3EB] hover:underline font-medium font-inter"
              >
                Visit Resource →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}