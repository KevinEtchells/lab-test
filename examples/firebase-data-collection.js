//connect to Firebase
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

exports.handler = async function (event, context) {

    const sendData = async () => {
        return new Promise((resolve) => {

            if (!admin?.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: process.env.DATABASE_URL
                });
            }

            const test = event.queryStringParameters.test;
            const variant = event.queryStringParameters.variant;
            const property = event.queryStringParameters.property;

            if (test && variant && property) {
                let update = {};
                update[property] = admin.database.ServerValue.increment(1);
                admin.database().ref(`ab-tests/${test}/variant-${variant}`).update(update, () => {
                    resolve();
                });
            } else {
                resolve();
            }

        });
    };

    await sendData();

    // send response
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: 'ok'
    }

};