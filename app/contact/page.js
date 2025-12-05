'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="section-hero py-16 md:py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-peach/10 rounded-full blur-2xl float-animation-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-primary-green/10 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "3s" }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-4 font-poppins">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Have questions about fostering or our directory? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <Card className="mb-6 section-card">
              <CardHeader>
                <CardTitle className="font-poppins">Contact Information</CardTitle>
                <CardDescription className="font-inter">
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-poppins">Email</h3>
                    <a href="mailto:info@foster-care.co.uk" className="text-gray-600 hover:text-primary-green transition-colors font-inter">
                      info@foster-care.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-blue/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-poppins">Phone</h3>
                    <a href="tel:08001234567" className="text-gray-600 hover:text-secondary-blue transition-colors font-inter">
                      0800 123 4567
                    </a>
                    <p className="text-sm text-gray-500 mt-1 font-inter">Monday - Friday, 9am - 5pm GMT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-green/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-poppins">Address</h3>
                    <p className="text-gray-600 font-inter">
                      Foster Care Directory UK<br />
                      London, United Kingdom
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="section-card-contrast">
              <CardHeader>
                <CardTitle className="font-poppins">Are You a Fostering Agency?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 font-inter">
                  Join our directory and connect with families looking for fostering opportunities. Get started with a free basic listing today.
                </p>
                <Button className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter">
                  Register Your Agency
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="section-card">
              <CardHeader>
                <CardTitle className="font-poppins">Send Us a Message</CardTitle>
                <CardDescription className="font-inter">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2 font-poppins">Message Sent!</h3>
                    <p className="text-gray-600 mb-6 font-inter">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="outline" className="glass font-inter">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="font-poppins">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="mt-1 glass"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-poppins">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="mt-1 glass"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-poppins">Your Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="mt-1 glass"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md text-base py-6 font-inter"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center font-inter">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
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