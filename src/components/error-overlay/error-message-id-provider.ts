type ErrorDetails = {
  title: string,
  message: string
};

export const getErrorMessageIdByCategory = (errorCategory: number | undefined): ErrorDetails => {
  switch (errorCategory) {
    case 1:
      return {title: 'network_error_title', message: 'network_error_message'};
    case 2:
      return {title: 'text_error_title', message: 'text_error_message'};
    case 3:
      return {title: 'media_error_title', message: 'media_error_message'};
    case 4:
      return {title: 'manifest_error_title', message: 'manifest_error_message'};
    case 5:
      return {title: 'streaming_error_title', message: 'streaming_error_message'};
    case 6:
      return {title: 'media_unavailable_error_title', message: 'drm_error_message'};
    case 7:
      return {title: 'default_error_title', message: 'default_error_message'};
    case 9:
      return {title: 'default_error_title', message: 'default_error_message'};
    case 12:
      return {title: 'media_not_ready_error_title', message: 'media_not_ready_error_message'};
    case 13:
      return {title: 'geo_location_error_title', message: 'geo_location_error_message'};
    case 14:
      return {title: 'media_unavailable_error_title', message: 'media_unavailable_error_message'};
    default:
      return {title: 'default_error_title', message: 'default_error_message'};
  }
};
