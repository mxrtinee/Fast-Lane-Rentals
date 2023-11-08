const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("login");
    console.log("logged out1");
  } else {
    alert(response.statusText);
    console.log("logoutjs");
  }
};

document.getElementById("logout").addEventListener("click", logout);
