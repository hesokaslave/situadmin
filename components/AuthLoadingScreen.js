import React from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  NetInfo,
  ScrollView,
} from 'react-native';
import {
  Item,
  Input,
  Text,
  Icon
} from 'native-base';
import { connect } from 'react-redux'
import { callPostApi,callGetApi, callGetApiWithTimout} from '../services/APIservice'
import { connTest,getConfig } from '../services/Utilities'
import { AppConfig } from '../AppConfig'
import logoApp from './images/logoApp.png'
import { Constantes } from  '../Constantes'
import AppLink from 'react-native-app-link';
import {GAnalytics} from '../services/Utilities'


class AuthLoadingScreen extends React.Component {
  constructor(props){
    super(props);
    this.checkConfig = this.checkConfig.bind(this)
    this.checkConfig();
    this.state = {
      connected : true,
      isLoading : false,
      loadingData : false,
      isLoadingConfig : true,
      configLoaded : false,
      loadingError : false,
      notConnectedBtnVisible : true,
      ppr : '',
      password : '',
      AppConfig : this.props.AppConfig ? this.props.AppConfig : AppConfig
    };

  }

  componentDidMount(){
      GAnalytics(this.props.AppConfig ? this.props.AppConfig.AnalyticsID : 'UA-123528544-1',"AuthLoading")
  }

   checkConfig(){
    connTest().then((connected)=> {
      if(connected) {
        getConfig().then((configResult) => {
          configResult ? this.setState({
            isLoadingConfig : false,
            configLoaded : true,
            connected : true,
            AppConfig : configResult
          }) : this.setState({
            connected : false,
            configLoaded:false
          })
          configResult ? this.props.dispatch({
            type : 'SET_CONFIG',
            data : configResult
          }) : null
        }).catch(err => {
          console.log('error loading'+err);
          this.setState({
            connected : false,
            configLoaded:false
          })
        })
      } else
            this.setState({
              connected : false,
              isLoadingConfig : false,
              configLoaded:false,
              AppConfig : AppConfig
            })
    }).catch( err => console.log(err))

  }

  alert = () => {
    Alert.alert(
      this.state.AppConfig.loginScreen.IDError.title,
      this.state.AppConfig.loginScreen.IDError.body,
    [{text: this.state.AppConfig.loginScreen.IDError.btn, onPress: () => console.log('OK Pressed')}],
      { cancelable: true }
    );
  }

  fetchData(ppr, pass){
    Keyboard.dismiss();
    return connTest().then((connStatus)=>{
      if(connStatus) {
        var url = `${Constantes.dataServerURL}/${Constantes.dataURL}/${ppr}/${pass}`
        this.setState({
          ...this.state,
          loadingData : true,
          loadingError : false
        });
        callGetApi(url).then((response) => {
            if(response.situation.id ==='') {
              this.alert();
              this.setState({
                  ...this.state,
                   loadingData : false,
                   loadingError : true
              });
            }
            else  {
              this.props.dispatch({type : 'SET_DATA', data : response})
              this.props.navigation.navigate('Home')
            }
        }).catch((err) => {
          console.log(err)
            this.alert();
            this.setState({
                ...this.state,
                 loadingData : false,
                 loadingError : true
            });
          })
      }  else {
        this.setState({
          ...this.state,
          connected : false
        })
      }
    }).catch((err) => console.log(err))
  }

  updateApp () {
    AppLink.openInStore(
      this.props.AppConfig.appStore.appID,
      this.props.AppConfig.playstore.packageID)
  .then(() => {
    console.log('store opened')
  })
  .catch((err) => {
    console.log(err)
  });
  }

