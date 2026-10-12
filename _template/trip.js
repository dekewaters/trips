/* TRIP DATA FILE. Copy _template/ to a new folder (e.g. tokyo-2027/), then fill this in.
   Everything the site shows comes from window.TRIP below. The engine (../engine/app.js) never needs editing per trip.

   THIS FILE IS PUBLIC. Never put booking codes, confirmation numbers, passport numbers or card numbers here.

   Stop / place object fields (used in days[].stops, days[].lunch, coffee, emergency, extras[].items):
     name   English name (required)
     local  Address or name in the local script, shown full-screen to drivers ("Show driver" button). Omit if the
            local language is English or you aren't sure of the characters. Never guess characters.
     q      Search term for local apps (Amap, Dianping, Naver). Usually the local-script name + street.
     pid    Google place_id (from places_search). g = fallback Google search text if no place_id.
     ll     [lat, lng]. Enables "Coffee / Food / Restroom near here" and tighter app searches.
     note   One or two short sentences. Hours, price, what to order, why it's worth it.
     tel    Phone number for a Call button (emergency list mostly), e.g. "+81312345678".
     near   [lat,lng] instead of links: renders only the near-here buttons (handy for "Coffee near the hotel").
   Stop-only fields (days[].stops):
     t      "HH:MM" 24h local time (required)
     go     [minutes, "how to get there"] travel from the previous stop. Drives the "leave by" time.
     fixed  1 = time can't move (flights, reservations, dinners). "Running late" shifts everything else.
     cut    1 = first thing to drop when running late.
     anchor 1 = this stop follows the day's event time (event.time minus event.early).
     tag    badge key: "food", or any key in badges below (e.g. "val").
     more   {w:"2-3 sentence blurb", s:[{name, local, note, q}]}: a "More info" expander at the bottom of the card,
            with "don't miss" spots inside the place. Spots with q get map buttons; leave q off for dishes.
*/
const HOTEL={name:"Hotel Name",local:"",pid:"",ll:[0,0],phone:"+00 0000 0000",fab:"",tip:"Show this to the driver. If they're unsure, hand them your phone with the hotel on the line."};

const DAYS=[
 {d:"2027-01-01",lbl:"Fri",title:"Arrival",sub:"One line on the shape of the day.",sunset:"5:00",carry:"Passport",stops:[
  {t:"15:00",fixed:1,name:"Land",note:"Which terminal, how to get to the hotel, rough cost."},
  {t:"17:00",fixed:1,name:"Hotel",...HOTEL,go:[60,"Taxi"],note:"Check in."}]},
 {d:"2027-01-02",lbl:"Sat",title:"Example day",sub:"Free until the event.",sunset:"5:01",carry:"Comfortable shoes",
  event:{label:"Event",time:"18:00",early:30},   /* optional: an editable time box; anchor stops follow it */
  stops:[
  {t:"09:00",name:"Breakfast spot",tag:"food",local:"",q:"",pid:"",ll:[0,0],note:"Opens 8am."},
  {t:"10:30",cut:1,name:"A sight",ll:[0,0],go:[15,"Walk"],note:"Why it's worth it.",
   more:{w:"What it is and why it's worth the time.",s:[{name:"A shop inside",local:"",note:"Hours. Why.",q:"search term"},{name:"A dish",note:"Order this."}]}},
  {t:"17:30",fixed:1,anchor:1,name:"Venue",ll:[0,0],go:[25,"Metro"],note:"Doors open early."}],
  lunch:[{name:"Lunch option",pid:"",note:"Hours. What to order."}]}
];

window.TRIP={
 slug:"xx27",                       /* short unique id: localStorage keys + app link source name */
 title:"City · Purpose",
 subtitle:"Jan 1-5, 2027",
 updated:"Dec 20, 9:00am",          /* bump on every publish so people can tell they have the latest */
 city:"City",
 tz:"Europe/London",                /* IANA time zone of the destination */
 homeTz:"America/Los_Angeles", homeLabel:"Seattle",
 currency:{code:"GBP",name:"Pounds",symbol:"£",home:"USD",homeName:"Dollars",homeSymbol:"$",rate:0.79,rateHint:"Check today's rate and update it here."},
 /* Which buttons each place gets, in order. Options: google, apple, amap, dianping, naver, yelp.
    China: ["apple","amap","dianping"] + near.provider "amap". Korea: ["naver","google"]. Most places: ["google","apple"]. */
 links:["google","apple"],
 near:{provider:"google",coffee:"coffee",food:"food",restroom:"public toilet"},
 driver:{ask:"Please take me to",title:"Show the driver",tab:"Driver",button:"Show driver",copied:"Copied"},
 badges:{food:"Food"},
 hotel:HOTEL,
 days:DAYS,
 coffee:[{name:"Coffee near the hotel",near:HOTEL.ll,note:"Map search around the hotel."}],
 food:{title:"Coffee & quick bites",sub:"Near the hotel. Every stop also has near-here buttons."},
 taxi:[{name:"Hotel",local:HOTEL.local||HOTEL.name}],
 phrases:[],                        /* [local, how to say it, meaning] */
 kv:[["Out","Flight · date time"],["Back","Flight · date time"],["Hotel",HOTEL.name],["Time","X hours ahead of Seattle"]],
 sos:[{num:"999",label:"Emergency"}],
 sosNote:"",
 emergency:[],                      /* hospitals with English-speaking staff near the hotel AND near the main venue; consulate (passport services address) */
 extras:[],                         /* [{title:"Event things around town", items:[...places]}] */
 tips:[]
};
