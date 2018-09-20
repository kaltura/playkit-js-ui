// @flow
import {applyMiddleware} from 'redux';
import {eventDispatcherMiddleware} from './event-dispatcher';
import {loggerMiddleware} from './logger';

/**
 * Creates the redux middleware.
 * @param {Object} player - The video player.
 * @param {UIOptionsObject} config - The UI config.
 * @return {GenericStoreEnhancer} - The redux middleware.
 */
const middleware = (player: Object, config: UIOptionsObject) => applyMiddleware(loggerMiddleware(config), eventDispatcherMiddleware(player));

export {middleware};
