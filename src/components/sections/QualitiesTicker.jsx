import Marquee from '@/components/common/Marquee';
import { QUALITIES } from '@/data/site';
import '@/styles/sections/ticker.css';

/** Strip of qualities LWS builds in students. */
export default function QualitiesTicker() {
  return <Marquee className="tick" items={QUALITIES} />;
}
