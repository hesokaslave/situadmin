import React from 'react'
import {
View
} from 'react-native';
import {
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'

import AdminSituation from './components/AdminSituation'
import FinanSituation from './components/FinanSituation'
import FamSituation from './components/FamSituation'
import ActesSituation from './components/ActesSituation'
import SideMenu from './components/SideMenu'
import HomeScreen from './components/HomeScreen'
import AuthLoadingScreen from './components/AuthLoadingScreen'
import ContactScreen from './components/ContactScreen'

import { Provider } from 'react-redux'
import { store } from './Store.js'

export default class App extends React.Component {
    constructor(props){
      super(props)
    }

    render(){
      return (
        <Provider store={store}>
          <RootStack/>
        </Provider>
      )
    }
}

const Drawer = createDrawerNavigator({
      Home: HomeScreen,
      Admin: AdminSituation,
      Finance : FinanSituation,
      Famille : FamSituation,
      Actes : ActesSituation,
      Contact : ContactScreen,
    },
    {
      initialRouteName: 'Home',
      contentComponent: SideMenu,
    })

const RootStack =  createSwitchNavigator({
    AuthLoadingScreen : AuthLoadingScreen,
    Drawer : Drawer
  },
  {
    initialRouteName: 'AuthLoadingScreen',
  }
);
