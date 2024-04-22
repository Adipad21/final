  document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("container");
    const navItems = document.getElementById("columns");

    menuContainer.addEventListener("click", () => {
        navItems.classList.toggle("active");
    });
});
window.addEventListener("resize", () => {
  const navItems = document.getElementById("columns");
  if (window.innerWidth >= 800) {
      navItems.classList.remove("active");
  }
});

/* document.getElementById("register-link").addEventListener("click", (event) => {
  event.preventDefault();
   const form = document.getElementById("register")
   form.classList.toggle("hidden");
  if (form.classList.contains("hidden")) {
    form.reset(); // Reset the form only when it becomes hidden
  }
});
 */
document.addEventListener('DOMContentLoaded', function() {
  const registerLink = document.getElementById("register-link");
  registerLink.addEventListener("click", function(event) {
      event.preventDefault();
      const form = document.getElementById("register");
      form.classList.toggle("hidden");
      if (form.classList.contains("hidden")) {
          document.getElementById("first_name").value = "";
          document.getElementById("last_name").value = "";
          document.getElementById("dob").value = "";
          document.getElementById("batting_style").value = "Right-handed";
          document.getElementById("bowling_style").value = "Right-arm fast";
          document.getElementById("player_role").value = "Batsman";
          document.getElementById("email").value = "";
          form.reset();
      }
  });
});
