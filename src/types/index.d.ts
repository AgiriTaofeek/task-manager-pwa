// Extend the WindowEventMap interface to include BeforeInstallPromptEvent
interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
}

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}
