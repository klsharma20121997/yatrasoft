function addTraveller(g) {
    g.preventDefault();

    document.getElementById("tableformid").style.display = 'block';

    let tableId = document.getElementById('tableformid');
    let thead = tableId.querySelector('thead');
    // let tbody = tableId.querySelector("tbody");

    if (!thead || thead.children.length === 0) {
        let createhead = tableId.createTHead();
        let head = createhead.insertRow();

        head.innerHTML = `<tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th style="width:12%;">Gender</th>
                            <th>Mobile</th>
                            <th>Upload Aadhar(optional)</th>
                            <th>Action</th>
                        </tr>`;
    }

    let createbody = tableId.createTBody();
    let createElement = createbody.insertRow();

    createElement.innerHTML = ` <td>
                        <input class="form-control" type="text" name="TravellerName"
                            placeholder="Name" id="travellername" required>
                    </td>
                    <td>
                        <input class="form-control" type="number" name="TravellerAge" placeholder="Age" id="travellerage" required>
                    </td>
                    <td>
                        <select class="mt-2" name="Gender" id="gender" required>
                            <option value="">select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">other</option>
                        </select>
                    </td>
                    <td>
                        <input class="form-control" type="text" name="TravellerMobileNumber" placeholder="mobile" id="travellermobilenumber" pattern="[6-9][0-9]{9}" title="Mobile Number is to be 10 digit. and first digit is to be 6 to 9" required>
                    </td>
                    <td>
                        <input class="form-control" type="file" name="TravellerAadhar" id="travelleraadhar">
                    </td>
                    <td class="text-center pt-3">
                        <i style="cursor:pointer; color:red;" onclick="deletemethod(this)" class="fa-solid fa-trash-can"></i>
                    </td>`;
}

var form = document.getElementById('formid');

function handleform(e) {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
    }

    e.preventDefault();

    let tablerows = document.querySelectorAll("#tableformid tbody tr");
    var Travellers = [];

    let CustomerName = document.querySelector('[name="userName"]').value;
    let CustomerMobileNumber = document.querySelector('[name="contactNumber"]').value;
    let CustomerEmailId = document.querySelector('[name="email"]').value;
    let DestinationId = document.querySelector('[name="destination"]').value;
    // let DestinationId = 4;
    let TravelDate = document.querySelector('[name="TravelDate"]').value;
    let NumTravellers = document.querySelector('[name="numberOfTravellers"]').value;
    let BookingAadharCard = document.querySelector('[name="GovernmentId"]').files[0] || null;
    let EmergencyContactName = document.querySelector('[name="contactName"]').value;
    let EmergencyContactNumber = document.querySelector('[name="EmgContactNumber"]').value;
    let EmergencyContactAadhar = document.querySelector('[name="EmgContactAadhar"]').files[0] || null;
    let CompanyCode = "PARVAT";

    let formdata = { CustomerName, CustomerMobileNumber, CustomerEmailId, DestinationId, TravelDate, NumTravellers, BookingAadharCard, EmergencyContactName, EmergencyContactNumber, EmergencyContactAadhar, CompanyCode };

    tablerows.forEach(row => {
        let Name = row.querySelector('[name="TravellerName"]').value;
        let Age = row.querySelector('[name="TravellerAge"]').value;
        let Gender = row.querySelector('[name="Gender"]').value;
        let Mobile = row.querySelector('[name="TravellerMobileNumber"]').value;
        let fileinput = row.querySelector('[name="TravellerAadhar"]');
        let AadharCard = (fileinput && fileinput.files.length) ? fileinput.files[0] : null;

        Travellers.push({ Name, Age, Gender, Mobile, AadharCard });
    });

    formdata.Travellers = Travellers;

    const fileformData = new FormData();
    console.log(fileformData);

    fileformData.append('BookingAadharCard', BookingAadharCard);
    fileformData.append('EmergencyContactAadhar', EmergencyContactAadhar);

    let travellersAadhar = [];
    Travellers.forEach((adr) => {
        let onyAadhar = adr.AadharCard;
        travellersAadhar.push(onyAadhar);
        console.log(travellersAadhar);
    })
    fileformData.append('AadharCard', travellersAadhar);
    fileformData.append('companyCode', "PARYAT")

    // fileformData.file = EmergencyContactAadhar;
    // fileformData.companyCode = "PARYAT";

    $.ajax({
        url: 'https://api.klords.com/api/Upload/file', // Update with your API endpoint
        type: 'POST',
        data: fileformData,
        processData: false, // important!
        contentType: false, // important!
        success: function (response) {
            if (response.status == 'Success') {
                // showSuccessMessage();
                // getCompanySettings();
                console.log(response);
            }
            else {
                alert(response.status + ': Error in SaveCompanySettings.Please try again.');
            }
            console.log(response);
        },
        error: function (error) {
            // alert('Error Submitting Company Settings.Please try again.');
            console.error(error);
        }
    });



    // let url2 = "https://api.klords.com/api/Upload/file";
    // fetch(url2, {
    //     method: 'POST',
    //     body: fileformData
    // }).then((res) => {
    //     return res.json;
    // }).then((val) => {
    //     console.log("success", val);
    // }).catch((er) => {
    //     console.error(er);
    // })



    let url = "https://api.klords.com/api/Upload/booking/save";
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
    }).then((res) => {
        return res.json;
    }).then((val) => {
        console.log("success", val);
    }).catch((er) => {
        console.error(er);
    })

    console.log(formdata);

    // if (document.querySelector("#tableformid tbody") !== null) {
    //     document.querySelector("#tableformid tbody").innerHTML = '';
    //     document.getElementById('formid').reset();
    // } else {
    //     document.getElementById('formid').reset();
    // }

    // window.open(`success.html?admin=${CustomerName}`);
    //window.location.reload();
}


