/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {CvaaState} from '../types/reducers/cvaa';

export const types = {
  UPDATE_CAPTIONS_STYLE: 'cvaa/UPDATE_CAPTIONS_STYLE'
};

export const initialState = {
  style: 'default'
};

export default (state: CvaaState = initialState, action: any) => {
  switch (action.type) {
  case types.UPDATE_CAPTIONS_STYLE:
    return {
      ...state,
      style: action.style
    };

  default:
    return state;
  }
};

export const actions = {
  updateCaptionsStyle: (style: string) => ({type: types.UPDATE_CAPTIONS_STYLE, style})
};
