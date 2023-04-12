type FillMode = "KEEP_ASPECT" | "FILL_WINDOW" | "FILL_SCREEN";
type ResolutionMode = "AUTO" | "FIXED";
type SortMode = 0 | 1 | 2 | 3;

export type ApplicationProperties = {
  antiAlias: boolean;
  fillMode: FillMode;
  resolutionMode: ResolutionMode;
  height: number;
  width: number;
  use3dPhysics: boolean;
  preferWebGl2: boolean;
  preserveDrawingBuffer: boolean;
  scripts: number[];
  transparentCanvas: boolean;
  useDevicePixelRatio: boolean;
  useLegacyScripts: boolean;
  vr: boolean;
  loadingScreenScript: null;
  batchGroups: any[];
  layers: { [key: string]: Layer };
  layerOrder: LayerOrder[];
  useLegacyAmmoPhysics: boolean;
  useKeyboard: boolean;
  useMouse: boolean;
  useTouch: boolean;
  useGamepads: boolean;
  i18nAssets: any[];
  externalScripts: any[];
  powerPreference: string;
  maxAssetRetries: number;
  libraries: any[];
};

export type Layer = {
  name: string;
  opaqueSortMode: SortMode;
  transparentSortMode: SortMode;
};

export type LayerOrder = {
  layer: number;
  transparent: boolean;
  enabled: boolean;
};

export type Scene = {
  name: string;
  url: string;
};

type Basis = {
  filename: string;
  hash: string;
  size: number;
  sizeGzip: number;
  opt: number;
  quality: number;
  compressionMode: string;
  noFlip: boolean;
  url: string;
};
export type File = {
  filename: string;
  hash: string;
  size: number;
  variants: {
    basis: Basis;
  };
  url: string;
};

export type Data = {
  addressu: string;
  addressv: string;
  minfilter: string;
  magfilter: string;
  anisotropy: number;
  rgbm: boolean;
  mipmaps: boolean;
};

export type AssetType =
  | "animation"
  | "audio"
  | "binary"
  | "container"
  | "cubemap"
  | "css"
  | "font"
  | "html"
  | "json"
  | "material"
  | "model"
  | "script"
  | "shader"
  | "sprite"
  | "template"
  | "text"
  | "texture"
  | "textureatlas";
export type Asset = {
  name: string;
  type: AssetType;
  file: File;
  data: Data;
  preload: boolean;
  tags: any[];
  i18n: Record<string, any>;
  id: string;
};

export type Config = {
  application_properties: ApplicationProperties;
  scenes: Scene[];
  assets: { [key: string]: Asset };
};
