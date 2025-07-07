// Initialize EmailJS with your public key
emailjs.init("wTGaG3BLtP1JoxyV1");

// === REGISTER FORM ===
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Save user data in localStorage (for testing only)
  const newUser = { username, email, password };
  localStorage.setItem('user', JSON.stringify(newUser));

  // Send Welcome Email
  emailjs.send("service_66qof6e", "template_6dly5yi", {
    to_email: email,
    to_name: username
  }).then(() => {
    alert("🎉 Welcome email sent! Redirecting to Home...");
    window.location.href = "Home.html";
  }).catch(error => {
    console.error("Email sending failed:", error);
    alert("Failed to send welcome email.");
  });
});

// === LOGIN FORM ===
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const savedUser = JSON.parse(localStorage.getItem('user'));

  if (savedUser && savedUser.email === email && savedUser.password === password) {
    alert("✅ Login successful!");
    window.location.href = "Home.html";
  } else {
    alert("❌ Invalid email or password.");
  }
});
