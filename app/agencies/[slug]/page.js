'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Star, MapPin, Phone, Mail, Globe, Heart, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function AgencyDetailPage() {
  const params = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchAgency();
    }
  }, [params.slug]);

  const fetchAgency = async () => {
    try {
      // Fetch agency by slug
      const response = await fetch(`/api/agencies/slug/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setAgency(data.agency);
      } else if (response.status === 404) {
        // Agency not found
        setAgency(null);
      }
    } catch (error) {
      console.error('Error fetching agency:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact/agency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyId: agency.id, // Use the actual agency ID for the contact form
          ...contactForm,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setContactForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Loading agency details...</p>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <Card className="glass-card p-12 text-center max-w-md rounded-modern">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4 font-poppins">Agency Not Found</h2>
            <p className="text-gray-600 mb-6 font-inter">The agency you're looking for doesn't exist.</p>
            <Button asChild className="font-inter">
              <Link href="/agencies">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Directory
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary-green/30 to-secondary-blue/30">
        {agency.cover_image && (
          <Image src={agency.cover_image} alt={agency.name} fill className="object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="font-inter">
            <Link href="/agencies">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Directory
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Agency Header */}
            <Card className="glass-card mb-6 rounded-modern">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center flex-shrink-0">
                    {agency.logo ? (
                      <Image src={agency.logo} alt={agency.name} width={80} height={80} className="rounded" />
                    ) : (
                      <Heart className="w-12 h-12 text-primary-green" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold text-text-charcoal font-poppins">{agency.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 font-inter">
                            {agency.address || `${agency.city}, ${agency.region}`}
                          </span>
                        </div>
                      </div>
                      {agency.featured && (
                        <Badge className="bg-accent-peach ml-4 font-inter">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        {renderStars(agency.rating || 0)}
                        <span className="ml-2 text-sm font-medium font-inter">{agency.rating?.toFixed(1) || '0.0'}</span>
                        <span className="text-sm text-gray-500 font-inter">({agency.review_count || 0} reviews)</span>
                      </div>
                      <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                      {agency.recruiting && (
                        <Badge className="bg-green-100 text-green-700 font-inter">Recruiting</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About */}
            <Card className="glass-card mb-6 rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed font-inter">{agency.description}</p>
                {agency.accreditation && (
                  <div className="mt-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700 font-inter">{agency.accreditation}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            {agency.services && agency.services.length > 0 && (
              <Card className="glass-card mb-6 rounded-modern">
                <CardHeader>
                  <CardTitle className="font-poppins">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agency.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-2 px-4 font-inter">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Reviews ({agency.reviews?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {agency.reviews && agency.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {agency.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium font-inter">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {renderStars(review.stars)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm font-inter">{review.comment}</p>
                        <span className="text-xs text-gray-400 mt-2 block font-inter">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8 font-inter">No reviews yet. Be the first to leave a review!</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Card */}
            <Card className="glass-card mb-6 sticky top-20 rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agency.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-green" />
                    <a href={`mailto:${agency.contact_email}`} className="text-sm hover:text-primary-green transition-colors font-inter">
                      {agency.contact_email}
                    </a>
                  </div>
                )}
                {agency.contact_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary-blue" />
                    <a href={`tel:${agency.contact_phone}`} className="text-sm hover:text-secondary-blue transition-colors font-inter">
                      {agency.contact_phone}
                    </a>
                  </div>
                )}
                {agency.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary-green" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary-green transition-colors font-inter">
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Send a Message</CardTitle>
                <CardDescription className="font-inter">Get in touch with {agency.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2 font-poppins">Message Sent!</h3>
                    <p className="text-sm text-gray-600 font-inter">The agency will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-inter">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        className="font-inter"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-inter">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="font-inter"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-inter">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your interest in fostering..."
                        rows={5}
                        className="font-inter"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal font-inter"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}