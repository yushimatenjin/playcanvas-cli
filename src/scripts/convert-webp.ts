import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import type { Config, File, AssetType } from "../types/config";
import { formatBytes } from "./helpers";

type ConvertOptions = {
  font: boolean;
  texture: boolean;
  textureatlas: boolean;
  removeSource: boolean;
  configFilePath: string;
  outputConfigFilePath: string;
};

type Flags = {
  webpOptions: sharp.WebpOptions;
  convertOptions: ConvertOptions;
};

// list of image extensions
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

async function convertToWebp(
  file: File,
  flags: Flags
): Promise<sharp.OutputInfo | undefined> {
  const { url, size, filename} = file;
  const { webpOptions, convertOptions } = flags;
  const ext = path.extname(url);
  if (imageExtensions.includes(ext.toLowerCase())) {
    const outputPath = path.join(
      path.dirname(url),
      `${path.basename(url, ext)}.webp`
    );
    const result = await sharp(url).webp(webpOptions).toFile(outputPath);
    // output path and source and destnation file size
    console.log(
      `(${filename} width:${result.width} height:${result.height}) Converted ${url} to ${outputPath}. Size: ${formatBytes(
        size
      )} to ${formatBytes(result.size)}`
    );
    if (convertOptions.removeSource) {
      fs.unlinkSync(url);
      console.log(`Deleted ${url}.`);
    }

    return result;
  }
  return undefined;
}

function isTextureAssetType(
  assetType: AssetType,
  convertOptions: ConvertOptions
): boolean {
  switch (assetType) {
    case "font":
      return convertOptions.font;
    case "texture":
      return convertOptions.texture;
    case "textureatlas":
      return convertOptions.textureatlas;
    default:
      return false;
  }
}

async function convertImageExtensionsToWebp(config: Config, flags: Flags) {
  const assetKeys = Object.keys(config.assets);
  let sourceTotalSize = 0;
  let destinationTotalSize = 0;

  for (const key of assetKeys) {
    const asset = config.assets[key];
    if (!isTextureAssetType(asset.type, flags.convertOptions)) continue;
    const url = asset.file.url;

    // add the asset to the target list
    const result = await convertToWebp(asset.file, flags);

    // update the filename and url to use .webp
    if (result === undefined) continue;

    // update the config
    const updatedUrl = url.replace(/\.(png|jpe?g|gif)$/i, ".webp");
    const updatedSize = result.size;
    asset.file.url = updatedUrl;
    asset.file.size = updatedSize;
    
    // culculate the total size
    sourceTotalSize += asset.file.size;
    destinationTotalSize += result.size;
  }

  console.log("=====================================");
  console.log(flags.webpOptions);
  console.log(flags.convertOptions);
  console.log(
    `Total size: "${formatBytes(sourceTotalSize)}" to "${formatBytes(
      destinationTotalSize
    )}"`
  );
  console.log(
    `Total savings: ${formatBytes(sourceTotalSize - destinationTotalSize)}`
  );
  console.log(
    `Total savings percentage: ${
      ((sourceTotalSize - destinationTotalSize) / sourceTotalSize) * 100
    }%`
  );
  console.log("=====================================");

  return config;
}

export async function webp(flags: Flags) {
  // Read the config.json file and parse it to a JSON object
  const { configFilePath, outputConfigFilePath } = flags.convertOptions;
  const path = process.cwd();

  const currentDir = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((file) => !file.isDirectory())
    .map((file) => {
      return `./${file.name}`;
    });

  if (!currentDir.includes(configFilePath)) {
    throw new Error("config.json file not found.");
  }

  const configFile = fs.readFileSync(configFilePath, "utf-8");
  const config: Config = JSON.parse(configFile);
  // const target = filterTextureAndFontAssets(config);
  // Convert the image extensions to webp
  const result = await convertImageExtensionsToWebp(config, flags);

  // Write the result to the config_webp.json file
  fs.writeFileSync(outputConfigFilePath, JSON.stringify(result, null, 4));
}
