import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {IconType} from '../icon';
import {Icon} from '../icon/icon';
import {Tooltip} from "../tooltip";
import {Text, Localizer} from 'preact-i18n';
import {KeyMap} from '../../utils';
import {Button, ButtonControl} from '../../components';

/**
 * The default copy action indication timeout value
 * @type {number}
 * @const
 */
const TIMEOUT = 2000;

const COMPONENT_NAME = 'CopyButton';

const ICON_COPY_PATH = [
  {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    d: 'M7 4C5.89543 4 5 4.89543 5 6V13C5 14.1046 5.89543 15 7 15H11C12.1046 15 13 14.1046 13 13V6C13 4.89543 12.1046 4 11 4H7ZM7 6H11V13H7V6Z'
  },
  {d: 'M15 11H16V18H12V17.2H10V18.1C10 19.2458 10.9971 20 12 20H16C17.0029 20 18 19.2458 18 18.1V10.9C18 9.75416 17.0029 9 16 9H15V11Z'}
];

/**
 * CopyButton component
 *
 * @class CopyButton
 * @example <CopyButton/>
 * @extends {Component}
 */
class CopyButton extends Component<any, any> {
  _timeoutId: number | null = null;
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: any = {
    // @ts-ignore - 'Copy' not seen in the area...
    icon: IconType.Copy
  };

  /**
   * Creates an instance of CopyButton.
   * @param {Object} props object
   * @memberof CopyButton
   */
  constructor(props: any) {
    super(props);
    this.setState({copySuccess: false});
  }

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof CopyButton
   */
  componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  /**
   * copy and update the state
   * @returns {void}
   * @memberof CopyButton
   */
  copy = () => {
    try {
      this.props.copy();
      this.setState({copySuccess: true});
      // @ts-ignore
      this._timeoutId = setTimeout(() => {
        this.setState({copySuccess: false});
      }, TIMEOUT);
    } catch (e) {
      this.setState({copySuccess: false});
    }
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - the keyboard event
   * @returns {void}
   * @memberof CopyButton
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.copy();
    }
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?CopyButton} - component element
   * @memberof CopyButton
   */
  render(props: any): VNode<any> {
    let copyUrlClasses = [style.btnCopyUrl, style.btnBorderless, style.onlyIcon].join(' ');
    copyUrlClasses += this.state.copySuccess ? ' ' + style.copied : '';
    return (
      <Localizer>
        <ButtonControl name={COMPONENT_NAME}>
          {/*@ts-expect-error - error TS2322: Type 'Element' is not assignable to type 'string'.*/}
          <Tooltip label={<Text id="copy.button" />}>
            <Button
              tabIndex="0"
              ref={el => {
                if (props.addAccessibleChild) {
                  props.addAccessibleChild(el);
                }
              }}
              className={copyUrlClasses}
              onClick={this.copy}
              onKeyDown={this.onKeyDown}>
              <Icon id="copy" color="#fff" path={ICON_COPY_PATH} width="24" height="24" viewBox="0 0 24 24" />
              <Icon type={IconType.Check} />
            </Button>
          </Tooltip>
        </ButtonControl>
      </Localizer>
    );
  }
}

CopyButton.displayName = COMPONENT_NAME;
export {CopyButton};
