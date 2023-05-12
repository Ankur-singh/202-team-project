// define locations
const locations = ["San Jose", "San Francisco", "Santa Clara", "Santa Cruz"];

// define start and end times (8am to 10pm)
const startHour = 8;
const endHour = 22;

// define duration of each class (1 hour)
const classDuration = 3600;

// define date range (next 7 days)
const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 7);

// define array to store classes
const classes = [];

// loop through each location and each day to generate classes
for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
  for (let hour = startHour; hour <= endHour; hour++) {
    // generate random enrollment number (0 to 10)

    // generate random minutes (0 to 59)
    const minutes = Math.floor(Math.random() * 60);

    // create ISO date string
    const dateString = date.toISOString().substring(0, 10);

    // create ISO time string
    const timeString = `${dateString}T${hour.toString().padStart(2, "0")}:00:00`;

    // generate class object
    const newClass = {
      name: ["Cross Fit", "Yoga", "Zumba"][Math.floor(Math.random() * 3)],
      time: timeString,
      // Generte between 0 and 4
      enrollment: Math.floor(Math.random() * 5),
      duration: classDuration,
      instructor: null,
      description: null,
      location: locations[Math.floor(Math.random() * locations.length)]
    };

    // add class object to classes array
    classes.push(newClass);

  }
}

// print classes array to console
console.log(classes);

// Save to file
const fs = require("fs");
fs.writeFileSync("classes.json", JSON.stringify(classes));
