/* Shanghai · VCT Champions 2026. Reference trip for the engine. Public: no booking codes here. */
const HOTEL={name:"Upper House Shanghai",zh:"静安区石门一路366号",pid:"ChIJc04BZUlwsjURbjVHMGtIdQs",ll:[31.2304,121.4627],phone:"+86 21 3216 8199",fab:"回酒店",tip:"In DiDi, paste the address as the destination. If the driver is unsure, hand them your phone with the hotel on the line."};
const ARENA={zh:"浦东新区世博大道1200号 梅赛德斯-奔驰文化中心",g:"Mercedes-Benz Arena Shanghai",rn:"梅赛德斯奔驰文化中心",ll:[31.1890,121.4930]};
const PVG={zh:"浦东新区迎宾大道6000号 浦东国际机场 1号航站楼",g:"Shanghai Pudong International Airport Terminal 1",ll:[31.1508,121.8030]};
const PP={zh:"人民公园 南京西路231号",pid:"ChIJCyKw82pwsjURaeSnC8R9EXI",rn:"人民公园",ll:[31.2322,121.4732]};

/* go = [minutes, how] = travel from the previous stop. fixed = time doesn't move when running late. cut = first to drop. arena = match time can override. */
const DAYS=[
{d:"2026-10-13",lbl:"Tue",title:"Arrival",sub:"Get to the hotel and be asleep by 11. That sets up a clean first day.",sunset:"5:28",carry:"Passport, arrival card done",stops:[
 {t:"19:50",fixed:1,name:"Land at PVG Terminal 1",...PVG,note:"After immigration, official taxi line only. Turn down anyone offering a ride."},
 {t:"20:45",fixed:1,name:"Taxi to the hotel",...HOTEL,note:"About 60 min, roughly ¥200-250."},
 {t:"22:00",fixed:1,name:"Upper House Shanghai",...HOTEL,go:[60,"Taxi"],note:"Light dinner, shower, in bed by 11."}]},
{d:"2026-10-14",lbl:"Wed",title:"West side + Bund sunset",sub:"Temples and French Concession lanes, Xintiandi, then the Bund at sunset and hairy crab.",sunset:"5:27",carry:"Comfortable shoes, ¥50 for the temple",stops:[
 {t:"08:30",name:"Xiaoyang Shengjian",tag:"food",zh:"南京西路1601号越洋国际广场B2层",pid:"ChIJn3UuJwJwsjURM7UU1zXyQhQ",rn:"小杨生煎 越洋广场",ll:[31.2235,121.4474],go:[12,"Metro Line 2, 1 stop, or DiDi"],note:"Breakfast. Pan-fried soup buns, dip in vinegar. Opens 8am."},
 {t:"09:15",cut:1,name:"Jing'an Temple",zh:"静安寺 南京西路1686号",pid:"ChIJVV1KHv5vsjURQgiHHZfGW3o",rn:"静安寺",ll:[31.2235,121.4453],go:[3,"Walk across the street"],note:"¥50. 30 min for the gold roofs."},
 {t:"10:00",name:"Walk Yuyuan Road west",zh:"愚园路",g:"Yuyuan Road Shanghai",rn:"愚园路 citywalk",ll:[31.2236,121.4390],go:[5,"Walk"],note:"About 2.5 km of lane houses, design shops and cafés."},
 {t:"11:15",name:"Columbia Circle",zh:"上生·新所 延安西路1262号",pid:"ChIJJ0-twytlsjURbFWBM3WCJBg",rn:"上生新所",ll:[31.2100,121.4270],go:[10,"Walk from the west end of Yuyuan Rd, or DiDi"],note:"1920s country club. Coffee only, save room for lunch."},
 {t:"12:15",name:"Wukang Rd → Anfu Rd",zh:"武康路",pid:"ChIJlYmtcE5lsjURb2bqWG7sR7A",rn:"武康路 安福路",ll:[31.2084,121.4404],go:[10,"DiDi"],note:"Heart of the French Concession. Anfu Rd is the boutique strip."},
 {t:"13:30",name:"Wei Xiang Zhai",tag:"food",zh:"味香斋 雁荡路14号",pid:"ChIJldt-3XJwsjURnv6BN6EktSs",rn:"味香斋 雁荡路",ll:[31.2207,121.4699],go:[12,"DiDi"],note:"Lunch. Sesame noodles + curry beef soup. 10am-9:30pm."},
 {t:"14:45",name:"Xintiandi",zh:"新天地",pid:"ChIJM7Ffg3FwsjURJhV09LX1oqI",rn:"新天地",ll:[31.2193,121.4748],go:[10,"Walk"],note:"Restored shikumen lanes. About 45 min."},
 {t:"15:45",name:"VALORANT Bing Sutt",tag:"val",zh:"马当路388号复兴SOHO D栋",pid:"ChIJeRamgnZwsjURuyZazCvuh7c",rn:"瓦记冰室",ll:[31.2146,121.4742],go:[5,"Walk"],note:"Riot's new-agent café pop-up."},
 {t:"16:45",name:"The Bund for sunset",zh:"外滩",pid:"ChIJYUiHi1dwsjURZK_REO37Vk0",rn:"外滩 日落",ll:[31.2403,121.4906],go:[20,"Metro Line 10 to Nanjing East Rd, or DiDi"],note:"Sunset ~5:27. Stay as the Shanghai Tower and skyline light up."},
 {t:"18:30",name:"Wang Bao He · hairy crab",tag:"food",zh:"王宝和酒家 福州路603号",pid:"ChIJDQidZFhwsjURiAjlvQNdkgI",rn:"王宝和 大闸蟹",ll:[31.2327,121.4794],go:[12,"Walk"],note:"Confirm the per-crab price before ordering. Kitchen closes 9pm."},
 {t:"20:30",cut:1,name:"Speak Low (optional)",tag:"val",zh:"复兴中路579号",pid:"ChIJR8pziwpwsjURATf5H_7vnw4",rn:"Speak Low 上海",ll:[31.2148,121.4659],go:[20,"DiDi"],note:"VALORANT collab cocktails, open until 2:30am. Skip it if jet lag wins."}],
 lunch:[
 {name:"Wei Xiang Zhai",zh:"味香斋 雁荡路14号",pid:"ChIJldt-3XJwsjURnv6BN6EktSs",rn:"味香斋 雁荡路",note:"The plan. Sesame noodles. 10am-9:30pm."},
 {name:"Xiaweiguan",zh:"镇宁路9号",pid:"ChIJKxZER1FlsjURnGbV7oGFESM",rn:"镇宁路9号 本帮菜",note:"Neighborhood Shanghainese near Yuyuan Rd. 10:30am-2:30pm."},
 {name:"Maodou Ayi",zh:"毛豆阿姨 常熟路115号",pid:"ChIJjQZg96p6sjURoK3CXoEWMxU",rn:"毛豆阿姨 常熟路",note:"Old villa, smoked fish. 11am-10pm."}]},
{d:"2026-10-15",lbl:"Thu",title:"Nanjing Rd + Yu Garden",sub:"Hard stop: back at the hotel by 4:30 for the 6pm dinner.",sunset:"5:26",carry:"Passport (Yu Garden tickets), cash for snacks",stops:[
 {t:"08:00",name:"Lai Lai Xiao Long",tag:"food",zh:"莱莱小笼 天津路504号",pid:"ChIJGRhnfkNwsjURGKqqL8OaDfA",rn:"莱莱小笼",ll:[31.2362,121.4773],go:[15,"DiDi, or Metro Line 2 to People's Square"],note:"Breakfast. Opens 8am, line forms early. Crab xiaolongbao + pork chop."},
 {t:"09:15",cut:1,name:"People's Park",...PP,go:[10,"Walk"],note:"Morning dancers and tai chi. 15 min."},
 {t:"09:45",name:"Nanjing Road Pedestrian Street",zh:"南京路步行街",pid:"ChIJ443NM0NwsjURrWjV1_GoGSU",rn:"南京路步行街",ll:[31.2347,121.4749],go:[5,"Walk"],note:"Walk all 1.5 km east. Skip the street stalls."},
 {t:"10:30",cut:1,name:"KFC egg tart stop",tag:"food",zh:"肯德基 南京东路558号",pid:"ChIJ0cEMq0RwsjURWsijlf5mP4U",rn:"肯德基 蛋挞",ll:[31.2359,121.4798],go:[10,"Walk"],note:"Opens 10am."},
 {t:"11:00",cut:1,name:"The Bund, in daylight",zh:"外滩",pid:"ChIJYUiHi1dwsjURZK_REO37Vk0",rn:"外滩",ll:[31.2403,121.4906],go:[15,"Walk"],note:"The colonial buildings up close."},
 {t:"11:45",name:"Yu Garden",zh:"豫园 安仁街",pid:"ChIJidPZMUGHrTUR29eIuHbpoIQ",rn:"豫园",ll:[31.2272,121.4921],go:[20,"Walk south along the river"],note:"Ticketed, ~¥40. Open 9am-4:30pm. Allow 90 min."},
 {t:"13:15",name:"Yuyuan Bazaar + Old Street",tag:"food",zh:"豫园商城 上海老街 方浜中路",g:"Shanghai Old Street Fangbang Middle Road",rn:"上海老街 方浜中路",ll:[31.2250,121.4890],go:[2,"Walk out the garden exit"],note:"Lunch from snack stalls and teahouses."},
 {t:"16:30",fixed:1,name:"Hotel: get ready",...HOTEL,go:[25,"DiDi from Yu Garden. Afternoon traffic is slow"],note:"Leave Yu Garden by 4:05 at the latest."},
 {t:"18:00",fixed:1,name:"Team dinner",note:"Location TBD."}],
 lunch:[
 {name:"Shanghai Lao Fan Dian",zh:"上海老饭店 福佑路242号",pid:"ChIJAXOm_V9wsjURdZR3dvas02Y",rn:"上海老饭店 福佑路",note:"Since 1875, at Yu Garden. 10am-10pm."},
 {name:"Qingmeiju (beef noodles)",zh:"凤阳路313号",pid:"ChIJe4FZIkBwsjUR4SXvCIPaDNY",rn:"凤阳路313号 牛肉面",note:"By People's Park, fast and local. 10:30am-10pm."},
 {name:"Lu Bo Lang",zh:"绿波廊 豫园",pid:"ChIJabgXJdz_sjURVie4J6XMjWI",rn:"绿波廊 豫园",note:"Pond view, pricey. 7am-10pm."}]},
{d:"2026-10-16",lbl:"Fri",title:"Shops, then a double header",sub:"Upper Bracket Final at 2pm, Lower Bracket Semis at 5pm. Mornings only, so leave for the arena by 12:45.",sunset:"5:25",carry:"Event badge, phone battery pack",event:{label:"Match",time:"14:00",early:45},stops:[
 {t:"09:00",name:"Zhangyuan",zh:"张园 泰兴路",pid:"ChIJ48y1BhFwsjURfLdfOFXaK5M",rn:"张园",ll:[31.2280,121.4601],go:[5,"Walk across the street"],note:"1880s shikumen lanes. Shops open around 10, so the lanes are the point this early."},
 {t:"10:00",name:"Julu → Changle → Xinle Rd",zh:"巨鹿路 长乐路 新乐路",g:"Changle Road Shanghai",rn:"长乐路 新乐路 买手店",ll:[31.2160,121.4560],go:[15,"Walk"],note:"Indie boutiques, vintage, sneakers, coffee. Most open 10-11am."},
 {t:"11:45",name:"Feng Ba Noodles",tag:"food",zh:"陕西南路29号",pid:"ChIJjcNDVA9wsjURrCQwV-rkA74",rn:"陕西南路29号 面馆",ll:[31.2190,121.4580],go:[10,"Walk"],note:"Early lunch to beat the noon rush. Scallion noodles + pork chop. Listed on Google as Xiaolin Noodle."},
 {t:"13:15",fixed:1,anchor:1,name:"Arena · UB Final + LB Semis",tag:"val",...ARENA,go:[30,"DiDi, or Metro Line 13 from Huaihai Middle Rd"],note:"Two Bo3s: 2pm and 5pm. Expect to be here until 8-9pm."},
 {t:"21:00",cut:1,name:"Lujiazui riverside (optional)",zh:"陆家嘴滨江大道",g:"Lujiazui Riverside Promenade Shanghai",rn:"陆家嘴滨江大道",ll:[31.2385,121.5000],go:[15,"DiDi, walk away from the arena first"],note:"The towers lit up from directly underneath, if you have legs left."}],
 lunch:[
 {name:"Feng Ba Noodles",zh:"陕西南路29号",pid:"ChIJjcNDVA9wsjURrCQwV-rkA74",rn:"陕西南路29号 面馆",note:"The plan. Scallion noodles + grilled pork chop. Listed as Xiaolin Noodle. Hours not posted."},
 {name:"Longtang Noodles",zh:"弄堂面馆 威海路665号",pid:"ChIJdZ_EJBBwsjUR1fNZINGcFdA",rn:"弄堂面馆 威海路665号",note:"Liver noodles, pork cutlet. Near Zhangyuan. Hours not posted."}]},
{d:"2026-10-17",lbl:"Sat",title:"VALORANT in Jing'an + marriage market",sub:"Lower Bracket Final is a Bo5 at 3pm. Be at the arena by 2:15 and expect to stay until 7-8pm.",sunset:"5:24",carry:"Event badge, cash for Pop Mart",event:{label:"Match",time:"15:00",early:45},stops:[
 {t:"09:00",name:"Breakfast near the hotel",tag:"food",ll:HOTEL.ll,note:"See the Food tab."},
 {t:"10:00",name:"DOE themed café",tag:"val",zh:"铜仁路78号",g:"DOE 铜仁路78号 Shanghai",rn:"DOE 铜仁路",ll:[31.2275,121.4505],go:[10,"Walk"],note:"VALORANT drinks. Opens 10am."},
 {t:"10:45",name:"Champions pop-up + Pop Mart",tag:"val",zh:"西藏北路166号 静安大悦城南座",g:"Jing'an Joy City Shanghai",rn:"静安大悦城 无畏契约",ll:[31.2445,121.4730],go:[15,"DiDi"],note:"Official merch. Pop Mart collab is shop S102."},
 {t:"11:45",cut:1,name:"People's Park marriage market",...PP,rn:"人民公园 相亲角",go:[10,"DiDi"],note:"Weekends only. Look, don't photograph faces."},
 {t:"12:30",name:"Jia Jia Tang Bao",tag:"food",zh:"佳家汤包 黄河路90号",pid:"ChIJA5s-SUBwsjURFhARLaLPojs",rn:"佳家汤包 黄河路",ll:[31.2365,121.4705],go:[5,"Walk"],note:"Lunch. Soup dumplings, quick. 9am-9:30pm."},
 {t:"14:15",fixed:1,anchor:1,name:"Arena · Lower Bracket Final",tag:"val",...ARENA,go:[35,"Metro Line 8 from People's Square to China Art Museum + 15 min walk, or DiDi"],note:"Bo5. Could run 4-5 hours."},
 {t:"20:00",cut:1,name:"Fanfest at night (optional)",tag:"val",zh:"前滩休闲公园",g:"Qiantan Leisure Park Shanghai",rn:"前滩休闲公园 无畏契约",ll:[31.1610,121.4880],go:[10,"DiDi"],note:"Open until midnight. Quieter than the daytime crowd."}],
 lunch:[
 {name:"Jia Jia Tang Bao",zh:"佳家汤包 黄河路90号",pid:"ChIJA5s-SUBwsjURFhARLaLPojs",rn:"佳家汤包 黄河路",note:"The plan. Soup dumplings. 9am-9:30pm."},
 {name:"Qingmeiju (beef noodles)",zh:"凤阳路313号",pid:"ChIJe4FZIkBwsjUR4SXvCIPaDNY",rn:"凤阳路313号 牛肉面",note:"Near the park. 10:30am-10pm."},
 {name:"Di Shui Dong",zh:"滴水洞 茂名南路56号",pid:"ChIJjeHh2w5wsjUR9hQ4sr9Kv2Q",rn:"滴水洞 茂名南路",note:"Only if we skip the marriage market. 10:30am-10pm."}]},
{d:"2026-10-18",lbl:"Sun",title:"Grand Final",sub:"Bo5 at 2pm, could run past 7. The whole day stays in Pudong.",sunset:"5:23",carry:"Event badge, battery pack",event:{label:"Match",time:"14:00",early:45},stops:[
 {t:"09:30",name:"Slow breakfast",tag:"food",ll:HOTEL.ll,note:"Saturday will run late. See the Food tab."},
 {t:"10:45",name:"Taikoo Li Qiantan",zh:"前滩太古里 东育路500弄",g:"Taikoo Li Qiantan Shanghai",rn:"前滩太古里",ll:[31.1560,121.4885],go:[35,"DiDi"],note:"Open-air shops. Pop Mart VALORANT collab."},
 {t:"11:45",name:"Fanfest + Sage statue",tag:"val",zh:"前滩休闲公园",g:"Qiantan Leisure Park Shanghai",rn:"前滩休闲公园 无畏契约",ll:[31.1610,121.4880],go:[5,"Walk"],note:"Next door. Last chance for photos."},
 {t:"12:30",name:"Lunch at Taikoo Li",tag:"food",zh:"前滩太古里",g:"Taikoo Li Qiantan Shanghai",rn:"前滩太古里 餐厅",ll:[31.1560,121.4885],go:[5,"Walk"],note:"Lots of restaurants. Tap Food near here."},
 {t:"13:15",fixed:1,anchor:1,name:"Arena · Grand Final",tag:"val",...ARENA,go:[10,"DiDi"],note:"Bo5. Walk away from the arena before calling a DiDi afterward."},
 {t:"20:30",cut:1,name:"Late-night Haidilao (optional)",tag:"val",zh:"北京西路1068号3层",g:"海底捞 北京西路1068号",rn:"海底捞 北京西路 无畏契约",ll:[31.2330,121.4560],go:[40,"DiDi"],note:"VALORANT-themed store, open until 7am. Works for a team dinner."}],
 lunch:[
 {name:"Taikoo Li Qiantan",zh:"前滩太古里",g:"Taikoo Li Qiantan Shanghai",rn:"前滩太古里 餐厅",note:"The plan. Eat wherever has a short line."},
 {name:"Yuxing Ji",zh:"裕兴记 威海路830号",pid:"ChIJA6m1aQVwsjUR11fYsrGAhfw",rn:"裕兴记 威海路",note:"Crab roe noodles, ~¥138. Only as a 10am brunch before heading east. Hours not posted."}]},
{d:"2026-10-19",lbl:"Mon",title:"Going home",sub:"Leave by 1:30. Afternoon traffic to Pudong is unpredictable.",sunset:"5:22",carry:"Passport, chargers, nothing left in the safe",stops:[
 {t:"12:00",fixed:1,name:"Check out",...HOTEL,note:""},
 {t:"13:30",fixed:1,name:"Taxi to PVG Terminal 1",...PVG,note:"About 60 min."},
 {t:"17:30",fixed:1,name:"DL280 departs",...PVG,go:[60,"Taxi"],note:"Lands Seattle 1:11pm same day. Get afternoon sun, stay up until 9-10pm."}]}
];

