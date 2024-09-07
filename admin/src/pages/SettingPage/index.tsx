import { CheckPagePermissions } from "@strapi/helper-plugin";
import pluginId from "../../../../utils/pluginId";
import pluginPermissions from "../../permissions";

const ProtectedPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingPage />
  </CheckPagePermissions>
);

const SettingPage = () => {
  return (
    <div style={{ color: "white" }}>
      <h1>{pluginId}&apos;s Settings Page</h1>
      <p>Happy coding</p>
    </div>
  )
}

export default ProtectedPage
