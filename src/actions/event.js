import firebase from 'firebase';

import { push } from 'react-router-redux';

import { all } from 'promise';

import {
  EVENT_CREATE_REQUESTED,
  EVENT_CREATE_SUCCESS,
  EVENT_PUBLIC_SYNC_REQUESTED,
  EVENT_PUBLIC_SYNC_SUCCESS,
  EVENT_PUBLIC_UNSYNC_SUCCESS,
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

const syncPublicEventRequest = eventId => ({
  type: EVENT_PUBLIC_SYNC_REQUESTED,
  payload: eventId
});

const syncPublicEventSuccess = (eventId, eventData) => ({
  type: EVENT_PUBLIC_SYNC_SUCCESS,
  payload: {
    ...eventData,
    eventId
  }
});

const unsyncPublicEventSuccess = eventId => ({
  type: EVENT_PUBLIC_UNSYNC_SUCCESS,
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

  firebase.database().ref('events/publicData')
    .push({
      ...eventData,
      createdBy: uid
    })
    .then((ref) => {
      dispatch(createEventSuccess(ref.key));
      dispatch(push(`/event/${ref.key}`));
      dispatch(showMessage('Event successfully created'));
    });
};

export const syncEvent = eventId => (dispatch) => {
  dispatch(syncPublicEventRequest(eventId));

  firebase.database()
    .ref(`events/publicData/${eventId}`)
    .on('value', (snap) => {
      if (snap.exists()) {
        dispatch(syncPublicEventSuccess(snap.key, snap.val()));
      }
    });
};

export const unsyncEvent = eventId => (dispatch) => {
  firebase.database()
    .ref(`events/publicData/${eventId}`)
    .off('value');

  dispatch(unsyncPublicEventSuccess(eventId));
};

export const saveEvent = (eventId, eventData) => (dispatch) => {
  dispatch(saveEventRequest(eventId));

  const publicPromise = firebase.database()
    .ref(`events/publicData/${eventId}`)
    .update(eventData);

  publicPromise
    .then(() => {
      dispatch(saveEventSuccess(eventId, eventData));
    });

  all([
    publicPromise
  ]).then(() => {
    dispatch(showMessage('Event successfully saved'));
  });
};

export default {
  createEvent,
  syncEvent,
  unsyncEvent,
  saveEvent
};
