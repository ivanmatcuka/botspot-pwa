import { NextConfig } from 'next';

import { getRedirects } from './src/services/getRedirects';

type JsonData = {
  action_code: number;
  match_url: string;
  url: string;
  action_data: {
    server?: string;
    url?: string;
    url_from?: string;
  };
}[];

const adaptRedirectsForNextJs = (jsonData: JsonData) =>
  jsonData.map((redirect) => {
    const { action_code, action_data, match_url, url } = redirect;
    const { server, url: action_url, url_from } = action_data;

    const source = match_url.replace(/\/$/, '');
    const destination = action_url || url_from || server || url;

    return {
      destination,
      permanent: action_code === 301,
      source,
    };
  });

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    const redirects = await getRedirects();
    const nextJsRedirects = adaptRedirectsForNextJs(redirects);

    return nextJsRedirects;
  },
  env: {
    nodeEnv: process.env.NODE_ENV,
  },
  experimental: {
    esmExternals: true,
    inlineCss: true,
    webpackMemoryOptimizations: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '8080',
        protocol: 'http',
      },
      {
        hostname: 'botspot.live-website.com',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'botspot.matcuka.dev',
        port: '',
        protocol: 'https',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: [
      'global-builtin',
      'color-functions',
      'mixed-decls',
      'legacy-js-api',
      'import',
    ],
  },
};

export default nextConfig;
