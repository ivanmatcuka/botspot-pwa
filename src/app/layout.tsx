import '@botspot/ui/dist/ui.css';

import './globals.scss';

import type { Metadata } from 'next';

import { Footer } from '@/components/Footer';
import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { Navbar } from '@/components/Navbar/Navbar';
import { getAreas } from '@/services/getAreas';
import { getComponentBySlug } from '@/services/getComponentBySlug';
import { getMenuBySlug } from '@/services/getMenuBySlug';
import { getProducts } from '@/services/getProducts';
import { attachPage } from '@/utils/attachPage';
import { createDataTree } from '@/utils/createDataTree';
import { Box, SnackbarProvider, ThemeRegistry } from '@botspot/ui';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  description: '3D Scanning Services',
  title: 'botspot',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      sizes: '48x48',
      url: '/favicon-48x48.png',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [{ data: products }, { data: areas }, menus, navbar] =
    await Promise.all([
      getProducts(),
      getAreas(),
      getMenuBySlug('header'),
      getComponentBySlug('navbar-item'),
    ]);

  const navbarItems = [...createDataTree(menus)];

  for (const area of areas) attachPage(area, navbarItems, 'areas');
  for (const product of products) attachPage(product, navbarItems, 'products');

  const blocks = navbar?.block_data;

  return (
    <html lang="en">
      {process.env.nodeEnv === 'production' && (
        <head>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ''} />
          <Script id="varify">
            {`window.varify = window.varify || {}; window.varify.iid = ${process.env.NEXT_PUBLIC_VARIFY_ID};`}
          </Script>
          <Script src="https://app.varify.io/varify.js" />
        </head>
      )}
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <SnackbarProvider>
              <NextTopLoader />
              <Navbar
                cta={blocks && <GutenbergBlocks blocks={blocks} />}
                navItems={navbarItems}
              />
              <Box className="flex-1 flex flex-col">{children}</Box>
              <Footer products={products} />
            </SnackbarProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
