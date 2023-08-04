import * as Yup from "yup";

// export const AdminLoginSchema = Yup.object({
//     username: Yup.string().max(255,"Email must not be greater than 255 characters.").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ , 'Email must be a valid email address.').required("Email field is required."),
//     password: Yup.string().max(255,"Password must not be greater than 255 characters.").required("Password field is required."),
// });

export const AdminLoginSchema = Yup.object({
    username: Yup.string().required("Username field is required."),
    password: Yup.string().max(255,"Password must not be greater than 255 characters.").required("Password field is required."),
});


