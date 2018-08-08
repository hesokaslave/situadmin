import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  Icon,
  Card,
  CardItem
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderPane from './Header'
import Field from './Field'
import Teaser from './Teaser'
import SecretField from './SecretField'
import Ad from './Ad'

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const salaire = this.props.data.salaire.netMensuel +' DH';
    const ad1 = (<Ad adSize={this.props.AppConfig.ads.HomeScreen.ad1Format}
                adUintID={this.props.AppConfig.ads.HomeScreen.ad1UnitID} />)
    const ad2 = (<Ad adSize={this.props.AppConfig.ads.HomeScreen.ad2Format}
                adUintID={this.props.AppConfig.ads.HomeScreen.ad2UnitID} />)
    return (
      <View style={styles.container}>
        <HeaderPane title={this.props.AppConfig.content.HomeScreen.title}
                    pro = {this.props}
                  color = '#4285f4'
        />
        <ScrollView style={{backgroundColor : '#e9eaed'}}>
            <Card style={styles.card}>
              <CardItem header bordered style={{backgroundColor : 'royalblue'}}>
                <Icon name="ios-home" style={{color : 'white',  fontSize : 25}} />
                <Text style={styles.header}>{this.props.AppConfig.content.HomeScreen.ResumeTeaser.title}</Text>
              </CardItem>
              <Field champs="Nom et Prenom" value={this.props.data.salaire.nom} />
              <Field champs="D.O.T.I" value = {this.props.data.salaire.id}  />
              <Field champs="Grade" value = {this.props.data.salaire.grade}  />
              <Field champs="Spécialité" value = {this.props.data.situation.specialite}  />
              <SecretField champs="Salaire Net Mensuel" value = {salaire}/>
              <CardItem footer bordered>
                <Text style={styles.footer}>
                  {this.props.data.salaire.lastUpdate}
                </Text>
              </CardItem>
            </Card>

            {( this.props.AppConfig.ads.HomeScreen.ad1 && this.props.AppConfig.ads.enable ) ? ad1 : null}

          <Teaser
            title = {this.props.AppConfig.content.HomeScreen.AdminTeaser.title}
            body = {this.props.AppConfig.content.HomeScreen.AdminTeaser.body}
            btn_msg = {this.props.AppConfig.content.HomeScreen.AdminTeaser.btnLabel}
            btn_color =  {this.props.AppConfig.content.HomeScreen.AdminTeaser.btnColor}
            headerColor = {this.props.AppConfig.content.HomeScreen.AdminTeaser.btnColor}
            Press = {()=> this.props.navigation.navigate('Admin')}
          />
          <Teaser
            title = {this.props.AppConfig.content.HomeScreen.FinanTeaser.title}
            body = {this.props.AppConfig.content.HomeScreen.FinanTeaser.body}
            btn_msg = {this.props.AppConfig.content.HomeScreen.FinanTeaser.btnLabel}
            btn_color =  {this.props.AppConfig.content.HomeScreen.FinanTeaser.btnColor}
            headerColor =  {this.props.AppConfig.content.HomeScreen.FinanTeaser.btnColor}
            Press = {()=>this.props.navigation.navigate('Finance')}
          />
          <Teaser
            title = {this.props.AppConfig.content.HomeScreen.FamTeaser.title}
            body = {this.props.AppConfig.content.HomeScreen.FamTeaser.body}
            btn_msg = {this.props.AppConfig.content.HomeScreen.FamTeaser.btnLabel}
            btn_color =  {this.props.AppConfig.content.HomeScreen.FamTeaser.btnColor}
            headerColor =  {this.props.AppConfig.content.HomeScreen.FamTeaser.btnColor}
            Press = {() => this.props.navigation.navigate('Famille')}
          />
          <Teaser
            title = {this.props.AppConfig.content.HomeScreen.ActesTeaser.title}
            body = {this.props.AppConfig.content.HomeScreen.ActesTeaser.body}
            btn_msg = {this.props.AppConfig.content.HomeScreen.ActesTeaser.btnLabel}
            btn_color =  {this.props.AppConfig.content.HomeScreen.ActesTeaser.btnColor}
            headerColor =  {this.props.AppConfig.content.HomeScreen.ActesTeaser.btnColor}
            Press = {() => this.props.navigation.navigate('Actes')}
          />
            {( this.props.AppConfig.ads.HomeScreen.ad2 && this.props.AppConfig.ads.enable ) ? ad2 : null}
        </ScrollView>
      </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container : {
      flex:1,
    },
    card : {
      marginRight : 10,
      marginLeft : 10,
      marginTop : 10,
    },
    header : {
      color : 'white',
      fontSize : 20,
      fontWeight : 'bold'
    },
    footer : {
      color : 'royalblue',
      textAlign:'right',
      fontSize:10,
      flex:1
    }
  });

function mapStateToProps(state) {
  return {
      data : state.data,
      AppConfig : state.AppConfig
  };
}
export default connect(mapStateToProps)(HomeScreen);
