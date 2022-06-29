import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FHIRClientContextWrapper } from './components/plasma-fhir-react-client-context';
import { FHIRClientProvider } from './components/plasma-fhir-react-client-context/FHIRClientProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <FHIRClientProvider>
          <Navigation colorScheme={colorScheme} />
        </FHIRClientProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
