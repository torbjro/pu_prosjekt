import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dashboard from './Dashboard';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Dashboard',
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

export const Primary: ComponentStory<typeof Dashboard> = () => <Dashboard />;