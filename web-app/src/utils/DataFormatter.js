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
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(" ");
  return name;
}
