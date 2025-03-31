import VideoForm from '../components/video-form';
import Head from 'next/head';
import React, { useState } from 'react';
import { extractVideoIdFromUrl, processVideo } from '../utils/api-client';
import Footer from '../components/footer';
import { Box, Container, Heading, Stack } from '@chakra-ui/react';
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
      const transcript = await processVideo(videoId, language, message => {
        setProgressOutput(prev => prev + message);
      });
      if (transcript) {
        setResultTranscript(transcript);
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
        <title>Trascript & Translate Videos</title>
      </Head>
      <Stack h={'full'} justifyContent={'center'} alignItems={'center'} gap={0}>
        <Stack
          w={'full'}
          fontFamily={'Inconsolata'}
          marginY={0}
          marginX="auto"
          paddingX={3}
        >
          <Box
            borderLeftWidth={8}
            borderLeftColor={'tomato'}
            py={2}
            px={4}
            mb={[2, 3, 5]}
          >
            <Heading
              as="h1"
              fontFamily={'sora'}
              color={'tomato'}
              textAlign={'start'}
              fontSize={[16, 20, 25]}
              lineHeight={1.1}
            >
              Trascript & Translate any Youtube video to any language within
              seconds!
            </Heading>
          </Box>
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
