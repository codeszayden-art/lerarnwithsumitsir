import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { useContent } from '@/context/ContentContext'
import '@/styles/sections/centers.css'

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 40

/** Interactive India map + auto-playing centre slider (pins, dots, arrows and swipe stay in sync). */
export default function Centers () {
  const { centers } = useContent()
  const count = centers.length
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  const [runKey, setRunKey] = useState(0)
  const [sectionRef, inView] = useInView({ threshold: 0.15 })
  const touchStartX = useRef(null)

  const goTo = useCallback(k => setIndex(((k % count) + count) % count), [count])
  const resume = useCallback(() => {
    setHeld(false)
    setRunKey(k => k + 1)
  }, [])
  const pick = useCallback(
    k => {
      goTo(k)
      resume()
    },
    [goTo, resume],
  )

  useEffect(() => {
    if (held) return undefined
    const id = setInterval(() => setIndex(i => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [held, count, runKey])

  const onPinKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(i)
    }
  }
  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
    setHeld(true)
  }
  const onTouchEnd = e => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(dx) > SWIPE_THRESHOLD) goTo(index + (dx < 0 ? 1 : -1))
    }
    touchStartX.current = null
    resume()
  }

  return (
    <section className={`cn cn-js${inView ? ' in' : ''}${held ? ' hold' : ''}`} id='centers' ref={sectionRef}>
      <div className='cn-bg' aria-hidden='true'>
        {centers.map((c, i) => (
          <i
            key={c.id}
            className={i === index ? 'on' : undefined}
            style={{ backgroundImage: `url("${c.image}")` }}
          />
        ))}
      </div>
      <div className='wrap'>
        <div className='cn-head'>
          <h2>Our Centers Across India</h2>
          <p className='cn-sub'>
            Pick a glowing point on the map, or let the cards slide on their own, to see where you can study
            with LWS.
          </p>
        </div>
        <div
          className='cn-grid'
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={resume}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className='cn-map'>
            <svg
              viewBox='0 0 580 600'
              role='img'
              aria-label='Map of India showing LWS centres in Delhi, Haryana, Maharashtra and Uttar Pradesh'
            >
              <defs>
                <path
                  id='cn-india'
                  d='M29 293Q26 292 29 290Q31 288 37 286Q44 283 51 282Q58 282 58 278Q59 273 60 267Q61 261 62 255Q63 250 60 244Q57 239 58 234Q60 229 62 223Q63 216 68 213Q72 209 77 205Q83 201 87 197Q92 192 98 188Q104 184 108 180Q112 175 119 172Q126 169 131 164Q135 160 137 156Q140 152 141 148Q142 144 145 140Q148 137 150 134Q153 130 150 128Q147 126 143 124Q140 122 137 119Q134 115 134 112Q133 108 130 104Q127 100 127 96Q126 93 127 89Q128 86 124 86Q120 85 117 82Q114 80 118 76Q121 72 123 68Q126 65 130 62Q134 60 137 56Q140 51 143 48Q147 44 151 43Q156 42 163 43Q169 44 175 49Q182 55 187 62Q192 69 197 70Q202 71 208 71Q214 71 219 76Q225 81 231 78Q237 75 238 81Q239 87 232 92Q226 97 222 103Q218 109 216 114Q213 119 212 123Q211 127 211 132Q210 137 211 143Q212 148 214 152Q217 156 220 156Q223 157 228 158Q232 159 238 162Q243 166 246 169Q250 172 247 175Q244 179 241 181Q238 183 236 186Q235 190 237 193Q239 197 242 199Q245 201 249 203Q253 206 256 209Q260 212 263 214Q267 215 272 217Q276 219 281 221Q287 223 291 223Q295 223 300 223Q305 223 310 225Q315 227 320 231Q325 234 330 236Q336 239 342 240Q348 242 355 243Q361 243 368 242Q375 241 376 238Q376 235 375 231Q373 227 374 222Q374 217 379 214Q383 210 386 214Q388 217 388 221Q387 225 392 229Q396 233 401 234Q406 235 412 234Q419 234 426 234Q434 234 436 230Q439 225 442 221Q444 216 450 214Q455 211 461 206Q466 200 474 196Q482 191 489 190Q496 188 503 189Q510 191 514 195Q519 199 524 202Q528 206 533 207Q537 208 538 212Q538 215 535 218Q532 222 527 223Q522 225 519 229Q515 232 511 236Q507 239 503 244Q500 249 498 254Q497 259 494 262Q492 265 490 270Q489 274 486 280Q484 286 481 289Q478 293 473 299Q468 304 466 312Q465 319 462 315Q459 310 456 309Q453 307 451 303Q450 300 448 296Q446 293 444 290Q443 286 442 282Q441 277 438 273Q436 270 431 268Q426 266 421 266Q415 266 411 264Q406 263 406 258Q406 253 405 249Q403 246 398 246Q394 247 391 245Q388 242 385 247Q381 253 379 256Q377 260 376 265Q375 270 380 276Q386 282 385 287Q385 293 388 300Q391 306 391 312Q392 318 391 323Q389 329 386 331Q383 333 378 333Q373 333 367 334Q362 335 358 337Q354 339 352 344Q350 349 346 354Q342 359 339 362Q336 365 331 369Q327 373 323 376Q319 380 315 383Q310 387 307 390Q303 394 299 398Q295 403 290 406Q286 410 281 413Q277 417 275 420Q274 423 269 426Q264 429 259 431Q254 432 251 436Q248 441 244 443Q240 444 238 449Q236 453 235 460Q235 466 236 475Q238 483 238 488Q239 493 237 498Q235 503 233 508Q231 514 231 520Q231 525 231 531Q231 537 231 541Q231 545 228 545Q225 545 223 548Q221 550 220 555Q219 559 217 562Q216 564 211 567Q206 570 203 571Q200 572 196 577Q191 581 191 584Q190 587 187 585Q184 584 182 581Q180 579 177 575Q174 571 172 565Q169 559 168 555Q167 551 164 542Q161 534 159 528Q156 522 154 517Q151 513 147 506Q144 499 141 492Q138 486 136 479Q133 472 132 466Q130 460 128 454Q126 448 125 441Q123 433 120 425Q118 417 115 409Q112 401 111 392Q109 382 108 376Q106 369 107 362Q108 355 108 349Q107 344 107 338Q106 332 104 328Q103 324 102 322Q101 319 99 320Q97 320 97 325Q96 330 96 333Q97 337 93 340Q90 343 83 346Q76 349 70 347Q65 346 62 343Q58 340 55 336Q52 332 48 329Q44 325 42 323Q40 320 41 318Q42 316 47 317Q53 318 57 317Q61 316 63 312Q66 308 64 307Q62 306 57 308Q53 309 49 309Q46 309 41 306Q36 302 34 298Q32 294 29 293Z'
                />
              </defs>
              <use href='#cn-india' className='m-land' />
              <path
                className='m-border'
                d='M129 175L136 177Q142 179 147 179L153 179M153 179L157 175Q161 171 166 168Q170 165 174 161L177 158M153 179L157 183Q161 188 162 194Q163 201 168 207Q172 212 176 215Q181 218 183 218L186 218M153 129L157 134Q161 139 166 144Q170 148 174 153L177 158M177 158L181 160Q184 163 187 165L189 167M153 129L161 126Q168 123 174 121Q179 119 185 119Q191 118 198 120Q205 121 208 124L211 128M189 167L194 161Q198 156 204 151Q210 146 211 143L212 139M128 81L139 83Q149 86 158 92Q167 97 173 103Q179 109 184 113L189 118M189 167L187 172Q184 176 183 182Q182 188 183 194Q184 201 185 206Q186 210 186 214L186 218M189 167L195 172Q200 176 206 179Q212 182 218 185Q225 188 229 191Q233 194 236 196L239 197M59 277L67 278Q76 280 84 278Q93 276 100 279Q107 282 113 286Q119 291 126 296L132 301M132 301L137 295Q142 289 147 283Q153 276 160 272Q167 269 172 265Q177 261 183 260Q189 259 196 252Q202 244 203 242L203 240M186 218L190 224Q195 231 199 236L203 240M203 240L210 245Q216 250 223 255Q230 261 237 263Q244 265 251 267Q258 269 265 273Q272 278 279 281Q286 284 290 285L295 286M295 286L298 283Q302 280 300 278L298 276M298 276L300 269Q302 261 305 257Q309 254 306 248Q303 242 305 237Q306 231 306 227L305 223M298 276L304 279Q310 282 317 280Q324 278 331 277Q338 276 345 273Q351 270 357 267Q363 263 366 264L370 265M370 265L371 258Q372 252 373 246L375 241M370 265L366 272Q363 280 359 286Q356 291 352 295Q347 299 348 304Q349 310 352 315L354 319M354 319L357 323Q359 327 358 331L356 335M354 319L349 322Q344 325 338 321Q331 318 326 317Q321 316 314 315L307 314M307 314L304 310Q302 306 298 302Q295 297 295 291L295 286M307 314L303 320Q300 327 295 331Q289 334 284 339Q279 344 276 351Q274 359 271 368L268 378M268 378L275 381Q282 385 288 383Q295 381 299 382Q303 383 308 385L312 387M295 286L288 288Q282 291 276 295Q270 299 264 300Q258 301 254 307Q251 314 246 318Q240 321 239 326L239 331M239 331L240 337Q242 344 244 349Q246 353 244 359Q242 365 240 369Q239 374 237 378L235 381M235 381L242 385Q249 389 253 395Q256 400 257 402L258 404M258 404L262 400Q267 397 267 387L268 378M239 331L231 333Q223 334 216 334Q209 334 202 333Q195 331 188 332Q181 333 174 333Q167 334 161 336Q154 338 141 336L128 334M132 301L133 307Q135 314 132 319Q128 325 128 330L128 334M128 334L126 339Q123 344 120 349Q118 353 113 355L109 357M235 381L230 378Q225 374 219 373Q214 372 209 374Q203 376 200 381Q196 385 192 394L188 402M188 402L181 406Q174 410 168 412Q161 415 156 419Q151 423 147 427Q142 430 139 434Q135 438 133 441L130 444M188 402L189 408Q189 413 188 418Q186 423 189 428L191 432M191 432L196 436Q202 440 208 438Q214 436 220 432Q226 428 233 426Q240 423 246 419Q251 415 254 410L258 404M191 432L187 439Q182 445 184 452Q186 459 189 463Q193 468 197 473Q202 477 203 484L203 491M203 491L200 496Q196 502 196 507Q195 513 191 516Q188 519 182 518L175 517M175 517L169 513Q163 509 159 507Q154 506 150 504L146 502M175 517L175 523Q174 530 177 537Q181 543 183 549Q186 555 185 561Q184 568 185 573L186 579M203 491L210 489Q216 487 221 484Q226 481 232 483L237 484M445 234L453 234Q461 235 470 234Q479 233 487 230Q496 227 504 225L512 223M472 254L475 248Q479 242 484 238Q489 233 494 232L500 231M407 254L413 252Q419 250 427 249Q435 248 443 249Q451 250 454 253L458 255M458 255L461 259Q465 263 468 261Q472 259 478 260Q484 261 487 263L491 265M453 276L457 273Q461 270 464 276Q466 282 467 289L468 297M407 235L405 246M377 229L386 225'
              />
              <use href='#cn-india' className='m-edge' />
              {centers.map((c, i) => (
                <g
                  className={`cn-pin${i === index ? ' on' : ''}`}
                  data-i={i}
                  transform={c.pin.transform}
                  tabIndex={0}
                  role='button'
                  aria-label={`${c.pin.label} centre`}
                  key={c.id}
                  onClick={() => pick(i)}
                  onKeyDown={e => onPinKey(e, i)}
                >
                  <circle r={20} fill='transparent' />
                  <circle className='ring' r={8} />
                  <circle className='ring b' r={8} />
                  <circle className='core' r={6} />
                  <text x={c.pin.labelX} y={c.pin.labelY} textAnchor={c.pin.anchor}>
                    {c.pin.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div>
            <div className='cn-view'>
              <div className='cn-track' style={{ transform: `translateX(-${index * 100}%)` }}>
                {centers.map((c, i) => (
                  <article className='cn-card' aria-hidden={i !== index} key={c.id}>
                    <div className='cn-img' data-n={String(i + 1).padStart(2, '0')}>
                      <img src={c.image} alt={c.imageAlt} loading='lazy' />
                    </div>
                    <div className='cn-b' data-n={String(i + 1).padStart(2, '0')}>
                      <span className='cn-tag'>{`Centre ${i + 1} of ${centers.length}`}</span>
                      <h3>{c.name}</h3>
                      <p className='cn-row'>
                        <i className='cn-ic cn-pin-i' />
                        <span>{c.address}</span>
                      </p>
                      <p className='cn-row'>
                        <i className='cn-ic cn-ph-i' />
                        <span>
                          <a href={`tel:${c.phones[0]}`}>{c.phones[0]}</a>
                          <a href={`tel:${c.phones[1]}`}>{c.phones[1]}</a>
                        </span>
                      </p>
                      <a className='cn-go' href='#enquire'>
                        Explore more »
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className='cn-ctl'>
              <div className='cn-dots'>
                {centers.map((c, i) => (
                  <button
                    key={c.id}
                    type='button'
                    className={i === index ? 'on run' : undefined}
                    aria-label={`Show ${c.pin.label} centre`}
                    onClick={() => pick(i)}
                  />
                ))}
              </div>
              <button type='button' aria-label='Previous centre' onClick={() => pick(index - 1)}>
                ‹
              </button>
              <button type='button' onClick={() => pick(index + 1)} aria-label='Next centre'>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
