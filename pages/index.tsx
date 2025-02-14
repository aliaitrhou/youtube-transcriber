import { TabsContent } from '@radix-ui/react-tabs';
import Head from 'next/head';
import { Box } from '../components/box';
import { Output } from '../components/output';
import { TabsRoot, TabsList, TabsTrigger } from '../components/tabs';
import { VideoForm } from '../components/video-form';
import { styled } from '../stitches.config';
import React, { useState } from 'react';
import { extractVideoIdFromUrl, processVideo } from '../utils/api-client';
import Footer from '../components/footer';

const Text = styled('p', {
  fontFamily: '$inco',
  color: '$hiContrast',
  textAlign: 'center',
  // '@initial': {
  //   fontSize: '0.3em'
  // },
  '@bp1': {
    fontSize: '1.7em'
  },

  '@bp2': {
    fontSize: '2.2em'
  },
  '@bp3': {
    fontSize: '2.7em'
  }
});

const Container = styled('div', {
  display: 'flex',
  fontFamily: 'Inconsolata',
  flexDirection: 'column',
  height: '100dvh',
  marginY: 0,
  marginX: 'auto',
  paddingX: '$3',
  paddingY: 0,
  variants: {
    size: {
      1: {
        maxWidth: '300px'
      },
      2: {
        maxWidth: '585px'
      },
      3: {
        maxWidth: '865px'
      }
    }
  }
});

export default function Home() {
  const [isProcessing, setProcessing] = useState(false);
  const [progressOutput, setProgressOutput] = useState('');
  const [activeTab, setActiveTab] = useState('progress');
  const [resultTranscript, setResultTranscript] = useState('');

  const handleStartProcessing = async (videoUrl: string) => {
    const videoId = extractVideoIdFromUrl(videoUrl);
    console.log('videoId:', videoId);
    if (typeof videoId === 'string') {
      setResultTranscript('');
      setProcessing(true);
      const transcriptInArabic = await processVideo(videoId, message => {
        setProgressOutput(prev => prev + message);
      });
      if (transcriptInArabic) {
        setResultTranscript(transcriptInArabic);
      }
      setProcessing(false);
      setActiveTab('result');
    } else {
      alert('Invalid URL');
    }
  };

  return (
    <Box css={{ paddingY: '$6' }}>
      <Head>
        <title>Youtube Transcription &amp; Arabic Translation </title>
      </Head>
      <Container size={{ '@initial': '1', '@bp1': '2' }}>
        <Text as="h1">Youtube Transcribe &amp; Arabic Translation AI tool</Text>
        <VideoForm
          styles={{ marginTop: 0 }}
          isProcessing={isProcessing}
          onSubmit={handleStartProcessing}
        />
        <TabsRoot value={activeTab} onValueChange={setActiveTab}>
          <TabsList aria-label="Output">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="progress">
            <Output>{progressOutput}</Output>
          </TabsContent>
          <TabsContent value="result">
            <Output>{resultTranscript}</Output>
          </TabsContent>
        </TabsRoot>
        <Footer />
      </Container>
    </Box>
  );
}
