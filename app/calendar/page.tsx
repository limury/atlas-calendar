import CalendarCell from "./CalendarCell";
import { getBaseURL } from "../util";

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