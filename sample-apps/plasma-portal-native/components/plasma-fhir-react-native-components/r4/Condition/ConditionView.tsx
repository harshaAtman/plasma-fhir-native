import { View, Text, StyleSheet } from "react-native";
import { Condition } from "fhir/r4";
import CodeableConceptView from "../CodeableConcept/CodeableConceptView";
import DateView from "../DateTime/DateView";

export interface IConditionViewProps { condition?: Condition; }
export const ConditionView: React.FC<IConditionViewProps> = (props) => {
    if (!props.condition) { return <View />; }
    if (!props.condition.code) { return <View />; }
    if (!props.condition.code.coding) { return <View />; }
    if (!props.condition.code.coding[0]) { return <View />; }

    return (
        <View style={styles.ConditionView_container}>
            <View>
                <View style={styles.ConditionView_code}>
                    <CodeableConceptView codeableConcept={props.condition.code} />
                </View>
                <View style={styles.ConditionView_content}>
                    {!!props.condition.clinicalStatus ? <View style={styles.ConditionView_clinicalStatus}>
                        <CodeableConceptView codeableConcept={props.condition.clinicalStatus} />
                    </View> : null}

                    {!!props.condition.onsetDateTime ? <View style={styles.ConditionView_onsetDate}>
                        <Text>Onset Date: </Text>
                        <DateView date={props.condition.onsetDateTime} />
                    </View> : null}

                    {!!props.condition.recordedDate ? <View style={styles.ConditionView_recordedDate}>
                        <Text>Recorded Date: </Text>
                        <DateView date={props.condition.recordedDate} />
                    </View> : null}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ConditionView_container: { },
    ConditionView_code: { },
    ConditionView_content: { },
    ConditionView_clinicalStatus: { },
    ConditionView_onsetDate: { },
    ConditionView_recordedDate: { }
});

export default ConditionView;