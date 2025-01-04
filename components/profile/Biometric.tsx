import { View, Text, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Fingerprint, ScanFace } from 'lucide-react-native';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useAuthStore } from '~/store/auth-store';

import * as LocalAuthentication from 'expo-local-authentication';

const Biometric = () => {
  const platform = Platform.OS;
  const { enable, setEnable } = useAuthStore();

  return (
    <View>
      <View className=" mb-5 flex-row items-center gap-3">
        {platform === 'ios' ? (
          <ScanFace color="white" size={24} />
        ) : (
          <Fingerprint color="white" size={24} />
        )}

        <View className="flex-row items-center justify-between gap-3">
          <Label
            nativeID="airplane-mode"
            className="text-lg font-semibold text-white"
            onPress={() => {
              setEnable(!enable);
            }}>
            Enable {platform === 'ios' ? 'Face ID' : 'Fingerprint'}
          </Label>
          <Switch nativeID="airplane-mode" checked={enable} onCheckedChange={setEnable} />
        </View>
      </View>
    </View>
  );
};

export default Biometric;
