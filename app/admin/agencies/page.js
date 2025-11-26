'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Search, 
  CheckCircle, 
  XCircle, 
  Star,
  Eye,
  Filter
} from 'lucide-react';

export default function AdminAgencies() {
  const router = useRouter();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAgencies, setTotalAgencies] = useState(0);

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
      }
    };

    checkAdminStatus();
  }, [router]);

  useEffect(() => {
    if (isAdmin) {
      fetchAgencies();
    }
  }, [isAdmin, currentPage, filter]);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10); // Show 10 agencies per page
      
      if (filter !== 'all') {
        params.append('status', filter);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/agencies?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAgencies(data.agencies || []);
        setTotalPages(data.totalPages || 1);
        setTotalAgencies(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (agencyId) => {
    try {
      const response = await fetch(`/api/admin/agencies/${agencyId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        fetchAgencies();
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
        fetchAgencies();
      }
    } catch (error) {
      console.error('Error rejecting agency:', error);
    }
  };

  const handleFeature = async (agencyId) => {
    try {
      const response = await fetch(`/api/admin/agencies/${agencyId}/feature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        fetchAgencies();
      }
    } catch (error) {
      console.error('Error featuring agency:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAgencies();
  };

  // Update filter handler to immediately apply filters
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // If not admin, don't render the agencies list
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Checking admin access...</p>
        </div>
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
              <h1 className="text-3xl font-bold mb-2 font-poppins">Manage Agencies</h1>
              <p className="opacity-90 font-inter">Approve, reject, and feature agencies</p>
            </div>
            <Button variant="outline" className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter" asChild>
              <Link href="/admin">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search agencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-inter"
            />
          </form>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              className={filter === 'all' ? 'bg-primary-green text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'approved' ? 'default' : 'outline'} 
              className={filter === 'approved' ? 'bg-primary-green text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => handleFilterChange('approved')}
            >
              Approved
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'} 
              className={filter === 'pending' ? 'bg-accent-peach text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={filter === 'rejected' ? 'default' : 'outline'} 
              className={filter === 'rejected' ? 'bg-red-500 text-white font-inter' : 'font-inter'}
              onClick={() => handleFilterChange('rejected')}
            >
              Rejected
            </Button>
          </div>
        </div>

        {/* Agencies List */}
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle className="font-poppins">Agencies ({totalAgencies} total)</CardTitle>
            <CardDescription className="font-inter">Manage agency approvals and features (Page {currentPage} of {totalPages})</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : agencies && agencies.length > 0 ? (
              <div className="space-y-4">
                {agencies.map((agency) => (
                  <div key={agency.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-white/50 transition-colors">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-primary-green" />
                        <div>
                          <h3 className="font-medium font-poppins">{agency.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600 font-inter">{agency.city || 'Location not set'}</span>
                            <Badge variant="outline" className="font-inter">{agency.type || 'Foster Agency'}</Badge>
                            {agency.verified ? (
                              <Badge className="bg-green-100 text-green-800 font-inter">Approved</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800 font-inter">Pending</Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-inter">
                                {agency.rating > 0 ? agency.rating.toFixed(1) : 'N/A'} ({agency.review_count || 0})
                              </span>
                            </div>
                            {agency.featured && (
                              <Badge className="bg-accent-peach font-inter">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        className={
                          agency.status === 'approved' ? 'bg-green-500' : 
                          agency.status === 'pending' ? 'bg-accent-peach' : 
                          'bg-red-500'
                        }
                      >
                        {agency.status ? agency.status.charAt(0).toUpperCase() + agency.status.slice(1) : 'Pending'}
                      </Badge>
                      <Button size="sm" variant="outline" className="font-inter" asChild>
                        <Link href={`/agencies/${agency.slug}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      {agency.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 text-white font-inter"
                            onClick={() => handleApprove(agency.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="font-inter"
                            onClick={() => handleReject(agency.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {agency.status === 'approved' && (
                        <Button 
                          size="sm" 
                          variant={agency.featured ? "default" : "outline"}
                          className={agency.featured ? "bg-accent-peach text-text-charcoal font-inter" : "font-inter"}
                          onClick={() => handleFeature(agency.id)}
                        >
                          {agency.featured ? "Unfeature" : "Feature"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-inter">No agencies found matching your criteria.</p>
              </div>
            )}
          </CardContent>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t p-4 flex justify-between items-center">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="font-inter"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate page number to display
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  // Don't render if page number is out of bounds
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      className={`font-inter ${currentPage === pageNum ? 'bg-primary-green text-text-charcoal' : ''}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="font-inter"
              >
                Next
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}