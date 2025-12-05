'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Database,
  Users,
  FileText,
  BookOpen
} from 'lucide-react';

export default function AdminFunctionalityTest() {
  const router = useRouter();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    if (isAdmin) {
      runTests();
    }
  }, [isAdmin]);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    // Test 1: Session
    results.session = {
      status: 'passed',
      message: 'Session is active and user is admin'
    };

    // Test 2: Dashboard Stats API
    try {
      const statsResponse = await fetch('/api/admin/stats');
      results.dashboardStats = {
        status: statsResponse.ok ? 'passed' : 'failed',
        message: statsResponse.ok ? 'Dashboard stats API is working' : 'Dashboard stats API failed'
      };
    } catch (error) {
      results.dashboardStats = {
        status: 'failed',
        message: `Error testing dashboard stats API: ${error.message}`
      };
    }

    // Test 3: Agencies API
    try {
      const agenciesResponse = await fetch('/api/admin/agencies?limit=1');
      results.agencies = {
        status: agenciesResponse.ok ? 'passed' : 'failed',
        message: agenciesResponse.ok ? 'Agencies API is working' : 'Agencies API failed'
      };
    } catch (error) {
      results.agencies = {
        status: 'failed',
        message: `Error testing agencies API: ${error.message}`
      };
    }

    // Test 4: Users API
    try {
      const usersResponse = await fetch('/api/admin/users?limit=1');
      results.users = {
        status: usersResponse.ok ? 'passed' : 'failed',
        message: usersResponse.ok ? 'Users API is working' : 'Users API failed'
      };
    } catch (error) {
      results.users = {
        status: 'failed',
        message: `Error testing users API: ${error.message}`
      };
    }

    // Test 5: Blogs API
    try {
      const blogsResponse = await fetch('/api/admin/blogs?limit=1');
      results.blogs = {
        status: blogsResponse.ok ? 'passed' : 'failed',
        message: blogsResponse.ok ? 'Blogs API is working' : 'Blogs API failed'
      };
    } catch (error) {
      results.blogs = {
        status: 'failed',
        message: `Error testing blogs API: ${error.message}`
      };
    }

    // Test 6: Pages API
    try {
      const pagesResponse = await fetch('/api/admin/pages');
      results.pages = {
        status: pagesResponse.ok ? 'passed' : 'failed',
        message: pagesResponse.ok ? 'Pages API is working' : 'Pages API failed'
      };
    } catch (error) {
      results.pages = {
        status: 'failed',
        message: `Error testing pages API: ${error.message}`
      };
    }

    // Test 7: Activity API
    try {
      const activityResponse = await fetch('/api/admin/activity?limit=1');
      results.activity = {
        status: activityResponse.ok ? 'passed' : 'failed',
        message: activityResponse.ok ? 'Activity API is working' : 'Activity API failed'
      };
    } catch (error) {
      results.activity = {
        status: 'failed',
        message: `Error testing activity API: ${error.message}`
      };
    }

    setTestResults(results);
    setLoading(false);
  };

  const getIcon = (status) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Running functionality tests...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Functionality Test</h1>
              <p className="opacity-90">Verify all admin features are working correctly</p>
            </div>
            <Button asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="/admin">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="glass-card rounded-modern mb-6">
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Current status of all admin functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(testResults).map(([key, result]) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getIcon(result.status)}
                    <div>
                      <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm text-gray-600">{result.message}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${getStatusColor(result.status)}`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button onClick={runTests} variant="outline">
                Re-run Tests
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card rounded-modern hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Database APIs</CardTitle>
              <CardDescription>Test core data operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/stats">Test Stats API</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/agencies?limit=1">Test Agencies API</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/users?limit=1">Test Users API</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-modern hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Test content editing features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/pages">Test Pages API</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/blogs?limit=1">Test Blogs API</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/pages-editor">Page Editor</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-modern hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>Test blog creation and editing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/blogs">Blog Dashboard</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/blogs/create">Create Blog Post</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/api/admin/blogs?limit=1">Test Blogs API</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}