  render() {
      const need_signup = (
        <View style = {{ borderRadius :10, padding : 20, margin : 10, marginTop : 40}}>
          <Text style={{fontSize : 10, lineHeight : 20, textAlign : 'center'}}>
            {this.state.AppConfig.loginScreen.signUpLabel}
          </Text>
          <Text style={{fontSize : 10, lineHeight : 20, textAlign : 'center',color : 'red'}}>
            {this.state.AppConfig.websiteRH}
          </Text>
        </View>
      )

      const GLoading = (
        <View>
        <ActivityIndicator size={60} color="red" style={{margin:25}} />
        <Text style={{color : 'black',fontWeight:'bold', fontSize : 16,textAlign : 'center'}}>Chargement</Text>
      </View>

      );
      const loadingIndicator = (<ActivityIndicator size="large" color="red" style={{marginTop:20}} />);
      const btn = (
        <View style={{marginTop : 20, paddingHorizontal : 0}}>
            <Button
              onPress={() => this.fetchData(this.state.ppr, this.state.password)}
               title={this.state.AppConfig.loginScreen.connBtnLabel}
               color={this.state.AppConfig.loginScreen.connBtnColor}
               disabled = {this.state.ppr.length < 5 || this.state.password.length < 3 }
            />
          </View>
        )

      const notConnectedBtn = (
        <Button
          title = {this.state.AppConfig.notConnected.btn}
          color= {this.state.AppConfig.notConnected.btnColor}
          onPress = {this.checkConfig}
        />
      )
      const not_connected = (
          <View style={styles.not_connected}>
             <Text style={styles.connectionMsg}>
               {this.state.AppConfig.notConnected.msg1}
             </Text>
             <Text style={styles.connectionMsg}>
               {this.state.AppConfig.notConnected.msg2}
             </Text>
             <View style={{margin : 20}}>
               { this.state.notConnectedBtnVisible ? notConnectedBtn : loadingIndicator}
            </View>
          </View>
       );
       const form = (
         <View>
           <Item rounded style={styles.item}>
            <Icon active name='ios-person' style={{color:'royalblue'}} />
            <Input placeholder={this.state.AppConfig.loginScreen.ppr_placeholder}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  style={styles.input}
                  value={this.state.ppr}
                  placeholderTextColor="grey"
                  onChangeText={(text)=>this.setState({ppr : text.toString()})}
            />
          </Item>
          <Item rounded style={styles.item}>
            <Icon active name='ios-key' style={{color:'goldenrod'}} />
            <Input autoCapitalize={'none'}
              secureTextEntry={true}
              autoCorrect={false}
              style={styles.input}
              value={this.state.password}
              placeholder={this.state.AppConfig.loginScreen.pass_placeholder}
              placeholderTextColor="grey"
              onChangeText={(text)=>this.setState({password : text.toString()})}
            />
          </Item>
           {this.state.loadingData ? loadingIndicator : btn}
         </View>
       )

       const updateNeeded = (
         <View style = {{ borderRadius :10, padding : 10, marginHorizontal : 30}}>
           <Text style={{fontSize : 13, lineHeight : 30, textAlign : 'center',margin : 30}}>
             {this.state.AppConfig.updateNeededMessage}
           </Text>
           <Button title="Mettre à Jour" onPress={this.updateApp.bind(this)} />
         </View>
       )

       const appIsDown = (
         <View style = {{ borderRadius :10, padding : 10, marginHorizontal : 30}}>
           <Text style={{fontSize : 15, lineHeight : 30, textAlign : 'center',margin : 10}}>
             {this.state.AppConfig.isDownTitle}
           </Text>
           <Text style={{fontSize : 12, lineHeight : 30, textAlign : 'center'}}>
             {this.state.AppConfig.isDownMessage}
           </Text>
         </View>
       )

       var count=0;

       const comp = (
         <KeyboardAvoidingView behavior="padding" enabled style={styles.container} >
               <Image
                 source={logoApp}
                 style={styles.logo}
               />
               {
                 ! this.state.isLoadingConfig ? ( this.state.AppConfig.isDown ? appIsDown :
                 (this.state.AppConfig.content.drawer.appVersion === Constantes.localVersion || !this.state.AppConfig.forceUpdate ) ?
                 this.state.configLoaded ?
                 ([ form, need_signup ]).map(elt => <View key={count++}>{elt}</View>) : not_connected
                 : updateNeeded ) : GLoading

               }

               <Text style = {{ fontSize : 8, color : 'grey'}}>{this.state.AppConfig.loginScreen.footer}</Text>
         </KeyboardAvoidingView>
       )
      return (
          comp
     );
   }
}

const styles = StyleSheet.create({
  logo: {
    marginRight : 20,
    height : 260,
    width : 260,
  },
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent:'center'
  },
  connectionMsg : {
    color : 'crimson',
    marginHorizontal : 20,
    fontSize : 15,
    textAlign : 'center',
    lineHeight : 30,
    fontWeight : 'bold'
  },
  signUp : {
      color : 'dodgerblue',
      fontWeight: 'bold',
      fontSize: 11,
      marginTop : 10,
      textAlign : 'center'
  },
  not_connected : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
  },
  input:{
    height:40,
    width : 80,
    fontSize:15
  },
  item : {
    width : 250,
    borderRadius : 10,
    borderColor : 'grey',
    marginTop : 15,
    borderWidth : 0.4
  }
})

function mapStateToProps(state) {
  return {
    AppConfig : state.AppConfig,
    data : state.data,
  };
}
export default connect(mapStateToProps)(AuthLoadingScreen);
