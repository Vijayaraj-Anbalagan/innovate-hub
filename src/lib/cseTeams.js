const admin = require('firebase-admin');
const serviceAccount = require('./adminConfig.json'); // Replace with your service account file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const ExcelJS = require('exceljs');

// Function to determine paid status based on email criteria
const determinePaidStatus = (email) => {
  const domain = email.split('@')[1]; // Get domain part after @
  const departmentCode = email.slice(4, 7); // Get characters at index 4, 5, 6 for department code
  const isCseStudent = email[2] === 'c' && email[3] === 's'; // Check if cs is at index 2, 3

  if (
    domain === 'kcgcollege.com' &&
    (isCseStudent || departmentCode === '104' || departmentCode === '128')
  ) {
    return true;
  }
  return null;
};

async function exportExternalParticipantsToExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('External Participants');

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
    const emailStatus = determinePaidStatus(data.email); // Determine paid status based on email

    if (emailStatus === true && data.paid === true) {
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
        teamCount: data.teamCount,
        teamMembers: (data.teamMembers || [])
          .map((member) => member.name)
          .join(', '), // Join names as a comma-separated string
      };

      worksheet.addRow(selectedData);
    }
  });

  // Save Excel file
  try {
    await workbook.xlsx.writeFile('cse-participant.xlsx');
    console.log('Data exported to external-participant.xlsx');
  } catch (error) {
    console.error('Error writing to Excel file:', error);
  }
}

exportExternalParticipantsToExcel().catch(console.error);
