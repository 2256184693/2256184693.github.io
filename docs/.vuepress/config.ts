// import { path } from '@vuepress/utils';
import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import sidebar from './config/sidebar';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  title: '丶独伤',
  description: '前端工程师的知识总结',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/favicon.ico',
      },
    ],
    ['meta', { name: 'application-name', content: 'VuePress' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  bundler: isProd ? '@vuepress/webpack' : '@vuepress/vite',
  // theme: path.resolve(__dirname, './theme')
  themeConfig: {
    logo: '/images/avatar.jpg',
    navbar: [
      {
        text: '知识图谱',
        children: [
          {
            text: 'HTML',
            link: '/pages/fe/html',
          },
          {
            text: 'Javascript',
            link: '/pages/fe/js',
          },
          {
            text: 'CSS',
            link: '/pages/fe/css',
          },
        ],
      },
      {
        text: '框架',
        children: [
          {
            text: 'React',
            link: '/pages/framework/react',
          },
          {
            text: 'Vue',
            link: '/pages/framework/vue',
          },
        ],
      },
      {
        text: 'LeeCode',
        link: '/pages/leecode',
      },
      {
        text: '问题记录',
        link: '/pages/work/',
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/2256184693',
      },
    ],
    sidebar: sidebar,
    editLinkText: '编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',

    backToHome: '返回首页',

    // a11y
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
  },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: '搜索',
          },
        },
        // 排除首页
        isSearchable: (page) => page.path !== '/',
        // 允许搜索 Frontmatter 中的 `tags`
        getExtraFields: (page) => page.frontmatter.tags ?? [],
      },
    ],
  ],
});
