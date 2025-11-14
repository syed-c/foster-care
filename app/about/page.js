import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Heart, Award, Globe, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former foster carer with over 15 years of experience in child welfare services.",
      image: "/placeholder-team-1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Director of Operations",
      bio: "Social work professional dedicated to connecting families with fostering opportunities.",
      image: "/placeholder-team-2.jpg"
    },
    {
      name: "Emma Rodriguez",
      role: "Community Outreach Lead",
      bio: "Passionate advocate for children's rights and family support services.",
      image: "/placeholder-team-3.jpg"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every family and child with empathy and understanding."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong networks of support for foster families."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Maintaining the highest standards in our services and partnerships."
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description: "Creating opportunities for all families regardless of background."
    }
  ];

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green to-secondary-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Foster Care UK</h1>
            <p className="text-xl mb-8 text-white/90">
              Connecting caring hearts with children in need since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Founded by former foster carers who understood the challenges of finding the right support
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Foster Care UK was born from a personal journey. Our founders, Sarah and James Thompson, 
                spent years navigating the complex world of fostering as both carers and advocates. They 
                experienced firsthand the gaps in support, the difficulty in finding quality information, 
                and the lack of a centralized resource for foster families.
              </p>
              
              <p className="text-gray-700 mb-6">
                In 2010, they launched Foster Care UK with a simple mission: to make the fostering journey 
                easier for families by providing transparent, reliable information and connecting them with 
                accredited agencies. What started as a small directory has grown into one of the UK's most 
                trusted fostering resources.
              </p>
              
              <p className="text-gray-700 mb-6">
                Today, we've helped connect over 5,000 children with loving families and supported more than 
                200 fostering agencies across England, Scotland, Wales, and Northern Ireland. Our platform 
                continues to evolve, incorporating feedback from carers, agencies, and social services to 
                better serve the fostering community.
              </p>
              
              <div className="bg-primary-green/5 p-6 rounded-lg border border-primary-green/10 my-8">
                <h3 className="text-xl font-bold mb-3">Our Impact</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-primary-green mr-2" />
                    <span>5,000+ children placed with loving families</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-primary-green mr-2" />
                    <span>200+ accredited fostering agencies supported</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-primary-green mr-2" />
                    <span>98% satisfaction rate among our foster families</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-primary-green mr-2" />
                    <span>Nationally recognized for excellence in child welfare</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center rounded-modern-xl">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary-green" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to supporting foster families
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center rounded-modern-xl">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary-green font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-green to-secondary-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fostering Journey?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of families who have found their perfect fostering match through our platform
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary-green hover:bg-gray-100" asChild>
            <Link href="/contact">
              Get in Touch <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}