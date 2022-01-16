/* eslint-disable require-jsdoc */
//@flow
import style from '../../styles/style.scss';
import {h, Component, Fragment} from 'preact';
import {withText} from 'preact-i18n';
import {Button} from 'components/button';
import {Tooltip} from 'components/tooltip';
import {default as Icon, IconType} from '../icon';

@withText({
  prevControlsText: 'controls.prev',
  nextControlsText: 'controls.next',
  playlistPrevText: 'playlist.prev',
  playlistUpNextText: 'playlist.up_next'
})
class PrevNext extends Component {
  render(props: any): React$Element<any> {
    const {type, item, onClick} = props;

    const iconType = type === 'next' ? IconType.Next : IconType.Prev;
    const tooltipText = props[`${props.type}ControlsText`];
    const previewTitle = type === 'prev' ? this.props.playlistPrevText : this.props.playlistUpNextText;

    const previewImage = item?.sources?.poster;
    const previewText = item.sources?.metadata ? item.sources.metadata.name : '';

    const button = (
      <Button disabled={!item} tabIndex="0" aria-label={tooltipText} className={`${style.controlButton}`} onClick={onClick}>
        <div>
          <Icon type={iconType} />
        </div>
      </Button>
    );

    return (
      <div className={[style.controlButtonContainer, style.controlPlaylistButton].join(' ')}>
        {previewImage || previewText ? (
          <Fragment>
            <div className={style.posterPreview}>
              <div className={style.posterPreviewText}>
                <div className={style.posterPreviewTextTitle}>{previewTitle}</div>
                <div className={style.posterPreviewTextName}>{`${previewText ? previewText : ''}`}</div>
              </div>
              {previewImage ? <div className={style.posterPreviewImg} style={`background-image: url(${previewImage});`} /> : undefined}
            </div>
            {button}
          </Fragment>
        ) : (
          <Tooltip label={tooltipText}>{button}</Tooltip>
        )}
      </div>
    );
  }
}

export {PrevNext};
