import {Component, h, Fragment} from 'preact';
import {withText} from 'preact-i18n';
import style from '../../styles/style.scss';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {TimeDisplay} from '../time-display';
import {MediaInfoConfig, MediaInfoDetailsMode, MediaInfoPosition} from '../../types';
import {getComponentStateFromConfig} from '../../utils/component-config';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {any} - mapped state to this component
 */
const mapStateToProps = (state: any): any => ({
  prePlayback: state.engine.prePlayback,
  loading: state.loading.show,
  duration: state.engine.duration,
  config: state.config.components.mediaInfo
});

const COMPONENT_NAME = 'MediaInfoDisplay';

interface MediaInfoDisplayProps {
  prePlayback: boolean;
  loading: boolean;
  duration: number;
  config: MediaInfoConfig;
  player: any;
  seeMoreText?: string;
  seeLessText?: string;
}

/**
 * MediaInfoDisplay component
 * Shows media information (title, description, duration) before playback
 *
 * @class MediaInfoDisplay
 * @example <MediaInfoDisplay />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
class MediaInfoDisplay extends Component<MediaInfoDisplayProps, any> {
  public static defaultConfig: MediaInfoConfig = {
    showDuration: true,
    detailsMode: MediaInfoDetailsMode.None,
    position: MediaInfoPosition.Bottom
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isDescriptionExpanded: false
    };
  }

  /**
   * Reset description expansion when component updates with new metadata
   */
  public componentDidUpdate(prevProps: any): void {
    const prevDescription = prevProps.player?.sources?.metadata?.description;
    const currentDescription = this.props.player?.sources?.metadata?.description;

    if (prevDescription !== currentDescription) {
      this.setState({isDescriptionExpanded: false});
    }
  }

  /**
   * Toggle description expansion
   */
  private toggleDescription = (): void => {
    this.setState({isDescriptionExpanded: !this.state.isDescriptionExpanded});
  };

  /**
   * component default config
   * @returns {MediaInfoConfig}
   * @static
   */
  public static mergeConfig(config: any = {}): MediaInfoConfig {
    return getComponentStateFromConfig(COMPONENT_NAME, MediaInfoDisplay.defaultConfig, {config});
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {any | null} - component element
   * @memberof MediaInfoDisplay
   */
  public render(props: any): any {
    if (!(props.prePlayback) || props.loading) {
      return null;
    }

    const config = {
      ...MediaInfoDisplay.defaultConfig,
      ...props.config
    };

    const {player} = props;
    const metadata = player.sources?.metadata;

    // try to get duration from props or from player sources
    const duration = props.duration || player.sources?.duration || 0;

    if (!metadata && !config.showDuration) {
      return null;
    }

    const shouldShowDetails = config.detailsMode !== MediaInfoDetailsMode.None && metadata;
    const shouldShowDuration = config.showDuration && duration > 0;

    if (!shouldShowDetails && !shouldShowDuration) {
      return null;
    }

    const positionClass = config.position === MediaInfoPosition.Top ? style.mediaInfoTop : style.mediaInfoBottom;

    return (
      <div className={`${style.mediaInfoDisplay} ${positionClass}`}>
        {shouldShowDuration && (
          <div className={style.mediaInfoDuration}>
            <TimeDisplay currentTime={0} duration={duration} format="total" />
          </div>
        )}
        {shouldShowDetails && (
          <div className={style.mediaInfoDetails}>
            {config.detailsMode === MediaInfoDetailsMode.Title && metadata?.name && <h2 className={style.mediaInfoTitle}>{metadata.name}</h2>}
            {config.detailsMode === MediaInfoDetailsMode.TitleAndDescription && (
              <>
                {metadata?.name && <h2 className={style.mediaInfoTitle}>{metadata.name}</h2>}
                {metadata?.description && (
                  <div className={style.mediaInfoDescription}>
                    {metadata.description.length > 100 && !this.state.isDescriptionExpanded ? (
                      <>
                        {metadata.description.substring(0, 100)}...{' '}
                        <span className={style.seeMore} onClick={this.toggleDescription}>
                          {this.props.seeMoreText}
                        </span>
                      </>
                    ) : (
                      <>
                        {metadata.description}
                        {metadata.description.length > 100 && this.state.isDescriptionExpanded && (
                          <>
                            {' '}
                            <span className={style.seeMore} onClick={this.toggleDescription}>
                              {this.props.seeLessText}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

const WrappedMediaInfoDisplay = withText({
  seeMoreText: 'mediaInfo.seeMore',
  seeLessText: 'mediaInfo.seeLess'
})(MediaInfoDisplay);

WrappedMediaInfoDisplay.displayName = COMPONENT_NAME;
export {WrappedMediaInfoDisplay as MediaInfoDisplay};
