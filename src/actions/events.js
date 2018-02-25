import firebase from 'firebase';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

import {
  EVENTS_FETCH_REQUESTED,
  EVENTS_FETCH_SUCCESS
} from 'reducers/events';

const fetchEventsRequest = () => ({
  type: EVENTS_FETCH_REQUESTED
});

const fetchEventsReveived = payload => ({
  type: EVENTS_FETCH_SUCCESS,
  payload
});

export const fetchEvents = () => (dispatch, getState) => {
  dispatch(fetchEventsRequest());

  const {
    user: { uid },
    events: { query }
  } = getState().plannerApp;

  firebase.database()
    .ref(`users/${uid}/events/member`)
    .orderByChild(query.sort)
    .startAt(query.startAt)
    .limitToFirst(query.pageSize)
    .once('value')
    .then(snap => snap.val() || {})
    .then((events) => {
      const eventsAsArray = map(events, (value, eventKey) => ({
        eventKey,
        ...value
      }));

      dispatch(fetchEventsReveived(sortBy(filter(eventsAsArray, event => event.isMember), query.sort)));
    });
};

export default {
  fetchEvents
};
