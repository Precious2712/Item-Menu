import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
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
              backgroundColor: isDark
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
            },
            headerTintColor: isDark ? '#fff' : '#000',
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: isDark
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
            },
            headerTintColor: isDark ? '#fff' : '#000',
          }}
        />

        <Stack.Screen
          name="(menu)"
          options={{ headerShown: false }}
        />
      </Stack>

      
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={
          isDark
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background
        }
        translucent={false}
      />
    </ThemeProvider>
  );
}
