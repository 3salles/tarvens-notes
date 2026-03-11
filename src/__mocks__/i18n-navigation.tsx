import React from 'react';

export const Link = ({
  children,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
});

export const usePathname = () => '/';

export const redirect = jest.fn();
