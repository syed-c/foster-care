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
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Modern Hero Header with Glassmorphism */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Mail className="w-4 h-4 text-[#773344]" />
            <span className="text-sm font-medium text-[#2C2C2C]">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4 font-poppins gradient-text">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about fostering or our directory? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <Card className="glass-strong rounded-3xl mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#773344]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#773344]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@foster-care.co.uk" className="text-gray-600 hover:text-[#773344] transition-colors">
                      info@foster-care.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E3B5A4]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#E3B5A4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:08001234567" className="text-gray-600 hover:text-[#E3B5A4] transition-colors">
                      0800 123 4567
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9am - 5pm GMT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#773344]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#773344]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Foster Care Directory UK<br />
                      London, United Kingdom
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong rounded-3xl bg-gradient-to-br from-[#773344]/10 to-[#E3B5A4]/10 border-[#773344]">
              <CardHeader>
                <CardTitle>Are You a Fostering Agency?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Join our directory and connect with families looking for fostering opportunities. Get started with a free basic listing today.
                </p>
                <Button className="btn-futuristic rounded-xl">
                  Register Your Agency
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="outline" className="glass border-2 rounded-xl">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="mt-1 glass border-2 rounded-2xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="mt-1 glass border-2 rounded-2xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="mt-1 glass border-2 rounded-2xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-futuristic text-base py-6 rounded-2xl"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
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