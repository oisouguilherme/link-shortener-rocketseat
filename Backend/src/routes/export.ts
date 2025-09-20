import { FastifyInstance } from "fastify";
import { CsvExportService } from "../services/csv-export";

export async function exportRoutes(fastify: FastifyInstance) {
  const csvExportService = new CsvExportService();

  // Exportar links para CSV
  fastify.get("/export/csv", async (request, reply) => {
    try {
      const fileUrl = await csvExportService.exportLinksToCSV();

      return {
        success: true,
        message: "CSV exportado com sucesso",
        downloadUrl: fileUrl,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        error: "Erro ao exportar CSV",
        message: "Falha ao gerar arquivo de exportação",
      });
    }
  });
}
