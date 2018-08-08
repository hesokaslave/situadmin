import React from 'react'
import { StyleSheet } from 'react-native';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from './Field'

export default class Familly extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const headerColor = this.props.headerColor
    const conjoint = (
      <CardItem header bordered style={{backgroundColor : headerColor}}>
      <Ionicons active name="ios-man" color = 'white' size={20} />
     <Text style={styles.header}>Type : Conjoint</Text>
     </CardItem>
   )
    const child = (
      <CardItem header bordered style={{backgroundColor : 'darkslateblue'}}>
      <Ionicons active name="ios-shirt" color = 'white' size={20} />
      <Text style={styles.header}>Type : Enfant</Text>
      </CardItem>
    )

    return (
      <Card style={styles.card}>
        {(this.props.type === 'Conjoint') ? conjoint : child}
        <Field champs="Nom" value = {this.props.nom} />
        <Field champs="Prenom" value = {this.props.prenom}  />
        <Field champs="Date Effet" value = {this.props.dateEffet} />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  header : {
    marginLeft : 15,
    fontSize:18,
    color : 'white',
    fontWeight : 'bold'
  },
  footer : {
    color : 'dodgerblue',
    fontSize : 12,
    textAlign : 'right',
    flex: 1
  },
  card : {
    marginBottom : 15
  }
})
