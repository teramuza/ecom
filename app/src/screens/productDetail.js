import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Title, Content, Badge, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H3, Card, CardItem } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux';

import { getProduct } from '../publics/redux/actions/products';
import { addCart } from '../publics/redux/actions/carts';


type Props = {};
class ProductDetail extends Component<Props> {

    getData = () => {
        prodId = this.props.navigation.state.params.pushData
        this.props.dispatch(getProduct(prodId));
    }

    componentWillMount(){
        this.getData()
    }

    async handleSubmit(val){
        console.warn('pressed');
            await this.props.dispatch(addCart({
                prod_id : val,
                qty : 1
            }));
            console.warn('success');

        this.props.navigation.navigate('Carts')
    }
    
    render() {
        const prod = this.props.products.item
        return (
            <Container>                
                <Content style={{paddingTop: 30}}>
                    <ImageSlider images={[prod.image, prod.image2, prod.image3]} style={{height: 400, width: null}} />
                
                    <Content style={{ paddingLeft: 20, paddingTop: 10 }}>
                        <Text>
                            <H3>{prod.title}</H3>
                        </Text>
                        {this.checkDiscount(prod)}
                        <View style={{flexDirection:'row', flexWrap:'wrap', paddingBottom: 12, paddingTop: 8}}>
                            <Left>
                                <Text style={{color: '#632031', fontSize: 18}}>Rp {this.priceToString(Number(prod.price))},-</Text>
                            </Left>
                            <Right>
                                <Text style={{paddingRight: 15}}>Produk dari <Text style={{color: '#b73555', fontSize: 15}}>{prod.seller}</Text></Text>
                            </Right>
                        </View>
                    </Content>
                    <Content style={{paddingBottom: 30}}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap', paddingLeft: 20}}>
                                        <Icon name='timer' style={{color: '#000', fontSize: 20}}/>
                                        <Text style={{color: '#000'}}>1 - 3 Hari Sampai</Text>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity style={{flexDirection:'row', flexWrap:'wrap', paddingLeft: 10, paddingRight: 20}}>
                                        <Icon name='checkmark-circle-outline' style={{color: '#000'}}/>
                                        <Text style={{color: '#000', paddingLeft: 10}}>Dijamin Ori</Text>
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <Text style={{ fontSize: 20, fontWeight: '200' }}>Detail Produk</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>Nama Produk : {prod.title}</Text>
                                    <Text>Kategori : {prod.category}</Text>
                                    <Text>Harga : Rp {this.priceToString(Number(prod.price))},-</Text>
                                    <Text>Penjual : {prod.seller}</Text>

                                    <Text style={{paddingTop: 20, paddingBottom: 15, fontSize: 18, fontWeight: '400'}}>Deskripsi Produk</Text>
                                    <Text>{prod.detail}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Content>

                <Footer>
                    <FooterTab style={{backgroundColor: '#FF5252', shadowColor: '#000000', shadowOpacity: 100}}>
                        <Button full onPress={() => this.alertWishlish()} style={{backgroundColor: '#FF9800'}}>
                            <Icon type="MaterialIcons" name="loyalty" style={{color: '#FFFFFF'}}/>
                            <Text style={{color: '#FFFFFF'}}>Tambah ke Wishlish</Text>
                        </Button>
                        <Button key={prod.id} full onPress={() => this.handleSubmit(prod.id)}>
                            <Icon name='cart' style={{color: '#FFFFFF'}}/>
                            <Text style={{color: '#FFFFFF'}}>Pesan sekarang</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }

    checkDiscount(prod){
        if(prod.oldPrice){
            return (
                <View style={{flexDirection:'row', flexWrap:'wrap', textAlign: 'right' }}>
                    <Badge warning><Text style={{ fontSize: 13, paddingTop: 2, paddingLeft: 2 }}>Diskon {prod.discount}%</Text></Badge>
                    <Text style={{ color: '#9b9b9b', fontSize: 15, paddingTop: 2, textDecorationLine: 'line-through', paddingLeft: 5 }}>Rp {this.priceToString(prod.oldPrice)},-</Text>
                </View>
            )
        }
    }

    priceToString(value){
        stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return stringPrice
    }

    // async toCart(value){
    //     const res = await axios.get(`${apiUrl}/cartBy/prod_id/${value}`)
    //     if(!res.data.id){
    //         await axios.post(`${apiUrl}/order`, { 
    //             prod_id : value,
    //             qty : 1,
    //         })
    //     }
    //     this.props.navigation.navigate('Cart')
    // }
    
    alertWishlish(){
        Alert.alert(
            'Berhasil',
            'item berhasil ditambahkan ke wishlish',
            [
                {text: 'Oke'},
            ]
        )
    }

}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductDetail)

