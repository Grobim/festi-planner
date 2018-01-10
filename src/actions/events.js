import firebase from 'firebase';

import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import {
  EVENTS_FETCH_REQUESTED,
  EVENTS_FETCH_SUCCESS,
  EVENTS_FETCH_KEYS_REQUESTED,
  EVENTS_FETCH_KEYS_SUCCESS
} from 'reducers/events';

const fetchEventsRequest = () => ({
  type: EVENTS_FETCH_REQUESTED
});

const fetchEventsReveived = payload => ({
  type: EVENTS_FETCH_SUCCESS,
  payload
});

const fetchKeysRequest = () => ({
  type: EVENTS_FETCH_KEYS_REQUESTED
});

const fetchKeysReveived = payload => ({
  type: EVENTS_FETCH_KEYS_SUCCESS,
  payload
});

const createUrl = () => {
  const chunks = [
    'https://boiling-fire-3060.firebaseio.com/fcknye-planner/events.json',
    '?shallow=true'
  ];
  return chunks.join('');
};

export const fetchEvents = () => (dispatch, getState) => {
  dispatch(fetchEventsRequest());
  dispatch(fetchKeysRequest());

  const { query } = getState().plannerApp.events;

  firebase.database()
    .ref('fcknye-planner/events')
    .orderByChild(query.sort)
    .limitToFirst(query.pageSize)
    .once('value')
    .then(snap => snap.val() || {})
    .then((events) => {
      const eventsAsArray = map(events, (value, eventKey) => ({
        eventKey,
        ...value
      }));

      dispatch(fetchEventsReveived(sortBy(eventsAsArray, query.sort)));
    });

  fetch(createUrl(query))
    .then(res => res.json())
    .then((dataKeys) => {
      dispatch(fetchKeysReveived(dataKeys));
    });
};

export default {
  fetchEvents
};
