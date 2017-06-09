//@flow
import { h } from 'preact';
// import { connect } from 'preact-redux';
// import { bindActions } from '../../utils/bind-actions';
// import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import Icon from '../icon/icon';

// const mapStateToProps = state => ({
//   isPlaying: state.playPause.isPlaying
// });

// @connect(mapStateToProps, bindActions(actions))
class LanguageControl extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'LanguageControl', player: obj.player});
  }

  render() {
    return (
      <div className='control-button-container control-language'>
        <button className='control-button'>
          <Icon type='language' />
        </button>
      </div>
    )
  }
}

export default LanguageControl;
