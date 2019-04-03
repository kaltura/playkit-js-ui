//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Text, Localizer} from 'preact-i18n';

/**
 * The default copy action indication timeout value
 * @type {number}
 * @const
 */
const TIMEOUT = 2000;

/**
 * CopyButton component
 *
 * @class CopyButton
 * @example <CopyButton/>
 * @extends {BaseComponent}
 */
class CopyButton extends BaseComponent {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: any = {
    icon: IconType.Copy
  };

  /**
   * Creates an instance of CopyButton.
   * @param {Object} props object
   * @memberof CopyButton
   */
  constructor(props: Object) {
    super(props);
    this.setState({copySuccess: false});
  }

  /**
   * copy and update the state
   * @returns {void}
   */
  copy() {
    try {
      this.props.copy();
      this.setState({copySuccess: true});
      setTimeout(() => {
        this.setState({copySuccess: false});
      }, TIMEOUT);
    } catch (e) {
      this.setState({copySuccess: false});
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?CopyButton} - component element
   * @memberof CopyButton
   */
  render(): ?React$Element<any> {
    let copyUrlClasses = [style.btnCopyUrl].join(' ');
    copyUrlClasses += this.state.copySuccess ? ' ' + style.copied : '';
    return (
      <Localizer>
        <a className={copyUrlClasses} onClick={() => this.copy()} title={<Text id="copy.button" />}>
          <Icon type={IconType.Copy} />
          <Icon type={IconType.Check} />
        </a>
      </Localizer>
    );
  }
}

export {CopyButton};
