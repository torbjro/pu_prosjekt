import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login from './Login'

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Login',
  component: Login,
} as ComponentMeta<typeof Login>;

export const Primary: ComponentStory<typeof Login> = () => <Login />;