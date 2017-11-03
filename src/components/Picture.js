import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height,
  },
});

const Picture = () => <Image source={{uri: 'http://ceosonweb.alwaysdata.net/color1.png'}} style={styles.image} />

export default Picture;
