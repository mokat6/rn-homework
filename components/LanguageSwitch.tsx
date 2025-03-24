import {Modal, FlatList, Text, TouchableOpacity, View, StyleSheet, Image, ViewStyle} from 'react-native';
import {useCallback, useRef, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import flags from '@/constants/flags';
import Shevron from '@/assets/images/shevron.svg';
import {useLanguage} from '@/contexts/LanguageContext';

interface LanguageItem {
  value: string;
  label: string;
  flagKey: keyof typeof flags;
}

const local_data: LanguageItem[] = [
  {value: 'lt', label: 'LT', flagKey: 'lithuania'},
  {value: 'en', label: 'EN', flagKey: 'usa'},
  {value: 'pl', label: 'PL', flagKey: 'poland'},
];

const LanguageSwitch = ({style, value}: {style?: ViewStyle; value: string}) => {
  const {language, setLanguage} = useLanguage();
  const [showList, setShowList] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0, width: 0, height: 0});
  const buttonRef = useRef<View>(null);
  const {width: screenW, height: screenH} = useWindowDimensions();

  const measure = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.measureInWindow((x, y, width, height) => {
        setButtonPosition({x, y, width, height});
      });
    }
  }, [screenW, screenH]);

  const modalCoords = {
    top: buttonPosition.y + buttonPosition.height + 2,
    left: buttonPosition.x,
    width: buttonPosition.width,
  };

  const renderItem = (item?: LanguageItem, color?: string) => {
    if (!item) return <Text>Language</Text>;

    return (
      <>
        <SvgXml width="20" height="20" xml={flags[item.flagKey]} />
        <Text style={[styles.itemText, {color}]}>{item.label}</Text>
      </>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity ref={buttonRef} onLayout={measure} onPress={() => setShowList(true)} style={styles.button}>
        {/* <Text style={styles.selectionText}>{selected || 'Select Language'}</Text> */}
        {renderItem(
          local_data.find(languageItem => languageItem.value === language),
          '#fff',
        )}
        <Shevron style={styles.shevron} />
      </TouchableOpacity>

      <Modal visible={showList} animationType="fade" transparent>
        <TouchableOpacity style={styles.overlay} onPress={() => setShowList(false)}>
          <View style={[styles.dropdown, modalCoords]}>
            <FlatList
              data={local_data}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setLanguage(item.value);
                    setShowList(false);
                  }}
                  style={styles.item}>
                  {renderItem(item)}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default LanguageSwitch;

const styles = StyleSheet.create({
  container: {padding: 10},
  button: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionText: {fontSize: 16, color: '#fff'},
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', alignItems: 'center'},
  dropdown: {top: 25, position: 'absolute', backgroundColor: 'white', padding: 5, borderRadius: 10},
  item: {flexDirection: 'row', padding: 10},
  itemText: {fontSize: 16, marginLeft: 10},
  image: {width: 24, height: 24, borderRadius: 12},
  shevron: {},
});
