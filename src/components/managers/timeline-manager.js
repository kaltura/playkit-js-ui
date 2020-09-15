//@flow
import style from '../../styles/style.scss';
import {UIManager} from '../../ui-manager';
import {CuePoint} from 'components/cue-point';
import {actions as seekbarActions} from '../../reducers/seekbar';
import variables from '../../styles/_variables.scss';

class TimelineManager {
  _cuePointsRemoveMap: Object;
  _counter: number;

  constructor(uiManager: UIManager, store: any) {
    this._uiManager = uiManager;
    this._store = store;
    this._cuePointsRemoveMap = {};
    this._counter = 0;
  }

  addCuePoint(newCuePoint): {id: string} {
    if (this._store.getState().engine.isLive || typeof newCuePoint.time !== 'number') {
      return null;
    }
    const id = (this._counter++).toString();
    this._cuePointsRemoveMap[id] = this._uiManager.addComponent({
      presets: newCuePoint.presets || [this._store.getState().shell.activePresetName],
      area: 'SeekBar',
      get: CuePoint,
      props: {
        time: newCuePoint.time,
        marker: newCuePoint.marker || {},
        preview: newCuePoint.preview || {}
      }
    });
    return {id};
  }

  removeCuePoint(cuePoint) {
    const {id} = cuePoint;
    if (this._cuePointsRemoveMap.hasOwnProperty(id)) {
      this._cuePointsRemoveMap[id]();
    }
  }

  setSeekbarPreview(preview) {
    const presets = preview.presets || [this._store.getState().shell.activePresetName];
    const className = [];
    if (preview.className) {
      className.push(preview.className);
    }
    if (preview.sticky === false) {
      className.push(style.nonSticky);
    }
    const previewStyle = {
      width: `${preview.width || variables.framePreviewImgWidth}px`,
      height: `${preview.height || variables.framePreviewImgHeight}px`
    };
    const removePreview = this._uiManager.addComponent({
      presets,
      area: 'SeekBar',
      get: preview.get,
      props: {
        ...preview.props,
        style: preview.props ? {...previewStyle, ...preview.props.style} : previewStyle,
        className: className.join(' '),
        onMouseOver: () => {
          typeof preview.props.onMouseOver === 'function' && preview.props.onMouseOver();
          this._store.dispatch(seekbarActions.updateSeekbarPreviewHoverActive(true));
        },
        onMouseLeave: () => {
          typeof preview.props.onMouseLeave === 'function' && preview.props.onMouseLeave();
          this._store.dispatch(seekbarActions.updateSeekbarPreviewHoverActive(false));
        }
      },
      replaceComponent: 'SeekBarPreview'
    });
    this._store.dispatch(seekbarActions.updateHideTimeBubble(false));
    if (preview.hideTime) {
      this._store.dispatch(seekbarActions.updateHideTimeBubble(true));
    }
    return () => {
      removePreview();
      this._store.dispatch(seekbarActions.updateHideTimeBubble(false));
    };
  }

  destroy() {}
}

export {TimelineManager};
