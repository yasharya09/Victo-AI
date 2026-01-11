import { env } from './env';

interface Config {
  api: {
    baseUrl: string;
  };
  auth: {
    enabled: boolean;
    redirectUri: string;
  };
  features: {
    comments: boolean;
    newsletter: boolean;
    analytics: boolean;
  };
  services: {
    recaptcha: {
      siteKey: string;
    };
    analytics: {
      trackingId: string;
    };
  };
}

const config: Config = {
  api: {
    baseUrl: env.api.baseUrl,
  },
  auth: {
    enabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true',
    redirectUri: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  },
  features: {
    comments: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
    newsletter: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  services: {
    recaptcha: {
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    },
    analytics: {
      trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
    },
  },
};

export default config; 
