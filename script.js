
// all contacts is store in an array 
let contacts = [];

// access HTML elements by using getElementById()
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");
const contactCount = document.getElementById("contactCount");


// section that used related functions for add new contact form
// this function will be executed when add contact button is clicked indicate the form is submitted
contactForm.addEventListener("submit", function(event) {

    // this to prevent the page from refreshing
    event.preventDefault();

    // get values from the all form fields
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const street = document.getElementById("street").value;
    const state = document.getElementById("state").value;
    const postcode = document.getElementById("postcode").value;
    const description = document.getElementById("description").value;

    // create a new contact object
    const contact = {

        // Date.now() creates a simple unique ID
        id: Date.now(),

        name: name,
        phone: phone,
        email: email,

        // Address contains Street + State + Postcode
        address: {
            street: street,
            state: state,
            postcode: postcode
        },

        description: description
    };

    // this function is used to add the contact object into the array
    contacts.push(contact);

    // this is to display updated contacts after it is added into the array
    displayContacts(contacts);

    // this function used to clear the form after adding
    contactForm.reset();

});


// section that used related functions for display contacts after it is added into the array
// this function used to displays the contacts that have been added 
function displayContacts(contactArray) {

    // clear previous content
    contactList.innerHTML = "";

    // update contact count based on the number of contacts in the array
    contactCount.textContent = contactArray.length + " contacts";

    // display a message to inform the user which indicate there is no contact consists in the array 
    if (contactArray.length === 0) {

        contactList.innerHTML = `
            <div class="empty">
                No contacts found.
            </div>
        `;

        return;
    }


    // looping through every contact
    contactArray.forEach(function(contact) {

        // create HTML for each contact
        const contactDiv = document.createElement("div");

        contactDiv.className = "contact";

        contactDiv.innerHTML = `
            <h3>${contact.name}</h3>
            <p><strong>📞 Phone:</strong> ${contact.phone}</p>
            <p><strong>✉️ Email:</strong> ${contact.email}</p>
            <p>
                <strong>📍 Address:</strong>
                ${contact.address.street},
                ${contact.address.state},
                ${contact.address.postcode}
            </p>
            <p>
                <strong>📝 Description:</strong>
                ${contact.description || "No description"}
            </p>

            <button class="delete-btn" onclick="deleteContact(${contact.id})">
                Delete
            </button>
        `;

        // add the contact to the webpage
        contactList.appendChild(contactDiv);

    });
}


// section that used related functions for search contact that is contain in the array
searchInput.addEventListener("input", function() {

    // get search text
    const searchText = searchInput.value.toLowerCase();

    // filter contacts based on name
    const filteredContacts = contacts.filter(function(contact) {

        return contact.name
            .toLowerCase()
            .includes(searchText);

    });

    // display only matching contacts
    displayContacts(filteredContacts);

});


// section that used related functions for delete contact from the array
// to delete contact using its ID.
function deleteContact(id) {

    // create a new array without the selected contact
    contacts = contacts.filter(function(contact) {

        return contact.id !== id;

    });

    // display updated contacts
    displayContacts(contacts);
}

// Show empty contact list when page first loads.
displayContacts(contacts);