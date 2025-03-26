import React, { ChangeEvent, useState } from 'react';
import { Button, Field, HStack, Input, NativeSelect } from '@chakra-ui/react';
import { I18NProvider } from 'next/dist/server/lib/i18n-provider';

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
      if (!videoUrl) alert('You must provide a video URL!');
      if (!language) alert('You must select Language!');
    }
  };

  const langs = getLanguages();

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label mb={-1}>Video URL</Field.Label>
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
              onChange={handleSelectElementChange}
            >
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
            Start Processing
          </Button>
        </HStack>
      </Field.Root>
    </form>
  );
};

export default VideoForm;
