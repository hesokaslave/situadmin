import React from 'react'
import { View,StyleSheet } from 'react-native'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

export default class Ad extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <AdMobBanner
              adSize={this.props.adSize}
              adUnitID={this.props.adUintID}
              testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)}
            />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container : { 
  marginVertical : 10

  }
})
