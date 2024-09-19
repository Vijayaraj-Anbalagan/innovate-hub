const admin = require('firebase-admin');
const serviceAccount = require('./adminConfig.json'); // Replace with your service account file path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// List of leader emails to be updated
 const leaderEmails = [
   '9123205117@kcgcollege.com',
   '22cs090@kcgcollege.com',
   'idhikaprabakaran@gmail.com',
   'johnwesley1024@gmail.com',
   '9123104168@kcgcollege.com',
   'thameemmulansaris@gmail.com',
   'brin30904@gmail.com',
   'manasesh2003@gmail.com',
   '22cs020@kcgcollege.com',
   'jaishivaani702@gmail.com',
   '22cs123@kcgcollege.com',
   '22cs068@kcgcollege.com',
   '22cs011@kcgcollege.com',
   '9123104012@kcgcollege.com',
   '9123104016@kcgcollege.com',
   '9123128027@kcgcollege.com',
   '9123104062@kcgcollege.com',
   'ajithajay1029@gmail.com',
   '9123128062@kcgcollege.com',
   'varunganesh46@gmail.com',
   'roshninekkanti@gmail.com',
   'hrushikesh.ghattuwar@gmail.com',
   'gokulramananvec@gmail.com',
   'siddharthmagesh007@gmail.com',
   '22cs016@kcgcollege.com',
   'monishkumaar3@gmail.com',
   'abishekraj2834@gmail.com',
   '9123243030@kcgcollege.com',
   '21cs076@kcgcollege.com',
   'kanmanimathivanan148@gmail.com',
   '22cs003@kcgcollege.com',
   '9123128035@kcgcollege.com',
   'koushikreddy2004@gmail.com',
   '9123128040@kcgcollege.com',
   '9123128013@kcgcollege.com',
   'matshaun1104@gmail.com',
   '9123104074@kcgcollege.com',
   '22cs115@kcgcollege.com',
   '22cs130@kcgcollege.com',
   '22cs139@kcgcollege.com',
   'karthik1442004@gmail.com',
   '22cs022@kcgcollege.com',
   'rohan2210124@ssn.edu.in',
   '22cs071@kcgcollege.com',
   '22cs031@kcgcollege.com',
   'Pavancodes05@gmail.com',
   '22cs059@kcgcollege.com',
   'nithyaharini2625@gmail.com',
   '9123104181@kcgcollege.com',
   'as5584@srmist.edu.in',
   'prishakarthika@gmail.com',
   'rahulsuresh2569@gmail.com',
   'Sanjai0928@gmail.com',
   '9123128031@kcgcollege.com',
   'dharshan26b@gmail.com',
   '9123128010@kcgcollege.com',
   'vv7617@srmist.edu.in',
   'pujita.mishra.123@gmail.com',
   '9123104123@kcgcollege.com',
   '22cs132@kcgcollege.com',
   '9123104187@kcgcollege.com',
   'rukhiyamasthani04@gmail.com',
   'nkroshankumar@gmail.com',
   '22cs110@kcgcollege.com',
   '22cs043@kcgcollege.com',
   '22cs105@kcgcollege.com',
   '9123104046@kcgcollege.com',
   '9123104051@kcgcollege.com',
   '22ad46@kcgcollege.com',
   '9123128012@kcgcollege.com',
   '9123104173@kcgcollege.com',
   '9123128025@kcgcollege.com',
   '9123104065@kcgcollege.com',
   'sujithakarthikeyan8@gmail.com',
   '22cs026@kcgcollege.com',
   '22cs093@kcgcollege.com',
   '22cs024@kcgcollege.com',
   'kani2005sugu@gmail.com',
   '22cs147@kcgcollege.com',
   '9123104127@kcgcollege.com',
   '9123104044@kcgcollege.com',
   'tk1657578@gmail.com',
   'wlingesh260@gmail.com',
   'yuthikaanvitha2210222@ssn.edu.in',
   'crenilimmanuel@gmail.com',
   'rakheshkrishnap@gmail.com',
   '9123205081@kcgcollege.com',
   'inderajay82@gmail.com',
   '9123104067@kcgcollege.com',
   'sujithashankar2004@gmail.com',
   '9123104159@kcgcollege.com',
   '22cs083@kcgcollege.com',
   '9123128020@kcgcollege.com',
   '9123104096@kcgcollege.com',
   'geethikagopi7@gmail.com',
   'abhiram22699@gmail.com',
   '9123205059@kcgcollege.com',
   '9123104075@kcgcollege.com',
   '9123104093@kcgcollege.com',
   '22ad30@kcgcollege.com',
 ];
 
async function updateStatusForSelectedEmails() {
  // Query the 'users' collection
  const collectionPath = 'users'; // Replace with your actual collection name
  const snapshot = await db.collection(collectionPath).get();

  if (snapshot.empty) {
    console.log('No documents found in the collection.');
    return;
  }

  let updateCount = 0;

  // Iterate through the documents and update the status
  const updatePromises = snapshot.docs.map(async (doc) => {
    const data = doc.data();

    if (leaderEmails.includes(data.email?.toLowerCase())) {
      // Update the status to "selected" for matching emails
      await doc.ref.update({ status: 'selected' });
      updateCount++;
    }
  });

  // Wait for all updates to complete
  await Promise.all(updatePromises);

  console.log(`Status updated to "selected" for ${updateCount} documents.`);
}

updateStatusForSelectedEmails().catch(console.error);
