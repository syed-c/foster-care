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
      // Fetch agency data
      const agencyResponse = await fetch(`/api/agencies?userId=${session.user.id}`);
      if (agencyResponse.ok) {
        const agencyData = await agencyResponse.json();
        if (agencyData.agencies && agencyData.agencies.length > 0) {
          setAgency(agencyData.agencies[0]);
        }
      }

      // TODO: Fetch analytics data when implemented
      setStats({
        profileViews: 234,
        contactClicks: 45,
        emailClicks: 28,
        phoneClicks: 17,
        websiteClicks: 32,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // User doesn't have an agency yet
  if (!agency && session.user.role === 'agency') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 text-center">
            <Building2 className="w-20 h-20 text-[#773344] mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2">Welcome to Your Dashboard!</CardTitle>
            <CardDescription className="mb-6">
              Let's set up your agency profile to get started.
            </CardDescription>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#773344] to-[#E3B5A4]"
              asChild
            >
              <Link href="/dashboard/profile/setup">Create Agency Profile</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Regular user dashboard (not an agency)
  if (session.user.role !== 'agency') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-6">Welcome, {session.user.name}!</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Agencies</CardTitle>
                <CardDescription>Agencies you've favorited</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">You haven't saved any agencies yet.</p>
                <Button className="mt-4 bg-gradient-to-r from-[#773344] to-[#E3B5A4]" asChild>
                  <Link href="/agencies">Browse Agencies</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No recent activity.</p>
              </CardContent>
            </Card>
          </div>
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
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white border-0">
              Agency Dashboard
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2 font-poppins">
            {agency?.name || 'Agency Dashboard'}
          </h1>
          <p className="text-gray-600">Manage your agency profile and track performance</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Eye}
            title="Profile Views"
            value={stats.profileViews}
            subtitle="Last 30 days"
            color="#773344"
          />
          <StatCard
            icon={Mail}
            title="Contact Clicks"
            value={stats.contactClicks}
            subtitle="Total inquiries"
            color="#E3B5A4"
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={agency?.rating?.toFixed(1) || '0.0'}
            subtitle={`${agency?.review_count || 0} reviews`}
            color="#773344"
          />
          <StatCard
            icon={Users}
            title="Total Clicks"
            value={stats.emailClicks + stats.phoneClicks + stats.websiteClicks}
            subtitle="All interactions"
            color="#E3B5A4"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass rounded-2xl p-1.5">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">Analytics</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl">Reviews</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Agency Status */}
              <Card className="glass-strong rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#773344]" />
                    Agency Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subscription Plan</span>
                    <Badge className="bg-[#773344]">
                      {agency?.subscription_plan || 'Free'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={agency?.verified ? 'bg-green-600' : 'bg-yellow-600'}>
                      {agency?.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Recruiting</span>
                    <Badge className={agency?.recruiting ? 'bg-green-600' : 'bg-gray-600'}>
                      {agency?.recruiting ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Featured</span>
                    <Badge className={agency?.featured ? 'bg-[#E3B5A4]' : 'bg-gray-400'}>
                      {agency?.featured ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-strong rounded-3xl">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start glass border-2 hover:bg-white/50 rounded-xl" asChild>
                    <Link href="/dashboard/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-2 hover:bg-white/50 rounded-xl" asChild>
                    <Link href="/dashboard/locations">
                      <MapPin className="w-4 h-4 mr-2" />
                      Manage Locations
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-2 hover:bg-white/50 rounded-xl" asChild>
                    <Link href="/dashboard/reviews">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Reviews
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass border-2 hover:bg-white/50 rounded-xl" asChild>
                    <Link href={`/agency/${agency?.id}`} target="_blank">
                      <Globe className="w-4 h-4 mr-2" />
                      View Public Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="md:col-span-2 glass-strong rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#773344]" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Profile Views</span>
                      </div>
                      <span className="font-semibold">{stats.profileViews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Email Clicks</span>
                      </div>
                      <span className="font-semibold">{stats.emailClicks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Phone Clicks</span>
                      </div>
                      <span className="font-semibold">{stats.phoneClicks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Website Clicks</span>
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
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#773344]" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>Detailed insights coming soon</CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center text-gray-500">
                <div className="w-20 h-20 rounded-2xl bg-[#773344]/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-[#773344]" />
                </div>
                <p>Advanced analytics and charts will be available soon.</p>
                <p className="text-sm mt-2">Track views, clicks, and engagement over time.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#773344]" />
                  Customer Reviews
                </CardTitle>
                <CardDescription>
                  {agency?.review_count || 0} total reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Review management coming soon. You can view your public reviews on your{' '}
                  <Link href={`/agency/${agency?.id}`} className="text-[#773344] hover:underline">
                    public profile
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="glass-strong rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#773344]" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Profile Settings</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    Manage your agency information, logo, and contact details.
                  </div>
                  <Button className="btn-futuristic rounded-xl" asChild>
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Subscription</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    Current plan: <Badge className="bg-[#773344] text-white">{agency?.subscription_plan || 'Free'}</Badge>
                  </div>
                  <Button variant="outline" className="glass border-2 hover:bg-white/50 rounded-xl" asChild>
                    <Link href="/dashboard/subscription">Upgrade Plan</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm glass rounded-2xl p-4">
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
    <Card className="glass-strong rounded-2xl hover-lift">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#2C2C2C] mb-1">{value}</p>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
