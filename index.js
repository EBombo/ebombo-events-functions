const {firestore} = require("./config");
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.registerCompanyOnCreateCustomer = functions
  .firestore
  .document("customers/{customerId}")
  .onCreate(async (customerSnapshot, context) => {
    const userId = context.params.customerId;
    const customer = customerSnapshot.data();

    functions.logger.info(`adding companyId to Stripe customer with Id ${userId} created`);
    try {
      const userQuery = await firestore
        .collection("users")
        .doc(userId)
        .get();

      const user = userQuery.data();

      await customerSnapshot.ref.update({
        ...customer,
        companyId: user.companyId,
      });
      functions.logger.info(`successfully added companyId ${user.companyId} to recently created Stripe Customer with Id ${userId}`);
    } catch (err) {
      functions.logger.error(`Failed at adding companyId to Stripe Customer with Id ${userId}`, `error: ${err}`);
    }
  });

