import { useState } from "react";
import { useLinks, useDeleteLink, useExportCsv } from "../hooks/useLinks";
import type { Link } from "../types/api";
import { IconCopy, IconDelete, IconDownload, IconLinks } from "../assets/Icons";

export function LinksList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useLinks(page, limit);
  const deleteLink = useDeleteLink();
  const exportCsv = useExportCsv();

  const handleDelete = async (shortCode: string) => {
    if (confirm("Tem certeza que deseja deletar este link?")) {
      try {
        await deleteLink.mutateAsync(shortCode);
      } catch (error) {
        console.error("Erro ao deletar link:", error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportCsv.mutateAsync();
      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copiado para a área de transferência!");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">Erro ao carregar links</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 flex flex-col gap-6 h-fit">
      <div className="flex items-center justify-between border-b border-cinza-200 pb-5">
        <h2 className="text-2xl font-bold text-cinza-600">Meus links</h2>
        <button
          onClick={handleExport}
          disabled={exportCsv.isPending}
          className="cursor-pointer flex items-center gap-2 bg-cinza-200 text-cinza-500 opacity-50 p-2 rounded text-sm hover:opacity-75 hover:bg-cinza-300 transition-all duration-200 disabled:cursor-not-allowed"
        >
          <IconDownload />
          {exportCsv.isPending ? "Baixando..." : "Baixar CSV"}
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {!data?.links.length ? (
          <div className="flex flex-col py-8 items-center gap-3">
            <IconLinks />
            <p className="text-cinza-500 uppercase text-sm">
              ainda não existem links cadastrados
            </p>
          </div>
        ) : (
          <>
            {data.links.map((link: Link) => (
              <div
                key={link.id}
                className="flex gap-2 sm:gap-4 items-center justify-between border-b border-cinza-200 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex flex-col w-40 sm:w-64">
                  <a
                    target="_blank"
                    href={`/${link.shortCode}`}
                    className="text-blue-base text-sm sm:text-base font-semibold hover:underline cursor-pointer"
                  >
                    {link.shortUrl}
                  </a>
                  <p className="text-xs sm:text-sm text-cinza-500 truncate">
                    {link.originalUrl}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 w-full justify-end">
                  <span className="text-xs sm:text-sm text-cinza-500 truncate">
                    {link.accessCount} acessos
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="bg-cinza-200 cursor-pointer text-cinza-500 p-2 rounded hover:bg-cinza-300 hover:text-cinza-600 transition-all duration-200"
                      title="Copiar link"
                      onClick={() => copyToClipboard(link.shortUrl)}
                    >
                      <IconCopy />
                    </button>
                    <button
                      className="bg-cinza-200 cursor-pointer text-cinza-500 p-2 rounded hover:bg-cinza-300 hover:text-cinza-600 transition-all duration-200"
                      title="Excluir link"
                      onClick={() => handleDelete(link.shortCode)}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {data && data.pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1">
            Página {page} de {data.pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === data.pagination.totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
