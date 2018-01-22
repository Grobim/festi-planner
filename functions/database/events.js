const functions = require('firebase-functions');

exports.lowercaseName = functions.database.ref('fcknye-planner/events/{pushId}/name')
  .onWrite((event) => {
    const original = event.data.val();
    console.log('Lowercasing', event.params.pushId, original);
    const lowercase = original.toLowerCase();

    return event.data.adminRef.parent.child('lowercaseName').set(lowercase);
  });

exports.onCreate = functions.database.ref('fcknye-planner/events/{pushId}')
  .onCreate((event) => {
    const newEvent = event.data.val();
    console.log('Creating', event.params.pushId, newEvent);

    return event.data.adminRef.child('admins').set({
      [newEvent.createdBy]: true
    });
  });
