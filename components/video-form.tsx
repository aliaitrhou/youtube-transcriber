import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Field,
  HStack,
  Input,
  NativeSelect,
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
  const [missingData, setMissingData] = useState('');

  const handleSelectElementChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target as HTMLSelectElement;
    setLanguage(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const videoUrl = (e.target as HTMLFormElement | undefined)?.videoUrl
      ?.value as string;

    if (videoUrl && language) {
      onSubmit(videoUrl, language);
    } else {
      if (!videoUrl) setMissingData('Missing video URL!');
      if (!language) setMissingData('Missing Language!');
    }
  };

  const langs = getLanguages();

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label mb={-1} fontSize={['xs', 'sm']}>
          Video URL
        </Field.Label>
        <Field.ErrorText>{missingData && <>missingData</>}</Field.ErrorText>
        <Input
          rounded={'none'}
          borderWidth={1}
          borderColor={'black'}
          name="videoUrl"
          placeholder="https://youtube.com/watch?v="
        />
        <HStack w={'full'}>
          <NativeSelect.Root w={'1/2'}>
            <NativeSelect.Field
              rounded={'none'}
              borderWidth={1}
              borderColor={'black'}
              color={language ? 'black' : 'gray.500'}
              onChange={handleSelectElementChange}
            >
              <option selected disabled>
                Language
              </option>
              {langs.map((lang: any) => (
                <option key={lang.code} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Button
            type="submit"
            w={'1/2'}
            rounded="none"
            bg={'red.500'}
            _hover={{
              bg: 'red.500/90'
            }}
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
