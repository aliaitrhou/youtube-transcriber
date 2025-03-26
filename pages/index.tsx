import VideoForm from '../components/video-form';
import Head from 'next/head';
import React, { useState } from 'react';
import { extractVideoIdFromUrl, processVideo } from '../utils/api-client';
import Footer from '../components/footer';
import { Container, Heading, Stack } from '@chakra-ui/react';
import Tabs from '../components/tabs';

export default function Home() {
  const [isProcessing, setProcessing] = useState(false);
  const [progressOutput, setProgressOutput] = useState('');
  const [activeTab, setActiveTab] = useState('progress');
  const [resultTranscript, setResultTranscript] = useState('');

  const handleStartProcessing = async (videoUrl: string, language: string) => {
    const videoId = extractVideoIdFromUrl(videoUrl);

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
    <Container h={'100dvh'} maxW={'4xl'} p={[2, 4, 6]} gap={0} bg="tomato.400">
      <Head>
        <title></title>
      </Head>
      <Stack h={'full'} justifyContent={'center'} alignItems={'center'}>
        <Stack
          w={'full'}
          fontFamily={'Inconsolata'}
          marginY={0}
          marginX="auto"
          paddingX={3}
        >
          <Heading
            as="h1"
            maxW={'2xl'}
            mx={'auto'}
            fontFamily={'sora'}
            color="red.500"
            textAlign={'center'}
            fontSize={[24, 28, 35]}
            lineHeight={1.1}
            mb={6}
          >
            Translate & Trascript any video to any language within Seconds!
          </Heading>
          <VideoForm
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
