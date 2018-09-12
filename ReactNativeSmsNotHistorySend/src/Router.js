import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './srceen/Login';
import Dangky from './srceen/Dangky'
import QuenMk from './srceen/QuenMk'
import Home from './srceen/Home'
import Quanlytaikhoan from './srceen/Quanlytaikhoan'
export default class Routers extends Component < {} > {
  render() {
    return (<Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="Login" component={Login} title="Login" initial={true}/>
        <Scene key="Dangky" component={Dangky} title="Dangky" />
        <Scene key="QuenMk" component={QuenMk} title="QuenMk" />
        <Scene key="Quanlytaikhoan" component={Quanlytaikhoan} title="Quanlytaikhoan" />
        <Scene key="Home" component={Home} title="Home" />
      </Stack>
    </Router>)
  }
}
