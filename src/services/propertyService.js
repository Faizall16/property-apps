import api from "../lib/api";

export const propertyService = {
  // Get properties list with filters
  async getProperties(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Add filters to query params
      if (filters.status) params.append("status", filters.status);
      if (filters.location) params.append("location", filters.location);
      if (filters.type) params.append("type", filters.type);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      const response = await api.get(`/properties?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get property by ID
  async getPropertyById(id) {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Search properties
  async searchProperties(query, filters = {}) {
    try {
      const params = new URLSearchParams();
      params.append("q", query);

      // Add filters to query params
      if (filters.status) params.append("status", filters.status);
      if (filters.location) params.append("location", filters.location);
      if (filters.type) params.append("type", filters.type);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const response = await api.get(`/properties/search?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Book property
  async bookProperty(propertyId, bookingData) {
    try {
      const response = await api.post(
        `/properties/${propertyId}/book`,
        bookingData
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get property types
  async getPropertyTypes() {
    try {
      const response = await api.get("/properties");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get locations
  async getLocations() {
    try {
      const response = await api.get("/properties");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
