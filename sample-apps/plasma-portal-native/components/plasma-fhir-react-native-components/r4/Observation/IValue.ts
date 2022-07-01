import { Quantity, CodeableConcept, Range, Ratio, SampledData, Period, Attachment } from "fhir/r4";

// Interface modeling the "value" and "component.value" properties on an Observation
export default interface IValue {
    valueQuantity?: Quantity;
    valueCodeableConcept?: CodeableConcept;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: Range;
    valueRatio?: Ratio;
    valueSampledData?: SampledData;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: Period;
    valueAttachment?: Attachment;

    dataAbsentReason?: CodeableConcept;
}