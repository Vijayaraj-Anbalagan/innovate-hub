const admin = require('firebase-admin');
const serviceAccount = require('./adminConfig.json'); // Replace with your service account file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const ExcelJS = require('exceljs');

async function exportValidDocumentsToExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Filtered Data');

  // Define your Firestore collection path
  const collectionPath = 'users'; // Replace with your actual collection name
  const snapshot = await db.collection(collectionPath).get();

  if (snapshot.empty) {
    console.log('No documents found in the collection.');
    return;
  }

  // Define headers for the specific fields you want to export
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Gender', key: 'gender', width: 10 },
    { header: 'College', key: 'college', width: 50 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone No', key: 'phoneNo', width: 15 },
    { header: 'PSID', key: 'psid', width: 20 },
    { header: 'PSTitle', key: 'psTitle', width: 30 },
    { header: 'State', key: 'state', width: 20 },
    { header: 'Team Count', key: 'teamCount', width: 15 },
    { header: 'Team Members', key: 'teamMembers', width: 100 },
  ];

  // Filter documents and select specific fields
  snapshot.forEach((doc) => {
    const data = doc.data();

    // Ensure we're only processing documents with 'paid' set to true
    if (data.paid === true) {
      // Check if teamCount is defined and matches the length of teamMembers
      const teamMembers = data.teamMembers || [];
      const teamCount = data.teamCount || 0;

      console.log(teamMembers)
      if (teamCount > 0 && teamMembers.length === teamCount) {
        const selectedData = {
          name: data.name || '',
          gender: data.gender || '',
          college: data.college || '',
          department: data.department || '',
          email: data.email || '',
          phoneNo: data.phone || '',
          psid: data.psid || '',
          psTitle: data.psTitle || '',
          state: data.state || '',
          teamCount: teamCount,
          teamMembers: teamMembers.map((member) => member.name).join(', '), // Join names as a comma-separated string
        };

        worksheet.addRow(selectedData);
      }
    }
  });

  // Save Excel file
  await workbook.xlsx.writeFile('valid-documents-data.xlsx');
  console.log('Data exported to valid-documents-data.xlsx');
}

exportValidDocumentsToExcel().catch(console.error);
