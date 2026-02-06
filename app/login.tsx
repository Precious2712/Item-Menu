import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Keyboard,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';

import Toast from 'react-native-toast-message';
import axios, { isAxiosError } from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const colorScheme = useColorScheme();

    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    const emailFocus = useState(new Animated.Value(0))[0];
    const passwordFocus = useState(new Animated.Value(0))[0];

    const animateIn = (anim: Animated.Value) => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 180,
            useNativeDriver: false,
        }).start();
    };

    const animateOut = (anim: Animated.Value, value: string) => {
        if (!value) {
            Animated.timing(anim, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
            }).start();
        }
    };

    const emailLabelStyle = {
        top: emailFocus.interpolate({
            inputRange: [0, 1],
            outputRange: [16, -8],
        }),
        fontSize: emailFocus.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: emailFocus.interpolate({
            inputRange: [0, 1],
            outputRange: ['#999', theme.colors.text],
        }),
    };

    const passwordLabelStyle = {
        top: passwordFocus.interpolate({
            inputRange: [0, 1],
            outputRange: [16, -8],
        }),
        fontSize: passwordFocus.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: passwordFocus.interpolate({
            inputRange: [0, 1],
            outputRange: ['#999', theme.colors.text],
        }),
    };


    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Email and Password required',
                text2: 'Please enter both fields to continue',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
            });
            return;
        }

        const user = { email, password };

        try {
            await axios.post('https://backend-service-jfkg.onrender.com/api/v1/sign-in-user', user);

            Toast.show({
                type: 'success',
                text1: 'Account Created',
                text2: `Welcome, ${email}!`,
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
            });

            router.push('/');

        } catch (error) {
            console.log(error);

            let err = 'An error has occured'

            if (isAxiosError(error)) {
                err = error.response?.data.message
            }

            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: err || 'Something went wrong',
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ThemedView
                // safe
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.background },
                ]}
            >

                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Welcome back
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                        Order your favorite meals in seconds 🍽️
                    </Text>
                </View>


                <View style={styles.field}>
                    <Animated.Text
                        style={[
                            styles.label,
                            emailLabelStyle,
                            { backgroundColor: theme.colors.background },
                        ]}
                    >
                        Email address
                    </Animated.Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => animateIn(emailFocus)}
                        onBlur={() => animateOut(emailFocus, email)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={[
                            styles.input,
                            {
                                borderColor: theme.colors.border,
                                color: theme.colors.text,
                            },
                        ]}
                        placeholderTextColor={theme.colors.text + '80'}
                    />
                </View>


                <View style={styles.field}>
                    <Animated.Text
                        style={[
                            styles.label,
                            passwordLabelStyle,
                            { backgroundColor: theme.colors.background },
                        ]}
                    >
                        Password
                    </Animated.Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => animateIn(passwordFocus)}
                        onBlur={() => animateOut(passwordFocus, password)}
                        secureTextEntry
                        style={[
                            styles.input,
                            {
                                borderColor: theme.colors.border,
                                color: theme.colors.text,
                            },
                        ]}
                        placeholderTextColor={theme.colors.text + '80'}
                    />
                </View>


                <TouchableOpacity
                    onPress={handleLogin}
                    style={[
                        styles.button,
                        { backgroundColor: theme.colors.primary },
                    ]}
                >
                    <Text style={styles.buttonText}>Continue to menu</Text>
                </TouchableOpacity>


                <Link href='/create' style={[styles.link, { color: theme.colors.primary }]}>
                    New here? Create an account
                </Link>


                <Text style={[styles.trust, { color: theme.colors.text }]}>
                    🍲 Fresh meals from trusted kitchens
                </Text>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
    },

    header: {
        marginBottom: 36,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        opacity: 0.8,
    },

    field: {
        marginBottom: 24,
        position: 'relative',
    },

    label: {
        position: 'absolute',
        left: 14,
        paddingHorizontal: 4,
        zIndex: 1,
    },

    input: {
        height: 54,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 16,
    },

    button: {
        height: 54,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    link: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 14,
    },

    trust: {
        marginTop: 16,
        textAlign: 'center',
        fontSize: 13,
        opacity: 0.7,
    },
});
