import React from 'react';
import './MissionItemComponent'

import { LAUNCH_MESSAGE, LINK_TEXT } from '../../constants';

const MissionItemComponent = ({ missionItem }) => {

  const { links, rocket, payloads, flight_number, launch_date_local, launch_site } = missionItem;

  const isFailedMission = (missionItem) => (
    (missionItem.land_success !== undefined && missionItem.launch_success !== undefined)
      ? missionItem.land_success && missionItem.launch_success
        ? ''
        : <label className="failed-launch">{` - ${LAUNCH_MESSAGE}`}</label>
      : ''
  )

  const getButtons = (links) => (
    Object.entries(links).map((link, idx) => (
      (link && link[0] !== 'mission_patch' && link[1]) && <div className="btn" key={idx}><a href={link[1]} target="_blank">{LINK_TEXT[link[0]]}</a></div>
    ))
  )

  const formatDate = date => (
    new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(Date.parse(date))
  )

  const formatTime = date => (
    new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(Date.parse(date))
  )

  return (
    <div className="mission-item-container">
      <img src={links.mission_patch} alt={`${rocket.rocket_name} ${payloads[0].payload_id} image patch`} />
      <div className="item-container">
        <div className="mission-item-details">
          <div className="detail-header">
            <label>{`${rocket.rocket_name} - ${payloads[0].payload_id}`}</label>{isFailedMission(missionItem)}
          </div>
          <div className="detail-launch">
            {`Launched on ${formatDate(launch_date_local)} at ${formatTime(launch_date_local)} from ${launch_site.site_name}`}
          </div>
        </div>
        <div className="button-container">
          {getButtons(links)}          
        </div>
      </div>
      <div className="flight-details">
        <div className="flight-number">{`#${flight_number}`}</div>
        <div className="flight-number-label">Flight Number</div>
      </div>
    </div>
  )
}

export default MissionItemComponent;    