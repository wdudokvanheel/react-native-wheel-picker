import React, {useCallback, useState} from 'react';
import WheelPicker, {
  PickerItem,
  type ValueChangedEvent,
} from '@quidone/react-native-wheel-picker';
import {useInit} from '@rozhkov/react-useful-hooks';
import {View} from 'react-native';
import {withExamplePickerConfig} from '../../picker-config';
import {Header} from '../base';

const ExampleWheelPicker = withExamplePickerConfig(WheelPicker);
const createPickerItem = (index: number): PickerItem<number> => ({
  value: index,
  label: index.toString(),
});

const ScaledPicker = () => {
  const data = useInit(() => [...Array(100).keys()].map(createPickerItem));
  const [value, setValue] = useState(10);

  const onValueChanged = useCallback(
    ({item: {value: val}}: ValueChangedEvent<PickerItem<number>>) => {
      setValue(val);
    },
    [],
  );

  return (
    <>
      <Header title={'Scaled Picker'} />
      <View style={{backgroundColor: 'gray'}}>
        <ExampleWheelPicker
          data={data}
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
