const admin = require('firebase-admin');
const ExcelJS = require('exceljs');
const serviceAccount = require('./adminConfig.json'); // Replace with your service account file path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// List of leader emails
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

async function exportSelectedFieldsToExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Filtered Data');

  // Define headers for the specific fields you want to export
  worksheet.columns = [
    { header: 'Team Name', key: 'teamName', width: 20 },
    { header: 'Lead Name', key: 'leadName', width: 20 },
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'College', key: 'college', width: 30 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone No', key: 'phoneNo', width: 15 },
    { header: 'PSID', key: 'psid', width: 20 },
    { header: 'PSTitle', key: 'psTitle', width: 30 },
    { header: 'State', key: 'state', width: 20 },
    { header: 'Team Count', key: 'teamCount', width: 15 },
    { header: 'Team Members', key: 'teamMembers', width: 100 },
  ];

  // Query the 'users' collection
  const collectionPath = 'users'; // Replace with your actual collection name
  const snapshot = await db.collection(collectionPath).get();

  if (snapshot.empty) {
    console.log('No documents found in the collection.');
    return;
  }

  let processedCount = 0;
  const matchedEmails = new Set();

  // Filter documents and select specific fields
  snapshot.forEach((doc) => {
    const data = doc.data();

    if (leaderEmails.includes(data.email?.toLowerCase())) {
      // Ensure we're only processing documents with a leaderEmail in the list
      processedCount++;
      matchedEmails.add(data.email?.toLowerCase());

      const selectedData = {
        teamName: data.teamName || '',
        leadName: data.name || '',
        gender: data.gender || '',
        college: data.college || '',
        department: data.department || '',
        email: data.email || '',
        phoneNo: data.phone || '',
        psid: data.psid || '',
        psTitle: data.psTitle || '',
        state: data.state || '',
        teamCount: data.teamCount || 0,
        teamMembers: (data.teamMembers || [])
          .map((member) => member.name)
          .join(', '), // Join names as a comma-separated string
      };

      worksheet.addRow(selectedData);
    }
  });

  console.log(
    `Total matched and processed leader emails: ${processedCount} out of ${leaderEmails.length}`
  );

  // Determine the unmatched emails
  const unmatchedEmails = leaderEmails.filter(
    (email) => !matchedEmails.has(email)
  );
  console.log('Emails not included in the Excel file:');
  console.log(unmatchedEmails.join(', '));

  // Save Excel file
  await workbook.xlsx.writeFile('filtered-data.xlsx');
  console.log('Data exported to filtered-data.xlsx');
}

exportSelectedFieldsToExcel().catch(console.error);
