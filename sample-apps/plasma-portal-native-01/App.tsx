import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FHIRClientContextWrapper } from './components/plasma-fhir-react-native-client-context';
import { AppFooter } from './components';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <FHIRClientContextWrapper>
          <Navigation colorScheme={colorScheme} />
        </FHIRClientContextWrapper>
        <StatusBar />
        <AppFooter />
      </SafeAreaProvider>
    );
  }
}
