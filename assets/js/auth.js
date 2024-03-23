$('#btnSignIn').click(function () {
    let loginUserEmail = $('#txtSignInEmail').val();
    let loginPassword = $('#txtSignInPassword').val();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(loginUserEmail)){
        $.ajax({
            url: `http://localhost:9090/api/v1/patient/search?email=${loginUserEmail}`,
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (res) {

                if (res.email === loginUserEmail) {
                    if (res.password === loginPassword) {
                        localStorage.setItem('patientID', res.patientID);
                        alert('Login Success!')
                        window.location.replace('../../abc_lab_fe/pages/patient.html');
                    } else {
                        alert("Password Invalid!");
                    }
                } else {
                    alert("Patient Not Register!");
                }
            },
            error: function (ob, textStatus, error) {
                alert("Patient Not Register!");
            }
        });
    }else {
        const jsonData = {
            "id": 1,
            "username": loginUserEmail,
            "password": loginPassword,
            "role": 'Admin'
        };

        $.ajax({
            method: "POST",
            url: "http://localhost:9090/api/v1/login",
            contentType: "application/json",
            data: JSON.stringify(jsonData),
            success: function (res) {
                if (res.data === null) {
                    alert('Login Fail!')
                } else {
                    alert('Login Success!')
                    window.location.href = "../../../abc_lab_fe/pages/admin.html";
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error:", xhr, textStatus);
            }
        });
    }
});

$('#btnSignUp').click(function () {

    let paName = $('#txtSignUpFullName').val();
    let paEmail = $('#txtSignUpEmail').val();
    let paAge = $('#txtSignUpAge').val();
    let paContact = $('#txtSignUpContact').val();
    let paPassword = $('#txtSignUpPassword').val();

    $.ajax({
        method: "POST",
        url: "http://localhost:9090/api/v1/patient/add",
        dataType: 'Json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            "patientid": 0,
            "fullName": paName,
            "age": paAge,
            "contactNumber": paContact,
            "email": paEmail,
            "password": paPassword
        }),
        success: function (res) {
            if (res.code === '200'){
                alert('Sign Up Success!')
                window.location.href = "../../../abc_lab_fe/index.html";
            }
        },
        error: function (ob, textStatus, error) {
            alert("Sign Up Fail!")
        }
    });
});

