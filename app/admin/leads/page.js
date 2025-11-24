'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Search, 
  Eye,
  Mail,
  Phone,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchLeads();
  }, [currentPage, filter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 10);
      
      if (filter !== 'all') {
        params.append('status', filter);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsReplied = async (leadId) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/replied`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error marking lead as replied:', error);
    }
  };

  const handleMarkAsClosed = async (leadId) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/closed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error marking lead as closed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeads();
  };

  const startEditing = (lead) => {
    setEditingLeadId(lead.id);
    setEditFormData({
      name: lead.name,
      email: lead.email,
      message: lead.message,
      status: lead.status,
      phone: lead.phone || ''
    });
  };

  const cancelEditing = () => {
    setEditingLeadId(null);
    setEditFormData({});
  };

  const saveEdit = async (leadId) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      
      if (response.ok) {
        setEditingLeadId(null);
        setEditFormData({});
        fetchLeads();
      } else {
        console.error('Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">Manage Leads</h1>
              <p className="opacity-90 font-inter">Track and respond to inquiries</p>
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
              placeholder="Search leads..."
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
              variant={filter === 'new' ? 'default' : 'outline'} 
              className={filter === 'new' ? 'bg-accent-peach text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => { setFilter('new'); setCurrentPage(1); }}
            >
              New
            </Button>
            <Button 
              variant={filter === 'replied' ? 'default' : 'outline'} 
              className={filter === 'replied' ? 'bg-primary-green text-text-charcoal font-inter' : 'font-inter'}
              onClick={() => { setFilter('replied'); setCurrentPage(1); }}
            >
              Replied
            </Button>
            <Button 
              variant={filter === 'closed' ? 'default' : 'outline'} 
              className={filter === 'closed' ? 'bg-gray-500 text-white font-inter' : 'font-inter'}
              onClick={() => { setFilter('closed'); setCurrentPage(1); }}
            >
              Closed
            </Button>
          </div>
        </div>

        {/* Leads List */}
        <Card className="glass-card rounded-modern">
          <CardHeader>
            <CardTitle className="font-poppins">Leads ({leads.length})</CardTitle>
            <CardDescription className="font-inter">Manage inquiries from potential clients</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : leads.length > 0 ? (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-4 border rounded-lg hover:bg-white/50 transition-colors">
                    {editingLeadId === lead.id ? (
                      // Edit mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input
                              value={editFormData.name || ''}
                              onChange={(e) => handleEditChange('name', e.target.value)}
                              className="font-inter"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input
                              value={editFormData.email || ''}
                              onChange={(e) => handleEditChange('email', e.target.value)}
                              className="font-inter"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <Input
                              value={editFormData.phone || ''}
                              onChange={(e) => handleEditChange('phone', e.target.value)}
                              className="font-inter"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <Select value={editFormData.status || 'new'} onValueChange={(value) => handleEditChange('status', value)}>
                              <SelectTrigger className="font-inter">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="replied">Replied</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Message</label>
                          <textarea
                            value={editFormData.message || ''}
                            onChange={(e) => handleEditChange('message', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-inter"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={cancelEditing} className="font-inter">
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                          <Button onClick={() => saveEdit(lead.id)} className="bg-primary-green text-text-charcoal font-inter">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div>
                              <h3 className="font-medium font-poppins">{lead.name}</h3>
                              <p className="text-sm text-gray-600 font-inter">{lead.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-inter">{lead.agency?.name || 'Unknown Agency'}</Badge>
                              <Badge 
                                className={
                                  lead.status === 'new' ? 'bg-accent-peach' : 
                                  lead.status === 'replied' ? 'bg-primary-green' : 
                                  'bg-gray-500'
                                }
                              >
                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-700 font-inter">{lead.message}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs text-gray-500 font-inter">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </span>
                            {lead.phone && (
                              <span className="text-xs text-gray-500 font-inter">• {lead.phone}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" className="font-inter" asChild>
                            <a href={`mailto:${lead.email}`}>
                              <Mail className="w-4 h-4 mr-1" />
                              Email
                            </a>
                          </Button>
                          {lead.phone && (
                            <Button size="sm" variant="outline" className="font-inter" asChild>
                              <a href={`tel:${lead.phone}`}>
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="font-inter" onClick={() => startEditing(lead)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          {lead.status === 'new' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-primary-green text-text-charcoal font-inter"
                                onClick={() => handleMarkAsReplied(lead.id)}
                              >
                                Mark Replied
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                className="font-inter"
                                onClick={() => handleMarkAsClosed(lead.id)}
                              >
                                Close
                              </Button>
                            </>
                          )}
                          {lead.status === 'replied' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="font-inter"
                              onClick={() => handleMarkAsClosed(lead.id)}
                            >
                              Close
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-inter">No leads found matching your criteria.</p>
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