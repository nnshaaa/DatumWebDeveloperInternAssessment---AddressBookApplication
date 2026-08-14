
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
        id: Date.now(),     // Date.now() used to creates a simple unique ID for the data
        name: name,
        phone: phone,
        email: email,

        address: {                      // nested object to store address information
            street: street,
            state: state,
            postcode: postcode
        },

        description: description
    };

    // this function is used to add the contact object into the array
    contacts.push(contact);

    // to display updated contacts after it is added into the array which flow is User submits form->create object->contacts.push()->displayContacts()->UI updated
    displayContacts(contacts);

    // this function used to clear the form after adding
    contactForm.reset();

});


// section that used related functions for display contacts after it is added into the array
// this function used to displays the contacts that have been added 
function displayContacts(contactArray) {

    // to clear previous content to prevents duplicate contacts from appearing when the display function is called multiple times
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

    // looping through every item in an array
    contactArray.forEach(function(contact) {

        // create HTML for each contact
        const contactDiv = document.createElement("div");

        contactDiv.className = "contact";

        // innerHTML is used to insert or modify HTML elements
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

    // get search text entered by the user and convert it to lowercase to make case-insensitive search
    const searchText = searchInput.value.toLowerCase();

    // filter() creates a new array containing only the elements that meet a specific condition such as the only contacts whose names include in search text
    const filteredContacts = contacts.filter(function(contact) {

        return contact.name
            .toLowerCase()
            .includes(searchText);  // to checks whether a string contains a particular value like the contact name contains in the search text

    });

    // display only matching contacts
    displayContacts(filteredContacts);

});


// section that used related functions for delete contact from the array
// to delete contact using its ID
function deleteContact(id) {

    // filter() used to create a new array that contains every contact except the one with the matching ID
    contacts = contacts.filter(function(contact) {
        return contact.id !== id;
    });

    // display updated contacts
    displayContacts(contacts);
}

// Show empty contact list when page first loads.
displayContacts(contacts);