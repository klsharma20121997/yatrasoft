function addTraveller(g) {
    g.preventDefault();

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
    var data = [];
    var formdata = [];

    let fullname = document.querySelector('[name="userName"]').value;
    let contactnumber = document.querySelector('[name="contactNumber"]').value;
    let email = document.querySelector('[name="email"]').value;
    let destination = document.querySelector('[name="destination"]').value;
    let traveldate = document.querySelector('[name="TravelDate"]').value;
    let numberoftravellers = document.querySelector('[name="numberOfTravellers"]').value;
    let governmentid = document.querySelector('[name="GovernmentId"]').value;
    let EmgContactname = document.querySelector('[name="contactName"]').value;
    let EmgContactnumber = document.querySelector('[name="EmgContactNumber"]').value;
    let EmgContactAadhar = document.querySelector('[name="EmgContactAadhar"]').value;

     formdata.push({fullname, contactnumber, email, destination, traveldate, numberoftravellers, governmentid, EmgContactname, EmgContactnumber, EmgContactAadhar});

    // let fullname = document.getElementById("fullname").value;
    // let contactnumber = document.getElementById("contactnumber").value;
    // let email = document.getElementById("email").value;
    // let destination = document.getElementById("destination").value;
    // let traveldate = document.getElementById("traveldate").value;
    // let numberoftravellers = document.getElementById("numberoftravellers").value;
    // let governmentid = document.getElementById("governmentid").files[0];
    // let EmgContactname = document.getElementById("EmgContactname").value;
    // let EmgContactnumber = document.getElementById("EmgContactnumber").value;
    // let EmgContactAadhar = document.getElementById("EmgContactAadhar").files[0];

    tablerows.forEach(row => {
        let travellername = row.querySelector('[name="TravellerName"]').value;
        let travellerage = row.querySelector('[name="TravellerAge"]').value;
        let travellergender = row.querySelector('[name="Gender"]').value;
        let travellermobilenumber = row.querySelector('[name="TravellerMobileNumber"]').value;
        let fileinput = row.querySelector('[name="TravellerAadhar"]');
        let travelleraadhar = (fileinput && fileinput.files.length) ? fileinput.files[0] : null;

        data.push({ travellername, travellerage, travellergender, travellermobilenumber, travelleraadhar });
    });
    console.log(data);
    console.log(formdata);

    // let arr = [fullname, contactnumber, email, destination, traveldate, numberoftravellers, governmentid, EmgContactname, EmgContactnumber, EmgContactAadhar];


    let totalarr = [...formdata, ...data];
    console.log(totalarr);



    if (document.querySelector("#tableformid tbody") !== null) {
        document.querySelector("#tableformid tbody").innerHTML = '';
        document.getElementById('formid').reset();
    } else {
        document.getElementById('formid').reset();
    }

    window.open(`success.html?admin=${fullname}`);
    window.location.reload();

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
let arr = [
    "CHAKRATA TIGERFALL",
    "CHOPTA TUNGNATH 2N/3D",
    "HAMPTA PASS TREK",
    "HARSHIL VALLEY & GARTANG GALI 2N/3D",
    "KANATAL & TEHRI LAKE",
    "KASOL & TOSH 2N/3D",
    "KASOL & KHEERGANGA 2N/3D",
    "KEDARNATH & BADRINATH with TUNGNATH (Do Dham Yatra)",
    "KEDARNATH & BADRINATH (Delhi to Delhi)6d/5n",
    "KEDARNATH & BADRINATH (Delhi to Delhi)5d/4n",
    "KEDARNATH & BADRINATH (4N/5D) Yatra",
    "Kedarnath & Tungnath(3N/4D) Ex-Delhi",
    "KEDARNATH & TUNGNATH (3N/4D) | Ex - Haridwar",
    "KEDARNATH (3N/4D) Yatra",
    "KEDARNATH (3N/4D) Yatra",
    "MADHMAHESHWAR (3N/4D) Yatra",
    "Manali, Rohtang & Kasol (2N/3D)",
    "Manali, Rohtang & Kasol (3N/4D)",
    "Manali, Sissu & Kasol (2N/3D)",
    "Manali, Sissu & Kasol (3N/4D)",
    "McLeodganj & Triund Trek (2N/3D)",
    "Mukteshwar & Kainchi Dham (2N/3D)",
    "Spiti Valley (6N/7D)",
    "Udaipur & Mount Abu (3N/4D)",
    "Udaipur & Kumbhalgarh (3N/4D)",
    "Valley of Flowers Trek (6D/5N)",
    "Yulla Kanda Trek (5D/4N)"
];
let selectdestination = document.getElementById('destination');
arr.forEach((row) => {
    let option = document.createElement('option');
    option.value = row;
    option.textContent = row;
    selectdestination.appendChild(option);
}) 

document.getElementById('traveldate').addEventListener('blur', () => {
    let traveldatevalue = document.getElementById('traveldate').value;
    let [y, m, d] = traveldatevalue.split('-');
    let formatteddate = `${d}/${m}/${y}`;

    let tadaydate = new Date().toLocaleDateString("en-GB");
    console.log(traveldatevalue);
    console.log(formatteddate);

    if (formatteddate <= tadaydate) {
        document.getElementById('traveldate').value = "";
        alert("Plz enter upcoming travel date");
    }
})