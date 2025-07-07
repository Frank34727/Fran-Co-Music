// ✅ Initialize EmailJS
emailjs.init("wTGaG3BLtP1JoxyV1");

// ✅ REGISTER
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Store user
  const newUser = { username, email, password };
  localStorage.setItem("user", JSON.stringify(newUser));

  // ✅ Send welcome email
  emailjs.send("service_zpojris", "template_6dly5yi", {
    to_name: username,
    to_email: email
  }).then(() => {
    alert("✅ Account created! A welcome email was sent.");
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Email error:", error);
    alert("Email could not be sent.");
  });
});

// ✅ LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && savedUser.email === email && savedUser.password === password) {
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser)); // ✅ Remember session
    alert("✅ Login successful!");
    window.location.href = "Home.html";
  } else {
    alert("❌ Invalid email or password.");
  }
});
