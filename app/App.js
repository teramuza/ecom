import React, { Component } from 'react';
import { Header, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/publics/redux/store';

import Products from './src/screens/Products';
import ProductDetail from './src/screens/productDetail';
import Cart from './src/screens/Cart';
import Profile from './src/screens/Profile';
import Favorite from './src/screens/Favorite';

const AppNavigator = createStackNavigator({

   
        Home: {
            screen: Products,
            navigationOptions: {
                header : null
            }
        },
        Detail : {
            screen: ProductDetail,
            navigationOptions:{
                headerTransparent : true,
                tintColor: '#fff'
            }
        },
        Carts : {
            screen: Cart
        },
        Profile : {
            screen : Profile,
            navigationOptions: {
                header : null
            }
        },
        Favorite : {
            screen : Favorite
        }
    })

const AppRoot = createAppContainer(AppNavigator);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    )
  }
}




// import Home from './src/screens/Home'
// import ProductDetail from './src/screens/productDetail'
// import Cart from './src/screens/Cart'
// import Payment from './src/screens/Payment'

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home
//   },
//   Detail : {
//     screen: ProductDetail
//   },
//   Cart : {
//     screen: Cart
//   },
//   Payment : {
//   	screen : Payment
//   }
// });

// export default createAppContainer(AppNavigator)
