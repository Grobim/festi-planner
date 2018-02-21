export const PROFILE_PUBLIC_SYNC_REQUESTED = 'PROFILE_PUBLIC_SYNC_REQUESTED';
export const PROFILE_PUBLIC_SYNC_SUCCESS = 'PROFILE_PUBLIC_SYNC_SUCCESS';
export const PROFILE_PUBLIC_UNSYNC = 'PROFILE_UNSYNC';

export const PROFILE_STATE_SYNCING = 'PROFILE_STATE_SYNCING';
export const PROFILE_STATE_SYNCED = 'PROFILE_STATE_SYNCED';
export const PROFILE_STATE_UNSYNCED = 'PROFILE_STATE_UNSYNCED';

const defaultState = {};

const profile = (state = defaultState, action) => {
  switch (action.type) {
    case PROFILE_PUBLIC_SYNC_REQUESTED:
      return {
        ...state,
        [action.payload.uid]: {
          ...state[action.payload.uid],
          public: {
            ...(state[action.payload.uid] || {}).public,
            state: PROFILE_STATE_SYNCING
          }
        }
      };
    case PROFILE_PUBLIC_SYNC_SUCCESS:
      return {
        ...state,
        [action.payload.uid]: {
          ...state[action.payload.uid],
          public: {
            ...(state[action.payload.uid] || {}).public,
            ...action.payload.publicData,
            state: PROFILE_STATE_SYNCED
          }
        }
      };
    case PROFILE_PUBLIC_UNSYNC:
      return {
        ...state,
        [action.payload.uid]: {
          ...state[action.payload.uid],
          public: {
            ...(state[action.payload.uid] || {}).public,
            state: PROFILE_STATE_UNSYNCED
          }
        }
      };
    default:
      return state;
  }
};

export default profile;
