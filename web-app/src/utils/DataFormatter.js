export function formatFullName(
  firstname,
  middlename,
  lastname,
  lastNameFirst = true
) {
  if (middlename === null) {
    middlename = "";
  } else {
    middlename = middlename.slice(0, 1).toUpperCase() + ".";
  }
  lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

  firstname = firstname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(" ");

  if (lastNameFirst) {
    return lastname + ", " + firstname + " " + middlename;
  } else {
    return firstname + " " + middlename + " " + lastname;
  }
}

export function formatName(name) {
  name = name
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return name;
}

export function formatUserName(user, lastNameFirst) {
  return formatFullName(
    user.firstname,
    user.middlename,
    user.lastname,
    lastNameFirst
  );
}

export function converTime(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

export function calculateAge(birthDateString) {
  // Split the birthDateString to extract year, month, and day
  const [year, month, day] = birthDateString.split("-").map(Number);

  // Create a new Date object with the extracted year, month, and day
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed

  // Get today's date
  const today = new Date();

  // Calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the birth date hasn't occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

export function formatTime(timeString) {
  // Parse the time string into hours and minutes
  const [hours, minutes] = timeString.split(":");
  // Format the time as hh:mm
  return `${hours}:${minutes}`;
}
