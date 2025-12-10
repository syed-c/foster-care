'use client';

import { motion } from 'framer-motion';
import { Heart, Users, MapPin, Clock, Shield, Award } from 'lucide-react';

export default function Home() {
  const stats = [
    { icon: Users, value: '500+', label: 'Fostering Agencies' },
    { icon: MapPin, value: '120+', label: 'Regions Covered' },
    { icon: Clock, value: '30 days', label: 'Avg. Approval Time' },
    { icon: Shield, value: '100%', label: 'Ofsted Compliant' },
  ];

  const services = [
    { title: 'Verified Agencies', description: 'All agencies are verified and regularly audited for quality.' },
    { title: 'Local Support', description: 'Connect with agencies in your local area for personalized support.' },
    { title: 'Comprehensive Resources', description: 'Access guides, FAQs, and expert advice throughout your journey.' },
    { title: 'Ongoing Training', description: 'Continuous professional development for foster carers.' },
    { title: '24/7 Helpline', description: 'Round-the-clock support for urgent matters.' },
    { title: 'Community Network', description: 'Join a supportive community of foster carers and professionals.' },
  ];

  const benefits = [
    { title: 'For New Carers', items: ['Personalized matching', 'Comprehensive training', 'Mentorship program', 'Ongoing support'] },
    { title: 'For Experienced Carers', items: ['Advanced training opportunities', 'Specialized placements', 'Career progression', 'Peer networking'] },
    { title: 'For Agencies', items: ['Streamlined recruitment', 'Quality assurance', 'Compliance support', 'Performance analytics'] },
  ];

  const trustLogos = [
    { name: 'Ofsted', logo: '/logos/ofsted.svg' },
    { name: 'Local Authorities', logo: '/logos/local-authorities.svg' },
    { name: 'IFA Members', logo: '/logos/ifa-members.svg' },
    { name: 'National Standards', logo: '/logos/national-standards.svg' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-dark mb-6">
                Find Your Perfect Fostering Match
              </h1>
              <p className="text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
                Connect with verified fostering agencies across the UK. Start your journey to make a meaningful difference in a child's life today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors">
                  Browse Agencies
                </button>
                <button className="border border-brand-main text-brand-main px-8 py-4 rounded-full font-medium hover:bg-brand-main/5 transition-colors">
                  Learn About Fostering
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brand-accent to-green-700 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-white/80">Happy Families</div>
                  </div>
                </div>
                <blockquote className="text-lg italic mb-4">
                  "Finding the right agency made all the difference in our fostering journey."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                  <div>
                    <div className="font-medium">Sarah & James</div>
                    <div className="text-sm text-white/80">Manchester Foster Carers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Feature Row */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-brand-dark mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">Our Services</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Comprehensive Support for Your Fostering Journey
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Everything you need from initial inquiry to ongoing support
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-brand-dark mb-2">{service.title}</h3>
                <p className="text-neutral-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">Benefits</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Tailored Support for Every Stage
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Whether you're just starting out or have years of experience, we've got you covered
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
              >
                <h3 className="text-xl font-semibold text-brand-dark mb-4">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                      </div>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">Process</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Your Fostering Journey Made Simple
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Four straightforward steps to begin your rewarding experience
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Discover', description: 'Browse verified agencies in your area' },
              { number: '2', title: 'Connect', description: 'Reach out to agencies that match your needs' },
              { number: '3', title: 'Assess', description: 'Complete the application and assessment process' },
              { number: '4', title: 'Begin', description: 'Start your fostering journey with full support' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">{step.title}</h3>
                <p className="text-neutral-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-brand-main w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We work with the UK's most respected fostering authorities
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
          >
            {trustLogos.map((logo, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <span className="text-white font-medium">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-neutral-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of foster carers who found their perfect match through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-colors text-lg">
                Start Your Journey
              </button>
              <button className="border border-brand-main text-brand-main px-8 py-4 rounded-full font-medium hover:bg-brand-main/5 transition-colors text-lg">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}