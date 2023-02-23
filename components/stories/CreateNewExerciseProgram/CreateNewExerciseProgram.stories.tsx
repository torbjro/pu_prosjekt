import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './CreateNewExerciseProgram';

export default {
  title: 'NewProgramButton',
  component: Button,
};

export const PurpleButton = () => (
  <Button onClick={action('clicked')}>Create new exercise program</Button>
);