//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerClientRect: state.shell.playerClientRect
});

export const TOOLTIP_SHOW_TIMEOUT: number = 250;
// notice the order represents the order of the alternative fallback
const ToolTipType = {
  Top: 'top',
  Bottom: 'bottom',
  TopRight: 'top-right',
  TopLeft: 'top-left',
  BottomRight: 'bottom-right',
  BottomLeft: 'bottom-left',
  Left: 'left',
  Right: 'right'
};

@connect(mapStateToProps)

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
class Tooltip extends Component {
  state: Object;
  _hoverTimeout: ?number;
  textElement: HTMLSpanElement;
  nonValidTypes: string[] = [];

  /**
   * default component props
   * @type {Object}
   * @memberof Tooltip
   */
  static defaultProps = {
    type: ToolTipType.Top,
    isMultiline: true,
    maxWidth: '240px'
  };

  /**
   * @constructor
   * @param {*} props props
   * @memberof Tooltip
   */
  constructor(props: Object) {
    super(props);
    this.setState({showTooltip: false, marginTop: 0, marginLeft: 0});
  }

  /**
   * gets the tooltip position based on component prop
   *
   * @returns {void}
   * @memberof Tooltip
   */
  setMargins() {
    const tooltipBoundingRect = this.textElement ? this.textElement.getBoundingClientRect() : null;
    switch (this.state.type) {
      case ToolTipType.Top:
        this.setState({marginLeft: tooltipBoundingRect ? -tooltipBoundingRect.width / 2 : 0, marginTop: 0});
        break;
      case ToolTipType.TopLeft:
        this.setState({marginLeft: tooltipBoundingRect ? -tooltipBoundingRect.width + 16 : 0, marginTop: 0});
        break;
      case ToolTipType.TopRight:
        this.setState({marginLeft: -16, marginTop: 0});
        break;
      case ToolTipType.Left:
        this.setState({marginTop: tooltipBoundingRect ? -tooltipBoundingRect.height / 2 : 0, marginLeft: 0});
        break;
      case ToolTipType.Right:
        this.setState({marginTop: tooltipBoundingRect ? -tooltipBoundingRect.height / 2 : 0, marginLeft: 0});
        break;
      case ToolTipType.Bottom:
        this.setState({marginLeft: tooltipBoundingRect ? -tooltipBoundingRect.width / 2 : 0, marginTop: 0});
        break;
      case ToolTipType.BottomRight:
        this.setState({marginLeft: -16, marginTop: 0});
        break;
      case ToolTipType.BottomLeft:
        this.setState({marginLeft: tooltipBoundingRect ? -tooltipBoundingRect.width + 16 : 0, marginTop: 0});
        break;
    }
  }

  /**
   * on mouse over handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseOver(): void {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this._hoverTimeout = setTimeout(() => {
      this.setState({showTooltip: true});
    }, TOOLTIP_SHOW_TIMEOUT);
  }

  /**
   * on mouse leave handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseLeave(): void {
    this.setState({showTooltip: false});
    clearTimeout(this._hoverTimeout);
    this._hoverTimeout = null;
  }

  /**
   * brings another tooltip type which hasn't been marked as invalid
   * @memberof Tooltip
   * @returns {string} tooltip type
   */
  getAlternateType(): string {
    for (const key in ToolTipType) {
      const toolTipType = ToolTipType[key];
      if (this.nonValidTypes.indexOf(toolTipType) === -1) {
        return toolTipType;
      }
    }
    return this.state.type;
  }

  /**
   * checks if the current tooltip type is within the player boundaries
   * @memberof Tooltip
   * @returns {string} is in boundaries
   */
  isToolTipInBoundaries(): boolean {
    const tooltipBoundingRect = this.textElement.getBoundingClientRect();
    const playerContainerRect = this.props.playerClientRect;
    const MARGIN = 10;

    return (
      tooltipBoundingRect.top > playerContainerRect.top + MARGIN &&
      tooltipBoundingRect.bottom < playerContainerRect.bottom - MARGIN &&
      tooltipBoundingRect.right < playerContainerRect.right - MARGIN &&
      tooltipBoundingRect.left > playerContainerRect.left + MARGIN
    );
  }

  /**
   * sets the requested type prop of the tooltip as a state cause it can change if is not valid
   * @memberof Tooltip
   * @returns {void}
   */
  componentWillMount(): void {
    this.setState({type: this.props.type});
  }

  /**
   * checks if after the render the tooltip is within boundaries of the player
   * if not it will try to set a new type which will be checked after the next render
   * @param {Object} prevProps - previous component props
   * @param {Object} prevState - previous component state
   * @memberof Tooltip
   * @returns {void}
   */
  componentDidUpdate(prevProps: Object, prevState: Object): void {
    if (this.state.showTooltip && !this.isToolTipInBoundaries()) {
      if (this.nonValidTypes.indexOf(this.state.type) === -1) {
        this.nonValidTypes.push(this.state.type);
      }
      const alternateType = this.getAlternateType();
      if (alternateType !== this.state.type) {
        this.setState({type: alternateType});
      }
    }
    if (prevProps.label !== this.props.label || prevState.type !== this.state.type) {
      this.setMargins();
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(props: any): React$Element<any> {
    const className = [style.tooltipLabel, style[`tooltip-${this.state.type}`]];
    this.state.showTooltip ? className.push(style.show) : className.push(style.hide);

    return (
      <div className={style.tooltip} onMouseOver={() => this.onMouseOver()} onMouseLeave={() => this.onMouseLeave()}>
        <span
          style={{marginLeft: this.state.marginLeft, marginTop: this.state.marginTop, maxWidth: props.isMultiline ? props.maxWidth : 'none'}}
          ref={el => {
            this.textElement = el;
          }}
          className={className.join(' ')}>
          {props.label}
        </span>
        {props.children}
      </div>
    );
  }
}

export {Tooltip, ToolTipType};
