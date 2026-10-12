const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Returns the url only if it resolves to an http/https url, otherwise undefined.
 * @param {*} url - the url to validate
 * @returns {string | undefined} - the original url if safe, otherwise undefined
 */
function sanitizeUrl(url: any): string | undefined {
  if (typeof url !== 'string') {
    return undefined;
  }
  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? url : undefined;
  } catch (e) {
    return undefined;
  }
}

export {sanitizeUrl};
