import { path } from '@vuepress/utils';
import { getDirFiles, relativeForPress } from '../utils/filehelper';

const getSidebar = (pathname: string): string[] => {
  const files = getDirFiles(path.resolve(__dirname, pathname), /.md$/);

  return files.map((file) => relativeForPress(file));
};

const createSidebar = (pathname: string, name: string): any => {
  const sidebarKey = relativeForPress(pathname);

  const list = getSidebar(pathname);

  const curSidebar = {
    [sidebarKey]: [
      {
        text: name,
        children: list,
      },
    ],
  };
  return curSidebar;
};

const sidebar = {
  ...createSidebar(path.resolve(__dirname, '../../pages/fe/css'), 'CSS'),
  ...createSidebar(path.resolve(__dirname, '../../pages/fe/js'), 'Javascript'),
  ...createSidebar(path.resolve(__dirname, '../../pages/fe/html'), 'HTML'),
  ...createSidebar(path.resolve(__dirname, '../../pages/leecode'), 'LeeCode'),
  ...createSidebar(path.resolve(__dirname, '../../pages/work'), 'Work'),
  ...createSidebar(path.resolve(__dirname, '../../pages/framework/vue'), 'Vue'),
  ...createSidebar(
    path.resolve(__dirname, '../../pages/framework/react'),
    'React'
  ),
};

export default sidebar;
