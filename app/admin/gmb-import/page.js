import { checkAdminAuth } from './actions';
import ClientGMBImportPage from './client-page';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";

export default async function GMBImportPage() {
  // Check authentication on server side
  await checkAdminAuth();
  
  return <ClientGMBImportPage />;
}