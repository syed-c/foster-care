import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero({ title, subtitle, ctaText = 'Get Foster Agency Support', ctaHref = '/contact' }) {
  return (
    <section className="relative bg-gradient-to-br from-[#2C2C2C] to-[#7CE2A7] text-white py-16 md:py-24 rounded-modern-lg overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-nunito">
              {subtitle}
            </p>
          )}
          <Link href={ctaHref}>
            <Button
              size="lg"
              className="bg-[#7DC3EB] hover:bg-[#6bb3d9] text-white px-8 py-6 text-lg font-semibold rounded-modern font-inter"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}