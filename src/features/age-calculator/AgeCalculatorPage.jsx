import { useState } from 'react';
import HeroIntro from './components/HeroIntro';
import EligibilityForm from './components/EligibilityForm';
import ResultsPanel from './components/ResultsPanel';
import { useEligibilityForm } from './hooks/useEligibilityForm';

export default function AgeCalculatorPage() {
  const [result, setResult] = useState(null);
  const form = useEligibilityForm({ onResult: setResult });

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form.focusName();
  };

  return (
    <>
      <section className="a-hero" id="check">
        <div className="wrap a-grid">
          <HeroIntro scanning={form.scanning} groups={result?.groups} />
          <EligibilityForm form={form} />
        </div>
      </section>

      <ResultsPanel result={result} onReset={handleReset} />
    </>
  );
}
