import { TypedUseSelectorHook, useStateSelectorT, combineReducers } from 'react-reducer-ssr'
import { preferencesReducer } from './preferences.reducer'
import { usersReducer } from './users.reducer'

export const reducers = combineReducers({
  preferences: preferencesReducer,
  users: usersReducer
})

export type RootState = ReturnType<typeof reducers>
export const useStateSelector: TypedUseSelectorHook<RootState> = useStateSelectorT