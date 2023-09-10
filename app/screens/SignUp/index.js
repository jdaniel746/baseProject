import { Button, Header, Icon, SafeAreaView, TextInput } from '@components';
import { AuthActions } from '@actions';
import { BaseColor, BaseStyle, useTheme } from '@config';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
const { register } = AuthActions;
const successInit = {
  name: true,
  email: true,
  address: true
};

const SignUp = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const dispatch = useDispatch();

  const onSignUp = () => {
    if (name == '' || lastname == '' || email == '' || password == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        lastname: lastname != '' ? true : false,
        email: email != '' ? true : false,
        password: password != '' ? true : false
      });
    } else {
      setLoading(true);
      dispatch(
        register({ user: 'jdaniel.a.j@gmail.com', password: '123456' }, (response) => {
          if (response.success) {
            setLoading(false);
            navigation.navigate('SignIn');
          } else {
            setLoading(false);
          }
        })
      );
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('sign_up')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            placeholder={t('name')}
            placeholderTextColor={success.name ? BaseColor.grayColor : colors.primary}
            value={name}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setLastname(text)}
            autoCorrect={false}
            placeholder={t('lastname')}
            placeholderTextColor={success.name ? BaseColor.grayColor : colors.primary}
            value={lastname}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder={t('email')}
            keyboardType="email-address"
            placeholderTextColor={success.email ? BaseColor.grayColor : colors.primary}
            value={email}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            placeholder={t('password')}
            placeholderTextColor={success.address ? BaseColor.grayColor : colors.primary}
            value={password}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setRepassword(text)}
            autoCorrect={false}
            placeholder={t('confirm_password')}
            placeholderTextColor={success.address ? BaseColor.grayColor : colors.primary}
            value={repassword}
          />
          <View style={{ width: '100%' }}>
            <Button full style={{ marginTop: 20 }} loading={loading} onPress={() => onSignUp()}>
              {t('sign_up')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
