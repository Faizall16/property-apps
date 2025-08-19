import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "../services/propertyService";

export const useProperties = (filters = {}) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertyService.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePropertyById = (id) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyService.getPropertyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchProperties = (query, filters = {}) => {
  return useQuery({
    queryKey: ["properties", "search", query, filters],
    queryFn: () => propertyService.searchProperties(query, filters),
    enabled: !!query,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBookProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, bookingData }) =>
      propertyService.bookProperty(propertyId, bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
  });
};

export const usePropertyTypes = () => {
  return useQuery({
    queryKey: ["propertyTypes"],
    queryFn: propertyService.getPropertyTypes,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: propertyService.getLocations,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
