// RegionBenefitsSection.js
import { Card } from '@/components/ui/card';
import { Heart, Shield } from 'lucide-react';

export default function RegionBenefitsSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Benefits of Fostering Locally`;
  const description = data?.description || `Discover the advantages of becoming a foster carer in your local community`;
  const benefitsItems = data?.items || [
    { title: "Community Connection", description: "Build strong relationships within your local community." },
    { title: "Local Support Networks", description: "Access specialized local resources and support services." },
    { title: "Cultural Familiarity", description: "Understand local customs, schools, and healthcare services." }
  ];

  return (
    <section className="py-16 md:py-24 section-highlight">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Benefits & Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="section-card rounded-modern-xl p-6">
              <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                <Heart className="w-5 h-5 text-primary-green mr-2" />
                Benefits
              </h3>
              <ul className="space-y-3">
                {benefitsItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-gray-600 text-sm">{item.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="section-card rounded-modern-xl p-6">
              <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                <Shield className="w-5 h-5 text-primary-green mr-2" />
                Support Services
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-primary-green text-xs">24</span>
                  </div>
                  <div>
                    <div className="font-medium">24/7 Support Helpline</div>
                    <div className="text-gray-600 text-sm">Emergency assistance whenever you need it</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-primary-green text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-medium">Regular Supervision</div>
                    <div className="text-gray-600 text-sm">Ongoing guidance from experienced professionals</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}