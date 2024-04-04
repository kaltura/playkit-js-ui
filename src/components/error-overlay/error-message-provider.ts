type ErrorDetails = {
  title: string;
  message: string;
};

export const errorsMap: Map<number, ErrorDetails> = new Map<number, ErrorDetails>([
    [1, {title: 'network_error_title', message: 'network_error_message'}],
    [2, {title: 'text_error_title', message: 'text_error_message'}],
    [3, {title: 'media_error_title', message: 'media_error_message'}],
    [4, {title: 'manifest_error_title', message: 'manifest_error_message'}],
    [5, {title: 'streaming_error_title', message: 'streaming_error_message'}],
    [6, {title: 'media_unavailable_error_title', message: 'drm_error_message'}],
    [7, {title: 'default_error_title', message: 'default_error_message'}],
    [9, {title: 'default_error_title', message: 'default_error_message'}],
    [12, {title: 'media_not_ready_error_title', message: 'media_not_ready_error_message'}],
    [13, {title: 'geo_location_error_title', message: 'geo_location_error_message'}],
    [14, {title: 'media_unavailable_error_title', message: 'media_unavailable_error_message'}],
]);

export const getDefaultError = (): ErrorDetails => {
  return {title: 'default_error_title', message: 'default_error_message'};
};
