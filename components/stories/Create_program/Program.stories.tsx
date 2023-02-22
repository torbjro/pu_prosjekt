import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Program from './Program';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Program',
  component: Program,
} as ComponentMeta<typeof Program>;

export const Primary: ComponentStory<typeof Program> = () => <Program />;