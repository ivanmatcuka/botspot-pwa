import '@botspot/ui/dist/ui.css';

import './globals.scss';

import type { Metadata } from 'next';

import { WordPressThemeProvider } from '@/components/WordPressThemeProvider';
import { getTemplateParts } from '@/services/getTemplateParts';
import { TemplatePartsProvider } from '@/wordpress/TemplatePartsProvider';
import { Box, SnackbarProvider } from '@botspot/ui';
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

const VARIFY_ID = process.env.NEXT_PUBLIC_VARIFY_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const templateParts = await getTemplateParts();

  return (
    <html lang="en">
      {process.env.nodeEnv === 'production' && (
        <head>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ''} />

          <Script id="varify">
            {`window.varify = window.varify || {}; window.varify.iid = ${VARIFY_ID};`}
          </Script>
          <Script src="https://app.varify.io/varify.js" />
        </head>
      )}
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <AppRouterCacheProvider>
          <WordPressThemeProvider>
            <TemplatePartsProvider templateParts={templateParts ?? {}}>
              <SnackbarProvider>
                <NextTopLoader />
                <Box className="flex-1 flex flex-col">{children}</Box>
              </SnackbarProvider>
            </TemplatePartsProvider>
          </WordPressThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
