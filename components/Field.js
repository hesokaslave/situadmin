import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import {
  CardItem,
  Text,
  Body,
  Badge
} from 'native-base';

export default class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    Showbadge(text) {
        if(text === 'VISÉ')
           return (
             <Badge success>
               <Text style = {{fontWeight : 'bold',fontSize : 16, padding : 2}}>
                 {text}
               </Text>
             </Badge>
           )
        else
          return (
            <Badge warning>
              <Text style = {{fontWeight : 'bold',fontSize : 16, padding : 2}}>
                {text}
              </Text>
           </Badge>
          )
    }

    render() {
        return (
          <CardItem bordered style={{backgroundColor : 'whitesmoke'}}>
            <Body style={{backgroundColor : 'whitesmoke'}}>
              <Text style={styles.field}>
                {this.props.champs}
              </Text>
              { (this.props.champs === 'Décision') ?
                    this.Showbadge(this.props.value)
                    : <Text style={styles.value}>
                        {this.props.value}
                      </Text>
              }
            </Body>
          </CardItem>
        )
    }
}

const styles = StyleSheet.create({
    field : {
      fontSize:11,
      color : 'grey',
      marginBottom : 3
    },
    value : {
      fontSize:16,
      fontWeight : 'bold'
    },
  });
