//@flow
import {UIManager} from '../../ui-manager';
import {CuePoint} from 'components/cue-point';
import {Component} from 'preact';
import {actions as seekbarActions} from '../../reducers/seekbar';

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
    const component = {
      presets: newCuePoint.presets || [this._store.getState().shell.activePresetName],
      area: 'SeekBar',
      get: CuePoint,
      props: {
        time: newCuePoint.time,
        marker: newCuePoint.marker || {},
        preview: newCuePoint.preview || {}
      }
    };
    this._cuePointsRemoveMap[id] = this._uiManager.addComponent(component);
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
    const component = {
      presets,
      area: 'SeekBar',
      get: preview.get,
      props: {
        style: {width: `${preview.width || 160}px`, height: `${preview.height || 90}px`}
      },
      replaceComponent: 'SeekBarPreview'
    };
    if (preview.className) {
      component.props.className = preview.className;
    }
    const removePreview = this._uiManager.addComponent(component);
    if (preview.displayTime === false) {
      this._store.dispatch(seekbarActions.updateHideTimeBubble(true));
    }
    return () => {
      removePreview();
      this._store.dispatch(seekbarActions.updateHideTimeBubble(false));
    };
  }
}

export {TimelineManager};
