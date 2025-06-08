import React, {memo, useMemo} from 'react';
import {Animated} from 'react-native';
import {
  PickerItem,
  RenderItemContainerProps,
  usePickerItemHeight,
  useScrollContentOffset,
} from '@quidone/react-native-wheel-picker';
import {MIN_SCALE, MAX_SCALE, STEP_DECREASE} from './constants';

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

  const {opacity, rotateX, translateY, scale} = useMemo(() => {
    const getScale = (faceIndex: number) =>
      Math.max(MIN_SCALE, MAX_SCALE - STEP_DECREASE * Math.abs(faceIndex));

    const scales = faces.map((x) => getScale(x.index));

    const baseTranslateY = offset.interpolate({
      inputRange,
      outputRange: faces.map((x) => x.offsetY),
      extrapolate: 'extend',
    });

    const scaleAnim = offset.interpolate({
      inputRange,
      outputRange: scales,
      extrapolate: 'clamp',
    });

    const translateYAnim = Animated.add(
      baseTranslateY,
      Animated.multiply(Animated.add(scaleAnim, -1), -height / 2),
    );

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
      translateY: translateYAnim,
      scale: scaleAnim,
    };
  }, [faces, height, offset, inputRange]);

  return (
    <Animated.View
      style={{
        height,
        opacity,
        transform: [{translateY}, {rotateX}, {perspective: 1000}, {scale}],
      }}
    >
      {renderItem({item, index, itemTextStyle})}
    </Animated.View>
  );
};

export default memo(PickerItemContainer);
