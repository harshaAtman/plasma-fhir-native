import { useState, useCallback } from 'react';
import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useSmartOnFhirAuth } from '../hooks';

import config from "../constants/Config";
const AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isLoading, setIsLoading] = useState(false);
  //const smartAuth = useSmartOnFhirAuth();

  const onLaunchClick = useCallback(() => {
    navigation.navigate("LaunchScreen", { authParams: AUTH_PARAMS });
  }, []);

  const onTestClick = useCallback(() => {
    navigation.navigate("TestScreen", { fhirClient: null });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button onPress={onLaunchClick} title="Launch" />

      <Button onPress={onTestClick} title="Test" />

      <View style={{paddingTop: 20}} />
      {isLoading && <ActivityIndicator size="large" />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
