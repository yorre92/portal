import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.runWorkflow = functions.firestore
  .document('orders/{orderId}')
  .onCreate((change, context) => {
    console.log('Det fungerar!!!');
    const data = change.data();
    console.log(data.serviceId);
    console.log(context.params.orderId);

    db.collection('services')
      .doc(data.serviceId)
      .get()
      .then((serviceSnapshot) => {
        db.collection('workflowSteps')
          .where('workflowId', '==', context.params.workflowId)
          .get()
          .then((workflowSteps) => {
            workflowSteps.forEach((step) => {
              console.log(step.data());
            });
          });
      });
  });
