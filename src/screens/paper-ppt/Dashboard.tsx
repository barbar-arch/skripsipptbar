import React, { memo } from 'react';

import Background from '../../components/paper-ppt/Background';
import Logo from '../../components/paper-ppt/Logo';
import Header from '../../components/paper-ppt/Header';
import Paragraph from '../../components/paper-ppt/Paragraph';
import Button from '../../components/paper-ppt/Button';

import { Navigation } from '../../types';

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('HomeScreenPaperPpt')}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
