import { firebase } from "../components/firebase";
import {
  ADD_TRAINER,
  UPDATE_STEP,
  ADD_PROFDETAILS,
  ADD_TRAINERDETAILS,
  ADD_DOC,
  ADD_BANK_DETAILS,
  ADD_USER,
  ADD_REGISTERUSER,
  PICKSERVICES,
  GET_USER_LOGIN,
  GETUSERNAME,
  ADD_REVIEW,
  GET_ONSERVICE,
  GET_SERVICE,
  GET_PLAN,
  GET_AMOUNT,
  USER_ADDRESS,
  USER_AMOUNT,
  USER_LOGIN_DETAILS,
  SPLASH_STATE,
  PAYMENT_DIETPLANS,
  PAYMENT_ID,
  GET_PAGE,
  GET_SERVICEFORFORM,
  USERDETIALS_STATE,
  ADD_DIETPLAN,
  ADD_FITNESSPLAN,
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
  PAYMENT_BOOK_SESSION,
  GET_AMOUNT_BOOK_SESSION,
  RESET_DIET_PLAN,
  OPEN_DIET,
  RESET_DIET_TYPE,
  SHOW_MODAL
} from "../actions/types";
import { combineReducers } from "redux";

const initialState = {
  trainerInfo: {
    page: 0,
    name: "",
    serviceType: [],
    documents: {}
  },
  trainerdetails: {},
  prof: {},
  documents: {},
  reguser: {},
  pickservices: {},
  address: {},
  useramount: "",
  onclickservice: {},
  services: {},
  userlogindetails: {},
  onclickservice: {},
  splashState: true,
  TypeofUser: {},
  dietPlan: {},
  userDetail: {},
  user: { userpage: "Dashboard" },
  ticket: {},
  authUser: {},
  users: {},
  trialdate: {},
  bookamount: "",
  typeofdiet: ""
};

function ServiceReducer(state = initialState.services, action) {
  switch (action.type) {
    case GET_SERVICE:
      return Object.assign({}, state, { services: action.payload });

    case GET_SERVICEFORFORM:
      return Object.assign({}, state, { formType: action.payload });
    default:
      return state;
  }
}

function DietplanReducer(state = initialState.dietPlan, action) {
  switch (action.type) {
    case ADD_DIETPLAN:
      return Object.assign({}, state, {
        trainerservice: action.payload
      });
    case ADD_FITNESSPLAN:
      return Object.assign({}, state, { fitnessplans: action.payload });
    case GET_ONSERVICE:
      return Object.assign({}, state, { ServiceType: action.payload });
    case GET_PLAN:
      return Object.assign({}, state, { plan: action.payload });
    case GET_AMOUNT:
      return Object.assign({}, state, { amount: action.payload });
    case PAYMENT_DIETPLANS:
      return Object.assign({}, state, { TransactionID: action.payload });
    case GET_DESCRIPTION:
      return Object.assign({}, state, { description: action.payload });
      case OPEN_DIET:
      return Object.assign({}, state, { typeofdiet: action.payload });
    case RESET_DIET_PLAN:
      return Object.assign({}, state.dietPlan, null);
      case RESET_DIET_TYPE:
        return Object.assign({},state.typeofdiet,null);
    case SHOW_MODAL:
      return Object.assign({}, state, { showmodal: action.payload });
    default:
      return state;
  }
}

function UserReducer(state = initialState.user, action) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, { user: action.payload });
    case USER_LOGIN_DETAILS:
      return Object.assign({}, state, { userlogindetails: action.payload });
    case GET_PAGE:
      return Object.assign({}, state, { userpage: action.payload });
    case GET_USER_LOGIN:
      return Object.assign({}, state, {
        TypeofUser: action.payload
      });
    case ADD_REVIEW:
      return Object.assign({}, state, { user: action.payload });
    case ADD_TICKET_RAISE:
      return Object.assign({}, state, { ticket: action.payload });
    case GETUSERNAME:
      return Object.assign({}, state, { user: action.payload });
    case USERDETIALS_STATE:
      return Object.assign({}, state, { details: action.payload });

    default:
      return state;
  }
}

function trainerReducer(state = initialState.trainerInfo, action) {
  switch (action.type) {
    case TRAINER_TYPE:
      return { ...state, serviceType: action.payload };
    case ADD_TRAINER:
      return Object.assign({}, state, action.payload);
    case UPDATE_STEP:
      return { ...state, page: action.payload };
    case ADD_PROFDETAILS:
      return Object.assign({}, state, action.payload);
    case ADD_TRAINERDETAILS:
      return Object.assign({}, state, action.payload);
    case ADD_BANK_DETAILS:
      return Object.assign({}, state, action.payload);
    case ADD_DOC:
      return { ...state, documents: action.payload };
    default:
      return state;
  }
}

function registerUserReducer(state = initialState.reguser, action) {
  switch (action.type) {
    case ADD_REGISTERUSER:
      return Object.assign({}, state.userDetail, action.payload);
    case TRIAL_DATE:
      return Object.assign({}, state.trialdate, action.payload);
    case USER_CATEGORY:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case PICK_SERVICE_DATE:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case PICK_SERVICE_TIME:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case PICK_TRAINER_PACKAGE:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case PICKSERVICES:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case USER_ADDRESS:
      var newState = Object.assign({}, state);
      return Object.assign({}, newState, state.reguser, action.payload);
    case PAYMENT_BOOK_SESSION:
      return Object.assign({}, state, { TransactionId: action.payload });
    case GET_AMOUNT_BOOK_SESSION:
      return { ...state, bookamount: action.payload };
    case RESET_BOOK_SESSION:
      return Object.assign({}, state.bookSession, null);
    default:
      return state;
  }
}

function splashScreen(state = initialState.splashState, action) {
  switch (action.type) {
    case SPLASH_STATE: {
      return { splashState: action.payload };
    }
    default:
      return state;
  }
}

function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case "USERS_SET": {
      return applySetUsers(state, action);
    }
    default:
      return state;
  }
}

function sessionReducer(state = initialState.authUser, action) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return { ...state, authUser: action.authUser };
    }
    default:
      return state;
  }
}

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

const appReducer = combineReducers({
  dietPlan: DietplanReducer,
  trainerInfo: trainerReducer,
  userDetail: UserReducer,
  bookSession: registerUserReducer,
  serviceState: ServiceReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  splashState: splashScreen
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    return (state = initialState);
  }
  return appReducer(state, action);
};

export default rootReducer;
