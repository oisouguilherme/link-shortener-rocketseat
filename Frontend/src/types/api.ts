// Tipos baseados na API do backend
export interface Link {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

export interface CreateLinkRequest {
  originalUrl: string;
  shortCode?: string;
}

export interface CreateLinkResponse {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

export interface ListLinksResponse {
  links: Link[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ExportCsvResponse {
  success: boolean;
  message: string;
  downloadUrl: string;
  expiresAt: string;
}

export interface ApiError {
  error: string;
  message: string;
  details?: any;
}
