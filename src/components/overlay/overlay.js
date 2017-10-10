//@flow
import { h, Component } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import { default as Icon, IconType } from '../icon';

@connect(null, bindActions(actions))
/**
 * Overlay component
 * @class Overlay
 * @example <Overlay
 *  type='share'
 *  onClose={() => this.closeShareOverlay()}
 * >
 *  ...
 * </Overlay>
 * @extends {Component}
 */
class Overlay extends Component {

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillMount(): void {
    this.props.addPlayerClass('kp-overlay-active');
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillUnmount(): void {
    this.props.removePlayerClass('kp-overlay-active');
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Overlay
   */
  render(props: any): React$Element<any> {
    var overlayClass = 'kp-overlay';
    if (props.type) overlayClass += ` kp-${props.type}-overlay`;
    if (props.open) overlayClass += ' kp-active'

    return (
      <div className={overlayClass} role='dialog'>
        <div className="kp-overlay-contents">
          { props.children }
        </div>
        <Localizer>
          <a onClick={() => props.onClose()} aria-label={<Text id='core.close' />} className='kp-close-overlay'><Icon type={IconType.Close} /></a>
        </Localizer>
      </div>
    )
  }
}

export default Overlay;
