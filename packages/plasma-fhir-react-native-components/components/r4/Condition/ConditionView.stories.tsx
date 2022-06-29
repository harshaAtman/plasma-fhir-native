import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ConditionView, { IConditionViewProps } from './ConditionView';

// Sample data (from @types/fhir)...
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/fhir/test/r4-tests.ts

// condition-example-f001-heart.json
const r4test6135: fhir4.Condition = {"resourceType":"Condition","id":"f001","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"439401001","display":"diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"6736007","display":"Moderate"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"368009","display":"Heart valve disorder"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"40768004","display":"Left thorax"}],"text":"heart structure"}],"subject":{"reference":"Patient/f001","display":"P. van de Heuvel"},"encounter":{"reference":"Encounter/f001"},"onsetDateTime":"2011-08-05","recordedDate":"2011-10-05","asserter":{"reference":"Patient/f001","display":"P. van de Heuvel"},"evidence":[{"code":[{"coding":[{"system":"http://snomed.info/sct","code":"426396005","display":"Cardiac chest pain"}]}]}]};

// condition-example-f002-lung.json
const r4test6142: fhir4.Condition = {"resourceType":"Condition","id":"f002","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"439401001","display":"diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"24484000","display":"Severe"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"254637007","display":"NSCLC - Non-small cell lung cancer"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"51185008","display":"Thorax"}]}],"subject":{"reference":"Patient/f001","display":"P. van de Heuvel"},"encounter":{"reference":"Encounter/f002"},"onsetDateTime":"2011-05-05","recordedDate":"2012-06-03","asserter":{"reference":"Patient/f001","display":"P. van de Heuvel"},"stage":[{"summary":{"coding":[{"system":"http://snomed.info/sct","code":"258219007","display":"stage II"}]},"type":{"coding":[{"system":"http://snomed.info/sct","code":"260998006","display":"Clinical staging (qualifier value)"}]}}],"evidence":[{"code":[{"coding":[{"system":"http://snomed.info/sct","code":"169069000","display":"CT of thorax"}]}]}]};

// condition-example-f003-abscess.json
const r4test6149: fhir4.Condition = {"resourceType":"Condition","id":"f003","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"439401001","display":"diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"371923003","display":"Mild to moderate"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"18099001","display":"Retropharyngeal abscess"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"280193007","display":"Entire retropharyngeal area"}]}],"subject":{"reference":"Patient/f001","display":"P. van de Heuvel"},"encounter":{"reference":"Encounter/f003"},"onsetDateTime":"2012-02-27","recordedDate":"2012-02-20","asserter":{"reference":"Patient/f001","display":"P. van de Heuvel"},"evidence":[{"code":[{"coding":[{"system":"http://snomed.info/sct","code":"169068008","display":"CT of neck"}]}]}]};

// condition-example-f201-fever.json
const r4test6156: fhir4.Condition = {"resourceType":"Condition","id":"f201","identifier":[{"value":"12345"}],"clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"resolved"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"55607006","display":"Problem"},{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"problem-list-item"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"255604002","display":"Mild"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"386661006","display":"Fever"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"38266002","display":"Entire body as a whole"}]}],"subject":{"reference":"Patient/f201","display":"Roel"},"encounter":{"reference":"Encounter/f201"},"onsetDateTime":"2013-04-02","abatementString":"around April 9, 2013","recordedDate":"2013-04-04","recorder":{"reference":"Practitioner/f201"},"asserter":{"reference":"Practitioner/f201"},"evidence":[{"code":[{"coding":[{"system":"http://snomed.info/sct","code":"258710007","display":"degrees C"}]}],"detail":[{"reference":"Observation/f202","display":"Temperature"}]}]};

// condition-example-f202-malignancy.json
const r4test6163: fhir4.Condition = {"resourceType":"Condition","id":"f202","meta":{"security":[{"system":"http://terminology.hl7.org/CodeSystem/v3-ActCode","code":"TBOO","display":"taboo"}]},"clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"resolved"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"encounter-diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"24484000","display":"Severe"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"363346000","display":"Malignant neoplastic disease"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"361355005","display":"Entire head and neck"}]}],"subject":{"reference":"Patient/f201","display":"Roel"},"onsetAge":{"value":52,"unit":"years","system":"http://unitsofmeasure.org","code":"a"},"abatementAge":{"value":54,"unit":"years","system":"http://unitsofmeasure.org","code":"a"},"recordedDate":"2012-12-01","evidence":[{"detail":[{"reference":"DiagnosticReport/f201","display":"Erasmus' diagnostic report of Roel's tumor"}]}]};

