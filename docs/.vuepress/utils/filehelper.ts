import fs from 'fs';
import { path, relativePath } from './path';

const defaultExcludes = ['.DS_Store', 'README.md', 'readme.md'];

/**
 * 获取文件夹对应的sidebar配置
 * @param {string} dir string
 * @returns sidebar配置。已处理过路径
 */
export const getDirFiles = (
  dir: string,
  reg: RegExp,
  excludes: string[] = []
): string[] => {
  const files = [];
  const curExcludes = defaultExcludes.concat(excludes);
  // const fileType = /.md$/;
  fs.readdirSync(dir).forEach((file) => {
    if (curExcludes.indexOf(file) === -1) {
      const fullPath = `${dir}/${file}`;
      const fileInfo = fs.statSync(fullPath);
      if (fileInfo.isFile()) {
        if (reg.test(file)) {
          files.push(fullPath);
        }
      }
    }
  });
  return files.sort();
};

export const relativeForPress = (pathname: string): string =>
  '/' + relativePath(path.resolve(__dirname, '../../'), pathname);

export const parseMarkdownName = (mdName: string) => {
  const [sortIndex, cname, ename] = mdName.split('.');
  return {
    sortIndex,
    ename,
    cname: cname.replace(/^\w/, (s) => s.toUpperCase()),
  };
};
