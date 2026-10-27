import Marquee from '@/components/common/Marquee';
import { EXAMS } from '@/data/site';
import '@/styles/sections/exams-marquee.css';

/** Strip of exams we prepare for. */
export default function ExamsMarquee() {
  return <Marquee className="mq" id="exams" items={EXAMS} />;
}
