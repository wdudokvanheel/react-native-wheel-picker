import React, {useCallback, useState} from 'react';
import WheelPicker, {
  PickerItem,
  type ValueChangedEvent,
  type RenderItem,
  usePickerItemHeight,
} from '@quidone/react-native-wheel-picker';
import type {TextStyle, StyleProp} from 'react-native';
import {useInit} from '@rozhkov/react-useful-hooks';
import {View, Text} from 'react-native';
import {withExamplePickerConfig} from '../../picker-config';
import {Header} from '../base';

const ExampleWheelPicker = withExamplePickerConfig(WheelPicker);
const createPickerItem = (index: number): PickerItem<number> => ({
  value: index,
  label: index.toString(),
});

const Item = ({
  item: {value: itemValue, label},
  itemTextStyle,
  isSelected,
}: {
  item: PickerItem<number>;
  itemTextStyle: StyleProp<TextStyle> | undefined;
  isSelected: boolean;
}) => {
  const height = usePickerItemHeight();
  return (
    <Text
      style={[
        {lineHeight: height, textAlign: 'center', color: isSelected ? 'red' : 'black'},
        itemTextStyle,
      ]}
    >
      {label ?? itemValue}
    </Text>
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
    (props) => (
      <Item
        {...props}
        isSelected={props.item.value === value}
      />
    ),
    [value],
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
