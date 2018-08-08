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
import Ad from './Ad'
import {GAnalytics} from '../services/Utilities'

 class AdminSituation extends React.Component {
  constructor(props) {
    super(props)
    GAnalytics(this.props.AppConfig ? this.props.AppConfig.AnalyticsID : 'UA-123528544-1',"Admin")
  }

  render(){
    const headerColor = this.props.AppConfig.content.AdminScreen.headerColor ;
    const ad1 = (<Ad adSize={this.props.AppConfig.ads.AdminScreen.ad1Format}
                adUintID={this.props.AppConfig.ads.AdminScreen.ad1UnitID} />)
    const ad2 = (<Ad adSize={this.props.AppConfig.ads.AdminScreen.ad2Format}
                adUintID={this.props.AppConfig.ads.AdminScreen.ad2UnitID} />)
    return (
      <View style={{flex:1}}>
        <HeaderPane title={this.props.AppConfig.content.AdminScreen.title}
                    pro = {this.props}
                    color = {headerColor}
        />
        <Container style={{backgroundColor : '#e9eaed'}}>
             <Content padder>
               <Card style={styles.card}>
                 <CardItem header bordered style={{backgroundColor : headerColor}}>
                  <Ionicons active name="ios-ribbon" color = 'white' size={20} />
                   <Text style={styles.header}>
                     {this.props.AppConfig.content.AdminScreen.header1Title}
                   </Text>
                 </CardItem>
                 <Field champs="D.O.T.I" value = {this.props.data.situation.id} />
                 <Field champs="Nom" value = {this.props.data.situation.nom} />
                 <Field champs="Prenom" value = {this.props.data.situation.prenom} />
                 <Field champs="C.I.N" value = {this.props.data.situation.cin} />
                 <Field champs="Sexe" value = {this.props.data.situation.sexe} />
                 <Field champs="Nationalité" value = {this.props.data.situation.nationalite} />
                 <Field champs="Date Naissance" value = {this.props.data.situation.dateNaissance} />
                 <Field champs="Situation Familliale" value = {this.props.data.situation.situationFamille} />
                 <CardItem footer bordered>
                   <Text style={styles.footer}>{this.props.data.situation.lastUpdate}</Text>
                 </CardItem>
               </Card>

               {( this.props.AppConfig.ads.AdminScreen.ad1 && this.props.AppConfig.ads.enable ) ? ad1 : null}

               <Card style={styles.card}>
               <CardItem header bordered style={{backgroundColor : headerColor}}>
                <Ionicons active name="ios-star" color = 'white' size={20} />
                 <Text style={styles.header}>
                   {this.props.AppConfig.content.AdminScreen.header2Title}
                 </Text>
               </CardItem>
               <Field champs="US-1" value = {this.props.data.situation.us1} />
               <Field champs="US-2" value = {this.props.data.situation.us2} />
               <Field champs="Date Ancienne Administration" value = {this.props.data.situation.dateAncienneAdmin} />
               <Field champs="Poste Budgetaire" value = {this.props.data.situation.posteBudgetaire} />
               <Field champs="Grade" value = {this.props.data.situation.grade} />
               <Field champs="Date Grade" value = {this.props.data.situation.dateGrade} />
               <Field champs="Grade" value = {this.props.data.situation.grade} />
               <Field champs="Date Grade" value = {this.props.data.situation.dateGrade} />
               <Field champs="Echelle" value = {this.props.data.situation.echelle} />
               <Field champs="Echellon" value = {this.props.data.situation.echelon} />
               <Field champs="Date Ancien Echellon" value = {this.props.data.situation.dateAncienEchelon} />
               <Field champs="Indice" value = {this.props.data.situation.indice} />
               <Field champs="Specialité" value = {this.props.data.situation.specialite} />
               <Field champs="Date Specialité" value = {this.props.data.situation.dateSpecialite} />
               <Field champs="position" value = {this.props.data.situation.position} />
               <Field champs="Date Position" value = {this.props.data.situation.datePosition} />
               <Field champs="Status" value = {this.props.data.situation.status} />
               <CardItem footer bordered>
                 <Text style={styles.footer}>{this.props.data.situation.lastUpdate}</Text>
               </CardItem>
          </Card>
          {( this.props.AppConfig.ads.AdminScreen.ad2 && this.props.AppConfig.ads.enable ) ? ad2 : null}
        </Content>
      </Container>
    </View>
      )
    }
  }

  const styles = StyleSheet.create({
    header : {
      marginLeft : 15,
      fontSize:16,
      color : 'white',
      fontWeight : 'bold'
    },
    field : {
      fontSize:10,
      color : 'grey',
      marginBottom : 5
    },
    value : {
      fontFamily: 'roboto',
      fontSize:18,
      fontWeight : 'bold',
      color: 'black'
    },
    footer : {
      color : 'dodgerblue',
      fontSize : 10,
      textAlign : 'right',
      flex: 1
    },
    card : {
      marginBottom : 15
    }
  })

  function mapStateToProps(state) {
    return {
      data : state.data,
      AppConfig : state.AppConfig
    };
  }

export default connect(mapStateToProps)(AdminSituation);
