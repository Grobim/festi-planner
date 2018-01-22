export const EVENT_SYNC_REQUESTED = 'EVENT_SYNC_REQUESTED';
export const EVENT_SYNC_SUCCESS = 'EVENT_SYNC_SUCCESS';
export const EVENT_UNSYNC_SUCCESS = 'EVENT_UNSYNC_SUCCESS';
export const EVENT_CREATE_REQUESTED = 'EVENT_CREATE_REQUESTED';
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS';
export const EVENT_SAVE_REQUESTED = 'EVENT_SAVE_REQUESTED';
export const EVENT_SAVE_SUCCESS = 'EVENT_SAVE_SUCCESS';

export const EVENT_STATE_SYNCING = 'EVENT_STATE_SYNCING';
export const EVENT_STATE_SYNCED = 'EVENT_STATE_SYNCED';
export const EVENT_STATE_UNSYNCED = 'EVENT_STATE_UNSYNCED';
export const EVENT_STATE_CREATING = 'EVENT_STATE_CREATING';
export const EVENT_STATE_CREATED = 'EVENT_STATE_CREATED';
export const EVENT_STATE_SAVING = 'EVENT_STATE_SAVING';
export const EVENT_STATE_SAVED = 'EVENT_STATE_SAVED';

const defaultState = {
  new: {
    state: null
  }
};

const event = (state = defaultState, action) => {
  switch (action.type) {
    case EVENT_SYNC_REQUESTED: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          state: EVENT_STATE_SYNCING
        }
      };
    }
    case EVENT_SYNC_SUCCESS: {
      const {
        eventId,
        ...eventData
      } = action.payload;

      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          state: EVENT_STATE_SYNCED,
          data: eventData
        }
      };
    }
    case EVENT_UNSYNC_SUCCESS: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          state: EVENT_STATE_UNSYNCED
        }
      };
    }
    case EVENT_CREATE_REQUESTED: {
      return {
        ...state,
        new: {
          ...state.new,
          state: EVENT_STATE_CREATING
        }
      };
    }
    case EVENT_CREATE_SUCCESS: {
      return {
        ...state,
        new: {
          ...defaultState.new
        }
      };
    }
    case EVENT_SAVE_REQUESTED: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          state: EVENT_STATE_SAVING
        }
      };
    }
    case EVENT_SAVE_SUCCESS: {
      const {
        eventId,
        ...eventData
      } = action.payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          ...eventData,
          state: EVENT_STATE_SAVED
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default event;
