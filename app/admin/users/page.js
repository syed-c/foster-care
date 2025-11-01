'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Eye,
  Trash2
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Mock data for testing
      const mockUsers = [
        {
          id: 1,
          name: "John Smith",
          email: "john@example.com",
          role: "user",
          created_at: "2023-05-15T10:30:00Z"
        },
        {
          id: 2,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          created_at: "2023-04-10T08:15:00Z"
        },
        {
          id: 3,
          name: "Jane Doe",
          email: "jane@example.com",
          role: "user",
          created_at: "2023-06-20T14:45:00Z"
        }
      ];
      
      setUsers(mockUsers);
      setTotalPages(1);
      setLoading(false);
      
      // Original API call code commented out
      /*
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      
      if (filter !== 'all') {
        params.append('role', filter);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/users?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      }
      */
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">Manage Users</h1>
              <p className="opacity-90 font-inter">View and manage user accounts</p>
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
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-inter"
            />
          </form>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              className={filter === 'all' ? 'bg-primary-green text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => { setFilter('all'); setCurrentPage(1); }}
            >
              All
            </Button>
            <Button 
              variant={filter === 'user' ? 'default' : 'outline'} 
              className={filter === 'user' ? 'bg-primary-green text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => { setFilter('user'); setCurrentPage(1); }}
            >
              Users
            </Button>
            <Button 
              variant={filter === 'agency' ? 'default' : 'outline'} 
              className={filter === 'agency' ? 'bg-secondary-blue text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => { setFilter('agency'); setCurrentPage(1); }}
            >
              Agencies
            </Button>
          </div>
        </div>

        {/* Users List */}
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle className="font-poppins">Users ({users.length})</CardTitle>
            <CardDescription className="font-inter">Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : users.length > 0 ? (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg hover:bg-white/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div>
                            <h3 className="font-medium font-poppins">{user.name}</h3>
                            <p className="text-sm text-gray-600 font-inter">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={
                                user.role === 'user' ? 'bg-primary-green' : 
                                user.role === 'agency' ? 'bg-secondary-blue' : 
                                'bg-accent-peach'
                              }
                            >
                              {user.role}
                            </Badge>
                            <Badge 
                              className={
                                user.email_verified ? 'bg-green-500' : 
                                'bg-gray-500'
                              }
                            >
                              {user.email_verified ? 'Verified' : 'Unverified'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs text-gray-500 font-inter">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </span>
                          {user.agency && (
                            <span className="text-xs text-gray-500 font-inter">• Agency: {user.agency.name}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="font-inter" asChild>
                          <Link href={`/admin/users/${user.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="font-inter"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-inter">No users found matching your criteria.</p>
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
              <span className="font-inter">
                Page {currentPage} of {totalPages}
              </span>
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