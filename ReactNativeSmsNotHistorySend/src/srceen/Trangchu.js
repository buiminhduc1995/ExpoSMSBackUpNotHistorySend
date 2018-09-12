import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Ionicons,Entypo} from '@expo/vector-icons';
import {connect} from 'react-redux';

class Trangchu extends Component {
  render() {
    return (
      <ImageBackground source={require('../images/wg_blurred_backgrounds_5.jpg')} style={styles.container}>

      <StatusBar barStyle="light-content"/>

      <View style={{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(30,103,166,0.75)"
        }}>
        <Image style={{
            width: 80,
            height: 80
          }} source={require('../images/image_school.png')}/>
        <Text style={styles.thongtintren}>
          Xin chào {this.props.fullname}
        </Text>
      </View>
      <View style={{
          flex: 7,
          flexDirection: 'column'
        }}>
        <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
          <View style={styles.chinhgiua}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Nhantin')
              }}>
              <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                <Entypo name="message" size={48} color="white"/> {"\n"}
                Nhắn tin
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chinhgiua}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Tintuc')
              }}>
              <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                <Entypo name="news" size={48} color="white"/> {"\n"}
                Tin tức
              </Text>
            </TouchableOpacity>

          </View>
          <View style={styles.chinhgiua}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Gioithieu')
              }}>
              <Text style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                <Ionicons name="md-help-buoy" size={48} color="white"/> {"\n"}
                Giới thiệu
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ImageBackground>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  thongtintren: {
    padding: 10,
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  loginside: {
    color: 'white',
    fontSize: 65
  },
  sotinnhan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,153,0,1)'
  },
  chinhgiua: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bieutuongchinh: {
    width: 80,
    height: 80,
    fontSize: 40,
    color: 'brown',
    padding: 20,
    borderColor: 'brown',
    borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    textAlign: 'center'
  }
});

function mapStateToProps(state) {
  return {fullname: state.fullname};
}

export default connect(mapStateToProps)(Trangchu);
