// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navbar from './Navbar';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

export const Primary: ComponentStory<typeof Navbar> = () => <Navbar />;