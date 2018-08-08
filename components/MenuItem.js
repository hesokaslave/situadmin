import React from 'react'
import {
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right ,Body} from 'native-base';


export default class MenuItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const color = this.props.color ? this.props.color : 'dodgerblue'
    return(
      <TouchableOpacity onPress={this.props.onPressed} activeOpacity={0.6}>
      <CardItem bordered style={{justifyContent:'space-between'}}>
              <Icon active name={this.props.image} style={{color: color}}  />
              <Text>{this.props.text}</Text>
              <Right>
                <Icon name="arrow-forward" style={{textAlign : 'right'}}/>
              </Right>
      </CardItem>
    </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  container  : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center'
  },
  image :{
    height : 30,
    width : 30,
    margin : 10
  },
  text : {
    fontSize : 19,
    margin : 10,
    marginTop : 14,
    marginLeft : 5,
    color : 'dodgerblue'
  }
})
