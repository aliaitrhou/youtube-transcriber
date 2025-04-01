import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  createListCollection,
  Field,
  HStack,
  Input,
  Portal,
  Select,
  Spinner,
  Text
} from '@chakra-ui/react';
import { z } from 'zod';

type Props = {
  onSubmit: (videoUrl: string, lang: string) => void;
  isProcessing: boolean;
};

const getLanguages = () => {
  const languages: object[] = [];
  const supportedLanguages = new Intl.DisplayNames(['en'], {
    type: 'language'
  });
  const languageCodes = [
    'ar',
    'en',
    'es',
    'fr',
    'de',
    'zh',
    'it',
    'ja',
    'ko',
    'pt',
    'ru',
    'hi',
    'bn',
    'pa',
    'ja',
    'ml'
  ];

  languageCodes.forEach(code => {
    languages.push({ code, name: supportedLanguages.of(code) });
  });

  return languages;
};

const formSchema = z.object({
  ytVideoUrl: z
    .string()
    .regex(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/, {
      message: 'ViedoUrl is required!'
    }),
  language: z.string().min(1, { message: 'Language is required' })
});

const VideoForm: React.FC<Props> = ({ onSubmit, isProcessing }) => {
  const [language, setLanguage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [missingData, setMissingData] = useState({
    url: '',
    lang: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setVideoUrl(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    // Validate input using Zod
    const result = formSchema.safeParse({
      ytVideoUrl: videoUrl,
      language: language
    });

    if (!result.success) {
      setMissingData({
        url: result.error.format().ytVideoUrl?._errors?.[0] || '',
        lang: result.error.format().language?._errors?.[0] || ''
      });
      return;
    }
    onSubmit(videoUrl, language);
  };

  const langs = createListCollection({
    items: getLanguages()
  });

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root invalid={Boolean(missingData.url)} mb={2}>
        <HStack mb={-1} justifyContent={'space-between'} w="full">
          <Field.Label fontSize={['xs', 'sm']}>Video URL</Field.Label>
          <Field.ErrorText>{missingData.url}</Field.ErrorText>
        </HStack>
        <Input
          onChange={handleInputChange}
          rounded={'none'}
          borderWidth={missingData.url ? 2 : 1}
          borderColor={missingData.url ? 'red.400' : 'black'}
          name="videoUrl"
          placeholder="https://youtube.com/watch?v="
        />
      </Field.Root>
      <Field.Root w="full" invalid={Boolean(missingData.lang)}>
        <Field.ErrorText mb={-1}>{missingData.lang}</Field.ErrorText>
        <HStack flexDir={['column', 'row']} w="full">
          <Select.Root
            w={['full', '1/2']}
            collection={langs}
            value={language}
            onValueChange={(e: { value: string }) => setLanguage(e.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger
                rounded={'none'}
                fontSize={16}
                py={'3px'}
                borderWidth={missingData.lang ? 2 : 1}
                borderColor={missingData.lang ? 'red.400' : 'black'}
              >
                <Select.ValueText
                  placeholder={language === '' ? 'Select langauge' : language}
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator color={'black'} />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content
                  borderWidth={0.3}
                  borderColor="gray.400"
                  shadow={'sm'}
                >
                  {langs.items.map((lang: any) => (
                    <Select.Item item={lang.name} key={lang.code}>
                      {lang.name}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Button
            alignSelf={'end'}
            type="submit"
            w={['full', '1/2']}
            rounded="none"
            bg={'red.500'}
            _hover={{
              bg: 'red.500/90'
            }}
            disabled={isProcessing}
            borderWidth={1}
            borderColor={'black'}
            fontFamily={'sora'}
            fontSize={13}
          >
            {isProcessing ? (
              <HStack gap={1}>
                <Spinner size={'xs'} color="gray.300" />
                <Text>Processing...</Text>
              </HStack>
            ) : (
              'Start Processing'
            )}
          </Button>
        </HStack>
      </Field.Root>
    </form>
  );
};

export default VideoForm;
