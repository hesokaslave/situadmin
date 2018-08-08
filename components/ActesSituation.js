import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Button
} from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

import Field from './Field'
import HeaderPane from './Header'
import Acte from './Acte'
import Ad from './Ad'

import {GAnalytics} from '../services/Utilities'

 class ActesSituation extends React.Component {
  constructor(props) {
    super(props)
    GAnalytics(this.props.AppConfig ? this.props.AppConfig.AnalyticsID : 'UA-123528544-1',"Actes")

  }

  render(){
    const ad1 = (<Ad adSize={this.props.AppConfig.ads.ActesScreen.ad1Format}
                adUintID={this.props.AppConfig.ads.ActesScreen.ad1UnitID} />)
    const ad2 = (<Ad adSize={this.props.AppConfig.ads.ActesScreen.ad2Format}
                adUintID={this.props.AppConfig.ads.ActesScreen.ad2UnitID} />)
    return (
      <View style={{flex:1}}>
        <HeaderPane title={this.props.AppConfig.content.ActesScreen.title}
                    pro = {this.props}
                    color = {this.props.AppConfig.content.ActesScreen.headerColor}
        />
        <Container style={{backgroundColor : '#e9eaed'}}>
          {( this.props.AppConfig.ads.ActesScreen.ad1 && this.props.AppConfig.ads.enable ) ? ad1 : null}
             <Content padder>
               {this.props.data.actes.map(
                 r => { return (
                   <Acte
                     key={r.visa}
                     visa={r.visa}
                     libelle={r.libelle}
                     decision={r.decision}
                     dateEffet={r.dateEffet}
                     dateDecision={r.dateDecision}
                     headerColor = {this.props.AppConfig.content.ActesScreen.headerColor}
                   />
                 )}
              )}
              {( this.props.AppConfig.ads.ActesScreen.ad2 && this.props.AppConfig.ads.enable ) ? ad2 : null}
            </Content>
          </Container>
        </View>
      )
    }
}

  const styles = StyleSheet.create({

  })

    function mapStateToProps(state) {
      return {
          data : state.data,
          AppConfig : state.AppConfig
      };
    }

export default connect(mapStateToProps)(ActesSituation);
