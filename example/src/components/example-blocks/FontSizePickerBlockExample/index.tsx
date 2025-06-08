import React, {memo, useCallback, useState} from 'react';
import WheelPicker, {
  PickerItem,
  RenderItem,
  RenderItemContainer,
  type ValueChangedEvent,
} from '@quidone/react-native-wheel-picker';
import {useInit} from '@rozhkov/react-useful-hooks';
import {withExamplePickerConfig} from '../../../picker-config';
import {Header} from '../../base';
import PickerItemComponent from './PickerItem';
import PickerItemContainer from './PickerItemContainer';

const ExampleWheelPicker = withExamplePickerConfig(WheelPicker);

const createPickerItem = (index: number): PickerItem<number> => ({
  value: index,
  label: index.toString(),
});

const renderItem: RenderItem<PickerItem<number>> = (props) => (
  <PickerItemComponent {...props} />
);
const renderItemContainer: RenderItemContainer<PickerItem<number>> = (props) => (
  <PickerItemContainer {...props} />
);

const FontSizePicker = () => {
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
      <Header title={'Font Size Picker'} />
      <ExampleWheelPicker
        data={data}
        value={value}
        onValueChanged={onValueChanged}
        renderItem={renderItem}
        renderItemContainer={renderItemContainer}
      />
    </>
  );
};

export default memo(FontSizePicker);
