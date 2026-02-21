'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateSessionDTO,
  CreateSessionSchema,
} from '@/core/application/session/create-session.dto';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const SessionForm = () => {
  const sessionForm = useForm<CreateSessionDTO>({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues: {
      title: '',
      note: '',
    },
  });

  return (
    <Form {...sessionForm}>
      <form action="" className="space-y-6">
        <header className="flex flex-wrapper gap-2 items-center mb-6 justify-end">
          <Button type="submit" size="sm">
            Salvar
          </Button>
        </header>

        <FormField
          control={sessionForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Título da sessão"
                  variant="transparent"
                  size="lg"
                  autoFocus
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={sessionForm.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Digite o conteúdo da sessão..."
                  variant="transparent"
                  size="lg"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
