import { Route, Routes } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import { ContentProvider } from '@/context/ContentContext'
import AgeCalculator from '@/pages/AgeCalculator'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import TatMock from '@/pages/TatMock'
import MockTests from '@/pages/MockTests'
import MockOirtestone from '@/pages/oir/MockOirtestone'
import OirMockOne from '@/pages/oir/OirMockOne'
import OirMockTwo from '@/pages/oir/OirMockTwo'
import OirMockThree from '@/pages/oir/OirMockThree'
import OirMockFour from '@/pages/oir/OirMockFour'
import OirMockFive from '@/pages/oir/OirMockFive'
import PpdtTest from './pages/ppdt/PpdtTest'
import PpdtMockOne from './pages/ppdt/PpdtMockTestOne'
import PpdtMockTwo from './pages/ppdt/PpdtMockTestTwo'
import PpdtMockThree from './pages/ppdt/PpdtMockTestThree'
import PpdtMockFour from './pages/ppdt/PpdtMockTestFour'
import PpdtMockFive from './pages/ppdt/PpdtMockTestFive'
import PpdtMockSix from './pages/ppdt/PpdtMockTestSix'
import Books from './pages/books'
import WhyLws from './pages/WhyLws'
import Carrer from './pages/carrer'
import Enquire from './pages/Enquirenow'
import NdaFoundation from './pages/NdaFoundation'
import ContactUs from './pages/ContactUs'
import WatMock from './pages/WatMock'
import Blog from './pages/Blog'
import Results from './pages/Results'
import PersonalInterview from './pages/PersonalInterview'
import MockSrt from './pages/SrtmockTest'
import Video from './pages/Video'
import Faq from './pages/Faq'
import Gallery from '@/pages/Gallery'
import AboutUs from '@/pages/AboutUs'

export default function App () {
  return (
    <ContentProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path='age-calculator' element={<AgeCalculator />} />
          {/* <Route path="mock/wat" element={<WatMock />} /> */}

          {/* route for mock tat  */}

          <Route path='/mock-tests/tat' element={<TatMock />} />

          {/* close tat  */}
          <Route path='mock/srt' element={<MockSrt/>}/>

          <Route path='/mock-tests' element={<MockTests />} />
          <Route path='mock/oir' element={<MockOirtestone />} />
          {/* <Route path='/mock-tests/oir/:n' element={<OirMockOne />} /> */}
          <Route path='/mock-tests/oir/1' element={<OirMockOne />} />
          <Route path='/mock-tests/oir/2' element={<OirMockTwo />} />
          <Route path='/mock-tests/oir/3' element={<OirMockThree />} />
          <Route path='/mock-tests/oir/4' element={<OirMockFour />} />
          <Route path='/mock-tests/oir/5' element={<OirMockFive />} />

          

          {/* new for ppdt */}
          <Route path='/mock/ppdt' element={<PpdtTest />} />
          <Route path='/mock-tests/ppdt/1' element={<PpdtMockOne />} />
          {/* <Route path='/mock-tests/ppdt/1' element={<PpdtMockOne />} /> */}
          <Route path='/mock-tests/ppdt/2' element={<PpdtMockTwo />} />
          <Route path='/mock-tests/ppdt/3' element={<PpdtMockThree />} />
          <Route path='/mock-tests/ppdt/4' element={<PpdtMockFour />} />
          <Route path='/mock-tests/ppdt/5' element={<PpdtMockFive />} />
          <Route path='/mock-tests/ppdt/6' element={<PpdtMockSix />} />

          {/* route for books pages  */}
          <Route path='/books' element={<Books />} />
          <Route path='/why-lws' element={<WhyLws />} />
          <Route path='/career' element={<Carrer />} />
          <Route path='/enquire' element={<Enquire />} />
          <Route path='/nda-foundation' element={<NdaFoundation />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/mock/wat' element={<WatMock />} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/results' element={<Results />} />
          <Route path='/mock/pi' element={<PersonalInterview />} />
          <Route path='/videos' element={<Video />} /> 
          <Route path='/faq' element={<Faq />} /> 
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about-us' element={<AboutUs />} />

          {/* close  */}

          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>
    </ContentProvider>
  )
}
