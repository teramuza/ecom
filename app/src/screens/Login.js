import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Thumbnail,View, Left, Right, Button,Icon, Text } from 'native-base';

export default class Login extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header androidStatusBarColor='#F44336' style={{backgroundColor: '#F44336'}}>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
		            	<Icon name='arrow-back' />
		          	</Button>
				</Left>
				<Right>
					
						<Text style={{color: '#fff', fontSize: 18}}>Daftar</Text>
					
				</Right>
		        
			</Header>
		)
	})

	constructor(props) {
		super(props);
		
		this.state = {
			emailInput : '',
			passwordInput : '',
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
							<Label style={{color: '#212121'}}>Email</Label>
							<Input onChangeText={(emailInput) => this.setState({emailInput})} placeholder="Silahkan masukkan email anda" style={{fontSize: 13}} placeholderTextColor="#BDBDBD" autoFocus={true} keyboardType="email-address"/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#212121'}}>Password</Label>
							<Input onChangeText={(passwordInput) => this.setState({passwordInput})} secureTextEntry={true} placeholder="Silahkan masukan password anda" placeholderTextColor="#BDBDBD"/>
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
				<Button style={{borderRadius: 25, backgroundColor: '#FFCDD2'}} block>
					<Text>Masuk</Text>
				</Button>
			)
		}else{
			return(
				<Button style={{borderRadius: 25, backgroundColor: '#f95454'}} block>
					<Text>Masuk</Text>
				</Button>
			)
		}
	}
	
}