const admin = require("firebase-admin");
const url = require("url");

admin.initializeApp();
const adminFirestore = admin.firestore;
const firestore = admin.firestore();
const auth = admin.auth();
const currentEnvironment = process.env.NODE_ENV;
const version = "0.0.1";

try {
    firestore.settings({ignoreUndefinedProperties: true});
} catch (error) {
    console.error("ignoreUndefinedProperties", error);
}

const hostname = (req) => url.parse(req.headers.origin).hostname;

module.exports = {
    adminFirestore,
    currentEnvironment,
    firestore,
    hostname,
    auth,
    version,
};
