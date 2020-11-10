import React, { Component } from 'react';
import { Animated, StyleSheet, I18nManager, Alert } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

export default class GmailStyleSwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          Alert.alert('Edit Data', 'Edit data ini?');
        }}>
        <AnimatedIcon
          name="edit"
          size={30}
          color="#ffffff"
          style={[styles.actionIcon, { transform: [{ translateX: trans }] }]}
        />
      </RectButton>
    );
  };

  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          Alert.alert('Delete', 'Hapus data ini?');
        }}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#ffffff"
          style={[styles.actionIcon, { transform: [{ translateX: trans }] }]}
        />
      </RectButton>
    );
  };

  updateRef = (ref) => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={80}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#48BB78',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    zIndex: 10,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#E53E3E',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
