/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';
import type { Node } from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

const HeaderBar = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('../assets/hero-img.png')}
    style={styles.background}
    imageStyle={styles.logo}>
    <Text style={styles.text}>Nurul Putri Ahmad</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: '#ffffff',
  },
  logo: {
    opacity: 0.3,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4A5568',
  },
});

export default HeaderBar;
