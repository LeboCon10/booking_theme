const cron = require('node-cron');

function clearBookingTable() {
  // Get the table body element
  const tableBody = document.getElementById('bookingTable').getElementsByTagName('tbody')[0];

  // Clear the table body
  tableBody.innerHTML = '';
}

// Schedule the job to run every Friday at 11:30am SAST
cron.schedule('30 11 * * 5', () => {
  clearBookingTable();
  console.log('Booking table cleared at', new Date().toLocaleString());
});