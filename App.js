import React from 'react';
import { StyleSheet, Text, View, WebView, Platform } from 'react-native';


export default function App() {
  return (
      <WebView
      source={{ uri: "https://www.ufo-hunters.com" }}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
