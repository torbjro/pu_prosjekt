// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Endre from './Endre';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Endre',
  component: Endre,
} as ComponentMeta<typeof Endre>;

export const Primary: ComponentStory<typeof Endre> = () => <Endre />;