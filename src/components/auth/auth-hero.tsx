import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { TomeScene } from '../animations';
import { Logo } from '../logo';

export const AuthHero = ({ tab }: { tab: string }) => {
  const t = useTranslations('tabHero');

  return (
    <div className="relative flex basis-[55%] items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
              radial-gradient(ellipse 70% 80% at 35% 55%, rgba(201,76,26,0.22) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 75% 20%, rgba(184,146,42,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 60% 70% at 15% 85%, rgba(100,50,10,0.25) 0%, transparent 55%)`,
        }}
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12">
        <motion.div
          className="absolute top-10 left-10 flex items-center gap-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Logo />
        </motion.div>

        <TomeScene trigger={tab} />

        <div className="w-full max-w-120 px-8 py-6 animate-fade-up">
          <p
            className="mx-auto mb-1 max-w-115 font-display italic font-semibold 
          leading-relaxed text-xl tracking-wide text-text"
          >
            {t('quote')}
          </p>

          <cite className="font-body text-sm uppercase  not-italic text-text-muted">
            {t('author')}
          </cite>
        </div>
      </div>
    </div>
  );
};
