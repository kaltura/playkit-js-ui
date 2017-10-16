//@flow
import style from './_slider.scss';
import { h, Component } from 'preact';

/**
 * Slider component
 *
 * @class Slider
 * @example <Slider onChange={value => this.onOpacityChange(value)} value={this.initialOpacity} min={0} max={100} />
 * @extends {Component}
 */
class Slider extends Component {
  state: Object;
  _sliderElement: HTMLElement;
  sliderWidth: number;

  /**
   * before component mounted, set initial state of the slider
   *
   * @returns {void}
   * @memberof Slider
   */
  componentWillMount() {
    this.setState({
      value: this.props.value || 0,
      min: this.props.min || 0,
      max: this.props.max || 100,
      dragging: false
    });

    document.addEventListener('mouseup', (e: Event) => this.mouseUpHandler(e));
    document.addEventListener('mousemove', (e: Event) => this.mouseMoveHandler(e));
  }

  /**
   * after component mounted, save the sliderWidth
   *
   * @returns {void}
   * @memberof Slider
   */
  componentDidMount() {
    this.sliderWidth = this._sliderElement.clientWidth;
  }

  /**
   * mousedown slider handler
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseDownHandler(e: any): void {
    if (!this.state.dragging) {
      this.setState({
        dragging: true,
        value: this.mouseEventToValue(e)
      });
      this.props.onChange(this.mouseEventToValue(e));
    }
  }

  /**
   * document mousemove handler if dragging active
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseMoveHandler(e: any): void {
    if (this.state.dragging) {
      this.setState({
        value: this.mouseEventToValue(e)
      });
      this.props.onChange(this.mouseEventToValue(e));
    }
  }

  /**
   * document mouseup handler if dragging active
   *
   * @param {*} e event
   * @returns {void}
   * @memberof Slider
   */
  mouseUpHandler(e: any): void {
    if (this.state.dragging) {
      this.setState({
        value: this.mouseEventToValue(e),
        dragging: false
      });
      this.props.onChange(this.mouseEventToValue(e));
    }
  }

  /**
   * get slider value based on mouse event
   *
   * @param {*} e event
   * @returns {number} slider value
   * @memberof Slider
   */
  mouseEventToValue(e: any): number {
    let offsetLeft = e.clientX - this._sliderElement.getBoundingClientRect().left;
    let offsetLeftPercentage = Math.round(offsetLeft / this._sliderElement.clientWidth * 100);

    if (this.getValueByPersentage(offsetLeftPercentage) < this.state.min) return this.state.min;
    if (this.getValueByPersentage(offsetLeftPercentage) > this.state.max) return this.state.max;

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
    return (this.state.max / 100 * persentage);
  }

  /**
   * get progress presentage by slider value
   *
   * @returns {number} presentage
   * @memberof Slider
   */
  getPersentageByValue(): number {
    return Math.round((this.state.value / this.state.max * 100));
  }

  /**
   * component render function
   *
   * @returns {React$Element<any>} component element
   * @memberof Slider
   */
  render(): React$Element<any> {
    return (
      <div
        ref={c => this._sliderElement=c}
        className={style.slider}
        onMouseDown={e => this.mouseDownHandler(e)}
      >
        <div
          className={style.progress}
          style={{width: this.getPersentageByValue() + '%'}}
        >
          <div
            className={style.handle}
            onMouseDown={e => this.mouseDownHandler(e)}
          />
        </div>
      </div>
    )
  }
}

export default Slider;