//delete the table row
function deletemethod(icon) {
    let row = icon.closest('tr');
    let inputs = row.querySelectorAll("input");
    let hasvalue = false;

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            hasvalue = true;
        }
    })

    if (hasvalue) {
        if (confirm('Are you sure you want to delete this row?')) {
            row.remove();  // delete only if user confirms
        }
    } else {
        row.remove(); // delete directly if no values
    }

}

//for display the destination
// let arr = [
//     "CHAKRATA TIGERFALL",
//     "CHOPTA TUNGNATH 2N/3D",
//     "HAMPTA PASS TREK",
//     "HARSHIL VALLEY & GARTANG GALI 2N/3D",
//     "KANATAL & TEHRI LAKE",
//     "KASOL & TOSH 2N/3D",
//     "KASOL & KHEERGANGA 2N/3D",
//     "KEDARNATH & BADRINATH with TUNGNATH (Do Dham Yatra)",
//     "KEDARNATH & BADRINATH (Delhi to Delhi)6d/5n",
//     "KEDARNATH & BADRINATH (Delhi to Delhi)5d/4n",
//     "KEDARNATH & BADRINATH (4N/5D) Yatra",
//     "Kedarnath & Tungnath(3N/4D) Ex-Delhi",
//     "KEDARNATH & TUNGNATH (3N/4D) | Ex - Haridwar",
//     "KEDARNATH (3N/4D) Yatra",
//     "KEDARNATH (3N/4D) Yatra",
//     "MADHMAHESHWAR (3N/4D) Yatra",
//     "Manali, Rohtang & Kasol (2N/3D)",
//     "Manali, Rohtang & Kasol (3N/4D)",
//     "Manali, Sissu & Kasol (2N/3D)",
//     "Manali, Sissu & Kasol (3N/4D)",
//     "McLeodganj & Triund Trek (2N/3D)",
//     "Mukteshwar & Kainchi Dham (2N/3D)",
//     "Spiti Valley (6N/7D)",
//     "Udaipur & Mount Abu (3N/4D)",
//     "Udaipur & Kumbhalgarh (3N/4D)",
//     "Valley of Flowers Trek (6D/5N)",
//     "Yulla Kanda Trek (5D/4N)"
// ];
// let selectdestination = document.getElementById('destination');
// arr.forEach((row) => {
//     let option = document.createElement('option');
//     option.value = row;
//     option.textContent = row;
//     selectdestination.appendChild(option);
// })

document.getElementById('traveldate').addEventListener('blur', () => {
    let traveldatevalue = document.getElementById('traveldate').value;
    let dateobj = new Date(traveldatevalue);

    let todaydate = new Date();
    // todaydate.setHours(0,0,0,0);

    if (dateobj <= todaydate) {
        document.getElementById('traveldate').value = "";
        alert("Plz enter upcoming travel date");
    }
})

// for select the destination from api

// function LoadDestinations() {
//     let formdata = { companycode: "PARVAT" };
//     let URL = "https://api.klords.com/api/User/DestinationList";

//     fetch(URL, {
//         method: "POST",
//         header: { 'content-type': 'application/json' },
//         body: JSON.stringify(formdata)
//     }).then((response) => {
//         // return response.json();
//         if (response != null) {
//             //  BindDestinationData(response);
//             console.log(response)
//         }
//     })
//         //    .then((val)=>{
//         //       if(val != null){
//         //         BindDestinationData(val);
//         //         console.log(val);
//         //     }
//         //    })
//         .catch((err) => {
//             console.error(err);
//         })
// }

//  apiUrl = 'http://localhost:5226/api/';
apiUrl = 'https://api.klords.com/api/';

function LoadDestinations() {
    return new Promise((resolve, reject) => {
        // let userDetails = getFromLocalStorage('LogedInUser');
        const formData = { companyCode: "PARYAT" };

        $.ajax({
            url: apiUrl + 'User/DestinationList', // Update with your API endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                if (response != null) {
                    // console.log(response);
                    BindDestinationData(response);
                    resolve(true); // Resolve the promise with true on success
                } else {
                    resolve(false); // Resolve with false if response is null
                }
            },
            error: function (error) {
                alert('Error in LoadDestinations. Please try again.');
                console.error(error);
                reject(error); // Reject the promise on error
            }
        });
    });
}

function BindDestinationData(destinationData) {
    const ddlDestination = document.getElementById("destination");
    ddlDestination.innerHTML = '<option value="">Select destination</option>';

    // Populate the dropdown with API response
    destinationData.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination.destinationId; // Assuming your API returns an object with 'value'
        option.textContent = destination.destinationName; // Assuming your API returns an object with 'label'
        ddlDestination.appendChild(option);
    });
}
