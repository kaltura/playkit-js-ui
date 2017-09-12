//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Portal from 'preact-portal';
import Overlay from '../overlay';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps)
/**
 * SmartContainer component
 *
 * @class SmartContainer
 * @example <SmartContainer title='Language' onClose={() => this.controlButtonClickHandler()}>
 *   <SmartContainerItem
 *     icon={IconType.Audio}
 *     label='Audio'
 *     options={audioTrackOptions}
 *     onSelect={audioTrack => this.audioTrackChangeHandler(audioTrack)}
 *   />
 *   ...
 * </SmartContainer>
 * @extends {Component}
 */
class SmartContainer extends Component {

  /**
   * if mobile detected, smart container representation is an overlay. hence, render overlay with its children.
   * otherwise, render smart container
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): React$Element<any> {
    return props.isMobile ? (
      <Portal into="#overlay-portal">
        <Overlay open onClose={() => props.onClose()}>
          <div className='title'>{props.title}</div>
          {props.children}
        </Overlay>
      </Portal>
    ) : (
      <div className='smart-container top left'>
        {props.children}
      </div>
    )
  }
}

export default SmartContainer;
