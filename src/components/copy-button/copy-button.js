//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Text, Localizer} from 'preact-i18n';
import {KeyMap} from 'utils/key-map';

/**
 * The default copy action indication timeout value
 * @type {number}
 * @const
 */
const TIMEOUT = 2000;

const COMPONENT_NAME = 'CopyButton';

/**
 * CopyButton component
 *
 * @class CopyButton
 * @example <CopyButton/>
 * @extends {Component}
 */
class CopyButton extends Component {
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
  render(props: any): ?React$Element<any> {
    let copyUrlClasses = [style.btnCopyUrl].join(' ');
    copyUrlClasses += this.state.copySuccess ? ' ' + style.copied : '';
    return (
      <Localizer>
        <a
          role="button"
          tabIndex="0"
          ref={el => {
            if (props.addAccessibleChild) {
              props.addAccessibleChild(el);
            }
          }}
          className={copyUrlClasses}
          onClick={() => this.copy()}
          onKeyDown={e => {
            if (e.keyCode === KeyMap.ENTER) {
              this.copy();
            }
          }}
          title={<Text id="copy.button" />}>
          <Icon type={IconType.Copy} />
          <Icon type={IconType.Check} />
        </a>
      </Localizer>
    );
  }
}

CopyButton.displayName = COMPONENT_NAME;
export {CopyButton};
