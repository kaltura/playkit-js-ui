import {h, VNode} from 'preact';
import {createPortal} from 'preact/compat';
import {useRef, useState, useEffect} from 'preact/hooks';
import {connect} from 'react-redux';
import {withText, Text} from 'preact-i18n';

import {withPlayer} from '..';
import {withEventManager} from '../../event';

import styles from '../../styles/style.scss';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {EventManager} from '@playkit-js/playkit-js';

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
    isFullscreen: state.engine.fullscreen,
  };
}

function _ContextMenu({player, eventManager, copyDebugInfoLabel, isFullscreen}: ContextMenuProps): VNode {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const closeContextMenu = (): void => {
    eventManager!.unlisten(document, 'click', closeContextMenu);
    setIsVisible(false);
  }

  const handleContextMenu = (e: MouseEvent): void => {
    if (!ref.current || !(player as any).debugInfo || !document.getElementById(player.config.targetId)?.contains(e.target as Node)) return;
    if (isVisibleRef.current) {
      closeContextMenu();
      // use native context menu
      return;
    }

    e.preventDefault();

    const menuWidth = ref.current.offsetWidth;
    const menuHeight = ref.current.offsetHeight;

    let posX = e.pageX;
    let posY = e.pageY;

    if (posX + menuWidth > window.innerWidth) {
      posX = window.innerWidth - menuWidth;
    }
    if (posY + menuHeight > window.innerHeight) {
      posY = window.innerHeight - menuHeight;
    }

    ref.current.style.left = posX + 'px';
    ref.current.style.top = posY + 'px';
    eventManager!.listen(document, 'click', closeContextMenu);
    setIsVisible(true);
  }

  useEffect(() => {
    eventManager!.listen(document, 'contextmenu', handleContextMenu);
  }, []);

  function handleMenuClick(): void {
    const debugInfo = (player as any).debugInfo;
    const debugInfoString = JSON.stringify(debugInfo, null, 2);
    navigator.clipboard.writeText(debugInfoString);
  }

  const renderContextMenu = () => {
    return (
      <div ref={ref} className={[styles.contextMenu, isVisible ? '' : styles.hidden].join(' ')} role="menu">
        <div className={styles.contextMenuItem} onClick={handleMenuClick} role="menuitem">
          {copyDebugInfoLabel}
        </div>
      </div>
    );
  }

  return isFullscreen ? renderContextMenu() : createPortal(renderContextMenu(), document.body);
}

const ContextMenu = connect(mapStateToProps)(withText(translations)(withEventManager(withPlayer(_ContextMenu))));
ContextMenu.displayName = 'ContextMenu';

export {ContextMenu};
