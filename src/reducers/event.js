export const EVENT_SYNC_REQUESTED = 'EVENT_SYNC_REQUESTED';
export const EVENT_CREATE_REQUESTED = 'EVENT_CREATE_REQUESTED';
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS';

export const EVENT_STATE_SYNCING = 'EVENT_STATE_SYNCING';
export const EVENT_STATE_CREATING = 'EVENT_STATE_CREATING';
export const EVENT_STATE_CREATED = 'EVENT_STATE_CREATED';

const defaultState = {
  new: {
    state: null
  }
};

const event = (state = defaultState, action) => {
  switch (action.type) {
    case EVENT_SYNC_REQUESTED:
      return {
        ...state,
        [action.payload.eventId]: {
          ...state[action.payload.eventId],
          state: EVENT_STATE_SYNCING
        }
      };
    case EVENT_CREATE_REQUESTED:
      return {
        ...state,
        new: {
          ...state.new,
          state: EVENT_STATE_CREATING
        }
      };
    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        new: {
          ...defaultState.new
        }
      };
    default:
      return state;
  }
};

export default event;
