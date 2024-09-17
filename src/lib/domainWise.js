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

async function DomainWiseParticipantsToExcel() {
  const workbook = new ExcelJS.Workbook();

  // Define separate worksheets for different PSID types
  const wdWorksheet = workbook.addWorksheet('WD Participants');
  const aiWorksheet = workbook.addWorksheet('AI Participants');
  const csWorksheet = workbook.addWorksheet('CS Participants');
  const arWorksheet = workbook.addWorksheet('AR Participants');
  const openWorksheet = workbook.addWorksheet('PS-OPEN Participants'); // New worksheet for PS-OPEN

  // Define headers for each worksheet
  const worksheetColumns = [
    { header: 'Team Name', key: 'teamName', width: 30 },
    { header: 'Lead Name', key: 'name', width: 30 },
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
    { header: 'Domain', key: 'domain', width: 50 }, // Add Domain for PS-OPEN participants
  ];

  // Apply headers to all worksheets
  wdWorksheet.columns = worksheetColumns;
  aiWorksheet.columns = worksheetColumns;
  csWorksheet.columns = worksheetColumns;
  arWorksheet.columns = worksheetColumns;
  openWorksheet.columns = worksheetColumns; // Apply to PS-OPEN sheet

  // Define your Firestore collection path
  const collectionPath = 'users'; // Replace with your actual collection name
  const snapshot = await db.collection(collectionPath).get();

  if (snapshot.empty) {
    console.log('No documents found in the collection.');
    return;
  }

  // Filter documents based on PSID and add to the respective sheet
  snapshot.forEach((doc) => {
    const data = doc.data();
    const emailStatus = determinePaidStatus(data.email); // Determine paid status based on email

    if (data.paid === true) {
      const selectedData = {
        teamName: data.teamName || '',
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

      // Handle PS-OPEN case separately
      if (data.psid === 'PS-OPEN') {
        let domain = 'TBD'; // Default value for domain
        if (data.os && data.os.includes(':')) {
          domain = data.os.split(':')[1].trim(); // Get string after ':' if it exists
        }
        selectedData.domain = domain; // Add domain to selectedData
        openWorksheet.addRow(selectedData); // Add to PS-OPEN worksheet
      } else if (data.psid.includes('WD')) {
        wdWorksheet.addRow(selectedData);
      } else if (data.psid.includes('AI')) {
        aiWorksheet.addRow(selectedData);
      } else if (data.psid.includes('CS')) {
        csWorksheet.addRow(selectedData);
      } else if (data.psid.includes('AR')) {
        arWorksheet.addRow(selectedData);
      }
    }
  });

  // Save Excel file
  try {
    await workbook.xlsx.writeFile('participants.xlsx');
    console.log('Data exported to participants.xlsx');
  } catch (error) {
    console.error('Error writing to Excel file:', error);
  }
}

DomainWiseParticipantsToExcel().catch(console.error);
