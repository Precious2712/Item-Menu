import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark
    ? DarkTheme.colors.background
    : DefaultTheme.colors.background;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar
        style="auto"
        backgroundColor={
          isDark ? DarkTheme.colors.background : DefaultTheme.colors.background
        }
        translucent={false}
      />


      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="create"
          options={{
            title: 'Create',
            headerStyle: {
              backgroundColor,
            },
            headerTintColor: isDark ? '#fff' : '#000',
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor,
            },
            headerTintColor: isDark ? '#fff' : '#000',
          }}
        />

        <Stack.Screen
          name="(menu)"
          options={{ headerShown: false }}
        />
      </Stack>

      <Toast />
    </ThemeProvider>
  );
}