const COFFEE=[
 {name:"Starbucks Reserve Roastery",zh:"南京西路789号",pid:"ChIJOQ8D4XRxsjUR2OWDx2nGGBw",rn:"星巴克臻选上海烘焙工坊",note:"Next door in Taikoo Hui. Princi bakery. 9am-11pm."},
 {name:"Mai Coffee",zh:"北京西路551号",pid:"ChIJRYvx3BVwsjURpREs0G7qZyc",rn:"北京西路551号 咖啡",note:"Small specialty roaster, pour-overs. Hours not posted."},
 {name:"Pancakes Huang (jianbing)",zh:"铜仁路329号",pid:"ChIJa0rPPQNwsjURrcO47ttHzFw",rn:"铜仁路329号 煎饼果子",note:"Egg crepe with crispy cracker, to go. Mornings."},
 {name:"Xiaoyang Shengjian",zh:"南京西路1601号 B2",pid:"ChIJn3UuJwJwsjURM7UU1zXyQhQ",rn:"小杨生煎 越洋广场",note:"Pan-fried soup buns. 8am-9:30pm."},
 {name:"Coffee near the hotel",near:HOTEL.ll,note:"Apple Maps search around the hotel."}];

const VAL=[
 {name:"Mercedes-Benz Arena",...ARENA,note:"Fri 2pm + 5pm (Bo3s) · Sat 3pm (Bo5) · Sun 2pm Grand Final (Bo5)."},
 {name:"Fanfest + Sage statue",zh:"前滩休闲公园",g:"Qiantan Leisure Park Shanghai",rn:"前滩休闲公园 无畏契约",note:"Oct 16-18, 9am-midnight."},
 {name:"VALORANT Bing Sutt",zh:"马当路388号复兴SOHO D栋",pid:"ChIJeRamgnZwsjURuyZazCvuh7c",rn:"瓦记冰室",note:"New-agent café, Oct 10-18."},
 {name:"Speak Low",zh:"复兴中路579号",pid:"ChIJR8pziwpwsjURATf5H_7vnw4",rn:"Speak Low 上海",note:"Collab cocktails, 6pm-2:30am."},
 {name:"Champions pop-up + Pop Mart",zh:"西藏北路166号 静安大悦城南座",g:"Jing'an Joy City Shanghai",rn:"静安大悦城 无畏契约",note:"10am-10pm, through Oct 18."},
 {name:"Concept PC Bang (Balenciaga)",zh:"永源路6号 B115",g:"永源路6号 Shanghai",rn:"无畏契约 网吧 巴黎世家",note:"3-9pm, through Oct 18. Clashes with every match day, so likely a skip."},
 {name:"DOE themed café",zh:"铜仁路78号",g:"DOE 铜仁路78号 Shanghai",rn:"DOE 铜仁路",note:"10am-10pm. Also at Xintiandi, 湖滨路168号."},
 {name:"Haidilao late-night store",zh:"北京西路1068号3层",g:"海底捞 北京西路1068号",rn:"海底捞 北京西路 无畏契约",note:"Open until 7am per Riot's sheet."},
 {name:"Valm Battle Zone",zh:"长宁路1123号 长宁来福士",g:"Raffles City Changning Shanghai",rn:"长宁来福士 无畏契约",note:"VALORANT Mobile, Oct 16-18, 1-9pm. Clashes with the matches."},
 {name:"Valsound EDM party",zh:"前耀路180号 L128",g:"前耀路180号 Shanghai",rn:"Valsound 前滩",note:"Oct 16-17, 9:30pm-2am (TBD)."}];

