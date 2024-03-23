$(document).ready(function () {
    // Retrieve records from local storage or initialize as empty array
    var records = JSON.parse(localStorage.getItem('records')) || [];
    // Initialize DataTable with retrieved records
    var table = $('#projectTable').DataTable({
        "data": records,
        "responsive":true,
        "columns": [
            { "data": "projectTitle" },
            { "data": "companyName" },
            { "data": "projectManager" },
            { "data": "date" },
            //{ "defaultContent": "<button class='btn btn-primary btn-edit'>Edit</button>" },
            {
                "defaultContent": "<button class='btn btn-primary btn-edit'>Editar</button> <button class='btn btn-danger btn-delete'>Excluir</button>"
            }
        ],
        "columnDefs": [{
            "targets": -1,
            "orderable": false,
            "className": "dt-body-center" // Center align the button
        }]
    });

    // Extract data from DataTable
    var data = $('#projectTable').DataTable().rows().data().toArray();
    console.log("Data from DataTable:", data);
    var numRecords = 50;
    var startDate = '2024-03-01';
    var endDate = '2024-03-31';

    var chartData = generateChartData(numRecords, startDate, endDate);

    console.log("Random chart data:", chartData);


    // Create Highcharts line chart
    Highcharts.chart('lineChartContainer', {
        chart: {
            type: 'line'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Projectos'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        series: [{
            name: 'Projectos',
            data: chartData
        }]
    });

    // Edit button
    $('#projectTable tbody').on('click', 'button.btn-edit', function () {
        var data = table.row($(this).parents('tr')).data();
        var row = $(this).parents('tr');
        openEditModal(data, row, table, records);
    });

    // Delete button
    $('#projectTable tbody').on('click', 'button.btn-delete', function () {
        var data = table.row($(this).parents('tr')).data();
        deleteRecord(data, table);
    });

    // Create button
    $('#createRecord').on('click', function () {
        openCreateModal();
    });
});



// Function to open create modal
function openCreateModal() {
    var currentDate = new Date().toISOString().slice(0, 16);
    var modalContent = `
        <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">Create Project</h5>
                      
                    </div>
                    <div class="modal-body">
                        <form id="createForm">
                            <div class="form-group">
                                <label for="createProjectTitle">título do projeto</label>
                                <input type="text" class="form-control" id="createProjectTitle">
                            </div>
                            <div class="form-group">
                                <label for="createCompanyName">nome da empresa</label>
                                <input type="text" class="form-control" id="createCompanyName">
                            </div>
                            <div class="form-group">
                                <label for="createProjectManager">gestor de projeto</label>
                                <input type="text" class="form-control" id="createProjectManager">
                            </div>
                            <div class="form-group">
                                <label for="createDate">Date</label>
                                <input type="text" class="form-control" id="createDate" value="${currentDate}" readonly>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        
                        <button type="button" class="btn btn-primary" id="saveRecord">Save Record</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(modalContent);
    $('#createModal').modal('show');

    // Save record button click event
    $('#saveRecord').click(function () {
        var newRecord = {
            projectTitle: $('#createProjectTitle').val(),
            companyName: $('#createCompanyName').val(),
            projectManager: $('#createProjectManager').val(),
            date: currentDate // Set to current date
        };
        // Add new record to records array
        var records = JSON.parse(localStorage.getItem('records')) || [];
        records.push(newRecord);
        localStorage.setItem('records', JSON.stringify(records));
        // Add new row to DataTable
        $('#projectTable').DataTable().row.add(newRecord).draw();
        // Close modal
        $('#createModal').modal('hide');
    });

    // Remove modal from DOM when closed
    $('#createModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });
}

function deleteRecord(data) {
    var confirmation = confirm("Are you sure you want to delete this record?");
    if (confirmation) {
        var records = JSON.parse(localStorage.getItem('records')) || [];
        records = records.filter(function (record) {
            return !(record.projectTitle === data.projectTitle && record.companyName === data.companyName && record.projectManager === data.projectManager && record.date === data.date);
        });
        localStorage.setItem('records', JSON.stringify(records));
        $('#projectTable').DataTable().clear().rows.add(records).draw();
    }
}
// Function to open edit modal
function openEditModal(data, row, table, records) {
    var modalContent = `
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Project</h5>
                    </div>
                    <div class="modal-body">
                        <form id="editForm">
                            <div class="form-group">
                                <label for="editProjectTitle">título do projeto</label>
                                <input type="text" class="form-control" id="editProjectTitle" value="${data.projectTitle}">
                            </div>
                            <div class="form-group">
                                <label for="editCompanyName">nome da empresa</label>
                                <input type="text" class="form-control" id="editCompanyName" value="${data.companyName}">
                            </div>
                            <div class="form-group">
                                <label for="editProjectManager">gestor de projeto</label>
                                <input type="text" class="form-control" id="editProjectManager" value="${data.projectManager}">
                            </div>
                            <div class="form-group">
                                <label for="editDate">Date</label>
                                <input type="text" class="form-control" id="editDate" value="${data.date}" readonly>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="saveEdit">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('body').append(modalContent);
    $('#editModal').modal('show');

    // Save changes button click event
    $('#saveEdit').click(function () {
        var newData = {
            projectTitle: $('#editProjectTitle').val(),
            companyName: $('#editCompanyName').val(),
            projectManager: $('#editProjectManager').val(),
            date: $('#editDate').val()
        };
        var newDataIndex = records.findIndex(record => record.projectTitle === data.projectTitle && record.companyName === data.companyName && record.projectManager === data.projectManager && record.date === data.date);
        records[newDataIndex] = newData; // Update record in local storage
        localStorage.setItem('records', JSON.stringify(records));
        table.row(row).data(newData).draw(); // Update DataTable row
        $('#editModal').modal('hide');
    });

    // Remove modal from DOM when closed
    $('#editModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });

    // Remove modal from DOM when closed
    $('#editModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });
}
function generateChartData(numRecords, startDate, endDate) {
    // Generate random records
    var records = generateRandomRecords(numRecords, startDate, endDate);

    // Aggregate data by day
    var recordsPerDay = {};
    records.forEach(function (record) {
        var date = record.date.split('T')[0]; // Extract date part
        if (recordsPerDay[date]) {
            recordsPerDay[date]++;
        } else {
            recordsPerDay[date] = 1;
        }
    });

    // Format data for Highcharts
    var chartData = [];
    Object.keys(recordsPerDay).forEach(function (date) {
        chartData.push([Date.parse(date), recordsPerDay[date]]);
    });

    // Sort chart data by date
    chartData.sort(function (a, b) {
        return a[0] - b[0];
    });

    return chartData;
}

// Function to generate random records
function generateRandomRecords(numRecords, startDate, endDate) {
    var records = [];
    var currentDate = new Date(startDate);
    var endDateObj = new Date(endDate);

    while (currentDate <= endDateObj && numRecords > 0) {
        var numRecordsPerDay = Math.floor(Math.random() * 5) + 1; // Random number of records per day (1 to 5)
        for (var i = 0; i < numRecordsPerDay && numRecords > 0; i++) {
            records.push({
                projectTitle: 'Project ' + (records.length + 1),
                companyName: 'Company ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
                projectManager: 'Manager ' + (records.length + 1),
                date: new Date(currentDate.getTime() + Math.random() * 86400000).toISOString() // Random time within the day
            });
            numRecords--;
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return records;
}