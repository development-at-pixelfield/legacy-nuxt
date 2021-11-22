export default {
  auth: {
    register: "Register",
    email: "Email",
    passwordRule:
      "Create a strong password using at least 8 characters, include at least one number and at least one special character (e.g. ! @ # ?), a mixture of uppercase and lowercase letters.",
    password: "Password",
    repeatPassword: "Repeat password",
    agreeWith: "I agree with",
    termCond: "Terms and Conditions",
    policy: "Privacy Policy",
    alreadyLoggedIn: "Already here? Log in instead",
    login: "Login",
    newHere: "New here? Register instead",
    recoverPassword: "Recover password",
    recoverPassEmail:
      "Enter the email address associated with your account and we’ll send you a link to verify your email.",
    resetPassword: "Reset password",
    backLogin: "Back to login",
    addCode:
      "Enter the code you received in the password recovery email and set up a new password.",
    code: "Code",
    newPassword: "New password",
    setNewPass: "Set new password",
  },

  validations: {
    notEmpty: "This field cannot be empty.",
    sameAsPassword: "Please make sure your passwords match.",
    termAgree: "Please agree to  Terms and Conditions.",
    addEmail: "Please include an ‘@’ in the email address.",
  },

  snackbar: {
    successRegister: "Successfully registered",
    successLoggedIn: "Successfully loggedIn",
    successSend: "Successfully send",
    checkInbox: "Recovery email sent! Please check your inbox.",
    passwordChanged:
      "Password changed successfully! You can now login with the new password.",
  },
};
