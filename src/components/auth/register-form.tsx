import { createUserSchema } from '@/core/application/auth/create-user.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

export const RegisterForm = () => {
  const t = useTranslations('authForm');

  const registerForm = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { isValid } = registerForm.formState;

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <Form {...registerForm}>
        <form className="space-y-4">
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('nameLabel')}</FormLabel>

                <FormControl>
                  <Input
                    size="lg"
                    placeholder={t('namePlaceholder')}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>

                <FormControl>
                  <Input
                    size="lg"
                    placeholder="mestre@taverna.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>

                <FormControl>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full bg-ember hover:bg-ember-lite text-base 
                        h-12"
              size="lg"
              disabled={!isValid}
            >
              {t('registerSubmit')}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
