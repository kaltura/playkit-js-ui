//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {default as Icon} from '../icon/index';
import {IconType} from '../icon/index';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  familyMode: state.engine.familyMode,
  config: Object.assign(
    {
      placement: 'bottom-left',
      timeout: 0
    },
    state.config.components.watermark
  )
});

@connect(mapStateToProps)
/**
 * Watermark component
 * @class Watermark
 * @example <Watermark player={this.player} />
 * @extends {BaseComponent}
 */
class Watermark extends BaseComponent {
  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'watermark';
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - whether to render the component
   * @static
   */
  static shouldRender(props: any): boolean {
    return true;
  }

  /**
   * Creates an instance of Watermark.
   * @param {Object} obj - object
   * @memberof Watermark
   */
  constructor(obj: Object) {
    super({name: 'Watermark', player: obj.player});
  }

  /**
   * Render component
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Watermark
   */
  render(props: any): ?React$Element<any> {
    const styleClass = [style.watermark];
    props.config.placement.split('-').forEach(side => {
      styleClass.push(style[side]);
    });
    if (!this.props.familyMode) {
      styleClass.push(style.hideWatermark);
    }
    return (
      <div className={styleClass.join(' ')}>
        <a href={props.config.url} target="_blank" rel="noopener noreferrer">
          <Icon type={IconType.FamilyModeOff} />
        </a>
      </div>
    );
  }
}

export {Watermark};
