import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';

const COMPONENT_NAME = 'Spinner';

/**
 * Spinner component
 *
 * @class Spinner
 * @example <Spinner />
 * @extends {Component}
 */
class Spinner extends Component<any, any> {
  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Spinner
   */
  render(): VNode<any> {
    return (
      <div className={style.spinner}>
        {Array(8)
          .fill(0)
          .map((val, i) => (
            <span key={i + 1} />
          ))}
      </div>
    );
  }
}

Spinner.displayName = COMPONENT_NAME;
export {Spinner};
