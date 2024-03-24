function sendResult(EMAIL, ID, DATE, PID, DID, TEST_NAME, TEST_RESULT, FEE, PAY) {
    var params = {
        user_email: EMAIL,
        APP_ID: ID,
        APP_DATE: DATE,
        P_ID: PID,
        D_ID: DID,
        TEST_NAME: TEST_NAME,
        TEST_RESULT: TEST_RESULT,
        FEE: FEE,
        PAY: PAY

    }
    emailjs.send("service_yxqlr02", "template_4im4sel", params).then(function (res) {
        alert("Test Result Send Success !");
    });
}
dataSet();
testResultTableDataSet();
loadAppointmentsList(
    '#tblAppointmentResultBody',
    '#tblAppointmentResultBody tr',
    '#apResultDateTime',
    '#apResultID',
    '#apResultPatientId',
    '#apResultDoctorId',
    '#resultTestingList',
    '#apResultTestResult',
    '#apResultFee',
    '#apResultPay'
);

function downloadExcel(data, filename) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
$('#btnDownload').click(function () {

    let apResultID = $('#apResultID').val();
    let apResultDateTime = $('#apResultDateTime').val();
    let apResultPatientId = $('#apResultPatientId').val();
    let apResultDoctorId = $('#apResultDoctorId').val();
    let resultTestingList = $('#resultTestingList').val();
    let apResultTestResult = $('#apResultTestResult').val();
    let apResultFee = $('#apResultFee').val();
    let apResultPay = $('#apResultPay').val();
    
    if (apResultDoctorId.length === 0) {
        alert('Please Select Appointment!')
    } else {
        let data = [
            {
                ID: apResultID,
                DateTime: apResultDateTime,
                DoctorId: apResultDoctorId,
                PatientId: apResultPatientId,
                TestName: resultTestingList,
                TestResult: apResultTestResult,
                Fee: apResultFee,
                Pay: apResultPay
            },
        ];
        downloadExcel(data, "result.xlsx");
    }
});
$('#btnPatientAppointment').click(function () {
    $('#AppointmentPage').css({
        'display': 'block'
    });
    $('#ResultPage').css({
        'display': 'none'
    });
});
$('#btnPatientResult').click(function () {
    $('#AppointmentPage').css({
        'display': 'none'
    });
    $('#ResultPage').css({
        'display': 'block'
    });
    loadAppointmentsList(
        '#tblAppointmentResultBody',
        '#tblAppointmentResultBody tr',
        '#apResultDateTime',
        '#apResultID',
        '#apResultPatientId',
        '#apResultDoctorId',
        '#resultTestingList',
        '#apResultTestResult',
        '#apResultFee',
        '#apResultPay'
    );
});
function testResultTableDataSet() {

    const feeSelect = document.getElementById("pAppFee");
    const apResultFee = document.getElementById("apResultFee");
    const selectTestNameElement = document.getElementById("pAppTestingList");
    const resultTestingList = document.getElementById("resultTestingList");
    selectTestNameElement.innerHTML = "";
    resultTestingList.innerHTML = "";

    $.ajax({
            url: 'http://localhost:9090/api/v1/test',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (res) {
                setTestName(res, selectTestNameElement, feeSelect);
                setTestName(res, resultTestingList, apResultFee);
            }
        }
    );
}
$('#btnAppointmentResultDelete').click(function () {
    deleteAppointment('#apResultID');
    alert("Appointment Deleted!");
    clearPatientAppointment();
    loadAppointmentsList(
        '#tblAppointmentResultBody',
        '#tblAppointmentResultBody tr',
        '#apResultDateTime',
        '#apResultID',
        '#apResultPatientId',
        '#apResultDoctorId',
        '#resultTestingList',
        '#apResultTestResult',
        '#apResultFee',
        '#apResultPay'
    );
});
$('#btnAppointmentResultGetAll').click(function () {
    loadAppointmentsList(
        '#tblAppointmentResultBody',
        '#tblAppointmentResultBody tr',
        '#apResultDateTime',
        '#apResultID',
        '#apResultPatientId',
        '#apResultDoctorId',
        '#resultTestingList',
        '#apResultTestResult',
        '#apResultFee',
        '#apResultPay'
    );
});
$('#btnPayNow').click(function () {
    applyAppointment(
        '#pAppDateTime',
        '#pAppDoctorId',
        '#pAppTestingList',
        '#pAppFee',
        '#pAppPatientId',
        '',
        ''
    );
    loadAppointmentsList(
        '#tblAppointmentResultBody',
        '#tblAppointmentResultBody tr',
        '#apResultDateTime',
        '#apResultID',
        '#apResultPatientId',
        '#apResultDoctorId',
        '#resultTestingList',
        '#apResultTestResult',
        '#apResultFee',
        '#apResultPay'
    );
    closeModal();
    alert("Appointment Applying Success!")
    clearPatientAppointment();
});
$('#btnAppointmentResultUpdate').click(function () {
    updateAppointment(
        '#apResultID',
        '#apResultPatientId',
        '#apResultDateTime',
        '#apResultDoctorId',
        '#resultTestingList',
        '',
        '#apResultFee',
        ''
    )
    loadAppointmentsList(
        '#tblAppointmentResultBody',
        '#tblAppointmentResultBody tr',
        '#apResultDateTime',
        '#apResultID',
        '#apResultPatientId',
        '#apResultDoctorId',
        '#resultTestingList',
        '#apResultTestResult',
        '#apResultFee',
        '#apResultPay'
    );

    clearPatientAppointment();
});
function clearPatientAppointment() {
    $('#pAppDateTime').val('');
    $('#pAppDoctorId').val('');
}
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
function dataSet() {
    $('#pAppPatientId').val(localStorage.getItem('patientID'));
    $('#apResultPatientId').val(localStorage.getItem('patientID'));
}


