import firebase from 'firebase';

import { push } from 'react-router-redux';

import {
  EVENT_CREATE_REQUESTED,
  EVENT_CREATE_SUCCESS
} from 'reducers/event';

const createEventRequest = () => ({
  type: EVENT_CREATE_REQUESTED
});

const createEventSuccess = eventId => ({
  type: EVENT_CREATE_SUCCESS,
  payload: eventId
});

export const createEvent = eventData => (dispatch, getState) => {
  dispatch(createEventRequest());

  const {
    uid
  } = getState().plannerApp.user;

  firebase.database().ref('fcknye-planner/events')
    .push({
      ...eventData,
      createdBy: uid
    })
    .then((ref) => {
      dispatch(createEventSuccess(ref.key));
      dispatch(push(`/event/${ref.key}`));
    });
};

export default {
  createEvent
};
