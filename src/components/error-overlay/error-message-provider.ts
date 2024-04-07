type ErrorDetails = {
  title: string;
  message: string;
};

const errorsMap: Map<number, ErrorDetails> = new Map<number, ErrorDetails>([
  /** NETWORK */
  [1, {title: 'network_error_title', message: 'network_error_message'}],
  /** TEXT */
  [2, {title: 'text_error_title', message: 'text_error_message'}],
  /** MEDIA */
  [3, {title: 'media_error_title', message: 'media_error_message'}],
  /** MANIFEST */
  [4, {title: 'manifest_error_title', message: 'manifest_error_message'}],
  /** STREAMING */
  [5, {title: 'streaming_error_title', message: 'streaming_error_message'}],
  /** DRM */
  [6, {title: 'media_unavailable_error_title', message: 'drm_error_message'}],
  /** PLAYER */
  [7, {title: 'default_error_title', message: 'default_error_message'}],
  /** ADS */
  [8, {title: 'default_error_title', message: 'default_error_message'}],
  /** STORAGE */
  [9, {title: 'default_error_title', message: 'default_error_message'}],
  /** MEDIA NOT READY */
  [12, {title: 'media_not_ready_error_title', message: 'media_not_ready_error_message'}],
  /** GEOLOCATION */
  [13, {title: 'geo_location_error_title', message: 'geo_location_error_message'}],
  /** KS RESTRICTION */
  [14, {title: 'media_unavailable_error_title', message: 'media_unavailable_error_message'}]
]);

const defaultError: ErrorDetails = {
  title: 'default_error_title',
  message: 'default_error_message'
};

export const getErrorDetailsByCategory = (errorCategory: number): ErrorDetails => {
  return errorsMap.get(errorCategory) || defaultError;
};
