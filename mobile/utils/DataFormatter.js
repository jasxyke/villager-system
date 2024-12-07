export function formatFullName(firstname, middlename, lastname, lastNameFirst) {
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

export const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  const formattedHour = hourInt % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

export const formatTo12Hour = (time24) => {
  // Parse the input time24
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  const hour12 = hours % 12 || 12; // 12 should be displayed as 12, not 0

  // Format minutes with leading zero if needed
  const minutesFormatted = minutes.toString().padStart(2, "0");

  return `${hour12}:${minutesFormatted} ${period}`;
};

// Format time to 24-hour HH:mm format
export function formatTimeTwentyFour(date) {
  if (!date) return "N/A";
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function convertDateToLaravelFormat(date) {
  if (!(date instanceof Date) || isNaN(date)) return null; // Ensure valid Date object

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  // Return format for date only (YYYY-MM-DD)
  return `${year}-${month}-${day}`;
}
