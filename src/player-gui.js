//@flow
import { Component } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  state: {
    shell: state.shell,
    fullscreen: state.fullscreen
  }
});

@connect(mapStateToProps)
class PlayerGUI extends Component {

  getMatchedUI(uis: Array<any>, state: Object): any {
    let matchedUI;
    for (let ui of uis) {
      if (typeof ui.condition === 'undefined' || ui.condition(state)) {
        matchedUI = ui;
        break;
      }
    }
    return matchedUI;
  }

  render(props: any) {
    let uiToRender;

    if (this.props.uis.length > 0) {
      uiToRender = this.getMatchedUI(props.uis, props.state);
      return uiToRender ? uiToRender.template(props) : this.props.uis[0].template(props);
    }
    else { return undefined; }

  }
}

export default PlayerGUI;
