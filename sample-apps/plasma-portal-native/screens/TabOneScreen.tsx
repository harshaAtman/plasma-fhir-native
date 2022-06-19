import { useState, useCallback } from 'react';
import { StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { Coding, Age, Period, Quantity, Ratio, Range } from "fhir/r4";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useSmartOnFhirAuth } from '../hooks';
import config from "../constants/Config";
import { AddressView, AllergyIntoleranceView, AllergyIntoleranceReactionView, AnnotationView, CodingView, CodeableConceptView, CodingSelector, ConditionView, AgeView, DateView, HumanNameView, ImmunizationView, ObservationComponentView, ObservationValueView, PatientHeader, SexAgeDOB, PeriodView, QuantityView, RangeView, RangeInput, RatioView } from '../components/fhir/r4';


const AUTH_PARAMS = config.EPIC_PATIENT_SANDBOX;
const r4test16707: fhir4.Patient = {"resourceType":"Patient","id":"xds","identifier":[{"use":"usual","type":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0203","code":"MR"}]},"system":"urn:oid:1.2.3.4.5","value":"89765a87b"}],"active":true,"name":[{"family":"Doe","given":["John"]}],"gender":"male","birthDate":"1956-05-27","address":[{"line":["100 Main St"],"city":"Metropolis","state":"Il","postalCode":"44130","country":"USA"}],"managingOrganization":{"reference":"Organization/2"}};
const r4test230: fhir4.AllergyIntolerance = {"resourceType":"AllergyIntolerance","id":"example","identifier":[{"system":"http://acme.com/ids/patients/risks","value":"49476534"}],"clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical","code":"active","display":"Active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/allergyintolerance-verification","code":"confirmed","display":"Confirmed"}]},"type":"allergy","category":["food"],"criticality":"high","code":{"coding":[{"system":"http://snomed.info/sct","code":"227493005","display":"Cashew nuts"}]},"patient":{"reference":"Patient/example"},"onsetDateTime":"2004","recordedDate":"2014-10-09T14:58:00+11:00","recorder":{"reference":"Practitioner/example"},"asserter":{"reference":"Patient/example"},"lastOccurrence":"2012-06","note":[{"text":"The criticality is high becasue of the observed anaphylactic reaction when challenged with cashew extract."}],"reaction":[{"substance":{"coding":[{"system":"http://www.nlm.nih.gov/research/umls/rxnorm","code":"1160593","display":"cashew nut allergenic extract Injectable Product"}]},"manifestation":[{"coding":[{"system":"http://snomed.info/sct","code":"39579001","display":"Anaphylactic reaction"}]}],"description":"Challenge Protocol. Severe reaction to subcutaneous cashew extract. Epinephrine administered","onset":"2012-06-12","severity":"severe","exposureRoute":{"coding":[{"system":"http://snomed.info/sct","code":"34206005","display":"Subcutaneous route"}]}},{"manifestation":[{"coding":[{"system":"http://snomed.info/sct","code":"64305001","display":"Urticaria"}]}],"onset":"2004","severity":"moderate","note":[{"text":"The patient reports that the onset of urticaria was within 15 minutes of eating cashews."}]}]};
const r4test11874: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"mother","status":"completed","patient":{"reference":"Patient/100","display":"Peter Patient"},"relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"MTH","display":"mother"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"371041009","display":"Embolic Stroke"}],"text":"Stroke"},"onsetAge":{"value":56,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"}}]};
const r4test15228: fhir4.Observation = {"resourceType":"Observation","id":"10minute-apgar-score","contained":[{"resourceType":"Patient","id":"newborn","identifier":[{"system":"http://acmehealthcare/org/mrns","value":"12345"}],"active":true,"name":[{"family":"Chalmers","given":["Peter","James"]}],"gender":"male","birthDate":"2016-05-18","_birthDate":{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/patient-birthTime","valueDateTime":"2016-05-18T10:28:45Z"}]}}],"status":"final","category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/observation-category","code":"survey","display":"Survey"}],"text":"Survey"}],"code":{"coding":[{"system":"http://loinc.org","code":"9271-8","display":"10 minute Apgar Score"},{"system":"http://snomed.info/sct","code":"169922007","display":"Apgar at 10 minutes"}],"text":"10 minute Apgar Score"},"subject":{"reference":"#newborn"},"effectiveDateTime":"2016-05-18T22:33:22Z","performer":[{"reference":"Practitioner/example"}],"valueQuantity":{"value":10,"system":"http://unitsofmeasure.org","code":"{score}"},"component":[{"code":{"coding":[{"system":"http://loinc.org","code":"32401-2","display":"10 minute Apgar Color"},{"system":"http://snomed.info/sct","code":"249227004","display":"Apgar color score"}],"text":"Apgar color score"},"valueCodeableConcept":{"coding":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/ordinalValue","valueDecimal":2}],"system":"http://loinc.org","code":"LA6724-4","display":"Good color all over"},{"system":"http://acme.ped/apgarcolor","code":"2"}],"text":"2. Good color all over"}},{"code":{"coding":[{"system":"http://loinc.org","code":"32402-0","display":"10 minute Apgar Heart Rate"},{"system":"http://snomed.info/sct","code":"249223000","display":"Apgar heart rate score"}],"text":"Apgar respiratory effort score"},"valueCodeableConcept":{"coding":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/ordinalValue","valueDecimal":2}],"system":"http://loinc.org","code":"LA6718-6","display":"At least 100 beats per minute"},{"system":"http://acme.ped/apgarheartrate","code":"2"}],"text":"2. At least 100 beats per minute"}},{"code":{"coding":[{"system":"http://loinc.org","code":"32404-6","display":"10 minute Apgar Reflex Irritability"},{"system":"http://snomed.info/sct","code":"249226008","display":"Apgar response to stimulus score"}],"text":"Apgar response to stimulus score"},"valueCodeableConcept":{"coding":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/ordinalValue","valueDecimal":2}],"system":"http://loinc.org","code":"LA6721-0","display":"Grimace and pulling away, cough, or sneeze during suctioning"},{"system":"http://acme.ped/apgarreflexirritability","code":"2"}],"text":"2. Grimace and pulling away, cough, or sneeze during suctioning"}},{"code":{"coding":[{"system":"http://loinc.org","code":"32403-8","display":"10 minute Apgar Muscle Tone"},{"system":"http://snomed.info/sct","code":"249225007","display":"Apgar muscle tone score"}],"text":"Apgar muscle tone score"},"valueCodeableConcept":{"coding":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/ordinalValue","valueDecimal":2}],"system":"http://loinc.org","code":"LA6715-2","display":"Active motion "},{"system":"http://acme.ped/apgarmuscletone","code":"2"}],"text":"2. Active motion"}},{"code":{"coding":[{"system":"http://loinc.org","code":"32405-3","display":"10 minute Apgar Respiratory effort"},{"system":"http://snomed.info/sct","code":"249224006","display":"Apgar respiratory effort score"}],"text":"Apgar respiratory effort score"},"valueCodeableConcept":{"coding":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/ordinalValue","valueDecimal":2}],"system":"http://loinc.org","code":"LA6727-7","display":"Good, strong cry; normal rate and effort of breathing    "},{"system":"http://acme.ped/apgarrespiratoryeffort","code":"2"}],"text":"2. Good, strong cry; normal rate and effort of breathing"}}]};
const r4test12471: fhir4.Immunization = {"resourceType":"Immunization","id":"historical","identifier":[{"system":"urn:ietf:rfc:3986","value":"urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"}],"status":"completed","vaccineCode":{"coding":[{"system":"urn:oid:1.2.36.1.2001.1005.17","code":"GNFLU"}],"text":"Influenza"},"patient":{"reference":"Patient/example"},"occurrenceString":"January 2012","primarySource":false,"reportOrigin":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-origin","code":"record"}],"text":"Written Record"},"location":{"reference":"Location/1"},"note":[{"text":"Notes on adminstration of a historical vaccine"}]};
const r4test6135: fhir4.Condition = {"resourceType":"Condition","id":"f001","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"439401001","display":"diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"6736007","display":"Moderate"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"368009","display":"Heart valve disorder"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"40768004","display":"Left thorax"}],"text":"heart structure"}],"subject":{"reference":"Patient/f001","display":"P. van de Heuvel"},"encounter":{"reference":"Encounter/f001"},"onsetDateTime":"2011-08-05","recordedDate":"2011-10-05","asserter":{"reference":"Patient/f001","display":"P. van de Heuvel"},"evidence":[{"code":[{"coding":[{"system":"http://snomed.info/sct","code":"426396005","display":"Cardiac chest pain"}]}]}]};

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<Period>({ start: "Today", end: "Tomorrow"});
  const [quantity, setQuantity] = useState<Quantity>({ value: 5, unit: 'kg' });
  const [range, setRange] = useState<Range>({ low: { value: 3 }, high: { value: 5 } });
  const [ratio, setRatio] = useState<Ratio>({ numerator: { value: 1 }, denominator: { value: 2 } });
  const codes: Coding[] = [
    { system: "http://snomed.info/sct", code: "368009", display: "Heart valve disorder" },
    { system: "http://snomed.info/sct", code: "40768004", display: "Left thorax" },
  ];
  //const smartAuth = useSmartOnFhirAuth();

  const onLaunchClick = useCallback(() => {
    navigation.navigate("LaunchScreen", { authParams: AUTH_PARAMS });
  }, []);

  const onTestClick = useCallback(() => {
    navigation.navigate("TestScreen", { fhirClient: null });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button onPress={onLaunchClick} title="Launch" />

      <Button onPress={onTestClick} title="Test" />

      <View style={{paddingTop: 20}} />
      {isLoading && <ActivityIndicator size="large" />}


      {/* Components */}
      <Text style={{fontWeight: "bold" }}>components</Text>
      <Hr />

      <AddressView address={(r4test16707.address) ? r4test16707.address[0] : undefined} />
      <Hr />

      <AllergyIntoleranceView allergyIntolerance={r4test230} />
      <Hr />
      <AllergyIntoleranceReactionView reaction={r4test230.reaction ? r4test230.reaction[0] : undefined} />
      <Hr />

      <CodingView coding={(r4test230.code && r4test230.code.coding) ? r4test230.code.coding[0] : undefined} />
      <Hr />

      <CodingSelector codes={codes} onChange={() => { }} />
      <Hr />

      {/* TODO: Test inline and other modes, also styles */}
      <CodeableConceptView codeableConcept={r4test230.code} />
      <CodeableConceptView codeableConcept={r4test11874.relationship} />
      <Hr />

      <ConditionView condition={r4test6135} />
      <Hr />

      <AgeView dob={"1988-10-21"} />
      <DateView date={"1988-10-21"} />
      <Hr />

      <HumanNameView humanName={(r4test16707.name) ? r4test16707.name[0] : undefined} />
      <Hr />

      <ImmunizationView immunization={r4test12471} />
      <Hr />

      <ObservationComponentView observation={r4test15228} />
      <Hr />

      <PatientHeader patient={r4test16707} />
      <Hr />

      <SexAgeDOB patient={r4test16707} />
      <Hr />

      <PeriodView period={period} />
      <Hr />

      <QuantityView quantity={quantity} />
      <Hr />

      <RangeView range={range} />
      <RangeInput value={range} onChange={(text, val) => {
        if (val) { setRange(val) }
      }} placeholder="Enter your range..." />
      <Hr />

      <RatioView ratio={ratio} />
      <Hr />

    </ScrollView>
  );
}

function Hr() {
  return <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignSelf: "stretch",
      paddingVertical: 10,
      marginBottom: 10
    }}
  />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white"
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
