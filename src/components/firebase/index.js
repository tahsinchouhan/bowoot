import "firebase/auth";
import "firebase/database";

const prodConfig = {
  apiKey: "AIzaSyBcTPvgOcuLoUrFvMJvFTFqMzxhJC5mSNM",
  authDomain: "bowoot-be754.firebaseapp.com",
  databaseURL: "https://bowoot.firebaseio.com/",
  projectId: "bowoot-be754",
  storageBucket: "bowoot-be754.appspot.com",
  messagingSenderId: "300482239919",
  appId: "1:300482239919:web:7fa29e50bd389f84",
  measurementId: "G-X0B2WP80EK",
};

const devConfig = {
  apiKey: "AIzaSyDunjSQB2jlb6HeGu1isrtKv6g5WsEUuOg",
  authDomain: "bowoot-test.firebaseapp.com",
  databaseURL: "https://bowoot-test.firebaseio.com",
  projectId: "bowoot-test",
  storageBucket: "bowoot-test.appspot.com",
  messagingSenderId: "109691704068",
  appId: "1:109691704068:web:7e8a35126cff8258a07651",
  measurementId: "G-RPSTRHS607",
};


const config = process.env.NODE_ENV === "production" ? devConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export { firebase };

