//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';

const COMPONENT_NAME = 'Spinner';

/**
 * Spinner component
 *
 * @class Spinner
 * @example <Spinner />
 * @extends {Component}
 */
class Spinner extends Component {
  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Spinner
   */
  render(): React$Element<any> {
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
