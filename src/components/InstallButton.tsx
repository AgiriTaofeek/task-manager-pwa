import React, { useState, useEffect } from "react";
import { useInstallPrompt } from "../hooks/use-install-prompt";

const InstallButton: React.FC = () => {
  const deferredPrompt = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (deferredPrompt) {
      setIsVisible(true);
    }
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setIsVisible(false); // Hide the button after the prompt
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        padding: "30px",
        backgroundColor: "#fff",
      }}
    >
      Install App
    </button>
  );
};

export default InstallButton;
