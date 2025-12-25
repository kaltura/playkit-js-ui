/**
 * Utility function to handle string or array format for metadata fields
 * If the field is an array, it extracts the first item's value property
 * @param {string | Array<{value: string}>} field - The field that can be string or array
 * @returns {string} - The extracted string value
 */
export const extractMetadataValue = (field: string | Array<{value: string}> | undefined): string => {
  if (!field) {
    return '';
  }
  if (typeof field === 'string') {
    return field;
  }
  if (Array.isArray(field) && field.length > 0 && field[0].value) {
    return field[0].value;
  }
  return '';
};
