import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Card, CardItem, List, ListItem, Form, Text, Item, Input, Label, Icon, Picker, Left, Right, Thumbnail, Body, H3 } from 'native-base';
import axios from 'axios'

import '../cfg'


export default class Payment extends Component {

    static navigationOptions = {
        title: 'Pembayaran',
        headerStyle: {
            backgroundColor: '#607D8B',
        },
        headerTintColor: '#fff',
    }

    constructor(props) {
        super(props)
        this.state = {
          payMethod: undefined,
          cartItems : [],
          ongkir : 0,
          ongkirVal : undefined,
        };
    }

    fetchData(){
        axios.get(`${apiUrl}/orders`)
        .then(res => {  
            data = res.data
            this.setState({ cartItems : data })
        })

    }
    componentWillMount(){
        this.fetchData()
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
                        {this.state.cartItems.map((item, index) => this.listItem(item, index))}
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
                        {(this.state.ongkir > 0) &&
                        <CardItem style={{backgroundColor: '#009688', color: '#fff'}}>
                            <View style={{flexDirection:'row', flexWrap:'wrap', paddingBottom: 12, paddingTop: 8}}>
                                <Left>
                                    <Text style={{color: '#fff', fontSize: 18}}>Total Semua</Text>
                                </Left>
                                <Right>
                                    <Text style={{color: '#fff', paddingRight: 15, fontSize: 20}}>Rp {this.totalPayment()},-</Text>
                                </Right>
                            </View>
                        </CardItem>
                    }
                    </Card>       
                </Content>
            </Container>
        )
    }

    listItem(item, index){
        return (
            <ListItem key={item.id} thumbnail>
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
    }
    
    priceToString(value){
        stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return stringPrice
    }
    subTotalPrice(price,qty){
        const newPrice = price * qty
        return newPrice

    }

    totalPrice(){
        let prcTotal = this.state.cartItems.reduce(function(prev, cur) {
          return prev + (cur.price * cur.qty);
        }, 0);

        return prcTotal
    }

    totalPayment(){
        totalProd = this.totalPrice()
        ongkir = this.state.ongkir
        countItems = this.state.cartItems.length
        newTotal = (ongkir * countItems) + totalProd

        return this.priceToString(newTotal)
    }
}