import { Link } from '@/i18n/navigation';
import { BookIcon } from '../ui/icons';

export const Logo = () => {
  // TODO - Adicionar melhoria de rotas
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:text-accent-600 rounded-lg 
      transition-colors"
    >
      <BookIcon className="text-ember" />
      <span className="font-display text-[1.05rem] font-bold">
        Taverns & Notes
      </span>
    </Link>
  );
};
