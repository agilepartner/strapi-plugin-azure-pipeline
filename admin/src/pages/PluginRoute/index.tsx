import { AnErrorOccurred } from '@strapi/helper-plugin';
import { Route, Switch } from 'react-router-dom';
import pluginId from '../../../../utils/pluginId';
import PluginPage from '../PluginPage';
import SettingPage from '../SettingPage';

const PluginRoute = () => {
  return (
    <div>
      <Switch>
        <Route path={`/settings/${pluginId}`} component={SettingPage} exact />
        <Route path={`/plugins/${pluginId}`} component={PluginPage} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default PluginRoute;
