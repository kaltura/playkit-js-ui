//@flow
import { Component } from 'preact';
import { connect } from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  state: {
    shell: state.shell,
    engine: { adBreak: state.engine.adBreak }
  }
});

@connect(mapStateToProps)
/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
class PlayerGUI extends Component {
  /**
   * get the single matched UI to render based on the UIs and it's conditions
   *
   * @param {Array<any>} uis - UIs array with conditions
   * @param {Object} state - state to be used in the condition check
   * @returns {*} - matched UI
   * @memberof PlayerGUI
   */
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

  /**
   * render component based on the matched UI.
   * if no matched UI found, it will choose the first UI configured in the UI array
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof PlayerGUI
   */
  render(props: any): React$Element {
    let uiToRender;

    if (this.props.uis.length > 0) {
      uiToRender = this.getMatchedUI(props.uis, props.state);
      return uiToRender ? uiToRender.template(props) : this.props.uis[0].template(props);
    }
    else { return undefined; }

  }
}

export default PlayerGUI;
