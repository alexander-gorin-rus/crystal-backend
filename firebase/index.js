
let admin = require("firebase-admin");

let serviceAccount = require("../config/fireBaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crystal-17354.firebaseio.com"
});


module.exports = admin;