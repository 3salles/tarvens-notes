import { PrismaClient } from '@/generated/prisma/client';
import { expect, test } from '@playwright/test';
import { PrismaPg } from '@prisma/adapter-pg';

test('Remove session by UI (success)', async ({ page }) => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  const uniqueTitle = `E2E Deletable Session ${Date.now()}`;
  const note = 'content';
  await prisma.session.create({
    data: {
      title: uniqueTitle,
      note,
    },
  });
  await prisma.$disconnect();

  await page.goto('/');

  const list = page.getByRole('list');
  await expect(list).toBeVisible();

  const heading = page.getByRole('heading', { name: uniqueTitle });
  await expect(heading).toBeVisible({ timeout: 15000 });
  const promptItem = page
    .getByRole('listitem')
    .filter({ hasText: uniqueTitle });
  await expect(promptItem).toBeVisible();

  await promptItem.getByRole('button', { name: 'Remover sessão' }).click();

  await page.getByRole('button', { name: 'Remover' }).click();

  await expect(page.getByText('Sessão removida com sucesso!')).toBeVisible();
  await expect(page.getByRole('heading', { name: uniqueTitle })).toHaveCount(0);
});
