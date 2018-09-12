import React, {Component} from 'react';
import Gioithieu from './Gioithieu'
import Nhantin from './Nhantin'
import Tintuc from './Tintuc'
import Trangchu from './Trangchu'
import {TabNavigator,} from 'react-navigation'
import {Ionicons,Entypo} from '@expo/vector-icons';

export const Nav = TabNavigator({
    Trangchu:{
        screen:Trangchu,
        navigationOptions: {
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({tintColor}) => <Entypo name="home" size={20} color="white"/>
          }},
    Nhantin:{
        screen:Nhantin,
        navigationOptions: {
            tabBarLabel: 'Nhắn tin',
            tabBarIcon: ({tintColor}) => <Entypo name="message" size={20} color="white"/>
          }},
    Tintuc:{
        screen:Tintuc,
        navigationOptions: {
            tabBarLabel: 'Tin tức',
            tabBarIcon: ({tintColor}) => <Entypo name="news" size={20} color="white"/>
          }},
    Gioithieu:{
        screen:Gioithieu,
        navigationOptions: {
            tabBarLabel: 'Giới thiệu',
            tabBarIcon: ({tintColor}) => <Ionicons name="md-help-buoy" size={20} color="white"/>
          }},
},{ 
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#124c7d'
      },
      labelStyle: {
        fontSize: 6,
        color: "white"
      },
      showIcon: true,
      showLabel:true,
      inactiveTintColor: 'white',
      activeTinColor: '#1e67a6'
    }
  })
  
