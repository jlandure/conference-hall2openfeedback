const file = require("./devfest2023.json");

const stringForGeneratingShortVid = `
pnpm remotion render remotion/index.tsx DevfestNantesTalkLoop out/${outTitle}.mp4 --props='{"title":"${title}","speakers":${speakers},"date":"${dateStart}","time":"${timeStart}","location":"${track}"}'
`
const stringForSpeaker = [{"name":"Mickaël Alves","picture":"https://pbs.twimg.com/profile_images/1635742650090283013/9qflRryB_400x400.jpg"},{"name":"Antoine Caron","picture":"https://ca.slack-edge.com/T108ZKPMF-U5M2F1A69-36e4b6574de8-192"}]

var outTitle = "modern-web-debugging-with-devt" // id
var title = "🇺🇸Modern Web Debugging with DevTools" // title
var speakers = JSON.stringify(stringForSpeaker) // speakerIds
var dateStart = "19 Octobre" //dateStart
var timeStart = "15:00" // dateStart
var track = "Jules Verne" // trackId

const getSpeaker = (id) => {
  const speaker = file.speakers.find((speaker) => speaker.id === id);
  return {name: speaker.name.replace("\'", "'\\''"), picture: speaker.photoUrl || "TODO"}
}

const getTrack = (id) => {
  const track = file.event.tracks.find((track) => track.id === id);
  return track.name.replace("\'", "'\\''")
}

const shortVidSessions = file.sessions.map(session => {
  //if(session.id !== "-la-checklist-ultime-pour-rend") return 
  const sessionOutTitle = session.id
  const sessionTitle = session.title.replace("\'", "'\\''")
  const sessionSpeakers = session.speakerIds.map(speakerId => {
    return getSpeaker(speakerId);
  })
  var sessionDateStart
  if(session.dateStart.startsWith("2023-10-20")) {
    sessionDateStart = "20 Octobre"
  } else if(session.dateStart.startsWith("2023-10-19")) {
    sessionDateStart = "19 Octobre"
  }
  const dateStart = new Date(session.dateStart)
  const sessionTimeStart = dateStart.getHours() + "h" + dateStart.getMinutes().toString().padStart(2, '0')
  const sessionTrack = getTrack(session.trackId)
  return {sessionOutTitle, sessionTitle, sessionSpeakers, sessionDateStart, sessionTimeStart, sessionTrack}
})
for (session of shortVidSessions) {
  // console.log(`
  // pnpm remotion render remotion/index.tsx DevfestNantesTalkLoop out/${outTitle}.mp4 --props='{"title":"${title}","speakers":${speakers},"date":"${dateStart}","time":"${timeStart}","location":"${track}"}'
  // `);
  console.log(`touch out/${session.sessionOutTitle}.info
  
  `);
  // && pnpm remotion render remotion/index.tsx DevfestNantesTalkLoop out/${session.sessionOutTitle}.mp4 --props='{"title":"${session.sessionTitle}","speakers":${JSON.stringify(session.sessionSpeakers)},"date":"${session.sessionDateStart}","time":"${session.sessionTimeStart}","location":"${session.sessionTrack}"}'
}

