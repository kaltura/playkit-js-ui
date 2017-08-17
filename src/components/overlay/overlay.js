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
 * @example `<Overlay type='share' onClose={() => this.closeShareOverlay()}>...</Overlay>`
 */
class Overlay extends Component {

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillMount(): void {
    this.props.addPlayerClass('overlay-active');
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillUnmount(): void {
    this.props.removePlayerClass('overlay-active');
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component
   * @memberof Overlay
   */
  render(props: any): Element {
    var overlayClass = 'overlay';
    if (props.type) overlayClass += ` ${props.type}-overlay`;
    if (props.open) overlayClass += ' active'

    return (
      <div className={overlayClass} role='dialog'>
        <div className="overlay-contents">
          { props.children }
        </div>
        <Localizer>
          <a onClick={() => props.onClose()} aria-label={<Text id='core.close' />} className='close-overlay'><Icon type={IconType.Close} /></a>
        </Localizer>
      </div>
    )
  }
}

export default Overlay;
