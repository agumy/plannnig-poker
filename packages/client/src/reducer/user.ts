import { IUser } from '../../../schema/index'

//State

export type State = {
  [P in keyof IUser]: IUser[P]
} & {
  isHost: boolean
}

export const initialState: State = {
  id: '',
  name: '',
  isHost: false,
}

// action-creator

export const userJoin = (user: State) =>
  ({
    type: 'USER_JOIN',
    payload: user,
  } as const)

type Action = ReturnType<typeof userJoin>

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER_JOIN': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
