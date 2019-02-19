import React, { Component } from 'react'
import { Image, View, TouchableNativeFeedback } from 'react-native'
import { Container, Header, Title, Content, Card, CardItem, Text, Left, Body, Right, Icon, Button, Fab, Badge } from 'native-base'
import axios from 'axios'

import '../cfg'


export default class FebPrice extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header androidStatusBarColor='#455A64' style={{backgroundColor: '#607D8B'}}>
				<Left>
					<Button transparent>
		            	<Icon name='menu' />
		          	</Button>
				</Left>
		        <Body>
		           	<Title>TeraStore</Title>
		        </Body>
		        <Right>
		        	<Button transparent>
		   	    		<Icon name='search' />
		          	</Button>
		           	<Button transparent>
		            	<Icon name='heart' />
			        </Button>
			        <Button transparent>
		            	<Icon name='refresh' />
		           </Button>
		        </Right>
			</Header>
		)
	})
    constructor(props) {
      super(props)
    
      this.state = {
      	products : [], //state dalam keadaan kosong agar nanti di .setState dengan data dari API
      	// cartRows : 0,
      }
    }
		
	async fetchData(){
    	const prodList = await axios.get(`${apiUrl}/products/`)
    	try{
    		this.setState({products: prodList.data})
    	}catch(){
    		Alert.alert('Connection', 'Connection Lost')
    	}
    }
    // async getCartBadge(){
    // 	const cartRows = await axios.get(`${apiUrl}/orders/count`)
    // 	this.setState({cartRows : cartRows.data})
    // 	// console.warn(cartRows.data);
    // }

    componentDidMount(){
		this.fetchData()
		// this.getCartBadge()

    }

	render() {
		return (
			<Container>                
                
				<Content>
    				{this.state.products.map((d, index) => (
    					<TouchableNativeFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : d.id})}>
        					<Card>
        						<CardItem>
        							<Left>

        							<Image source={{uri: d.image}} style={{height: 190, width: null, flex: 1}}/>
        							</Left>
        							<Body style={{paddingLeft: 10, paddingTop: 10}}>
        								<Text style={{color: '#212121', fontSize: 17, paddingBottom: 5}}>{d.title}</Text>
        								{this.checkDiscount(d)}
        								<Text style={{ fontSize: 18, color : '#E64A19'}}>Rp {this.priceToString(d.price)},-</Text>

        								<View style={{flexDirection:'row', flexWrap:'wrap', paddingTop: 10}}>
        									<Icon type="Entypo" name="shop" style={{fontSize: 18, paddingRight: 5, paddingTop: 2, color: '#757575'}} />
        									<Text style={{color: '#757575'}}>{d.seller}</Text>
        								</View>
        							</Body>
        						</CardItem>
        					</Card>
    					</TouchableNativeFeedback>
    				))}
				
				</Content>
				<Fab
		            active={this.state.active}
		            direction="up"
		            style={{ backgroundColor: '#009688' }}
		            position="bottomRight"
		            onPress={() => this.props.navigation.navigate('Cart')}>
		            <Icon name="cart" />
		          </Fab>
			</Container>
		)
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