
// all contacts is store in an array 
let contacts = [];

// access HTML elements by using getElementById()
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");
const contactCount = document.getElementById("contactCount");


// ------------------------------------------
// 3. ADD CONTACT
// ------------------------------------------

// When the form is submitted,
// this function will be executed.

contactForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();


    // Get values from the form
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const street = document.getElementById("street").value;
    const state = document.getElementById("state").value;
    const postcode = document.getElementById("postcode").value;
    const description = document.getElementById("description").value;


    // Create a new contact object
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


    // Add the contact object into the array
    contacts.push(contact);


    // Display updated contacts
    displayContacts(contacts);


    // Clear the form after adding
    contactForm.reset();

});


// ------------------------------------------
// 4. DISPLAY CONTACTS
// ------------------------------------------

// This function displays contacts on the webpage.

function displayContacts(contactArray) {

    // Clear previous content
    contactList.innerHTML = "";


    // Update contact count
    contactCount.textContent = contactArray.length + " contacts";


    // If there are no contacts
    if (contactArray.length === 0) {

        contactList.innerHTML = `
            <div class="empty">
                No contacts found.
            </div>
        `;

        return;
    }


    // Loop through every contact
    contactArray.forEach(function(contact) {

        // Create HTML for each contact
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

            <button 
                class="delete-btn"
                onclick="deleteContact(${contact.id})"
            >
                Delete
            </button>
        `;


        // Add the contact to the webpage
        contactList.appendChild(contactDiv);

    });
}


// ------------------------------------------
// 5. SEARCH CONTACT
// ------------------------------------------

// Listen for typing inside the search box.

searchInput.addEventListener("input", function() {

    // Get search text
    const searchText = searchInput.value.toLowerCase();


    // Filter contacts based on name
    const filteredContacts = contacts.filter(function(contact) {

        return contact.name
            .toLowerCase()
            .includes(searchText);

    });


    // Display only matching contacts
    displayContacts(filteredContacts);

});


// ------------------------------------------
// 6. DELETE CONTACT
// ------------------------------------------

// Delete contact using its ID.

function deleteContact(id) {

    // Create a new array without the selected contact
    contacts = contacts.filter(function(contact) {

        return contact.id !== id;

    });


    // Display updated contacts
    displayContacts(contacts);
}


// ------------------------------------------
// 7. INITIAL DISPLAY
// ------------------------------------------

// Show empty contact list when page first loads.

displayContacts(contacts);