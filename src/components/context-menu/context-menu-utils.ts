import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

class ContextMenuUtils {
  public static copyDebugInfoToClipboard(player: KalturaPlayer): void {
    const debugInfo = (player as any).debugInfo;

    if (!debugInfo) {
      return;
    }

    const debugInfoString = JSON.stringify(debugInfo, null, 2);

    ContextMenuUtils.copyToClipboard(debugInfoString).catch(() => {
      ContextMenuUtils.copyToClipboardFallback(debugInfoString);
    });
  }

  private static copyToClipboard(text: string): Promise<void> {
    try {
      return navigator.clipboard.writeText(text);
    } catch (e) {
      return Promise.reject();
    }
  }

  private static copyToClipboardFallback(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

export {ContextMenuUtils};
