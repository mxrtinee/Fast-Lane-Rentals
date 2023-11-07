document.addEventListener("DOMContentLoaded", (event) => {
  const signupForm = document.querySelector(".signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username-signup").value;
    const password = document.getElementById("password-signup").value;
    const email = document.getElementById("email-signup").value;

    const userData = {
      username,
      password,
      email,
    };

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        window.location.href = "/homepage";
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