const EMER=[
 {name:"Shanghai United Family Hospital · Puxi",zh:"长宁区仙霞路1139号 和睦家医院",pid:"ChIJv0lK7cdlsjURLHCiv04x09Q",tel:"+862122163900",note:"Best English-speaking ER on our side of the river. ~25 min from the hotel. Expensive."},
 {name:"Huashan Hospital · international clinic",zh:"静安区乌鲁木齐中路12号 华山医院 国际医疗中心",pid:"ChIJzfjZ51RlsjURelOa2F-6TDc",tel:"+862152889999",note:"Closest to the hotel, ~10 min. Big public hospital, basic English."},
 {name:"Shanghai East International Medical Center",zh:"浦东新区即墨路150号",pid:"ChIJL2slz-BwsjUREXMFBZQGT1g",tel:"+862158799999",note:"Lujiazui. Closest English-speaking option to the arena, ~15 min."},
 {name:"Shanghai United Family Hospital · Pudong",zh:"浦东新区金桥路1598号",pid:"ChIJC3rM9vx1sjURYQXlUmDOTlE",tel:"+862122163999",note:"Far east Pudong, 35-45 min from anything. Use the others first."},
 {name:"US Consulate · American Citizen Services",zh:"南京西路1038号 梅龙镇广场",g:"Westgate Mall 1038 Nanjing West Road Shanghai",note:"Lost or stolen passport. Westgate Mall, a few minutes' walk from the hotel. Book online first."},
 {name:"US Consulate General",zh:"徐汇区淮海中路1469号 美国驻上海总领事馆",pid:"ChIJSzsxMUB7sjURJ22QYyGGW3A",tel:"+862180112200",note:"Main consulate, 1469 Huaihai Zhong Rd."}];
