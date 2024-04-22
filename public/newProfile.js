const checkDOB = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear(); // Use 'let' for 'age' since its value might change
    let m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--; // This is now valid because 'age' is declared with 'let'
    }
    return age >= 5 && age <= 100; // Return true if age is within the range
};

// Function to delete a user
const deleteUser = async (user) => {
    // Display confirmation prompt
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
        let response = await fetch(`/api/users/${user._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });

        if (response.status != 200) {
            console.log("Error deleting");
            return;
        }

        // Reload the page to refresh the user
        window.location.reload();
    }
};


const fetchUsers = async () => {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const profileList = document.getElementById("profileList"); // Ensure this element exists in your HTML
        profileList.innerHTML = ''; // Clear previous entries
        users.forEach(user => {
            const li = document.createElement("li");
    
            const dLink = document.createElement("a");
            dLink.innerHTML = " &#128465;"; // Moved the icon to the left
            li.appendChild(dLink); // Append to h3 instead of detailsSection
            dLink.id = "delete-link";

            const eLink = document.createElement("a");
            eLink.innerHTML = "&#9998;";
            li.appendChild(eLink); // Append to h3 instead of detailsSection
            eLink.id = "edit-link";

            const name = document.createElement("span");
            name.innerHTML = `<strong>Name:</strong> ${user.firstName} ${user.lastName}`;
            li.appendChild(name);
            li.appendChild(document.createElement("br"));

            const dobElement = document.createElement("span");
            dobElement.innerHTML = `<strong>DOB:</strong> ${user.dob.substring(0,10)}`;
            li.appendChild(dobElement);
            li.appendChild(document.createElement("br"));

            const battingStyleElement = document.createElement("span");
            battingStyleElement.innerHTML = `<strong>Batting Style:</strong> ${user.battingStyle}`;
            li.appendChild(battingStyleElement);
            li.appendChild(document.createElement("br"));

            const bowlingStyleElement = document.createElement("span");
            bowlingStyleElement.innerHTML = `<strong>Bowling Style:</strong> ${user.bowlingStyle}`;
            li.appendChild(bowlingStyleElement);
            li.appendChild(document.createElement("br"));

            const primaryRoleElement = document.createElement("span");
            primaryRoleElement.innerHTML = `<strong>Primary Role:</strong> ${user.primaryRole}`;
            li.appendChild(primaryRoleElement);
            li.appendChild(document.createElement("br"));

            const emailElement = document.createElement("span");
            emailElement.innerHTML = `<strong>Email:</strong> ${user.email}`;
            li.appendChild(emailElement);
            li.appendChild(document.createElement("br"));

            profileList.appendChild(li);

            dLink.onclick = deleteUser.bind(this, user);
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};

// Call fetchUsers on page load or based on some other event
document.addEventListener("DOMContentLoaded", fetchUsers);


const submitRegister = async (e) => {
    e.preventDefault(); 

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    const form = document.getElementById("form-register");
    const firstName = capitalizeFirstLetter(form.elements["first_name"].value);
    const lastName = capitalizeFirstLetter(form.elements["last_name"].value);
    const dob = form.elements["dob"].value;
    const battingStyle = form.elements["batting_style"].value;
    const bowlingStyle = form.elements["bowling_style"].value;
    const primaryRole = form.elements["primary_role"].value;
    const email = form.elements["email"].value;

    const userData = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        battingStyle: battingStyle,
        bowlingStyle: bowlingStyle,
        primaryRole: primaryRole,
        email: email,
    };

    const errorDiv = document.getElementById("error");
    const resultDiv = document.getElementById("result");
    errorDiv.innerHTML = ""; 
    resultDiv.innerHTML = "";

    if (!checkDOB(dob)) {
        errorDiv.innerHTML = "Error: Age must be between 5 to 100 years.";
        return; 
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error registering user');
        }
        resultDiv.innerHTML = "Profile submitted successfully!";
        setTimeout(() => {
            resultDiv.innerHTML = ""; // Clear message after 2 seconds
            window.location.reload();
        }, 2000);
        form.reset(); // Reset the form after submission
    } catch (error) {
        errorDiv.innerHTML = error.message;
    }
};

document.getElementById("form-register").onsubmit = submitRegister;
