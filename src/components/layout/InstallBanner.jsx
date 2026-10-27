import { useState } from 'react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';

/** "Add to home screen" card shown when the browser reports the site is installable. */
export default function InstallBanner() {
  const { canInstall, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('lws-install-dismissed') === '1');
  if (!canInstall || dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem('lws-install-dismissed', '1');
    setDismissed(true);
  };

  return (
    <div className="install" role="dialog" aria-label="Install the LWS app">
      <div>
        <b>Install LWS</b>
        <span>Add the app to your home screen for faster access.</span>
      </div>
      <button type="button" className="btn p" onClick={install}>Install</button>
      <button type="button" className="install-x" aria-label="Dismiss" onClick={dismiss}>×</button>
    </div>
  );
}
