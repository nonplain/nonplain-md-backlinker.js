export type BacklinkerOptions = {
  keyFn?: (directory: string, path: string) => string;
  metadataProperty?: string;
};
