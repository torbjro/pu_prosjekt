import Program from '@/components/stories/Create_program/Program';
import { pocketbase } from '@/pages/api/connects';
import app from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Create_post() {

    return (
        <Program/>
    );
}


