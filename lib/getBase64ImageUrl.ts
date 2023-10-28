import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (imgPath: string) => {
  try {
    const file = await fs.readFile(`public/${imgPath}`);
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error: unknown) {
    if (error instanceof Error) return error?.message;
    return "Error";
  }
};
