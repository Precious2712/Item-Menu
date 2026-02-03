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

export default function CreateAccount() {
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
                        Create your account
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                        Start ordering delicious meals today 🍔
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
                    style={[
                        styles.button,
                        { backgroundColor: theme.colors.primary },
                    ]}
                >
                    <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>

                <Link href='/login'
                    style={[styles.link, { color: theme.colors.primary }]}
                    onPress={() => router.push('/login')}
                >
                    Already have an account? Sign in
                </Link>
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
});
