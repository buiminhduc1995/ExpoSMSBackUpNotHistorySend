import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native'
let { height, width } = Dimensions.get('window')
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Odoo from 'react-native-odoo';
import Expo, { Constants } from 'expo';
import { SearchBar } from 'react-native-elements'
export default class Nhantin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
      danhsach: [],
      danhsachchon: [],
      status: false,
      number: '',
      data:[],
      danhsachso:[],
      DATA:[],
      searchText: ''
    };
  }
  async Contact() {
    //const time = Date.now();
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') { return; }

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
      ],
      pageSize: 10000,
      pageOffset: 0,
    });
    this.setState({ danhsach: contacts.data.sort() })
    // console.log(contacts)
    //const elapsed = (Date.now() - time) / 1000;
    // Alert.alert('Contacts Read', `Read ${contacts.data.length} contacts in ${elapsed} seconds`);
    if (this.state.status == true) {
      this.setState({ status: false })
    }
    else {
      this.setState({ status: true })
    }
  }
  press = (hey) => {
    let danhsach = this.state.danhsach.map((item) => {
      if (item.id === hey.id) {
        item.check = !item.check
      }
      return {
        ...item
      }
    });
// console.log(danhsach)
    let danhsachchon = danhsach.filter((item) => item.check);
// console.log(danhsachchon)
    let danhsachso =this.state.danhsachso
    let DATA=this.state.DATA
    this.setState({ danhsach: danhsach, danhsachchon: danhsachchon, DATA:danhsachchon.concat(danhsachso) })
  }
  _showSelectedContact() {
    return this.state.DATA.length
  }
  Send() {
    var mang_sdt = []
    let DATA = this.state.DATA
    for (i = 0; i < DATA.length; i++) {
      // duyệt từng phần tử trong mảng DATA sau đó check điều kiện
      // nếu mảng DATA có thuộc tính phoneNumbers thì sẽ thêm vào mảng mang_sdt item numbers
      // còn nếu k có thì item number sẽ thêm vào mang_sdt
      if (DATA[i].hasOwnProperty("phoneNumbers")) {
        mang_sdt.push(DATA[i].phoneNumbers[0].number)
      } else {
        mang_sdt.push(DATA[i]["number"])
      }
    }
     for (i = 0; i<mang_sdt.length;i++)
    {if(mang_sdt[i].slice(0,1) == 0 )
       { const odoo = new Odoo({
        host: 'mysmsbrandname.com',
        port: 80,
        database: 'sms_bms',
        username: 'cs',
        password: '1'
      });
      // Connect to Odoo
      odoo.connect(function (err) {
        if (err) { return console.log(err); }
      });
    //Tạo giá trị
      odoo.create('bms.send_sms_xmlrpc', {
        title: 'title',
        brandname: 'SoLienLacDT',
        accent: 'True',
        content: this.state.text,
        phone: "84"+mang_sdt[i].slice(1),
      }, function (err, partners) {
        if (err) { return console.log(err); }
        //console.log(partners);
      })} 
       else 
       { const odoo = new Odoo({
        host: 'mysmsbrandname.com',
        port: 80,
        database: 'sms_bms',
        username: 'cs',
        password: '1'
      });
      // Connect to Odoo
      odoo.connect(function (err) {
        if (err) { return console.log(err); }
      });
    //Tạo giá trị
      odoo.create('bms.send_sms_xmlrpc', {
        title: 'title',
        brandname: 'SoLienLacDT',
        accent: 'True',
        content: this.state.text,
        phone: mang_sdt[i].slice(1) ,
      }, function (err, partners) {
        if (err) { return console.log(err); }
        //console.log(partners);
      })}
    }
    // let danhsachchon=this.state.danhsachchon
    // let danhsachso=this.state.danhsachso
    // for(i=0;i<danhsachchon.length;i++){console.log(danhsachchon[i])}
    //console.log('--------------------------------')
    // for(y=0;y<danhsachso.length;y++){console.log(danhsachso[y])}
    // let DATA=this.state.DATA
    // for(i=0;i<DATA.length;i++){console.log(DATA[i])}
    Alert.alert('Đã gửi tin nhắn')
  }
  _Remove(index, item) {
    let danhsachso= this.state.danhsachso
    let danhsachchon = this.state.danhsachchon
    let DATA =this.state.DATA
    DATA.splice(index, 1);
    danhsachchon.splice(index, 1);
    danhsachso.splice(index,1)
    this.setState({ DATA,danhsachso,danhsachchon })
  }
  AddNumber() {
    if (this.state.number.length >= 10) {
      let danhsachso = [...this.state.danhsachso, { number : this.state.number} ,]
      let DATA =this.state.DATA
      let danhsachchon=this.state.danhsachchon
      this.setState({ danhsachso:danhsachso,DATA:danhsachchon.concat(danhsachso) })
    } else { Alert.alert('Số điện thoại < 10 ký tự') }
    this.setState({number:""})
  }
    setSearchText(event) {
      // Alert.alert(event.nativeEvent.text)
      searchText = event.nativeEvent.text;
      // console.log(searchText);
      this.setState(
        {
          searchText
        }
      )
      // let data = this.state.danhsach;
      // //toLowerCase() chuyển chữ hoa về chữ thường,
      // //match( searchText ) để thu nhận sự so khớp giữa một chuỗi;
      // //trim() xóa khoảng trắng ở đầu
      // searchText = searchText.trim().toLowerCase();
      // console.log(searchText)
      // let danhsach1 = data.filter((item) => {
      //   return item.name.toLowerCase().match( searchText );
      // });
      // this.setState({
      //   danhsach: danhsach1
      // });
      // if(!event.nativeEvent.text){
      // Alert.alert('Nhảy vào đây')
      // }
      
    }

  render() {

    let {searchText, danhsach} = this.state;
    let danhsach1 = danhsach.filter((item) => {
    return item.name.toLowerCase().match( searchText.trim().toLowerCase() );
    });

    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>       
          <View style={styles.header}>
            <Text> Nhắn tin </Text>
          </View>
          <View style={styles.content}>
          <View>
            <View style={{ marginTop: 5, borderBottomWidth: 0.5, borderBottomColor: 'black', justifyContent: 'space-between', flexDirection: 'row' }}>
              <TextInput
                onChangeText={(text) => this.setState({ number: text })}
                multiline={true}
                value={this.state.number}
                onSubmitEditing={() => this.AddNumber()}
                keyboardType="numeric"
                style={styles.InputNguoiNhan}
                underlineColorAndroid='transparent'
                placeholder="Nhập số điện thoại"
              />
              <TouchableOpacity onPress={() => this.Contact()} style={{ marginRight: 10,marginTop:5, position: 'relative' }}>
                {this.state.status ? <MaterialIcons name="done" size={30} color="black" /> : <Ionicons name="md-contacts" size={30} color="black" />}
              </TouchableOpacity>
            </View>
            {!this.state.status ?
            <View style={{ backgroundColor: '#c9eaef' }}>
              {(this.state.DATA.length > 0)
                ? (
                  <View>
                    <View style={{justifyContent:'center',alignItems:'center',}}>
                      <FlatList 
                      style={{ width:width, height: 200,  }}
                      data={this.state.DATA}
                      //  horizontal={true} 
                       extraData={this.state} 
                       keyExtractor={(item, index) => item.recordID} renderItem={({ item, index }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => this._Remove(index, item)}
                          style={{ width: width-18,backgroundColor: 'rgba(230,100,60,0.9)', justifyContent: 'center', alignContent: 'center', margin: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16,fontWeight: '500', }}>
                            {item.firstName || item.number || item.name}
                            </Text>
                        </TouchableOpacity>
                        </View>
                       )} />
                    </View>
                  </View>
                )
                : null
              }
            </View> :null}
           </View> 
           
            {this.state.status ? <View>
              <SearchBar
              lightTheme
              onChange={this.setSearchText.bind(this)}
              placeholder= "Tìm ..."
              />
              <FlatList
              style={{ width: width, height: 300, }}
              data={danhsach1}
              keyExtractor={item => item.id}
              extraData={this.state}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.press(item)
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ecf0f1'
                  }}>
                  <View
                    style={{
                      flex: 3,
                      alignItems: 'flex-start',
                      justifyContent: 'center'
                    }}>
                    {item.check
                      ? (
                        <Text style={{
                          fontWeight: 'bold'
                        }}>{item.firstName ||item.name}</Text>
                      )
                      : (
                        <Text>{item.firstName || item.name}</Text>
                      )}
                  </View>
                  <View>
                    {item.check
                      ? (
                        <Ionicons name="md-checkbox-outline" size={20} color="#1abc9c" />
                      )
                      : (
                        <Ionicons name="md-square-outline" size={20} color="#bdc3c7" />
                      )}
                  </View>
                </TouchableOpacity>
              )} /></View> : null}
            <View style={{ borderTopWidth: 0.5, borderTopColor: 'black',flexDirection:'row',}}>
            <KeyboardAvoidingView style={{width: 100,height:this.state.text.length >0 ? 100 : 50,flex:9}} behavior="padding" enabled>
               <TextInput
                underlineColorAndroid='transparent'
                placeholder="Nhập tin nhắn"
                {...this.props}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ text })
                }}
                onContentSizeChange={(event) => {
                  this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                style={[styles.InputTinNhan, { height: Math.max(35, this.state.height), }]}
                value={this.state.text}
                />
                </KeyboardAvoidingView>
                <View style={{flex:1}}>
                  <View>
                  <TouchableOpacity onPress={() => this.Send()} style={{ marginRight: 5,marginTop:3}}>
                    <Ionicons name="md-send" size={30} color="black" />
                  </TouchableOpacity>
                  <Text style={{fontSize:8}}>{this.state.text.length}/500</Text>
                  </View>
                </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  content: {
    flex: 9,
    backgroundColor: 'white',
    width: width,
    justifyContent: 'space-between'
  },
  InputTinNhan: {
    marginLeft: 10,
    flex:9,
  },
  InputNguoiNhan: {
    marginLeft: 10,
    height: 50,
    width: 300,
  }
})
