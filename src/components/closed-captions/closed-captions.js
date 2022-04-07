//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {actions as engineActions} from '../../reducers/engine';
import {bindActions} from '../../utils/bind-actions';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';
/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  showCCButton: state.config.showCCButton
});

const COMPONENT_NAME = 'ClosedCaptions';

/**
 * ClosedCaptions component
 *
 * @class ClosedCaptions
 * @example <ClosedCaptions />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...engineActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  closedCaptionsOnText: 'controls.closedCaptionsOn',
  closedCaptionsOffText: 'controls.closedCaptionsOff'
})
class ClosedCaptions extends Component {
  /**
   * component will update
   * @param {Object} prevProps - the next props
   * @return {void}
   */
  componentDidMount() {
    this.setState({
      ccOn: false
    });
  }

  /**
   * component will update
   * @param {Object} prevProps - the next props
   * @return {void}
   */
  componentDidUpdate(prevProps: any) {
    const {textTracks: prevTextTracks} = prevProps;
    const {textTracks} = this.props;
    const prevActiveTextTrack = prevTextTracks.find(textTrack => textTrack.active);
    const activeTextTrack = textTracks.find(textTrack => textTrack.active);
    if (prevActiveTextTrack !== activeTextTrack) {
      this.setState({
        ccOn: activeTextTrack.language !== 'off'
      });
    }
  }
  /**
   * Vr-Stereo click handler§
   *
   * @returns {void}
   * @memberof ClosedCaptions
   */
  onClick = (): void => {
    this.props.notifyClick();
    if (this.state.ccOn) {
      this.props.player.hideTextTrack();
    } else {
      this.props.player.showTextTrack();
    }
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof ClosedCaptions
   */
  render(): React$Element<any> | void {
    return this.props.textTracks?.length && this.props.showCCButton ? (
      <ButtonControl name={COMPONENT_NAME}>
        <Tooltip label={this.state.ccOn ? this.props.closedCaptionsOnText : this.props.closedCaptionsOffText}>
          <Button
            tabIndex="0"
            aria-label={this.state.ccOn ? this.props.closedCaptionsOnText : this.props.closedCaptionsOffText}
            className={this.state.ccOn ? [style.controlButton, style.ccOn].join(' ') : style.controlButton}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}>
            <Icon type={IconType.ClosedCaptionsOn} />
            <Icon type={IconType.ClosedCaptionsOff} />
          </Button>
        </Tooltip>
      </ButtonControl>
    ) : undefined;
  }
}

ClosedCaptions.displayName = COMPONENT_NAME;
export {ClosedCaptions};
