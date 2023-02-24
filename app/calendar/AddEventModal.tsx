'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function AddEventModal(
  {date}: {date: string}
) {
  // const initDate = new Date(date);
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(date),
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };


  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white bg-opacity-80 flex">
      <div className="m-auto w-5/6 max-w-[800px]">
        <div className="bg-purple-400 p-3 rounded-t-lg">
          <div className="text-3xl w-max">
            Create New Event
          </div>
        </div>
        <div className="border-x-2 border-b-2 p-3 rounded-b-lg bg-white">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col space-y-3">
              <DateTimePicker
                className="w-full"
                label="Date and Time"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField required id="title" label="Event Title" variant="outlined"
                className="w-full"/>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
              />
            </div>
          </LocalizationProvider> 

        </div>

      </div>
      
    </div>
  )
}