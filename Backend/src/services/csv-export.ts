import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
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
      const allLinks = await db
        .select()
        .from(links)
        .orderBy(desc(links.createdAt));

      const fileName = `links-export-${nanoid(10)}-${Date.now()}.csv`;
      const tempFilePath = path.join(process.cwd(), "temp", fileName);

      await fs.mkdir(path.dirname(tempFilePath), { recursive: true });

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
        encoding: "utf8",
        fieldDelimiter: ",",
        recordDelimiter: "\n",
        headerIdDelimiter: ".",
        alwaysQuote: true,
      });

      const csvData = allLinks.map((link) => ({
        id: String(link.id),
        originalUrl: String(link.originalUrl),
        shortCode: String(link.shortCode),
        shortUrl: `${process.env.APP_URL}/${link.shortCode}`,
        accessCount: String(link.accessCount),
        createdAt: new Date(link.createdAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }));

      await csvWriter.writeRecords(csvData);

      const fileContent = await fs.readFile(tempFilePath);

      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: fileContent,
        ContentType: "text/csv",
        ContentDisposition: `attachment; filename="${fileName}"`,
        ACL: "private",
      });

      await s3Client.send(uploadCommand);

      await fs.unlink(tempFilePath);

      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
      });

      const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
        expiresIn: 3600, // 1 hora
      });

      return signedUrl;
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      throw new Error("Falha ao exportar links para CSV");
    }
  }
}
