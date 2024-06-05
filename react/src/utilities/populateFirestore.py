import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase Admin SDK with your project's credentials
# Replace 'path/to/your/serviceAccountKey.json' with the path to your Firebase project's service account key file
cred = credentials.Certificate('Wildcat Spotlight Firebase Admin.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# Your events data
users_data = [
    {
        "userID": "FRbtIAlHBqSOUUklyRjwu5tFQPp1",
        "fullName":  "NU Theater Club",
        "email": "ryanopatka2023@u.northwestern.edu",
        "profilePicture": "https://dailynorthwestern.com/wp-content/uploads/2023/08/Theater-Lily-ogburn-1200x800.jpg",
        "bio": "Bringing theater magic to Northwestern and beyond. Stay tuned for productions and workshops!",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["1000303104444","10003031234534643"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "4peRi6gy9nfaX8bhxE3nGfqewLH3",
        "fullName":  "Cinephile Society",
        "email": "devanshipatel2023@u.northwestern.edu",
        "profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjZdLaVF6wi2QCLiHSPzb6A_RDmpcbuXEuVpWB4xp8w&s",
        "bio": "Celebrating cinema with screenings and discussions. Lights, camera, action!",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["4953945789349"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "K4Ua2x805agWyYM96IRb1uel5EJ3",
        "fullName":  "Windy Rockers",
        "email": "samridet2025@u.northwestern.edu",
        "profilePicture": "https://assets1.ignimgs.com/2015/10/02/rockband41280jpg-9b2f70_160w.jpg?width=1280",
        "bio": "Rocking out in the Windy City! Join us for music discovery and jam sessions.",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["100030349798314"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "fullName":  "NU Music Ensemble",
        "email": "philipho2025@u.northwestern.edu",
        "profilePicture": "https://www.music.northwestern.edu/sites/default/files/2023-03/NUSO_2023.1_1.jpg",
        "bio": "Uniting musicians at Northwestern for rehearsals and concerts. Let's make music!",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["132322300030316","1000309084900318","1000303332211"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "QJw0Uw70XjePJbSKX3wR1XtL5x63",
        "fullName":  "NU Laugh Factory",
        "email": "robertyang2023@u.northwestern.edu",
        "profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHPd8LCY2Frci503YHGjjDNBBw-lfd7DfcSXbaAc6UQ&s",
        "bio": "Spreading laughter with stand-up and improv. Get ready for comedy gold!",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["44334100030321","143534500030315"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "fullName":  "NU Conference Association",
        "email": "conference@u.northwestern.edu",
        "profilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1h8qJ7HkolQbWUDQ9ewoCO2jIkrsf3cmYToJj9TMgA&s",
        "bio": "Connecting minds through premier conferences at Northwestern University. Stay tuned for upcoming events and join us in shaping the future!",
        "orgStatus": True,
        "favoriteEvents" : [],
        "attendingEvents" : [],
        "hostingEvents" : ["233223100030322","32453253100030320","13434400030317"],
        "following" : [],
        "followers" : []
    },
    {
        "userID": "pk1uaNdiCKSyBIETz1ZCiX4hgDS2",
        "fullName": "John Long",
        "email": "ry@u.northwestern.edu",
        "profilePicture": "https://firebasestorage.googleapis.com/v0/b/wildcat-spotlight.appspot.com/o/profilePictures%2FPicture%20of%20me.png?alt=media&token=22924a92-6566-4fe3-be0c-6900eb3804d1",
        "bio": "Hello Friends!",
        "orgStatus": False,
        "favoriteEvents": ["4953945789349", "32453253100030320", "1000309084900318", "1000303104444"],
        "attendingEvents": ["100030349798314", "44334100030321"],
        "hostingEvents": [],
        "following": [],
        "followers": []}

]

events_data = [
    {
        "eventID": 1000309084900318,
        "eventName": "Classical Music Evening",
        "eventLoc": "700 University Pl, Evanston, IL 60208",
        "eventDesc": "An elegant evening of classical music performances.",
        "eventStart": "2024-04-24T19:00:00Z",
        "eventEnd": "2024-04-24T21:00:00Z",
        "orgID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "orgName": "NU Music Ensemble",
        "eventPhoto": "https://static01.nyt.com/images/2019/06/14/arts/14listings-classical2/merlin_155916339_f4a48136-9fdb-4a5b-8a07-96272af821ba-superJumbo.jpg",
        "userID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "attending": 20,
        "eventCapacity": 50,
        "eventType": "Music",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.051367337695886,
        "longitude": -87.6802971176556,
        "timePosted": "2024-04-13T11:00:00Z"
    },
    {
        "eventID": 100030349798314,
        "eventName": "Rock Band Blast",
        "eventLoc": "1999 Campus Dr, Evanston, IL 60208",
        "eventDesc": "Rock out with Northwestern's finest student and alumni rock bands.",
        "eventStart": "2024-05-01T17:30:00Z",
        "eventEnd": "2024-05-01T19:00:00Z",
        "orgID": "K4Ua2x805agWyYM96IRb1uel5EJ3",
        "orgName": "Windy Rockers",
        "eventPhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsOAI6jOtmqJRC3IyqjNQBQG14zSCcU64v1hOPzUR2JQ&s",
        "userID": "K4Ua2x805agWyYM96IRb1uel5EJ3",
        "attending": 12,
        "eventCapacity": 50,
        "eventType": "Music",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05356636679025,
        "longitude": -87.67275848881947,
        "timePosted": "2024-04-19T19:00:00Z"
    },
    {
        "eventID": 4953945789349,
        "eventName": "Global Film Festival",
        "eventLoc": "1920 Campus Dr, Evanston, IL 60201",
        "eventDesc": "A weekend festival featuring films from around the world, curated by Northwestern's film studies students.",
        "eventStart": "2024-04-26T18:00:00Z",
        "eventEnd": "2024-04-26T22:00:00Z",
        "orgID": "4peRi6gy9nfaX8bhxE3nGfqewLH3",
        "orgName": "Cinephile Society",
        "eventPhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIo5fZOCoheEoRCv6kwJF63-nK0XfPdHctKPeNasNGuA&s",
        "userID": "4peRi6gy9nfaX8bhxE3nGfqewLH3",
        "attending": 32,
        "eventCapacity": 50,
        "eventType": "Cinema",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05246163451381,
        "longitude": -87.67498100045847,
        "timePosted": "2024-04-24T19:00:00Z"
    },
    {
        "eventID": 32453253100030320,
        "eventName": "Eco-Sustainability Conference",
        "eventLoc": "1881 Sheridan Rd, Evanston, IL 60208",
        "eventDesc": "Join us for insightful discussions and workshops on sustainability and green initiatives.",
        "eventStart": "2024-04-25T14:00:00Z",
        "eventEnd": "2024-04-25T15:00:00Z",
        "orgID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "orgName": "NU Conference Association",
        "eventPhoto": "https://www.aljazeera.com/wp-content/uploads/2019/10/94e37524b6014329b60a5889f8ef5134_18.jpeg?resize=770%2C513&quality=80",
        "userID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "attending": 13,
        "eventCapacity": 50,
        "eventType": "Conference",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.051442704023415,
        "longitude": 87.6762787734751,
        "timePosted": "2024-04-10T19:00:00Z"
    },
    {
        "eventID": 44334100030321,
        "eventName": "Poetry Slam Night",
        "eventLoc": "2021 Sheridan Rd, Evanston, IL 60208",
        "eventDesc": "A night of powerful spoken word and poetry performances from Northwestern's most talented poets.",
        "eventStart": "2024-04-29T19:00:00Z",
        "eventEnd": "2024-04-29T21:00:00Z",
        "orgID": "QJw0Uw70XjePJbSKX3wR1XtL5x63",
        "orgName": "NU Laugh Factory",
        "eventPhoto": "https://scottwoodsmakeslists.files.wordpress.com/2015/07/poetry_vancouver.jpg",
        "userID": "QJw0Uw70XjePJbSKX3wR1XtL5x63",
        "attending": 55,
        "eventCapacity": 50,
        "eventType": "Poetry",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.055170977462986,
        "longitude": -87.67499131314887,
        "timePosted": "2024-04-01T19:00:00Z"
    },
    {
        "eventID": 1000303104444,
        "eventName": "Comedy Night",
        "eventLoc": "50 Arts Cir Dr, Evanston, IL 60208",
        "eventDesc": "A lineup of Northwestern's funniest comedians ready to make you laugh.",
        "eventStart": "2024-04-26T16:00:00Z",
        "eventEnd": "2024-04-26T18:00:00Z",
        "orgID": "FRbtIAlHBqSOUUklyRjwu5tFQPp1",
        "orgName": "NU Theater Club",
        "eventPhoto": "https://media.cntraveler.com/photos/5c2cfd936b0c2057eb60d57b/master/pass/The-Stand_DSC_1824.jpg",
        "userID": "FRbtIAlHBqSOUUklyRjwu5tFQPp1",
        "attending": 23,
        "eventCapacity": 50,
        "eventType": "Comedy",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05286533339967,
        "longitude": -87.67222787162234,
        "timePosted": "2024-04-23T19:00:00Z"
    },
    {
        "eventID": 1000303332211,
        "eventName": "A Cappella Concert",
        "eventLoc": "1999 Campus Dr, Evanston, IL 60208",
        "eventDesc": "An evening of stunning vocal performances by Northwestern's premier a cappella groups.",
        "eventStart": "2024-05-04T17:00:00Z",
        "eventEnd": "2024-05-04T20:30:00Z",
        "orgID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "orgName": "NU Music Ensemble",
        "eventPhoto": "https://images.squarespace-cdn.com/content/v1/57e01ea36b8f5b62f6667771/1519936557004-TYS7UIUMEUR6S9LZEON8/UMass+Doo+Wop+Shop+%281%29.JPG",
        "userID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "attending": 45,
        "eventCapacity": 50,
        "eventType": "Music",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05356636679025,
        "longitude": -87.67275848881947,
        "timePosted": "2024-04-19T19:00:00Z"
    },
    {
        "eventID": 10003031234534643,
        "eventName": "Theater Night",
        "eventLoc": "50 Arts Cir Dr, Evanston, IL 60208",
        "eventDesc": "A selection of captivating plays and musicals performed by talented student actors.",
        "eventStart": "2024-05-27T18:00:00Z",
        "eventEnd": "2024-05-27T19:00:00Z",
        "orgID": "FRbtIAlHBqSOUUklyRjwu5tFQPp1",
        "orgName": "NU Theater Club",
        "eventPhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5JplwCeKXoXvuwDg-RJ_YHBdjYO0YZG4p3Qpk7bxu6w&sb",
        "userID": "FRbtIAlHBqSOUUklyRjwu5tFQPp1",
        "attending": 34,
        "eventCapacity": 50,
        "eventType": "Theater",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05286533339967,
        "longitude": -87.67226005813065,
        "timePosted": "2024-04-14T19:00:00Z"
    },
    {
        "eventID": 132322300030316,
        "eventName": "Jazz Under the Stars",
        "eventLoc": "1937 Sheridan Rd, Evanston, IL 60208",
        "eventDesc": "Experience an enchanting evening of jazz music under the open sky, featuring Northwestern's jazz ensembles.",
        "eventStart": "2024-05-15T20:00:00Z",
        "eventEnd": "2024-05-15T23:00:00Z",
        "orgID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "orgName": "NU Music Ensemble",
        "eventPhoto": "https://jazzforumarts.org/wp-content/uploads/2023/01/Jazz-musicians-playing-at-the-Dobbs-Ferry-Summer-Concert-768x512.webp",
        "userID": "6lueIA0d1CbWQtcxvoQKyRfkbPm1",
        "attending": 29,
        "eventCapacity": 50,
        "eventType": "Music",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.053383464789185,
        "longitude": -87.67648281580281,
        "timePosted": "2024-04-19T19:00:00Z"
    },
    {
        "eventID": 13434400030317,
        "eventName": "Tech Innovations Symposium",
        "eventLoc": "2133 Sheridan Rd, Evanston, IL 60201",
        "eventDesc": "A day-long symposium showcasing cutting-edge technology projects by Northwestern students.",
        "eventStart": "2024-05-12T09:00:00Z",
        "eventEnd": "2024-05-12T12:00:00Z",
        "orgID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "orgName": "NU Conference Association",
        "eventPhoto": "https://marvel-b1-cdn.bc0a.com/f00000000277771/sitecorecms.bsu.edu//-/media/www/departmentalcontent/biology/images/science-fair/science-fair-aerial-photo---cropped.jpg?h=561&w=1000&hash=452E5804250948E9CF25543803B71B9A9BCB3EE0",
        "userID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "attending": 4,
        "eventCapacity": 50,
        "eventType": "Conference",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05715835782058,
        "longitude": -87.67674063114703,
        "timePosted": "2024-04-22T19:00:00Z"
    },
    {
        "eventID": 233223100030322,
        "eventName": "Health and Wellness Fair",
        "eventLoc": "1999 Campus Dr, Evanston, IL 60208",
        "eventDesc": "Discover wellness resources, participate in fitness demos, and connect with health professionals.",
        "eventStart": "2024-05-13T12:00:00Z",
        "eventEnd": "2024-05-13T14:00:00Z",
        "orgID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "orgName": "NU Conference Association",
        "eventPhoto": "https://www.himss.org/sites/hde/files/media/image/2022/08/24/coming-to-chicago-2023-himss-global-health-conference-exhibition.jpg",
        "userID": "asa4XOFCa9UD2GdizwoeEus1JJz2",
        "attending": 45,
       "eventCapacity": 50,
        "eventType": "Conference",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.05356636679025,
        "longitude": -87.67275848881947,
        "timePosted": "2024-04-14T19:00:00Z"
    },
    {
        "eventID": 143534500030315,
        "eventName": "Improv Showdown",
        "eventLoc": "Northwestern University, 2031 Sheridan Rd, Evanston, IL 60201",
        "eventDesc": "A hilarious night of improvisation, where anything can happen.",
        "eventStart": "2024-04-30T19:00:00Z",
        "eventEnd": "2024-04-30T23:00:00Z",
        "orgID": "QJw0Uw70XjePJbSKX3wR1XtL5x63",
        "orgName": "NU Laugh Factory",
        "eventPhoto": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Teatersport_-4.jpg",
        "userID": "QJw0Uw70XjePJbSKX3wR1XtL5x63",
        "attending": 60,
        "eventCapacity": 50,
        "eventType": "Comedy",
        "eventDuration": "5 hours",
        "eventTicket": "https://www.ticketmaster.com/",
        "latitude": 42.054976028953334,
        "longitude": -87.67600194834428,
        "timePosted": "2024-04-25T19:00:00Z"
    }
]

# Function to add an event to the Firestore database
def add_event(event):
    doc_ref = db.collection('events').document(str(event['eventID']))
    doc_ref.set(event)

# Iterate over the events data and add each event to the database
def add_user(user):
    doc_ref = db.collection('users').document(str(user['userID']))
    doc_ref.set(user)

# Iterate over the events data and add each event to the database
for user in users_data:
    add_user(user)

for event in events_data:
    add_event(event)

print("Data has been successfully added to Firestore.")
