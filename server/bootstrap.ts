import { Strapi } from '@strapi/strapi';
import pluginId from '../utils/pluginId';

export default async ({ strapi }: { strapi: Strapi }) => {
  const actions = [
    {
      section: 'plugins',
      subCategory: 'general',
      displayName: 'Trigger builds',
      uid: 'trigger',
      pluginName: pluginId,
    },
    {
      section: 'settings',
      category: 'static site build',
      displayName: 'Access settings',
      uid: 'settings',
      pluginName: pluginId,
    },
  ];
  await strapi.admin?.services.permission.actionProvider.registerMany(actions);
};
