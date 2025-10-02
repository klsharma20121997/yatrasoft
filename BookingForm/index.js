
//apiUrl = 'http://localhost:5226/api/';
apiUrl = 'https://api.klords.com/api/';
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
                        <i style="cursor:pointer; color:red;" onclick="deleteTraveller(this)" class="fa-solid fa-trash-can"></i>
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
    let EmergencyAadharCard = document.querySelector('[name="EmgContactAadhar"]').files[0] || null;
    let CompanyCode = "PARVAT";

    let saveFormPayload = { CustomerName, CustomerMobileNumber, CustomerEmailId, DestinationId, TravelDate, NumTravellers, BookingAadharCard, EmergencyContactName, EmergencyContactNumber, EmergencyAadharCard, CompanyCode };

    tablerows.forEach(row => {
        let Name = row.querySelector('[name="TravellerName"]').value;
        let Age = row.querySelector('[name="TravellerAge"]').value;
        let Gender = row.querySelector('[name="Gender"]').value;
        let Mobile = row.querySelector('[name="TravellerMobileNumber"]').value;
        let fileinput = row.querySelector('[name="TravellerAadhar"]');
        let AadharCard = (fileinput && fileinput.files.length) ? fileinput.files[0] : null;

        Travellers.push({ Name, Age, Gender, Mobile, AadharCard });
    });

    
    const fileformData = new FormData();
    fileformData.append('BookingAadharCard', BookingAadharCard);
    fileformData.append('EmergencyAadharCard', EmergencyAadharCard);
    Travellers.forEach((adr,index) => {
        fileformData.append('AadharCard_'+index, adr.AadharCard);
    })
    
    $.ajax({
        url: apiUrl + 'Upload/file', // Update with your API endpoint
        type: 'POST',
        data: fileformData,
        processData: false, // important!
        contentType: false, // important!
        success: function (response) {
            if (response.status == 'Success') {
                console.log(response);
                if(response.fileLists && response.fileLists.length > 0){
                    response.fileLists.forEach(row => {
                        if(row.fileOrginalName === 'BookingAadharCard'){
                            saveFormPayload.BookingAadharCard = row.filePath;
                        }
                        else if(row.fileOrginalName === 'EmergencyAadharCard'){
                            saveFormPayload.EmergencyAadharCard = row.filePath;
                        }
                        else {
                            let index = row.fileOrginalName.split("_").pop();
                            Travellers[index].AadharCard = row.filePath;
                        }
                    });
                    saveFormPayload.Travellers = Travellers;
                }
                SaveBookingDetails(saveFormPayload);
            }
            else {
                alert(response.status + ': Error in SaveBookingDetails.Please try again.');
            }
            console.log(response);
        },
        error: function (error) {
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



    // let url = "https://api.klords.com/api/Upload/booking/save";
    // fetch(url, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(saveFormPayload)
    // }).then((res) => {
    //     return res.json;
    // }).then((val) => {
    //     console.log("success", val);
    // }).catch((er) => {
    //     console.error(er);
    // })

    // console.log(formdata);

    // if (document.querySelector("#tableformid tbody") !== null) {
    //     document.querySelector("#tableformid tbody").innerHTML = '';
    //     document.getElementById('formid').reset();
    // } else {
    //     document.getElementById('formid').reset();
    // }

    // window.open(`success.html?admin=${CustomerName}`);
    //window.location.reload();
}

//Save Booking Details
 function SaveBookingDetails(payload) {
    $.ajax({
        url: apiUrl + 'Upload/booking/save', // Update with your API endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            alert('Error SaveBookingDetails.Please try again.');
        }
    });
 }

//delete the table row
function deleteTraveller(icon) {
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


document.getElementById('traveldate').addEventListener('blur', () => {
    let traveldatevalue = document.getElementById('traveldate').value;
    let dateobj = new Date(traveldatevalue);
    let todaydate = new Date();

    if (dateobj < todaydate) {
        document.getElementById('traveldate').value = "";
        alert("Plz enter upcoming travel date");
    }
})

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
