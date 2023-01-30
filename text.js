import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import twilio from "twilio";

const firebaseConfig = {
    apiKey: key,
    authDomain: authDomain,
    databaseURL: dbUrl,
    projectId: projectId,
    storageBucket: bucket,
    appId: appId,
    measurementId: mId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const accountSid = sid;
const authToken = token;

const client = new twilio(accountSid, authToken);
var numbers = [];

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    numbers.push(doc.data()['to'])
});

console.log('Text sent to:')
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers.at(i))
    client.messages
        .create({
            body: 'Mass text test!',
            to: numbers.at(i),
            from: twilioNumber,
        })
        .then((message) => console.log(message.sid));
}





