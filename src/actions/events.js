import firebase from 'firebase';

import map from 'lodash/map';
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
};

export default {
  fetchEvents
};
