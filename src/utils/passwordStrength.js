// Password strength checker utility

export const checkPasswordStrength = (password) => {
  if (!password) {
    return { strength: "", color: "", message: "" };
  }

  let strength = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) {
    strength += 1;
  } else if (password.length >= 6) {
    strength += 0.5;
  }

  // Contains lowercase
  if (/[a-z]/.test(password)) {
    strength += 1;
  }

  // Contains uppercase
  if (/[A-Z]/.test(password)) {
    strength += 1;
    feedback.push("uppercase");
  }

  // Contains numbers
  if (/\d/.test(password)) {
    strength += 1;
    feedback.push("numbers");
  }

  // Contains special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 1;
    feedback.push("special chars");
  }

  // Determine strength level
  let strengthLevel = "";
  let color = "";
  let message = "";

  if (strength < 2) {
    strengthLevel = "weak";
    color = "red";
    message = "Weak - Add more characters";
  } else if (strength < 3) {
    strengthLevel = "medium";
    color = "orange";
    message = "Medium - Add uppercase or numbers";
  } else if (strength < 4) {
    strengthLevel = "strong";
    color = "yellow";
    message = "Strong - Almost there!";
  } else {
    strengthLevel = "very-strong";
    color = "green";
    message = "Very Strong - Excellent!";
  }

  return {
    strength: strengthLevel,
    color,
    message,
    score: strength,
  };
};

export const checkPasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { matches: null, message: "" };
  }

  if (password === confirmPassword) {
    return {
      matches: true,
      message: "✓ Passwords match",
      color: "green",
    };
  } else {
    return {
      matches: false,
      message: "✗ Passwords do not match",
      color: "red",
    };
  }
};
