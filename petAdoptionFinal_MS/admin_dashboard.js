document.addEventListener("DOMContentLoaded", () => {
    // Fetch pets data and populate the table
    fetch("pets.json")
        .then(response => response.json())
        .then(data => {
            const petsTableBody = document.querySelector("#pets-table tbody");
            data.forEach((pet, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${pet.name}</td>
                    <td>${pet.age}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.location}</td>
                    <td>${pet.description}</td>
                    <td>
                        <button class="edit-btn" onclick="editPet(${index})">Edit</button>
                        <button class="delete-btn" onclick="deletePet(${index})">Delete</button>
                    </td>
                `;
                petsTableBody.appendChild(row);
            });
        })
        .catch(err => console.error("Error fetching pets data:", err));

    // Handle adding a new adoption entry via prompts
    const addAdoptionBtn = document.getElementById("add-adoption-btn");
    if (addAdoptionBtn) {
        addAdoptionBtn.addEventListener("click", () => {
            const newAdoption = {
                name: prompt("Enter adopter's name:"),
                email: prompt("Enter adopter's email:"),
                message: prompt("Enter adopter's message:")
            };
            if (newAdoption.name && newAdoption.email && newAdoption.message) {
                fetch("/submit-adoption", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newAdoption)
                })
                .then(response => response.json())
                .then(() => {
                    location.reload();
                })
                .catch(err => console.error("Error submitting adoption inquiry:", err));
            } else {
                alert("All fields are required to add a new adoption entry.");
            }
        });
    }
});

// Fetch adoption inquiries data and populate the table
fetch("adoptionInquiry.json")
    .then(response => response.json())
    .then(data => {
        const adoptionTableBody = document.querySelector("#adoption-table tbody");
        data.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.message}</td>
                <td>${entry.date}</td>
                <td>
                    <button class="edit-btn" onclick="editAdoption(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteAdoption(${index})">Delete</button>
                </td>
            `;
            adoptionTableBody.appendChild(row);
        });
    })
    .catch(err => console.error("Error fetching adoption inquiries:", err));

// Edit Pet
function editPet(index) {
    const updatedPet = prompt("Enter new pet details in JSON format (e.g. {\"name\":\"Rex\",\"age\":\"3 years\",\"breed\":\"Labrador\",\"location\":\"Seattle\",\"description\":\"Friendly and playful\"})");
    try {
        const petData = JSON.parse(updatedPet);
        fetch(`/update-pet/${index}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(petData)
        })
        .then(response => response.json())
        .then(() => location.reload())
        .catch(err => console.error("Error updating pet:", err));
    } catch (err) {
        console.error("Invalid JSON format for pet data:", err);
    }
}

// Delete Pet
function deletePet(index) {
    if (confirm("Are you sure you want to delete this pet?")) {
        fetch(`/delete-pet/${index}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => location.reload())
        .catch(err => console.error("Error deleting pet:", err));
    }
}

// Edit Adoption Inquiry
function editAdoption(index) {
    const updatedAdoption = prompt("Enter new adoption details in JSON format (e.g. {\"name\":\"John\",\"email\":\"john@example.com\",\"message\":\"I am interested in this pet\"})");
    try {
        const adoptionData = JSON.parse(updatedAdoption);
        fetch(`/update-adoption/${index}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adoptionData)
        })
        .then(response => response.json())
        .then(() => location.reload())
        .catch(err => console.error("Error updating adoption inquiry:", err));
    } catch (err) {
        console.error("Invalid JSON format for adoption data:", err);
    }
}

// Delete Adoption Inquiry
function deleteAdoption(index) {
    if (confirm("Are you sure you want to delete this adoption inquiry?")) {
        fetch(`/delete-adoption/${index}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => location.reload())
        .catch(err => console.error("Error deleting adoption inquiry:", err));
    }
}
