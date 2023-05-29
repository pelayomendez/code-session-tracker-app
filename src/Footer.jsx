import React from 'react';
import {  Typography } from 'antd';

const { Text } = Typography;

const Footer = () => (
    <Text>
      Created by{' '}
      <a href="https://github.com/pelayomendez" target="_blank" rel="noopener noreferrer">
        Pelayo Méndez
      </a>{' '}
      and OpenAI's ChatGPT
    </Text>
  );

export default Footer;