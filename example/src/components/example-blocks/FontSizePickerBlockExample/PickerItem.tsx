import React, {memo} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {usePickerItemHeight, type RenderItemProps} from '@quidone/react-native-wheel-picker';

const AnimatedText = Animated.createAnimatedComponent(Text);

const PickerItem = ({item: {value, label}, itemTextStyle}: RenderItemProps<any>) => {
  const height = usePickerItemHeight();
  return (
    <AnimatedText style={[styles.text, {lineHeight: height}, itemTextStyle]}>
      {label ?? value}
    </AnimatedText>
  );
};

const styles = StyleSheet.create({
  text: {textAlign: 'center', fontSize: 20},
});

export default memo(PickerItem);
