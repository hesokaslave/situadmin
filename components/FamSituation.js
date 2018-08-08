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
import Familly from './Familly'
import Ad from './Ad'
import {GAnalytics} from '../services/Utilities'


 class FamSituation extends React.Component {
  constructor(props) {
    super(props)
    GAnalytics(this.props.AppConfig ? this.props.AppConfig.AnalyticsID : 'UA-123528544-1',"Fam")

  }

  render(){
    const ad1 = (<Ad adSize={this.props.AppConfig.ads.FamScreen.ad1Format}
                adUintID={this.props.AppConfig.ads.FamScreen.ad1UnitID} />)
    const ad2 = (<Ad adSize={this.props.AppConfig.ads.FamScreen.ad2Format}
                adUintID={this.props.AppConfig.ads.FamScreen.ad2UnitID} />)
    return (
      <View style={{flex:1}}>
        <HeaderPane title={this.props.AppConfig.content.FamScreen.title}
          pro = {this.props}
          color = {this.props.AppConfig.content.FamScreen.headerColor}
        />
        <Container style={{backgroundColor : '#e9eaed'}}>
          {( this.props.AppConfig.ads.FamScreen.ad1 && this.props.AppConfig.ads.enable ) ? ad1 : null}
             <Content padder >

               {
              this.props.data.famille.length !== 0 ?  this.props.data.famille.map(
                 r => { return (
                   <Familly
                     headerColor = {this.props.AppConfig.content.FamScreen.headerColor}
                     key={r.prenom}
                     nom={r.nom}
                     prenom={r.prenom}
                     dateEffet={r.dateEffet}
                     type={r.type}/>
                 )}
               ) :
                <View style={{flex: 1, justifyContent: 'center', alignItems : 'center'}}>
                  <Text style={{fontSize : 15, fontWeight : 'bold'}}>Aucun Membre de Famille !
                </Text>
              </View>

             }
             {( this.props.AppConfig.ads.FamScreen.ad2 && this.props.AppConfig.ads.enable ) ? ad2 : null}
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
        AppConfig : state.AppConfig,
        data : state.data
    };
  }

export default connect(mapStateToProps)(FamSituation);
