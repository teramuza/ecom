import React, { Component } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Container, Header, Title, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Footer, FooterTab, Badge, Icon, Input, Item } from 'native-base';
import { connect } from 'react-redux';
import Prompt from 'dev3s-react-native-prompt';

import { getCarts, patchQty, delCart } from '../publics/redux/actions/carts';


type Props = {};
class Test extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header androidStatusBarColor='#F44336' style={{backgroundColor: '#F44336'}}>
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
        promptVisible : false,
        promptCartId : undefined,
        promptCartQty : undefined
      };
    }

    getData = () => {
        this.props.dispatch(getCarts());
    }

    componentDidMount() {
        this.getData();
    }

    renderItem = ({item, index}) => (
        <ListItem key={index} thumbnail>
            <Left>
                <Thumbnail square source={{ uri: item.image }} />
            </Left>
            <Body>
                <Text style={{fontSize: 14, color: '#212121'}}>{item.title}</Text>
                <Text note numberOfLines={1}>Rp {this.priceToString(item.price)} <Text note>x {item.qty}</Text></Text>
            </Body>
            <Right>
                <View style={{flexDirection:'row'}}>
                    {this.DecreaseButton(item, index)}
                    <Button small bordered danger onPress={() => this.setState({ promptVisible: true, promptCartId: item.id, promptCartQty: item.qty })}><Text style={{color: '#D32F2F', borderStyle: 'solid' }}>{item.qty}</Text></Button>
                    {this.IncrementButton(item, index)}
                </View>
                <Text style={{paddingTop: 5, fontSize: 15}}>Rp {this.priceToString(this.subTotalPrice(item.price, item.qty))},-</Text>
            </Right>
        </ListItem>
    )

    _keyExtractor = (item, index) => item.id.toString();
    
    render() {
        return (
            <Container>
                <Content>
                    <List>
                    <FlatList
                        data={this.props.carts.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderItem}
                        refreshing={this.props.carts.isLoading}
                        onRefresh={this.getData}
                      />
                    
                    {(this.props.carts.data.length === 0) && 
                        <View style={{alignItems: 'center'}}>
                            <Icon name="basket" style={{paddingTop: 220, fontSize: 100, color: '#ddd'}}/>
                            <Text style={{color: '#ddd'}}>Keranjang Belanja anda masih kosong</Text>
                        </View>
                    }

                    </List>
                </Content>
                {(this.props.carts.data.length > 0) && this.buttom()}
                <Prompt
                    title="Masukan Qty"
                    placeholder="Masukan jumlah produk yg diinginkan"
                    defaultValue={ String(this.state.promptCartQty) }
                    visible={ this.state.promptVisible }
                    textInputProps={{keyboardType : 'numeric'}}
                    onCancel={ () => this.setState({
                      promptVisible: false
                    }) }
                    onSubmit={ async (value) => {
                        this.setState({promptVisible: false}) ;
                        if(value === '0') value = '1';
                        await this.props.dispatch(patchQty(this.state.promptCartId, Number(value)))
                        this.getData()
                    }
                    }
                />
            </Container>
        )
    }

    qtyDialog(id, qty){
        return (
            <Prompt
                title="Say something"
                placeholder="Start typing"
                defaultValue="Hello"
                visible={ this.state.promptVisible }
                onCancel={ () => this.setState({
                  promptVisible: false,
                  message: "You cancelled"
                }) }
                onSubmit={ (value) => this.setState({
                  promptVisible: false,
                  message: `You said "${value}"`
                }) }
            />
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
                    <Button active rounded style={{backgroundColor: '#FF5252', flex : 4, flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('Payment')} >
                        <Text style={{fontSize: 16, paddingTop: 3}}>Checkout</Text>
                        <Icon name="arrow-dropright" style={{paddingLeft: -10}}/>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
    
    IncrementButton(item, index){
        if(item.qty >= 5){ 
            return <Button small disabled danger><Icon style={{fontSize: 16, color: '#BDBDBD'}} name="add"/></Button> 
        }
        else{ 
            return <Button small danger onPress={()=>this.IncrementItem(item.id, item.qty)}><Icon style={{fontSize: 16}} name="add"/></Button> 
        }
    }

    DecreaseButton(item, index){
        if(item.qty === 1){ 
            return <Button small danger onPress={()=>this.dropItemConfirm(item.id, index)}><Icon style={{fontSize: 16}} name="trash" /></Button> 
        }
        else{ 
            return <Button small danger onLongPress={()=>this.dropItemConfirm(item.id, index)} onPress={()=>this.DecreaseItem(item.id, item.qty)}><Icon style={{fontSize: 16}} name="remove"/></Button>
        }
    }

    async IncrementItem(id, qty){
        const newQty = qty + 1
        await this.props.dispatch(patchQty(id, newQty));

        this.getData()
    } 

    async DecreaseItem(id, qty){
        const newQty = qty - 1
        await this.props.dispatch(patchQty(id, newQty));

        this.getData()
    }

    dropItemConfirm(key, index){
        Alert.alert(
            'Konfirmasi',
            'Apa anda yakin ingin menghapus barang ini dari troli?',
            [
                {text: 'Tidak'},
                {text: 'Ya', onPress: async () => {
                    await this.props.dispatch(delCart(key));
                    // this.props.carts.data.splice(index, 1);
                    this.getData();
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
        let prcTotal = this.props.carts.data.reduce(function(prev, cur) {
          return prev + (cur.price * cur.qty);
        }, 0);
        return prcTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    }

    priceToString(value){
        stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        return stringPrice
    }
    
}
const mapStateToProps = (state) => {
  return {
    carts: state.carts
  }
}

export default connect(mapStateToProps)(Test)

