import type { AnyAction } from "react-reducer-ssr";

export interface IUsersState {
  userName: string | null
}
export function usersReducer(draft: IUsersState, action: AnyAction): IUsersState {
  switch (action.type) {
    case 'USER_LOGIN': {
      draft.userName = action.value;
    }break;
  }
  return draft
}