const TAXI=[{name:"Hotel · Upper House",zh:HOTEL.zh},{name:"Arena · Mercedes-Benz",zh:ARENA.zh},{name:"Pudong Airport T1",zh:PVG.zh},{name:"Hospital · United Family Puxi",zh:"长宁区仙霞路1139号 和睦家医院"},{name:"Fanfest · Qiantan",zh:"浦东新区 前滩休闲公园"}];
const PHR=[["你好","nee-how","Hello"],["谢谢","shyeh-shyeh","Thank you"],["不好意思","boo-how-ee-suh","Excuse me / call a server"],["这个","jeh-guh","This one"],["多少钱","dwor-shaow-chyen","How much?"],["买单","my-dan","The check, please"],["不要","boo-yow","Don't want"],["洗手间在哪里","she-show-jyen zai nah-lee","Where's the bathroom?"],["我不吃辣","wor boo chur la","I don't eat spicy"]];
const KV=[["Out","DL281 · Mon Oct 12, 3:40pm SEA → Tue 7:50pm PVG T1"],["Back","DL280 · Mon Oct 19, 5:30pm PVG T1 → 1:11pm SEA"],["Travel desk","CWT · 763-329-2578 (24h). Booking codes are in your email."],["Hotel","Upper House Shanghai · 石门一路366号 · +86 21 3216 8199"],["Time","Shanghai is 15 hours ahead of Seattle"]];

