import style from '../../styles/style.scss';
import {h, Component, VNode, RefObject, createRef} from 'preact';
import {Text, withText} from 'preact-i18n';

const COMPONENT_NAME = 'Spinner';

const translates = {
  loading: <Text id="spinner.loading">Loading</Text>
};

/**
 * Spinner component
 *
 * @class Spinner
 * @example <Spinner />
 * @extends {Component}
 */
@withText(translates)
class Spinner extends Component<any, any> {
  loadingSpan: RefObject<HTMLElement> = createRef<HTMLElement>();

  componentDidMount() {
    setTimeout(() => {
      if (this.loadingSpan.current) {
        this.loadingSpan.current.innerText = this.props.loading;
      }
    }, 1000);
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Spinner
   */
  render(): VNode<any> {
    return (
      <div>
        <div className={style.spinner}>
          {Array(8)
            .fill(0)
            .map((val, i) => (
              <span key={i + 1} />
            ))}
        </div>
        <span className={style.srOnly} aria-live="assertive" ref={this.loadingSpan}></span>
      </div>
    );
  }
}

Spinner.displayName = COMPONENT_NAME;
export {Spinner};
