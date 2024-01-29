import './App.css';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AttendeeForm from './AttendeeForm';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import LocationList from './LocationList';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';




function App(props) {
  // if (props.attendees === undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
          <Routes>
            <Route index element={<MainPage />} />

            <Route path='/Attendees' element={<AttendeesList/>} />
            <Route path='/Attendees/new' element={<AttendeeForm/>} />

            <Route path='/Locations' element={<LocationList/>} />
            <Route path='/Locations/new' element={<LocationForm />} />


            <Route path='/Conferences/new' element={<ConferenceForm/>} />

            <Route path='/Presentations/new' element={<PresentationForm/>} />
            {/* <AttendeesList attendees={props.attendees}/> */}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
