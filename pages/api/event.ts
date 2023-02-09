// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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

interface Events  {
  [key: string]: Object[],
};
interface EventsApiRequest extends NextApiRequest {
  query: {
    startDate?: string,
    endDate?: string,
  }
};
interface ApiError {
  message: string,
}

export default async function handler(
  req: EventsApiRequest,
  res: NextApiResponse<Events | ApiError>
) {
  console.log('here')
  if (req.method === 'GET'){
    // GET REQUEST
    try {
      if (typeof req.query.startDate === 'string' && 
          typeof req.query.endDate === 'string'){
        const startDateStr = req.query.startDate;
        const endDateStr = req.query.endDate;
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // TODO: Get user hash
        const uid: string = process.env.UID || 'path';
        const userRef = collection( doc( collection(db, "userEvents"), uid ) , "events" );
        const querySnapshot = await getDocs(query(userRef,
                  where( 'date', '>=', startDate ),
                  where( 'date', '<', endDate ),
              ));
      
        let out: Events = {};
        querySnapshot.forEach((doc) => {
          try{
            // extract data from document
            const data = doc.data();
            data.id = doc.id;
            // get date to which data has to be assigned
            const date: Date = data.date.toDate();
            data.date = date.toString();
            date.setHours(0,0,0,0);
            const dateString = date.toString();
        
            if (!(dateString in out)){
              out[dateString] = Array();
            }
            out[dateString].push( data );
          } catch { }
        });
        res.status(200).json(out);
      } else {
        res.status(400).send({ message: 'Incorrect query parameters.' });
      }
    } catch {
      res.status(500).send({ message: 'Failed to query database.' });
    }
      // END GET REQUEST
  } else if (req.method === 'DELETE') {

  } else {

  }
}
