'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Globe, Heart, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function AgencyDetailPage() {
  const params = useParams();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchAgency();
    }
  }, [params.id]);

  const fetchAgency = async () => {
    try {
      const response = await fetch(`/api/agencies/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setAgency(data.agency);
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
          agencyId: params.id,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading agency details...</p>
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <Card className="glass-strong rounded-3xl p-12 text-center max-w-md">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Agency Not Found</h2>
            <p className="text-gray-600 mb-6">The agency you're looking for doesn't exist.</p>
            <Button asChild className="btn-futuristic rounded-xl">
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Header with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-[#773344]/30 to-[#E3B5A4]/30">
        {agency.coverImage && (
          <Image src={agency.coverImage} alt={agency.name} fill className="object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="glass rounded-xl">
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
            <Card className="glass-strong rounded-3xl mb-6">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#773344]/20 to-[#E3B5A4]/20 flex items-center justify-center flex-shrink-0">
                    {agency.logo ? (
                      <Image src={agency.logo} alt={agency.name} width={80} height={80} className="rounded" />
                    ) : (
                      <Heart className="w-12 h-12 text-[#773344]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl font-bold text-[#2C2C2C] font-poppins gradient-text">{agency.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            {agency.address || `${agency.city}, ${agency.region}`}
                          </span>
                        </div>
                      </div>
                      {agency.featured && (
                        <Badge className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white border-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        {renderStars(agency.rating || 0)}
                        <span className="ml-2 text-sm font-medium">{agency.rating?.toFixed(1) || '0.0'}</span>
                        <span className="text-sm text-gray-500">({agency.review_count || 0} reviews)</span>
                      </div>
                      <Badge variant="outline" className="glass border-2">{agency.type}</Badge>
                      {agency.recruiting && (
                        <Badge className="bg-green-100 text-green-700 glass">
                          Recruiting
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About */}
            <Card className="glass-strong rounded-3xl mb-6">
              <CardHeader>
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{agency.description}</p>
                {agency.accreditation && (
                  <div className="mt-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">{agency.accreditation}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            {agency.services && agency.services.length > 0 && (
              <Card className="glass-strong rounded-3xl mb-6">
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agency.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-2 px-4 glass">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle>Reviews ({agency.reviews?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {agency.reviews && agency.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {agency.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {renderStars(review.stars)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                        <span className="text-xs text-gray-400 mt-2 block">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to leave a review!</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Card */}
            <Card className="glass-strong rounded-3xl mb-6 sticky top-20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agency.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#773344]" />
                    <a href={`mailto:${agency.contact_email}`} className="text-sm hover:text-[#773344] transition-colors">
                      {agency.contact_email}
                    </a>
                  </div>
                )}
                {agency.contact_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#E3B5A4]" />
                    <a href={`tel:${agency.contact_phone}`} className="text-sm hover:text-[#E3B5A4] transition-colors">
                      {agency.contact_phone}
                    </a>
                  </div>
                )}
                {agency.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#773344]" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#773344] transition-colors">
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Get in touch with {agency.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-600">The agency will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        className="glass border-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="glass border-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your interest in fostering..."
                        rows={5}
                        className="glass border-2"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full btn-futuristic rounded-xl"
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