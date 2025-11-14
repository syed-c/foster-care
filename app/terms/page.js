import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-offwhite py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="rounded-modern-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to Foster Care UK ("we", "our", "us"). These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Services</h2>
              <p>
                Foster Care UK provides a platform to connect prospective foster carers with accredited fostering agencies. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Agency directory and search functionality</li>
                <li>Information resources about fostering</li>
                <li>Community forums for foster carers</li>
                <li>Educational materials and guides</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
              <p>As a user of our platform, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Respect the rights and privacy of others</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of Foster Care UK or its licensors and is protected by intellectual property laws. You may not use our content without our express written permission.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Agency Listings</h2>
              <p>
                We provide agency listings as a service to our users. While we verify basic accreditation information, we do not endorse or guarantee the quality of services provided by listed agencies. Users should conduct their own due diligence before engaging with any agency.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Foster Care UK shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or use, incurred by you or any third party.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Foster Care UK<br />
                Email: <Link href="mailto:info@fostercareuk.org" className="text-primary-green hover:underline">info@fostercareuk.org</Link><br />
                Phone: +44 123 456 7890
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}