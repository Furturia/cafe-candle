var admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore();

async function deleteAll() {
  console.log("🗑️  Deleting all submissions...\n");

  var snapshot = await db.collection("submissions").get();

  if (snapshot.empty) {
    console.log("No submissions found. Nothing to delete.");
    return;
  }

  var count = 0;
  var total = snapshot.size;

  for (var docSnap of snapshot.docs) {
    try {
      // Delete subcollection images/full first
      var imagesSnapshot = await db
        .collection("submissions")
        .doc(docSnap.id)
        .collection("images")
        .get();

      for (var imgDoc of imagesSnapshot.docs) {
        await imgDoc.ref.delete();
      }

      // Delete main document
      await docSnap.ref.delete();

      count++;
      console.log(
        `✅ [${count}/${total}] Deleted: ${docSnap.id} (${docSnap.data().firstName} ${docSnap.data().lastName})`
      );
    } catch (error) {
      count++;
      console.error(`❌ [${count}/${total}] Error deleting ${docSnap.id}: ${error.message}`);
    }
  }

  console.log(`\n🎉 Done! Deleted ${count}/${total} submissions.`);
}

deleteAll();
