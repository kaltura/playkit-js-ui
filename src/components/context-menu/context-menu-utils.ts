import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../../event';

class ContextMenuUtils {
  public static copyDebugInfoToClipboard(player: KalturaPlayer): void {
    const debugInfo = (player as any).debugInfo;

    if (!debugInfo) {
      return;
    }

    const debugInfoString = JSON.stringify(debugInfo, null, 2);

    ContextMenuUtils.copyToClipboard(debugInfoString)
      .then(() => {
        player.dispatchEvent(new FakeEvent(EventType.USER_COPIED_DEBUG_INFO));
      })
      .catch(() => {
        ContextMenuUtils.copyToClipboardFallback(debugInfoString);
        player.dispatchEvent(new FakeEvent(EventType.USER_COPIED_DEBUG_INFO));
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
