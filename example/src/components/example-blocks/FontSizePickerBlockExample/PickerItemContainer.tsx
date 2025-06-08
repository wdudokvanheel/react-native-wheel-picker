import React, {memo, useMemo} from 'react';
import {Animated} from 'react-native';
import {
  PickerItem,
  RenderItemContainerProps,
  usePickerItemHeight,
  useScrollContentOffset,
} from '@quidone/react-native-wheel-picker';

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.2;
const STEP_DECREASE = 0.2;

const PickerItemContainer = ({
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
}: RenderItemContainerProps<PickerItem<any>>) => {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();

  const inputRange = useMemo(() => faces.map((f) => height * (index + f.index)), [faces, height, index]);

  const {opacity, rotateX, translateY, scale} = useMemo(() => {
    const getScale = (faceIndex: number) =>
      Math.max(MIN_SCALE, MAX_SCALE - STEP_DECREASE * Math.abs(faceIndex));

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
        outputRange: faces.map((x) => x.offsetY),
        extrapolate: 'extend',
      }),
      scale: offset.interpolate({
        inputRange,
        outputRange: faces.map((x) => getScale(x.index)),
        extrapolate: 'clamp',
      }),
    };
  }, [faces, height, index, offset, inputRange]);

  return (
    <Animated.View
      style={{
        height,
        opacity,
        transform: [{translateY}, {rotateX}, {perspective: 1000}],
      }}
    >
      {renderItem({item, index, itemTextStyle: [itemTextStyle, {transform: [{scale}]}]})}
    </Animated.View>
  );
};

export default memo(PickerItemContainer);
