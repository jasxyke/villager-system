import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const requestUserPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
};

export default requestUserPermission;
