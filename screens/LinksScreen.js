import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Modal, Dimensions, Picker } from 'react-native';
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Thumbnail, Separator, Item } from 'native-base';
import { RectButton, ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal'
import RBSheet from "react-native-raw-bottom-sheet";

const img = require('../assets/images/robot-prod.png')

export default function LinksScreen() {
  const [countryCode, setCountryCode] = useState('FR')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(
    false,
  )
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(true)
  const [withCallingCode, setWithCallingCode] = useState(false)
  const [countryModal, setCountryModal] = useState(false)
  const [cashModal, setCashModal] = useState(false);
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setCountryModal(false)
  }
  const onClose = () => {
    setCountryModal(false)
  }
  const renderFlagButton = () => null
  const refRBSheet = useRef()
  const [selectedValue, setSelectedValue] = useState('15%');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="location-on"
        label="Select a country"
        onPress={() => setCountryModal(true)}
      />

      <OptionButton
        icon="local-atm"
        label="Open Cash Modal"
        onPress={() => setCashModal(true)}
      />

      <OptionButton
        icon="payment"
        label="Open Trades"
        onPress={() => refRBSheet.current.open()}
        isLastOption
      />

      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
          onClose,
          renderFlagButton,
        }}
        visible={countryModal}
      />

      <CashModal
        modalVisible={cashModal}
        setModalVisible={setCashModal}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
        height={360}
      >
        <Trades
          close={() => refRBSheet.current.close()}
          selectedValue={selectedValue}
          setSelectedValue={(value) => setSelectedValue(value)}
        />
      </RBSheet>
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <MaterialIcons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

function CashModal ({ modalVisible, setModalVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <Container>
        <Header style={{ backgroundColor: '#007aff', borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={() => setModalVisible(!modalVisible)}>
              <Icon name='md-arrow-back' style={{ color: 'white' }} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Cash</Title>
          </Body>
          <Right></Right>
        </Header>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionDate}>MARCH 2020</Text>
          <View style={styles.divider1} />
          <View style={styles.divider2} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.title}>Starting cash</Text>
            <Text style={styles.title}>$1,039,284.12</Text>
          </View>
        </View>
        <Content>
          <List>
            <ListItem avatar style={{ paddingVertical: 10, borderBottomWidth: 0.8, borderColor: '#d3d3d3' }}>
              <Left>
                <Thumbnail source={img} />
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text style={styles.listBody} note>Mar 30, 14:23</Text>
                <Text style={styles.listTitle}>Melrose Industries</Text>
                <Text style={styles.listBody} note>Opened.Sold @ $0.8800</Text>
              </Body>
              <Right style={{ borderBottomWidth: 0, justifyContent: 'center' }}>
                <Text style={styles.listBody}>$139,284.12</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
        <View style={styles.sectionFooter}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.title}>Available cash</Text>
            <Text style={styles.title}>$1,039,284.12</Text>
          </View>
        </View>
      </Container>
    </Modal>
  )
}

function Trades({ close, selectedValue, setSelectedValue }) {
  return (
    <View>
      <View style={styles.tradeHeader}>
        <Text style={styles.sectionDate}>CASH $1,039,284.12</Text>
        <Text style={styles.sectionDate}>TRADES 10</Text>
      </View>
      <View style={styles.tradeBody}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 180, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          itemStyle={styles.title}
        >
          <Picker.Item label="10%" value="10%" />
          <Picker.Item label="15%" value="15%" />
        </Picker>
        <Text style={styles.title}>of total portfolio</Text>
      </View>
      <View style={styles.tradeFooter}>
        <Button block>
          <Text>SELL $108.9K</Text>
        </Button>
        <Button block transparent onPress={close}>
          <Text>Cancel</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  title: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 20
  },
  sectionDate: {
    color: "white",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 15,
  },
  sectionHeader: {
    height: 100,
    backgroundColor: "rgb(35,83,155)",
    padding: 25,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5
  },
  sectionFooter: {
    height: 70,
    backgroundColor: "rgb(33,31,57)",
    padding: 15,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5
  },
  tradeHeader: {
    height: 40,
    backgroundColor: "rgb(33,31,57)",
    padding: 8,
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5
  },
  tradeFooter: {
    height: 120,
    backgroundColor: "rgb(33,31,57)",
    padding: 15,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5
  },
  tradeBody: {
    paddingLeft: 30,
    paddingRight: 50,
    backgroundColor: 'rgb(52,52,91)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  divider1: {
    height: 1.5,
    width: '100%',
    backgroundColor: 'rgb(52,52,91)',
    marginTop: 6
  },
  divider2: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgb(45,119,230)',
    marginBottom: 6
  },
  listTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 2,
    marginBottom: 6
  },
  listBody: {
    fontSize: 15
  }
});
