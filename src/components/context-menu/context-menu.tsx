import {h, VNode} from 'preact';
import {createPortal} from 'preact/compat';
import {useRef, useState, useEffect} from 'preact/hooks';
import {connect} from 'react-redux';
import {withText, Text} from 'preact-i18n';

import {withPlayer} from '..';
import {withEventManager} from '../../event';

import styles from '../../styles/style.scss';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {Env, EventManager} from '@playkit-js/playkit-js';
import {ContextMenuUtils} from './context-menu-utils';

interface ContextMenuProps {
  player: KalturaPlayer;
  eventManager: EventManager;
  copyDebugInfoLabel: string;
  isFullscreen: boolean;
}

const translations = {
  copyDebugInfoLabel: <Text id="error.copt_debug_info">Copy debug info</Text>
};

function mapStateToProps(state): any {
  return {
    isFullscreen: state.engine.fullscreen
  };
}

function _ContextMenu({player, eventManager, copyDebugInfoLabel, isFullscreen}: ContextMenuProps): VNode {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    let touchStartTime: number | null = null;

    const hideContextMenu = (): void => {
      eventManager!.unlisten(document, 'click', hideContextMenu);
      setIsVisible(false);
    };

    const showContextMenu = (e: MouseEvent): void => {
      if (!ref.current || !(player as any).debugInfo || !document.getElementById(player.config.targetId)?.contains(e.target as Node)) return;
      if (isVisibleRef.current) {
        hideContextMenu();
        return;
      }

      e.preventDefault();

      const container = document.getElementById(player.config.targetId);
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const menuWidth = 130;
      const menuHeight = 20;

      const posX = containerRect.left + (containerRect.width - menuWidth) / 2;
      const posY = containerRect.top + (containerRect.height - menuHeight) / 2;

      ref.current.style.left = posX + 'px';
      ref.current.style.top = posY + 'px';
      eventManager!.listen(document, 'click', hideContextMenu);
      setIsVisible(true);
    };

    const handleTouchStart = () => {
      touchStartTime = Date.now();
    };

    const handleTouchEnd = e => {
      if (touchStartTime === null || (touchStartTime && Date.now() - touchStartTime < 500)) return;

      const touch = e.touches[0];

      showContextMenu({
        target: e.target,
        pageX: touch?.pageX,
        pageY: touch?.pageY,
        preventDefault: e.preventDefault.bind(e)
      } as any as MouseEvent);

      touchStartTime = null;
    };

    const clearTouch = () => {
      touchStartTime = null;
    };

    if (!Env.isMobile) {
      eventManager!.listen(document, 'contextmenu', showContextMenu);
      return;
    }

    eventManager!.listen(document, 'touchstart', handleTouchStart);
    eventManager!.listen(document, 'touchend', handleTouchEnd);
    eventManager!.listen(document, 'touchmove', clearTouch);
    eventManager!.listen(document, 'touchcancel', clearTouch);
  }, []);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const renderContextMenu = () => {
    return (
      <div ref={ref} className={[styles.contextMenu, isVisible ? '' : styles.hidden].join(' ')} role="menu">
        <div className={styles.contextMenuItem} onClick={() => ContextMenuUtils.copyDebugInfoToClipboard(player)} role="menuitem">
          {copyDebugInfoLabel}
        </div>
      </div>
    );
  };

  return isFullscreen ? renderContextMenu() : createPortal(renderContextMenu(), document.body);
}

const ContextMenu = connect(mapStateToProps)(withText(translations)(withEventManager(withPlayer(_ContextMenu))));
ContextMenu.displayName = 'ContextMenu';

export {ContextMenu};
