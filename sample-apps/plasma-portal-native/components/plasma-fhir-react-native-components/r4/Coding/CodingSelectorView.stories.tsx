import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CodingSelector, { ICodingSelectorProps } from './CodingSelector';

// Sample data (from @types/fhir)...
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/fhir/test/r4-tests.ts
const r4test230: fhir4.AllergyIntolerance = {"resourceType":"AllergyIntolerance","id":"example","identifier":[{"system":"http://acme.com/ids/patients/risks","value":"49476534"}],"clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical","code":"active","display":"Active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/allergyintolerance-verification","code":"confirmed","display":"Confirmed"}]},"type":"allergy","category":["food"],"criticality":"high","code":{"coding":[{"system":"http://snomed.info/sct","code":"227493005","display":"Cashew nuts"}]},"patient":{"reference":"Patient/example"},"onsetDateTime":"2004","recordedDate":"2014-10-09T14:58:00+11:00","recorder":{"reference":"Practitioner/example"},"asserter":{"reference":"Patient/example"},"lastOccurrence":"2012-06","note":[{"text":"The criticality is high becasue of the observed anaphylactic reaction when challenged with cashew extract."}],"reaction":[{"substance":{"coding":[{"system":"http://www.nlm.nih.gov/research/umls/rxnorm","code":"1160593","display":"cashew nut allergenic extract Injectable Product"}]},"manifestation":[{"coding":[{"system":"http://snomed.info/sct","code":"39579001","display":"Anaphylactic reaction"}]}],"description":"Challenge Protocol. Severe reaction to subcutaneous cashew extract. Epinephrine administered","onset":"2012-06-12","severity":"severe","exposureRoute":{"coding":[{"system":"http://snomed.info/sct","code":"34206005","display":"Subcutaneous route"}]}},{"manifestation":[{"coding":[{"system":"http://snomed.info/sct","code":"64305001","display":"Urticaria"}]}],"onset":"2004","severity":"moderate","note":[{"text":"The patient reports that the onset of urticaria was within 15 minutes of eating cashews."}]}]};
const r4test11874: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"mother","status":"completed","patient":{"reference":"Patient/100","display":"Peter Patient"},"relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"MTH","display":"mother"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"371041009","display":"Embolic Stroke"}],"text":"Stroke"},"onsetAge":{"value":56,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"}}]};

export default {
  title: 'FHIR/CodingSelectorView',
  component: CodingSelector,
} as Meta;
const Template: Story<ICodingSelectorProps> = (args) => <CodingSelector {...args} />;

export const Example1 = Template.bind({});
Example1.args = { codes: (r4test230.code && r4test230.code.coding) ? r4test230.code.coding : undefined };

export const Example2 = Template.bind({});
Example2.args = { codes: (r4test11874.relationship && r4test11874.relationship.coding) ? r4test11874.relationship.coding : undefined };