import {h, VNode} from 'preact';
import {useRef, useState, useEffect} from 'preact/hooks';
import {connect} from 'react-redux';

import {withPlayer} from '..';
import {withEventManager} from '../../event';

import styles from './_context-menu.scss';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {EventManager} from '@playkit-js/playkit-js';

interface ContextMenuProps {
  player: KalturaPlayer;
  eventManager: EventManager;
}

function mapStateToProps(state): any {
  return {
    isVisible: state.shell.contextMenuVisible
  };
}

function _ContextMenu({player, eventManager}: ContextMenuProps): VNode {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    eventManager!.listen(document, 'click', () => setIsVisible(false));
    eventManager!.listen(document, 'contextmenu', e => {
      if (!player.debugInfo || !document.getElementById(player.config.targetId)?.contains(e.target as Node)) return;

      if (isVisible) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
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
    });
  }, []);

  function handleMenuClick(): void {
    const debugInfo = player.debugInfo;
    const debugInfoString = JSON.stringify(debugInfo, null, 2);
    navigator.clipboard.writeText(debugInfoString);
  }

  return (
    <div ref={ref} className={[styles.contextMenu, isVisible ? '' : styles.hidden].join(' ')}>
      <div className={styles.contextMenuItem} onClick={handleMenuClick}>
        Copy debug info
      </div>
    </div>
  );
}

const ContextMenu = connect(mapStateToProps)(withEventManager(withPlayer(_ContextMenu)));
ContextMenu.displayName = 'ContextMenu';

export {ContextMenu};
