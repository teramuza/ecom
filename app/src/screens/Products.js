import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';
import ImageSlider from 'react-native-image-slider';

import { getProducts } from '../publics/redux/actions/products';
import { getCarts } from '../publics/redux/actions/carts';


type Props = {};
class Products extends Component<Props> {

	constructor(props) {
			super(props);
		
			this.state = {
				promptVisible : false,
			};
		}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		this.props.dispatch(getProducts());
		this.props.dispatch(getCarts());
	}

	renderItem = ({ item, index }) => (
		<TouchableWithoutFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : item.id})}>
			<View style={styles.gridContainer}>
				<Image source={{uri: item.image}} style={{height: 190, flex: 1}}/>
				<View style={{paddingHorizontal: 20}}>
					<Text style={styles.titleGrid}>{item.title}</Text>
					<Text style={{color: '#E64A19', fontWeight: '300'}}>Rp <Text style={styles.priceGrid}>{this.priceToString(item.price)}</Text></Text>
					{this.checkDiscount(item)}
				</View>
			</View>
		</TouchableWithoutFeedback>
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
                        <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="qr-scanner"/>
                        </Button>
                    </Left>
                    <Item rounded>
                        <Input placeholder="Search" />
                        <Icon name="ios-search" />
                    </Item>
                    <Right>
                        {this.cartBadge()}
                        <Button transparent onPress={() => this.props.navigation.navigate('Favorite')}>
                            <Icon name="heart"/>
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
                            <Icon name="person"/>
                        </Button>
                    </Right>
                </Header>

				<ScrollView style={{backgroundColor: '#f9f9f9'}}>
					<ImageSlider style={{height: 255, width: Dimensions.get('window').widht, flex : 0}} autoPlayWithInterval={4000} images={images} />

					<View style={styles.featureIconContainer}>
						<View style={styles.featureIconRows}>
							<Thumbnail avatar source={require('../images/topup.png')} style={styles.featureIcons}/>
							<Text style={styles.featureIconText}>Topup Pulsa</Text>
						</View>

						<View style={styles.featureIconRows}>
							<Thumbnail avatar source={require('../images/token.png')} style={styles.featureIcons}/>
							<Text style={styles.featureIconText}>Token Listrik</Text>
						</View>

						<View style={styles.featureIconRows}>
							<Thumbnail avatar source={require('../images/travel.png')} style={styles.featureIcons}/>
							<Text style={styles.featureIconText}>Travel</Text>
						</View>
						
						<View style={styles.featureIconRows}>
							<Thumbnail avatar source={require('../images/furniture.png')} style={styles.featureIcons}/>
							<Text style={styles.featureIconText}>Furniture</Text>
						</View>
						
						<View style={styles.featureIconRows}>
							<Thumbnail avatar source={require('../images/fashion.png')} style={styles.featureIcons}/>
							<Text style={styles.featureIconText}>Fashion</Text>
						</View>
						
					</View>
					<FlatList
						data={this.props.products.data}
						keyExtractor={this._keyExtractor}
						renderItem={this.renderItem}
						refreshing={this.props.products.isLoading}
						onRefresh={this.getData}
						numColumns={2}
					/>
				</ScrollView>
			</Container>
		);
	}

	checkDiscount(item){
		if(item.oldPrice){
			return (
				<View style={{flexDirection:'row', flexWrap:'wrap', textAlign: 'right'}}>
					<Text style={styles.oldPriceGrid}>Rp {this.priceToString(item.oldPrice)},-</Text>
					<Text style={styles.discountGrid}>-{item.discount}%</Text>
				</View>
			)
		}
	}

	priceToString(value){
		stringPrice = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return stringPrice
	}

	cartBadge(){
		const data = this.props.carts
		let qtys = data.reduce(function(prev, cur) {
          return prev + cur.qty;
        }, 0);
        if(qtys > 0){ 
        	return (
	        	<Button badge transparent onPress={() => this.props.navigation.navigate('Carts') }>
	            	<Badge warning><Text style={{fontSize: 14}}>{qtys}</Text></Badge>
	                <Icon name="cart"/>
	            </Button>
        	)
        }else{
        	return(
				<Button transparent onPress={() => this.props.navigation.navigate('Carts') }>
	                <Icon name="cart"/>
	            </Button>
        	)
        }
	}

}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		carts : state.carts.data
	}
}

export default connect(mapStateToProps)(Products)

const styles = StyleSheet.create({
	gridContainer : {
		borderWidth: 0.1,
		borderRadius: 5,
		borderColor: '#BDBDBD',
		flex: 1, 
		flexDirection: 'column', 
		margin: 3, 
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#fff'
	},
	titleGrid : {
		color: '#212121', 
		fontSize: 15, 
		paddingBottom: 5
	},
	priceGrid : {
		color: '#E64A19', 
		fontSize: 16, 
		fontWeight: 'bold',  
		paddingBottom: 5
	},
	discountGrid : {
		color: '#757575',
		fontSize: 12, 
		paddingLeft: 5
	},
	oldPriceGrid : {
		color: '#9b9b9b', 
		fontSize: 13, 
		textDecorationLine: 'line-through'
	},
	featureIconContainer: {
		flexDirection: 'row', 
		marginVertical: 20
	},
	featureIconRows : {
		flex: 3,
		alignItems: 'center'
	},
	featureIcons : {
		width: 50,
		height: 50
	},
	featureIconText : {
		fontSize: 10,
		paddingTop: 5
	}

})