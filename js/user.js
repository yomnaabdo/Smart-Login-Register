document.addEventListener("DOMContentLoaded", () => {
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    alert("You are not logged in. Redirecting to login page...");
    window.location.href = "index.html";
    return;
}

document.getElementById("user-full-name").textContent = user.fullName;

document.getElementById("logout-button").addEventListener("click", () => {
  // Show a SweetAlert confirmation before logging out
Swal.fire({
  title: "Are you sure?",
  text: "Do you really want to log out?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, log me out",
  cancelButtonText: "Cancel",
  reverseButtons: true,
  customClass: {
    popup: "swal2-popup", // Link the custom class
  },
}).then((result) => {
  if (result.isConfirmed) {
    // Remove the logged-in user data from localStorage
    localStorage.removeItem("loggedInUser");

    // Redirect to the login page immediately after logout
    window.location.href = "index.html";
  }
});
});


});
