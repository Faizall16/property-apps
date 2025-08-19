import api from "../lib/api";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/login", credentials);
      if (response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await api.post("/register", userData);
      if (response.data.data.access_token) {
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get("/profile");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
