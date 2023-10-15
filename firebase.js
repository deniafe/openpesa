import { initializeApp,getApps } from "firebase/app"
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth()

export const sendVerificationCode = async (phoneNumber, appVerifier) => {
  try {
    console.log('Confirm this recapther');

    console.log('Confirm this recapther', appVerifier);

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // SMS sent. Prompt the user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
    // window.confirmationResult = confirmationResult;

    console.log('Confirm this result', confirmationResult);
    // ...
  } catch (error) {
    // Error; SMS not sent
    console.error('Error from sending text', error);
    // ...
  }
};


export const confirmCode = async (code) => {
  try {
    const result = await confirmationResult.confirm(code);
    // User signed in successfully.
    const user = result.user;
    // ...
  } catch (error) {
    // User couldn't sign in (bad verification code?)
    // ...
  }
};


