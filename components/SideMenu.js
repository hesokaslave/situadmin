
import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native'
import {
  Card,
  CardItem,
  Text,
  Icon,
} from 'native-base';

import { connect } from 'react-redux'
import AppLink from 'react-native-app-link';
import MenuItem from './MenuItem'
import logo from './images/icon.png'
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

class SideMenu extends React.Component {
  constructor(props){
    super(props)
    this.rateApp = this.rateApp.bind(this)
  }

  rateApp(){
    Alert.alert(
      this.props.AppConfig.content.Rate.title ,
      this.props.AppConfig.content.Rate.body, [{
          text: 'Plus tard',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: this.props.AppConfig.content.Rate.OKbtn,
          onPress: () => {
            AppLink.openInStore(
              this.props.AppConfig.appStore.appID,
              this.props.AppConfig.playstore.packageID)
          .then(() => {
            let tracker1 = new GoogleAnalyticsTracker("UA-123444746-1");
                tracker1.trackEvent("PlayStore Opened", "Rating Done");
            console.log('store opened')

          })
          .catch((err) => {
            console.log(err)
          });
          }
      }, ], {
          cancelable: false
      }
   )
   return true;
  }

  onPress(destination){
      this.props.navigation.navigate(destination);
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <Text style={styles.title}>
              {this.props.AppConfig.content.drawer.appTitle}
          </Text>
        </View>
        <ScrollView>
        <Card style={{marginTop : 0}}>
          <MenuItem
              text={this.props.AppConfig.content.drawer.home}
              image={'ios-home'}
              onPressed={()=>this.onPress('Home')}
          />
          <MenuItem
              text={this.props.AppConfig.content.drawer.situation}
              image={'ios-compass'}
              onPressed={()=>this.onPress('Admin')}
          />
          <MenuItem
              text={this.props.AppConfig.content.drawer.salaire}
              image={'ios-cash'}
              onPressed={()=>this.onPress('Finance')}
          />
          <MenuItem text={this.props.AppConfig.content.drawer.famille}
              image={'ios-contacts'}
              onPressed={()=>this.onPress('Famille')}
          />
          <MenuItem text={this.props.AppConfig.content.drawer.actes}
              image={'ios-create-outline'}
              onPressed={()=>this.onPress('Actes')}
          />
          <MenuItem text={this.props.AppConfig.content.drawer.contact}
              image={'ios-mail'}
              onPressed={()=>this.onPress('Contact')}
          />
          <MenuItem text={this.props.AppConfig.content.drawer.rateApp}
              image={'ios-star'}
              color={'goldenrod'}
              onPressed={this.rateApp}
          />
          <CardItem footer bordered>
            <Text style={styles.footer}>
              Version de l'application : {this.props.AppConfig.content.drawer.appVersion}
            </Text>
          </CardItem>
        </Card>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'white',
    flex : 1,
  },
  header :{
    padding : 15,
    backgroundColor : 'dodgerblue',
    alignItems : 'center',

  },
  logo : {
    //height : 150,
    //width : 150,
  },
  title : {
    alignItems : 'center',
    fontSize : 13,
    fontWeight : 'bold',
    color : 'white',
    lineHeight : 25,
    textAlign : 'center'
  },
  footer : {
    color : 'dodgerblue',
    fontSize : 12,
    textAlign : 'center',
    flex: 1
  },
})

function mapStateToProps(state) {
  return {
    AppConfig : state.AppConfig,
    data : state.data,
  };
}
export default connect(mapStateToProps)(SideMenu);
