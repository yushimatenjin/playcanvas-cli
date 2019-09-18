import { gist } from "./utils";
import { upload } from "./upload";
export async function copy(url: string) {
  const documents = await gist(url);
  if (documents) {
    for (let asset of documents) {
      await upload(asset);
    }
  }
}
