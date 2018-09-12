import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    Alert,
    AsyncStorage,
} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          fullname: "",
          token: "",
        };
        this.persistData = this.persistData.bind(this);
      }
      persistData() {
        let username = this.state.username
        let password = this.state.password
        AsyncStorage.setItem('username', username)
        AsyncStorage.setItem('password', password)
      }
      check() {
        AsyncStorage.getItem('username').then((username) => {
          this.setState({username: username})
        })
        AsyncStorage.getItem('password').then((password) => {
          this.setState({password: password})
        })
      }
      componentWillMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP )
        this.check()
      }
    
    dangnhap = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    var jsonResponse = "";
    xhr.open("POST", 'http://mysmsbrandname.com/api/auth', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.onreadystatechange = function() {
      //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var data = xhr.responseText;
        jsonResponse = JSON.parse(data);
        mytoken = jsonResponse.token;
        //Neu dang nhap thanh cong thi redirect den trang khac
        if (typeof mytoken !== 'undefined') {
            self.setState({token: jsonResponse.token});
            self.setState({fullname: jsonResponse.name});   
            self.persistData();
            self.props.dispatch({type: 'CAP_NHAT_USER',
            fullname: self.state.fullname,
            token: self.state.token,
          });
            Actions.Home()
        } else {
        Alert.alert('Thông báo','Vui lòng kiểm tra lại tên đăng nhập và mật khẩu');
        }
      }
    }

    //Truyen noi dung request
    var formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    xhr.send(formData);
  }

    render() {
        return (
            <View style={styles.container}>
                <Text> Login </Text>
                <TextInput 
                value={this.state.username}
                style={styles.TextInput} 
                placeholder="Username"
                onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput 
                value={this.state.password}
                style={styles.TextInput}
                placeholder="Password" 
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                />
                <TouchableOpacity onPress={()=>this.dangnhap()}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.Dangky()}>
                    <Text>Đăng ký</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=> Actions.QuenMk()}>
                    <Text>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> Actions.Quanlytaikhoan()}>
                    <Text>Quản lý tài khoản</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect()(Login);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput:{
        height: 50,
        width: 200,
        
    }
})
