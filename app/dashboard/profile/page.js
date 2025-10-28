'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function ProfileEditPage() {
  const { data: session, status } = useSession();
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
    } else if (status === 'authenticated') {
      fetchAgency();
    }
  }, [status, router]);

  const fetchAgency = async () => {
    try {
      const response = await fetch(`/api/agencies?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.agencies && data.agencies.length > 0) {
          const agency = data.agencies[0];
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
        }
      }
    } catch (error) {
      console.error('Error fetching agency:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Get agency ID first
      const agencyResponse = await fetch(`/api/agencies?userId=${session.user.id}`);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Edit Agency Profile</h1>
          <p className="text-gray-600">Update your agency information and contact details</p>
        </div>

        {message.text && (
          <Alert className={`mb-6 glass-strong rounded-2xl border-2 ${message.type === 'success' ? 'border-green-200/50' : 'border-red-200/50'}`}>
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
          <Card className="mb-6 glass-strong rounded-3xl">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your agency's core details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Agency Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                  placeholder="Tell families about your agency..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Agency Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Charity">Charity</SelectItem>
                      <SelectItem value="Local Authority">Local Authority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accreditation">Accreditation</Label>
                  <Input
                    id="accreditation"
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
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
                  className="w-4 h-4 text-[#773344] rounded"
                />
                <Label htmlFor="recruiting" className="cursor-pointer">
                  Currently recruiting foster carers
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 glass-strong rounded-3xl">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where is your main office located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 High Street"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 glass-strong rounded-3xl">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can families reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_email">Contact Email *</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  placeholder="020 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://your-agency.co.uk"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#773344] to-[#E3B5A4]"
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
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
