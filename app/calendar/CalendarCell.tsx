'use client';

import { ReactNode } from "react";

interface Event {
  title: string,
  id: string,
  date: string | Date,
  description?: string,
}
export default function CalendarCell(
  {dateStr, isToday, events} : {
    dateStr: string,
    isToday: boolean,
    events?: Event[],
  }
) {
  const clickFn = () => {
    console.log(events);
  }

  const date: Date = new Date(dateStr);

  let eventComponents: ReactNode[] = [];
  if (typeof events !== 'undefined'){
    // transform dates into date objects
    for (var i = 0; i < events.length; i++) {
      events[i].date = new Date(events[i].date)
    }
    // sort events
    events.sort((a,b) => a.date < b.date ? -1 : 1);

    // event components 
    eventComponents = events.map((v,i) => (
      <div key={i} className="w-full bg-slate-300 rounded-md">
        {v.title}
      </div>
    ));
  }

  return (
    <button className={`border px-1 py-3 flex justify-center align-top
                      ${isToday ? "bg-purple-400" : "hover:bg-purple-200"}`}
      onClick={clickFn}>
      <div className="w-full">
        <span>{date.getDate()}</span>
        <div>{eventComponents}</div>
      </div>
    </button>
  )
}