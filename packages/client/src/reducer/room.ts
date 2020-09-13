import { IRoom } from '../../../schema/index'

//State

export type State = IRoom

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

export const drawCard = (room: IRoom) =>
  ({
    type: 'DRAW_CARD',
    payload: room,
  } as const)

type Action = ReturnType<typeof joinRoom> | ReturnType<typeof drawCard>

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'JOIN_ROOM': {
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'DRAW_CARD': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
