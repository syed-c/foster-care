'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Eye, 
  Mail, 
  Phone, 
  Star, 
  MapPin, 
  Settings, 
  Users, 
  TrendingUp,
  Building2,
  Calendar,
  MessageSquare,
  Globe
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [agency, setAgency] = useState(null);
  const [stats, setStats] = useState({
    profileViews: 0,
    contactClicks: 0,
    emailClicks: 0,
    phoneClicks: 0,
    websiteClicks: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard');
    } else if (status === 'authenticated' && session?.user) {
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      // Check if user data exists
      if (!session?.user?.id) {
        console.error('User data not available');
        return;
      }
      
      // Fetch agency data
      const agencyResponse = await fetch(`/api/agencies?userId=${session.user.id}`);
      if (agencyResponse.ok) {
        const agencyData = await agencyResponse.json();
        if (agencyData.agencies && agencyData.agencies.length > 0) {
          setAgency(agencyData.agencies[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return null;
  }

  // Check if agency user hasn't completed registration
  if (session.user.role === 'agency') {
    if (!agency) {
      // No agency profile at all, redirect to registration
      router.push('/auth/signup/agency-registration');
      return null;
    } else if (!agency.registration_complete) {
      // Agency exists but registration not complete, redirect to registration
      router.push('/auth/signup/agency-registration');
      return null;
    }
  }

  // Regular user dashboard (not an agency)
  if (session.user.role !== 'agency') {
    return (
      <div className="min-h-screen bg-background-offwhite py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">Welcome, {session.user.name}!</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Saved Agencies</CardTitle>
                <CardDescription className="font-inter">Agencies you've favorited</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-inter">You haven't saved any agencies yet.</p>
                <Button className="mt-4 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal font-inter" asChild>
                  <Link href="/agencies">Browse Agencies</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="font-poppins">Recent Activity</CardTitle>
                <CardDescription className="font-inter">Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-inter">No recent activity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Agency Dashboard
  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">{agency?.name || 'Agency Dashboard'}</h1>
              <p className="opacity-90 font-inter">Manage your agency profile and track performance</p>
            </div>
            <Button variant="outline" className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter" asChild>
              <Link href="/dashboard/profile">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Eye}
            title="Profile Views"
            value={stats.profileViews}
            subtitle="Last 30 days"
            color="primary-green"
          />
          <StatCard
            icon={Mail}
            title="Contact Clicks"
            value={stats.contactClicks}
            subtitle="Total inquiries"
            color="secondary-blue"
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={agency?.rating?.toFixed(1) || '0.0'}
            subtitle={`${agency?.review_count || 0} reviews`}
            color="primary-green"
          />
          <StatCard
            icon={Users}
            title="Total Clicks"
            value={stats.emailClicks + stats.phoneClicks + stats.websiteClicks}
            subtitle="All interactions"
            color="accent-peach"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto rounded-modern">
            <TabsTrigger value="overview" className="rounded-modern">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-modern">Analytics</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-modern">Reviews</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-modern">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Agency Status */}
              <Card className="glass-card rounded-modern">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-poppins">
                    <Building2 className="w-5 h-5 text-primary-green" />
                    Agency Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-inter">Subscription Plan</span>
                    <Badge className="bg-primary-green font-inter">
                      {agency?.subscription_plan || 'Free'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-inter">Status</span>
                    <Badge className={agency?.verified ? 'bg-green-600' : 'bg-yellow-600'}>
                      {agency?.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-inter">Recruiting</span>
                    <Badge className={agency?.recruiting ? 'bg-green-600' : 'bg-gray-600'}>
                      {agency?.recruiting ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-inter">Featured</span>
                    <Badge className={agency?.featured ? 'bg-accent-peach' : 'bg-gray-400'}>
                      {agency?.featured ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card rounded-modern">
                <CardHeader>
                  <CardTitle className="font-poppins">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start font-inter" asChild>
                    <Link href="/dashboard/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-inter" asChild>
                    <Link href="/dashboard/locations">
                      <MapPin className="w-4 h-4 mr-2" />
                      Manage Locations
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-inter" asChild>
                    <Link href="/dashboard/reviews">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Reviews
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-inter" asChild>
                    <Link href={`/agencies/${agency?.slug}`} target="_blank">
                      <Globe className="w-4 h-4 mr-2" />
                      View Public Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card md:col-span-2 rounded-modern">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-poppins">
                    <TrendingUp className="w-5 h-5 text-primary-green" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-inter">Profile Views</span>
                      </div>
                      <span className="font-semibold">{stats.profileViews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-inter">Email Clicks</span>
                      </div>
                      <span className="font-semibold">{stats.emailClicks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-inter">Phone Clicks</span>
                      </div>
                      <span className="font-semibold">{stats.phoneClicks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-inter">Website Clicks</span>
                      </div>
                      <span className="font-semibold">{stats.websiteClicks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-poppins">
                  <BarChart3 className="w-5 h-5 text-primary-green" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription className="font-inter">Detailed insights coming soon</CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center text-gray-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="font-inter">Advanced analytics and charts will be available soon.</p>
                <p className="text-sm mt-2 font-inter">Track views, clicks, and engagement over time.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-poppins">
                  <MessageSquare className="w-5 h-5 text-primary-green" />
                  Customer Reviews
                </CardTitle>
                <CardDescription className="font-inter">
                  {agency?.review_count || 0} total reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8 font-inter">
                  Review management coming soon. You can view your public reviews on your{' '}
                  <Link href={`/agencies/${agency?.slug}`} className="text-primary-green hover:underline">
                    public profile
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="glass-card rounded-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-poppins">
                  <Settings className="w-5 h-5 text-primary-green" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 font-poppins">Profile Settings</h3>
                  <div className="text-sm text-gray-600 mb-4 font-inter">
                    Manage your agency information, logo, and contact details.
                  </div>
                  <Button className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal font-inter" asChild>
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 font-poppins">Subscription</h3>
                  <div className="text-sm text-gray-600 mb-4 font-inter">
                    Current plan: <Badge className="bg-primary-green font-inter">{agency?.subscription_plan || 'Free'}</Badge>
                  </div>
                  <Button variant="outline" className="font-inter" asChild>
                    <Link href="/dashboard/subscription">Upgrade Plan</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 font-poppins">Account Information</h3>
                  <div className="space-y-2 text-sm font-inter">
                    <p><strong>Email:</strong> {session.user.email}</p>
                    <p><strong>Name:</strong> {session.user.name}</p>
                    <p><strong>Role:</strong> {session.user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color }) {
  return (
    <Card className="glass-card rounded-modern">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `var(--${color})/20` }}
          >
            <Icon className="w-6 h-6" style={{ color: `var(--${color})` }} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-text-charcoal">{value}</p>
          <p className="text-sm font-medium text-gray-900 font-poppins">{title}</p>
          <p className="text-xs text-gray-500 mt-1 font-inter">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}