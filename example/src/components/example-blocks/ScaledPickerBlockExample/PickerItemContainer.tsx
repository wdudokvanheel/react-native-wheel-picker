import React, {memo, useMemo} from 'react';
import {Animated} from 'react-native';
import {
  PickerItem,
  RenderItemContainerProps,
  usePickerItemHeight,
  useScrollContentOffset,
} from '@quidone/react-native-wheel-picker';

const OFFSET_FACTOR = 0.5;

const PickerItemContainer = ({
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
}: RenderItemContainerProps<PickerItem<any>>) => {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();

  const inputRange = useMemo(() => faces.map(f => height * (index + f.index)), [faces, height, index]);

  const {opacity, rotateX, translateY, scale} = useMemo(() => {
    const getScale = (i: number) => {
      const map: Record<number, number> = {0: 1, 1: 0.6, 2: 0.3};
      return map[i] ?? 0.3;
    };

    return {
      opacity: offset.interpolate({
        inputRange,
        outputRange: faces.map(x => x.opacity),
        extrapolate: 'clamp',
      }),
      rotateX: offset.interpolate({
        inputRange,
        outputRange: faces.map(x => `${x.deg}deg`),
        extrapolate: 'extend',
      }),
      translateY: offset.interpolate({
        inputRange,
        outputRange: faces.map(x => x.offsetY * OFFSET_FACTOR),
        extrapolate: 'extend',
      }),
      scale: offset.interpolate({
        inputRange,
        outputRange: faces.map(f => getScale(Math.abs(f.index))),
        extrapolate: 'clamp',
      }),
    };
  }, [faces, offset, inputRange]);

  return (
    <Animated.View
      style={[
        {
          height,
          opacity,
          transform: [{translateY}, {rotateX}, {scale}, {perspective: 1000}],
        },
      ]}>
      {renderItem({item, index, itemTextStyle})}
    </Animated.View>
  );
};

export default memo(PickerItemContainer);
