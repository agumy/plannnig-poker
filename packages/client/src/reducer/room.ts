import { IRoom } from '../../../schema/index'

//State

type State = IRoom

export const initialState: State = {
  id: '',
  members: [],
  host: '',
}

// action-creator

export const joinRoom = (room: IRoom) =>
  ({
    type: 'JOIN_ROOM',
    payload: room,
  } as const)

type Action = ReturnType<typeof joinRoom>

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'JOIN_ROOM': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
