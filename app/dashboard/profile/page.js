'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Save } from 'lucide-react';

function ProfileContent() {
  const session = useSession();
  const { data, status } = session || { data: null, status: 'loading' };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Private',
    accreditation: '',
    city: '',
    region: '',
    postcode: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    recruiting: true,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard/profile');
    } else if (status === 'authenticated' && data?.user) {
      fetchAgency();
    }
  }, [status, data, router]);

  const fetchAgency = async () => {
    try {
      // Check if user data exists
      if (!data?.user?.id) {
        console.error('User data not available');
        router.push('/auth/signin?callbackUrl=/dashboard/profile');
        return;
      }
      
      const response = await fetch(`/api/agencies?userId=${data.user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.agencies && data.agencies.length > 0) {
          const agency = data.agencies[0];
          // Check if registration is complete
          if (!agency.registration_complete) {
            // Redirect to registration if not complete
            router.push('/auth/signup/agency-registration');
            return;
          }
          
          setFormData({
            name: agency.name || '',
            description: agency.description || '',
            type: agency.type || 'Private',
            accreditation: agency.accreditation || '',
            city: agency.city || '',
            region: agency.region || '',
            postcode: agency.postcode || '',
            address: agency.address || '',
            contact_email: agency.contact_email || '',
            contact_phone: agency.contact_phone || '',
            website: agency.website || '',
            recruiting: agency.recruiting !== false,
          });
        } else {
          // If no agency exists, redirect to registration
          router.push('/auth/signup/agency-registration');
          return;
        }
      } else {
        // If there's an error fetching agency, redirect to registration
        router.push('/auth/signup/agency-registration');
        return;
      }
    } catch (error) {
      console.error('Error fetching agency:', error);
      // If there's an error fetching agency, redirect to registration
      router.push('/auth/signup/agency-registration');
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Check if user data exists
      if (!data?.user?.id) {
        throw new Error('User data not available');
      }
      
      // Get agency ID first
      const agencyResponse = await fetch(`/api/agencies?userId=${data.user.id}`);
      if (!agencyResponse.ok) {
        throw new Error('Failed to fetch agency');
      }

      const agencyData = await agencyResponse.json();
      if (!agencyData.agencies || agencyData.agencies.length === 0) {
        throw new Error('Agency not found');
      }

      const agencyId = agencyData.agencies[0].id;

      // Update agency
      const response = await fetch(`/api/agencies/${agencyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Check if user data is not available
  if (!data || !data.user) {
    router.push('/auth/signin?callbackUrl=/dashboard/profile');
    return null;
  }

  // Check if user is not an agency
  if (data.user.role !== 'agency') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background-offwhite py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-charcoal mb-2 font-poppins">Edit Agency Profile</h1>
          <p className="text-gray-600 font-inter">Update your agency information and contact details</p>
        </div>

        {message.text && (
          <Alert className={`mb-6 glass-card rounded-modern ${message.type === 'success' ? 'border-green-200/50' : 'border-red-200/50'}`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 glass-card rounded-modern">
            <CardHeader>
              <CardTitle className="font-poppins">Basic Information</CardTitle>
              <CardDescription className="font-inter">Your agency's core details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-inter">Agency Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="font-inter"
                />
              </div>

              <div>
                <Label htmlFor="description" className="font-inter">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                  className="font-inter"
                  placeholder="Tell families about your agency..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="font-inter">Agency Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="font-inter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private" className="font-inter">Private</SelectItem>
                      <SelectItem value="Charity" className="font-inter">Charity</SelectItem>
                      <SelectItem value="Local Authority" className="font-inter">Local Authority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accreditation" className="font-inter">Accreditation</Label>
                  <Input
                    id="accreditation"
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                    className="font-inter"
                    placeholder="e.g., Ofsted Outstanding"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recruiting"
                  checked={formData.recruiting}
                  onChange={(e) => setFormData({ ...formData, recruiting: e.target.checked })}
                  className="w-4 h-4 text-primary-green rounded"
                />
                <Label htmlFor="recruiting" className="cursor-pointer font-inter">
                  Currently recruiting foster carers
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 glass-card rounded-modern">
            <CardHeader>
              <CardTitle className="font-poppins">Location</CardTitle>
              <CardDescription className="font-inter">Where is your main office located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address" className="font-inter">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="font-inter"
                  placeholder="123 High Street"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="font-inter">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="font-inter"
                  />
                </div>

                <div>
                  <Label htmlFor="region" className="font-inter">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="font-inter"
                  />
                </div>

                <div>
                  <Label htmlFor="postcode" className="font-inter">Postcode</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="font-inter"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 glass-card rounded-modern">
            <CardHeader>
              <CardTitle className="font-poppins">Contact Information</CardTitle>
              <CardDescription className="font-inter">How can families reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_email" className="font-inter">Contact Email *</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  required
                  className="font-inter"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone" className="font-inter">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  className="font-inter"
                  placeholder="020 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="website" className="font-inter">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="font-inter"
                  placeholder="https://your-agency.co.uk"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter"
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="glass font-inter"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProfileFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-inter">Loading profile...</p>
      </div>
    </div>
  );
}

export default function ProfileEditPage() {
  return (
    <Suspense fallback={<ProfileFallback />}>
      <ProfileContent />
    </Suspense>
  );
}