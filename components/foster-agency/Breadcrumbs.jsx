import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-[#2C2C2C] font-inter">
        <li>
          <Link href="/" className="hover:text-[#7CE2A7] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-[#F9CBA2]" />
            {index === items.length - 1 ? (
              <span className="text-[#2C2C2C] font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#7CE2A7] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}