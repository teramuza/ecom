import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, View, FlatList, Image, TouchableNativeFeedback, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';
import ImageSlider from 'react-native-image-slider';


import { getProducts } from '../publics/redux/actions/products';

type Props = {};
class Products extends Component<Props> {

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.dispatch(getProducts());
  }
//6 colomn horizontal view (nativebase_)

  renderItem = ({ item, index }) => (
    <TouchableNativeFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : item.id})}>

      <Card>
        <CardItem>
          <Left>
            <Image source={{uri: item.image}} style={{height: 190, width: null, flex: 1}}/>
            </Left>
            <Body style={{paddingLeft: 10, paddingTop: 10}}>
              <Text style={{color: '#212121', fontSize: 17, paddingBottom: 5}}>{item.title}</Text>
              {this.checkDiscount(item)}
              <Text style={{ fontSize: 18, color : '#E64A19'}}>Rp {this.priceToString(item.price)},-</Text>
              <View style={{flexDirection:'row', flexWrap:'wrap', paddingTop: 10}}>
                <Icon type="Entypo" name="shop" style={{fontSize: 18, paddingRight: 5, paddingTop: 2, color: '#757575'}} />
                <Text style={{color: '#757575'}}>{item.seller}</Text>
              </View>
            </Body>
          </CardItem>
        </Card>
    </TouchableNativeFeedback>
  )

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    const images = [
      'http://img20.jd.id/Indonesia/s682x482_/nHBfsgAAeAAAAB0AFeRQWAAErt8.png',
      'http://img20.jd.id/Indonesia/s682x482_/nHBfsgAAYwAAAAcAKLOASAAFe5s.png',
      'http://img20.jd.id/Indonesia/s682x482_/nHBfsgAAwgAAAAYAIcm5OwAC0lA.png'
    ]
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#F44336'}} androidStatusBarColor='#F44336'>        
          <Left>
          <Button transparent>
            <Icon name="qr-scanner"/>
          </Button>
          </Left>
          <Item>
            <Input placeholder="Search" />
            <Icon name="ios-search" />
          </Item>
          <Right>
          <Button transparent>
            <Icon type="MaterialIcons" name="loyalty"/>
          </Button>
          <Button transparent>
            <Icon name="cart"/>
          </Button>
          <Button transparent>
            <Icon name="person"/>
          </Button>
          </Right>
        </Header>
        <ScrollView>
        <ImageSlider style={{height: 255, width: Dimensions.get('window').widht, flex : 0}} 
            autoPlayWithInterval={4000}
            images={images}
        />
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          
          <View style={{flex: 3,alignItems: 'center'}}>
            <Thumbnail square source={require('../images/pulsa.png')}/>
            <Text>Topup Pulsa</Text>
          </View>

          <View style={{flex: 3, alignItems: 'center'}}>
            <Thumbnail square source={require('../images/pln.png')}/>
            <Text>Token Listrik</Text>
          </View>

          <View style={{flex: 3, alignItems: 'center'}}>
            <Thumbnail square source={require('../images/pesawat.png')}/>
            <Text>Travel</Text>
          </View>
          
        </View>

          <FlatList
            data={this.props.products.data}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            refreshing={this.props.products.isLoading}
            onRefresh={this.getData}
          />
          </ScrollView>
      </Container>
    );
  }

  checkDiscount(item){
        if(item.oldPrice){
            return (
                <View style={{flexDirection:'column', flexWrap:'wrap', textAlign: 'right'}}>
                    <Badge warning><Text style={{ fontSize: 13, paddingTop: 2, paddingLeft: 2 }}>Diskon {item.discount}%</Text></Badge>
                    <Text style={{ color: '#9b9b9b', fontSize: 15, paddingTop: 2, textDecorationLine: 'line-through', paddingLeft: 5 }}>Rp {this.priceToString(item.oldPrice)},-</Text>
                </View>
            )
        }
    }

    priceToString(value){
    stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    return stringPrice
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)

