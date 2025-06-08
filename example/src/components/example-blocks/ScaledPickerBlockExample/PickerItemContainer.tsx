import React, {memo, useMemo, useCallback} from 'react';
import {Animated} from 'react-native';
import {
  PickerItem,
  RenderItemContainerProps,
  usePickerItemHeight,
  useScrollContentOffset,
} from '@quidone/react-native-wheel-picker';

const PickerItemContainer = ({
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
}: RenderItemContainerProps<PickerItem<any>>) => {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();

  const inputRange = useMemo(
    () => faces.map((f) => height * (index + f.index)),
    [faces, height, index],
  );

  const getScale = useCallback((i: number) => {
    const map: Record<number, number> = {0: 1, 1: 0.6, 2: 0.3};
    return map[i] ?? 0.3;
  }, []);

  const {opacity, rotateX, translateY, scale} = useMemo(() => {
    const scales = faces.map((f) => getScale(Math.abs(f.index)));
    const corrections = scales.map((s) => (1 - s) * height * 0.5);

    return {
      opacity: offset.interpolate({
        inputRange,
        outputRange: faces.map((x) => x.opacity),
        extrapolate: 'clamp',
      }),
      rotateX: offset.interpolate({
        inputRange,
        outputRange: faces.map((x) => `${x.deg}deg`),
        extrapolate: 'extend',
      }),
      translateY: offset.interpolate({
        inputRange,
        outputRange: faces.map(
          (f, i) => f.offsetY - corrections[i]! * Math.sign(f.offsetY),
        ),
        extrapolate: 'extend',
      }),
      scale: offset.interpolate({
        inputRange,
        outputRange: scales,
        extrapolate: 'clamp',
      }),
    };
  }, [faces, height, getScale, inputRange, offset]);

  return (
    <Animated.View
      style={[
        {
          height,
          opacity,
          transform: [{translateY}, {rotateX}, {scale}, {perspective: 1000}],
        },
      ]}
    >
      {renderItem({item, index, itemTextStyle})}
    </Animated.View>
  );
};

export default memo(PickerItemContainer);
