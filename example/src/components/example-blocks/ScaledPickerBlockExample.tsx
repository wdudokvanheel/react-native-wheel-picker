import React, {useCallback, useState} from 'react';
import WheelPicker, {PickerItem, type ValueChangedEvent} from '@quidone/react-native-wheel-picker';
import {useInit} from '@rozhkov/react-useful-hooks';
import {withExamplePickerConfig} from '../../picker-config';
import {Header} from '../base';

const ExampleWheelPicker = withExamplePickerConfig(WheelPicker);
const createPickerItem = (index: number): PickerItem<number> => ({
  value: index,
  label: index.toString(),
});

const ScaledPicker = () => {
  const data = useInit(() => [...Array(100).keys()].map(createPickerItem));
  const [value, setValue] = useState(0);

  const onValueChanged = useCallback(
    ({item: {value: val}}: ValueChangedEvent<PickerItem<number>>) => {
      setValue(val);
    },
    [],
  );

  return (
    <>
      <Header title={'Scaled Picker'} />
      <ExampleWheelPicker
        data={data}
        value={value}
        onValueChanged={onValueChanged}
        width={100}
      />
    </>
  );
};

export default ScaledPicker;
