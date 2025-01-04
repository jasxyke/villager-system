export const calculatePrice = (
  amenity,
  startTime,
  endTime,
  numResidents = 0,
  numGuests = 0,
  isGuest = false
) => {
  if (!startTime || !endTime) return 0;

  const startHour = parseInt(startTime.split(":")[0], 10);
  const endHour = parseInt(endTime.split(":")[0], 10);

  // Handle duration calculation correctly
  let duration = endHour - startHour;
  if (duration < 0) duration += 24; // Handle cases where end time is on the next day

  const isDayTime = startHour >= 6 && endHour <= 18;

  let basePrice;

  if (amenity.is_per_group) {
    // If the amenity is priced per group
    basePrice = isDayTime ? amenity.day_price : amenity.night_price;

    // Apply guest-specific logic for group-based pricing
    if (isGuest) {
      basePrice = parseFloat(basePrice);
      basePrice += parseFloat(amenity.guest_additional_price); // Add a guest-specific fee if applicable
    }
  } else {
    // If the amenity is priced per person
    const perPersonPrice = isDayTime
      ? amenity.day_per_person_price
      : amenity.night_per_person_price;

    const residentCost = numResidents * perPersonPrice;
    const guestCost =
      numGuests *
      (Number(perPersonPrice) + Number(amenity.guest_additional_price));

    basePrice = residentCost + guestCost;
  }

  return basePrice * duration;
};
