import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { Container, Header, Title, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Footer, FooterTab, Badge, Icon } from 'native-base'
import axios from 'axios'

import '../cfg'


export default class Cart extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header androidStatusBarColor='#455A64' style={{backgroundColor: '#607D8B'}}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' onPress={()=> navigation.navigate('Home')}/>
                    </Button>
                </Left>
                <Body>
                    <Title>Keranjang Belanja</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
        )
    })
    

    constructor(props) {
      super(props);
    
      this.state = {
        cartItems : [],
      }
    }

    fetchData(){
        axios.get(`${apiUrl}/orders`)
        .then(res => {  
            data = res.data
            this.setState({ cartItems : data })
        })
    }

    componentDidMount(){
        this.fetchData()
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <List>
                    {this.state.cartItems.map((item, index) => this.listItem(item, index))}
                    
                    {(this.state.cartItems.length === 0) && 
                        <View style={{alignItems: 'center'}}>
                            <Icon name="basket" style={{paddingTop: 220, fontSize: 100, color: '#ddd'}}/>
                            <Text style={{color: '#ddd'}}>Keranjang Belanja anda masih kosong</Text>
                        </View>
                    }

                    </List>
                </Content>
                {(this.state.cartItems.length > 0) && this.buttom()}
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
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        {this.DecreaseButton(item, index)}
                        {this.IncrementButton(item, index)}
                    </View>
                    <Text style={{paddingTop: 5}}>Rp {this.priceToString(this.subTotalPrice(item.price, item.qty))},-</Text>
                </Right>
            </ListItem>
        )         
    }

    buttom(){
        return(
            <Footer>
                <FooterTab style={{backgroundColor: '#f7f7f7', color: '#fff', paddingRight: 8, paddingLeft: 5}}>
                    <Button disabled style={{backgroundColor: '#f7f7f7', flex : 5}}>
                        <Text style={{color: '#757575', paddingBottom: 5}}>Total</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>Rp {this.totalPrice()},-</Text>
                    </Button>
                    <Button active rounded style={{backgroundColor: '#009688', flex : 4}} onPress={() => this.props.navigation.navigate('Payment')} >
                        <Text>Lanjut ke Pembayaran</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
    
    IncrementButton(item, index){
        if(item.qty >= 5){ 
            return <Button disabled style={{backgroundColor: '#566e7a'}}><Icon name="add"/></Button> 
        }
        else{ 
            return <Button style={{backgroundColor: '#607D8B'}} onPress={()=>this.IncrementItem(item)}><Icon name="add"/></Button> 
        }
    }

    DecreaseButton(item, index){
        if(item.qty === 1){ 
            return <Button style={{backgroundColor: '#546f7c'}} onPress={()=>this.dropItemConfirm(item.id, index)}><Icon style={{fontSize: 18}} name="trash" /></Button> 
        }
        else{ 
            return <Button style={{backgroundColor: '#607D8B'}} onPress={()=>this.DecreaseItem(item)}><Icon name="remove"/></Button>
        }
    }

    async IncrementItem(item){
        const newQty = item.qty + 1
        await axios.patch(`${apiUrl}/order/${item.id}/${newQty}`)

        this.fetchData()
    } 

    async DecreaseItem(item){
        const newQty = item.qty - 1
        await axios.patch(`${apiUrl}/order/${item.id}/${newQty}`)

        this.fetchData()
    }

    dropItemConfirm(key, index){
        Alert.alert(
            'Konfirmasi',
            'Apa anda yakin ingin menghapus barang ini dari troli?',
            [
                {text: 'Tidak'},
                {text: 'Ya', onPress: () => {
                    axios.delete(`${apiUrl}/order/${key}`)
                    .then(res => {
                        this.state.cartItems.splice(index, 1)
                        this.setState({refresh : 'refresh'})
                    })
                }
                },
            ]
        )
    }

    subTotalPrice(price,qty){
        const newPrice = price * qty
        return newPrice

    }

    totalPrice(){
        let prcTotal = this.state.cartItems.reduce(function(prev, cur) {
          return prev + (cur.price * cur.qty);
        }, 0);
        return prcTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    }

    priceToString(value){
        stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return stringPrice
    }
    
}