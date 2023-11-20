import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {KeyMap} from '../../utils';

const KEYBOARD_DRAG_STEP = 5;

const COMPONENT_NAME = 'Slider';

/**
 * Slider component
 *
 * @class Slider
 * @example <Slider onChange={value => this.onOpacityChange(value)} value={this.initialOpacity} min={0} max={100} />
 * @extends {Component}
 */
class Slider extends Component<any, any> {
  sliderWidth!: number;
  _sliderElement!: HTMLElement;
  _sliderElementOffsetLeft!: number;

  /**
   * before component mounted, set initial state of the slider
   *
   * @returns {void}
   * @memberof Slider
   */
  componentWillMount(): void {
    this.setState({
      value: this.props.value || 0,
      min: this.props.min || 0,
      max: this.props.max || 100,
      dragging: false
    });

    document.addEventListener('mouseup', this.mouseUpHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('touchend', this.mouseUpHandler);
    document.addEventListener('touchmove', this.mouseMoveHandler);
  }

  /**
   * before component unmounted, remove event listeners
   *
   * @returns {void}
   * @memberof Slider
   */
  componentWillUnmount(): void {
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('touchend', this.mouseUpHandler);
    document.removeEventListener('touchmove', this.mouseMoveHandler);
  }

  /**
   * after component mounted, save the sliderWidth
   *
   * @returns {void}
   * @memberof Slider
   */
  componentDidMount() {
    this.sliderWidth = this._sliderElement.clientWidth;
    this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
  }

  /**
   * mousedown slider handler
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseDownHandler = (e: any): void => {
    this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
    if (!this.state.dragging) {
      this.setState(
        prevState => {
          return {
            dragging: true,
            value: this.mouseEventToValue(e, prevState)
          };
        },
        () => {
          this.props.onChange(this.mouseEventToValue(e, this.state));
        }
      );
    }
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Slider
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.LEFT || e.keyCode === KeyMap.RIGHT) {
      this.onKeyboardDragging(e);
    }
  };

  /**
   * key down handler if dragging via keyboard
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Slider
   */
  onKeyboardDragging(e: KeyboardEvent): void {
    e.stopPropagation();
    this._sliderElementOffsetLeft = this._sliderElement.getBoundingClientRect().left;
    let newValue = this.props.value;
    switch (e.keyCode) {
      case KeyMap.RIGHT: {
        newValue += KEYBOARD_DRAG_STEP;
        if (newValue > this.state.max) {
          newValue = this.state.max;
        }
        break;
      }
      case KeyMap.LEFT: {
        newValue -= KEYBOARD_DRAG_STEP;
        if (newValue < this.state.min) {
          newValue = this.state.min;
        }
        break;
      }
    }
    this.setState(
      {
        value: newValue,
        dragging: false
      },
      () => {
        this.props.onChange(newValue);
      }
    );
  }

  /**
   * document mousemove handler if dragging active
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseMoveHandler = (e: any): void => {
    if (this.state.dragging) {
      this.setState(
        prevState => {
          return {
            value: this.mouseEventToValue(e, prevState)
          };
        },
        () => {
          this.props.onChange(this.mouseEventToValue(e, this.state));
        }
      );
    }
  };

  /**
   * document mouseup handler if dragging active
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseUpHandler = (e: any): void => {
    if (this.state.dragging) {
      this.setState(
        prevState => {
          return {
            value: this.mouseEventToValue(e, prevState),
            dragging: false
          };
        },
        () => {
          this.props.onChange(this.mouseEventToValue(e, this.state));
        }
      );
    }
  };

  /**
   * get slider value based on mouse event
   *
   * @param {*} e event
   * @param {Object} state - current component state
   * @returns {number} slider value
   * @memberof Slider
   */
  mouseEventToValue(e: any, state: any): number {
    let clientX;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if (e.changedTouches) {
      clientX = e.changedTouches[0].pageX;
    } else {
      clientX = e.clientX;
    }

    let offsetLeft = clientX - this._sliderElement.getBoundingClientRect().left;
    let offsetLeftPercentage = Math.round((offsetLeft / this._sliderElement.clientWidth) * 100);

    if (this.getValueByPersentage(offsetLeftPercentage) < state.min) return state.min;
    if (this.getValueByPersentage(offsetLeftPercentage) > state.max) return state.max;

    return this.getValueByPersentage(offsetLeftPercentage);
  }

  /**
   * get slider value based on persentage value
   *
   * @param {any} persentage progress persentage of slider
   * @returns {number} slider value
   * @memberof Slider
   */
  getValueByPersentage(persentage: number): number {
    return (this.state.max / 100) * persentage;
  }

  /**
   * get progress percentage by slider value
   *
   * @returns {number} percentage
   * @memberof Slider
   */
  getPercentageByValue(): number {
    return Math.round((this.state.value / this.state.max) * 100);
  }

  /**
   * component render function
   * @param {*} props - component props
   * @returns {React$Element<any>} component element
   * @memberof Slider
   */
  render(props: any): VNode<any> {
    return (
      <div
        role="slider"
        aria-valuemin={this.state.min}
        aria-valuenow={this.state.value}
        aria-valuemax={this.state.max}
        aria-labelledby={props.name}
        tabIndex={0}
        ref={c => {
          if (c) {
            this._sliderElement = c;
            if (props.pushRef) {
              props.pushRef(c);
            }
          }
        }}
        className={style.slider}
        onMouseDown={this.mouseDownHandler}
        onTouchStart={this.mouseDownHandler}
        onKeyDown={this.onKeyDown}>
        <div className={style.progress} style={{width: this.getPercentageByValue() + '%'}}>
          <div className={style.handle} onMouseDown={this.mouseDownHandler} onTouchStart={this.mouseDownHandler} />
        </div>
      </div>
    );
  }
}

Slider.displayName = COMPONENT_NAME;
export {Slider};
