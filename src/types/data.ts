export type PlayCanvasOptions = {
  accessToken: string;
  scenes?: Array<number>;
  projectId?: number;
  branchId?: string;
  projectName?: string;
  remotePath: string;
};

export type Branch = {
  name: string;
  id: number;
};
export type Scene = {
  id: number;
  name: string;
};
