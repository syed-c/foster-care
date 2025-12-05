import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-offwhite py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="rounded-modern-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Profile information (if you create an account)</li>
                <li>Communications with our support team</li>
                <li>Information about your fostering interests and preferences</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect Automatically</h2>
              <p>When you access our website, we automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Log information (IP address, browser type, pages visited)</li>
                <li>Device information (device type, operating system)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Connect you with relevant fostering agencies</li>
                <li>Send you important updates and newsletters</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fostering agencies when you express interest in their services</li>
                <li>Service providers who assist us in operating our platform</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies</h2>
              <p>
                We use cookies to enhance your experience on our website. You can control cookies through your browser settings.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 16. We do not knowingly collect information from children.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Foster Care UK<br />
                Email: <Link href="mailto:privacy@fostercareuk.org" className="text-primary-green hover:underline">privacy@fostercareuk.org</Link><br />
                Phone: +44 123 456 7890
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}