import { View, Text, StyleSheet } from "react-native";
import { Annotation } from "fhir/r4";

export interface IAnnotationViewProps { annotation?: Annotation; }
export const AnnotationView: React.FC<IAnnotationViewProps> = (props) => {
    if (!props.annotation) { return <View />; }

    return (
        <View style={styles.AnnotationView_container}>
            {props.annotation.text ? <Text style={styles.AnnotationView_text}>{props.annotation.text}</Text> : null}
            {props.annotation.time ? <Text style={styles.AnnotationView_time}>{props.annotation.time}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    AnnotationView_container: { },
    AnnotationView_text: { },
    AnnotationView_time: { } 
});

export default AnnotationView;