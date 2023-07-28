import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font';
import { useCallback } from 'react'

SplashScreen.preventAutoHideAsync()

const Layout = () => {

  const [fontsLoaded] = useFonts({
    'RobotoSlab': require('../assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return <Stack />
}

export default Layout