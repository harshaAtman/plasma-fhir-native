import React from 'react';
import { FamilyMemberHistory, FamilyMemberHistoryCondition, CodeableConcept } from "fhir/r4";
import './FamilyMemberHistoryView.css';
import CodeableConceptView, { CodeableConceptViewDisplayMode } from "../CodeableConcept/CodeableConceptView";

export interface IFamilyMemberHistoryViewProps { familyMemberHistory?: FamilyMemberHistory; }
export const FamilyMemberHistoryView: React.FC<IFamilyMemberHistoryViewProps> = (props) => {
  if (!props.familyMemberHistory) { return <div />; }
  const { familyMemberHistory } = props;

  // Relationship...
  let elRelationship = null;
  if (familyMemberHistory.relationship) {
    elRelationship = <CodeableConceptView codeableConcept={familyMemberHistory.relationship} 
      style={{ display: "inline", textTransform: "capitalize" }}
      displayMode={CodeableConceptViewDisplayMode.inline} 
    />
  }
  
  // Name...
  let elName = null;
  if (familyMemberHistory.name) {
    elName = <span>{familyMemberHistory.name}</span>
  }

  // Sex...
  let elSex = null;
  if (familyMemberHistory.sex) {
    elSex = <CodeableConceptView codeableConcept={familyMemberHistory.sex}  />
  }

  // TODO: Make a FamilyMemberHistory_ConditionView

  // Conditions...
  let elConditions = null;
  if (familyMemberHistory.condition) {
    // Convert to array...
    let condition = familyMemberHistory.condition;
    if (!Array.isArray(condition)) { condition = [condition]; }

    // Convert to CodeableConceptView...
    const conditionCodes: CodeableConcept[] = condition.map((condition: FamilyMemberHistoryCondition) => { return condition.code; });    
    elConditions = conditionCodes.map((conditionCode: CodeableConcept, idx: number) => {
      return <CodeableConceptView codeableConcept={conditionCode} key={idx} />
    });
  }
  
  return (
    <div className="FamilyMemberHistoryView_container">
        Name: {elName}<br />
        Relationship: {elRelationship}<br />
        Sex: {elSex}<br />
        <span className="font-bold">Conditions:</span>{elConditions}
    </div>
  );  
};

export default FamilyMemberHistoryView;