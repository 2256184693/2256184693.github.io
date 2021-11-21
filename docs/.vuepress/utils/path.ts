import { path as pathDir } from '@vuepress/utils';

export const path = pathDir;

export type ParsedPath = pathDir.ParsedPath;

export const relativePath = (from: string, to: string): string =>
  path.relative(from, to);
