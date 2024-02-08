import {FakeEventTarget, FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event';

/**
 * A Factory class to create a resize observer for the player.
 */
class ResizeWatcher extends FakeEventTarget {
  private _observer!: ResizeObserver | IFrameObserver | null;
  private _el: HTMLElement | null | undefined;

  /**
   * Removes resize listeners.
   * @returns {void}
   */
  public destroy(): void {
    if (this._observer) {
      this._observer.disconnect();
    }
    this._observer = null;
    this._el = null;
  }

  /**
   * Start listening to a resize of the element.
   * @param {?HTMLElement} el - the element to listen to.
   * @returns {void}
   */
  public init(el?: HTMLElement): void {
    if (this._observer) {
      return;
    }
    this._el = el;
    ResizeObserver ? this._createNativeObserver() : this._createIframeObserver();
    if (this._el instanceof HTMLElement && this._observer) {
      (this._observer as ResizeObserver).observe(this._el);
    }
  }

  /**
   *
   * @returns {void}
   */
  private _createNativeObserver(): void {
    this._observer = new ResizeObserver(entries => {
      entries.forEach(() => {
        this._triggerResize();
      });
    });
  }

  /**
   *
   * @returns {void}
   */
  private _createIframeObserver(): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    this._observer = new IFrameObserver(this._triggerResize.bind(this));
  }

  /**
   *
   * @returns {void}
   */
  private _triggerResize(): void {
    this.dispatchEvent(new FakeEvent(EventType.RESIZE));
  }
}

const IFRAME_CLASS_NAME = 'playkit-size-iframe';

/**
 * This class mimics the API of the ResizeObserver API (currently available only in Chrome).
 * Creates an empty iFrame next to the player container, which gets the dimensions of it's parent and listens to
 * the iframes resize event.
 * @param {Function} callback - the function to be called when a resize event is detected.
 */
class IFrameObserver {
  private _observersStore: any = {};
  private readonly _onChangeCallback: Function;

  /**
   *
   * @param {Function} callback - on change callback
   */
  constructor(callback: Function) {
    this._onChangeCallback = callback;
  }

  /**
   * start detecting resize event
   * @param {HTMLElement} el - The element that is going to be resized.
   * @returns {void}
   */
  public observe(el: HTMLElement): void {
    const iframe = this._createIframe();
    const playerId = el.getAttribute('id')!;
    this._observersStore[playerId] = iframe;
    el.appendChild(iframe);
    iframe.contentWindow!.onresize = (): any => this._onChangeCallback();
  }

  /**
   * remove all resize listeners
   * @returns {void}
   */
  public disconnect(): void {
    for (const target in this._observersStore) {
      const el = document.getElementById(target);
      const iframe = this._observersStore[target];
      iframe.onresize = null;
      if (el) {
        el.removeChild(iframe);
        delete this._observersStore[el.getAttribute('id')!];
      }
    }
  }

  /**
   *
   * @returns {HTMLIFrameElement} - iframe
   */
  private _createIframe(): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.className = IFRAME_CLASS_NAME;
    return iframe;
  }
}

export {ResizeWatcher};
