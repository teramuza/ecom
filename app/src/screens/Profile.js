import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';

import { getProfile } from '../publics/redux/actions/user';
import { logout } from '../publics/redux/actions/auth'


type Props = {};
class Products extends Component<Props> {

	renderItem = ({ item, index }) => (
		<TouchableWithoutFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : item.id})}>
			<View style={styles.gridContainer}>
				<Image source={{uri: item.image}} style={styles.imageGrid}/>

				<View style={{paddingHorizontal: 20}}>
					<Text style={styles.titleGrid}>{item.title}</Text>
					
					<Text style={{color: '#E64A19', fontWeight: '300'}}>Rp 
						<Text style={styles.priceGrid}>{this.priceToString(item.price)}</Text>
					</Text>
					
					{this.checkDiscount(item)}
				</View>
			</View>
		
		</TouchableWithoutFeedback>
	)

	renderItemHorizontal = ({ item, index }) => (
		<TouchableWithoutFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : item.id})}>
			<View style={styles.gridContainerHorizontal}>
				<Image source={{uri: item.image}} style={styles.imageGridHorizontal}/>
				
				<View style={{paddingHorizontal: 10}}>
					<Text style={styles.titleGridHorizontal}>{item.title}</Text>
					
					<Text style={{color: '#E64A19', fontWeight: '300', fontSize: 14}}>Rp 
						<Text style={styles.priceGridHorizontal}>{this.priceToString(item.price)}</Text>
					</Text>
					
					{this.checkDiscount(item, 'horizontal')}
				</View>
			</View>

		</TouchableWithoutFeedback>
	)

	_keyExtractor = (item, index) => item.id.toString();

	render() {
		userData = this.props.user.data
		return (
			<Container>
				<Header style={{backgroundColor: '#F44336'}} androidStatusBarColor='#F44336'>        
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    
                    <Right>
                        {this.cartBadge()}
                        <Button transparent onPress={ async () => this.confirmLogout() }>
                            <Icon name="log-out"/>
                        </Button>
                    </Right>
                </Header>

				<ScrollView style={{backgroundColor: '#f9f9f9'}}>
					<View style={styles.profilStat}>
						<View style={styles.profilInfo}>
							<Thumbnail avatar source={{uri : userData.avatar}} />

							<View style={styles.profilName}>
								<Text style={styles.profilNameText}>{userData.name}</Text>
								<Icon type="MaterialIcons" name="keyboard-arrow-right" style={{color: '#fff'}}/>
							</View>
						</View>

						<View style={styles.profilSummaryContainer}>
							<View style={styles.profilSummary}>
								<Text style={styles.profilSummaryUp}>8</Text>
								<Text style={styles.profilSummaryDown}>Pesanan</Text>
							</View>

							<View style={styles.profilSummary}>
								<Text style={styles.profilSummaryUp}>4</Text>
								<Text style={styles.profilSummaryDown}>Favorit</Text>
							</View>

							<View style={styles.profilSummary}>
								<Text style={styles.profilSummaryUp}>{userData.terapoint}</Text>
								<Text style={styles.profilSummaryDown}>TeraPoin</Text>
							</View>

							<View style={styles.profilSummary}>
								<Text style={styles.profilSummaryUp}>0</Text>
								<Text style={styles.profilSummaryDown}>Voucher</Text>
							</View>

						</View>
					</View>

					<View style={styles.orderContainer}>
						<Text style={styles.orderHeader}>Pesanan Saya</Text>
						
						<View style={styles.orderView}>
							<View style={styles.orderStatContainer}>
								<Icon style={styles.orderStatIcon} type="MaterialIcons" name="account-balance-wallet"/>
								<Text style={styles.orderStatText}>Menunggu</Text>
								<Text style={styles.orderStatText}>Pembayaran</Text>
							</View>
							<View style={styles.orderStatContainer}>
								<Icon style={styles.orderStatIcon} name="briefcase"/>
								<Text style={styles.orderStatText}>Menunggu</Text>
								<Text style={styles.orderStatText}>Diterima</Text>

							</View>
							<View style={styles.orderStatContainer}>
								<Icon style={styles.orderStatIcon} name="chatboxes"/>
								<Text style={styles.orderStatText}>Menunggu</Text>
								<Text style={styles.orderStatText}>Review</Text>

							</View>
							<View style={styles.orderStatContainer}>
								<Icon style={styles.orderStatIcon} type="MaterialIcons" name="assignment-return"/>
								<Text style={styles.orderStatText}>Pengembalian</Text>
								<Text style={styles.orderStatText}>Barang</Text>

							</View>
						</View>
					</View>

					<Text style={styles.favoriteHeader}>Favorit Anda</Text>

					<FlatList
						data={this.props.products.data}
						keyExtractor={this._keyExtractor}
						renderItem={this.renderItemHorizontal}
						horizontal={true}
						refreshing={this.props.products.isLoading}
						onRefresh={this.getData}
						numColumns={1}
					/>

					<Text style={styles.specialHeader}>Khusus untuk Anda</Text>


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

	checkDiscount(item, layout=''){
		oldPriceStyle = styles.oldPriceGrid
		discountStyle = styles.discountGrid
		if(layout === 'horizontal'){ oldPriceStyle = styles.oldPriceGridHorizontal, discountStyle = styles.discountGridHorizontal }
		if(item.oldPrice){
			return (
				<View style={{flexDirection:'row', flexWrap:'wrap', textAlign: 'right'}}>
					<Text style={oldPriceStyle}>Rp {this.priceToString(item.oldPrice)},-</Text>
					<Text style={discountStyle}>-{item.discount}%</Text>
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
	confirmLogout(){
		Alert.alert(
            'Logout',
            'Apa anda yakin ingin Logout?',
            [
                {text: 'Tidak'},
                {text: 'Ya', onPress: async () => {
                    const token = await AsyncStorage.getItem('token')
					const refreshToken = await AsyncStorage.getItem('refreshToken')
                    
                    await this.props.dispatch(logout(token, refreshToken))
	                await AsyncStorage.removeItem('token')
	                await AsyncStorage.removeItem('userId')
	               	await AsyncStorage.removeItem('refreshToken')
	                this.props.navigation.navigate('Home')	  
                }
                },
            ]
        )
	}

}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		carts : state.carts.data,
		user : state.user
	}
}

export default connect(mapStateToProps)(Products)

const styles = StyleSheet.create({

	//grid Vertical
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

	imageGrid : {
		height: 190, 
		flex: 1
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

	
	//grid Horizontal
	gridContainerHorizontal : {
		borderWidth: 0.1,
		borderRadius: 5,
		borderColor: '#BDBDBD',
		flex: 1, 
		flexDirection: 'column', 
		margin: 3, 
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#fff',
		maxWidth: 157
	},

	imageGridHorizontal: {
		height: 150, 
		width: null, 
		flex: 1
	},

	titleGridHorizontal : {
		color: '#212121', 
		fontSize: 12, 
		paddingBottom: 5
	},

	priceGridHorizontal : {
		color: '#E64A19', 
		fontSize: 14, 
		fontWeight: 'bold',  
		paddingBottom: 5
	},

	discountGridHorizontal : {
		color: '#757575',
		fontSize: 10, 
		paddingLeft: 5
	},

	oldPriceGridHorizontal : {
		color: '#9b9b9b', 
		fontSize: 10, 
		textDecorationLine: 'line-through'
	},


	//Profilstat
	profilStat: {
		flexDirection: 'column', 
		backgroundColor: '#F44336',
		paddingHorizontal: 30
	},

	profilInfo :{
		paddingBottom: 20, 
		flexDirection: 'row' 
	},

	profilName : {
		paddingTop: 16, 
		paddingLeft: 12, 
		flexDirection: 'row'
	},

	profilNameText : {
		fontWeight: '600', 
		fontSize: 19, 
		color: '#fff'
	},

	
	//profilSummary
	profilSummaryContainer: {
		paddingBottom: 20, 
		flexDirection: 'row', 
		flex : 1, 
		paddingHorizontal: 15 
	},

	profilSummary : {
		flex : 3, 
		flexDirection: 'column', 
		textAlign: 'center', 
		alignItems: 'center' 
	},

	profilSummaryUp: {
		fontWeight: '500', 
		fontSize: 20, 
		color: '#fff'
	},

	profilSummaryDown: {
		fontWeight: '100', 
		fontSize: 15, 
		color: '#fff'
	},

	//order
	orderContainer: { 
		paddingHorizontal: 20, 
		paddingVertical: 20
	},

	orderHeader: {
		fontSize: 18, 
		fontWeight: '600', 
		paddingBottom: 10, 
		paddingLeft: 10,
		color: '#212121' 
	},

	orderView: {
		flexDirection: 'row', 
		flex : 1 
	},

	orderStatContainer : {
		flexDirection: 'column', 
		textAlign: 'center', 
		alignItems: 'center', 
		flex : 3
	},

	orderStatIcon : {color: '#FF5252'},

	orderStatText : {
		color: '#757575', 
		fontSize: 12
	},

	favoriteHeader: {
		fontSize: 18, 
		fontWeight: '600', 
		paddingTop: 20, 
		paddingBottom: 10, 
		paddingLeft: 30 ,
		color: '#212121' 
	},

	specialHeader: {
		fontSize: 18, 
		fontWeight: '600', 
		paddingTop: 30, 
		paddingBottom: 10,
		paddingLeft: 30 ,
		color: '#212121' 
	}

})