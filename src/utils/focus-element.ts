/**
 * focus element
 *
 * @export
 * @param {HTMLElement} element - reference element
 * @param {number} delay - delay number default 100
 * @returns {void}
 */
export function focusElement(element: HTMLElement | null, delay: number = 100): void {
  const interval = setInterval(() => {
    if (element && getComputedStyle(element).visibility !== 'hidden') {
      element.focus();
      clearInterval(interval);
    }
  }, delay);
}
