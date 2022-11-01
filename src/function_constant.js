const prod_function = {
  typeOfUser:
    "https://us-central1-bowoot-be754.cloudfunctions.net/getTypeOfUser",
  creatNewUser:
    "https://us-central1-bowoot-be754.cloudfunctions.net/createNewUser",
  checkPhoneExits:
    "https://us-central1-bowoot-be754.cloudfunctions.net/checkPhoneExists",
  checkUserExists:
    "https://us-central1-bowoot-be754.cloudfunctions.net/checkUserExists"
};

const dev_function = {
  typeOfUser:
    "https://us-central1-bowoot-test.cloudfunctions.net/getTypeOfUser",
  creatNewUser:
    "https://us-central1-bowoot-test.cloudfunctions.net/createNewUser",
  checkPhoneExits:
    "https://us-central1-bowoot-test.cloudfunctions.net/checkPhoneExists",
  checkUserExists:
    "https://us-central1-bowoot-test.cloudfunctions.net/checkUserExists"
};

export const functions_for_users =
  process.env.NODE_ENV === "production" ? dev_function : dev_function;
