//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import {actions as engineActions} from '../../reducers/engine';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  familyMode: state.engine.familyMode
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, engineActions))
)
/**
 * FamilyMode component
 *
 * @class FamilyMode
 * @extends {BaseComponent}
 */
class FamilyMode extends BaseComponent {
  /**
   * Creates an instance of FamilyMode.
   * @param {Object} obj - the object passed when created
   * @memberof FamilyMode
   */
  constructor(obj: Object) {
    super({name: 'FamilyMode', player: obj.player});
  }

  /**
   * On PIP icon clicked
   * @returns {void}
   * @private
   */
  _onClick(): void {
    this.props.updateFamilyMode(!this.props.familyMode);
    if (this.props.familyMode) {
      this.props.removePlayerClass(style.familyMode);
    } else {
      this.props.addPlayerClass(style.familyMode);
    }
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof RewindControl
   */
  render(): React$Element<any> | void {
    return (
      <div className={[style.controlButtonContainer, style.controlFamily].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={'controls.FamilyMode'} />}
            className={this.props.familyMode ? [style.controlButton, style.familyMode].join(' ') : style.controlButton}
            onClick={() => this._onClick()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this._onClick();
              }
            }}>
            <Icon type={IconType.FamilyModeOff} />
            <Icon type={IconType.FamilyModeOn} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {FamilyMode};
