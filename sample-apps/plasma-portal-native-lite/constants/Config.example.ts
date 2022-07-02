
const baseUrl = "https://localhost:3000";

const config = {
    // SMART-HEALTH-IT
    "SMART": { 
        "clientId":           "smart-client-id-not-needed",
        "completeInTarget":   true,
        "fhirServiceUrl":     "https://launch.smarthealthit.org/v/r4/fhir",
        "redirectUri":        `${baseUrl}/app`,
        "scope":              "launch launch/patient patient/*.read offline_access",
    },

    // SMART-HEALTH-IT (hard-coded patient)
    "SMART_PATIENT": { 
        "clientId":           "smart-client-id-not-needed",
        "completeInTarget":   true,
        "fhirServiceUrl":     "https://launch.smarthealthit.org/v/r4/fhir",
        "patientId":          "8de3051f-6298-43e6-9b7f-2aa6443ee760",
        "redirectUri":        `${baseUrl}/app`,
        "scope":              "launch launch/patient patient/*.read offline_access",
    },

    // Epic (Patient-Context, Sandbox)
    "EPIC_PATIENT_SANDBOX": { 
        "iss":              "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
        "clientId":         "{EPIC NON-PRODUCTION CLIENT ID FOR PATIENT APP}",
        "redirectUri":      `${baseUrl}/app`,
        "scope":            "launch launch/patient patient.read patient.search observation.read observation.search",
    },

    // Epic (Clinician-Context, Sandbox)
    "EPIC_CLINICIAN_SANDBOX": { 
        "iss":              "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
        "clientId":         "{EPIC NON-PRODUCTION CLIENT ID FOR CLINICIAN APP}",
        "redirectUri":      `${baseUrl}/app`,
        "scope":            "launch launch/patient patient.read patient.search observation.read observation.search",
    },

    // Epic (Patient Context, Production, R4)
    "EPIC_PATIENT_LIVE_R4": { 
        "iss":          "{FHIR ENDPOINT FOR EPIC HEALTH SYSTEM}",
        "clientId":     "{EPIC CLIENT ID FOR PATIENT APP}",
        "redirectUri":  `${baseUrl}/app`,
        "scope":        "launch launch/patient patient.read patient.search observation.read observation.search",
    },

    // Cerner (R4)
    "CERNER_PATIENT_R4": { },
}

export default config;