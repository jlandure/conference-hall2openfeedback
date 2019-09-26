const file = require("./export.json");
const getTag = id => {
  const item = file.categories.find(cat => cat.id === id);
  return (item && item.name) || "Unknown";
};

const sessions = {};
file.talks.forEach((talk, index) => {
  sessions[index] = {
    title: talk.title,
    description: talk.abstract,
    tags: [getTag(talk.categories)],
    speakers: talk.speakers,
    id: index,
    startTime: "2019-09-27T09:30:00+02:00",
    endTime: "2019-09-27T18:00:00+02:00",
    trackTitle: "Zenika Nantes"
  };
});

const speakers = {};
file.speakers.forEach((speaker, index) => {
  speakers[speaker.uid] = {
    company: "Zenika",
    name: speaker.displayName,
    photoUrl: speaker.photoURL,
    socials: [],
    id: speaker.uid
  };
});

console.log(JSON.stringify({ sessions, speakers }, null, true));
