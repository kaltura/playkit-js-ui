//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  url: state.engine.adUrl
});

@connect(mapStateToProps)
class AdLearnMore extends Component {
  render(props: any) {
    return <a href={props.url} target='new' className='btn btn-dark-transparent'>Learn more</a>
  }
}

export default AdLearnMore;
