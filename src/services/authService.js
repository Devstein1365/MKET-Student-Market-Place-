// Authentication service using localStorage
const USERS_KEY = "mket_users";
const CURRENT_USER_KEY = "mket_current_user";
const AUTH_TOKEN_KEY = "mket_auth_token";

class AuthService {
  // Get all users from localStorage
  getAllUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Generate a simple token
  generateToken(userId) {
    return `token_${userId}_${Date.now()}`;
  }

  // Sign up a new user
  signup(userData) {
    try {
      const users = this.getAllUsers();

      // Check if email already exists
      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: "Email already registered. Please login instead.",
        };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In production, hash this!
        phone: userData.phone || "",
        location: "Bosso Campus", // Default location
        bio: "",
        avatar: null,
        verified: false,
        joinedDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // Save user
      users.push(newUser);
      this.saveUsers(users);

      // Auto login after signup
      const token = this.generateToken(newUser.id);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

      return {
        success: true,
        message: "Account created successfully!",
        user: newUser,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred during signup. Please try again.",
      };
    }
  }

  // Login user
  login(email, password) {
    try {
      const users = this.getAllUsers();

      // Find user by email
      const user = users.find((u) => u.email === email);

      if (!user) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      // Check password
      if (user.password !== password) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      // Generate token and save session
      const token = this.generateToken(user.id);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

      return {
        success: true,
        message: "Login successful!",
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
      };
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return !!(token && user);
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Update current user
  updateCurrentUser(updatedData) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          message: "No user logged in",
        };
      }

      // Update user data
      const updatedUser = {
        ...currentUser,
        ...updatedData,
        id: currentUser.id, // Prevent ID change
        email: currentUser.email, // Prevent email change
      };

      // Update in users list
      const users = this.getAllUsers();
      const userIndex = users.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        this.saveUsers(users);
      }

      // Update current user in localStorage
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

      return {
        success: true,
        message: "Profile updated successfully!",
        user: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update profile",
      };
    }
  }

  // Get auth token
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // Check if email exists
  emailExists(email) {
    const users = this.getAllUsers();
    return users.some((user) => user.email === email);
  }

  // Reset password (for localStorage implementation)
  resetPassword(email, newPassword) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        return {
          success: false,
          message: "Email not found in our records",
        };
      }

      // Update password
      users[userIndex].password = newPassword; // In production, hash this!
      this.saveUsers(users);

      return {
        success: true,
        message:
          "Password reset successfully! You can now login with your new password.",
      };
    } catch (error) {
      console.error("Error resetting password:", error);
      return {
        success: false,
        message: "Failed to reset password. Please try again.",
      };
    }
  }

  // Clear all auth data (for testing)
  clearAllData() {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export default new AuthService();
