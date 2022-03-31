import * as yup from "yup";

const currentDate = new Date();
// validationSchema
export const motorInsuranceHomePageValidationSchema = yup.object({
    siv: yup
        .number("Enter Number Only.")
        .positive("dsf")
        .min(1, "Minimum value is 1")
        .required("required"),
    engineCapacity: yup
        .number("Enter Number Only.")
        .positive("dsf")
        .min(50, "Minimum value is 50")
        .required("required"),
    driver: yup
        .number("Enter Number Only.")
        .positive("dsf")
        .integer("dsf")
        .min(1, "Minimum value is 1")
        .required("required"),
    passenger: yup
        .number("Enter Number Only.")
        .positive("dsf")
        .integer("dsf")
        .min(1, "Minimum value is 1")
        .required("required"),
});
export const motorInsuranceInfoPageValidationSchema = yup.object({
    insuredName: yup
        .string("Enter Your Name.")
        .required("required"),
    insuredNid: yup
        .number("Enter Number Only.")
        .positive("dsf")
        .min(1000000000, "dsf")
        .integer("dsf")
        .required("required"),
    insuredAddress: yup
        .string("Enter Your Name.")
        .required("required"),
    insuredCity: yup
        .string("Enter Your Name.")
        .required("required"),
    insuredMAddress: yup
        .string("Enter Your Name.")
        .when("sameAddress", {
            is: false,
            then: yup.string().required('Must enter email address')
        }),
    insuredMCity: yup
        .string("Enter Your Name.")
        .when("sameAddress", {
            is: false,
            then: yup.string().required('Must enter email address')
        }),
    insuredMobile: yup
        .string("Enter Your Name.")
        .length(14, "dsf")
        .required("required"),
    insuredEmail: yup
        .string("Enter Your Name.")
        .email("dsf")
        .required("required"),
    sameAddress: yup
        .boolean("Enter Your Name."),

    motorBrand: yup
        .string("Enter")
        .required("required"),
    motorManYear: yup
        .number("Enter")
        .positive("dsf")
        .min(1500, "dsf")
        .max(currentDate.getFullYear(), "df")
        .integer("dsf")
        .required("required"),
    motorRegMetro: yup
        .string("Enter")
        .required("required"),
    motorRegMark: yup
        .string("Enter")
        .required("required"),
    motorRegNumber: yup
        .string("Enter")
        .length(7, "dsf")
        .required("required"),
    motorRegDate: yup
        .date("dsf").max(currentDate, "Enter")
        .required("required"),
    motorEngineNo: yup
        .string("Enter")
        .matches(/^[a-zA-Z0-9]+$/, "A-Z and 0-9 only")
        .required("required"),
    motorChesisNo: yup
        .string("Enter")
        .matches(/^[a-zA-Z0-9]+$/, "A-Z and 0-9 only")
        .required("required"),
});


// initial values
export const motorInsuranceHomePageInitialValues = {
    siv: "",
    engineCapacity: "",
    driver: "",
    passenger: "",
};
export const motorInsuranceInfoPageInitialValues = {
    insuredName: "",
    insuredNid: "",
    insuredAddress: "",
    insuredCity: "",
    insuredMAddress: "",
    insuredMCity: "",
    insuredMobile: "",
    insuredEmail: "",
    sameAddress: false,

    motorBrand: "",
    motorManYear: "",
    motorRegMetro: "",
    motorRegMark: "",
    motorRegNumber: "",
    motorRegDate: null,
    motorEngineNo: "",
    motorChesisNo: "",
};