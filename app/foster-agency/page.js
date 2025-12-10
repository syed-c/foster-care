import { loadCountries } from '@/lib/locationData';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Heart, 
  ArrowRight, 
  Shield, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  FileText,
  Search,
  Home,
  Building2,
  GraduationCap,
  HandHeart,
  Scale,
  CheckCircle2,
  PoundSterling
} from 'lucide-react';
import MapSection from '@/components/MapSection';
import FosterAgencyMainPageClient from './FosterAgencyMainPageClient';

export const metadata = {
  title: 'UK Foster Agency Directory | Find Foster Care Services',
  description: 'Find foster agencies across England, Scotland, Wales, and Northern Ireland. Browse by location to discover trusted fostering services in your area.',
};

export default async function FosterAgencyMainPage() {
  console.log('Loading countries from Supabase...');
  const countries = await loadCountries();
  console.log('Countries loaded:', countries?.length || 0);
  
  // Fallback data if Supabase is not configured
  const fallbackCountries = [
    { slug: 'england', name: 'England', lat: 52.3555, lng: -1.1743 },
    { slug: 'scotland', name: 'Scotland', lat: 56.4907, lng: -4.2026 },
    { slug: 'wales', name: 'Wales', lat: 52.1307, lng: -3.7837 },
    { slug: 'northern-ireland', name: 'Northern Ireland', lat: 54.7855, lng: -6.4923 }
  ];

  // Use fallback data if countries couldn't be loaded
  const countriesToDisplay = countries && countries.length > 0 ? countries : fallbackCountries;
  console.log('Countries to display:', countriesToDisplay.length);

  return <FosterAgencyMainPageClient countriesToDisplay={countriesToDisplay} />;
}