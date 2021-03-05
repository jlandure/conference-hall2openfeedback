const file = require("./export-1614937793734.json");

const speakers = file.speakers.sort((s1, s2) =>
  s1.email.localeCompare(s2.email)
);
speakers.forEach((speaker, index) => {
  console.log(speaker.email);
});
console.log(" 💪 " + speakers.length);
