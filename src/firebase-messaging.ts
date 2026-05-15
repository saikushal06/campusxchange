import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./firebase";

const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BM4qu7U1qFhb31Ns679r5yr5FeVnx9nfDBsBMncCKlU7ZMX_6X0HMhOyG827glDudLe7BifWwJa0IVIKNrTkRtw",
    });

    console.log("FCM Token:", token);
    alert("Push notifications enabled!");
  } catch (error) {
    console.error(error);
  }
}