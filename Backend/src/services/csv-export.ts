import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs/promises";
import { db } from "../database/connection";
import { links } from "../database/schema";
import { desc } from "drizzle-orm";

// Configurar cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export class CsvExportService {
  async exportLinksToCSV(): Promise<string> {
    try {
      // Buscar todos os links do banco
      const allLinks = await db
        .select()
        .from(links)
        .orderBy(desc(links.createdAt));

      // Gerar nome único para o arquivo
      const fileName = `links-export-${nanoid(10)}-${Date.now()}.csv`;
      const tempFilePath = path.join(process.cwd(), "temp", fileName);

      // Criar diretório temporário se não existir
      await fs.mkdir(path.dirname(tempFilePath), { recursive: true });

      // Configurar CSV writer
      const csvWriter = createObjectCsvWriter({
        path: tempFilePath,
        header: [
          { id: "id", title: "ID" },
          { id: "originalUrl", title: "URL Original" },
          { id: "shortCode", title: "Código Encurtado" },
          { id: "shortUrl", title: "URL Encurtada" },
          { id: "accessCount", title: "Contagem de Acessos" },
          { id: "createdAt", title: "Data de Criação" },
        ],
      });

      // Preparar dados para CSV
      const csvData = allLinks.map((link) => ({
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        shortUrl: `${process.env.APP_URL}/${link.shortCode}`,
        accessCount: link.accessCount,
        createdAt: link.createdAt.toISOString(),
      }));

      // Escrever arquivo CSV
      await csvWriter.writeRecords(csvData);

      // Ler arquivo para upload
      const fileContent = await fs.readFile(tempFilePath);

      // Upload para S3
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: fileContent,
        ContentType: "text/csv",
        ContentDisposition: `attachment; filename="${fileName}"`,
      });

      await s3Client.send(uploadCommand);

      // Limpar arquivo temporário
      await fs.unlink(tempFilePath);

      // Retornar URL do arquivo no S3
      const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      return fileUrl;
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      throw new Error("Falha ao exportar links para CSV");
    }
  }
}
