import React, { useContext } from "react";
import { StyleSheet } from "react-native";

const DefaultTheme = StyleSheet.create({
    PatientHeader_container: { },
    PatientHeader_sexAgeDOB: { },
    PatientHeader_patientId: { },
    PatientHeader_patientIdText: { color: "red" },
    PatientHeader_address: { },
    PatientHeader_addressText: { },

    SexAgeDOB_age: { },
    SexAgeDOB_dob: { },
    SexAgeDOB_gender: { },
    SexAgeDOB_container: { },

    AllergyIntoleranceView_container: { },
    AllergyIntoleranceView_code: { },
    AllergyIntoleranceView_recordedDate: { },

    CodeableConceptView_codingElementContainer: { },
    CodeableConceptView_container: { }
});

export const PlasmaThemeContext = React.createContext({
    theme: DefaultTheme,
});




/*
const ThemeContext = React.createContext({ theme: DefaultTheme });

export const ThemeContextProvider = (props: any) => {
  return (
    <ThemeContext.Provider value={{ theme: DefaultTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function withTheme(Component: any) {
    return (props: any) => {
      const { theme } = useContext(ThemeContext);
      return <Component {...props} theme={theme} />;
    };
  }






export const PlasmaThemeContext = React.createContext(DefaultTheme);

export class ThemeProvider extends React.Component {
  
  state = {
    theme: DefaultTheme,
    updateTheme: (theme: any) => {
      this.setState({ theme: theme })
    }
  }

  render() {
    const { theme } = this.state
    return (
      <PlasmaThemeContext.Provider value={this.state} theme={theme} >
        { this.props.children }
      </PlasmaThemeContext.Provider>
    )
  }
}

export default ThemeProvider;
*/