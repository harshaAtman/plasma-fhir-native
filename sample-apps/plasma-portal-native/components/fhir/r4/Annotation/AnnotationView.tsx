import React from "react";
import { Annotation } from "fhir/r4";

export interface IAnnotationViewProps { annotation?: Annotation; }
export const AnnotationView: React.FC<IAnnotationViewProps> = (props) => {
    if (!props.annotation) { return <div />; }

    return (
        <div className="AnnotationView_container">
            {props.annotation.text ? <span className="AnnotationView_text">{props.annotation.text}</span> : null}
            {props.annotation.time ? <span className="AnnotationView_time">{props.annotation.time}</span> : null}
        </div>
    );
}

export default AnnotationView;