import { ADD_FITNESSPLAN, ADD_DIETPLAN, RESET_DIET_PLAN } from "./types";
import {
  ADD_TRAINER,
  UPDATE_STEP,
  ADD_TRAINERDETAILS,
  ADD_PROFDETAILS,
  ADD_DOC,
  ADD_BANK_DETAILS,
  ADD_USER,
  ADD_SERVICE,
  ADD_REGISTERUSER,
  PICKSERVICES,
  GET_USER_LOGIN,
  GETUSERNAME,
  ADD_REVIEW,
  GET_ONSERVICE,
  GET_PLAN,
  GET_AMOUNT,
  USER_AMOUNT,
  USER_ADDRESS,
  USER_LOGIN_DETAILS,
  GET_SERVICE,
  SPLASH_STATE,
  PAYMENT_DIETPLANS,
  PAYMENT_ID,
  GET_PAGE,
  GET_SERVICEFORFORM,
  USERDETIALS_STATE,
  DESTROY_SESSION,
  UPDATE_USER_STEP,
  ADD_TICKET_RAISE,
  Form_Close,
  TRAINER_TYPE,
  GET_DESCRIPTION,
  TRIAL_DATE,
  USER_CATEGORY,
  PICK_SERVICE_DATE,
  PICK_SERVICE_TIME,
  PICK_TRAINER_PACKAGE,
  RESET_BOOK_SESSION,
  GET_AMOUNT_BOOK_SESSION,
  PAYMENT_BOOK_SESSION,
  RESET_DIET_TYPE,
  SHOW_MODAL,
  OPEN_DIET
} from "./types";

export const type_of_diet = typeofdiet => ({
  type: OPEN_DIET,
  payload: typeofdiet
});
export const createService = ({ service, trainer, time, startDate }) => ({
  type: ADD_SERVICE,
  payload: {
    service,
    trainer,
    time,
    startDate
  }
});

export const createUser = ({ name, gender, phone, email }) => ({
  type: ADD_USER,
  payload: {
    name,
    gender,
    phone,
    email
  }
});

export const createRegisterUser = ({ name, gender, phoneNumber, email }) => ({
  type: ADD_REGISTERUSER,
  payload: {
    name,
    gender,
    phoneNumber,
    email
  }
});

export const createPickService = ({
  service,
  trainer,
  date,
  time,
  selectDate
}) => ({
  type: PICKSERVICES,
  payload: {
    service,
    trainer,
    date,
    time,
    selectDate
  }
});
export const createPickTrialDate = ({ service_time, typeOfservice }) => ({
  type: TRIAL_DATE,
  payload: {
    service_time,
    typeOfservice
  }
});

export const createUserCategory = ({ user_category }) => ({
  type: USER_CATEGORY,
  payload: {
    user_category
  }
});
export const createServiceDate = ({ trial_date }) => ({
  type: PICK_SERVICE_DATE,
  payload: {
    trial_date
  }
});
export const createPickServiceTime = ({ trial_time }) => ({
  type: PICK_SERVICE_TIME,
  payload: {
    trial_time
  }
});
export const createPickServicePackage = ({ trainer_category }) => ({
  type: PICK_TRAINER_PACKAGE,
  payload: {
    trainer_category
  }
});
export const userAddress = ({
  assistance,
  address,
  landmark,
  area,
  name,
  phone,
  status,
  position,
  pincode
}) => ({
  type: USER_ADDRESS,
  payload: {
    assistance,
    address,
    landmark,
    area,
    name,
    phone,
    status,
    position,
    pincode
  }
});
export const fitnessplan = ({
  service,
  age,
  gender,
  medical,
  height,
  weight,
  activity,
  workpreference,
  goal,
  gymwork,
  pain,
  injury,

  goalreach
}) => ({
  type: ADD_FITNESSPLAN,
  payload: {
    service,
    age,
    gender,
    medical,
    height,
    weight,
    activity,

    workpreference,
    goal,
    gymwork,

    pain,
    injury,

    goalreach
  }
});

