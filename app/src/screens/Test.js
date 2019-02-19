import React, { Component } from 'react';
import { Platform, StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Text, Fab, Icon } from 'native-base';

import { getProduct } from '../publics/redux/actions/products';

type Props = {};
class Test extends Component<Props> {

  componentDidMount() {
    // setInterval(() => {
    //   this.props.dispatch(incNumber(this.props.contacts.number + 1))
    // }, 1000)
    this.getData();
  }

  getData = () => {
    prodId = 2
    this.props.dispatch(getProduct(prodId));
  }

  // renderItem = ({ item, index }) => (
  //   <ListItem
  //     // on LongPress={this.handleDelete(item.id)}
  //     onPress={() => this.props.navigation.navigate('Test', { item })}
  //   >
  //     <Text>{item.title}</Text>
  //     <Text> {item.price}</Text>
  //   </ListItem>
  // )

  // _keyExtractor = (item, index) => item.id.toString();

  render() {
    console.warn(this.props.products.item)
    return (
      <Container>
        <List>
          <Text>
          {this.props.products.item.title}
          </Text>

          <Text>
          {this.props.products.item.price}

          </Text>
        </List>
        <Fab
          style={{ backgroundColor: '#000' }}
          onPress={() => this.props.navigation.navigate('Test')}>
          <Icon name="ios-add" />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Test)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 100,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
