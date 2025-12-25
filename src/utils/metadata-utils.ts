/**
 * Utility function to handle string or array format for metadata fields
 * If the field is an array, it first tries to find an item with English language, otherwise it extracts the first item's value property
 * @param {string | Array<{value: string; language?: string}>} field - The field that can be string or array
 * @returns {string} - The extracted string value
 */
export const extractMetadataValue = (field: string | Array<{value: string; language?: string}> | undefined): string => {
  if (!field) {
    return '';
  }
  if (typeof field === 'string') {
    return field;
  }
  if (Array.isArray(field) && field.length > 0) {
    // prioritize item with 'en' language
    const englishItem = field.find(item => item.language?.toLowerCase() === 'en');
    if (englishItem?.value) {
      return englishItem.value;
    }
    // fallback to the first item with a value
    if (field[0].value) {
      return field[0].value;
    }
  }
  return '';
};
