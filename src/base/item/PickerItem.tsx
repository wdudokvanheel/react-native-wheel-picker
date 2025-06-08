import React, {memo} from 'react';
import {Animated, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {usePickerItemHeight} from '../contexts/PickerItemHeightContext';

type PickerItemProps = {
  value: any;
  label?: string;
  itemTextStyle: StyleProp<TextStyle>;
};

const PickerItem = ({value, label, itemTextStyle}: PickerItemProps) => {
  const height = usePickerItemHeight();

  return (
    <Animated.Text style={[styles.root, {lineHeight: height}, itemTextStyle]}>
      {label ?? value}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  root: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default memo(PickerItem);
