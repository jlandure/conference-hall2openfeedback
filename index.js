const file = require("./event-tz-nantes-2021-2.json");
const getTag = (id) => {
  const item = file.categories.find((cat) => cat.id === id);
  return (item && item.name) || "Unknown";
};

const getTrack = (id) => {
  const item = file.tracks.find((track) => track.id === id);
  return (item && item.room) || "Unknown";
};

const sessions = {};
file.talks = file.talks.map(talk => {
  const startTime = "2021-09-24T"+talk.startTime.replace("h",":")+":00+02:00"
  const endTime = new Date(new Date(startTime).getTime() + 25*60000);
  return {
    ...talk,
    startTime,
    endTime: "2021-09-24T"+endTime.getHours().toString().padStart(2,'0')+":"+endTime.getMinutes()+":00+02:00"
  };
})
file.talks.sort((t1,t2)=> new Date(t1.startTime) - new Date(t2.startTime))
file.talks.forEach((talk, index) => {
  sessions[index] = {
    title: talk.title,
    description: talk.abstract,
    tags: [getTag(talk.categories)],
    speakers: talk.speakers,
    id: index,
    trackTitle: talk.track,
    startTime: talk.startTime,
    endTime: talk.endTime
    // startTime: "2019-04-23T08:30:00+02:00",
    // trackTitle: "Zenika",
  };
});



//"startTime":"2021-04-23T09:30:00+02:00","endTime":"2021-04-23T10:30:00+02:00","trackTitle":"Nantes"

const speakers = {};
file.speakers.forEach((speaker, index) => {
  speakers[speaker.uid] = {
    company: "Zenika",
    name: speaker.displayName,
    photoUrl: speaker.photoURL,
    socials: [],
    id: speaker.uid,
  };
});

console.log(JSON.stringify({ sessions, speakers }, null, true));
