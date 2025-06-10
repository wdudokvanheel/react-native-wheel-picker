import React, {memo, useMemo} from 'react';
import {Animated, StyleProp, TextStyle} from 'react-native';
import {useScrollContentOffset} from '../contexts/ScrollContentOffsetContext';
import {usePickerItemHeight} from '../contexts/PickerItemHeightContext';
import type {RenderItem} from '../types';
import type {Faces} from './faces';

type PickerItemContainerProps = {
  item: any;
  index: number;
  faces: ReadonlyArray<Faces>;
  renderItem: RenderItem<any>;
  itemTextStyle: StyleProp<TextStyle> | undefined;
};

const PickerItemContainer = ({
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
}: PickerItemContainerProps) => {
  const offset = useScrollContentOffset();
  const height = usePickerItemHeight();

  const {opacity, translateY} = useMemo(() => {
    const inputRange = faces.map((f) => height * (index + f.index));
    return {
      opacity: offset.interpolate({
        inputRange: inputRange,
        outputRange: faces.map((x) => x.opacity),
        extrapolate: 'clamp',
      }),
      translateY: offset.interpolate({
        inputRange: inputRange,
        outputRange: faces.map((x) => x.offsetY),
        extrapolate: 'extend',
      }),
    };
  }, [faces, height, index, offset]);

  const scale = useMemo(() => {
    const getScale = (i: number) => {
      const map: Record<number, number> = {0: 1, 1: 0.6, 2: 0.3};
      return map[i] ?? 0.3;
    };

    const inputRange = faces.map((f) => height * (index + f.index));
    const outputRange = faces.map((f) => getScale(Math.abs(f.index)));
    return offset.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
  }, [faces, height, index, offset]);

  const extraTranslateY = useMemo(() => {
    const inputRange = faces.map((f) => height * (index + f.index));
    const ratioMap: Record<number, number> = {
      '-3': -70 / 48,
      '-2': -50 / 48,
      '-1': -20 / 48,
      '1': 20 / 48,
      '2': 50 / 48,
      '3': 70 / 48,
    };
    const outputRange = faces.map((f) => (ratioMap[f.index] ?? 0) * height);
    return offset.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
  }, [faces, height, index, offset]);

  const finalTranslateY = useMemo(
    () => Animated.add(translateY, extraTranslateY),
    [translateY, extraTranslateY],
  );

  return (
    <Animated.View
      style={[
        {
          height,
          opacity,
          transform: [
            // first translateY, then rotateX for correct transformation.
            {translateY: finalTranslateY},
            // {rotateX},
            {perspective: 1000}, // without this line this Animation will not render on Android https://reactnative.dev/docs/animations#bear-in-mind
          ],
        },
      ]}
    >
      <Animated.View style={{transform: [{scale}]}}>
        {renderItem({item, index, itemTextStyle})}
      </Animated.View>
    </Animated.View>
  );
};

export default memo(PickerItemContainer);
