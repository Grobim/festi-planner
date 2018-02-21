const functions = require('firebase-functions');
const Promise = require('promise');

exports.onEventNameWrite = functions.database.ref('events/publicData/{eventId}/name')
  .onWrite((event) => {
    const promises = [];
    const newEventName = event.data.val();

    if (newEventName) {
      console.log('Lowercasing', event.params.eventId, newEventName);
      const lowercase = newEventName.toLowerCase();

      promises.push(event.data.adminRef.parent.child('lowercaseName').set(lowercase));
    }

    return Promise.all([
      event.data.adminRef.root.child(`events/memberData/${event.params.eventId}/members`).once('value'),
      event.data.adminRef.root.child(`events/adminData/${event.params.eventId}/admins`).once('value')
    ]).then((roles) => {
      const memberRolesSnap = roles[0];

      if (memberRolesSnap.exists()) {
        console.log(`Updating event name for members: ${JSON.stringify(memberRolesSnap.val())}`);

        memberRolesSnap.forEach((snap) => {
          if (snap.val() === true) {
            promises.push(event.data.adminRef.root
              .child(`users/${snap.key}/events/member/${event.params.eventId}/eventName`)
              .set(newEventName));
          }
        });
      }

      const adminRolesSnap = roles[1];

      if (adminRolesSnap.exists()) {
        console.log(`Updating event name for admins: ${JSON.stringify(adminRolesSnap.val())}`);

        adminRolesSnap.forEach((snap) => {
          if (snap.val() === true) {
            promises.push(event.data.adminRef.root
              .child(`users/${snap.key}/events/admin/${event.params.eventId}/eventName`)
              .set(newEventName));
          }
        });
      }
    }).then(() => Promise.all(promises));
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

exports.onMemberRoleWrite = functions.database.ref('events/memberData/{eventId}/members/{uid}')
  .onWrite((event) => {
    const isMember = event.data.val();
    console.log(`Member role changed... eventId: ${event.params.eventId}, uid: ${event.params.uid}. New Value: ${isMember}`);

    const roleRef = event.data.adminRef.root.child(`users/${event.params.uid}/events/member/${event.params.eventId}`);
    if (!isMember) {
      return roleRef.remove();
    }

    return event.data.adminRef.root.child(`events/publicData/${event.params.eventId}/name`).once('value')
      .then(snap => snap.val())
      .then(eventName => roleRef.set({
        isMember: true,
        eventName
      }));
  });

exports.onAdminRoleWrite = functions.database.ref('events/adminData/{eventId}/admins/{uid}')
  .onWrite((event) => {
    const isAdmin = event.data.val();
    console.log(`Admin role changed... eventId: ${event.params.eventId}, uid: ${event.params.uid}. New Value: ${isAdmin}`);

    const roleRef = event.data.adminRef.root.child(`users/${event.params.uid}/events/admin/${event.params.eventId}`);
    if (!isAdmin) {
      return roleRef.remove();
    }

    return event.data.adminRef.root.child(`events/publicData/${event.params.eventId}/name`).once('value')
      .then(snap => snap.val())
      .then(eventName => roleRef.set({
        isAdmin: true,
        eventName
      }));
  });
