import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthSessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata = {
  title: "Foster Care Directory UK - Connecting Families with Fostering Agencies",
  description: "The UK's most trusted fostering directory. Find verified fostering agencies, read reviews, and connect with caring opportunities across the United Kingdom.",
  keywords: "foster care, fostering agencies UK, adopt, family care, child fostering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background`}>
        <AuthSessionProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}