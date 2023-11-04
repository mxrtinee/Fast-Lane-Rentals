document.addEventListener("DOMContentLoaded", (event) => {
  const signupForm = document.querySelector('.signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('.signup-username').value;
    const password = document.querySelector('.signup-password').value;
    const email = document.querySelector('.signup-email').value;

    const userData = {
      username,
      password,
      email
    };

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        window.location.href = '/userPage'
      } else {
        console.error('Registration failed.')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

