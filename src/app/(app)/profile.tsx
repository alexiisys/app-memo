import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { colors, Image, SafeAreaView, Text } from '@/components/ui';
import { EditIcon } from '@/components/ui/icons';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { useSelectedTheme } from '@/lib';
import { EYE_COLORS, getAge, HAIR_COLORS } from '@/lib/consts';
import { useProfile } from '@/lib/storages/profile';

const ProfileInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
    <Text className="text-base text-gray-400">{label}</Text>
    <Text className="font-gilroy-700 text-base text-black">{value}</Text>
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
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="my-8 items-center">
          {profile?.image ? (
            <Image
              source={profile?.image}
              contentFit={'cover'}
              className="size-36 rounded-full"
            />
          ) : (
            <View className="size-36 items-center justify-center rounded-full bg-light">
              <AvatarIcon width={44} height={44} color={colors.lightBlue} />
            </View>
          )}

          <Text className="mt-6 text-3xl font-bold">
            {profile?.firstName || 'You'},{' '}
            {getAge(profile?.birth ? new Date(profile?.birth) : new Date())}
          </Text>
        </View>
        <View className="shadow-xs mx-4 divide-y divide-gray-100 rounded-2xl ">
          {profile?.city && (
            <ProfileInfoRow label="I Live" value={profile.city} />
          )}
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
          {profile?.relationships && (
            <ProfileInfoRow
              label="Relationships"
              value={profile.relationships ? 'Dating' : 'Free'}
            />
          )}
          {profile?.orientation && (
            <ProfileInfoRow label="Orientation" value={profile.orientation} />
          )}
          {profile?.smoking && (
            <ProfileInfoRow
              label="Smoking"
              value={profile.smoking ? 'Yes' : 'No'}
            />
          )}
          {profile?.alcohol && (
            <ProfileInfoRow
              label="Alcohol"
              value={profile.alcohol ? 'Yes' : 'No'}
            />
          )}
        </View>
        {(profile?.interests ?? []).length > 0 && (
          <>
            <Text className="mx-4 mt-8 text-2xl font-bold">Interests</Text>
            <View className="mx-4 mt-2 flex-row flex-wrap gap-2">
              {profile?.interests.map((interest) => (
                <View key={interest} className="rounded-full bg-blue px-4 py-2">
                  <Text className="font-gilroy-600 text-base text-white">
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
        {profile?.description && (
          <>
            <Text className="mx-4 mt-8 text-2xl font-bold">Description</Text>
            <Text className="mx-4 mt-2 text-base leading-6 text-black">
              {profile?.description}
            </Text>
          </>
        )}
        <TouchableOpacity
          onPress={onEdit}
          className="mx-4 mb-4 mt-8 flex-row items-center justify-center rounded-2xl border border-gray-200 py-4"
        >
          <EditIcon
            width={24}
            height={24}
            color={isDark ? colors.white : colors.black}
          />
          <Text className="ml-2 text-lg font-bold">Edit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
