// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// firebase setup
import {initializeApp} from "firebase/app";
import { deleteDoc, getFirestore } from "firebase/firestore";
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
  },
  body: {
    postId?: string,
  }
};
interface ApiError {
  message: string,
}

export default async function handler(
  req: EventsApiRequest,
  res: NextApiResponse<Events | ApiError>
) {
  if (req.method === 'GET'){
    // GET REQUEST
    try {
      if (typeof req.query.startDate === 'string' && 
          typeof req.query.endDate === 'string'){
        // const startDateStr = req.query.startDate;
        // const endDateStr = req.query.endDate;
        // const startDate = new Date(startDateStr);
        // const endDate = new Date(endDateStr);

        // // TODO: Get user hash
        // const uid: string = process.env.UID || 'path';
        // const userRef = collection( doc( collection(db, "userEvents"), uid ) , "events" );
        // const querySnapshot = await getDocs(query(userRef,
        //           where( 'date', '>=', startDate ),
        //           where( 'date', '<', endDate ),
        //       ));
      
        // let out: Events = {};
        // querySnapshot.forEach((doc) => {
        //   try{
        //     // extract data from document
        //     const data = doc.data();
        //     data.id = doc.id;
        //     // get date to which data has to be assigned
        //     const date: Date = data.date.toDate();
        //     data.date = date.toString();
        //     date.setHours(0,0,0,0);
        //     const dateString = date.toString();
        
        //     if (!(dateString in out)){
        //       out[dateString] = Array();
        //     }
        //     out[dateString].push( data );
        //   } catch { }
        // });
        const out = {
          'Mon Feb 06 2023 00:00:00 GMT+0000 (Greenwich Mean Time)': [
            {
              title: 'hi',
              date: 'Mon Feb 06 2023 09:09:29 GMT+0000 (Greenwich Mean Time)',
              id: 'jx0G07WCyLNhXoAzZt7m'
            }
          ],
          'Thu Feb 16 2023 00:00:00 GMT+0000 (Greenwich Mean Time)': [
            {
              description: 'call dad',
              date: 'Thu Feb 16 2023 22:33:32 GMT+0000 (Greenwich Mean Time)',
              title: 'Call',
              id: 'ugJRG8HjN2YLQwoVZE5l'
            }
          ],
          'Tue Feb 28 2023 00:00:00 GMT+0000 (Greenwich Mean Time)': [
            {
              date: 'Tue Feb 28 2023 09:11:53 GMT+0000 (Greenwich Mean Time)',
              title: 'Another title',
              id: 'J6kFERgytQWYuFtoyRdO'
            }
          ]
        };
        res.status(200).json(out);

      } else {
        res.status(400).json({ message: 'Incorrect query parameters.' });
      }
    } catch {
      res.status(500).json({ message: 'Failed to query database.' });
    }
    // END GET REQUEST

  } else if (req.method === 'DELETE') {

    // DELETE REQUEST
    try {
      if (typeof req.body.postId === 'string'){
        const uid: string = process.env.UID || 'path';
        const userRef = collection( doc( collection(db, "userEvents"), uid ) , "events" );
        await deleteDoc( doc(userRef, req.body.postId) );
      }
    } catch {
      res.status(500).json({ message: 'Failed to query database.' })
    }
    // END DELETE REQUEST

  } else if (req.method === 'POST') {

  }
}
