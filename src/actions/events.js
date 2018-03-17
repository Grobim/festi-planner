import firebase from 'firebase';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

import {
  EVENTS_SYNC_REQUESTED,
  EVENTS_SYNC_SUCCESS,
  EVENTS_UNSYNCED
} from 'reducers/events';

const syncEventsRequest = () => ({
  type: EVENTS_SYNC_REQUESTED
});

const syncEventsReveived = payload => ({
  type: EVENTS_SYNC_SUCCESS,
  payload
});

const unsyncedEvents = () => ({
  type: EVENTS_UNSYNCED
});

const syncEvents = () => (dispatch, getState) => {
  dispatch(syncEventsRequest());

  const {
    user: { uid },
    events: { query }
  } = getState().plannerApp;

  firebase.database()
    .ref(`users/${uid}/events/member`)
    .orderByChild(query.sort)
    .startAt(query.startAt)
    .limitToFirst(query.pageSize)
    .on('value', (snap) => {
      const events = snap.val() || {};

      const eventsAsArray = map(events, (value, eventKey) => ({
        eventKey,
        ...value
      }));

      dispatch(syncEventsReveived(sortBy(filter(
        eventsAsArray,
        event => event.isMember
      ), query.sort)));
    });
};

const unsyncEvents = () => (dispatch, getState) => {
  const {
    user: { uid }
  } = getState().plannerApp;

  firebase.database()
    .ref(`users/${uid}/events/member`)
    .off('value');

  dispatch(unsyncedEvents());
};

export {
  syncEvents,
  unsyncEvents
};
