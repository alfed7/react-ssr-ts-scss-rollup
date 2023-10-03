import type { AnyAction } from "react-reducer-ssr";
import { preferencesConstants as consts } from '../constants'

export interface IPreferencesState {
  allowCookies: boolean | null
}
export function preferencesReducer(draft: IPreferencesState, action: AnyAction): IPreferencesState {
  switch (action.type) {
    case consts.COOKIE_SETTINGS_ADD: {
      draft.allowCookies = action.value;
    }break;
  }
  return draft;
}
