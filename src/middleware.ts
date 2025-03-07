import { defineMiddleware } from 'astro/middleware';
import { defaultLang, languages } from './i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // If accessing the root path, redirect to the default language
  if (pathname === '/') {
    return redirect(`/${defaultLang}/`);
  }

  // Get the first part of the URL path (potential language code)
  const firstPathSegment = pathname.split('/')[1];

  // If the first segment is not a supported language code, redirect to default language
  if (!languages.includes(firstPathSegment)) {
    return redirect(`/${defaultLang}${pathname}`);
  }

  // Continue to the next middleware or route handler
  return next();
});