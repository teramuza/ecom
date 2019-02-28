import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { View, Header, Button, Title, Container, Content, Card, CardItem, List, ListItem, Form, Text, Item, Input, Label, Icon, Picker, Left, Right, Thumbnail, Body, H3 } from 'native-base';
import { connect } from 'react-redux';

import { truncate, getCarts } from '../publics/redux/actions/carts';


class Payment extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header androidStatusBarColor='#D32F2F' style={{backgroundColor: '#F44336'}}>
                <Left>
                    <Button transparent onPress={()=> navigation.navigate('Home')}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>Checkout</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
        )
    })
    constructor(props) {
      super(props);
    
      this.state = {total : ''};
    }
    componentWillMount(){
        const total = this.props.navigation.state.params.pushData
        this.setState({total})
        this.getData()

    }
    async getData(){
        await this.props.dispatch(truncate())
        await this.props.dispatch(getCarts())
    }

    randomNumber() {
      let text = "";
      let possible = "0123456789";

      for (let i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return `#TR${text}`;
    }

    render(){
        return(
            <Container>
                <View style={{alignItems:  'center', marginVertical: 50 }}>
                    <View style={{alignItems: 'center', paddingVertical: 8}}>
                        <Text style={{fontSize: 24, fontWeight: '400'}}>Terima Kasih</Text>
                        <Text>Transaksimu sedang di proses</Text>
                    </View>

                    <View style={{alignItems: 'center', paddingVertical: 8}}>
                        <Icon name="checkmark-circle-outline" style={{fontSize: 130, color: '#4CAF50'}}/>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 8}}>
                        <Text style={{fontSize: 13, color: '#757575'}}>Kode Order</Text>
                        <Text style={{fontSize: 22, fontWeight: '500'}}>{this.randomNumber()}</Text>
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 8}}>
                        <Text style={{fontSize: 13, color: '#757575'}}>Total Pembayaran</Text>
                        <Text style={{fontSize: 22, fontWeight: '500'}}>Rp {this.state.total}</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20}}>
                        <Button block style={{borderRadius: 5, backgroundColor: '#FF5252'}}>
                            <Text>Tracking Pesanan</Text>
                        </Button>
                        <Text style={{textAlign: 'center', paddingTop: 8 }}>Kembali ke <Text style={{color: '#D32F2F'}} onPress={() => this.props.navigation.navigate('Home')}>Halaman Utama</Text></Text>
                    </View>
            </Container>
        )
    }    

}

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
    user: state.user
  }
}

export default connect(mapStateToProps)(Payment)

