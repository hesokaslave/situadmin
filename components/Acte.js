import React from 'react'
import { StyleSheet } from 'react-native';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from './Field'
import {GAnalytics} from '../services/Utilities'


export default class Acte extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const headerColor = this.props.headerColor
    return (
      <Card style={styles.card}>
        <CardItem header bordered style={{backgroundColor : headerColor}}>
         <Ionicons active name="ios-bookmark" color = 'white' size={20} />
          <Text style={styles.header}>Visa : {this.props.visa}</Text>
        </CardItem>
        <Field champs="Date Effet" value = {this.props.dateEffet} />
        <Field champs="Libellé" value = {this.props.libelle} />
        <Field champs="Décision" value = {this.props.decision}  />
        <Field champs="Date Décision" value = {this.props.dateDecision} />
      </Card>
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
  card : {
    marginBottom : 15
  }
})
