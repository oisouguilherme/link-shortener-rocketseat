import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLinkSchemaTransformed,
  type CreateLinkFormData,
} from "../types/validation";
import { useCreateLink } from "../hooks/useLinks";
import { useState, useEffect } from "react";
import type { CreateLinkResponse } from "../types/api";

interface CreateLinkFormProps {
  onSuccess?: () => void;
}

export function CreateLinkForm({ onSuccess }: CreateLinkFormProps) {
  const createLinkMutation = useCreateLink();
  const [createdLink, setCreatedLink] = useState<CreateLinkResponse | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchemaTransformed),
  });

  const shortCodeValue = watch("shortCode");

  const onSubmit = async (data: CreateLinkFormData) => {
    try {
      const response = await createLinkMutation.mutateAsync(data);
      setCreatedLink(response);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar link:", error);
      setCreatedLink(null);
    }
  };

  useEffect(() => {
    const originalUrl = watch("originalUrl");
    if (!originalUrl) {
      setCreatedLink(null);
    }
  }, [watch("originalUrl")]);

  const getErrorMessage = () => {
    if (!createLinkMutation.error) return null;

    if ((createLinkMutation.error as any)?.response?.data) {
      const apiError = (createLinkMutation.error as any).response.data;
      return apiError.message || apiError.error || "Erro ao criar link";
    }

    if (createLinkMutation.error instanceof Error) {
      return createLinkMutation.error.message;
    }

    return "Erro ao criar link";
  };

  const getPreviewUrl = () => {
    if (createdLink) {
      return createdLink.shortUrl;
    }

    if (shortCodeValue && shortCodeValue.trim()) {
      return `http://localhost:3333/${shortCodeValue.trim()}`;
    }

    return "http://localhost:3333/[código-gerado]";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-6 sm:p-8 flex flex-col gap-6 h-fit"
    >
      <h2 className="text-2xl font-bold text-cinza-600">Novo link</h2>
      <label className="flex flex-col">
        <span className="text-xs text-cinza-500 uppercase mb-2">
          link original
        </span>
        <input
          type="text"
          {...register("originalUrl")}
          placeholder="www.exemplo.com.br"
          className="px-4 py-3 border border-cinza-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-base focus:border-transparent transition-all duration-200"
        />
        {errors.originalUrl && (
          <p className="mt-1 text-sm text-red-danger">
            {errors.originalUrl.message}
          </p>
        )}
      </label>
      <label className="flex flex-col">
        <span className="text-xs text-cinza-500 uppercase mb-2">
          Código Personalizado (opcional)
        </span>
        <input
          type="text"
          {...register("shortCode")}
          placeholder="meu-link"
          className="px-4 py-3 border border-cinza-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-base focus:border-transparent transition-all duration-200"
        />
        {errors.shortCode && (
          <p className="mt-1 text-sm text-red-danger">
            {errors.shortCode.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Deixe vazio para gerar automaticamente
        </p>
      </label>
      <label className="flex flex-col">
        <span className="text-xs text-cinza-500 uppercase mb-2">
          link encurtado
        </span>
        <input
          type="text"
          readOnly
          value={getPreviewUrl()}
          placeholder="http://localhost:3333/[código-gerado]"
          className={`px-4 py-3 border border-cinza-300 rounded-lg bg-gray-50 transition-all duration-200 ${
            createdLink ? "text-blue-base font-medium" : "text-gray-500"
          }`}
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting || createLinkMutation.isPending}
        className="cursor-pointer bg-blue-base text-white py-3 rounded-lg disabled:bg-blue-base/50 hover:bg-blue-base/90 transition-colors duration-200"
      >
        {isSubmitting || createLinkMutation.isPending
          ? "Salvando link..."
          : "Salvar link"}
      </button>
      {createLinkMutation.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-danger">{getErrorMessage()}</p>
        </div>
      )}
    </form>
  );
}
