/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Switch, Text } from '@/components/ui';
import { useSelectedTheme } from '@/lib';

export default function Settings() {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const switchTheme = () => setSelectedTheme(isDark ? 'light' : 'dark');

  return (
    <>
      <SafeAreaView className="mt-2 flex-1">
        <View className="flex-row items-center justify-between px-6 pb-3">
          <Text className="font-gilroy-700 text-2xl">Settings</Text>
        </View>
        <View className="mb-2 h-px bg-gray-200" />
        <View className="mt-8 flex-1 px-6">
          <View className="relative flex-1 gap-10">
            <Switch
              checked={!isDark}
              onChange={switchTheme}
              label={isDark ? 'Dark theme' : 'Light theme'}
              accessibilityLabel={'theme_switch'}
            />
            <View>
              <Text className="mb-2 font-gilroy-700 text-3xl">
                Confidentiality
              </Text>
              <Text className="text-blue underline">Privacy Policy</Text>
            </View>
            <View
              className="absolute right-0 w-full gap-4"
              style={{ bottom: 12 }}
            >
              <Text className="text-center ">Have a problem?</Text>
              <Button label={'Contact us'} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
