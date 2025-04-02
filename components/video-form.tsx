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

const VideoForm: React.FC<Props> = ({ onSubmit, isProcessing }) => {
  const [language, setLanguage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setVideoUrl(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (videoUrl && language) {
      onSubmit(videoUrl, language);
    } else {
      return;
    }
  };

  const langs = createListCollection({
    items: getLanguages()
  });

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root mb={2}>
        <HStack mb={-1} justifyContent={'space-between'} w="full">
          <Field.Label fontSize={['xs', 'sm']}>Video URL</Field.Label>
        </HStack>
        <Input
          required
          onChange={handleInputChange}
          rounded={'none'}
          borderWidth={1}
          borderColor={'black'}
          name="videoUrl"
          placeholder="https://youtube.com/watch?v="
        />
      </Field.Root>
      <Field.Root w="full">
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
                borderWidth={1}
                borderColor={'black'}
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
