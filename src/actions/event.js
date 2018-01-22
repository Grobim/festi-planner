import firebase from 'firebase';

import { push } from 'react-router-redux';

import {
  EVENT_CREATE_REQUESTED,
  EVENT_CREATE_SUCCESS,
  EVENT_SYNC_REQUESTED,
  EVENT_SYNC_SUCCESS,
  EVENT_UNSYNC_SUCCESS,
  EVENT_SAVE_REQUESTED,
  EVENT_SAVE_SUCCESS
} from 'reducers/event';

import { showMessage } from 'actions/ui/global';

const createEventRequest = () => ({
  type: EVENT_CREATE_REQUESTED
});

const createEventSuccess = eventId => ({
  type: EVENT_CREATE_SUCCESS,
  payload: eventId
});

const syncEventRequest = eventId => ({
  type: EVENT_SYNC_REQUESTED,
  payload: eventId
});

const syncEventSuccess = (eventId, eventData) => ({
  type: EVENT_SYNC_SUCCESS,
  payload: {
    ...eventData,
    eventId
  }
});

const unsyncEventSuccess = eventId => ({
  type: EVENT_UNSYNC_SUCCESS,
  payload: eventId
});

const saveEventRequest = eventId => ({
  type: EVENT_SAVE_REQUESTED,
  payload: eventId
});

const saveEventSuccess = (eventId, eventData) => ({
  type: EVENT_SAVE_SUCCESS,
  payload: {
    eventId,
    ...eventData
  }
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

export const syncEvent = eventId => (dispatch) => {
  dispatch(syncEventRequest(eventId));

  firebase.database()
    .ref(`fcknye-planner/events/${eventId}`)
    .on('value', (snap) => {
      if (snap.exists()) {
        dispatch(syncEventSuccess(snap.key, snap.val()));
      }
    });
};

export const unsyncEvent = eventId => (dispatch) => {
  firebase.database()
    .ref(`fcknye-planner/events/${eventId}`)
    .off('value');

  dispatch(unsyncEventSuccess(eventId));
};

export const saveEvent = (eventId, eventData) => (dispatch) => {
  dispatch(saveEventRequest(eventId));

  firebase.database()
    .ref(`fcknye-planner/events/${eventId}`)
    .update(eventData)
    .then(() => {
      dispatch(saveEventSuccess(eventId, eventData));
      dispatch(showMessage('Save success'));
    });
};

export default {
  createEvent,
  syncEvent,
  unsyncEvent,
  saveEvent
};
