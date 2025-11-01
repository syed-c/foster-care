'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Eye, 
  Trash2,
  ArrowLeft
} from 'lucide-react';

export default function BlogPostEditor() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'guides',
    author: null
  });
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isNewPost = params.id === 'create';

  useEffect(() => {
    if (!isNewPost) {
      fetchPost();
    }
    fetchAuthors();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/admin/authors');
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.authors || []);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const url = isNewPost 
        ? '/api/admin/blogs' 
        : `/api/admin/blogs/${params.id}`;
        
      const method = isNewPost ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        const data = await response.json();
        if (isNewPost) {
          router.push(`/admin/blogs/${data.post._id}`);
        } else {
          setPost(data.post);
        }
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  if (loading && !isNewPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-offwhite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-inter">Loading blog post...</p>
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
              <h1 className="text-3xl font-bold mb-2 font-poppins">
                {isNewPost ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h1>
              <p className="opacity-90 font-inter">Manage your blog content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white text-text-charcoal border-white hover:bg-gray-100 font-inter" asChild>
                <Link href="/admin/blogs">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Posts
                </Link>
              </Button>
              {!isNewPost && (
                <Button 
                  variant="destructive" 
                  className="font-inter"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle className="font-poppins">Post Details</CardTitle>
            <CardDescription className="font-inter">Edit your blog post content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="font-inter">Title *</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter post title"
                  className="font-inter"
                />
              </div>
              <div>
                <Label htmlFor="slug" className="font-inter">Slug</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="post-slug"
                  className="font-inter"
                />
                <p className="text-xs text-gray-500 mt-1 font-inter">
                  Will be auto-generated from title if left empty
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt" className="font-inter">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={post.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Brief description of the post"
                rows={3}
                className="font-inter"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="font-inter">Category</Label>
                <select
                  id="category"
                  value={post.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full p-2 border rounded font-inter"
                >
                  <option value="guides">Guides</option>
                  <option value="news">News</option>
                  <option value="stories">Stories</option>
                </select>
              </div>
              <div>
                <Label htmlFor="author" className="font-inter">Author</Label>
                <select
                  id="author"
                  value={post.author?._id || ''}
                  onChange={(e) => {
                    const author = authors.find(a => a._id === e.target.value);
                    handleChange('author', author);
                  }}
                  className="w-full p-2 border rounded font-inter"
                >
                  <option value="">Select an author</option>
                  {authors.map(author => (
                    <option key={author._id} value={author._id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="font-inter">Content *</Label>
              <Textarea
                id="content"
                value={post.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Write your blog post content here..."
                rows={15}
                className="font-inter"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                className="font-inter"
                asChild
              >
                <Link href={`/blog/${post.slug}`} target="_blank" disabled={!post.slug}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal font-inter"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}