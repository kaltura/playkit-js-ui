//@flow
import style from '../../styles/style.scss';
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
    this.props.addPlayerClass(style.overlayActive);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Overlay
   */
  componentWillUnmount(): void {
    this.props.removePlayerClass(style.overlayActive);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Overlay
   */
  render(props: any): React$Element<any> {
    var overlayClass = [style.overlay];
    if (props.type) overlayClass.push(style[props.type + '-overlay']);
    if (props.open) overlayClass.push(style.active);

    return (
      <div className={overlayClass.join(' ')} role='dialog'>
        <div className={style.overlayContents}>
          { props.children }
        </div>
        <Localizer>
          <a onClick={() => props.onClose()} aria-label={<Text id='core.close' />} className={style.closeOverlay}><Icon type={IconType.Close} /></a>
        </Localizer>
      </div>
    )
  }
}

export default Overlay;
