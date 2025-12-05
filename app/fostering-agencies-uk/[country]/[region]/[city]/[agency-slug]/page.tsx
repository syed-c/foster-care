'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  ArrowLeft, 
  CheckCircle2,
  Users,
  Home,
  Heart,
  Shield
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

// Mock data - would be replaced with API calls in production
const mockAgency = {
  id: '1',
  name: 'Bright Futures Fostering',
  slug: 'bright-futures-fostering',
  logoUrl: null,
  coverImageUrl: null,
  description: 'Bright Futures Fostering is a leading independent fostering agency dedicated to providing exceptional care for children and young people. With over 15 years of experience, we specialize in supporting teenagers and sibling groups, offering personalized care plans and dedicated support teams for both carers and children.',
  type: 'Private',
  accreditation: 'Ofsted Outstanding',
  city: 'London',
  region: 'Greater London',
  country: 'england',
  postcode: 'SW1A 1AA',
  address: '123 Care Street, London, SW1A 1AA',
  latitude: 51.5074,
  longitude: -0.1278,
  contactEmail: 'info@brightfutures.co.uk',
  contactPhone: '020 1234 5678',
  website: 'https://brightfutures.co.uk',
  featured: true,
  recruiting: true,
  verified: true,
  rating: 4.8,
  reviewCount: 42,
  subscriptionPlan: 'premium',
  createdAt: '2023-01-15T00:00:00Z',
  updatedAt: '2023-12-01T00:00:00Z'
};

const mockReviews = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    comment: 'The support team at Bright Futures has been incredible throughout our fostering journey. They provided excellent training and ongoing support.',
    stars: 5,
    createdAt: '2023-11-15T00:00:00Z'
  },
  {
    id: '2',
    userName: 'Michael & Emma Thompson',
    comment: 'We\'ve been foster carers with Bright Futures for two years now, and the personalized approach to matching children with our family has been outstanding.',
    stars: 5,
    createdAt: '2023-10-22T00:00:00Z'
  },
  {
    id: '3',
    userName: 'James Wilson',
    comment: 'As a single foster carer, I appreciated the specialized support for my situation. The agency truly understands diverse family structures.',
    stars: 4,
    createdAt: '2023-09-30T00:00:00Z'
  }
];

const mockServices = [
  'Short-term placements',
  'Long-term placements',
  'Respite care',
  'Parent and baby placements',
  'Supported lodgings',
  'Specialist care for teenagers',
  'Sibling group placements'
];

