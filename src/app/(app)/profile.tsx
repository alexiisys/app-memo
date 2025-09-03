import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, Image, Text } from '@/components/ui';
import { EditIcon } from '@/components/ui/icons';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { PinIcon } from '@/components/ui/icons/pin-icon';
import { useSelectedTheme } from '@/lib';
import { EYE_COLORS, getAge, HAIR_COLORS } from '@/lib/consts';
import { useProfile } from '@/lib/storage/modules/profile';

const ProfileInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-center justify-between">
    <Text className="flex-1 bg-[#FFFFFF33] p-3 text-base capitalize  text-white dark:text-white">
      {label}
    </Text>
    <Text className="flex-1 bg-white p-3 text-center font-gilroy-700 text-base capitalize text-black">
      {value}
    </Text>
  </View>
);

export default function UserProfileScreen() {
  const router = useRouter();
  const profile = useProfile.use.profile();
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const onEdit = () => {
    router.navigate('/edit-profile');
  };
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <ScrollView>
        <View className="mx-6 my-8">
          {profile?.image ? (
            <Image
              source={profile?.image}
              contentFit={'cover'}
              className="size-44 border border-orange"
            />
          ) : (
            <View className="size-44 items-center justify-center bg-light">
              <AvatarIcon width={44} height={44} color={colors.lightBlue} />
            </View>
          )}
          <View className="flex-row items-end justify-between">
            <View className="gap-2">
              <Text className="mt-6 text-3xl font-bold">
                {profile?.firstName || 'You'},{' '}
                {getAge(profile?.birth ? new Date(profile?.birth) : new Date())}
              </Text>
              <View className="flex-row items-center gap-1 self-start bg-[#40404080] px-1">
                <PinIcon color={colors.white} width={14} height={14} />
                <Text className="font-gilroy-600 text-white">
                  {profile?.country}
                  {profile?.country && profile?.city ? ',' : ''} {profile?.city}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onEdit}
              className="flex-row items-center justify-center bg-orange px-4 py-3"
            >
              <EditIcon width={24} height={24} color={colors.white} />
              <Text className="ml-2 text-lg font-bold text-white dark:text-white">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 bg-orange pb-12">
          {(profile?.interests ?? []).length > 0 && (
            <>
              <Text className="mx-4 mt-8 text-2xl font-bold text-white dark:text-white">
                Interests
              </Text>
              <View className="mx-4 mt-2 flex-row flex-wrap gap-2">
                {profile?.interests.map((interest) => (
                  <View key={interest} className="bg-white px-4 py-2">
                    <Text className="font-gilroy-600 text-base text-black">
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
          {profile?.description && (
            <>
              <Text className="mx-4 mt-8 text-2xl font-bold text-white dark:text-white">
                Description
              </Text>
              <Text className="mx-4 mt-2 text-base leading-6 text-white dark:text-white">
                {profile?.description}
              </Text>
            </>
          )}
          <View className="shadow-xs mx-4 mt-8 gap-2 rounded-2xl">
            {profile?.hairColor && (
              <ProfileInfoRow
                label="Hair color"
                value={
                  HAIR_COLORS.find((item) => item.value === profile.hairColor)
                    ?.label || ''
                }
              />
            )}
            {profile?.eyeColor && (
              <ProfileInfoRow
                label="Eye color"
                value={
                  EYE_COLORS.find((item) => item.value === profile.eyeColor)
                    ?.label || ''
                }
              />
            )}
            {profile?.weight && (
              <ProfileInfoRow label="Weight" value={profile.weight || ''} />
            )}
            {profile?.height && (
              <ProfileInfoRow label="Height" value={profile.height || ''} />
            )}
            <ProfileInfoRow
              label="Relationships"
              value={profile?.relationships ? 'Dating' : 'Free'}
            />
            {profile?.orientation && (
              <ProfileInfoRow label="Orientation" value={profile.orientation} />
            )}
            <ProfileInfoRow
              label="Smoking"
              value={profile?.smoking ? 'Yes' : 'No'}
            />
            <ProfileInfoRow
              label="Alcohol"
              value={profile?.alcohol ? 'Yes' : 'No'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
