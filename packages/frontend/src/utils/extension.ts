import { useEffect, useState } from "react";

import { IS_PLUGIN_NOTIFICATION_SHOWN } from "../constants/sessionStorage";

export const useExtensionInstalled = () => {
  const [isPluginNotificationShown, setIsPluginNotificationShown] =
    useState(true);

  const handleExtensionNotInstalled = () => {
    const is_plugin_notification_shown = JSON.parse(
      sessionStorage.getItem(IS_PLUGIN_NOTIFICATION_SHOWN)
    );
    if (is_plugin_notification_shown === false)
      setIsPluginNotificationShown(false);
    else setIsPluginNotificationShown(true);
  };

  useEffect(() => {
    // Implemented based on the below link
    // https://stackoverflow.com/questions/6293498/check-whether-user-has-a-chrome-extension-installed
    if (chrome.runtime) {
      chrome.runtime.sendMessage(
        process.env.REACT_APP_EXTENSION_ID,
        { message: "version" },
        (reply) => {
          if (chrome.runtime.lastError) {
            // handle error
          }
          if (reply) {
            if (reply.version) {
              // If the extension is installed we can see its version in reply.version
              sessionStorage.setItem(IS_PLUGIN_NOTIFICATION_SHOWN, "false");
              setIsPluginNotificationShown(false);
            }
          } else {
            // The extension isn't installed
            handleExtensionNotInstalled();
          }
        }
      );
    } else {
      // The extension isn't installed
      handleExtensionNotInstalled();
    }
  }, []);

  return {
    isPluginNotificationShown,
    setIsPluginNotificationShown,
  };
};

export default {
  useExtensionInstalled,
};
