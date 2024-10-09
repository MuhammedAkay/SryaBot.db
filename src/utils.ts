import { promises as fs } from "fs";

export async function readJSON<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`JSON dosyası okunamadı: ${filePath}`, error);
    return {} as T;
  }
}

export async function writeJSON<T>(filePath: string, data: T): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`JSON dosyasına yazılamadı: ${filePath}`, error);
  }
}

export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code !== "EEXIST"
    ) {
      console.error("Klasör oluşturulurken bir hata oluştu:", error);
    }
  }
}
