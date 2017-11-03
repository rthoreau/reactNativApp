import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
  },
});

/*const SampleScreen = ({ title }) => (
  <View style={styles.container}>
     <Text style={styles.title}>{title}</Text>-->
  </View>
);*/
const SampleScreen = ({ title, content }) => (
  <View style={styles.container}>
     {content}
  </View>
);

export default SampleScreen;
