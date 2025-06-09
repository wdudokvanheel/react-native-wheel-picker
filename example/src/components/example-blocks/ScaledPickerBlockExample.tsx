import React, {useCallback, useMemo, useState} from 'react';
import WheelPicker, {
  PickerItem,
  type ValueChangedEvent,
  type RenderItem,
  usePickerItemHeight,
  useScrollContentOffset,
} from '@quidone/react-native-wheel-picker';
import type {TextStyle, StyleProp} from 'react-native';
import {useInit} from '@rozhkov/react-useful-hooks';
import {View, Animated} from 'react-native';
import {withExamplePickerConfig} from '../../picker-config';
import {Header} from '../base';

const ExampleWheelPicker = withExamplePickerConfig(WheelPicker);
const createPickerItem = (index: number): PickerItem<number> => ({
  value: index,
  label: index.toString(),
});

const Item = ({
  item: {value: itemValue, label},
  index,
  itemTextStyle,
}: {
  item: PickerItem<number>;
  index: number;
  itemTextStyle: StyleProp<TextStyle> | undefined;
}) => {
  const height = usePickerItemHeight();
  const offset = useScrollContentOffset();
  const inputRange = useMemo(
    () => [height * (index - 1), height * index, height * (index + 1)],
    [height, index],
  );

  const activeOpacity = useMemo(
    () =>
      offset.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      }),
    [inputRange, offset],
  );
  const inactiveOpacity = useMemo(
    () =>
      offset.interpolate({
        inputRange,
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
      }),
    [inputRange, offset],
  );

  return (
    <Animated.View style={{height, justifyContent: 'center'}}>
      <Animated.Text
        style={[
          {
            position: 'absolute',
            lineHeight: height,
            textAlign: 'center',
            opacity: inactiveOpacity,
            color: 'black',
          },
          itemTextStyle,
        ]}
      >
        {label ?? itemValue}
      </Animated.Text>
      <Animated.Text
        style={[
          {
            position: 'absolute',
            lineHeight: height,
            textAlign: 'center',
            opacity: activeOpacity,
            color: 'red',
          },
          itemTextStyle,
        ]}
      >
        {label ?? itemValue}
      </Animated.Text>
    </Animated.View>
  );
};

const ScaledPicker = () => {
  const data = useInit(() => [...Array(100).keys()].map(createPickerItem));
  const [value, setValue] = useState(10);

  const onValueChanged = useCallback(
    ({item: {value: val}}: ValueChangedEvent<PickerItem<number>>) => {
      setValue(val);
    },
    [],
  );

  const renderItem: RenderItem<PickerItem<number>> = useCallback(
    (props) => <Item {...props} />,
    [],
  );

  return (
    <>
      <Header title={'Scaled Picker'} />
      <View style={{backgroundColor: 'gray'}}>
        <ExampleWheelPicker
          data={data}
          renderItem={renderItem}
          itemHeight={108}
          itemTextStyle={{
            fontSize: 72,
            fontWeight: 'bold',
          }}
          overlayItemStyle={{
            opacity: 1,
            backgroundColor: '#F0F',
            borderWidth: 8,
            borderColor: '#0000FF',
            borderRadius: 128,
          }}
          value={value}
          onValueChanged={onValueChanged}
          width={250}
        />
      </View>
    </>
  );
};

export default ScaledPicker;
