import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="create"
          options={{
            title: 'Create',
            headerStyle: {
              backgroundColor: `${colorScheme === 'dark' ? DarkTheme.colors.primary : DefaultTheme.colors.primary}`
            }
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: `${colorScheme === 'dark' ? DarkTheme.colors.primary : DefaultTheme.colors.primary}`
            }
          }}
        />

        <Stack.Screen
          name="(menu)"
          options={{
            headerShown: false
          }}
        />
      </Stack>

      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        backgroundColor={
          colorScheme === 'dark'
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background
        }
        translucent={false}
      />
    </ThemeProvider>
  );
}
