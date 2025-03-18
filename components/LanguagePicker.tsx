import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SelectCountry} from 'react-native-element-dropdown';
import CountryFlag from 'react-native-country-flag';

const local_data = [
  {
    value: '1',
    lable: 'LT',
    image: require('../assets/images/ltf.png'),
  },
  {
    value: '2',
    lable: 'EN',
    image: {
      uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    },
  },
  {
    value: '3',
    lable: 'PL',
    image: {
      uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    },
  },
];

const LanguagePicker = (_props: any) => {
  const [country, setCountry] = useState('1');

  const renderItem = (item: any) => {
    return (
      <View>
        <Text>{item.label}</Text>
      </View>
    );
  };

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={country}
      data={local_data}
      iconColor="white"
      valueField="value"
      labelField="lable"
      containerStyle={styles.containerStyle}
      itemTextStyle={styles.itemTextStyle}
      imageField="image"
      activeColor="pink"
      placeholder="Select country"
      searchPlaceholder="Search..."
      onChange={e => {
        setCountry(e.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 28,
    width: 87,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'pink',
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerStyle: {
    backgroundColor: 'blue',
  },
  itemTextStyle: {
    color: 'red',
    backgroundColor: 'red',
  },
});
