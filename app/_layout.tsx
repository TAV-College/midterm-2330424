import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; // Import icon library

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="+not-found" 
        />
        {/* New Tab */}
        <Stack.Screen 
          name="new-tab" 
          component={NewTabScreen} // Define this component separately
          options={{ 
            title: 'New Tab', 
            tabBarIcon: () => <Ionicons name="md-star" size={24} color="black" /> // Example icon
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}

// Example of NewTabScreen component
function NewTabScreen() {
  return (
    <View>
      <Text>Welcome to the New Tab!</Text>
    </View>
  );
}
