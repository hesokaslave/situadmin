import React from 'react'
import { Alert } from 'react-native'
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from 'native-base';
import { connect } from 'react-redux'

class HeaderPane extends React.Component {
  constructor(props){
    super(props)
    this.logOut= this.logOut.bind(this);
  }

  logOut(){
    Alert.alert(
      this.props.AppConfig.content.QuitMessage.title ,
      this.props.AppConfig.content.QuitMessage.body, [{
          text: 'Annuler',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: this.props.AppConfig.content.QuitMessage.OKbtn,
          onPress: () => {
            this.props.pro.navigation.navigate('AuthLoadingScreen');
          }
      }, ], {
          cancelable: false
      }
   )
   return true;
  }


  render(){
    //#4285f4
    const color = this.props.color ? this.props.color : '#4285f4';
    return (
    <Header style={{backgroundColor : color}}>
      <Left>
        <Button transparent onPress={()=>this.props.pro.navigation.openDrawer()}>
          <Icon name='menu' style={{color : 'white'}} />
        </Button>
      </Left>
      <Body>
        <Title style={{color : 'white'}}>{this.props.title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={this.logOut}>
          <Text style={{color : 'white',marginRight : 5}}>Quitter</Text>
          <Icon name='log-out' style={{color : 'white'}}/>
        </Button>
      </Right>
    </Header>
  )
  }
}


function mapStateToProps(state) {
  return {
    AppConfig : state.AppConfig,
    data : state.data,
  };
}
export default connect(mapStateToProps)(HeaderPane);
