import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Thumbnail,View, Left, Right, Button,Icon, Text } from 'native-base';
import { connect } from 'react-redux';

import { register } from '../publics/redux/actions/auth'

class Login extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header androidStatusBarColor='#F44336' style={{backgroundColor: '#F44336'}}>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
		            	<Icon name='arrow-back' />
		          	</Button>
				</Left>
				<Right>
					<Text style={{color: '#fff', fontSize: 18}} onPress={() => navigation.navigate('Login')}>Login</Text>
				</Right>
		        
			</Header>
		)
	})

	constructor(props) {
		super(props);
		
		this.state = {
			username : '',
			email : '',
			name : '',
			avatar : '',
			phone : '',
			password : '',
			nextScreen : 'Login',
		};
	}

	render() {
		return (
			<Container>
				<Content>
					<View style={{alignItems: 'center', alignContent: 'center', paddingVertical: 30 }}>
						<Thumbnail avatar source={require('../images/tera.png')} />
					</View>
					<Form>
						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Nama Pengguna</Label>
							<Input onChangeText={(username) => this.setState({username})} placeholder="Silahkan masukkan Nama Pengguna anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true}/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Email</Label>
							<Input onChangeText={(email) => this.setState({email})} placeholder="Silahkan masukkan Email anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true} keyboardType="email-address"/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Nama Lengkap</Label>
							<Input onChangeText={(name) => this.setState({name})} placeholder="Silahkan masukkan Nama Lengkap anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true}/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Foto profil (url)</Label>
							<Input onChangeText={(avatar) => this.setState({avatar})} placeholder="Silahkan masukkan Url Foto anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true}/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Phone Number</Label>
							<Input onChangeText={(phone) => this.setState({phone})} placeholder="Silahkan masukkan Nomor Telp anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true} keyboardType="phone-pad"/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Password</Label>
							<Input onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholder="Silahkan masukan password anda" placeholderTextColor="#BDBDBD"/>
						</Item>
					</Form>

					<View style={{paddingHorizontal: 20, paddingTop: 30}}>
						{this.buttonInput()}
						<View style={{paddingTop: 25, flexDirection: 'row' }}>
							<Left>
								<Text style={{color: '#2196F3', fontSize: 13}}>Masuk dengan No.HP</Text>
							</Left>

							<Right>
								<Text style={{color: '#2196F3', fontSize: 13}}>Lupa Password</Text>
							</Right>
						</View>
						<View style={{marginTop: 30 ,paddingTop : 40, paddingHorizontal: 20, height: 50}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: '#e2e2e2'}}/>
							<Text style={{position: 'absolute', zIndex: 1, top: 28, left: 138, backgroundColor: '#fff', color: '#aaa', paddingHorizontal: 8, fontSize: 15 }}>Masuk dengan</Text>
						</View>
						<View style={{flexDirection: 'row', paddingTop: 30, paddingHorizontal: 30, flex: 1}} >
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}} avatar source={require('../images/fb.png')}/>
							</View>
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}}  avatar source={require('../images/google.png')}/>
							</View>
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}}  avatar source={require('../images/line.png')}/>
							</View>

						</View>
			        </View>
				</Content>
			</Container>
		);
	}

	buttonInput() {
		if(this.state.emailInput === '' || this.state.passwordInput === ''){
			return(	
				<Button disabled style={{borderRadius: 25, backgroundColor: '#FFCDD2'}} block>
					<Text>Daftar</Text>
				</Button>
			)
		}else{
			return(
				<Button style={{borderRadius: 25, backgroundColor: '#f95454'}} block onPress={() => this.handleRegist()}>
					<Text>Daftar</Text>
				</Button>
			)
		}
	}

	async handleRegist(){
		try{
		await this.props.dispatch(register({
			username : this.state.username,
			email : this.state.email,
			password : this.state.password,
			name : this.state.name,
			avatar : this.state.avatar,
			phone : this.state.phone
		}));
		const loginInfo = this.props.auth.data
		if(loginInfo.token){

			await AsyncStorage.setItem('userId', String(loginInfo.userId));
			await AsyncStorage.setItem('token', loginInfo.token);
			await AsyncStorage.setItem('refreshToken', loginInfo.refreshToken);
			
			this.props.navigation.navigate('Home')
		}
		else if(loginInfo.status === 'registered'){
			Alert.alert("Ups", loginInfo.message)
		}
		else if(loginInfo.status === 'error'){
			Alert.alert("Ups", loginInfo.message)
		}
		else{
			Alert.alert("Error", "Terjadi suatu kesalahan, harap coba lagi nanti.")
		}
	}catch(e){
		console.warn(e.response);
	}
	}
	
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Login)