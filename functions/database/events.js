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

exports.onMemberRoleChange = functions.database.ref('events/memberData/{eventId}/members/{uid}')
  .onWrite((event) => {
    const isMember = event.data.val();
    console.log(`Member role changed... eventId: ${event.params.eventId}, uid: ${event.params.uid}. New Value: ${isMember}`);

    if (!isMember) {
      return event.data.adminRef.root.child(`users/${event.params.uid}/events/member/${event.params.eventId}`).remove();
    }

    return event.data.adminRef.root.child(`users/${event.params.uid}/events/member/${event.params.eventId}`).set(true);
  });

exports.onAdminRoleChange = functions.database.ref('events/adminData/{eventId}/admins/{uid}')
  .onWrite((event) => {
    const isAdmin = event.data.val();
    console.log(`Admin role changed... eventId: ${event.params.eventId}, uid: ${event.params.uid}. New Value: ${isAdmin}`);

    if (!isAdmin) {
      return event.data.adminRef.root.child(`users/${event.params.uid}/events/admin/${event.params.eventId}`).remove();
    }

    return event.data.adminRef.root.child(`users/${event.params.uid}/events/admin/${event.params.eventId}`).set(true);
  });
