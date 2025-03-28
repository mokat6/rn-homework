import {Modal, FlatList, Text, TouchableOpacity, View, StyleSheet, ViewStyle} from 'react-native';
import {useCallback, useRef, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import Shevron from '@/assets/images/shevron.svg';

type AppPickerProps<T> = {
  style?: ViewStyle;
  data: T[];
  selectedValue: T;
  onSelect: (item: T) => void;
  renderItem: (item: T, color?: string) => React.ReactNode;
};

function AppPicker<T extends {value: string}>({style, data, selectedValue, onSelect, renderItem}: AppPickerProps<T>) {
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

  return (
    <View style={[styles.container, style]}>
      {/* Selection Button */}
      <TouchableOpacity ref={buttonRef} onLayout={measure} onPress={() => setShowList(true)} style={styles.button}>
        {renderItem(selectedValue)}
        <Shevron style={styles.shevron} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={showList} animationType="fade" transparent>
        <TouchableOpacity style={styles.overlay} onPress={() => setShowList(false)}>
          <View style={[styles.dropdown, modalCoords]}>
            <FlatList
              data={data}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
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
}

export default AppPicker;

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
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', alignItems: 'center'},
  dropdown: {top: 25, position: 'absolute', backgroundColor: 'white', padding: 5, borderRadius: 10},
  item: {flexDirection: 'row', padding: 10},
  shevron: {},
});
