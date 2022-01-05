const admin = require("firebase-admin");
const url = require("url");

console.log("FIREBASE_TOKEN", process.env.FIREBASE_TOKEN);
console.log("NEXT_PUBLIC_CONFIG", process.env.NEXT_PUBLIC_CONFIG);

if (process.env.NEXT_PUBLIC_CONFIG == undefined) {
    throw new Error(`process.env.NEXT_PUBLIC_CONFIG is undefined. Value: ${process.env.NEXT_PUBLIC_CONFIG}. Process.env${JSON.stringify(process.env)}`);
}

const config = JSON.parse(process.env.NEXT_PUBLIC_CONFIG);
const SERVICE_ACCOUNT = JSON.parse(process.env.SERVICE_ACCOUNT);

process.env.NODE_ENV === "production"
    ? admin.initializeApp()
    : admin.initializeApp({
        credential: admin.credential.cert(config.SERVICE_ACCOUNT),
        databaseURL: config.firebase.databaseURL,
    });

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
    config,
    version,
};
