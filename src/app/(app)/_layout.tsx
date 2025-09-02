/* eslint-disable react/no-unstable-nested-components */
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useProfile } from 'src/lib/storage/modules/profile';

import { colors, FocusAwareStatusBar, Image } from '@/components/ui';
import { SearchIcon } from '@/components/ui/icons';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { SettingsIcon } from '@/components/ui/icons/setting-icon';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const profile = useProfile.use.profile();
  return (
    <>
      <FocusAwareStatusBar />
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: isDark ? colors.grey : colors.lightGrey,
          tabBarActiveTintColor: colors.coralPink,
          tabBarStyle: {
            backgroundColor: isDark ? colors.darkBackground : colors.white,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Memories',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <SearchIcon
                width={24}
                height={24}
                color={focused ? colors.coralPink : colors.lightGrey}
              />
            ),
            tabBarButtonTestID: 'index-tab',
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: 'Account',
            tabBarIcon: ({ focused }) =>
              profile?.image ? (
                <Image
                  source={{ uri: profile?.image }}
                  className="size-6 rounded-3xl"
                />
              ) : (
                <AvatarIcon
                  width={24}
                  height={24}
                  color={focused ? colors.coralPink : colors.lightGrey}
                />
              ),
            tabBarButtonTestID: 'profile-tab',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <SettingsIcon
                color={focused ? colors.coralPink : colors.lightGrey}
              />
            ),
            tabBarButtonTestID: 'settings-tab',
          }}
        />
      </Tabs>
    </>
  );
}
