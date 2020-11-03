//@flow
import style from '../../styles/style.scss';
import {UIManager} from '../../ui-manager';
import {CuePoint} from 'components/cue-point';
import {actions as seekbarActions} from '../../reducers/seekbar';
import getLogger from '../../utils/logger';
import {h} from 'preact';

/**
 * @class TimelineManager
 */
class TimelineManager {
  static _logger: any;
  _uiManager: UIManager;
  _store: any;
  _cuePointsRemoveMap: Object;
  _counter: number;

  /**
   * @constructor
   * @param {UIManager} uiManager - The UI manager.
   * @param {any} store - The store.
   */
  constructor(uiManager: UIManager, store: any) {
    TimelineManager._logger = getLogger('TimelineManager');
    this._uiManager = uiManager;
    this._store = store;
    this._cuePointsRemoveMap = {};
    this._counter = 0;
  }

  /**
   * @param {CuePointOptionsObject} newCuePoint - The cue point options
   * @return {null|{id: string}} - An object contains the cue point id
   */
  addCuePoint(newCuePoint: CuePointOptionsObject = {}): {id: string} | null {
    if (this._store.getState().engine.isLive) {
      TimelineManager._logger.warn('Impossible to add cue points while LIVE playback');
      return null;
    }
    if (typeof newCuePoint.time !== 'number') {
      TimelineManager._logger.warn('Cue point time is missing');
      return null;
    }
    const id = (this._counter++).toString();
    this._cuePointsRemoveMap[id] = this._uiManager.addComponent({
      label: `Cue Point - ${id}`,
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

  /**
   * @param {{id: string}} cuePoint - An object contains the cue point id
   * @returns {void}
   */
  removeCuePoint(cuePoint: {id: string}): void {
    const {id} = cuePoint;
    if (this._cuePointsRemoveMap.hasOwnProperty(id)) {
      this._cuePointsRemoveMap[id]();
    }
  }

  /**
   * @param {SeekbarPreviewOptionsObject} preview - The seekbar preview options
   * @return {Function} - Removal function
   */
  setSeekbarPreview(preview: SeekbarPreviewOptionsObject = {}): Function {
    const presets = preview.presets || [this._store.getState().shell.activePresetName];
    const previewStyle = {
      width: `${preview.width || style.framePreviewImgWidth}px`,
      height: `${preview.height || style.framePreviewImgHeight}px`
    };
    const removePreview = this._uiManager.addComponent({
      label: 'SeekBar Preview',
      presets,
      area: 'SeekBar',
      // eslint-disable-next-line react/display-name
      get: props => {
        const previewProps: Object = {
          ...preview.props,
          className: preview.className,
          style: preview.props ? {...previewStyle, ...preview.props.style} : previewStyle
        };
        typeof preview.get !== 'string' && (previewProps.defaultPreviewProps = props.replacedComponentProps);
        return (
          <div
            className={preview.sticky === false ? style.nonSticky : undefined}
            onMouseOver={() => {
              this._store.dispatch(seekbarActions.updateSeekbarPreviewHoverActive(true));
            }}
            onMouseLeave={() => {
              this._store.dispatch(seekbarActions.updateSeekbarPreviewHoverActive(false));
            }}>
            {h(preview.get, previewProps)}
          </div>
        );
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

  /**
   * @returns {void}
   */
  reset() {
    this._removeAllCuePoints();
  }

  /**
   * @returns {void}
   */
  destroy() {
    this._removeAllCuePoints();
  }

  /**
   * @returns {void}
   */
  _removeAllCuePoints() {
    Object.values(this._cuePointsRemoveMap).forEach(func => func());
  }
}

export {TimelineManager};
