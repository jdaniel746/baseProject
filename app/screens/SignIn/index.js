import { AuthActions } from '@actions';
import { Button, Header, Icon, SafeAreaView, Text, TextInput } from '@components';
import { BaseColor, BaseStyle, useTheme, Images } from '@config';
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const { login } = AuthActions;
const loginValidationSchema = yup.object().shape({
  user: yup.string().email('Please enter a valid email').required('Email Address is Required'),
  password: yup.string()
});

const successInit = {
  id: true,
  password: true
};

const SignIn = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [user, setUser] = useState('pedro@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onLogin = () => {
    if (user == '' || password == '') {
      setSuccess({
        ...success,
        user: false,
        password: false
      });
    } else {
      setLoading(true);
      dispatch(
        login({ user: user, password: password }, (response) => {
          if (response.success) {
            navigation.navigate('Main');
          } else {
            setLoading(false);
          }
        })
      );
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20
  });

  return (
    <Formik
      initialValues={{ user: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => {
        console.log("********" +JSON.stringify(values));
      }}>
      {({ handleSubmit, errors }) => (
        <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
          <Header
            title={t('sign_in')}
            renderLeft={() => {
              return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={offsetKeyboard}
            style={{
              flex: 1
            }}>
            <View style={styles.contain}>
              <TextInput
                style={[BaseStyle.textInput]}
                onChangeText={(text) => setUser(text)}
                name='user'
                onFocus={() => {
                  setSuccess({
                    ...success,
                    id: true
                  });
                }}
                autoCorrect={false}
                placeholder={t('input_id')}
                placeholderTextColor={success.id ? BaseColor.grayColor : colors.primary}
                value={user}
                selectionColor={errors.user ? '#ff0000' : colors.primary}
              />
              <Text style={styles.error}>{errors.user}</Text>
              <TextInput
                style={[BaseStyle.textInput, { marginTop: 10 }]}
                onChangeText={(text) => setPassword(text)}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    password: true
                  });
                }}
                autoCorrect={false}
                placeholder={t('input_password')}
                secureTextEntry={true}
                placeholderTextColor={success.password ? BaseColor.grayColor : colors.primary}
                value={password}
                selectionColor={colors.primary}
              />
              <View style={{ width: '100%', marginVertical: 16 }}>
                <Button full loading={loading} style={{ marginTop: 20 }} onPress={handleSubmit}>
                  {t('sign_in')}
                </Button>
              </View>
              <View style={styles.contentActionBottom}>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                  <Text body2 grayColor>
                    {t('forgot_your_password')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text body2 primaryColor>
                    {t('not_have_account')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignIn;
