import React, { Component } from 'react';
import { Image, Text, View, WebView, ActivityIndicator, StatusBar, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner=()=> {
    this.setState({ visible: false });
  }
  showSpinner=()=> {
    this.setState({ visible: true });
  }

  state = {
    isSplashReady: false,
    isAppReady: false,
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
 
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#959C16' }}>
        <View style={styles.container}>
          <WebView 
            onLoadStart={() => (this.showSpinner())}
            onLoad={() => this.hideSpinner()}
            style={{ flex: 1 }}
            source={{ uri: "https://www.ufo-hunters.com" }}
          />
          {this.state.visible && ( 
            <ActivityIndicator
              style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center' }}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/splash.png');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
      require('./assets/images/loading.png')
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

