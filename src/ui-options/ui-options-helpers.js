// @flow
import type {UIOptionsObject} from './ui-options'

/**
 * Validate user input
 * @param {string | UIOptionsObject} param - user input
 * @returns {void}
 */
export function validate(param: string | UIOptionsObject): void {
  if (typeof param === 'string') return;
  if (typeof param === 'object' && typeof param.targetId === 'string') return;
  throw new TypeError('Invalid UI configuration - must provide {targetId:string}');
}
