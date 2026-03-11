'use client';

import { AuthHero, LoginForm, RegisterForm } from '@/components/auth';
import { GoogleIcon } from '@/components/ui/icons';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Auth() {
  const t = useTranslations('auth');

  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <section className="flex h-screen w-full bg-ink text-text font-body overflow-hidden">
      <AuthHero tab={tab} />

      <div className="basis-px bg-linear-to-b from-transparent via-border-strong to-transparent" />
      <div className="relative flex w-[45%] items-center justify-center bg-surface overflow-hidden">
        <div
          className="pointer-events-none absolute right-0 top-0 h-50 w-50"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(201,76,26,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="w-full max-w-lg animate-fade-up px-8">
          <header>
            <h1 className="font-display text-3xl font-bold leading-tight mb-1">
              {t('title')}
              <br />
              <em className="text-text-muted italic">{t('subtitle')}</em>
            </h1>
            <p className="mb-8 text-base text-text-dim">{t('description')}</p>
          </header>

          <Tabs
            value={tab}
            onValueChange={(tab) => setTab(tab as 'login' | 'signup')}
          >
            <TabsList
              variant="line"
              className="mb-7 w-full border-b border-border"
            >
              <TabsTrigger value="login"> {t(`tabs.login`)}</TabsTrigger>
              <TabsTrigger value="signup"> {t(`tabs.signup`)}</TabsTrigger>
            </TabsList>

            <motion.div layout className="relative min-h-75">
              <AnimatePresence mode="wait">
                {tab === 'login' ? <LoginForm /> : <RegisterForm />}
              </AnimatePresence>
            </motion.div>
          </Tabs>

          <div
            className="my-5 flex items-center gap-3 text-sm tracking-[0.08em]
          text-text-muted"
          >
            <div className="h-px flex-1 bg-border" />
            {t('or')}
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-sm
              border border-border-strong h-11 text-base text-text-dim
              transition-colors hover:border-text-dim hover:text-text cursor-pointer"
          >
            <GoogleIcon />
            {t(`googleButton.${tab}`)}
          </button>
        </div>
      </div>
    </section>
  );
}
