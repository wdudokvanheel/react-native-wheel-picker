import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import type {RenderOverlayProps} from '@quidone/react-native-wheel-picker';
import {MAX_SCALE} from './constants';

type Props = RenderOverlayProps & {
  lineHeight?: number;
};

const Overlay = ({itemHeight, overlayItemStyle, lineHeight}: Props) => {
  const height = lineHeight ?? itemHeight * MAX_SCALE;
  return (
    <View style={styles.overlayContainer} pointerEvents="none">
      <View style={[styles.selection, {height}, overlayItemStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selection: {
    borderRadius: 8,
    alignSelf: 'stretch',
  },
});

export default memo(Overlay);
