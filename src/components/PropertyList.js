"use client";

import { useState } from "react";
import {
  useProperties,
  useBookProperty,
} from "../hooks/useProperties";
import { Check, Clock, Home, MapPin } from "lucide-react";

export default function PropertyList() {
  const [filters, setFilters] = useState({
    status: [],
    location: [],
    type: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const [priceRange, setPriceRange] = useState([0, 0]);
  const { data: properties, isLoading, error } = useProperties(filters);
  const bookProperty = useBookProperty();

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setFilters((prev) => ({
      ...prev,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    }));
  };

  const handleBookProperty = async (propertyId) => {
    try {
      await bookProperty.mutateAsync({
        propertyId,
        bookingData: { date: new Date().toISOString() },
      });
      alert("Property booked successfully!");
    } catch (error) {
      alert("Failed to book property. Please try again.");
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `IDR ${(price / 1000000).toFixed(0)}M`;
    }
    if (price >= 1000) {
      return `IDR ${(price / 1000).toFixed(0)}K`;
    }
    return `IDR ${price}`;
  };

  const formatTime = (timeString) => {
    // This would come from your API, for now showing placeholder
    return timeString || "3d";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          Error loading properties: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">FILTER BY</h2>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Status</h3>
          <div className="space-y-2">
            {["New", "Second"].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleFilterChange("status", status)}
                  className="mr-2"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Location</h3>
          <div className="space-y-2">
            {["Bekasi", "Jakarta", "Bandung", "Bogor"].map((location) => (
              <label key={location} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.location.includes(location)}
                  onChange={() => handleFilterChange("location", location)}
                  className="mr-2"
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Type</h3>
          <div className="space-y-2">
            {["Rumah", "Apartement", "Ruko", "Hotel"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleFilterChange("type", type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
          <div className="mb-2">
            <span className="text-sm text-gray-600">
              Rp {priceRange[0].toLocaleString()} - Rp{" "}
              {priceRange[1].toLocaleString()}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="1000000"
              max="15000000"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceRangeChange([
                  parseInt(e.target.value),
                  priceRange[1],
                ])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="1000000"
              max="15000000"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([
                  priceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
            />
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          Apply
        </button>
      </div>

      {/* Right Content - Property Listings */}
      <div className="flex-1 p-6">
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.data?.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Property Image */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img src={property.image_url} size={48} className="text-gray-400" />
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {property.name || "Property Title"}
                </h3>

                {/* Location with checkmark */}
                <div className="flex items-center mb-3">
                  <MapPin size={16} className="text-blue-500 mr-1" />
                  <span className="text-gray-600 mr-2">
                    {property.address || "Bekasi"}
                  </span>
                  <Check size={16} className="text-blue-500" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {property.type || "Rumah"}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {property.status || "New"}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {formatPrice(property.price || 5000000)}
                  </span>
                </div>

                {/* Property Details */}
                <div className="text-sm text-gray-600 mb-3">
                  <span>LT {property.land_area || "105"} m² </span>
                  <span className="mx-2">•</span>
                  <span>LB {property.building_area || "98"} m²</span>
                </div>

                {/* Time and Book Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    {formatTime(property.timePosted)}
                  </div>
                  <button
                    onClick={() => handleBookProperty(property.id)}
                    disabled={bookProperty.isPending}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {properties?.data?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Sorry, there are no properties matching your criteria. Try
              adjusting your filters.
            </p>
            <button
              onClick={() =>
                setFilters({
                  status: [],
                  location: [],
                  type: [],
                })
              }
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
