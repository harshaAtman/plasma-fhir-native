import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FamilyMemberHistoryView, { IFamilyMemberHistoryViewProps } from './FamilyMemberHistoryView';

// Sample data (from @types/fhir)...
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/fhir/test/r4-tests.ts
const r4test11874: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"mother","status":"completed","patient":{"reference":"Patient/100","display":"Peter Patient"},"relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"MTH","display":"mother"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"371041009","display":"Embolic Stroke"}],"text":"Stroke"},"onsetAge":{"value":56,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"}}]};
const r4test11881: fhir4.FamilyMemberHistory = {"resourceType":"FamilyMemberHistory","id":"father","identifier":[{"value":"12345"}],"instantiatesUri":["http://example.org/family-member-history-questionnaire"],"status":"completed","patient":{"reference":"Patient/example","display":"Peter Patient"},"date":"2011-03-18","relationship":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v3-RoleCode","code":"FTH","display":"father"}]},"sex":{"coding":[{"system":"http://hl7.org/fhir/administrative-gender","code":"male","display":"Male"}]},"condition":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"315619001","display":"Myocardial Infarction"}],"text":"Heart Attack"},"contributedToDeath":true,"onsetAge":{"value":74,"unit":"yr","system":"http://unitsofmeasure.org","code":"a"},"note":[{"text":"Was fishing at the time. At least he went doing someting he loved."}]}]};

export default {
  title: 'FHIR/FamilyMemberHistoryView',
  component: FamilyMemberHistoryView,
} as Meta;
const Template: Story<IFamilyMemberHistoryViewProps> = (args) => <FamilyMemberHistoryView {...args} />;

export const Example1 = Template.bind({});
Example1.args = { familyMemberHistory: r4test11874 };

export const Example2 = Template.bind({});
Example2.args = { familyMemberHistory: r4test11881 };