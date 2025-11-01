import { loadCountries } from '@/lib/locationData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Heart, ArrowRight, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'UK Foster Agency Directory | Find Foster Care Services',
  description: 'Find foster agencies across England, Scotland, Wales, and Northern Ireland. Browse by location to discover trusted fostering services in your area.',
};

export default async function FosterAgencyMainPage() {
  const countries = await loadCountries();

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Modern Hero Section with Glassmorphism */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary-green/10 to-secondary-blue/10 border-b-4 border-primary-green/20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                UK Foster Care Directory
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-charcoal mb-6 font-poppins">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                Fostering Agency
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter">
              Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies by location, read reviews, and start your fostering journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Shield className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Browse by Country
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Explore Fostering Agencies by Location
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Find trusted foster agencies across England, Scotland, Wales, and Northern Ireland
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {countries.map((country) => (
              <Link key={country.slug} href={`/foster-agency/${country.slug}`}>
                <Card className="glass-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <MapPin className="w-8 h-8 text-primary-green" />
                    </div>
                    <CardTitle className="text-center text-xl font-poppins group-hover:text-primary-green transition-colors">
                      {country.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base font-inter mb-4">
                      View foster agencies in {country.name}
                    </CardDescription>
                    <div className="flex items-center justify-center text-primary-green font-medium group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass-card-gradient rounded-modern-xl p-8 md:p-12 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-text-charcoal mb-4 font-poppins text-center">
                About Our Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed font-inter text-center mb-6">
                Our comprehensive directory helps you find foster agencies across the
                United Kingdom. Whether you're looking to become a foster carer or
                seeking support, we connect you with trusted agencies in your local
                area. Browse by country, region, or city to find the perfect match
                for your fostering journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Verified Agencies</h3>
                  <p className="text-sm text-gray-600 font-inter">All agencies are verified and trusted</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Location-Based</h3>
                  <p className="text-sm text-gray-600 font-inter">Find agencies near you</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Comprehensive</h3>
                  <p className="text-sm text-gray-600 font-inter">Coverage across all UK regions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