export const dietplan = ({
  service,
  age,
  gender,
  medical,
  height,
  weight,
  activity,
  diet,
  goal,
  period
  // order_id
}) => ({
  type: ADD_DIETPLAN,
  payload: {
    service,
    age,
    gender,
    medical,
    height,
    weight,
    activity,
    diet,
    goal,
    period
    //order_id
  }
});
export const createTrainer = ({
  name,
  age,
  gender,
  formData: { phone },
  email
}) => ({
  type: ADD_TRAINER,
  payload: {
    name,
    age,
    gender,
    phone,
    email
  }
});
export const createTrainerBankDetails = ({
  formData: { account_no, confirm_account_no },
  account_holder_name,
  ifsc_code,
  bank_name,
  branch_name
}) => ({
  type: ADD_BANK_DETAILS,
  payload: {
    account_no,
    confirm_account_no,
    account_holder_name,
    ifsc_code,
    bank_name,
    branch_name
  }
});
export const createTicket = ({ ticket_raise_message, ticket_raise_file }) => ({
  type: ADD_TICKET_RAISE,
  payload: {
    ticket_raise_message,
    ticket_raise_file
  }
});
export const createReview = ({ name, img, occupation, review }) => ({
  type: ADD_REVIEW,
  payload: {
    name,
    img,
    occupation,
    review
  }
});
export const updateStep = step => ({
  type: UPDATE_STEP,
  payload: step
});

export const updateUserStep = step => ({
  type: UPDATE_USER_STEP,
  payload: step
});
export const createTrainerDetails = ({
  language,
  qualification,
  c_address,
  servicingArea,
  district,
  localState,
  pin
}) => ({
  type: ADD_TRAINERDETAILS,
  payload: {
    language,
    qualification,
    c_address,
    servicingArea,
    district,
    localState,
    pin
  }
});

export const createTrainerProfDetails = ({
  experience,
  aadharURL,
  panURL,
  certificateURL,
  photoURL
}) => ({
  type: ADD_PROFDETAILS,
  payload: {
    experience,
    aadharURL,
    panURL,
    certificateURL,
    photoURL
  }
});
export const createDocument = ({ aadhar, pan, photo, certificate }) => ({
  type: ADD_DOC,
  payload: {
    aadhar,
    pan,
    photo,
    certificate
  }
});

export const storeUserLoginInfo = User => ({
  type: GET_USER_LOGIN,
  payload: User
});

export const createLoggedUser = username => ({
  type: GETUSERNAME,
  payload: username
});

export const onClickRegister = ServiceType => ({
  type: GET_ONSERVICE,
  payload: ServiceType
});

export const RegisterService = services => ({
  type: GET_SERVICE,
  payload: services
});

export const ServiceforForm = services => ({
  type: GET_SERVICEFORFORM,
  payload: services
});

export const UserPage = userpage => ({
  type: GET_PAGE,
  payload: userpage
});
export const UserAmount = useramount => ({
  type: USER_AMOUNT,
  payload: useramount
});
export const userLoginDetails = userlogindetails => ({
  type: USER_LOGIN_DETAILS,
  payload: userlogindetails
});

export const FinalPlan = plan => ({
  type: GET_PLAN,
  payload: plan
});

export const TotalAmount = amount => ({
  type: GET_AMOUNT,
  payload: amount
});

export const Description = description => ({
  type: GET_DESCRIPTION,
  payload: description
});

export const BookAmount = bookamount => ({
  type: GET_AMOUNT_BOOK_SESSION,
  payload: bookamount
});
export const SplashState = state => ({
  type: SPLASH_STATE,
  payload: state
});
export const PaymentTransactionDietPlans = paymentid => ({
  type: PAYMENT_DIETPLANS,
  payload: paymentid
});

export const PaymentTransactionBookSession = payment_id_book => ({
  type: PAYMENT_BOOK_SESSION,
  payload: payment_id_book
});

export const PaymentTransaction = paymentid => ({
  type: PAYMENT_ID,
  payload: paymentid
});

export const USERDETIALS = details => ({
  type: USERDETIALS_STATE,
  payload: details
});

export const onLogout = data => {
  return dispatch => {
    dispatch({
      type: DESTROY_SESSION,
      payload: data
    });
  };
};

export const FormClose = closemodal => ({
  type: Form_Close,
  payload: closemodal
});

export const TrainerType = typeOftrainer => ({
  type: TRAINER_TYPE,
  payload: typeOftrainer
});
export const resetBookSession = resetBook => ({
  type: RESET_BOOK_SESSION,
  payload: null
});

export const resetDietPlan = resetDiet => ({
  type: RESET_DIET_PLAN,
  payload: null
});
export const resetTypeOfDiet = resetdiettype => ({
  type: RESET_DIET_TYPE,
  payload: null
});
export const SHOWMODAL = showmodal => ({
  type: SHOW_MODAL,
  payload: showmodal
});
