import React, {FC, memo, useCallback, useMemo} from 'react';
import type {
  default as WheelPicker,
  OnValueChanging,
  WheelPickerProps,
} from '@quidone/react-native-wheel-picker';
import {usePickerConfig} from './PickerConfigProvider';
import {withVirtualized} from '@quidone/react-native-wheel-picker';

const withExamplePickerConfig = (
  WrappedComponent: FC<WheelPickerProps<any>>,
) => {
  const Wrapper = ({
    onValueChanging: onValueChangingProp,
    ...restProps
  }: WheelPickerProps<any>) => {
    const {enabledVirtualized, readOnly, visibleItemCount} = usePickerConfig();

    const onValueChanging = useCallback<OnValueChanging<any>>(
      (...args) => {
        onValueChangingProp?.(...args);
      },
      [onValueChangingProp],
    );

    const ResultComponent = useMemo(() => {
      if (!enabledVirtualized) {
        return WrappedComponent;
      }
      return withVirtualized(WrappedComponent as any);
    }, [enabledVirtualized]);

    return (
      <ResultComponent
        visibleItemCount={visibleItemCount}
        readOnly={readOnly}
        {...restProps}
        onValueChanging={onValueChanging}
      />
    );
  };

  Wrapper.displayName = `withExamplePickerConfig(${WrappedComponent.displayName})`;

  return memo(Wrapper) as typeof WheelPicker;
};

export default withExamplePickerConfig;
