import React, { memo } from 'react';

import Background from '../../components/paper-ppt/Background';
import Logo from '../../components/paper-ppt/Logo';
import Header from '../../components/paper-ppt/Header';
import Button from '../../components/paper-ppt/Button';
import Paragraph from '../../components/paper-ppt/Paragraph';

import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('LoginScreenPaperPpt')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreenPaperPpt')}>
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
