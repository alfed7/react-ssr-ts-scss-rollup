import type { AnyAction } from "react-reducer-ssr";

export interface IPreferencesState {
  allowCookies: boolean | null
}
export function preferencesReducer(draft: IPreferencesState, action: AnyAction): IPreferencesState {
  switch (action.type) {
    case 'cookieSettingsAdd': {
      draft.allowCookies = action.value;
    }break;
  }
  return draft;
}