window.TRIP={
 slug:"sh26",
 title:"Shanghai · VCT Champions",
 subtitle:"Oct 13-19, 2026",
 updated:"Oct 11, 2:20pm",
 city:"Shanghai",
 tz:"Asia/Shanghai",
 homeTz:"America/Los_Angeles", homeLabel:"Seattle",
 currency:{code:"CNY",name:"Yuan",symbol:"¥",home:"USD",homeName:"Dollars",homeSymbol:"$",rate:7.1,rateHint:"Check the rate in Alipay and update it here."},
 links:["apple","amap","dianping"],
 near:{provider:"amap",coffee:"咖啡",food:"小吃",restroom:"厕所"},
 amapCity:"310000",
 driver:{ask:"请带我去",title:"Show the driver",tab:"Driver",button:"Show driver",copied:"Copied. Paste into DiDi"},
 badges:{val:"VALORANT",food:"Food"},
 hotel:HOTEL,
 days:DAYS,
 coffee:COFFEE,
 food:{title:"Coffee & quick bites",sub:"Near the hotel. Anywhere else, every stop on the schedule has \"Coffee near here\" and \"Food near here\" buttons."},
 taxi:TAXI,
 phrases:PHR,
 kv:KV,
 sos:[{num:"110",label:"Police"},{num:"120",label:"Ambulance"},{num:"119",label:"Fire"}],
 sosNote:'Operators may not speak English. Lead with the address in Chinese, or have the hotel call: <a href="tel:+862132168199">+86 21 3216 8199</a>.',
 emergency:EMER,
 extras:[{title:"VALORANT around the city",items:VAL}],
 tips:["Load this page on your eSIM or roaming data. Some local wifi in China blocks overseas sites, so switch wifi off if it won't load.", "Amap buttons open the place in Amap (set it to English). Dianping buttons open a search in the Dianping app for ratings and photos. Install both before you fly, or the buttons do nothing.", "Pay with Alipay. DiDi rides are inside Alipay too. Carry about ¥500 cash as backup.", "Leaving the arena: walk 10-15 min away before calling a DiDi, or take Metro Line 8.", "Ignore friendly strangers near Nanjing Rd and the Bund inviting you to tea or a bar.", "Carry tissues. Mall bathrooms on the 2nd floor and up are the cleanest.", "No tipping. Keep a photo of your passport on you.", "Jet lag: daylight every day, caffeine before 1pm, naps under 20 min."]
};
