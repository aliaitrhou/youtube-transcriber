import { VideoForm } from '../components/video-form';
import Head from 'next/head';
import React, { useState } from 'react';
import { extractVideoIdFromUrl, processVideo } from '../utils/api-client';
import Footer from '../components/footer';
import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Tabs from '../components/tabs';

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
      // bN08lzkLCVo
      // https://www.youtube.com/watch?v=bN08lzkLCVo
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
    <Container h={'100dvh'} maxW={'4xl'} p={[2, 4, 6]} gap={0} bg="tomato.400">
      <Stack h={'full'} justifyContent={'center'} alignItems={'center'}>
        <Head>
          <title>Translate any video to any language within Seconds!</title>
        </Head>
        <Stack
          fontFamily={'Inconsolata'}
          marginY={0}
          marginX="auto"
          paddingX={3}
        >
          <Heading
            as="h1"
            fontFamily={'sora'}
            color="red.500"
            textAlign={'center'}
            fontSize={['1.7em', '2.2em', '3em']}
            lineHeight={'shorter'}
            mb={6}
          >
            Translate & Trascript any video to any language within Seconds!
          </Heading>
          <VideoForm
            styles={{ marginTop: 0 }}
            isProcessing={isProcessing}
            onSubmit={handleStartProcessing}
          />
          <Tabs
            activeTab={activeTab}
            onValueChange={(v: string) => setActiveTab(v)}
            progressOutput={progressOutput}
            resultOutput={resultTranscript}
          />
        </Stack>
        <Footer />
      </Stack>
    </Container>
  );
}
