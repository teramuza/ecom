import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Header, Button, Title, Container, Content, Card, CardItem, List, ListItem, Form, Text, Item, Input, Label, Icon, Picker, Left, Right, Thumbnail, Body, H3, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';


class Payment extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header androidStatusBarColor='#D32F2F' style={{backgroundColor: '#F44336'}}>
                <Left>
                    <Button transparent onPress={()=> navigation.navigate('Carts')}>
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
        super(props)
        this.state = {
          payMethod: undefined,
          cartItems : [],
          ongkir : 0,
          ongkirVal : undefined,
        };
    }


    onPayMethod(value: string) {
        this.setState({
          payMethod: value
        })
    }

    onOngkir(value : string) {
        this.setState({
          ongkir: parseInt(value),
          ongkirVal : value,
        })
    }

    render(){
        return(
            <Container>
                <Content>
                    <Text style={{ paddingLeft: 25, paddingTop: 25, paddingBottom: 15}}>
                       <H3>Detail penerima</H3>
                    </Text>        
                    <Form style={{paddingBottom: 20, paddingLeft: 20}}>
                        <Item stackedLabel>
                            <Label>Nama</Label>
                            <Input/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Nomor telp</Label>
                            <Input keyboardType="numeric"/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Alamat</Label>
                            <Input/>
                        </Item>
                        <Item picker style={{paddingTop: 20}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your payment method"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.payMethod}
                                onValueChange={this.onPayMethod.bind(this)}
                            >
                                <Picker.Item label="Select Payment Method" value="" disabled/>
                                <Picker.Item label="Bayar ditempat" value="key0" />
                                <Picker.Item label="Bank Transfer" value="key1" />
                                <Picker.Item label="Dompet Online" value="key2" />
                                <Picker.Item label="Toko ritel" value="key3" />
                            </Picker>
                        </Item>
                        <Item picker style={{paddingTop: 20}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Pilih kurir"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.ongkirVal}
                                onValueChange={this.onOngkir.bind(this)}
                            >
                                <Picker.Item label="Pilih layanan pengiriman" value="0" disabled/>
                                <Picker.Item label="Go-Send (1-3 Days)" value="10000" />
                                <Picker.Item label="JNE (1-2 Days)" value="12000" />
                                <Picker.Item label="J&T (2 Days)" value="11000" />
                                <Picker.Item label="Tiki (2 Days)" value="15000" />
                                <Picker.Item label="Pos Indonesia (3-4 Days)" value="9000" />
                            </Picker>
                        </Item>
                    </Form>
                    <List>
                        <FlatList
                        data={this.props.carts.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderItem}
                        />
                    </List>
                    <Card>
                        <CardItem>
                            <View style={{flexDirection:'row', flexWrap:'wrap', paddingBottom: 12, paddingTop: 8}}>
                                <Left>
                                    <Text style={{color: '#632031', fontSize: 18}}>Total Belanja</Text>
                                </Left>
                                <Right>
                                    <Text style={{paddingRight: 15}}>Rp {this.priceToString(this.totalPrice())},-</Text>
                                </Right>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{flexDirection:'row', flexWrap:'wrap', paddingBottom: 12, paddingTop: 8}}>
                                <Left>
                                    <Text style={{color: '#632031', fontSize: 18}}>Ongkos Kirim</Text>
                                </Left>
                                <Right>
                                    <Text style={{paddingRight: 15}}>Rp {this.priceToString(this.state.ongkir)},-</Text>
                                </Right>
                            </View>
                        </CardItem>
                        <CardItem>
                            <View style={{flexDirection:'row', flexWrap:'wrap', paddingBottom: 12, paddingTop: 8}}>
                                <Left>
                                    <Text style={{color: '#632031', fontSize: 18}}>Lainnya</Text>
                                </Left>
                                <Right>
                                    <Text style={{paddingRight: 15}}>Rp -</Text>
                                </Right>
                            </View>
                        </CardItem>
                        
                    </Card>       
                </Content>
                {(this.state.ongkir > 0) &&
                        <Footer>
                            <FooterTab style={{backgroundColor: '#f7f7f7', color: '#fff', paddingRight: 8, paddingLeft: 5}}>
                                <Button disabled style={{backgroundColor: '#f7f7f7', flex : 5}}>
                                    <Text style={{color: '#757575', paddingBottom: 5}}>Total</Text>
                                    <Text style={{color: '#757575', fontSize: 15}}>Rp {this.totalPayment()},-</Text>
                                </Button>
                                <Button active rounded style={{backgroundColor: '#FF5252', flex : 4, flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('Success', {pushData : this.totalPayment()})} >
                                    <Text style={{fontSize: 16, paddingTop: 3}}>Checkout</Text>
                                    <Icon name="arrow-dropright" style={{paddingLeft: -10}}/>
                                </Button>
                            </FooterTab>
                        </Footer>
                    }
            </Container>
        )
    }

    renderItem = ({item, index}) => (
        <ListItem key={index} thumbnail>
            <Left>
                <Thumbnail square source={{ uri: item.image }} />
            </Left>
            <Body>
                <Text>{item.title}</Text>
                <Text note numberOfLines={1}>Rp {this.priceToString(item.price)} <Text note>x {item.qty}</Text></Text>
            </Body>
            <Right>
                <Text style={{paddingTop: 5}}>Rp {this.priceToString(this.subTotalPrice(item.price,item.qty))},-</Text>
            </Right>
        </ListItem>
    )

    _keyExtractor = (item, index) => item.id.toString();
    
    priceToString(value){
        stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return stringPrice
    }
    subTotalPrice(price,qty){
        const newPrice = price * qty
        return newPrice

    }

    totalPrice(){
        let prcTotal = this.props.carts.data.reduce(function(prev, cur) {
          return prev + (cur.price * cur.qty);
        }, 0);

        return prcTotal
    }

    totalPayment(){
        totalProd = this.totalPrice()
        ongkir = this.state.ongkir
        countItems = this.props.carts.data.length
        newTotal = (ongkir * countItems) + totalProd

        return this.priceToString(newTotal)
    }
}

const mapStateToProps = (state) => {
  return {
    carts: state.carts,
    user: state.user
  }
}

export default connect(mapStateToProps)(Payment)