// condition-example-f203-sepsis.json
const r4test6170: fhir4.Condition = {"resourceType":"Condition","id":"f203","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"55607006","display":"Problem"},{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"problem-list-item"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"371924009","display":"Moderate to severe"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"10001005","display":"Bacterial sepsis"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"281158006","display":"Pulmonary vascular structure"}]}],"subject":{"reference":"Patient/f201","display":"Roel"},"encounter":{"reference":"Encounter/f203","display":"Roel's encounter on March elevanth"},"onsetDateTime":"2013-03-08","recordedDate":"2013-03-11","asserter":{"reference":"Practitioner/f201"},"evidence":[{"detail":[{"reference":"DiagnosticReport/f202","display":"Diagnostic report for Roel's sepsis"}]}]};

// condition-example-f204-renal.json
const r4test6177: fhir4.Condition = {"resourceType":"Condition","id":"f204","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"inactive"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"differential"}]},"category":[{"coding":[{"system":"http://snomed.info/sct","code":"55607006","display":"Problem"},{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"problem-list-item"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"24484000","display":"Severe"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"36225005","display":"Acute renal insufficiency specified as due to procedure"}]},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"181414000","display":"Kidney"}]}],"subject":{"reference":"Patient/f201","display":"Roel"},"encounter":{"reference":"Encounter/f203","display":"Roel's encounter on March elevanth"},"onsetDateTime":"2013-03-11","abatementDateTime":"2013-03-20","recordedDate":"2013-03-11","asserter":{"reference":"Practitioner/f201"},"stage":[{"summary":{"coding":[{"system":"http://snomed.info/sct","code":"14803004","display":"Temporary"}]},"assessment":[{"display":"Genetic analysis master panel"}]}],"note":[{"text":"The patient is anuric."}]};

// condition-example-f205-infection.json
const r4test6184: fhir4.Condition = {"resourceType":"Condition","id":"f205","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"differential"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"87628006","display":"Bacterial infectious disease"}]},"subject":{"reference":"Patient/f201","display":"Roel"},"recordedDate":"2013-04-04","asserter":{"reference":"Practitioner/f201"}};

// condition-example-family-history.json
const r4test6191: fhir4.Condition = {"resourceType":"Condition","id":"family-history","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"problem-list-item","display":"Problem List Item"}]}],"code":{"coding":[{"system":"http://snomed.info/sct","code":"312824007","display":"Family history of cancer of colon"}]},"subject":{"reference":"Patient/example"}};

// condition-example-stroke.json
const r4test6198: fhir4.Condition = {"resourceType":"Condition","id":"stroke","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"encounter-diagnosis","display":"Encounter Diagnosis"}]}],"code":{"coding":[{"system":"http://snomed.info/sct","code":"422504002","display":"Ischemic stroke (disorder)"}],"text":"Stroke"},"subject":{"reference":"Patient/example"},"onsetDateTime":"2010-07-18"};

// condition-example.json
const r4test6205: fhir4.Condition = {"resourceType":"Condition","id":"example","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"encounter-diagnosis","display":"Encounter Diagnosis"},{"system":"http://snomed.info/sct","code":"439401001","display":"Diagnosis"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"24484000","display":"Severe"}]},"code":{"coding":[{"system":"http://snomed.info/sct","code":"39065001","display":"Burn of ear"}],"text":"Burnt Ear"},"bodySite":[{"coding":[{"system":"http://snomed.info/sct","code":"49521004","display":"Left external ear structure"}],"text":"Left Ear"}],"subject":{"reference":"Patient/example"},"onsetDateTime":"2012-05-24"};

// condition-example2.json
const r4test6212: fhir4.Condition = {"resourceType":"Condition","id":"example2","clinicalStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-clinical","code":"active"}]},"verificationStatus":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-ver-status","code":"confirmed"}]},"category":[{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/condition-category","code":"problem-list-item","display":"Problem List Item"}]}],"severity":{"coding":[{"system":"http://snomed.info/sct","code":"255604002","display":"Mild"}]},"code":{"text":"Asthma"},"subject":{"reference":"Patient/example"},"onsetString":"approximately November 2012"};

export default {
  title: 'FHIR/ConditionView',
  component: ConditionView,
} as Meta;
const Template: Story<IConditionViewProps> = (args) => <ConditionView {...args} />;

export const Example1 = Template.bind({});
Example1.args = { condition: r4test6135 };

export const Example2 = Template.bind({});
Example2.args = { condition: r4test6142 };

export const Example3 = Template.bind({});
Example3.args = { condition: r4test6149 };

export const Example4 = Template.bind({});
Example4.args = { condition: r4test6156 };

export const Example5 = Template.bind({});
Example5.args = { condition: r4test6163 };

export const Example6 = Template.bind({});
Example6.args = { condition: r4test6170 };

export const Example7 = Template.bind({});
Example7.args = { condition: r4test6177 };

export const Example8 = Template.bind({});
Example8.args = { condition: r4test6184 };

export const Example9 = Template.bind({});
Example9.args = { condition: r4test6191 };

export const Example10 = Template.bind({});
Example10.args = { condition: r4test6198 };

export const Example11 = Template.bind({});
Example11.args = { condition: r4test6205 };

export const Example12 = Template.bind({});
Example12.args = { condition: r4test6212 };