import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { auth, sendPasswordResetEmail } from '../../../../firebaseConfig'; 

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Track if the email was sent

  // Handle "Send" button press
  const onSendPressed = async (data) => {
    const { username: email } = data;
    setLoading(true);

    try {
      // Send Reset Email
      await sendPasswordResetEmail(auth, email); 

      // Show Success Message
      Alert.alert(
        'Check Your Email',
        `We've sent a password reset link to ${email}. Please check your email and follow the instructions.`
      );
      setEmailSent(true); // Email sent successfully
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        error.message || 'Failed to send reset email'
      );
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Your Password</Text>

        {!emailSent ? (
          <>
            <CustomInput
              name="username"
              control={control}
              placeholder="Enter your email"
              rules={{
                required: 'Email is required',
              }}
            />

            <CustomButton
              text={loading ? 'Sending...' : 'Send'}
              onPress={handleSubmit(onSendPressed)}
              disabled={loading}
            />
          </>
        ) : (
          <>
            <Text style={styles.message}>
              We have sent a password reset email to your registered email. Please check your inbox and follow the instructions to reset your password.
            </Text>
            <CustomButton
              text="Back to Sign In"
              onPress={onSignInPress}
              type="PRIMARY"
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ForgotPasswordScreen;
