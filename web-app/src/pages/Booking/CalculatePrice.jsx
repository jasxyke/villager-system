export const calculatePrice = (amenity, startTime, endTime, isResident) => {
  if (!startTime || !endTime) return 0;

  const startHour = parseInt(startTime.split(":")[0], 10);
  const endHour = parseInt(endTime.split(":")[0], 10);

  // Handle duration calculation correctly
  let duration = endHour - startHour;
  if (duration < 0) duration += 24; // Handle cases where end time is on the next day

  const isDayTime = startHour >= 6 && endHour <= 18;

  // Calculate base price based on residency and time of day
  let basePrice;
  if (isResident) {
    basePrice = isDayTime ? amenity.day_price : amenity.night_price;
  } else {
    basePrice = isDayTime
      ? Number(amenity.day_price) + Number(amenity.guest_additional_price)
      : Number(amenity.night_price) + Number(amenity.guest_additional_price);
  }

  return basePrice * duration;
};
