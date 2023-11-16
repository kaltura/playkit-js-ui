import style from '../../styles/style.scss';
import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  showCCButton: state.config.showCCButton
});

const COMPONENT_NAME = 'ClosedCaptions';

/**
 * ClosedCaptions component
 *
 * @class ClosedCaptions
 * @example <ClosedCaptions />
 * @extends {Component}
 */
const ClosedCaptions = connect(mapStateToProps)(
  withLogger(COMPONENT_NAME)(
    withEventDispatcher(COMPONENT_NAME)(
      withText({
        closedCaptionsOnText: 'controls.closedCaptionsOn',
        closedCaptionsOffText: 'controls.closedCaptionsOff'
      })((props, context) => {
        const [ccOn, setCCOn] = useState(false);
        const {textTracks} = props;
        const {player} = context;
        const activeTextTrack = textTracks.find(textTrack => textTrack.active);

        useEffect(() => {
          setCCOn(activeTextTrack?.language !== 'off');
        }, [activeTextTrack]);

        const shouldRender = !!(props.textTracks?.length && props.showCCButton);
        props.onToggle(COMPONENT_NAME, shouldRender);
        if (!shouldRender) return undefined;
        return (
          <ButtonControl name={COMPONENT_NAME}>
            {ccOn ? (
              <Tooltip label={props.closedCaptionsOnText}>
                <Button
                  // @ts-ignore
                  tabIndex="0"
                  aria-label={props.closedCaptionsOnText}
                  className={[style.controlButton, style.ccOn].join(' ')}
                  onClick={() => {
                    props.notifyClick(true);
                    player.hideTextTrack();
                  }}>
                  <Icon type={IconType.ClosedCaptionsOn} />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip label={props.closedCaptionsOffText}>
                <Button
                  // @ts-ignore
                  tabIndex="0"
                  aria-label={props.closedCaptionsOffText}
                  className={style.controlButton}
                  onClick={() => {
                    props.notifyClick(false);
                    player.showTextTrack();
                  }}>
                  <Icon type={IconType.ClosedCaptionsOff} />
                </Button>
              </Tooltip>
            )}
          </ButtonControl>
        );
      })
    )
  )
);

ClosedCaptions.displayName = COMPONENT_NAME;
export {ClosedCaptions};
