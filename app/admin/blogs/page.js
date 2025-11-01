'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Calendar,
  User
} from 'lucide-react';

export default function BlogManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      fetchBlogs();
    }
  }, [isAdmin]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list
      } else {
        console.error('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog management...</p>
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
              <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
              <p className="opacity-90">Create, edit, and manage blog posts</p>
            </div>
            <Button asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="/admin/blogs/create">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Posts List */}
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage all blog content</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredBlogs.length > 0 ? (
              <div className="space-y-4">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-white/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          {blog.author || 'Unknown'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                        </div>
                        {blog.status === 'published' ? (
                          <Badge variant="default">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/blogs/edit/${blog.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No blog posts found</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/blogs/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}