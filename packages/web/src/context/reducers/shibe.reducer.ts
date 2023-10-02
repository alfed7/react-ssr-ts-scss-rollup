import { shibeConstants as consts } from "../constants";
import type { AnyAction } from "react-reducer-ssr";

export interface IShibeState {
  shibeLinks: string[] | null
}
export function shibeReducer(draft: IShibeState, action: AnyAction): IShibeState {
  switch (action.type) {
    case consts.GET_SHIBE_SUCCESS: {
      draft.shibeLinks = action.value;
    } break;
    case consts.GET_SHIBE_FAILURE: {
      console.log(action.error);
    } break;
  }
  return draft;
}
