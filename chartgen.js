// Add this to your existing app.js or create a new client-side JavaScript file

function populateMonthSelector() {
    const monthSelector = document.getElementById('monthSelector');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelector.appendChild(option);
    });
}

async function viewWeeklyData() {
    const weeklyDataContainer = document.getElementById('weeklyDataContainer');
    weeklyDataContainer.style.display = 'block';
    
    try {
        const response = await fetch('/api/bookings/view-weekly-data');
        const data = await response.json();
        
        populateMonthSelector();
        updateWeeklyData();
    } catch (error) {
        console.error('Error fetching weekly data:', error);
    }
}

async function updateWeeklyData() {
    const monthSelector = document.getElementById('monthSelector');
    const selectedMonth = monthSelector.value;
    
    try {
        const response = await fetch('/api/bookings/view-weekly-data');
        const allData = await response.json();
        const monthData = allData.filter(week => week.month === selectedMonth);
        
        updateWeekButtons(monthData);
        updateWeeklyChart(monthData);
    } catch (error) {
        console.error('Error updating weekly data:', error);
    }
}

function updateWeekButtons(data) {
    const weekButtonsContainer = document.getElementById('weekButtonsContainer');
    weekButtonsContainer.innerHTML = '';
    
    data.forEach(week => {
        const button = document.createElement('button');
        button.textContent = `Week ${week.week}`;
        button.onclick = () => updateWeeklyChart([week]);
        weekButtonsContainer.appendChild(button);
    });
}

function updateWeeklyChart(data) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['LT1', 'LT2', 'LT3', 'LT4'],
            datasets: data.map(week => ({
                label: `Week ${week.week}`,
                data: [week.ltHours.LT1, week.ltHours.LT2, week.ltHours.LT3, week.ltHours.LT4],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40
                }
            }
        }
    });
}

// Call this function when the page loads
populateMonthSelector();