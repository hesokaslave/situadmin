import React from  'react'
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native'
import {
  Icon,
  Card,
  CardItem
} from 'native-base';

export default class Teaser extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    const headerColor = this.props.headerColor ? this.props.headerColor : 'black'
    return(
      <Card style = {styles.container}>
        <Text style={[styles.title,{color : headerColor}]}>
          {this.props.title}
        </Text>
        <Text style={styles.body}>
          {this.props.body}
        </Text>
        <View style={styles.btn}>
          <Button
            onPress={this.props.Press}
            title={this.props.btn_msg}
            color={this.props.btn_color}
          />
        </View>
      </Card>
    );
  }

  }

  const styles = StyleSheet.create({
    container : {
      marginRight : 10,
      marginLeft : 10,
      marginTop : 10,
      padding : 15,
      backgroundColor : '#f6f7f8'
    },
    title : {
        fontSize : 18,
        marginVertical : 5,
        fontWeight : 'bold'
    },
    body : {
      fontSize : 15,
      lineHeight : 25
    },
    btn : {
      marginVertical : 10
    }
  })
