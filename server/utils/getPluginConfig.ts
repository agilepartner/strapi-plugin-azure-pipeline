import pluginId from "../../utils/pluginId";

export default function getPluginConfig(strapi) {
  return strapi.plugin(pluginId).config;
}
