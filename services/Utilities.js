import { NetInfo } from 'react-native'
import { Constantes } from '../Constantes'
import { callGetApiWithTimout } from './APIservice'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

export function connTest () {
  return NetInfo.getConnectionInfo().then((connectionInfo) => {
     return (connectionInfo.type !== 'none')
  }).catch((error) =>{
    return false;
  });;
}

export function getConfig() {
      var url = `${Constantes.configServerURL}/${Constantes.configName}/${Constantes.env}`;
      return callGetApiWithTimout(url)
      .then(response => {
          return response.value
      }).catch(err => console.log('Error Loading Config : ' + err))
  }

export function GAnalytics(id,screen) {
  let tracker1 = new GoogleAnalyticsTracker(id);
  tracker1.trackScreenView(screen);
}
