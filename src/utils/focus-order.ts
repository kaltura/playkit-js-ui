import style from '../styles/style.scss';

const FOCUS_GROUPS: string[] = [
  // only visible on small players, where it replaces the bottom-bar play/pause
  `.${style.centerPlaybackControls}`,
  `.${style.bottomBar} .${style.leftControls}`,
  `.${style.bottomBar} .${style.bottomBarArea}`,
  `.${style.bottomBar} .${style.rightControls}`,
  `.${style.interactiveArea}`,
  `.${style.topBar}`
];
const TABBABLE = 'a[href],area[href],button,input,select,textarea,iframe,[tabindex]';
// popups (menus, overlays) manage their own Tab handling
const POPUP = '[role="menu"],[role="dialog"],[role="alertdialog"]';

const isTabbable = (el: HTMLElement): boolean =>
  el.tabIndex >= 0 &&
  !(el as HTMLButtonElement).disabled &&
  el.getClientRects().length > 0 &&
  getComputedStyle(el).visibility !== 'hidden' &&
  !el.closest(`[inert],[aria-hidden="true"],${POPUP}`);

const getTabbables = (root: HTMLElement): HTMLElement[] => Array.from(root.querySelectorAll<HTMLElement>(TABBABLE)).filter(isTabbable);

const getOrdered = (root: HTMLElement, all: HTMLElement[]): HTMLElement[] => {
  const grouped: HTMLElement[] = [];
  FOCUS_GROUPS.forEach(selector => {
    const group = root.querySelector<HTMLElement>(selector);
    if (group) {
      all.forEach(el => group.contains(el) && !grouped.includes(el) && grouped.push(el));
    }
  });
  return [...grouped, ...all.filter(el => !grouped.includes(el))];
};

/**
 * Focuses the first tabbable element outside a region, following the same order Tab uses.
 * @param {HTMLElement} root - the gui area element
 * @param {Function} isInside - whether an element belongs to the region being skipped
 * @param {boolean} backwards - skip towards the previous element instead of the next
 * @param {boolean} customOrder - use FOCUS_GROUPS order instead of DOM order
 * @returns {void}
 */
export const focusBeyond = (root: HTMLElement, isInside: (el: HTMLElement) => boolean, backwards: boolean, customOrder: boolean): void => {
  const all = getTabbables(root);
  const list = customOrder ? getOrdered(root, all) : all;
  const first = list.findIndex(isInside);
  if (first === -1) return;
  let last = first;
  list.forEach((el, i) => isInside(el) && (last = i));
  const target = backwards
    ? list
        .slice(0, first)
        .reverse()
        .find(el => !isInside(el))
    : list.slice(last + 1).find(el => !isInside(el));
  target?.focus();
};

/**
 * Changes the Tab order inside the root to follow FOCUS_GROUPS order, without changing the DOM.
 * @param {HTMLElement} root - the gui area element
 * @returns {Function} - detach function
 */
export const attachFocusOrder = (root: HTMLElement): (() => void) => {
  let tabbingIn = false;
  let backwards = false;

  const onDocKeyDown = (e: KeyboardEvent): void => {
    tabbingIn = e.key === 'Tab' && !root.contains(document.activeElement);
    backwards = e.shiftKey;
  };

  const onDocFocusIn = (): void => {
    tabbingIn = false;
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab' || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const active = document.activeElement as HTMLElement;
    if (!active || active.closest(POPUP)) return;
    const all = getTabbables(root);
    const ordered = getOrdered(root, all);
    const idx = ordered.indexOf(active);
    if (idx === -1) return;
    const next = ordered[idx + (e.shiftKey ? -1 : 1)];
    if (next) {
      e.preventDefault();
      next.focus();
    } else {
      // no preventDefault: native Tab continues from the DOM edge and leaves the gui area
      (e.shiftKey ? all[0] : all[all.length - 1]).focus();
    }
  };

  const onFocusIn = (e: FocusEvent): void => {
    if (!tabbingIn || root.contains(e.relatedTarget as Node) || (e.target as HTMLElement).closest(POPUP)) return;
    tabbingIn = false;
    const ordered = getOrdered(root, getTabbables(root));
    const target = backwards ? ordered[ordered.length - 1] : ordered[0];
    if (target && target !== e.target) {
      target.focus();
    }
  };

  document.addEventListener('keydown', onDocKeyDown, true);
  document.addEventListener('focusin', onDocFocusIn);
  root.addEventListener('keydown', onKeyDown);
  root.addEventListener('focusin', onFocusIn);
  return () => {
    document.removeEventListener('keydown', onDocKeyDown, true);
    document.removeEventListener('focusin', onDocFocusIn);
    root.removeEventListener('keydown', onKeyDown);
    root.removeEventListener('focusin', onFocusIn);
  };
};
