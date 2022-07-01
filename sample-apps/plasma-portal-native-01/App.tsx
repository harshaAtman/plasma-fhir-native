import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FHIRClientContextWrapper } from './components/plasma-fhir-react-native-client-context';
import { AppFooter } from './components';
import { PlasmaThemeContext } from './components/plasma-fhir-react-native-components/theme';

const myStyles = StyleSheet.create({
  PatientHeader_container: { },
  PatientHeader_sexAgeDOB: { },
  PatientHeader_patientId: { },
  PatientHeader_patientIdText: { fontSize: 12 },
  PatientHeader_address: { },
  PatientHeader_addressText: { paddingTop: 20, fontWeight: "bold" },

  SexAgeDOB_age: { },
  SexAgeDOB_dob: { },
  SexAgeDOB_gender: { textTransform: "capitalize" },
  SexAgeDOB_container: { },

  AllergyIntoleranceView_container: { },
  AllergyIntoleranceView_code: { },
  AllergyIntoleranceView_recordedDate: { },

  CodeableConceptView_codingElementContainer: { },
  CodeableConceptView_container: { }
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PlasmaThemeContext.Provider value={{ theme: myStyles }}>
          <FHIRClientContextWrapper>
            <Navigation colorScheme={colorScheme} />
          </FHIRClientContextWrapper>
          <StatusBar />
          <AppFooter />
        </PlasmaThemeContext.Provider>
      </SafeAreaProvider>
    );
  }
}
