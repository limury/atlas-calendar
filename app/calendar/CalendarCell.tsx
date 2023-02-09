'use client';
export default function CalendarCell(
  {dateStr, isToday, events} : {
    dateStr: string,
    isToday: boolean,
    events: Object[],
  }
) {
  const clickFn = () => {
    console.log(events);
  }

  const date: Date = new Date(dateStr);
  if (isToday)
  return (
    <button className="border p-3 flex justify-center align-top
                      bg-purple-400"
      onClick={clickFn}>
      {date.getDate()}
    </button>
  )
  else
  return (
    <button className="border p-3 flex justify-center align-top
                      hover:bg-purple-200"
      onClick={clickFn}>
      {date.getDate()}
    </button>
  )
}