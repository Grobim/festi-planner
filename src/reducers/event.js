const EVENT_PUBLIC_SYNC_REQUESTED = 'EVENT_PUBLIC_SYNC_REQUESTED';
const EVENT_PUBLIC_SYNC_SUCCESS = 'EVENT_PUBLIC_SYNC_SUCCESS';
const EVENT_PUBLIC_UNSYNC_SUCCESS = 'EVENT_PUBLIC_UNSYNC_SUCCESS';
const EVENT_CREATE_REQUESTED = 'EVENT_CREATE_REQUESTED';
const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS';
const EVENT_SAVE_REQUESTED = 'EVENT_SAVE_REQUESTED';
const EVENT_SAVE_SUCCESS = 'EVENT_SAVE_SUCCESS';

const EVENT_STATE_SYNCING = 'EVENT_STATE_SYNCING';
const EVENT_STATE_SYNCED = 'EVENT_STATE_SYNCED';
const EVENT_STATE_UNSYNCED = 'EVENT_STATE_UNSYNCED';
const EVENT_STATE_CREATING = 'EVENT_STATE_CREATING';
const EVENT_STATE_CREATED = 'EVENT_STATE_CREATED';
const EVENT_STATE_SAVING = 'EVENT_STATE_SAVING';
const EVENT_STATE_SAVED = 'EVENT_STATE_SAVED';

const defaultState = {
  new: {
    state: null
  }
};

const event = (state = defaultState, action) => {
  switch (action.type) {
    case EVENT_PUBLIC_SYNC_REQUESTED: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          public: {
            ...(state[action.payload] || {}).public,
            state: EVENT_STATE_SYNCING
          }
        }
      };
    }
    case EVENT_PUBLIC_SYNC_SUCCESS: {
      const {
        eventId,
        ...eventData
      } = action.payload;

      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          public: {
            ...(state[eventId] || {}).public,
            state: EVENT_STATE_SYNCED,
            data: eventData
          }
        }
      };
    }
    case EVENT_PUBLIC_UNSYNC_SUCCESS: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          public: {
            ...(state[action.payload] || {}).public,
            state: EVENT_STATE_UNSYNCED
          }
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

export {
  EVENT_PUBLIC_SYNC_REQUESTED,
  EVENT_PUBLIC_SYNC_SUCCESS,
  EVENT_PUBLIC_UNSYNC_SUCCESS,
  EVENT_CREATE_REQUESTED,
  EVENT_CREATE_SUCCESS,
  EVENT_SAVE_REQUESTED,
  EVENT_SAVE_SUCCESS,
  EVENT_STATE_SYNCING,
  EVENT_STATE_SYNCED,
  EVENT_STATE_UNSYNCED,
  EVENT_STATE_CREATING,
  EVENT_STATE_CREATED,
  EVENT_STATE_SAVING,
  EVENT_STATE_SAVED
};

export default event;
