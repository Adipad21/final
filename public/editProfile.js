const fetchAllUsers = async () => {
    try {
        const response = await fetch("/api/users");
        const users = await response.json();
        const profileList = document.getElementById("profileList");
        profileList.innerHTML = ""; // Clear previous entries
        console.log("Fetched Users:", users); // Log fetched users
        users.forEach(user => {
            const li = document.createElement("li");

            const dLink = document.createElement("a");
            dLink.innerHTML = " &#128465;";
            li.appendChild(dLink);
            dLink.id = "delete-link";
            dLink.onclick = () => deleteUser(user);

            const eLink = document.createElement("a");
            eLink.innerHTML = "&#9998;";
            li.appendChild(eLink);
            eLink.id = "edit-link";
            eLink.onclick = () => editUser(user, li);

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

        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};

const editUser = (user, li) => {
    li.innerHTML = `
        <form id="userForm">
            <input type="text" name="user_id" value="${user._id}" class="hidden" required><br>
            <strong>First Name:</strong> <br> <input type="text" name="firstName" value="${user.firstName}" required><br>
            <strong>Last Name:</strong> <br> <input type="text" name="lastName" value="${user.lastName}" required><br>
            <strong>DOB:</strong> <br> <input type="date" name="dob" value="${user.dob.substring(0, 10)}" required><br>
            <strong>Email:</strong> <br> <input type="email" name="email" value="${user.email}" required><br>
            <label for="batting_style"><strong>Batting Style:</strong></label><br>
            <select name="batting_style">
                <option value="Right-handed" ${user.battingStyle === "Right-handed" ? "selected" : ""}>Right-handed</option>
                <option value="Left-handed" ${user.battingStyle === "Left-handed" ? "selected" : ""}>Left-handed</option>
            </select><br>
            <label for="bowling_style"><strong>Bowling Style:</strong></label><br>
            <select name="bowling_style">
                <option value="Right-arm fast" ${user.bowlingStyle === "Right-arm fast" ? "selected" : ""}>Right-arm fast</option>
                <option value="Right-arm medium" ${user.bowlingStyle === "Right-arm medium" ? "selected" : ""}>Right-arm medium</option>
                <option value="Right-arm spin" ${user.bowlingStyle === "Right-arm spin" ? "selected" : ""}>Right-arm spin</option>
                <option value="Left-arm fast" ${user.bowlingStyle === "Left-arm fast" ? "selected" : ""}>Left-arm fast</option>
                <option value="Left-arm medium" ${user.bowlingStyle === "Left-arm medium" ? "selected" : ""}>Left-arm medium</option>
                <option value="Left-arm spin" ${user.bowlingStyle === "Left-arm spin" ? "selected" : ""}>Left-arm spin</option>
            </select><br>
            <label for="primary_role"><strong>Primary Role:</strong></label><br>
            <select name="primary_role">
                <option value="Batsman" ${user.primaryRole === "Batsman" ? "selected" : ""}>Batsman</option>
                <option value="Bowler" ${user.primaryRole === "Bowler" ? "selected" : ""}>Bowler</option>
                <option value="Wicket-keeper" ${user.primaryRole === "Wicket-keeper" ? "selected" : ""}>Wicket-keeper</option>
                <option value="All-rounder" ${user.primaryRole === "All-rounder" ? "selected" : ""}>All-rounder</option>
            </select>
            <br>
            <br>
            <button type="button" onclick="submitEdit(form)">Save Changes</button>
            <button type="button" onclick="cancelEdit(this)">Cancel</button>
        </form>
    `;
};

const submitEdit = async (form) => {
    const formData = new FormData(form);
    console.log(form.user_id);

    let response;
    console.log("Entered put" + form.user_id.value);
    console.log(formData.get('firstName'));

    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        dob: formData.get('dob'),
        email: formData.get('email'),
        battingStyle: formData.get('batting_style'),
        bowlingStyle: formData.get('bowling_style'),
        primaryRole: formData.get('primary_role')
    };

    console.log(userData);

    response = await fetch(`/api/users/${form.user_id.value}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    

    if (response.ok) {
        alert("User updated successfully!");
        fetchAllUsers(); // Refresh the list to show updated details
    } else {
        alert("Failed to update user.");
    }
};


const cancelEdit = (button) => {
    const li = button.closest("li");
    fetchAllUsers(); // Could also repopulate this single li instead
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('userForm');
    fetchAllUsers();    
});
