import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert
} from 'react-native'
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Icon,
  Form,
  Textarea,
  Item,
  Input
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import img from './images/contact.png'
import {connect} from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import HeaderPane from './Header'
import { callPostApi } from '../services/APIservice'

import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";

 class Contact extends React.Component {
   constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this)
    this.confirmation = this.confirmation.bind(this)
    this.showAlert = this.showAlert.bind(this)

    this.state = {
      showAlert: false,
      titleAlert : '',
      bodyAlert : '',
      btnAlert : '',
      name : '',
      email : '',
      telephone : '',
      body : ''
    };
    let tracker1 = new GoogleAnalyticsTracker("UA-123444746-1");
    tracker1.trackScreenView("Contact");
  };

  showAlert  = (title,body,btn,cancelable,action) => {
    Alert.alert(
      title ,
      body, [{
          text: 'Annuler',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: btn,
          onPress: () => action
      }, ], {
          cancelable: cancelable
      }
   )
   return true;
  }

  confirmation = () => {
    this.showAlert(
      this.props.AppConfig.content.ContactScreen.confirmation.title,
      this.props.AppConfig.content.ContactScreen.confirmation.body,
      this.props.AppConfig.content.ContactScreen.confirmation.btn,
      true,
      this.sendMessage()
    )
  }

  sendMessage = () => {
    const url = this.props.AppConfig.contactURL
    callPostApi(url,{
        name : this.state.name,
        telephone : this.state.telephone,
        email : this.state.email,
        body : this.state.body
    }).then((response) => {
        this.showAlert('Envoi Réussi', 'Message Envoye avec succes', 'OK', console.log('success'))
        this.setState({
          name : '',
          email : '',
          telephone : '',
          body : ''
        });
    }).catch((err) => {
      this.showAlert(
        'error',
        'error sending message',
        'ok',
        true
      )
      console.log(err);
      })
  };

  render() {

    return (
      <Container >
        <HeaderPane title={this.props.AppConfig.content.ContactScreen.title} pro = {this.props}/>
        <Content>
          <Image source={img} style={{margin : 30, marginBottom :5}} />
          <Form style={styles.form}>
            <View style={{flex:1, width : 350}}>
              <Item>
                <Icon active name='ios-person' />
                <Input placeholder={this.props.AppConfig.content.ContactScreen.namePlaceholder}
                      onChangeText={(text)=>this.setState({name : text.toString()})}/>
              </Item>
              <Item>
                <Icon active name='ios-call' />
                <Input placeholder={this.props.AppConfig.content.ContactScreen.telPlaceholder}
                      onChangeText={(text)=>this.setState({telephone : text.toString()})} />
              </Item>
              <Item>
                <Icon active name='ios-mail' />
                <Input placeholder={this.props.AppConfig.content.ContactScreen.emailPlaceholder}
                      onChangeText={(text)=>this.setState({email : text.toString()})}/>
              </Item>
              <Item>
                <Icon active name='ios-paper-plane' />
                <Textarea rowSpan={4}
                          placeholder={this.props.AppConfig.content.ContactScreen.messagePlaceholder}
                          style={{flex:1,fontSize : 17}}
                          onChangeText={(text)=>this.setState({body : text.toString()})}/>
              </Item>
            </View>
            <View style={{flex : 1}}>
                  <Button  success style={{margin : 20}}
                            onPress={this.sendMessage} >
                      <Text> {this.props.AppConfig.content.ContactScreen.btnLabel}</Text>
                  </Button>
            </View>
        </Form>
        <Text  style={styles.disclaimer}>
          {this.props.AppConfig.content.ContactScreen.disclaimer}
        </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  },
  form :{
      flex :2,
      flexDirection : 'column',
      alignItems : 'center'
  },
  disclaimer : {
    textAlign  :'center',
    color : 'dodgerblue',
    fontSize : 12,
    margin : 10
  }
});

function mapStateToProps(state) {
  return {
      data : state.data,
      AppConfig : state.AppConfig
  };
}
export default connect(mapStateToProps)(Contact);
