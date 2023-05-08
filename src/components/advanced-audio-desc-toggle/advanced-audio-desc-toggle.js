//@flow
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from 'utils';
import {actions} from 'reducers/settings';
import {SmartContainerItem} from 'components';
import {IconType} from '../icon';
import {withEventDispatcher} from 'components/event-dispatcher';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isAdvancedAudioDescChecked: state.settings.advancedAudioDesc
});

const COMPONENT_NAME = 'AdvancedAudioDescToggle';

/**
 * AdvancedAudioDescToggle component
 *
 * @class AdvancedAudioDescToggle
 * @example <AdvancedAudioDescToggle />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withEventDispatcher(COMPONENT_NAME)
@withText({
  advancedAudioText: 'settings.advancedAudioDescription'
})
class AdvancedAudioDescToggle extends Component {
  /**
   * Toggle the Advanced Audio Description option and update it in the store state
   *
   * @param {boolean} isChecked - Whether the feature is enabled or not
   * @returns {void}
   * @memberof AdvancedAudioDescToggle
   */
  onAdvancedAudioClick = (isChecked: boolean): void => {
    this.props.updateAdvancedAudioDesc(isChecked);
    this.props.notifyClick({type: 'AdvancedAudioDescription', checked: isChecked});
  };

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof AdvancedAudioDescToggle
   */
  render(props: any): React$Element<any> | void {
    return (
      <SmartContainerItem
        pushRef={el => {
          props.pushRef(el);
        }}
        icon={IconType.AdvancedAudioDescription}
        label={props.advancedAudioText}
        isChecked={props.isAdvancedAudioDescChecked}
        onMenuChosen={this.onAdvancedAudioClick}
      />
    );
  }
}

AdvancedAudioDescToggle.displayName = COMPONENT_NAME;
export {AdvancedAudioDescToggle};