export default function AgencyProfilePage() {
  const params = useParams();
  const [agency, setAgency] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAgency(mockAgency);
      setReviews(mockReviews);
      setLoading(false);
    }, 500);
  }, [params]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-mint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-body">Loading agency details...</p>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <GlassCard className="p-12 text-center rounded-xxl max-w-md">
          <div className="py-8">
            <h2 className="text-2xl font-heading mb-4">Agency Not Found</h2>
            <p className="text-gray-600 mb-6 font-body">
              The agency you're looking for doesn't exist or may have been removed.
            </p>
            <GradientButton asChild>
              <Link href="/fostering-agencies-uk">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Directory
              </Link>
            </GradientButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-ivory to-white">
      {/* Header with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary-mint/30 to-primary-sky/30">
        {agency.coverImageUrl && (
          <img 
            src={agency.coverImageUrl} 
            alt={agency.name} 
            className="object-cover w-full h-full opacity-50" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <GradientButton asChild variant="outline">
            <Link href="/fostering-agencies-uk">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Directory
            </Link>
          </GradientButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Agency Header */}
            <AnimatedSection>
              <GlassCard className="mb-6 rounded-xxl">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary-mint/20 to-primary-sky/20 flex items-center justify-center flex-shrink-0">
                      {agency.logoUrl ? (
                        <img 
                          src={agency.logoUrl} 
                          alt={agency.name} 
                          width={80} 
                          height={80} 
                          className="rounded" 
                        />
                      ) : (
                        <Heart className="w-12 h-12 text-primary-mint" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-text-charcoal font-heading">{agency.name}</h1>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 font-body">
                              {agency.address || `${agency.city}, ${agency.region}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                          {agency.featured && (
                            <span className="bg-accent-peach text-text-charcoal text-xs font-bold px-2 py-1 rounded-full font-body">
                              Featured
                            </span>
                          )}
                          {agency.verified && (
                            <span className="bg-primary-mint text-text-charcoal text-xs font-bold px-2 py-1 rounded-full font-body">
                              Verified
                            </span>
                          )}
                          {agency.recruiting && (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full font-body">
                              Recruiting
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          {renderStars(agency.rating || 0)}
                          <span className="ml-2 text-sm font-medium font-body">{agency.rating?.toFixed(1) || '0.0'}</span>
                          <span className="text-sm text-gray-500 font-body">({agency.reviewCount || 0} reviews)</span>
                        </div>
                        
                        <span className="text-sm border border-gray-300 px-2 py-1 rounded-full font-body">
                          {agency.type}
                        </span>
                        
                        {agency.accreditation && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700 font-body">{agency.accreditation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* About */}
            <AnimatedSection delay={0.1}>
              <GlassCard className="mb-6 rounded-xxl">
                <div className="p-6">
                  <h2 className="text-2xl font-heading mb-4">About Us</h2>
                  <p className="text-gray-700 leading-relaxed font-body">
                    {agency.description}
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Services */}
            <AnimatedSection delay={0.2}>
              <GlassCard className="mb-6 rounded-xxl">
                <div className="p-6">
                  <h2 className="text-2xl font-heading mb-4">Services Offered</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockServices.map((service, index) => (
                      <span 
                        key={index} 
                        className="bg-primary-mint/10 text-primary-mint text-sm font-body px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection delay={0.3}>
              <GlassCard className="rounded-xxl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-heading">Reviews ({reviews.length})</h2>
                    <GradientButton variant="outline" size="sm">
                      Leave a Review
                    </GradientButton>
                  </div>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-heading">{review.userName}</span>
                            <div className="flex items-center gap-1">
                              {renderStars(review.stars)}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3 font-body">{review.comment}</p>
                          <span className="text-xs text-gray-400 font-body">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-heading mb-2">No Reviews Yet</h3>
                      <p className="text-gray-600 font-body">
                        Be the first to share your experience with {agency.name}.
                      </p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Card */}
            <AnimatedSection>
              <GlassCard className="mb-6 rounded-xxl sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-heading mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    {agency.contactEmail && (
                      <a 
                        href={`mailto:${agency.contactEmail}`} 
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-mint/10 flex items-center justify-center group-hover:bg-primary-mint/20 transition-colors">
                          <Mail className="w-5 h-5 text-primary-mint" />
                        </div>
                        <span className="text-sm hover:text-primary-mint transition-colors font-body">
                          {agency.contactEmail}
                        </span>
                      </a>
                    )}
                    
                    {agency.contactPhone && (
                      <a 
                        href={`tel:${agency.contactPhone}`} 
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-sky/10 flex items-center justify-center group-hover:bg-primary-sky/20 transition-colors">
                          <Phone className="w-5 h-5 text-primary-sky" />
                        </div>
                        <span className="text-sm hover:text-primary-sky transition-colors font-body">
                          {agency.contactPhone}
                        </span>
                      </a>
                    )}
                    
                    {agency.website && (
                      <a 
                        href={agency.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-mint/10 flex items-center justify-center group-hover:bg-primary-mint/20 transition-colors">
                          <Globe className="w-5 h-5 text-primary-mint" />
                        </div>
                        <span className="text-sm hover:text-primary-mint transition-colors font-body">
                          Visit Website
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <GlassCard className="rounded-xxl">
                <div className="p-6">
                  <h2 className="text-xl font-heading mb-4">Send a Message</h2>
                  
                  {submitSuccess ? (
                    <div className="text-center py-6">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-heading mb-2">Message Sent!</h3>
                      <p className="text-gray-600 text-sm font-body">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-body">
                          Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-mint focus:border-primary-mint font-body"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-body">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-mint focus:border-primary-mint font-body"
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 font-body">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-mint focus:border-primary-mint font-body"
                          placeholder="Your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-body">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-mint focus:border-primary-mint font-body"
                          placeholder="Tell us about your interest in fostering..."
                        />
                      </div>
                      
                      <GradientButton 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </GradientButton>
                    </form>
                  )}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* CTA Card */}
            <AnimatedSection delay={0.2}>
              <GlassCard className="rounded-xxl mt-6">
                <div className="p-6 text-center">
                  <Home className="w-12 h-12 text-primary-mint mx-auto mb-4" />
                  <h3 className="text-lg font-heading mb-2">Interested in Fostering?</h3>
                  <p className="text-gray-600 mb-4 text-sm font-body">
                    Take the first step towards making a difference in a child's life.
                  </p>
                  <GradientButton asChild size="sm">
                    <Link href="/resources/getting-started">
                      Learn More
                    </Link>
                  </GradientButton>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}