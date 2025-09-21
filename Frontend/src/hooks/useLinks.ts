import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { linksService } from "../services/api";
import type { CreateLinkRequest } from "../types/api";

export const queryKeys = {
  links: ["links"] as const,
  linksList: (page: number, limit: number) =>
    ["links", "list", page, limit] as const,
  export: ["export"] as const,
};

export const useLinks = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.linksList(page, limit),
    queryFn: () => linksService.getLinks(page, limit),
    staleTime: 30000, // 30 segundos
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkRequest) => linksService.createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shortCode: string) => linksService.deleteLink(shortCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links });
    },
  });
};

export const useIncrementAccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shortCode: string) => linksService.incrementAccess(shortCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links });
    },
  });
};

export const useExportCsv = () => {
  return useMutation({
    mutationFn: () => linksService.exportToCsv(),
  });
};
