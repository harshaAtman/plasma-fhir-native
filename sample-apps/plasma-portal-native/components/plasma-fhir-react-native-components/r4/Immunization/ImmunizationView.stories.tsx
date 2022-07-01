import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ImmunizationView, { IImmunizationViewProps } from './ImmunizationView';

// Sample data (from @types/fhir)...
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/fhir/test/r4-tests.ts

// immunization-example-historical.json
const r4test12471: fhir4.Immunization = {"resourceType":"Immunization","id":"historical","identifier":[{"system":"urn:ietf:rfc:3986","value":"urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"}],"status":"completed","vaccineCode":{"coding":[{"system":"urn:oid:1.2.36.1.2001.1005.17","code":"GNFLU"}],"text":"Influenza"},"patient":{"reference":"Patient/example"},"occurrenceString":"January 2012","primarySource":false,"reportOrigin":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-origin","code":"record"}],"text":"Written Record"},"location":{"reference":"Location/1"},"note":[{"text":"Notes on adminstration of a historical vaccine"}]};

// immunization-example-protocol.json
const r4test12478: fhir4.Immunization = {"resourceType":"Immunization","id":"protocol","identifier":[{"system":"urn:ietf:rfc:3986","value":"urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"}],"status":"completed","vaccineCode":{"coding":[{"system":"http://hl7.org/fhir/sid/cvx","code":"104"}],"text":"Twinrix (HepA/HepB)"},"patient":{"reference":"Patient/example"},"encounter":{"reference":"Encounter/example"},"occurrenceDateTime":"2018-06-18","primarySource":true,"location":{"reference":"Location/1"},"manufacturer":{"reference":"Organization/hl7"},"lotNumber":"PT123F","expirationDate":"2018-12-15","site":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-ActSite","code":"LA","display":"left arm"}]},"route":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration","code":"IM","display":"Injection, intramuscular"}]},"doseQuantity":{"value":5,"system":"http://unitsofmeasure.org","code":"mg"},"performer":[{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"OP"}]},"actor":{"reference":"Practitioner/example"}},{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"AP"}]},"actor":{"reference":"Practitioner/example"}}],"isSubpotent":false,"programEligibility":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-program-eligibility","code":"ineligible"}]}],"fundingSource":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-funding-source","code":"private"}]},"protocolApplied":[{"series":"2-dose","targetDisease":[{"coding":[{"system":"http://snomed.info/sct","code":"40468003"}]}],"doseNumberPositiveInt":1},{"series":"3-dose","targetDisease":[{"coding":[{"system":"http://snomed.info/sct","code":"66071002"}]}],"doseNumberPositiveInt":2}]};

// immunization-example-refused.json
const r4test12485: fhir4.Immunization = {"resourceType":"Immunization","id":"notGiven","status":"not-done","statusReason":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-ActReason","code":"MEDPREC","display":"medical precaution"}]},"vaccineCode":{"coding":[{"system":"http://hl7.org/fhir/sid/cvx","code":"01","display":"DTP"}]},"patient":{"reference":"Patient/example"},"occurrenceDateTime":"2013-01-10","primarySource":true};

// immunization-example-subpotent.json
const r4test12492: fhir4.Immunization = {"resourceType":"Immunization","id":"subpotent","identifier":[{"system":"urn:ietf:rfc:3986","value":"urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"}],"status":"completed","vaccineCode":{"coding":[{"system":"urn:oid:1.2.36.1.2001.1005.17","code":"GNHEP"}],"text":"Hepatitis B"},"patient":{"reference":"Patient/example"},"encounter":{"reference":"Encounter/example"},"occurrenceDateTime":"2015-01-15","primarySource":true,"location":{"reference":"Location/1"},"manufacturer":{"reference":"Organization/hl7"},"lotNumber":"AAJN11K","expirationDate":"2015-02-28","site":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-ActSite","code":"LT","display":"left thigh"}]},"route":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration","code":"IM","display":"Injection, intramuscular"}]},"doseQuantity":{"value":0.5,"system":"http://unitsofmeasure.org","code":"ml"},"performer":[{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"OP"}]},"actor":{"reference":"Practitioner/example"}},{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"AP"}]},"actor":{"reference":"Practitioner/example"}}],"note":[{"text":"Notes on adminstration of vaccine"}],"isSubpotent":false,"subpotentReason":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason","code":"partial"}]}],"education":[{"documentType":"253088698300010311120702","publicationDate":"2012-07-02","presentationDate":"2013-01-10"}],"programEligibility":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-program-eligibility","code":"ineligible"}]}],"fundingSource":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-funding-source","code":"private"}]}};

// immunization-example.json
const r4test12499: fhir4.Immunization = {"resourceType":"Immunization","id":"example","identifier":[{"system":"urn:ietf:rfc:3986","value":"urn:oid:1.3.6.1.4.1.21367.2005.3.7.1234"}],"status":"completed","vaccineCode":{"coding":[{"system":"urn:oid:1.2.36.1.2001.1005.17","code":"FLUVAX"}],"text":"Fluvax (Influenza)"},"patient":{"reference":"Patient/example"},"encounter":{"reference":"Encounter/example"},"occurrenceDateTime":"2013-01-10","primarySource":true,"location":{"reference":"Location/1"},"manufacturer":{"reference":"Organization/hl7"},"lotNumber":"AAJN11K","expirationDate":"2015-02-15","site":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-ActSite","code":"LA","display":"left arm"}]},"route":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration","code":"IM","display":"Injection, intramuscular"}]},"doseQuantity":{"value":5,"system":"http://unitsofmeasure.org","code":"mg"},"performer":[{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"OP"}]},"actor":{"reference":"Practitioner/example"}},{"function":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0443","code":"AP"}]},"actor":{"reference":"Practitioner/example"}}],"note":[{"text":"Notes on adminstration of vaccine"}],"reasonCode":[{"coding":[{"system":"http://snomed.info/sct","code":"429060002"}]}],"isSubpotent":true,"education":[{"documentType":"253088698300010311120702","publicationDate":"2012-07-02","presentationDate":"2013-01-10"}],"programEligibility":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-program-eligibility","code":"ineligible"}]}],"fundingSource":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/immunization-funding-source","code":"private"}]}};


export default {
  title: 'FHIR/ImmunizationView',
  component: ImmunizationView,
} as Meta;
const Template: Story<IImmunizationViewProps> = (args) => <ImmunizationView {...args} />;

export const Example1 = Template.bind({});
Example1.args = { immunization: r4test12471 };

export const Example2 = Template.bind({});
Example2.args = { immunization: r4test12478 };

export const Example3 = Template.bind({});
Example3.args = { immunization: r4test12485 };

export const Example4 = Template.bind({});
Example4.args = { immunization: r4test12492 };

export const Example5 = Template.bind({});
Example5.args = { immunization: r4test12499 };