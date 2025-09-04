/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Switch, Text } from '@/components/ui';
import { useSelectedTheme } from '@/lib';
import { Env } from '@/lib/env';
import { openLinkInBrowser } from '@/lib/utils';

export default function Settings() {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const switchTheme = () => setSelectedTheme(isDark ? 'light' : 'dark');

  const handlePrivacyPolicy = () => {
    openLinkInBrowser(Env.PRIVACY_POLICY);
  };

  const handleFeedback = () => {
    openLinkInBrowser(Env.FEEDBACK_FORM);
  };

  return (
    <>
      <SafeAreaView className="mt-2 flex-1">
        <View className="px-6 pb-3">
          <Text className="font-gilroy-700 text-2xl text-center">Settings</Text>
        </View>
        <View className="mb-2 h-px bg-gray-200" />
        <View className="mt-8 flex-1 px-6">
          <View className="relative flex-1 gap-8">
            <View>
              <Text className="mb-4 font-gilroy-700 text-xl">Appearance</Text>
              <Switch
                checked={!isDark}
                onChange={switchTheme}
                label={isDark ? 'Dark theme' : 'Light theme'}
                accessibilityLabel={'theme_switch'}
              />
            </View>

            <View>
              <Text className="mb-4 font-gilroy-700 text-xl">
                Legal & Support
              </Text>
              <View className="gap-3">
                <Button
                  label="Privacy Policy"
                  variant="secondary"
                  onPress={handlePrivacyPolicy}
                />
                <Button
                  label="Send Feedback"
                  variant="secondary"
                  onPress={handleFeedback}
                />
              </View>
            </View>

            <View className="absolute inset-x-0 bottom-0 gap-4">
              <Text className="text-center text-gray-600">Have a problem?</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
