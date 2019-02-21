import React, { Component } from 'react'
import { Image, View, TouchableNativeFeedback, FlatList } from 'react-native'
import { Container, Header, Title, Content, Card, CardItem, Text, Left, Body, Right, Icon, Button, Fab, Badge } from 'native-base'
import { connect } from 'react-redux';

import { getProducts } from '../publics/redux/actions/products';


class Favorite extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header androidStatusBarColor='#D32F2F' style={{backgroundColor: '#F44336'}}>
				<Left>
					<Button transparent onPress={() => navigation.navigate('Home')}>
		            	<Icon name='arrow-back' />
		          	</Button>
				</Left>
		        <Body>
		           	<Title>Favorite</Title>
		        </Body>
		        <Right>
		        	
		        </Right>
			</Header>
		)
	})
    componentDidMount() {
		this.getData();
	}

	getData = () => {
		this.props.dispatch(getProducts());
	}

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
		return (
			<Container>                
				<Content>
    				<FlatList
						data={this.props.products.data}
						keyExtractor={this._keyExtractor}
						renderItem={this.renderItem}
						refreshing={this.props.products.isLoading}
						onRefresh={this.getData}
					/>
				</Content>
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

const mapStateToProps = (state) => {
	return {
		products: state.products	
	}
}

export default connect(mapStateToProps)(Favorite)