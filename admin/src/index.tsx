import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import pluginId from './pluginId';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {

    // Main page
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "update-static-content-plugin-[request]" */ './pages/PluginRoute'
        );

        return component;
      },
      //permissions: pluginPermissions.trigger,
      permissions: []
    });

    // Settings page
    const pluginPrefix = `${pluginId}.settings`;
    app.createSettingSection(
      {
        id: pluginPrefix,
        intlLabel: {
          id: `${pluginPrefix}.title`,
          defaultMessage: name,
        },
      },
      [
        {
          id: pluginPrefix,
          intlLabel: {
            id: `${pluginPrefix}.subtitle.link`,
            defaultMessage: 'Configuration',
          },
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "update-static-content-setting-[request]" */ './pages/PluginRoute'
            );
            return component;
          },
          //permissions: pluginPermissions.settings,
          permissions: []
        },
      ]
    );

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };
    app.registerPlugin(plugin);
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
