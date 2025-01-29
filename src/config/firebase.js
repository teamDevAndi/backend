const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountFirebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
