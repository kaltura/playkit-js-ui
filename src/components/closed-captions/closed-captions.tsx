import style from '../../styles/style.scss';
import {h, VNode} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {registerToBottomBar} from '../bottom-bar';
import {redux} from '../../index';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  showCCButton: state.config.showCCButton,
  openMenuFromCCButton: state.config.openMenuFromCCButton
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

        useEffect(() => {
          registerToBottomBar(COMPONENT_NAME, player, () => registerComponent());
        }, []);

      const registerComponent = (): any => {
        return {
          ariaLabel: () => getAriaLabel(),
          displayName: COMPONENT_NAME,
          order: 5,
          svgIcon: () => getSvgIcon(),
          onClick: () => onClick(),
          component: () => {
            return getComp({...props, classNames: [style.upperBarIcon]});
          },
          selfManagement: true
        };
      };

      const getIsTextOnFromStore = (): boolean => {
        return redux.useStore().getState().settings.isTextOn;
      };

      const getAriaLabel = (): any => {
        return getIsTextOnFromStore() ? props.closedCaptionsOnText : props.closedCaptionsOffText;
      };

      const getSvgIcon = (): any => {
        return {
          type: getIsTextOnFromStore() ? IconType.ClosedCaptionsOn : IconType.ClosedCaptionsOff
        };
      };

      const onClick = () => {
        const isCCOn = getIsTextOnFromStore();
        props.notifyClick(isCCOn);
        isCCOn ? player.hideTextTrack() : player.showTextTrack();
      };

        const shouldRender = !!textTracks?.length && props.showCCButton && !props.openMenuFromCCButton;
        props.onToggle(COMPONENT_NAME, shouldRender);
        if (!shouldRender) return undefined;

        return (
          <ButtonControl name={COMPONENT_NAME} className={props.classNames ? props.classNames.join(' ') : ''}>
            {ccOn ? (
              <Tooltip label={props.closedCaptionsOnText}>
                <Button
                  tabIndex={0}
                  aria-label={props.closedCaptionsOnText}
                  className={[style.controlButton, style.ccOn].join(' ')}
                  onClick={() => {
                    props.notifyClick(true);
                    player.hideTextTrack();
                  }}
                >
                  <Icon type={IconType.ClosedCaptionsOn} />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip label={props.closedCaptionsOffText}>
                <Button
                  tabIndex={0}
                  aria-label={props.closedCaptionsOffText}
                  className={style.controlButton}
                  onClick={() => {
                    props.notifyClick(false);
                    player.showTextTrack();
                  }}
                >
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

const getComp = (props: any): VNode => {
  return <ClosedCaptions {...props} />;
}

ClosedCaptions.displayName = COMPONENT_NAME;
export {ClosedCaptions};
