// Function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create the table dynamically
function createTable() {
    // Define the column headings
    const columnHeadings = [
        '3 MESES', '6 MESES', '9 MESES', '12 MESES',
        '15 MESES', '18 MESES', '21 MESES', '24 MESES',
        '27 MESES', '30 MESES', '33 MESES', '36 MESES'
    ];

    // Get the container where the sub-tables will be appended
    const container = document.getElementById('tableRow');

    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const numberOfColumns = 4; // Number of columns to distribute sub-tables

    // Calculate the number of sub-tables per column
    const numTablesPerColumn = Math.ceil(columnHeadings.length / numberOfColumns);

    // Loop through each column
    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        // Create column element
        const column = document.createElement('div');
        column.className = 'col'; // Bootstrap column class

        // Loop through sub-tables for this column
        for (let i = colIndex * numTablesPerColumn; i < Math.min((colIndex + 1) * numTablesPerColumn, columnHeadings.length); i++) {
            const heading = columnHeadings[i];

            // Create card element
            const card = document.createElement('div');
            card.className = 'card mb-3'; // Add margin-bottom

            // Create card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Create card header
            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header';
            cardHeader.textContent = heading;
            cardBody.appendChild(cardHeader);

            // Create the sub-table
            const subTable = document.createElement('table');
            subTable.className = 'sub-table table table-bordered'; // Bootstrap table classes

            // Generate headings for the sub-table
            // Generate headings for the sub-table
            // Generate headings for the sub-table
            // Generate headings for the sub-table
            const subTableHeadings = [];
            for (let j = 0; j < 3; j++) {
                const month = (currentMonth + j + (i * 3)) % 12; // Cycle through months, adjust for each header
                const year = currentYear + Math.floor((currentMonth + j + (i * 3)) / 12); // Increment year if necessary
                const monthAndYear = new Date(year, month).toLocaleString('pt-BR', { month: 'long', year: 'numeric' }); // Use Portuguese locale
                const isCurrent = month === currentMonth && year === currentYear;
                subTableHeadings.push({ name: monthAndYear, isCurrentMonth: isCurrent });
            }



            // Create header row for sub-table
            const subTableHeaderRow = document.createElement('tr');
            subTableHeadings.forEach(({ name, isCurrentMonth }) => {
                const th = document.createElement('th');
                th.textContent = name;
                if (isCurrentMonth) {
                    // card.classList.add('bg-success'); //text-white 
                    //card.classList.add('bg-success');
                }
                subTableHeaderRow.appendChild(th);
            });
            subTable.appendChild(subTableHeaderRow);

           // Generate random data for sub-table
// Generate random data for sub-table
for (let j = 0; j < 1; j++) { // Assuming 10 rows for demonstration
    const subTableRow = document.createElement('tr');
    subTableHeadings.forEach(() => {
        const subTableCell = document.createElement('td');
        const randomValue = getRandomInt(0, 100); // Random value
        subTableCell.textContent = randomValue;
        subTableCell.addEventListener('click', function() {
            showModal(randomValue);
        });
        subTableRow.appendChild(subTableCell);
    });
    subTable.appendChild(subTableRow);
}

            // Append sub-table to card body
            cardBody.appendChild(subTable);

            // Append card body to card
            card.appendChild(cardBody);

            // Append card to column
            column.appendChild(card);
        }

        // Append column to container
        container.appendChild(column);
    }
}

// Call createTable function when the document is ready
$(document).ready(function () {
    createTable();

    // Initialize DataTables.js
    $('#myTable').DataTable({
        "paging": false,
        "searching": false,
        "responsive": true
    });
});

// Function to show modal
// Function to show modal
function showModal(randomValue) {
    // Delete existing modal if present
    const existingModal = document.getElementById('myModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';

    // Modal content
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Colaboradores</h4>
                    
                </div>
                <div class="modal-body">
                    <table id="peopleTable" class="table nowrap">
                        <thead>
                            <tr>
                            <th>Photo</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>CP*F</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);

    // Initialize DataTables.js for the table
   // Initialize DataTables.js for the table
$('#peopleTable').DataTable({
    "paging": true,
    "searching": false,
    "responsive": true,
    "data": generateDummyData(randomValue),
    "columns": [
        { "data": "photoURL",
            "render": function(data) {
                if (data) {
                    return '<img src="' + data + '" width="50" height="50">';
                } else {
                    return '<img src="placeholder.jpg" width="50" height="50">'; // Use a placeholder image
                }
            }
        },
        { "data": "name" },
        { "data": "surname" },
        { "data": "idNumber" },
        
    ]
});


    // Show modal
    $('#myModal').modal('show');
}

// Function to generate random dummy data
// Function to generate random dummy data
function generateDummyData(quantity) {
    const data = [];
    const genders = ['men', 'women'];
    const nationalities = ['BR']; // Example nationalities
    for (let i = 0; i < quantity; i++) {
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
        const name = faker.name.firstName(gender);
        const surname = faker.name.lastName();
        const idNumber = getRandomInt(10000000, 99999999); // Generate random ID number
        const photoURL = `https://randomuser.me/api/portraits/${gender}/${i}.jpg`; // Random user profile photo URL
        data.push({
            "photoURL": photoURL,
            "name": name,
            "surname": surname,
            "idNumber": idNumber,
            
        });
    }
    return data;
}
