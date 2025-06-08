import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {usePickerItemHeight, type RenderItemProps} from '@quidone/react-native-wheel-picker';

const PickerItem = ({item: {value, label}, itemTextStyle}: RenderItemProps<any>) => {
  const height = usePickerItemHeight();
  return (
    <Text style={[styles.text, {lineHeight: height}, itemTextStyle]}>
      {label ?? value}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {textAlign: 'center', fontSize: 20},
});

export default memo(PickerItem);
