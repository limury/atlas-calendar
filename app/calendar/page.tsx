import CalendarCell from "./CalendarCell";
import { getBaseURL } from "../util";

// firebase setup
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, query, where } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "atlas-calendar-1.firebaseapp.com",
  projectId: "atlas-calendar-1",
  storageBucket: "atlas-calendar-1.appspot.com",
  messagingSenderId: "653567594218",
  appId: "1:653567594218:web:624ffec295741c27e59193",
  measurementId: "G-ZCRGRSZNXQ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// end firebase setup

// funciton to get all events on calendar in a range
async function getEvents(startDate: Date, endDate: Date) {
  return {};
  // TODO: Get user hash
  const uid: string = process.env.UID || 'path';
  const userRef = collection( doc( collection(db, "userEvents"), uid ) , "events" );
  const querySnapshot = await getDocs(query(userRef,
            where( 'date', '>=', startDate ),
            where( 'date', '<', endDate ),
        ));

  // array where each item contains all events of that day
  const diffTime = Math.abs(endDate.getMilliseconds() - startDate.getMilliseconds());
  const datesDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  let out: {[key: string]: Object[]} = {};
  querySnapshot.forEach((doc) => {
    try{
      const data = doc.data();
      const date = data.date.toDate();
      data.date = date.toString();
      date.setHours(0,0,0,0);
      const dateString = date.toString();

      if (!(dateString in out)){
        out[dateString] = Array();
      }
      out[dateString].push( data );
    } catch { }
  });
  return out;
}

const MONTHS = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];

export default async function Calendar() {
  console.log('rerender');
  const today = new Date(Date.now());
  today.setHours(0,0,0,0);
  const weekday = (today.getDay() + 6) % 7;

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - weekday);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 28);
  const eventsReq = await fetch(getBaseURL() + '/api/event?' + new URLSearchParams({
                            "startDate": startDate.toString(),
                            "endDate": endDate.toString(),
                          }));
  const events = await eventsReq.json();
  // console.log(events);
  // get cells to display
  const cellsToDisplay = Array(7*4).fill(0).map((v,i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - weekday + i);
    const dateString = date.toString();
    date.setHours(0,0,0,0);
    return (
      <CalendarCell events={events[ date.toString() ]}
                    dateStr={dateString} isToday={i === weekday} key={i}/>
    )
  });
  // end get cells to display

  return (
    <div className="h-screen flex flex-col">
      <div className="text-4xl text-white bg-purple-700 p-7 flex justify-between">
        <span>Atlas Calendar</span>
        <span>Date</span>
      </div>
      <div className="h-full grid grid-cols-7 flex">
        {cellsToDisplay}
      </div>
    </div>
  )
}