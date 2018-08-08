import React from 'react'
import {ScrollView,StyleSheet,View,TextInput} from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right ,Body,Badge,Label} from 'native-base';

export default class SecretField extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          value : this.props.value,
          hideValue : true
        }
        this.hideContent = this.hideContent.bind(this);
    }

    hideContent = ()=>{
        this.setState({hideValue : !this.state.hideValue})
    }

    render() {
        return (
          <CardItem bordered style={{flex:1, backgroundColor: 'whitesmoke'}}>
            <Body style={{backgroundColor :'whitesmoke'}}>
              <Text style={styles.field}>{this.props.champs}</Text>
                      <View style={{flex:1,flexDirection: 'row', justifyContent: 'space-between',margin : 0}}>
                        <TextInput editable={false} style={styles.value} value={this.state.value} secureTextEntry={this.state.hideValue}></TextInput>
                        <Icon name="ios-eye" onPress={this.hideContent} style={{fontSize : 40,color : 'royalblue'}} />
                      </View>
            </Body>
          </CardItem>
        )
    }
}
const styles = StyleSheet.create({
    field : {
      fontSize:12, color : 'grey',marginBottom : 3
    },
    value : {
      fontSize:18, fontWeight : 'bold',flex:1,color:'crimson'
    },
  });
