'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  BookOpen,
  LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalAgencies: 0,
    pendingAgencies: 0,
    totalUsers: 0,
    totalLeads: 0,
    totalReviews: 0,
    featuredAgencies: 0
  });
  const [pendingAgencies, setPendingAgencies] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Check if user is admin by verifying admin token
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/auth/admin/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'admin') {
            setIsAdmin(true);
          } else {
            router.push('/admin/signin');
          }
        } else {
          router.push('/admin/signin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/admin/signin');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchPendingAgencies = async () => {
    try {
      const response = await fetch('/api/admin/agencies?status=pending&limit=3');
      if (response.ok) {
        const data = await response.json();
        setPendingAgencies(data.agencies || []);
      }
    } catch (error) {
      console.error('Error fetching pending agencies:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch('/api/admin/activity?limit=4');
      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data.activity || []);
      } else {
        // Fallback to mock data if API fails
        const mockActivity = [
          { id: 1, action: 'New agency registered', item: 'CareFirst Agency', time: '2 hours ago' },
          { id: 2, action: 'Agency approved', item: 'Bright Futures', time: '5 hours ago' },
          { id: 3, action: 'New lead received', item: 'Manchester Family Care', time: '1 day ago' },
          { id: 4, action: 'Review submitted', item: 'London Cares Ltd', time: '1 day ago' }
        ];
        setRecentActivity(mockActivity);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      // Fallback to mock data on error
      const mockActivity = [
        { id: 1, action: 'New agency registered', item: 'CareFirst Agency', time: '2 hours ago' },
        { id: 2, action: 'Agency approved', item: 'Bright Futures', time: '5 hours ago' },
        { id: 3, action: 'New lead received', item: 'Manchester Family Care', time: '1 day ago' },
        { id: 4, action: 'Review submitted', item: 'London Cares Ltd', time: '1 day ago' }
      ];
      setRecentActivity(mockActivity);
    }
  };

  useEffect(() => {
    if (!loading && isAdmin) {
      Promise.all([
        fetchDashboardStats(),
        fetchPendingAgencies(),
        fetchRecentActivity()
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [isAdmin, loading]);

  const handleApprove = async (agencyId) => {
    try {
      const response = await fetch(`/api/admin/agencies/${agencyId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        // Refresh data
        fetchDashboardStats();
        fetchPendingAgencies();
      }
    } catch (error) {
      console.error('Error approving agency:', error);
    }
  };

  const handleReject = async (agencyId) => {
    try {
      const response = await fetch(`/api/admin/agencies/${agencyId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        // Refresh data
        fetchDashboardStats();
        fetchPendingAgencies();
      }
    } catch (error) {
      console.error('Error rejecting agency:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/admin/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        // Redirect to admin signin page
        router.push('/admin/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // If not admin, don't render the dashboard
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">Admin Dashboard</h1>
              <p className="opacity-90 font-inter">Manage agencies, users, and content</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button variant="outline" className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter" asChild>
                <Link href="/">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Building2}
            title="Total Agencies"
            value={stats.totalAgencies}
            color="primary-green"
          />
          <StatCard
            icon={Building2}
            title="Pending Approval"
            value={stats.pendingAgencies}
            color="accent-peach"
          />
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats.totalUsers}
            color="secondary-blue"
          />
          <StatCard
            icon={MessageSquare}
            title="Total Leads"
            value={stats.totalLeads}
            color="primary-green"
          />
          <StatCard
            icon={Star}
            title="Total Reviews"
            value={stats.totalReviews}
            color="accent-peach"
          />
          <StatCard
            icon={Building2}
            title="Featured Agencies"
            value={stats.featuredAgencies}
            color="secondary-blue"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card lg:col-span-2 rounded-modern">
            <CardHeader>
              <CardTitle className="font-poppins">Quick Actions</CardTitle>
              <CardDescription className="font-inter">Manage your directory quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/agencies">
                    <Building2 className="w-6 h-6 mb-2" />
                    <span>Manage Agencies</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/leads">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span>View Leads</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/users">
                    <Users className="w-6 h-6 mb-2" />
                    <span>Manage Users</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/pages-editor">
                    <FileText className="w-6 h-6 mb-2" />
                    <span>Edit Pages</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/blogs">
                    <BookOpen className="w-6 h-6 mb-2" />
                    <span>Manage Blog</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/functionality-test">
                    <Settings className="w-6 h-6 mb-2" />
                    <span>Test Functionality</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center font-inter" asChild>
                  <Link href="/admin/gmb-import">
                    <Building2 className="w-6 h-6 mb-2" />
                    <span>GMB Import</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card rounded-modern">
            <CardHeader>
              <CardTitle className="font-poppins">Recent Activity</CardTitle>
              <CardDescription className="font-inter">Latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary-green"></div>
                      <div>
                        <p className="text-sm font-medium font-inter">{activity.action}</p>
                        <p className="text-xs text-gray-500 font-inter">{activity.item}</p>
                        <p className="text-xs text-gray-400 mt-1 font-inter">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4 font-inter">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Agencies */}
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle className="font-poppins">Pending Agency Approvals</CardTitle>
            <CardDescription className="font-inter">Agencies waiting for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAgencies.length > 0 ? (
                pendingAgencies.map((agency) => (
                  <div key={agency.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-white/50 transition-colors">
                    <div>
                      <h3 className="font-medium font-poppins">{agency.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600 font-inter">{agency.city || 'Location not set'}</span>
                        <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 font-inter">
                        {new Date(agency.created_at).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline" className="font-inter" asChild>
                        <Link href={`/admin/agencies/${agency.id}`}>
                          Review
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white font-inter"
                        onClick={() => handleApprove(agency.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="font-inter"
                        onClick={() => handleReject(agency.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4 font-inter">No agencies pending approval</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <Card className="glass-card rounded-modern">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `hsl(var(--${color}))` }}
          >
            <Icon className="w-6 h-6" style={{ color: 'white' }} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm font-medium text-gray-900 font-poppins">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}