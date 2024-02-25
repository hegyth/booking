import React, { useState } from 'react';
import SidebarRooms from '../Sidebar/SidebarRooms';
import RoomsSelector from '../RoomsSelector/RoomsSelector';
import RoomsList from '../RoomsList/RoomsList';
import '../CheckPage/page.css';

export default function RoomsPage() {
  const [filter, setFilter] = useState({
    ready: 'firstRender',
    catArr: [],
  });
  return (
    <>
      <div className="customContainer">
        <SidebarRooms filter={filter} setFilter={setFilter} />
        <div className="wrapper">

          <div style={{
            marginTop: '10px',
            marginRight: '15px',
            display: 'flex',
            justifyContent: 'right',
          }}
          >
            <RoomsSelector filter={filter} setFilter={setFilter} />
          </div>
          <div style={{
            marginTop: '10px',
            marginRight: '15px',
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <RoomsList filter={filter} />
          </div>
        </div>

      </div>
    </>
  );
}
