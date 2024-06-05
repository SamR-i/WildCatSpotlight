// import EventCard from '../EventCardComponent/EventCard.jsx';
// import EventDisplay from '../EventDetailComponent/EventDisplay';
import { faArrowTurnUp, faArrowLeft, faCalendar, faLocationDot, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, getDoc } from "firebase/firestore";
import React from 'react';
import { firestore } from "../../utilities/firebase";
import AttendButton from '../AttendComponent/AttendButton';
import './EventPage.css';






const EventPage = ({ onExitButtonClick, eventInfo, onOrgButtonClick }) => {
    const details = eventInfo
    const attending = details.attending;
    const capacity = details.eventCapacity;
    const description = details.eventDesc;
    const startTime = details.eventStart
    const endTime = details.eventEnd;
    const location = details.eventLoc;
    const name = details.eventName;
    const photo = details.eventPhoto;
    const ticket = details.eventTicket;
    const org = details.orgName;
    const orgID = details.orgID;

    const getOrgPhoto = async (userId) => {
        const orgPhoto = ''
        try {
            const userDocRef = doc(firestore, 'users', userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const orgPhoto = userData.profilePicture || '';
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }

        return orgPhoto;
    };

    const handleCancel = async () => {
        onExitButtonClick();
    }

    const formatDateHeading = (date) => {
        const newDate = new Date(date);
        const day = ('0' + newDate.getDate()).slice(-2);
        const month = newDate.toLocaleString('en-us', { month: 'short' });
        const year = newDate.getFullYear()
        return `${day} ${month}, ${year}`;
    };

    const militaryToNot = (hour) => {
        if (hour > 12) {
            hour -= 12;
        }

        return hour;
    }

    const dayNumberToName = (number) => {
        const mapping = ['Sunday', 'Monday', 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"]

        return mapping[number]
    }

    const formatMinutes = (minutes) => {
        if (minutes.toString().length == 1) {
            return `0${minutes}`;
        } else {
            return minutes;
        }
    }

    const formatTime = (date1, date2) => {
        const Date1 = new Date(date1);
        const Date2 = new Date(date2);
        const locale1 = Date1.toLocaleString();
        const locale2 = Date2.toLocaleString();
        const day = dayNumberToName(Date1.getDay());
        const startHour = militaryToNot(Date1.getUTCHours());
        const startMinute = formatMinutes(Date1.getUTCMinutes());
        const endHour = militaryToNot(Date2.getUTCHours());
        const endMinute = formatMinutes(Date2.getUTCMinutes());
        const am1 = locale1.slice(-2);
        const am2 = locale2.slice(-2);

        return `${day}, ${startHour}:${startMinute}${am1} - ${endHour}:${endMinute}${am2}`;
    };

    const formatLocation = (location) => {
        const newLoc = location.slice(0, -20)

        return newLoc;
    }

    const handleOrgClick = () => {
        onOrgButtonClick(details);
    }

    return (
        <div>
            <button className="back-nav" onClick={handleCancel}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <button className="back-nav-text">Events</button>
            </button>
            <div className="attend-info">
                <div className="user-icon-container">
                    <FontAwesomeIcon className="user-icon" icon={faUser} />
                </div>
                <div style={{ marginLeft: "-25px" }} className="user-icon-container">
                    <FontAwesomeIcon className="user-icon" icon={faUser} />
                </div>
                <div style={{ marginLeft: "-25px" }} className="user-icon-container">
                    <FontAwesomeIcon className="user-icon" icon={faUser} />
                </div>
                <div className='going'>{attending} Going</div>
                <AttendButton eventData={details} />
            </div>
            <div className="event-detail-photo" style={{ backgroundImage: `url(${eventInfo.eventPhoto})` }} />
            <div className="event-info-display">
                <div className="event-detail-title">{name}</div>

                <div style={{ marginTop: "28px", marginBottom: "28px", display: "flex", flexDirection: "column", rowGap: "16px" }}>

                    <div className="event-date-container">
                        <div className="calendar-icon-container">
                            <FontAwesomeIcon className="calendar-icon" icon={faCalendar} />
                        </div>
                        <div className="event-date-container-2">
                            <div style={{ fontSize: "16px" }}>{formatDateHeading(startTime)}</div>
                            <div style={{ fontSize: "12px", color: "#747688" }}>{formatTime(startTime, endTime)}</div>
                        </div>
                    </div>

                    <div className="event-date-container">
                        <div className="calendar-icon-container" >
                            <FontAwesomeIcon className="calendar-icon" icon={faLocationDot} />
                        </div>
                        <div className="location-text">{formatLocation(location)}</div>
                    </div>

                    <div className="event-date-container">
                        <div className="calendar-icon-container" >
                            <FontAwesomeIcon className="calendar-icon" icon={faUsers} />
                        </div>
                        <div className="event-date-container-2">
                            <button className="location-text" onClick={handleOrgClick}>{org}</button>
                            <div style={{ fontSize: "12px", color: "#747688" }}>Organizer</div>
                        </div>
                    </div>

                </div>

                <div className="about-event" >About Event</div>
                <div className="event-description">{description}</div>
                {/* <div>ticket: {ticket}</div> */}
                {/* <EventCard eventInfo={details} key={details.eventID} /> */}
                {/* <EventDisplay eventData={eventInfo} /> */}
            </div>
            <button className="tickets-button" onClick={() => window.location.href = 'https://www.ticketmaster.com'}>
                TICKETS <FontAwesomeIcon icon = {faArrowTurnUp} />
            </button>
        </div >
    );
}

export default EventPage;