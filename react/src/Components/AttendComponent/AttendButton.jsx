import { arrayRemove, arrayUnion, doc, runTransaction } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { firestore, getCurrentUserID } from '../../utilities/firebase';

const AttendButton = ({ eventData }) => {
    const [attending, setAttending] = useState(false);
    const [eventInfo, setEventInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [attendeeCount, setAttendeeCount] = useState(0);

    useEffect(() => {
        setEventInfo(eventData);
        setAttendeeCount(eventData.attending || 0);
    }, [eventData]);

    useEffect(() => {
        const userId = getCurrentUserID();
        const userDocRef = doc(firestore, "users", userId);
        runTransaction(firestore, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setAttending(userData.attendingEvents?.includes(eventData.id));
            }
        }).catch(err => console.error("Failed to fetch user data:", err));
    }, [eventData.id]);


    const handleAttendClick = async () => {
        setLoading(true); // Set loading to true when the operation begins
        const userId = getCurrentUserID();
        const eventRef = doc(firestore, "events", eventData.id);
        const userRef = doc(firestore, "users", userId);

        try {
            await runTransaction(firestore, async (transaction) => {
                const eventDoc = await transaction.get(eventRef);
                const userDoc = await transaction.get(userRef);

                if (eventDoc.exists() && userDoc.exists()) {
                    const newAttendeeCount = attending ? eventDoc.data().attending - 1 : eventDoc.data().attending + 1;
                    if (newAttendeeCount >= 0) {
                        transaction.update(eventRef, { attending: newAttendeeCount });
                    }

                    if (attending) {
                        transaction.update(userRef, { attendingEvents: arrayRemove(eventData.id) });
                    } else {
                        transaction.update(userRef, { attendingEvents: arrayUnion(eventData.id) });
                    }
                }
            });

            setAttending(!attending);

            setAttendeeCount(prev => attending ? (prev - 1) : prev + 1);
        } catch (e) {
            console.error("Transaction failed: ", e);
        }
        setLoading(false); // Set loading to false once the operation is complete
    };

    return (
        <button className={(attending ? "attending-button-yes" : "attending-button-no")} onClick={handleAttendClick} disabled={loading}>
            {loading ? "Processing..." : (attending ? "✓ Attending" : "+ Attending")}
        </button>
    )
}

export default AttendButton;