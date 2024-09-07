import pluginId from '../../utils/pluginId';

export default [
  {
    method: 'GET',
    path: '/config',
    handler: 'config.getPluginConfig',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.settings`],
          },
        },
      ],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/history',
    handler: 'azurePipeline.history',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/trigger',
    handler: 'azurePipeline.trigger',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/logs',
    handler: 'azurePipeline.logs',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
      auth: false,
    },
  },
];
