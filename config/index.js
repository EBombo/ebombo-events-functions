const admin = require("firebase-admin");
const url = require("url");

const config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG ?? '');

process.env.NODE_ENV === "production"
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.cert(config.serviceAccountEventsDev),
      databaseURL: config.firebase.databaseURL,
    });

const adminFirestore = admin.firestore;
const firestore = admin.firestore();
const auth = admin.auth();
const currentEnvironment = process.env.NODE_ENV;
const version = "0.0.1";

try {
  firestore.settings({ ignoreUndefinedProperties: true });
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
  config,
  version,
};
