import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { MdOutlineExplore, MdOutlineMap } from 'react-icons/md';
import { AppContext } from '../../AppContext/index.jsx';
import { getCurrentUserID } from '../../utilities/firebase';
import { auth, getUserInfo } from '../../utilities/firebase.js';
import EventPage from '../EventPageComponent/EventPage.jsx';
import EventEdit from '../EventUploadComponent/EventEdit.jsx';
import EventUpload from '../EventUploadComponent/EventUpload.jsx';
import Home from '../Home/Home.jsx';
import CardProfile from '../ProfileComponent/CardProfile.jsx';
import ProfilePage from '../ProfileComponent/ProfilePage.jsx';
import Map from './Map.jsx';
import Notifications from './Notifications.jsx';
import useIconLinks from './icons.jsx';
import './navBar.css';
const NavBar = () => {
  // const wholeSearchComponent = <WholeSearch />; 
  const { cardId, setCardId, clicked, setClicked, IconExplore, IconProfile, IconUpload, IconMap, IconNotif, IconOtherProfile } = useIconLinks();

  const [] = useState('');
  const { appTheme } = useContext(AppContext)
  const [refresh, setRefresh] = useState(false);
  const [orgStatus, setOrgStatus] = useState(false);
  const authUserId = auth.currentUser.uid;
  const [editEventId, setEditEventId] = useState(0);
  const [clickedEvent, setClickedEvent] = useState('');
  const [previousPage, setPreviousPage] = useState(0)
  async function checkApplicationStatus() {
    const userData = await getUserInfo()
    console.log(userData)
    const status = userData.orgStatus
    setOrgStatus(status)

  }

  useEffect(() => {
    checkApplicationStatus()
  })
  console.log(orgStatus)
  useEffect(() => {
    if (clicked === 2 && !orgStatus) {
      alert("You need to be an organization to post events. Apply now in the profile tab!");
      setClicked(0);
    }
  }, [clicked, orgStatus]);


  // Function to update event data in Home component
  const updateEventData = () => {
    setRefresh(prevState => !prevState); // Toggle refresh state to force re-render
  };
  const handlePostButtonClick = () => {
    // Update the state in NavBar component when the post button is clicked
    setClicked(0);
    // window.location.reload();
  };
  const handlePostButtonClick2 = () => {
    // Update the state in NavBar component when the post button is clicked
    setClicked(1);
    // window.location.reload();
  };
  const handleCancelButtonClick = () => {
    setClicked(previousPage);
  }
  const handleCancelButtonClick2 = () => {
    setClicked(1);
  }

  const handleEventClick = (eventInfo) => {
    setPreviousPage(clicked)
    setClickedEvent(eventInfo);
    setClicked(7);
  }

  const handleOrgClick = (eventInfo) => {
    if (getCurrentUserID() != eventInfo.userID) {
      setPreviousPage(clicked)
      console.log("Clicked");
      setCardId(eventInfo.userID);
      console.log(cardId);
      setClicked(5);
    }
  }


  return (
    <div>
      <div className={(clicked === 9 || clicked === 7) ? "nav-bar-hidden" : "bottom-nav-bar"} style={{ zIndex: 99 }}>
        <div className="nav-icon" onClick={IconExplore}>
          <MdOutlineExplore style={{ cursor: 'pointer' }} />
          <div className="navFont">
            Explore
          </div>
        </div>
        <div className="nav-icon" onClick={IconNotif}>
          <IoNotificationsCircleOutline style={{ cursor: 'pointer' }} />
          <div className="navFont">
            Notifications
          </div>
        </div>


        <div className="nav-icon special-icon" onClick={IconUpload} style={{ width: "40px", position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>

          <div className="icon-with-shape" style={{ display: orgStatus && true || 'none' }}>
            <FontAwesomeIcon icon="fa-solid fa-circle-plus" className={orgStatus ? "addButton" : "addButtonDisabled"} />
            <div className="white-shape"></div> {/* This is the white shape */}
          </div>
        </div>

        <div className="nav-icon" onClick={IconMap}>
          <MdOutlineMap style={{ cursor: 'pointer' }} />
          <div className="navFont">
            Map
          </div>
        </div>
        <div className="nav-icon" onClick={IconProfile}>
          <CgProfile style={{ cursor: 'pointer' }} />
          <div className="navFont">
            Profile
          </div>
        </div>
        {/* <div className="nav-icon" onClick={signOutCustom} style={{color: appTheme.themeColor}}>

          <FaSignOutAlt style={{ cursor: 'pointer' }} />
          <div className="navFont">
            Sign Out
          </div>
        </div> */}
      </div>
      <div className="webbody">
        {clicked == 0 && (
          <Home
            clicked={clicked}
            cardId={cardId}
            setCardId={setCardId}
            setClicked={setClicked}
            onEventClick={handleEventClick}
          />
        )}
        {clicked == 1 && (
          <ProfilePage userId={authUserId} setClicked={setClicked} editID={setEditEventId} onEventClick={handleEventClick}/>
        )}
        {clicked == 2 && (
          <EventUpload onPostButtonClick={handlePostButtonClick} onCancelButtonClick={handleCancelButtonClick} updateEventData={updateEventData} />
        )}
        {clicked == 3 && (
          <Map onEventClick={handleEventClick}/>
        )}
        {clicked === 4 && (
          <Notifications onEventClick={handleEventClick}/>
        )}
        {clicked === 5 && (
          <CardProfile userId={cardId} setClicked={setClicked} onEventClick={handleEventClick} />
        )}
        {clicked === 6 && (
          <EventEdit onPostButtonClick={handlePostButtonClick2} onCancelButtonClick={handleCancelButtonClick2} updateEventData={updateEventData} editID={editEventId} setEditID={setEditEventId} />
        )}
        {clicked == 7 && (
          <EventPage onOrgButtonClick={handleOrgClick} onExitButtonClick={handleCancelButtonClick} eventInfo={clickedEvent} />
        )}


      </div>
    </div >
  );

}
export default NavBar;