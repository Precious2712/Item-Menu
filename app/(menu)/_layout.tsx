import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import TabHeader from '@/components/LandingPage/tab-header';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DashBoardLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <Tabs
                screenOptions={{
                    header: () => <TabHeader />,
                    headerShown: true,
                    tabBarActiveTintColor: isDark ? '#0a7ea4' : 'black',
                    tabBarInactiveTintColor: 'gray',
                }}
            >
                <Tabs.Screen
                    name="meal"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconSymbol name="meal" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="dishes"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconSymbol name="dishes" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="cart"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconSymbol name="cart" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="view/[id]"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconSymbol name="view" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </ThemeProvider>
    );
}
