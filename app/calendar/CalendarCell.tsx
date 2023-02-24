'use client';

import React, { ReactNode, useState } from "react";
import { getBaseURL } from "../util";
import AddEventModal from "./AddEventModal";

interface Event {
  title: string,
  id: string,
  date: string | Date,
  description?: string,
}

// function to call api to delete the event
async function deleteEvent(postID: string) {
  try{
    console.log(postID)
    const deleteReq = await fetch(getBaseURL() + '/api/event',
                                  { method: 'DELETE',
                                    body: JSON.stringify({'postID': postID}),
                                    headers: {
                                      'Content-Type': 'application/json',
                                    } });
  } catch (e) {
    console.log(e);
  }

}

export default function CalendarCell(
  {dateStr, isToday, events} : {
    dateStr: string,
    isToday: boolean,
    events?: Event[],
  }
) {
  // extract date of the current cell to display at top
  const date: Date = new Date(dateStr);

  // generate modal to show if adding events
  const [isModalOpen, setIsModalOpen] = useState(false);

  // generate components for existing events
  let eventComponents: ReactNode[] = [];
  // check if we have any events today, if so generate their components
  if (typeof events !== 'undefined'){
    // transform dates into date objects
    for (var i = 0; i < events.length; i++) {
      events[i].date = new Date(events[i].date)
    }
    // sort events
    events.sort((a,b) => a.date < b.date ? -1 : 1);

    // event components 
    eventComponents = events.map((v,i) => (
      <button key={i} className="w-full px-3 py-1 flex group justify-between bg-lime-300 rounded-md align-middle">
        <text>
        {v.title}
        </text>
        {/* Trash can SVG */}
        <span className="my-auto" onClick={(e) => {e.stopPropagation(); deleteEvent(v.id);}}>
          <svg className="h-5 invisible group-hover:visible bg-opacity-0 hover:bg-opacity-30  bg-slate-600 rounded-sm" 
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M17.23 9.78L15.01 12L17.23 14.22C17.52 14.51 17.52 14.99 17.23 15.28C17.08 15.43 16.89 15.5 16.7 15.5C16.51 15.5 16.32 15.43 16.17 15.28L13.95 13.06L11.73 15.28C11.58 15.43 11.39 15.5 11.2 15.5C11.01 15.5 10.82 15.43 10.67 15.28C10.38 14.99 10.38 14.51 10.67 14.22L12.89 12L10.67 9.78C10.38 9.49 10.38 9.01 10.67 8.72C10.96 8.43 11.44 8.43 11.73 8.72L13.95 10.94L16.17 8.72C16.46 8.43 16.94 8.43 17.23 8.72C17.52 9.01 17.52 9.49 17.23 9.78ZM21.32 7V17C21.32 17.96 20.54 18.75 19.57 18.75H7.64C7.02999 18.75 6.48 18.44 6.16 17.93L2.87 12.66C2.62 12.26 2.62 11.74 2.87 11.33L6.16 6.07C6.48 5.56 7.04 5.25 7.64 5.25H19.58C20.54 5.25 21.33 6.04 21.33 7H21.32ZM19.82 7C19.82 6.86 19.71 6.75 19.57 6.75H7.64C7.54999 6.75 7.47 6.79 7.43 6.87L4.22 12L7.43 17.13C7.48 17.2 7.56 17.25 7.64 17.25H19.58C19.72 17.25 19.83 17.14 19.83 17V7H19.82Z" fill="#000000"/>
          </svg>
        </span>
      </button>
    ));
  }

  return (
    <div className={`border px-1 py-3 flex flex-col align-top justify-between group
                      ${isToday ? "bg-purple-400" : "hover:bg-purple-200"}`} >
      <div className="w-full h-100">
        <div className="flex justify-center">{date.getDate()}</div>
        <div>{eventComponents}</div>
      </div>
      {/* Add event button */}
      <button className="w-full bg-gray-400 rounded-md bg-opacity-50
        invisible group-hover:visible hover:bg-opacity-100 text-lg align-middle"
        onClick={() => setIsModalOpen(true)}>
        +
      </button>
      

      {/* Modal to appear if adding new event */}
      {
        isModalOpen ? (
          <AddEventModal date={dateStr}/>
        ) : null
      }
    </div>
  )
}


// ML model that can predict the best slice thickness based on circumstances

// proof of concept: input conditions 

//   standard setting: bags per minute (standard is 100)
//     input daily plan in tonnes of product
   
//     big potato slices -> issues with sealing the bags
//     adding flavours slows the machines 


// flavour reduces bags per minute
// Potato thickness can cause stopping and is an input that cnat be changed
// packaging individual bags into boxes/multipacks might need slowing down to wait for boxes to come through
