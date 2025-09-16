// Event listeners for buttons and password length selector
document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyPassword);
document.getElementById('password-length').addEventListener('input', updateLengthValue);

// Update the displayed password length value
function updateLengthValue() {
  const length = document.getElementById('password-length').value;
  document.getElementById('length-value').textContent = length;
}

// Generate password based on user options
function generatePassword() {
  const length = document.getElementById('password-length').value;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSpecialChars = document.getElementById('specialChars').checked;
  const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
  const generatePronounceable = document.getElementById('pronounceable').checked;

  let chars = '';
  let password = '';

  if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) chars += "0123456789";
  if (includeSpecialChars) chars += "!@#$%^&*()_+=-";
  
  // Exclude ambiguous characters if selected
  if (excludeAmbiguous) {
    chars = chars.replace(/[1lI0O]/g, '');
  }

  // Generate a pronounceable password if selected
  if (generatePronounceable) {
    password = generatePronounceablePassword(length);
  } else {
    // Otherwise, generate a random password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
  }

  // Display the generated password
  document.getElementById('password-display').textContent = password;

  // Evaluate password strength
  checkPasswordStrength(password);
}

// Copy to clipboard function
function copyPassword() {
  const passwordText = document.getElementById('password-display').textContent;
  navigator.clipboard.writeText(passwordText).then(() => {
    alert("Password copied to clipboard!");
  });
}

// Check the strength of the generated password
function checkPasswordStrength(password) {
  let strength = 'Weak';
  let strengthClass = 'weak';

  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+=-]/.test(password)) {
    strength = 'Strong';
    strengthClass = 'strong';
  } else if (password.length >= 8) {
    strength = 'Medium';
    strengthClass = 'medium';
  }

  document.getElementById('strength-text').textContent = strength;
  document.getElementById('password-strength').className = strengthClass;
}

// Generate a pronounceable password
function generatePronounceablePassword(length) {
  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const charSet = i % 2 === 0 ? consonants : vowels;
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  return password;
}
