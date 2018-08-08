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


 class FinanSituation extends React.Component {

  constructor(props) {
    super(props)
    GAnalytics(this.props.AppConfig ? this.props.AppConfig.AnalyticsID : 'UA-123528544-1',"Finan")

  }

  render(){
    const headerColor = this.props.AppConfig.content.FinanScreen.headerColor
    const ad1 = (<Ad adSize={this.props.AppConfig.ads.FinanScreen.ad1Format}
                adUintID={this.props.AppConfig.ads.FinanScreen.ad1UnitID} />)
    const ad2 = (<Ad adSize={this.props.AppConfig.ads.FinanScreen.ad2Format}
                adUintID={this.props.AppConfig.ads.FinanScreen.ad2UnitID} />)
    return (
      <View style={{flex:1}}>
        <HeaderPane title={this.props.AppConfig.content.FinanScreen.title}
                    pro = {this.props}
                    color = {headerColor}
        />
        <Container style={{backgroundColor : '#e9eaed'}}>
             <Content padder>
               <Card style={styles.card}>
                 <CardItem header bordered style={{backgroundColor : headerColor}}>
                  <Ionicons active name="ios-ribbon" color = 'white' size={20} />
                   <Text style={styles.header}>
                     {this.props.AppConfig.content.FinanScreen.header1Title}
                   </Text>
                 </CardItem>
                 <Field champs="D.O.T.I" value = {this.props.data.salaire.id} />
                 <Field champs="Nom Complet" value = {this.props.data.salaire.nom} />
                 <Field champs="C.I.N" value = {this.props.data.salaire.cin} />
                 <Field champs="Sexe" value = {this.props.data.salaire.sexe} />
                 <Field champs="Nationalité" value = {this.props.data.salaire.nationalite} />
                 <Field champs="Date Naissance" value = {this.props.data.salaire.dateNaissance} />
                 <Field champs="Situation Familliale" value = {this.props.data.salaire.situationFamille} />
                 <Field champs="Nombre Enfants" value = {this.props.data.salaire.nombreEnfants} />
                 <CardItem footer bordered>
                   <Text style={styles.footer}>{this.props.data.salaire.lastUpdate}</Text>
                 </CardItem>
               </Card>

               {( this.props.AppConfig.ads.FinanScreen.ad1 && this.props.AppConfig.ads.enable ) ? ad1 : null}

               <Card style={styles.card}>
               <CardItem header bordered style={{backgroundColor : headerColor}}>
                <Ionicons active name="ios-star" color = 'white' size={20} />
                 <Text style={styles.header}>
                   {this.props.AppConfig.content.FinanScreen.header2Title}
                 </Text>
               </CardItem>

               <Field champs="Date Entrée" value = {this.props.data.salaire.dateEntree} />
               <Field champs="Grade" value = {this.props.data.salaire.grade} />
               <Field champs="Echelle" value = {this.props.data.salaire.echelle} />
               <Field champs="Echelon" value = {this.props.data.salaire.echelon} />
               <Field champs="Indice" value = {this.props.data.salaire.indice} />
               <Field champs="Zone" value = {this.props.data.salaire.zone} />
               <Field champs="Affectation" value = {this.props.data.salaire.affectation} />
               <Field champs="Imputation" value = {this.props.data.salaire.imputation} />
               <Field champs="Brut Annuel" value = {this.props.data.salaire.brutAnnuel +" DH"} />
               <Field champs="Base Imposable" value = {this.props.data.salaire.baseImposable+" DH"} />
               <Field champs="Net Annuel" value = {this.props.data.salaire.netAnnuel+" DH"} />
               <Field champs="Position" value = {this.props.data.salaire.position} />
               <Field champs="Net Mensuel" value = {this.props.data.salaire.netMensuel+" DH"} />
               <CardItem footer bordered>
                 <Text style={styles.footer}>{this.props.data.salaire.lastUpdate}</Text>
               </CardItem>
               </Card>

               {( this.props.AppConfig.ads.FinanScreen.ad2 && this.props.AppConfig.ads.enable ) ? ad2 : null}

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
export default connect(mapStateToProps)(FinanSituation);
