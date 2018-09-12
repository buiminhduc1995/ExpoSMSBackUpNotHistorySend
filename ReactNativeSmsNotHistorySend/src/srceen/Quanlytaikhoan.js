import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Image
} from 'react-native';

import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';



class Quanlytaikhoan extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      status: false,
      email: '',
      password: '',
      token: "",
      fullname: "",
    }
    async () => {
      try {
        const data = await AsyncStorage.getItem("Data");
        if (data !== null) {
          this.setState({ data: JSON.parse(data) })
          console.log(data)
        }
      } catch (err) {
        console.log("err")
      }
    }

  }
  async componentDidMount() {
    try {
      const data = await AsyncStorage.getItem("Data");
      if (data !== null) {
        this.setState({ data: JSON.parse(data) })
        console.log(data)
      }
    } catch (err) {
      console.log("err")
    }
  }

  _Log() {
    AsyncStorage.getItem('Data')
      .then((value) => console.log(value)).done();
  }
  _showSelectedContact() {
    return this.state.data.length
  }
  _Add() {
    if(this.state.data.length <4){
    var self = this;
    var xhr = new XMLHttpRequest();
    var jsonResponse = "";
    xhr.open("POST", 'http://mysmsbrandname.com/api/auth', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.onreadystatechange = () => {
      //Call a function when the state changes.
      //console.log(this.state.data)
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var response = xhr.responseText;
        jsonResponse = JSON.parse(response);
        mytoken = jsonResponse.token;
        //Neu dang nhap thanh cong thi redirect den trang khac
        if (typeof mytoken !== 'undefined') {
          console.log(this.state.data.length)
          console.log(this.state.data);
          let arr = []
          //Set token
          // self.persistData();
          //Luu vao redux
          if (this.state.data.length !== 0) {
            arr = this.state.data.filter(item => item.email == this.state.email);
          }

          if (arr.length == 0 || this.state.data.length == 0 ) {
            let data = [...this.state.data, { email: this.state.email, password: this.state.password, token: jsonResponse.token, fullname: jsonResponse.name }]
            //console.log(data)
            this.setState({ data: data }
            )

            Alert.alert("Thêm tài khoản thành công")
          }
          else {
            Alert.alert("Đã tồn tại tài khoản")
          }
          AsyncStorage.setItem("Data", JSON.stringify(this.state.data))
          // Alert.alert('thanh cong')
        } else {
          alert("Vui lòng kiểm tra lại tên đăng nh-ập và mật khẩu");
        }
      }
    }

    //Truyen noi dung request
    var formData = new FormData();
    formData.append("username", this.state.email);
    formData.append("password", this.state.password);
    xhr.send(formData);}
    else{Alert.alert('Giới hạn 4 tài khoản cho 1 máy','Xin vui lòng xóa 1 tài khoản trước khi thêm 1 tài khoản mới')}
    if (this.state.status == true) {
      this.setState({ status: false })
    }
    else {
      this.setState({ status: true })
    }
  }
  DangNhap(item) {

    this.props.dispatch({ type: 'CAP_NHAT_USER', fullname: item.fullname, token: item.token });
    Actions.Home()
  }
  _Remove(index, item) {
    let data = this.state.data;
    Alert.alert(
      'Thông báo',
      'Vui lòng chọn thao tác sau:',
      //giá trị data và title được truyền sang Login ạ.
      [
        { text: 'Đăng nhập', onPress: () => this.DangNhap(item) },
        { text: 'Xóa User', onPress: () => { data.splice(index, 1); this.setState({ data: data }); AsyncStorage.setItem("Data", JSON.stringify(data)) } },
        { text: 'Quay lại', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
  ShowHideTextComponentView = () => {

    if (this.state.status == true) {
      this.setState({ status: false })
    }
    else {
      this.setState({ status: true })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.header}></View>
          <View style={styles.formgiua}>
          <View style={{ alignItems: 'center' }}>
          <View style={{width: 80,height: 80,borderRadius:40,backgroundColor:'green',justifyContent:'center',alignContent:'center'}} >
          <Text style={{textAlign:'center'}}>
          Logo
          </Text>
          </View>
          </View>
          {(this.state.data.length > 0)?(<Text>Xin vui lòng chọn tài khoản đăng nhập</Text>):(<Text style={{textAlign:'center'}}>Xin vui lòng {'\n'}Chọn quản lý tài khoản để thêm tài khoản mới</Text>)}
            <FlatList style={{ width: 300, height: 100, }}
              data={this.state.data}
              renderItem={
                ({ item, index }) => (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => this._Remove(index, item)}
                      style={{ width: 300, height: 40, borderRadius:20, backgroundColor: 'rgba(230,100,60,0.9)', justifyContent: 'center', alignContent: 'center', margin: 5 }}>
                      <Text
                        style={{ textAlign: 'center', color: 'white', fontSize: 16,fontWeight: '500', }}>
                        {item.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )} />
            {
              // Pass any View or Component inside the curly bracket.
              // Here the ? Question Mark represent the ternary operator.

              this.state.status ?
                <View style={{ marginBottom: 40,}}>
                  <TextInput
                    value={this.state.email}
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                  <TextInput
                    value={this.state.password}
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                  <TouchableOpacity onPress={this._Add.bind(this)}><Text style={styles.dangnhapstyle}>Thêm tài khoản</Text></TouchableOpacity>

                </View> : null
            }


            <TouchableOpacity  onPress={this.ShowHideTextComponentView}><Text style={styles.dangnhapstyle}>Quản lý tài khoản</Text></TouchableOpacity>
          </View>
          <View style={styles.footer}></View>
        </KeyboardAvoidingView>
      </View >
    )
  }
}



const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(6, 149,204,0.9)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    color: '#ffffff',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#c9eaef'
  },
  header:{
    flex:1
  },
  formgiua: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor:'#c9eaef'
  },
  footer:{
    flex:3
  }, 
  dangnhapstyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'rgba(230,100,60,0.9)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    marginBottom: 15,
    textAlign:'center'
  },
});
export default connect()(Quanlytaikhoan);