import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function OverviewSection({ title, body }) {
  return (
    <section className="py-16 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {title}
            </h2>
          </div>
          
          <Card className="section-card rounded-modern-xl p-6 md:p-8">
            <div className="prose max-w-none text-gray-600 font-inter">
              {body ? (
                <div dangerouslySetInnerHTML={{ __html: body }} />
              ) : (
                <p>No content available</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}