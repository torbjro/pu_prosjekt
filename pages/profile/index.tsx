import { pocketbase } from '../api/connects';
import { Fragment } from 'react'
import { Router, useRouter } from 'next/router';


const userNavigation = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Uploaded exercises', href: '#', current: false },
    { name: 'Liked exercises', href: '#', current: true },
    { name: 'My progress', href: '#', current: false },
    { name: 'Weekly plan', href: '#', current: false },
  ]

const Navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Groups', href: '#', current: false },
  ]

const router = useRouter()
const RootStack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  Profile: { sort: 'uploaded exercises' | 'liked exercises' | 'my progress' };
  Friends: undefined;
  Weeklyplan: undefined;
};

