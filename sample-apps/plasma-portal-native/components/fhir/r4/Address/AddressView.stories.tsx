import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AddressView, { IAddressViewProps } from './AddressView';

// Sample data (from @types/fhir)...
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/fhir/test/r4-tests.ts
const r4test16707: fhir4.Patient = {"resourceType":"Patient","id":"xds","identifier":[{"use":"usual","type":{"coding":[{"system":"http://terminology.hl7.org/CodeSystem/v2-0203","code":"MR"}]},"system":"urn:oid:1.2.3.4.5","value":"89765a87b"}],"active":true,"name":[{"family":"Doe","given":["John"]}],"gender":"male","birthDate":"1956-05-27","address":[{"line":["100 Main St"],"city":"Metropolis","state":"Il","postalCode":"44130","country":"USA"}],"managingOrganization":{"reference":"Organization/2"}};

export default {
  title: 'FHIR/AddressView',
  component: AddressView,
} as Meta;
const Template: Story<IAddressViewProps> = (args) => <AddressView {...args} />;

export const Example1 = Template.bind({});
Example1.args = { address: (r4test16707.address) ? r4test16707.address[0] : undefined };

export const Example2 = Template.bind({});
Example2.args = { address: (r4test16707.address) ? r4test16707.address[0] : undefined };