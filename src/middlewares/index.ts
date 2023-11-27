import {applyMiddleware} from 'redux';
import {eventDispatcherMiddleware} from './event-dispatcher';
import {loggerMiddleware} from './logger';
import {UIOptionsObject} from '../types';

/**
 * Creates the redux middleware.
 * @param {Object} player - The video player.
 * @param {UIOptionsObject} config - The UI config.
 * @return {GenericStoreEnhancer} - The redux middleware.
 */
const middleware = (player: any, config: UIOptionsObject): any => applyMiddleware<any, any>(loggerMiddleware(config), eventDispatcherMiddleware(player));

export {middleware};
