/* eslint-disable require-jsdoc */
//@flow

import {h, Component} from 'preact';
import styles from '../../styles/style.scss';
// import {ShowMoreToggle} from './show-more-toggle';

// interface ExpandableTextProps {
//   text: string;
//   children?: ComponentChildren[];
//   lines: number;
// }

// interface ExpandableTextState {
//   isTextTrimmed: boolean;
//   isTextExpanded: boolean;
// }

const COMPONENT_NAME = 'ExpandableText';

class ExpandableText extends Component {
  _textRef: HTMLElement | null;
  _textContainerRef: HTMLElement | null;

  componentDidMount() {
    // TODO copy calculation from related
    let isTextTrimmed = false;
    if (this._textRef && this._textContainerRef) {
      //$FlowFixMe
      isTextTrimmed = this._textRef.getBoundingClientRect().width > this._textContainerRef.getBoundingClientRect().width;
    }

    this.setState({isTextExpanded: false, isTextTrimmed});
  }

  _updateIsExpanded() {
    this.setState({...this.state, isTextExpanded: !this.state.isTextExpanded});
  }

  render() {
    const {text} = this.props;
    if (!text) return undefined;

    const {isTextTrimmed, isTextExpanded} = this.state;

    if (!isTextTrimmed) {
      return (
        <div
          className={styles.contentText}
          ref={node => {
            this._textContainerRef = node;
          }}>
          <div className={styles.titleWrapper}>
            <div className={styles.text}>
              <span
                ref={node => {
                  this._textRef = node;
                }}>
                {text}
              </span>
            </div>
          </div>
        </div>
      );
    }

    const linesStyle = {'-webkit-line-clamp': this.props.lines};

    // TODO
    return (
      <div>
        {isTextExpanded ? (
          this.props.children
        ) : (
          <div className={styles.text} style={linesStyle}>
            {text}
          </div>
        )}
        <div className={styles.moreButtonText} onClick={this._updateIsExpanded.bind(this)}>
          {isTextExpanded ? 'Less' : 'More'}
        </div>
        {/* <ShowMoreToggle title={text} onClick={}></ShowMoreToggle> */}
      </div>
    );
  }
}

ExpandableText.displayName = COMPONENT_NAME;
export {ExpandableText};
