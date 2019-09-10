import { urlJoin, doc } from "../helpers";
export default async (url: string) => {
  const document = await doc(url);
  const blobNames = Object.values(
    document.getElementsByClassName("gist-blob-name")
  );
  if (!blobNames) return;
  const fileUrls = blobNames
    .map(({ textContent }) => {
      if (!textContent) return;
      return urlJoin(url, "raw", textContent.trim());
    })
    .filter(i => i) as Array<string>

  return fileUrls;
};
