'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function AdminAgencyDetail() {
  const params = useParams();
  const router = useRouter();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchAgencyDetails();
    }
  }, [params.id]);

  const fetchAgencyDetails = async () => {
    try {
      const response = await fetch(`/api/admin/agencies/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setAgency(data.agency);
      } else {
        console.error('Failed to fetch agency details');
      }
    } catch (error) {
      console.error('Error fetching agency details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/agencies/${params.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchAgencyDetails();
      }
    } catch (error) {
      console.error('Error approving agency:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/agencies/${params.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (response.ok) {
        fetchAgencyDetails();
        setRejectionReason('');
      }
    } catch (error) {
      console.error('Error rejecting agency:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFeature = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/agencies/${params.id}/feature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchAgencyDetails();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    } finally {
      setActionLoading(false);
    }
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
              <Link href="/admin/agencies">
                <Eye className="mr-2 w-4 h-4" />
                Back to Agencies
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">Agency Review</h1>
              <p className="opacity-90 font-inter">Review and manage agency status</p>
            </div>
            <Button variant="outline" className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter" asChild>
              <Link href="/admin/agencies">
                Back to Agencies
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agency Header */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-12 h-12 text-primary-green mt-1" />
                    <div>
                      <h1 className="text-2xl font-bold text-text-charcoal font-poppins">{agency.name}</h1>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-gray-600 font-inter">{agency.city || 'Location not set'}</span>
                        <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-inter">
                            {agency.rating ? agency.rating.toFixed(1) : 'N/A'} ({agency.review_count || 0} reviews)
                          </span>
                        </div>
                        {agency.featured && (
                          <Badge className="bg-accent-peach font-inter">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={
                      agency.status === 'approved' ? 'bg-green-500' : 
                      agency.status === 'pending' ? 'bg-accent-peach' : 
                      'bg-red-500'
                    }
                  >
                    {agency.status.charAt(0).toUpperCase() + agency.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-inter">{agency.description || 'No description provided'}</p>
                {agency.accreditation && (
                  <div className="mt-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700 font-inter">{agency.accreditation}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            {agency.services && agency.services.length > 0 && (
              <Card className="glass-card rounded-modern">
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

            {/* Contact Information */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agency.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="font-inter">{agency.address}</span>
                  </div>
                )}
                {agency.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-green" />
                    <a href={`mailto:${agency.contact_email}`} className="text-primary-green hover:underline font-inter">
                      {agency.contact_email}
                    </a>
                  </div>
                )}
                {agency.contact_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary-blue" />
                    <a href={`tel:${agency.contact_phone}`} className="text-secondary-blue hover:underline font-inter">
                      {agency.contact_phone}
                    </a>
                  </div>
                )}
                {agency.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary-green" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-primary-green hover:underline font-inter">
                      {agency.website}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Actions */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Agency Status</CardTitle>
                <CardDescription className="font-inter">Manage this agency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agency.status === 'pending' ? (
                  <>
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-inter"
                      onClick={handleApprove}
                      disabled={actionLoading}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {actionLoading ? 'Approving...' : 'Approve Agency'}
                    </Button>
                    <div className="space-y-3">
                      <Label htmlFor="rejectionReason" className="font-inter">Rejection Reason</Label>
                      <Textarea
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        className="font-inter"
                        rows={4}
                      />
                      <Button 
                        variant="destructive"
                        className="w-full font-inter"
                        onClick={handleReject}
                        disabled={actionLoading || !rejectionReason.trim()}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {actionLoading ? 'Rejecting...' : 'Reject Agency'}
                      </Button>
                    </div>
                  </>
                ) : agency.status === 'approved' ? (
                  <>
                    <Button 
                      className="w-full font-inter"
                      variant={agency.featured ? "default" : "outline"}
                      onClick={handleFeature}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Updating...' : (agency.featured ? "Unfeature Agency" : "Feature Agency")}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full font-inter"
                      asChild
                    >
                      <Link href={`/agencies/${agency.slug}`} target="_blank">
                        <Eye className="w-4 h-4 mr-2" />
                        View Public Profile
                      </Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-600 text-center font-inter">This agency has been rejected.</p>
                )}
              </CardContent>
            </Card>

            {/* Agency Information */}
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Agency Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-inter">Created</span>
                  <span className="font-inter">{new Date(agency.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-inter">Reviews</span>
                  <span className="font-inter">{agency.review_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-inter">Status</span>
                  <Badge 
                    className={
                      agency.status === 'approved' ? 'bg-green-500' : 
                      agency.status === 'pending' ? 'bg-accent-peach' : 
                      'bg-red-500'
                    }
                  >
                    {agency.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-inter">Featured</span>
                  <Badge variant={agency.featured ? "default" : "secondary"} className="font-inter">
                    {agency.featured ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}