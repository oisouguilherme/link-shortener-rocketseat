import axios from "axios";
import type {
  CreateLinkRequest,
  CreateLinkResponse,
  ListLinksResponse,
  ExportCsvResponse,
} from "../types/api";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const linksService = {
  createLink: async (data: CreateLinkRequest): Promise<CreateLinkResponse> => {
    const response = await api.post<CreateLinkResponse>("/links", data);
    return response.data;
  },

  getLinks: async (page = 1, limit = 10): Promise<ListLinksResponse> => {
    const response = await api.get<ListLinksResponse>("/links", {
      params: { page, limit },
    });
    return response.data;
  },

  deleteLink: async (shortCode: string): Promise<void> => {
    await api.delete(`/links/${shortCode}`);
  },

  incrementAccess: async (
    shortCode: string
  ): Promise<{ accessCount: number }> => {
    const response = await api.patch(`/links/${shortCode}/access`);
    return response.data;
  },

  exportToCsv: async (): Promise<ExportCsvResponse> => {
    const response = await api.get<ExportCsvResponse>("/export/csv");
    return response.data;
  },

  getOriginalUrl: async (shortCode: string): Promise<string> => {
    const response = await axios.get(`http://localhost:3333/${shortCode}`, {
      maxRedirects: 0,
      validateStatus: (status) => status === 301,
    });
    return response.headers.location;
  },
};

export default api;
