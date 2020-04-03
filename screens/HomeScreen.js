import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Content, Body, Text, ListItem, List, Right, View, Thumbnail, Icon, Button, Switch } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector'

export default function HomeScreen() {
  const [selectedValue, setSelectedValue] = React.useState('15%');
  let index = 0;
  const data = [
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
      { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
  ];

  return (
    <View style={styles.container}>
      <Content contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <ListItem style={{ borderBottomWidth: 0, width: '90%' }}>
            <Body>
              <Text style={styles.description} note>You send</Text>
              <Text style={styles.cardValue}>13.39</Text>
            </Body>
            <Right style={{ flexDirection: 'row', paddingTop: 20 }}>
              <Text style={[styles.description, { marginBottom: 4 }]} note>CAN</Text>
              <Thumbnail small source={require('../assets/images/canada.png')} style={{ marginLeft: 10 }} />
            </Right>
          </ListItem>
        </View>
        <View style={styles.card}>
          <ListItem style={{ borderBottomWidth: 0, width: '90%' }}>
            <Body>
              <Text style={styles.description} note>They receive</Text>
              <Text style={styles.cardValue}>34,344.000</Text>
            </Body>
            <Right style={{ flexDirection: 'row', paddingTop: 20 }}>
              <Text style={[styles.description, { marginBottom: 4 }]} note>UGX</Text>
              <Thumbnail small source={require('../assets/images/uganda.png')} style={{ marginLeft: 10 }} />
            </Right>
          </ListItem>
        </View>
        <List>
          <ModalSelector
            data={data}
            accessible={true}
            animationType="fade"
            onChange={(option) => {}}>
              <ListItem>
                <Body>
                  <Text style={styles.description} note>Delivery method</Text>
                  <Text style={styles.listBody}>Mobile money transfer</Text>
                </Body>
                <Right style={{ paddingTop: 20 }}>
                  <Icon name="ios-checkmark-circle-outline" style={{ fontSize: 40 }} />
                </Right>
              </ListItem>
          </ModalSelector>
          <ModalSelector
            data={data}
            accessible={true}
            animationType="fade"
            onChange={(option) => {}}>
              <ListItem>
                <Body>
                  <Text style={styles.description} note>Provider</Text>
                  <Text style={styles.listBody}>MTN money account</Text>
                </Body>
                <Right style={{ paddingTop: 20 }}>
                  <Icon name="ios-checkmark-circle-outline" style={{ fontSize: 40 }} />
                </Right>
              </ListItem>
          </ModalSelector>
          <ModalSelector
            data={data}
            accessible={true}
            animationType="fade"
            onChange={(option) => {}}>
              <ListItem>
              <Body>
                <Text style={styles.description} note>Recipent</Text>
                <Text style={styles.listBody}>Nababi Joan</Text>
              </Body>
              <Right style={{ paddingTop: 20 }}>
                <Icon name="ios-checkmark-circle-outline" style={{ fontSize: 40 }} />
              </Right>
            </ListItem>
          </ModalSelector>
        </List>
      </Content>
      <View style={styles.sectionFooter}>
        <View style={{ width: '100%' }}>
          <ListItem>
            <Body>
              <Text style={styles.listDescription} note>Total to pay</Text>
              <Text style={styles.listTitle}>14.38 CAN</Text>
            </Body>
            <Right>
              <TouchableOpacity>
                <Text style={styles.listDescription}>See details</Text>
              </TouchableOpacity>
            </Right>
          </ListItem>
        </View>
        <Button block style={{ height: 60, backgroundColor: '#808080' }}>
          <Text style={styles.paymentText}>Continue to payment</Text>
        </Button>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 20,
    fontWeight: '400'
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8
  },
  listBody: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
    color: 'grey'
  },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    borderRadius: 10,
    marginBottom: 20
  },
  sectionFooter: {
    height: 150,
    backgroundColor: "#FFF",
    padding: 5,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10
  },
  listTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 2,
    marginBottom: 6,
    color: '#808080'
  },
  listDescription: {
    fontWeight: "500",
    fontSize: 15,
    color: '#808080'
  },
  paymentText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22
  }
});
