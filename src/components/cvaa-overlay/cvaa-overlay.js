//@flow
import style from '../../styles/style.scss';
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import {actions as cvaaActions } from '../../reducers/cvaa';
import { actions as shellActions } from '../../reducers/shell';
import BaseComponent from '../base';
import Overlay from '../overlay';
import DropDown from '../dropdown';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  open: state.cvaa.overlayOpen,
  style: state.cvaa.style
});

const cvaaOverlayState = {
  Main: 'main',
  CustomCaptions: 'custom-captions'
}

type CvaaOverlayStateType = "main" | "custom-captions";

@connect(mapStateToProps, bindActions({...cvaaActions, ...shellActions}))
/**
 * CVAAOverlay component
 *
 * @class CVAAOverlay
 * @extends {BaseComponent}
 */
class CVAAOverlay extends BaseComponent {
  /**
   * Creates an instance of CVAAOverlay.
   * @memberof CVAAOverlay
   */
  constructor() {
    super({name: 'CVAAOverlay'});
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  componentWillUnmount() {
    this.setState({
      state: cvaaOverlayState.Main
    });
  }

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof CVAAOverlay
   */
  componentWillMount() {
    this.setState({
      state: cvaaOverlayState.Main
    });
  }

  /**
   * changing the overlay state
   *
   * @param {CvaaOverlayStateType} stateName - the new state name
   * @returns {void}
   * @memberof CVAAOverlay
   */
  transitionToState(stateName: CvaaOverlayStateType): void {
    this.setState({state: stateName});
  }

  /**
   * changing the captions style
   *
   * @param {string} style - style name
   * @returns {void}
   * @memberof CVAAOverlay
   */
  changeCaptionsStyle(style: string): void {
    this.props.updateCaptionsStyle(style);
    this.props.onClose();
  }

  /**
   * render main state
   *
   * @returns {React$Element} - main state element
   * @memberof CVAAOverlay
   */
  renderMainState(): React$Element<any> {
    return (
      <div className={this.state.state === cvaaOverlayState.Main ? [style.overlayScreen, style.active].join(' ') : style.overlayScreen}>
        <div className={style.title}>
          Advanced captions settings
        </div>
        <div>
          <div className={style.sample} onClick={() => this.changeCaptionsStyle(style.default)}>Sample</div>
          <div className={[style.sample, style.blackBg].join(' ')} onClick={() => this.changeCaptionsStyle(style.blackBg)}>Sample</div>
          <div className={[style.sample, style.yellowText].join(' ')} onClick={() => this.changeCaptionsStyle(style.yellowText)}>Sample</div>
        </div>
        <a className={style.buttonSaveCvaa} onClick={() => this.transitionToState(cvaaOverlayState.CustomCaptions)}>Set custom caption</a>
      </div>
    )
  }

  /**
   * render custom captions state
   *
   * @returns {React$Element} - custom captions elements
   * @memberof CVAAOverlay
   */
  renderCustomCaptionsState(): React$Element<any> {
    var speedOptions = [
      { value: 1, label: 'Auto (360)', active: true },
      { value: 2, label: '240' },
      { value: 3, label: '144' }
    ];

    return (
      <div className={this.state.state === cvaaOverlayState.CustomCaptions ? [style.overlayScreen, style.active].join(' ') : style.overlayScreen}>
        <form className={[style.form, style.customCaptionForm].join(' ')}>
          <div className={style.formGroupRow}>
            <label>Size</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Font color</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Font opacity</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Font family</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Font style</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Background color</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <label>Background opacity</label>
            <DropDown options={speedOptions} />
          </div>
          <div className={style.formGroupRow}>
            <a className={[style.btn, style.btnBranded, style.btnBlock].join(' ')}>Apply</a>
          </div>
        </form>
      </div>
    )
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof CVAAOverlay
   */
  render(props: any): React$Element<any> {
    return (
      <Overlay open onClose={() => props.onClose()} type='cvaa'>
        {this.renderMainState()}
        {this.renderCustomCaptionsState()}
      </Overlay>
    )
  }
}

export default CVAAOverlay;
