//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';
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

        return props.textTracks?.length && props.showCCButton ? (
          <ButtonControl name={COMPONENT_NAME}>
            <Tooltip label={ccOn ? props.closedCaptionsOnText : props.closedCaptionsOffText}>
              <Button
                tabIndex="0"
                aria-label={ccOn ? props.closedCaptionsOnText : props.closedCaptionsOffText}
                className={ccOn ? [style.controlButton, style.ccOn].join(' ') : style.controlButton}
                onClick={() => {
                  props.notifyClick();
                  ccOn ? player.hideTextTrack() : player.showTextTrack();
                }}>
                <Icon type={IconType.ClosedCaptionsOn} />
                <Icon type={IconType.ClosedCaptionsOff} />
              </Button>
            </Tooltip>
          </ButtonControl>
        ) : undefined;
      })
    )
  )
);

ClosedCaptions.displayName = COMPONENT_NAME;
export {ClosedCaptions};
