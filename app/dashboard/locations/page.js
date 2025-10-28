'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';

export default function LocationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [agency, setAgency] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    region: '',
    postcode: '',
    phone: '',
    email: '',
    is_primary: false,
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard/locations');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      // Fetch agency
      const agencyRes = await fetch(`/api/agencies?userId=${session.user.id}`);
      if (agencyRes.ok) {
        const agencyData = await agencyRes.json();
        if (agencyData.agencies && agencyData.agencies.length > 0) {
          setAgency(agencyData.agencies[0]);
          
          // Fetch locations
          const locRes = await fetch(`/api/locations?agencyId=${agencyData.agencies[0].id}`);
          if (locRes.ok) {
            const locData = await locRes.json();
            setLocations(locData.locations || []);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId 
        ? `/api/locations/${editingId}`
        : '/api/locations';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          agency_id: agency.id,
        }),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Location updated!' : 'Location added!' 
        });
        fetchData();
        resetForm();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to save location' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (location) => {
    setFormData({
      name: location.name,
      address: location.address || '',
      city: location.city || '',
      region: location.region || '',
      postcode: location.postcode || '',
      phone: location.phone || '',
      email: location.email || '',
      is_primary: location.is_primary || false,
    });
    setEditingId(location.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Location deleted!' });
        fetchData();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete location' });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      region: '',
      postcode: '',
      phone: '',
      email: '',
      is_primary: false,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please create your agency profile first.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] via-white to-[#F5E9E2]/30">
      {/* Modern Hero Header */}
      <section className="relative overflow-hidden pt-32 pb-12">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#773344] to-[#E3B5A4] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white border-0">
              Location Management
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2 font-poppins">
            Manage Locations
          </h1>
          <p className="text-gray-600">
            Add and manage multiple locations for {agency.name}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Messages */}
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Location List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Locations</h2>
              {!isAdding && (
                <Button
                  onClick={() => setIsAdding(true)}
                  className="btn-futuristic rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
              )}
            </div>

            {locations.length === 0 && !isAdding ? (
              <Card className="glass-strong rounded-3xl p-12 text-center hover-lift">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No locations added yet</p>
                <Button
                  onClick={() => setIsAdding(true)}
                  className="btn-futuristic rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Location
                </Button>
              </Card>
            ) : (
              locations.map((location) => (
                <Card key={location.id} className="glass-strong rounded-3xl hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{location.name}</CardTitle>
                          {location.is_primary && (
                            <Badge className="bg-[#773344]">
                              <Star className="w-3 h-3 mr-1" />
                              Primary
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          <div className="space-y-1 mt-2">
                            {location.address && (
                              <p className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4" />
                                {location.address}
                              </p>
                            )}
                            <p className="text-sm">
                              {location.city}, {location.region} {location.postcode}
                            </p>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(location)}
                          className="glass border-2 hover:bg-white/50 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(location.id)}
                          className="glass border-2 hover:bg-white/50 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {(location.phone || location.email) && (
                    <CardContent className="pt-0">
                      <div className="text-sm space-y-1">
                        {location.phone && <p>📞 {location.phone}</p>}
                        {location.email && <p>✉️ {location.email}</p>}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>

          {/* Add/Edit Form */}
          {isAdding && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24 glass-strong rounded-3xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{editingId ? 'Edit Location' : 'Add Location'}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Location Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Main Office"
                        required
                        className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 High Street"
                        className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="London"
                          required
                          className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode *</Label>
                        <Input
                          id="postcode"
                          value={formData.postcode}
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                          placeholder="SW1A 1AA"
                          required
                          className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="region">Region</Label>
                      <Input
                        id="region"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        placeholder="Greater London"
                        className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="020 1234 5678"
                          className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="location@agency.com"
                          className="glass border-2 rounded-xl h-12 mt-1.5 focus:border-[#773344]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_primary"
                        checked={formData.is_primary}
                        onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                        className="w-4 h-4 text-[#773344] rounded"
                      />
                      <Label htmlFor="is_primary" className="cursor-pointer">
                        Set as primary location
                      </Label>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 btn-futuristic rounded-xl h-12"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            {editingId ? 'Update' : 'Add'} Location
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="glass border-2 hover:bg-white/50 rounded-xl h-12"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
