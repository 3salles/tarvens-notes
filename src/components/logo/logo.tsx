import { Swords } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:text-accent-600 rounded-lg 
      transition-colors"
    >
      <Swords />
      <span className="text-lg font-semibold">Taverns & Notes</span>
    </Link>
  );
};
