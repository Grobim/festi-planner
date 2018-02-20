const functions = require('firebase-functions');
const Promise = require('promise');

exports.lowercaseName = functions.database.ref('events/publicData/{eventId}/name')
  .onWrite((event) => {
    if (!event.data.exists()) {
      console.log('Not lowercasing', event.params.eventId, 'reason: !event.data.exists()');
      return null;
    }

    const original = event.data.val();
    console.log('Lowercasing', event.params.eventId, original);
    const lowercase = original.toLowerCase();

    return event.data.adminRef.parent.child('lowercaseName').set(lowercase);
  });

exports.onPublicDataCreate = functions.database.ref('events/publicData/{eventId}')
  .onCreate((event) => {
    const newEvent = event.data.val();
    console.log('Creating', event.params.eventId, newEvent);

    return Promise.all([
      event.data.adminRef.root.child(`events/memberData/${event.params.eventId}/members`).set({
        [newEvent.createdBy]: true
      }),
      event.data.adminRef.root.child(`events/adminData/${event.params.eventId}/admins`).set({
        [newEvent.createdBy]: true
      })
    ]);
  });
