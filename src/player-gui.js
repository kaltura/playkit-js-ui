//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  state: {
    shell: state.shell
  }
});



@connect(mapStateToProps)
class PlayerGUI extends Component {

  render(props: any) {
    let uiToRender;

    this.props.uis.forEach(ui => {
      if (ui.condition(props.state)) uiToRender = ui;
    });

    return uiToRender.template(props);
  }
}

export default PlayerGUI;
