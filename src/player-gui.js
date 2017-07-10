//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  state: {
    shell: state.shell,
    fullscreen: state.fullscreen
  }
});

@connect(mapStateToProps)
class PlayerGUI extends Component {

  render(props: any) {
    let uiToRender;

    if (this.props.uis.length > 0) {
      for (let ui of this.props.uis) {
        if (ui.condition(props.state)) {
          uiToRender = ui;
          break;
        };
      }
    }

    return uiToRender.template(props);
  }
}

export default PlayerGUI;
