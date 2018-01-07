const functions = require('firebase-functions');

exports.lowercaseEventName = functions.database.ref('fcknye-planner/events/{pushId}/name')
  .onWrite((event) => {
    const original = event.data.val();
    console.log('Lowercasing', event.params.pushId, original);
    const lowercase = original.toLowerCase();

    return event.data.ref.parent.child('lowercaseName').set(lowercase);
  });
