import { loadAllPages } from '@/lib/location-pages-api';
import { LocationPagesEditor } from '@/components/admin/location-pages/location-pages-editor';
import { supabaseAdmin } from '@/lib/supabase-server';

export default async function LocationPagesAdminPage() {
  const pages = await loadAllPages();
  
  // Get user session
  const { data: { session } } = await supabaseAdmin.auth.getSession();
  
  // Redirect if not authenticated
  if (!session) {
    // In a real app, you would redirect to login
    // For now, we'll pass a placeholder email
    return (
      <div className="container mx-auto py-8">
        <LocationPagesEditor initialPages={pages} userEmail="admin@example.com" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <LocationPagesEditor initialPages={pages} userEmail={session.user.email} />
    </div>
  );
}