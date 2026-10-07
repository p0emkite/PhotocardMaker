export const FONT_REGISTRY=[
  {name:"Playfair Display",family:'"Playfair Display",Georgia,serif',category:"serif"},
  {name:"Cormorant Garamond",family:'"Cormorant Garamond",Georgia,serif',category:"serif"},
  {name:"DM Serif Display",family:'"DM Serif Display",Georgia,serif',category:"serif"},
  {name:"Libre Baskerville",family:'"Libre Baskerville",Georgia,serif',category:"serif"},
  {name:"Lora",family:'"Lora",Georgia,serif',category:"serif"},
  {name:"Bodoni Moda",family:'"Bodoni Moda",Georgia,serif',category:"serif"},
  {name:"Abril Fatface",family:'"Abril Fatface",Georgia,serif',category:"display"},
  {name:"Cinzel",family:'"Cinzel",Georgia,serif',category:"display"},
  {name:"Bebas Neue",family:'"Bebas Neue","Arial Narrow",sans-serif',category:"display"},
  {name:"Bungee",family:'"Bungee",sans-serif',category:"display"},
  {name:"Orbitron",family:'"Orbitron",sans-serif',category:"display"},
  {name:"Prata",family:'"Prata",Georgia,serif',category:"serif"},
  {name:"Press Start 2P",family:'"Press Start 2P",monospace',category:"display"},
  {name:"Righteous",family:'"Righteous",sans-serif',category:"display"},
  {name:"Unbounded",family:'"Unbounded",sans-serif',category:"display"},
  {name:"Montserrat",family:'"Montserrat",Arial,sans-serif',category:"sans"},
  {name:"Poppins",family:'"Poppins",Arial,sans-serif',category:"sans"},
  {name:"Raleway",family:'"Raleway",Arial,sans-serif',category:"sans"},
  {name:"Quicksand",family:'"Quicksand",Arial,sans-serif',category:"sans"},
  {name:"Oswald",family:'"Oswald","Arial Narrow",sans-serif',category:"sans"},
  {name:"Inter",family:'"Inter",Arial,sans-serif',category:"sans"},
  {name:"Space Grotesk",family:'"Space Grotesk",Arial,sans-serif',category:"sans"},
  {name:"Great Vibes",family:'"Great Vibes",cursive',category:"script"},
  {name:"Pacifico",family:'"Pacifico",cursive',category:"script"},
  {name:"Dancing Script",family:'"Dancing Script",cursive',category:"script"},
  {name:"Allura",family:'"Allura",cursive',category:"script"},
  {name:"Sacramento",family:'"Sacramento",cursive',category:"script"},
  {name:"Caveat",family:'"Caveat",cursive',category:"script"},
  {name:"Parisienne",family:'"Parisienne",cursive',category:"script"},
  {name:"Satisfy",family:'"Satisfy",cursive',category:"script"}
];
export const FONT_MAP=Object.fromEntries(FONT_REGISTRY.map(x=>[x.name,x.family]));

const common=(over={})=>({
  font:"Playfair Display",fontSize:31,tracking:4,textX:325,textY:903,background:"auto",
  backStyle:"center",frontLogoScale:100,frontLogoX:325,frontLogoY:60,
  backLogoScale:100,backLogoX:325,backLogoY:502,logoOutline:true,logoShadow:true,
  ...over
});

export const TEMPLATE_REGISTRY={
  ribbon:{
    id:"ribbon",label:"01. Ribbon Classic",category:"classic",
    defaults:common(),extras:[],front:"ribbon",back:"ribbon"
  },
  y2k:{
    id:"y2k",label:"02. Y2K Sticker",category:"cute",
    defaults:common({font:"Righteous",fontSize:43,tracking:1,textX:325,textY:900,frontLogoX:565,frontLogoY:76,frontLogoScale:80}),
    extras:[],front:"y2k",back:"y2k"
  },
  polaroid:{
    id:"polaroid",label:"03. Polaroid",category:"photo",
    defaults:common({font:"Libre Baskerville",fontSize:33,tracking:2,textX:365,textY:887,frontLogoX:90,frontLogoY:881,frontLogoScale:76}),
    extras:[],front:"polaroid",back:"polaroid"
  },
  film:{
    id:"film",label:"04. Film Frame",category:"photo",
    defaults:common({font:"Oswald",fontSize:34,tracking:4,textX:325,textY:936,frontLogoX:325,frontLogoY:52,frontLogoScale:68}),
    extras:[],front:"film",back:"film"
  },
  magazine:{
    id:"magazine",label:"05. Magazine Cover",category:"editorial",
    defaults:common({font:"Bodoni Moda",fontSize:52,tracking:2,textX:325,textY:106,backStyle:"diagonal",frontLogoX:566,frontLogoY:222,frontLogoScale:88}),
    extras:[],front:"magazine",back:"magazine"
  },
  luxury:{
    id:"luxury",label:"06. Luxury Gold",category:"luxury",
    defaults:common({font:"Prata",fontSize:37,tracking:3,textX:325,textY:906,frontLogoX:325,frontLogoY:64,frontLogoScale:78}),
    extras:[],front:"luxury",back:"luxury"
  },
  princess:{
    id:"princess",label:"07. Princess Frame",category:"cute",
    defaults:common({font:"Cormorant Garamond",fontSize:46,tracking:3,textX:325,textY:902,frontLogoX:325,frontLogoY:78,frontLogoScale:76}),
    extras:[],front:"princess",back:"princess"
  },
  gothic:{
    id:"gothic",label:"08. Gothic / Dark Romance",category:"dark",
    defaults:common({font:"Cinzel",fontSize:37,tracking:4,textX:325,textY:910,frontLogoX:325,frontLogoY:68,frontLogoScale:76}),
    extras:[],front:"gothic",back:"gothic"
  },
  angel:{
    id:"angel",label:"09. Angel / Heaven",category:"soft",
    defaults:common({font:"Great Vibes",fontSize:50,tracking:1,textX:325,textY:898,frontLogoX:325,frontLogoY:76,frontLogoScale:74}),
    extras:[],front:"angel",back:"angel"
  },
  cyber:{
    id:"cyber",label:"10. Cyber / Hologram",category:"tech",
    defaults:common({font:"Orbitron",fontSize:29,tracking:3,textX:325,textY:916,frontLogoX:560,frontLogoY:78,frontLogoScale:70}),
    extras:[],front:"cyber",back:"cyber"
  },
  arcade:{
    id:"arcade",label:"11. Arcade / Pixel",category:"game",
    defaults:common({font:"Press Start 2P",fontSize:22,tracking:1,textX:325,textY:916,frontLogoX:552,frontLogoY:80,frontLogoScale:72}),
    extras:[],front:"arcade",back:"arcade"
  },
  minimal:{
    id:"minimal",label:"14. Minimal Line",category:"minimal",
    defaults:common({font:"Inter",fontSize:29,tracking:5,textX:150,textY:922,frontLogoX:575,frontLogoY:66,frontLogoScale:78}),
    extras:[],front:"minimal",back:"minimal"
  },
  editorial:{
    id:"editorial",label:"15. Editorial Grid",category:"editorial",
    defaults:common({font:"Space Grotesk",fontSize:43,tracking:1,textX:438,textY:874,frontLogoX:91,frontLogoY:72,frontLogoScale:70,backLogoX:350,backLogoY:520}),
    extras:[],front:"editorial",back:"editorial"
  },
  split:{
    id:"split",label:"16. Split Color",category:"modern",
    defaults:common({font:"Poppins",fontSize:38,tracking:3,textX:155,textY:862,frontLogoX:132,frontLogoY:106,frontLogoScale:78,backLogoX:390,backLogoY:502}),
    extras:[],front:"split",back:"split"
  },
  gradient_glow:{
    id:"gradient_glow",label:"17. Gradient Glow",category:"glow",
    defaults:common({font:"Poppins",fontSize:40,tracking:3,textX:325,textY:902,frontLogoX:325,frontLogoY:72,frontLogoScale:74}),
    extras:[],front:"gradient_glow",back:"gradient_glow"
  },
  neon:{
    id:"neon",label:"18. Neon Sign",category:"glow",
    defaults:common({font:"Unbounded",fontSize:30,tracking:2,textX:325,textY:910,frontLogoX:325,frontLogoY:74,frontLogoScale:72}),
    extras:[],front:"neon",back:"neon"
  },
  scrapbook:{
    id:"scrapbook",label:"19. Scrapbook",category:"paper",
    defaults:common({font:"Caveat",fontSize:48,tracking:1,textX:325,textY:882,frontLogoX:548,frontLogoY:86,frontLogoScale:72}),
    extras:[],front:"scrapbook",back:"scrapbook"
  },
  diary:{
    id:"diary",label:"20. Diary / Notebook",category:"paper",
    defaults:common({font:"Satisfy",fontSize:44,tracking:1,textX:342,textY:864,frontLogoX:510,frontLogoY:82,frontLogoScale:68}),
    extras:[],front:"diary",back:"diary"
  },
  love_letter:{
    id:"love_letter",label:"21. Love Letter",category:"romantic",
    defaults:common({font:"Parisienne",fontSize:50,tracking:1,textX:325,textY:874,frontLogoX:542,frontLogoY:105,frontLogoScale:58,backLogoY:544}),
    extras:[],front:"love_letter",back:"love_letter"
  },
  student_id:{
    id:"student_id",label:"22. Student ID",category:"special",
    defaults:common({font:"Montserrat",fontSize:42,tracking:5,textX:325,textY:753,backStyle:"center",frontLogoX:82,frontLogoY:920,frontLogoScale:82,backLogoScale:100,schoolName:"아이브고등학교"}),
    extras:["schoolName"],front:"student_id",back:"student_id"
  },
  concert_ticket:{
    id:"concert_ticket",label:"23. Concert Ticket",category:"ticket",
    defaults:common({font:"Bebas Neue",fontSize:43,tracking:4,textX:392,textY:888,frontLogoX:401,frontLogoY:84,frontLogoScale:72,backLogoX:400,backLogoY:502}),
    extras:[],front:"concert_ticket",back:"concert_ticket"
  },
  album_tracklist:{
    id:"album_tracklist",label:"24. Album Tracklist",category:"music",
    defaults:common({font:"Space Grotesk",fontSize:38,tracking:2,textX:325,textY:814,frontLogoX:325,frontLogoY:914,frontLogoScale:68,backLogoY:892}),
    extras:[],front:"album_tracklist",back:"album_tracklist"
  },
  starry_night:{
    id:"starry_night",label:"25. Starry Night",category:"night",
    defaults:common({font:"Cormorant Garamond",fontSize:48,tracking:4,textX:325,textY:902,frontLogoX:325,frontLogoY:74,frontLogoScale:70}),
    extras:[],front:"starry_night",back:"starry_night"
  },
  butterfly:{
    id:"butterfly",label:"26. Butterfly",category:"soft",
    defaults:common({font:"Parisienne",fontSize:48,tracking:1,textX:325,textY:900,frontLogoX:325,frontLogoY:72,frontLogoScale:70}),
    extras:[],front:"butterfly",back:"butterfly"
  },
  cherry_strawberry:{
    id:"cherry_strawberry",label:"27. Cherry / Strawberry",category:"cute",
    defaults:common({font:"Quicksand",fontSize:39,tracking:3,textX:325,textY:904,frontLogoX:325,frontLogoY:72,frontLogoScale:70}),
    extras:[],front:"cherry_strawberry",back:"cherry_strawberry"
  },
  cat_puppy:{
    id:"cat_puppy",label:"28. Cat / Puppy",category:"cute",
    defaults:common({font:"Quicksand",fontSize:38,tracking:2,textX:325,textY:900,frontLogoX:535,frontLogoY:78,frontLogoScale:66}),
    extras:[],front:"cat_puppy",back:"cat_puppy"
  },
  bubble_pop:{
    id:"bubble_pop",label:"29. Bubble Pop",category:"cute",
    defaults:common({font:"Poppins",fontSize:38,tracking:3,textX:325,textY:902,frontLogoX:325,frontLogoY:72,frontLogoScale:68}),
    extras:[],front:"bubble_pop",back:"bubble_pop"
  },
  glass_acrylic:{
    id:"glass_acrylic",label:"30. Glass / Acrylic",category:"modern",
    defaults:common({font:"Inter",fontSize:34,tracking:4,textX:325,textY:908,frontLogoX:325,frontLogoY:74,frontLogoScale:68}),
    extras:[],front:"glass_acrylic",back:"glass_acrylic"
  },
  chrome:{
    id:"chrome",label:"31. Chrome",category:"modern",
    defaults:common({font:"Unbounded",fontSize:30,tracking:2,textX:325,textY:910,frontLogoX:325,frontLogoY:72,frontLogoScale:68}),
    extras:[],front:"chrome",back:"chrome"
  },
  racing:{
    id:"racing",label:"32. Racing",category:"sport",
    defaults:common({font:"Bebas Neue",fontSize:48,tracking:4,textX:358,textY:900,frontLogoX:530,frontLogoY:84,frontLogoScale:68}),
    extras:[],front:"racing",back:"racing"
  },
  varsity:{
    id:"varsity",label:"33. Varsity / College",category:"sport",
    defaults:common({font:"Montserrat",fontSize:40,tracking:4,textX:325,textY:896,frontLogoX:325,frontLogoY:72,frontLogoScale:70}),
    extras:[],front:"varsity",back:"varsity"
  },
  sailor:{
    id:"sailor",label:"34. Sailor / Marine",category:"seasonal",
    defaults:common({font:"Cormorant Garamond",fontSize:45,tracking:3,textX:325,textY:900,frontLogoX:325,frontLogoY:74,frontLogoScale:68}),
    extras:[],front:"sailor",back:"sailor"
  },
  christmas:{
    id:"christmas",label:"35. Christmas / Winter",category:"seasonal",
    defaults:common({font:"Playfair Display",fontSize:40,tracking:3,textX:325,textY:900,frontLogoX:325,frontLogoY:74,frontLogoScale:68}),
    extras:[],front:"christmas",back:"christmas"
  },
  halloween:{
    id:"halloween",label:"36. Halloween",category:"seasonal",
    defaults:common({font:"Cinzel",fontSize:37,tracking:3,textX:325,textY:908,frontLogoX:325,frontLogoY:76,frontLogoScale:68}),
    extras:[],front:"halloween",back:"halloween"
  },
  sakura:{
    id:"sakura",label:"37. Sakura",category:"seasonal",
    defaults:common({font:"Parisienne",fontSize:49,tracking:1,textX:325,textY:900,frontLogoX:325,frontLogoY:72,frontLogoScale:68}),
    extras:[],front:"sakura",back:"sakura"
  },
  summer_soda:{
    id:"summer_soda",label:"38. Summer Soda",category:"seasonal",
    defaults:common({font:"Righteous",fontSize:38,tracking:2,textX:325,textY:900,frontLogoX:325,frontLogoY:72,frontLogoScale:68}),
    extras:[],front:"summer_soda",back:"summer_soda"
  },
  trump:{
    id:"trump",label:"40. Trump Card",category:"special",
    defaults:common({font:"Playfair Display",fontSize:34,tracking:4,textX:325,textY:910,backStyle:"center",frontLogoX:572,frontLogoY:72,frontLogoScale:72,trumpSuit:"diamond",trumpRank:"A",trumpSuitColor:"auto",trumpRankColor:"auto"}),
    extras:["trumpOptions"],front:"trump",back:"trump"
  },
  dressing_mirror:{
    id:"dressing_mirror",label:"41. Dressing Room Mirror",category:"showbiz",
    defaults:common({font:"Bodoni Moda",fontSize:40,tracking:3,textX:325,textY:920,frontLogoX:325,frontLogoY:841,frontLogoScale:62,backLogoX:325,backLogoY:430}),
    extras:[],front:"dressing_mirror",back:"dressing_mirror"
  },
  candy_pop:{
    id:"candy_pop",label:"42. Candy Pop",category:"cute",
    defaults:common({font:"Pacifico",fontSize:42,tracking:1,textX:325,textY:906,frontLogoX:325,frontLogoY:72,frontLogoScale:68,backLogoScale:96}),
    extras:[],front:"candy_pop",back:"candy_pop"
  },
  teddy_bear:{
    id:"teddy_bear",label:"43. Teddy Bear",category:"cute",
    defaults:common({font:"Quicksand",fontSize:40,tracking:2,textX:325,textY:902,frontLogoX:325,frontLogoY:72,frontLogoScale:66,backLogoScale:94}),
    extras:[],front:"teddy_bear",back:"teddy_bear"
  },
  rising_star:{
    id:"rising_star",label:"44. Rising Star",category:"showbiz",
    defaults:common({font:"Unbounded",fontSize:31,tracking:2,textX:325,textY:910,frontLogoX:325,frontLogoY:72,frontLogoScale:68,backLogoScale:96}),
    extras:[],front:"rising_star",back:"rising_star"
  },
  japan_traditional:{
    id:"japan_traditional",label:"45. Japan Traditional",category:"seasonal",
    defaults:common({font:"Prata",fontSize:37,tracking:3,textX:325,textY:904,frontLogoX:325,frontLogoY:72,frontLogoScale:66,backLogoScale:94}),
    extras:[],front:"japan_traditional",back:"japan_traditional"
  },
  fireworks:{
    id:"fireworks",label:"46. Fireworks",category:"seasonal",
    defaults:common({font:"Bodoni Moda",fontSize:42,tracking:3,textX:325,textY:906,frontLogoX:325,frontLogoY:72,frontLogoScale:66,backLogoScale:96}),
    extras:[],front:"fireworks",back:"fireworks"
  },
  gyaru:{
    id:"gyaru",label:"47. Gyaru",category:"cute",
    defaults:common({font:"Bungee",fontSize:34,tracking:1,textX:325,textY:904,frontLogoX:540,frontLogoY:80,frontLogoScale:64,backLogoScale:94}),
    extras:[],front:"gyaru",back:"gyaru"
  },
  city_pop:{
    id:"city_pop",label:"48. City Pop",category:"night",
    defaults:common({font:"Righteous",fontSize:39,tracking:2,textX:325,textY:906,frontLogoX:325,frontLogoY:72,frontLogoScale:66,backLogoScale:96}),
    extras:[],front:"city_pop",back:"city_pop"
  },
  signature:{
    id:"signature",label:"39. Signature",category:"special",
    defaults:common({font:"Sacramento",fontSize:30,tracking:1,textX:115,textY:942,frontLogoX:576,frontLogoY:67,frontLogoScale:78,signatureScale:100,signatureX:363,signatureY:862}),
    extras:["signatureImage"],front:"signature",back:"signature"
  }
};

export function getTemplate(id){return TEMPLATE_REGISTRY[id]||TEMPLATE_REGISTRY.ribbon}
export function getTemplateList(){return Object.values(TEMPLATE_REGISTRY).sort((a,b)=>(parseInt(a.label)||999)-(parseInt(b.label)||999))}

const rgba=(hex,a=1)=>{
  const s=String(hex||"#000000").replace("#","").padEnd(6,"0");
  const r=parseInt(s.slice(0,2),16)||0,g=parseInt(s.slice(2,4),16)||0,b=parseInt(s.slice(4,6),16)||0;
  return `rgba(${r},${g},${b},${a})`
};
const lighten=(hex,mix=.9)=>{
  const s=String(hex||"#FFFFFF").replace("#","").padEnd(6,"F");
  const ch=i=>Math.round((parseInt(s.slice(i,i+2),16)||0)*(1-mix)+255*mix);
  return `rgb(${ch(0)},${ch(2)},${ch(4)})`
};
function line(ctx,x1,y1,x2,y2,color,width=1){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore()}
function heart(ctx,x,y,s,color){ctx.save();ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+s*.38);ctx.bezierCurveTo(x-s*.72,y-s*.2,x-s*.46,y-s*.86,x,y-s*.44);ctx.bezierCurveTo(x+s*.46,y-s*.86,x+s*.72,y-s*.2,x,y+s*.38);ctx.fill();ctx.restore()}
function cornerMark(ctx,x,y,s,color,flipX=1,flipY=1){line(ctx,x,y,x+s*flipX,y,color,1.5);line(ctx,x,y,x,y+s*flipY,color,1.5)}
function centeredText(ctx,text,x,y,font,color,spacing=0){
  ctx.save();ctx.font=font;ctx.fillStyle=color;ctx.textBaseline="middle";
  if(!spacing){ctx.textAlign="center";ctx.fillText(text,x,y);ctx.restore();return}
  const chars=[...text],widths=chars.map(ch=>ctx.measureText(ch).width),total=widths.reduce((a,b)=>a+b,0)+spacing*(chars.length-1);
  let px=x-total/2;ctx.textAlign="left";chars.forEach((ch,i)=>{ctx.fillText(ch,px,y);px+=widths[i]+spacing});ctx.restore()
}
function suitInfo(id){
  return {
    diamond:{symbol:"♦",color:"#E6002D"},
    heart:{symbol:"♥",color:"#E6002D"},
    spade:{symbol:"♠",color:"#111111"},
    club:{symbol:"♣",color:"#111111"}
  }[id]||{symbol:"♦",color:"#E6002D"}
}
function overrideColor(value,fallback){return /^#[0-9A-F]{6}$/i.test(String(value||""))?value:fallback}
function strokeRound(ctx,x,y,w,h,r,color,width=1){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.stroke();ctx.restore()}
function star(ctx,x,y,outer,inner,color,rotation=-Math.PI/2,points=5){ctx.save();ctx.fillStyle=color;ctx.beginPath();for(let i=0;i<points*2;i++){const a=rotation+i*Math.PI/points,r=i%2?inner:outer,px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.fill();ctx.restore()}
function tinyBow(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x-s*.18,y-s*.12,x-s*.55,y-s*.28,x-s*.62,y);ctx.bezierCurveTo(x-s*.55,y+s*.24,x-s*.18,y+s*.18,x,y);ctx.bezierCurveTo(x+s*.18,y+s*.18,x+s*.55,y+s*.24,x+s*.62,y);ctx.bezierCurveTo(x+s*.55,y-s*.28,x+s*.18,y-s*.12,x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x-2,y+3);ctx.lineTo(x-10,y+s*.65);ctx.moveTo(x+2,y+3);ctx.lineTo(x+10,y+s*.65);ctx.stroke();ctx.restore()}
function pixelHeart(ctx,x,y,size,color){const u=size/5,pts=[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2],[1,3],[2,3],[3,3],[2,4]];ctx.save();ctx.fillStyle=color;for(const [px,py] of pts)ctx.fillRect(x+(px-2.5)*u,y+(py-2)*u,u+.5,u+.5);ctx.restore()}
function checker(ctx,x,y,w,h,cell,c1,c2,alpha=1){ctx.save();ctx.globalAlpha=alpha;for(let yy=0;yy<h;yy+=cell)for(let xx=0;xx<w;xx+=cell){ctx.fillStyle=((xx/cell+yy/cell)&1)?c1:c2;ctx.fillRect(x+xx,y+yy,Math.min(cell,w-xx),Math.min(cell,h-yy))}ctx.restore()}
function pawPrint(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=color;
  ctx.beginPath();ctx.ellipse(0,s*.12,s*.24,s*.20,0,0,Math.PI*2);ctx.fill();
  for(const [dx,dy,r] of [[-.25,-.12,.09],[-.08,-.25,.085],[.10,-.25,.085],[.27,-.10,.09]]){ctx.beginPath();ctx.arc(s*dx,s*dy,s*r,0,Math.PI*2);ctx.fill()}
  ctx.restore()
}
function bubbleCircle(ctx,x,y,r,color,alpha=.34){
  ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=Math.max(1.4,r*.055);ctx.shadowColor=color;ctx.shadowBlur=r*.42;
  ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=alpha*.82;ctx.fillStyle="#FFFFFF";ctx.beginPath();ctx.arc(x-r*.28,y-r*.30,Math.max(2,r*.12),0,Math.PI*2);ctx.fill();ctx.restore()
}
function acrylicScrew(ctx,x,y,r,color){
  ctx.save();ctx.fillStyle="rgba(255,255,255,.72)";ctx.strokeStyle=rgba(color,.62);ctx.lineWidth=1.4;ctx.shadowColor="rgba(0,0,0,.18)";ctx.shadowBlur=5;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;line(ctx,x-r*.45,y,x+r*.45,y,rgba(color,.70),1);ctx.restore()
}
function mixHex(a,b,ratio=.5){
  const A=String(a||"#000000").replace("#","").padEnd(6,"0"),B=String(b||"#000000").replace("#","").padEnd(6,"0");
  const ch=i=>Math.round((parseInt(A.slice(i,i+2),16)||0)*(1-ratio)+(parseInt(B.slice(i,i+2),16)||0)*ratio);
  return `rgb(${ch(0)},${ch(2)},${ch(4)})`
}
function chromeGradient(ctx,x0,y0,x1,y1,tint="#C7CDD4"){
  const g=ctx.createLinearGradient(x0,y0,x1,y1);
  g.addColorStop(0,mixHex("#44494E",tint,.32));
  g.addColorStop(.14,mixHex("#F9FCFF",tint,.12));
  g.addColorStop(.30,mixHex("#7D858D",tint,.42));
  g.addColorStop(.47,mixHex("#FFFFFF",tint,.10));
  g.addColorStop(.62,mixHex("#5A6168",tint,.46));
  g.addColorStop(.79,mixHex("#F7FAFD",tint,.16));
  g.addColorStop(.90,mixHex("#8A929A",tint,.38));
  g.addColorStop(1,mixHex("#3D4247",tint,.34));
  return g
}
function speedLines(ctx,W,H,color){
  ctx.save();ctx.strokeStyle=color;ctx.lineCap="round";for(let i=0;i<10;i++){const y=170+i*58,x=20+(i%3)*18,len=78+(i%4)*30;ctx.globalAlpha=.18+(i%3)*.08;ctx.lineWidth=2+(i%2);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len,y-18);ctx.stroke()}ctx.restore()
}
function anchorIcon(ctx,x,y,s,color){
  ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.lineWidth=Math.max(2,s*.055);ctx.lineCap="round";ctx.beginPath();ctx.arc(0,-s*.28,s*.12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-s*.16);ctx.lineTo(0,s*.32);ctx.moveTo(-s*.20,-s*.04);ctx.lineTo(s*.20,-s*.04);ctx.stroke();ctx.beginPath();ctx.arc(0,s*.12,s*.34,.15*Math.PI,.85*Math.PI);ctx.stroke();ctx.restore()
}
function snowflake(ctx,x,y,r,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.strokeStyle=color;ctx.lineWidth=Math.max(1.2,r*.08);ctx.lineCap="round";
  for(let i=0;i<3;i++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(-r,0);ctx.lineTo(r,0);ctx.stroke();for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(side*r*.55,0);ctx.lineTo(side*r*.75,-r*.18);ctx.moveTo(side*r*.55,0);ctx.lineTo(side*r*.75,r*.18);ctx.stroke()}}
  ctx.restore()
}
function batIcon(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,s*.10);ctx.quadraticCurveTo(-s*.18,-s*.12,-s*.38,-s*.02);ctx.quadraticCurveTo(-s*.56,-s*.30,-s*.72,-s*.18);ctx.quadraticCurveTo(-s*.60,s*.05,-s*.42,s*.18);ctx.quadraticCurveTo(-s*.22,s*.05,0,s*.24);ctx.quadraticCurveTo(s*.22,s*.05,s*.42,s*.18);ctx.quadraticCurveTo(s*.60,s*.05,s*.72,-s*.18);ctx.quadraticCurveTo(s*.56,-s*.30,s*.38,-s*.02);ctx.quadraticCurveTo(s*.18,-s*.12,0,s*.10);ctx.fill();ctx.restore()
}
function ghostIcon(ctx,x,y,s,color){
  ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,-s*.12,s*.32,Math.PI,0);ctx.lineTo(s*.32,s*.30);ctx.quadraticCurveTo(s*.16,s*.18,0,s*.30);ctx.quadraticCurveTo(-s*.16,s*.18,-s*.32,s*.30);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(40,24,48,.68)";ctx.beginPath();ctx.arc(-s*.11,-s*.14,s*.04,0,Math.PI*2);ctx.arc(s*.11,-s*.14,s*.04,0,Math.PI*2);ctx.fill();ctx.restore()
}
function sakuraPetal(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,s*.10);ctx.bezierCurveTo(-s*.42,-s*.08,-s*.34,-s*.48,0,-s*.42);ctx.bezierCurveTo(s*.34,-s*.48,s*.42,-s*.08,0,s*.10);ctx.fill();ctx.restore()
}
function citrusSlice(ctx,x,y,r,color="#FFD85A"){
  ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.fillStyle="#FFF8D5";ctx.beginPath();ctx.arc(0,0,r*.75,0,Math.PI*2);ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=2;for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r*.72,Math.sin(a)*r*.72);ctx.stroke()}ctx.restore()
}

async function frontRibbon(e){
  e.photoRect(0,0,e.W,e.H,e.R);e.ribbonFrame(false);
  await e.logo({w:92,effects:true});e.name({x:e.c.textX,y:e.c.textY,maxWidth:380})
}
async function backRibbon(e){e.backBase(lighten(e.c.element,.93));await e.backLogo();e.ribbonFrame(true)}


function filmSprockets(ctx,W,H,color="#F4EEE2"){
  ctx.save();ctx.fillStyle=color;
  for(let y=72;y<H-60;y+=76){ctx.roundRect(16,y,28,44,5);ctx.fill();ctx.beginPath();ctx.roundRect(W-44,y,28,44,5);ctx.fill()}
  ctx.restore()
}
function pearlBorder(ctx,W,H,color){
  ctx.save();ctx.fillStyle=color;ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=1;
  for(let x=40;x<W-30;x+=34){ctx.beginPath();ctx.arc(x,28,4.6,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(x,H-28,4.6,0,Math.PI*2);ctx.fill();ctx.stroke()}
  for(let y=62;y<H-50;y+=34){ctx.beginPath();ctx.arc(28,y,4.6,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(W-28,y,4.6,0,Math.PI*2);ctx.fill();ctx.stroke()}
  ctx.restore()
}
function angelWing(ctx,x,y,flip,color){
  ctx.save();ctx.translate(x,y);ctx.scale(flip,1);ctx.strokeStyle=color;ctx.lineWidth=2.2;ctx.lineCap="round";
  const feathers=[[0,0,72,-34,105,-90],[8,14,86,-4,126,-54],[16,28,92,25,132,-8],[20,42,86,55,122,38]];
  for(const [sx,sy,cx,cy,ex,ey] of feathers){ctx.beginPath();ctx.moveTo(sx,sy);ctx.quadraticCurveTo(cx,cy,ex,ey);ctx.stroke()}
  ctx.restore()
}
function cyberFrame(ctx,W,H,color){
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();
  ctx.moveTo(44,22);ctx.lineTo(W-78,22);ctx.lineTo(W-30,70);ctx.lineTo(W-30,H-88);ctx.lineTo(W-78,H-30);ctx.lineTo(68,H-30);ctx.lineTo(30,H-68);ctx.lineTo(30,72);ctx.closePath();ctx.stroke();
  ctx.lineWidth=1;ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(56,36);ctx.lineTo(W-94,36);ctx.moveTo(44,H-48);ctx.lineTo(W-96,H-48);ctx.stroke();ctx.restore()
}

async function frontY2K(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.58,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(15,10,24,.38)");ctx.fillStyle=g;ctx.fillRect(0,H*.5,W,H*.5);ctx.restore();
  // glossy sticker plaques
  ctx.save();ctx.shadowColor="rgba(0,0,0,.16)";ctx.shadowBlur=10;ctx.shadowOffsetY=3;
  ctx.fillStyle="rgba(255,255,255,.82)";ctx.strokeStyle="#FFFFFF";ctx.lineWidth=4;
  ctx.beginPath();ctx.roundRect(36,72,112,54,27);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.roundRect(W-174,158,128,60,30);ctx.fill();ctx.stroke();ctx.restore();
  star(ctx,90,99,21,9,c.element,-Math.PI/2,5);pixelHeart(ctx,W-110,188,31,c.element);
  star(ctx,58,340,20,8,"rgba(255,255,255,.95)",-.2,4);star(ctx,W-64,420,27,11,c.element,.3,5);
  star(ctx,94,H-188,18,7,c.text,.2,4);pixelHeart(ctx,W-92,H-164,34,c.text);
  // sticker smiley
  ctx.save();ctx.fillStyle=rgba(c.element,.88);ctx.strokeStyle="#fff";ctx.lineWidth=4;ctx.beginPath();ctx.arc(W-104,310,35,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(W-116,302,3.8,0,Math.PI*2);ctx.arc(W-92,302,3.8,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(W-104,312,14,.15*Math.PI,.85*Math.PI);ctx.stroke();ctx.restore();
  await e.logo({w:78,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:520,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backY2K(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.9));
  checker(ctx,0,0,W,H,54,rgba(c.element,.14),"rgba(255,255,255,.72)",1);
  for(const [x,y,s] of [[80,110,30],[560,128,24],[116,812,34],[542,846,28],[325,230,22],[325,785,22]])star(ctx,x,y,s,s*.42,rgba(c.element,.72),-.35,5);
  ctx.save();ctx.fillStyle="rgba(255,255,255,.76)";ctx.beginPath();ctx.roundRect(94,314,W-188,376,48);ctx.fill();ctx.strokeStyle="rgba(255,255,255,.95)";ctx.lineWidth=4;ctx.stroke();ctx.restore();
  await e.backLogo({maxWidth:260})
}

async function frontFilm(e){
  const {ctx,W,H,c}=e;e.backBase("#151412");
  filmSprockets(ctx,W,H,"#EDE5D7");
  ctx.save();ctx.shadowColor="rgba(0,0,0,.38)";ctx.shadowBlur=12;e.fillRound(58,52,W-116,H-168,4,"#111");ctx.restore();
  e.photoRect(64,58,W-128,H-180,2);
  ctx.save();ctx.strokeStyle=rgba(c.element,.7);ctx.lineWidth=1;ctx.strokeRect(64,58,W-128,H-180);ctx.restore();
  await e.logo({w:62,effects:false});
  line(ctx,84,H-118,W-84,H-118,rgba(c.element,.75),1);
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#F4EEE2",stroke:"#111111",shadow:false});
  ctx.save();ctx.fillStyle=rgba(c.element,.8);for(let x=112;x<W-90;x+=42)ctx.fillRect(x,H-76,14,3);ctx.restore()
}
async function backFilm(e){
  const {ctx,W,H,c}=e;e.backBase("#151412");filmSprockets(ctx,W,H,"#EDE5D7");
  strokeRound(ctx,62,54,W-124,H-108,4,rgba(c.element,.72),1.2);
  ctx.save();ctx.fillStyle="rgba(255,255,255,.035)";for(let y=90;y<H-70;y+=74)ctx.fillRect(78,y,W-156,1);ctx.restore();
  await e.backLogo({maxWidth:245})
}

async function frontLuxury(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();let g=ctx.createRadialGradient(W/2,H*.46,160,W/2,H*.5,610);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.55)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  g=ctx.createLinearGradient(0,H*.68,0,H);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.52)");ctx.fillStyle=g;ctx.fillRect(0,H*.62,W,H*.38);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,26,c.element,2);strokeRound(ctx,30,30,W-60,H-60,20,rgba(c.element,.55),1);
  // fine corner ornaments
  for(const [x,y,sx,sy] of [[46,46,1,1],[W-46,46,-1,1],[46,H-46,1,-1],[W-46,H-46,-1,-1]]){
    line(ctx,x,y,x+72*sx,y,c.element,1.6);line(ctx,x,y,x,y+72*sy,c.element,1.6);
    ctx.save();ctx.fillStyle=c.element;ctx.beginPath();ctx.arc(x+18*sx,y+18*sy,3.5,0,Math.PI*2);ctx.fill();ctx.restore()
  }
  ctx.save();ctx.fillStyle="rgba(0,0,0,.30)";ctx.beginPath();ctx.roundRect(90,H-154,W-180,96,18);ctx.fill();ctx.restore();
  await e.logo({w:74,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:c.text,stroke:"rgba(0,0,0,.4)",shadow:true})
}
async function backLuxury(e){
  const {ctx,W,H,c}=e;e.backBase("#11100F");
  const g=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,420);g.addColorStop(0,rgba(c.element,.20));g.addColorStop(1,"rgba(0,0,0,0)");ctx.save();ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,26,c.element,2);strokeRound(ctx,31,31,W-62,H-62,19,rgba(c.element,.5),1);
  star(ctx,W/2,170,12,5,c.element,0,4);star(ctx,W/2,H-170,12,5,c.element,0,4);
  await e.backLogo({maxWidth:245})
}

async function frontPrincess(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();let g=ctx.createLinearGradient(0,0,0,220);g.addColorStop(0,"rgba(255,255,255,.42)");g.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,240);
  g=ctx.createLinearGradient(0,H-250,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,255,255,.46)");ctx.fillStyle=g;ctx.fillRect(0,H-260,W,260);ctx.restore();
  strokeRound(ctx,20,20,W-40,H-40,28,rgba(c.element,.86),1.6);pearlBorder(ctx,W,H,rgba(c.element,.92));
  tinyBow(ctx,76,76,34,c.element);tinyBow(ctx,W-76,H-76,34,c.element);
  // small crown
  ctx.save();ctx.strokeStyle=c.element;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W/2-32,52);ctx.lineTo(W/2-18,29);ctx.lineTo(W/2,49);ctx.lineTo(W/2+18,29);ctx.lineTo(W/2+32,52);ctx.stroke();for(const dx of [-18,18]){ctx.beginPath();ctx.arc(W/2+dx,28,3,0,Math.PI*2);ctx.fillStyle=c.element;ctx.fill()}ctx.restore();
  await e.logo({w:72,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:450,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backPrincess(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.94));pearlBorder(ctx,W,H,rgba(c.element,.9));strokeRound(ctx,20,20,W-40,H-40,28,rgba(c.element,.68),1.5);
  tinyBow(ctx,82,82,34,c.element);tinyBow(ctx,W-82,H-82,34,c.element);star(ctx,W/2,188,16,7,rgba(c.element,.65),0,4);
  await e.backLogo({maxWidth:245})
}

async function frontGothic(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle="rgba(5,3,8,.22)";ctx.fillRect(0,0,W,H);let g=ctx.createLinearGradient(0,H*.62,0,H);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.66)");ctx.fillStyle=g;ctx.fillRect(0,H*.55,W,H*.45);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,26,rgba(c.element,.92),1.8);strokeRound(ctx,29,29,W-58,H-58,19,"rgba(0,0,0,.78)",2);
  for(const [x,y] of [[62,62],[W-62,62],[62,H-62],[W-62,H-62]]){ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.strokeStyle=c.element;ctx.lineWidth=2;ctx.strokeRect(-12,-12,24,24);ctx.restore();line(ctx,x-22,y,x+22,y,rgba(c.element,.68),1);line(ctx,x,y-22,x,y+22,rgba(c.element,.68),1)}
  await e.logo({w:72,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:460,size:c.fontSize,font:c.font,fill:c.text,stroke:"#09070A",shadow:true})
}
async function backGothic(e){
  const {ctx,W,H,c}=e;e.backBase("#0B0A0E");
  ctx.save();ctx.strokeStyle=rgba(c.element,.25);ctx.lineWidth=1;for(let y=72;y<H;y+=92)for(let x=62;x<W;x+=92){ctx.save();ctx.translate(x+(Math.floor(y/92)%2?46:0),y);ctx.rotate(Math.PI/4);ctx.strokeRect(-19,-19,38,38);ctx.restore()}ctx.restore();
  strokeRound(ctx,20,20,W-40,H-40,26,rgba(c.element,.8),1.7);await e.backLogo({maxWidth:245})
}

async function frontAngel(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();let g=ctx.createLinearGradient(0,0,0,210);g.addColorStop(0,"rgba(255,255,255,.58)");g.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,240);
  g=ctx.createLinearGradient(0,H-280,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,255,255,.62)");ctx.fillStyle=g;ctx.fillRect(0,H-300,W,300);ctx.restore();
  angelWing(ctx,88,H-250,1,"rgba(255,255,255,.88)");angelWing(ctx,W-88,H-250,-1,"rgba(255,255,255,.88)");
  for(const [x,y,s] of [[70,160,12],[W-76,210,9],[120,420,8],[W-116,470,11],[90,720,8],[W-92,680,7]])star(ctx,x,y,s,s*.18,"rgba(255,255,255,.94)",0,4);
  ctx.save();ctx.strokeStyle=rgba(c.element,.75);ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(c.frontLogoX??W/2,(c.frontLogoY??76)-20,54,15,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  await e.logo({w:70,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:460,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backAngel(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.95));
  ctx.save();ctx.fillStyle="rgba(255,255,255,.75)";for(const [x,y,r] of [[80,190,80],[160,210,110],[275,190,96],[420,215,120],[560,188,86],[110,820,95],[250,840,115],[430,820,125],[580,845,80]]){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}ctx.restore();
  ctx.save();ctx.strokeStyle=rgba(c.element,.72);ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(c.backLogoX??W/2,(c.backLogoY??H/2)-90,112,31,0,0,Math.PI*2);ctx.stroke();ctx.restore();await e.backLogo({maxWidth:230})
}

async function frontCyber(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle="rgba(2,11,20,.12)";ctx.fillRect(0,0,W,H);for(let y=40;y<H;y+=18){ctx.fillStyle="rgba(255,255,255,.035)";ctx.fillRect(0,y,W,1)}ctx.restore();
  cyberFrame(ctx,W,H,c.element);
  // HUD brackets
  ctx.save();ctx.strokeStyle=c.element;ctx.lineWidth=3;for(const [x,y,sx,sy] of [[56,92,1,1],[W-56,92,-1,1],[56,H-126,1,-1],[W-56,H-126,-1,-1]]){ctx.beginPath();ctx.moveTo(x+40*sx,y);ctx.lineTo(x,y);ctx.lineTo(x,y+40*sy);ctx.stroke()}ctx.restore();
  ctx.save();ctx.fillStyle="rgba(3,10,18,.72)";ctx.beginPath();ctx.roundRect(72,H-158,W-144,102,12);ctx.fill();ctx.strokeStyle=rgba(c.element,.82);ctx.lineWidth=1;ctx.stroke();ctx.restore();
  line(ctx,96,H-138,W-96,H-138,rgba(c.element,.55),1);
  await e.logo({w:68,effects:false});
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:c.text,stroke:"#071018",shadow:true})
}
async function backCyber(e){
  const {ctx,W,H,c}=e;e.backBase("#071018");cyberFrame(ctx,W,H,c.element);
  ctx.save();ctx.strokeStyle=rgba(c.element,.30);ctx.lineWidth=1;
  for(let y=610;y<H-40;y+=54){ctx.beginPath();ctx.moveTo(48,y);ctx.lineTo(W-48,y);ctx.stroke()}
  for(let x=50;x<W;x+=55){ctx.beginPath();ctx.moveTo(W/2,390);ctx.lineTo(x,H-42);ctx.stroke()}ctx.restore();
  star(ctx,72,120,9,2,c.text,0,4);star(ctx,W-72,H-124,9,2,c.text,0,4);await e.backLogo({maxWidth:230})
}

async function frontArcade(e){
  const {ctx,W,H,c}=e;e.backBase("#111321");
  checker(ctx,18,18,W-36,56,18,rgba(c.element,.85),"rgba(255,255,255,.12)",1);
  checker(ctx,18,H-74,W-36,56,18,rgba(c.element,.85),"rgba(255,255,255,.12)",1);
  e.photoRect(30,88,W-60,H-220,12);
  ctx.save();ctx.strokeStyle="#FFFFFF";ctx.lineWidth=4;ctx.strokeRect(28,86,W-56,H-216);ctx.strokeStyle=c.element;ctx.lineWidth=2;ctx.strokeRect(34,92,W-68,H-228);ctx.restore();
  pixelHeart(ctx,78,52,30,c.text);pixelHeart(ctx,116,52,30,c.text);pixelHeart(ctx,154,52,30,c.text);
  await e.logo({w:66,effects:false});
  ctx.save();ctx.fillStyle="rgba(17,19,33,.86)";ctx.fillRect(42,H-172,W-84,92);ctx.restore();
  e.name({x:c.textX,y:c.textY,maxWidth:480,size:c.fontSize,font:c.font,fill:c.text,stroke:"#111321",shadow:false})
}
async function backArcade(e){
  const {ctx,W,H,c}=e;e.backBase("#111321");checker(ctx,20,20,W-40,H-40,42,rgba(c.element,.26),"rgba(255,255,255,.035)",1);
  pixelHeart(ctx,90,100,36,c.text);pixelHeart(ctx,W-90,100,36,c.text);pixelHeart(ctx,90,H-100,36,c.text);pixelHeart(ctx,W-90,H-100,36,c.text);
  ctx.save();ctx.strokeStyle=rgba(c.element,.8);ctx.lineWidth=4;ctx.strokeRect(36,36,W-72,H-72);ctx.restore();await e.backLogo({maxWidth:225})
}

async function frontEditorial(e){
  const {ctx,W,H,c}=e;e.photoRect(18,18,W-36,H-36,20);
  ctx.save();ctx.fillStyle=rgba(c.element,.92);ctx.fillRect(18,18,72,H-36);ctx.fillStyle="rgba(255,255,255,.92)";ctx.fillRect(W-284,H-236,266,218);ctx.fillStyle="rgba(255,255,255,.88)";ctx.fillRect(90,18,210,86);ctx.restore();
  line(ctx,90,118,W-18,118,"rgba(255,255,255,.72)",1);line(ctx,314,118,314,H-236,"rgba(255,255,255,.48)",1);
  await e.logo({w:66,effects:false});
  e.name({x:c.textX,y:c.textY,maxWidth:230,size:c.fontSize,font:c.font,fill:"#111111",stroke:"#FFFFFF",shadow:false});
  ctx.save();ctx.fillStyle=rgba(c.element,.65);ctx.fillRect(W-264,H-86,110,4);ctx.fillRect(W-140,H-86,76,4);ctx.restore()
}
async function backEditorial(e){
  const {ctx,W,H,c}=e;e.backBase("#F8F8F6");
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,92,H);ctx.fillStyle=rgba(c.element,.15);ctx.fillRect(92,0,W-92,136);ctx.fillRect(W-220,136,220,H-136);ctx.restore();
  line(ctx,122,186,W-54,186,rgba(c.element,.45),1);line(ctx,122,186,122,H-74,rgba(c.element,.45),1);await e.backLogo({maxWidth:225})
}

async function frontSplit(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle=rgba(c.element,.90);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(232,0);ctx.lineTo(196,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.10)";ctx.beginPath();ctx.moveTo(205,0);ctx.lineTo(244,0);ctx.lineTo(207,H);ctx.lineTo(170,H);ctx.closePath();ctx.fill();ctx.restore();
  await e.logo({w:74,effects:false});
  line(ctx,54,c.textY-45,190,c.textY-45,rgba(c.text,.72),1.5);
  e.name({x:c.textX,y:c.textY,maxWidth:210,size:c.fontSize,font:c.font,fill:c.text,stroke:rgba(c.element,.8),shadow:false});
  strokeRound(ctx,18,18,W-36,H-36,26,"rgba(255,255,255,.48)",1)
}
async function backSplit(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.92));
  ctx.save();ctx.fillStyle=c.element;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(265,0);ctx.lineTo(225,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();ctx.fillStyle="rgba(255,255,255,.16)";ctx.beginPath();ctx.moveTo(238,0);ctx.lineTo(281,0);ctx.lineTo(241,H);ctx.lineTo(198,H);ctx.closePath();ctx.fill();ctx.restore();
  await e.backLogo({maxWidth:230})
}


function tape(ctx,x,y,w,h,angle,color="rgba(245,220,164,.82)"){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-w/2+8,-h/2);ctx.lineTo(w/2,-h/2+3);ctx.lineTo(w/2-7,h/2);ctx.lineTo(-w/2,h/2-2);ctx.closePath();ctx.fill();ctx.restore()
}
function paperLines(ctx,W,H,start=90,step=48,color="rgba(91,132,170,.20)"){
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1;for(let y=start;y<H-40;y+=step){ctx.beginPath();ctx.moveTo(42,y);ctx.lineTo(W-34,y);ctx.stroke()}ctx.restore()
}
function barcode(ctx,x,y,w,h,color="#111"){
  ctx.save();ctx.fillStyle=color;let px=x;const seq=[2,1,4,2,1,3,2,5,1,2,4,1,3,2,1,5,2,2,3,1,4,2,1,3,5,1,2,4,1,2,3,1];
  for(let i=0;i<seq.length&&px<x+w;i++){const bw=seq[i]*1.6;if(i%2===0)ctx.fillRect(px,y,Math.min(bw,x+w-px),h);px+=bw}
  ctx.restore()
}
function butterflyIcon(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.strokeStyle=color;ctx.lineWidth=Math.max(1.4,s*.055);ctx.fillStyle=rgba(color,.10);
  ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(-s*.18,-s*.42,-s*.60,-s*.34,-s*.50,0);ctx.bezierCurveTo(-s*.42,s*.30,-s*.12,s*.25,0,0);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(s*.18,-s*.42,s*.60,-s*.34,s*.50,0);ctx.bezierCurveTo(s*.42,s*.30,s*.12,s*.25,0,0);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,-s*.06);ctx.lineTo(0,s*.30);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-s*.08);ctx.quadraticCurveTo(-s*.10,-s*.24,-s*.18,-s*.29);ctx.moveTo(0,-s*.08);ctx.quadraticCurveTo(s*.10,-s*.24,s*.18,-s*.29);ctx.stroke();ctx.restore()
}
function cherryIcon(ctx,x,y,s,color="#D91E4B",leaf="#4E9B5B"){
  ctx.save();ctx.strokeStyle=leaf;ctx.lineWidth=Math.max(1.5,s*.05);ctx.beginPath();ctx.moveTo(x,y-s*.38);ctx.quadraticCurveTo(x-s*.22,y-s*.12,x-s*.30,y+s*.12);ctx.moveTo(x,y-s*.38);ctx.quadraticCurveTo(x+s*.20,y-s*.16,x+s*.27,y+s*.12);ctx.stroke();
  ctx.fillStyle=color;for(const [dx,dy] of [[-s*.30,s*.20],[s*.28,s*.20]]){ctx.beginPath();ctx.arc(x+dx,y+dy,s*.22,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle=leaf;ctx.beginPath();ctx.ellipse(x+s*.13,y-s*.38,s*.16,s*.08,-.35,0,Math.PI*2);ctx.fill();ctx.restore()
}
function strawberryIcon(ctx,x,y,s,color="#E73F61",leaf="#4E9B5B"){
  ctx.save();ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+s*.36);ctx.bezierCurveTo(x-s*.42,y+s*.06,x-s*.34,y-s*.35,x,y-s*.26);ctx.bezierCurveTo(x+s*.34,y-s*.35,x+s*.42,y+s*.06,x,y+s*.36);ctx.fill();
  ctx.fillStyle=leaf;for(let i=-2;i<=2;i++){ctx.save();ctx.translate(x,y-s*.28);ctx.rotate(i*.34);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-s*.08,-s*.17);ctx.lineTo(s*.08,-s*.17);ctx.closePath();ctx.fill();ctx.restore()}
  ctx.fillStyle="#FFD9A2";for(const [dx,dy] of [[-.15,-.05],[.14,-.08],[0,.08],[-.10,.19],[.12,.19]]){ctx.beginPath();ctx.ellipse(x+s*dx,y+s*dy,s*.022,s*.045,0,0,Math.PI*2);ctx.fill()}ctx.restore()
}
function bulb(ctx,x,y,r,frameColor){
  ctx.save();ctx.shadowColor="rgba(255,235,170,.99)";ctx.shadowBlur=r*2.9;ctx.fillStyle="#FFF6CF";ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=rgba(frameColor,.58);ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle="rgba(255,255,255,.99)";ctx.beginPath();ctx.arc(x-r*.25,y-r*.28,r*.31,0,Math.PI*2);ctx.fill();ctx.restore()
}
function dressingBulbs(ctx,W,H,frameColor,r=10){
  const large=r>=13,left=54,right=W-54,top=56,bottom=790,stepX=large?74:66,stepY=large?78:68,startX=large?103:96,startY=large?126:116,endY=large?716:730;
  for(let x=startX;x<=W-startX;x+=stepX)bulb(ctx,x,top,r,frameColor);
  for(let x=startX;x<=W-startX;x+=stepX)bulb(ctx,x,bottom,r,frameColor);
  for(let y=startY;y<=endY;y+=stepY){bulb(ctx,left,y,r,frameColor);bulb(ctx,right,y,r,frameColor)}
}
function glowFrame(ctx,W,H,color){
  ctx.save();ctx.shadowColor=color;ctx.shadowBlur=24;ctx.strokeStyle=rgba(color,.92);ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(20,20,W-40,H-40,28);ctx.stroke();ctx.shadowBlur=9;ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(32,32,W-64,H-64,20);ctx.stroke();ctx.restore()
}
function twinkle(ctx,x,y,r,color="rgba(255,248,210,.98)",glow=14){
  ctx.save();ctx.translate(x,y);ctx.shadowColor=color;ctx.shadowBlur=glow;ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineCap="round";
  ctx.lineWidth=Math.max(1.2,r*.18);ctx.beginPath();ctx.moveTo(-r,0);ctx.lineTo(r,0);ctx.moveTo(0,-r);ctx.lineTo(0,r);ctx.stroke();
  ctx.lineWidth=Math.max(1,r*.10);ctx.beginPath();ctx.moveTo(-r*.55,-r*.55);ctx.lineTo(r*.55,r*.55);ctx.moveTo(r*.55,-r*.55);ctx.lineTo(-r*.55,r*.55);ctx.stroke();
  ctx.shadowBlur=0;ctx.beginPath();ctx.arc(0,0,Math.max(1.3,r*.13),0,Math.PI*2);ctx.fill();ctx.restore()
}

async function frontGradientGlow(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,rgba(c.element,.28));g.addColorStop(.45,"rgba(255,255,255,0)");g.addColorStop(1,rgba(c.text,.24));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  glowFrame(ctx,W,H,c.element);
  for(const [x,y,r,a] of [[86,180,22,.20],[548,248,30,.15],[94,684,34,.13],[552,742,22,.18],[320,142,18,.14]]){ctx.save();ctx.fillStyle=rgba(c.element,a);ctx.shadowColor=c.element;ctx.shadowBlur=24;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore()}
  ctx.save();ctx.fillStyle="rgba(8,8,18,.34)";ctx.beginPath();ctx.roundRect(76,H-154,W-152,98,24);ctx.fill();ctx.restore();
  await e.logo({w:70,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backGradientGlow(e){
  const {ctx,W,H,c}=e;e.backBase("#12131C");const g=ctx.createRadialGradient(W/2,H/2,20,W/2,H/2,430);g.addColorStop(0,rgba(c.element,.38));g.addColorStop(.48,rgba(c.text,.14));g.addColorStop(1,"rgba(0,0,0,0)");ctx.save();ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();glowFrame(ctx,W,H,c.element);await e.backLogo({maxWidth:245})
}

async function frontNeon(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();ctx.fillStyle="rgba(5,5,12,.28)";ctx.fillRect(0,0,W,H);ctx.restore();
  glowFrame(ctx,W,H,c.element);ctx.save();ctx.strokeStyle=c.text;ctx.shadowColor=c.text;ctx.shadowBlur=14;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(76,164);ctx.lineTo(192,164);ctx.moveTo(W-76,164);ctx.lineTo(W-192,164);ctx.moveTo(88,H-178);ctx.lineTo(220,H-178);ctx.moveTo(W-88,H-178);ctx.lineTo(W-220,H-178);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(3,3,10,.62)";ctx.beginPath();ctx.roundRect(70,H-160,W-140,106,18);ctx.fill();ctx.restore();await e.logo({w:70,effects:false});e.name({x:c.textX,y:c.textY,maxWidth:445,size:c.fontSize,font:c.font,fill:c.text,stroke:c.element,shadow:false})
}
async function backNeon(e){
  const {ctx,W,H,c}=e;e.backBase("#090912");glowFrame(ctx,W,H,c.element);ctx.save();ctx.strokeStyle=c.text;ctx.shadowColor=c.text;ctx.shadowBlur=18;ctx.lineWidth=2;ctx.beginPath();ctx.arc(W/2,H/2,190,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=8;ctx.beginPath();ctx.arc(W/2,H/2,160,0,Math.PI*2);ctx.stroke();ctx.restore();await e.backLogo({maxWidth:235})
}

async function frontScrapbook(e){
  const {ctx,W,H,c}=e;e.backBase("#F4EBDD");paperLines(ctx,W,H,110,54,"rgba(129,151,160,.12)");
  ctx.save();ctx.shadowColor="rgba(70,55,38,.24)";ctx.shadowBlur=18;ctx.shadowOffsetY=8;e.fillRound(44,92,W-88,694,8,"#FFFDF8");ctx.restore();e.photoRect(55,103,W-110,672,3);
  tape(ctx,118,105,130,34,-.10,rgba(c.element,.72));tape(ctx,W-120,770,128,34,.09,rgba(c.text,.70));
  star(ctx,82,850,18,7,rgba(c.element,.82),.2,5);heart(ctx,W-78,842,22,rgba(c.element,.72));tinyBow(ctx,W-96,166,28,rgba(c.element,.65));
  ctx.save();ctx.strokeStyle="rgba(80,68,54,.28)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(84,812);ctx.bezierCurveTo(160,786,212,826,282,804);ctx.stroke();ctx.restore();
  centeredText(ctx,"memo",103,916,'500 18px "Caveat",cursive',"rgba(92,73,56,.48)",1);
  line(ctx,150,918,W-76,918,"rgba(92,73,56,.19)",1);
  await e.logo({w:68,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font||"Caveat",fill:"#4A3D31",stroke:"#F4EBDD",shadow:true})
}
async function backScrapbook(e){
  const {ctx,W,H,c}=e;e.backBase("#F4EBDD");paperLines(ctx,W,H,80,52,"rgba(129,151,160,.12)");tape(ctx,112,96,144,38,-.08,rgba(c.element,.64));tape(ctx,W-116,H-94,146,38,.08,rgba(c.text,.62));star(ctx,96,222,22,8,rgba(c.element,.70),.2,5);heart(ctx,W-92,H-224,28,rgba(c.element,.68));strokeRound(ctx,54,54,W-108,H-108,24,"rgba(112,92,68,.22)",1.2);await e.backLogo({maxWidth:235})
}

async function frontDiary(e){
  const {ctx,W,H,c}=e;e.backBase("#FFF9ED");paperLines(ctx,W,H,96,46,"rgba(102,154,196,.26)");line(ctx,88,52,88,H-48,"rgba(225,93,98,.35)",2);
  ctx.save();ctx.fillStyle="#F3E8D8";for(let y=82;y<H-40;y+=68){ctx.beginPath();ctx.arc(32,y,9,0,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(80,70,60,.15)";ctx.stroke()}ctx.restore();
  ctx.save();ctx.shadowColor="rgba(71,60,45,.20)";ctx.shadowBlur=15;ctx.shadowOffsetY=5;e.fillRound(112,124,W-158,575,6,"#FFFFFF");ctx.restore();e.photoRect(124,136,W-182,551,3);tape(ctx,324,132,154,34,-.03,rgba(c.element,.54));
  ctx.save();ctx.strokeStyle=rgba(c.element,.62);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(120,742);ctx.quadraticCurveTo(220,718,308,746);ctx.quadraticCurveTo(410,770,520,736);ctx.stroke();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#493E35",stroke:"#FFF9ED",shadow:false})
}
async function backDiary(e){
  const {ctx,W,H,c}=e;e.backBase("#FFF9ED");paperLines(ctx,W,H,80,46,"rgba(102,154,196,.25)");line(ctx,88,48,88,H-48,"rgba(225,93,98,.34)",2);for(let y=82;y<H-40;y+=68){ctx.save();ctx.fillStyle="#F3E8D8";ctx.beginPath();ctx.arc(32,y,9,0,Math.PI*2);ctx.fill();ctx.restore()}await e.backLogo({maxWidth:230})
}

async function frontLoveLetter(e){
  const {ctx,W,H,c}=e;e.backBase("#F8E3EC");
  ctx.save();const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,"rgba(255,255,255,.58)");bg.addColorStop(.52,"rgba(255,235,244,.18)");bg.addColorStop(1,"rgba(226,147,177,.20)");ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.restore();
  // subtle paper grain dots
  ctx.save();ctx.fillStyle="rgba(181,102,132,.055)";for(let y=38;y<H;y+=34)for(let x=34;x<W;x+=38){ctx.beginPath();ctx.arc(x+(y%68?5:0),y,1.1,0,Math.PI*2);ctx.fill()}ctx.restore();
  strokeRound(ctx,24,24,W-48,H-48,28,"rgba(198,103,138,.38)",1.5);
  centeredText(ctx,"Love Letter",W/2,72,'400 45px "Parisienne",cursive',"#B75D7D",0);
  heart(ctx,174,70,12,"rgba(215,112,150,.72)");heart(ctx,W-174,70,12,"rgba(215,112,150,.72)");
  ctx.save();ctx.shadowColor="rgba(103,57,75,.18)";ctx.shadowBlur=18;ctx.shadowOffsetY=7;e.fillRound(58,126,W-116,604,18,"#FFFDFB");ctx.restore();
  e.photoRect(72,140,W-144,576,12);
  tape(ctx,112,145,108,30,-.12,"rgba(248,202,219,.78)");
  // hearts hug the photo frame rather than floating separately
  heart(ctx,64,195,22,"rgba(224,119,157,.82)");heart(ctx,W-63,250,17,"rgba(224,119,157,.72)");
  heart(ctx,82,682,16,"rgba(224,119,157,.65)");heart(ctx,W-76,654,24,"rgba(224,119,157,.80)");
  ctx.save();ctx.strokeStyle="rgba(198,103,138,.30)";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(82,765);ctx.quadraticCurveTo(210,742,325,766);ctx.quadraticCurveTo(448,788,W-82,760);ctx.stroke();ctx.restore();
  // dedicated signature/name field
  ctx.save();ctx.fillStyle="rgba(255,250,252,.88)";ctx.shadowColor="rgba(116,60,79,.13)";ctx.shadowBlur=8;ctx.beginPath();ctx.roundRect(112,812,W-224,118,28);ctx.fill();ctx.restore();
  line(ctx,160,907,W-160,907,"rgba(185,94,126,.22)",1);
  ctx.save();ctx.fillStyle="rgba(205,111,145,.90)";ctx.shadowColor="rgba(100,40,50,.18)";ctx.shadowBlur=7;ctx.beginPath();ctx.arc(92,870,31,0,Math.PI*2);ctx.fill();ctx.restore();heart(ctx,92,870,16,"#FFF5F8");
  await e.logo({w:64,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:380,size:c.fontSize,font:c.font,fill:"#704657",stroke:"#FFF9FB",shadow:false})
}
async function backLoveLetter(e){
  const {ctx,W,H,c}=e;e.backBase("#F8E3EC");strokeRound(ctx,24,24,W-48,H-48,28,"rgba(198,103,138,.38)",1.5);
  centeredText(ctx,"Love Letter",W/2,86,'400 39px "Parisienne",cursive',"#B75D7D",0);
  ctx.save();ctx.strokeStyle="rgba(198,103,138,.38)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(40,270);ctx.lineTo(W/2,H/2+42);ctx.lineTo(W-40,270);ctx.moveTo(40,H-40);ctx.lineTo(W/2,H/2+42);ctx.lineTo(W-40,H-40);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(205,111,145,.90)";ctx.beginPath();ctx.arc(W/2,H/2+42,42,0,Math.PI*2);ctx.fill();ctx.restore();heart(ctx,W/2,H/2+42,20,"#FFF5F8");
  await e.backLogo({maxWidth:180})
}

async function frontConcertTicket(e){
  const {ctx,W,H,c}=e;e.backBase("#F7F2EA");ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,150,H);ctx.restore();e.photoRect(166,34,W-200,H-68,18);
  // perforation
  ctx.save();ctx.setLineDash([8,10]);ctx.strokeStyle="rgba(80,70,60,.40)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(150,34);ctx.lineTo(150,H-34);ctx.stroke();ctx.restore();
  for(const y of [32,H-32]){ctx.save();ctx.fillStyle="#FFFFFF";ctx.beginPath();ctx.arc(150,y,16,0,Math.PI*2);ctx.fill();ctx.restore()}
  ctx.save();ctx.translate(76,H/2);ctx.rotate(-Math.PI/2);ctx.textAlign="center";ctx.fillStyle="#FFFFFF";ctx.font='500 24px "Montserrat",sans-serif';ctx.fillText("ADMIT ONE · LIVE",0,0);ctx.restore();
  barcode(ctx,42,H-210,72,116,"rgba(255,255,255,.88)");await e.logo({w:70,effects:true});
  ctx.save();ctx.fillStyle="rgba(10,10,12,.58)";ctx.beginPath();ctx.roundRect(190,H-150,W-244,96,16);ctx.fill();ctx.restore();e.name({x:c.textX,y:c.textY,maxWidth:335,size:c.fontSize,font:c.font,fill:c.text,stroke:"#111111",shadow:true})
}
async function backConcertTicket(e){
  const {ctx,W,H,c}=e;e.backBase("#F7F2EA");ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,150,H);ctx.restore();ctx.save();ctx.setLineDash([8,10]);ctx.strokeStyle="rgba(80,70,60,.35)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(150,34);ctx.lineTo(150,H-34);ctx.stroke();ctx.restore();barcode(ctx,44,H-220,70,132,"rgba(255,255,255,.90)");await e.backLogo({maxWidth:230})
}

async function frontAlbumTracklist(e){
  const {ctx,W,H,c}=e;e.backBase("#F2F0EC");
  const cx=W/2,cy=318,outerR=258,photoR=246;
  ctx.save();ctx.shadowColor="rgba(0,0,0,.30)";ctx.shadowBlur=24;ctx.shadowOffsetY=9;ctx.fillStyle="#111214";ctx.beginPath();ctx.arc(cx,cy,outerR,0,Math.PI*2);ctx.fill();ctx.restore();
  // picture-disc circular photo
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,photoR,0,Math.PI*2);ctx.clip();e.photoRect(cx-photoR,cy-photoR,photoR*2,photoR*2,0);ctx.restore();
  // vinyl grooves on top
  ctx.save();for(let r=250;r>=92;r-=13){ctx.strokeStyle=r%26===3?"rgba(255,255,255,.11)":"rgba(0,0,0,.15)";ctx.lineWidth=.9;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke()}ctx.restore();
  ctx.save();ctx.fillStyle=rgba(c.element,.90);ctx.shadowColor="rgba(0,0,0,.25)";ctx.shadowBlur=6;ctx.beginPath();ctx.arc(cx,cy,45,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(255,255,255,.92)";ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fill();ctx.restore();
  centeredText(ctx,"SIDE A",90,606,'600 13px "Space Grotesk",sans-serif',rgba(c.element,.72),2.5);
  for(let i=0;i<6;i++){const y=646+i*30;centeredText(ctx,String(i+1).padStart(2,"0"),92,y,'500 12px "Space Grotesk",sans-serif',rgba(c.element,.55),1);line(ctx,122,y,W-76,y,rgba(c.element,i===0?.50:.24),i===0?2:1)}
  e.name({x:c.textX,y:c.textY,maxWidth:470,size:c.fontSize,font:c.font,fill:"#242424",stroke:"#F2F0EC",shadow:false});await e.logo({w:68,effects:true})
}
async function backAlbumTracklist(e){
  const {ctx,W,H,c}=e;e.backBase("#F2F0EC");centeredText(ctx,"SIDE B",W/2,116,'600 15px "Space Grotesk",sans-serif',rgba(c.element,.72),4);
  ctx.save();ctx.globalAlpha=.055;ctx.fillStyle="#111";ctx.beginPath();ctx.arc(W-20,410,250,0,Math.PI*2);ctx.fill();for(let r=225;r>70;r-=15){ctx.strokeStyle="#FFF";ctx.lineWidth=1;ctx.beginPath();ctx.arc(W-20,410,r,0,Math.PI*2);ctx.stroke()}ctx.restore();
  for(let i=0;i<8;i++){const y=190+i*68;centeredText(ctx,String(i+1).padStart(2,"0"),95,y,'500 13px "Space Grotesk",sans-serif',rgba(c.element,.55),1);line(ctx,135,y,W-72,y,rgba(c.element,.28),1)}await e.backLogo({maxWidth:180})
}

async function frontStarryNight(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();ctx.fillStyle="rgba(6,12,35,.28)";ctx.fillRect(0,0,W,H);let g=ctx.createLinearGradient(0,H*.55,0,H);g.addColorStop(0,"rgba(5,10,28,0)");g.addColorStop(1,"rgba(5,10,28,.62)");ctx.fillStyle=g;ctx.fillRect(0,H*.5,W,H*.5);ctx.restore();
  const stars=[[42,82,4],[68,118,3],[118,184,3],[144,112,4],[176,158,2.5],[220,94,3],[268,142,2.5],[300,122,3],[344,88,3],[378,220,4],[430,126,2.5],[482,180,3],[540,130,4],[594,112,2.5],[578,270,3],[62,338,2.5],[128,302,3],[514,332,2.5],[594,390,3],[72,510,3],[142,548,2.5],[526,502,3],[558,584,5],[84,648,2.5],[184,620,3],[245,688,3],[420,654,2.5],[112,736,4],[505,740,3],[586,690,2.5]];
  for(const [x,y,s] of stars){ctx.save();ctx.shadowColor="rgba(255,247,205,.92)";ctx.shadowBlur=s*2.4;star(ctx,x,y,s,s*.18,"rgba(255,247,205,.96)",0,4);ctx.restore()}
  const twinkles=[[76,112,9],[132,142,6],[188,96,7],[252,192,5],[332,168,7],[446,96,8],[552,210,6],[92,430,6],[570,474,8],[152,696,7],[454,724,6],[548,620,5],[302,566,5]];
  for(const [x,y,r] of twinkles)twinkle(ctx,x,y,r,"rgba(255,250,222,.98)",r*1.8);
  ctx.save();ctx.shadowColor="rgba(255,245,195,.90)";ctx.shadowBlur=24;ctx.fillStyle="rgba(255,245,195,.94)";ctx.beginPath();ctx.arc(92,160,34,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="rgba(12,18,44,.96)";ctx.beginPath();ctx.arc(108,146,34,0,Math.PI*2);ctx.fill();ctx.restore();
  twinkle(ctx,46,172,7,"rgba(255,250,222,.98)",16);twinkle(ctx,154,210,5,"rgba(255,250,222,.95)",12);
  await e.logo({w:68,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:450,size:c.fontSize,font:c.font,fill:c.text,stroke:"#0B1230",shadow:true})
}
async function backStarryNight(e){
  const {ctx,W,H,c}=e;e.backBase("#0B1230");for(let y=64;y<H;y+=68)for(let x=42;x<W;x+=78){const px=x+((Math.floor(y/68)%2)*30),s=2.2+((x+y)%4);ctx.save();ctx.shadowColor="rgba(255,247,205,.62)";ctx.shadowBlur=s*1.8;star(ctx,px,y,s,Math.max(.8,s*.18),"rgba(255,247,205,.82)",0,4);ctx.restore()}
  for(const [x,y,r] of [[92,142,7],[554,164,6],[168,306,5],[490,356,7],[92,596,5],[552,650,7],[184,822,6],[462,850,5]])twinkle(ctx,x,y,r,"rgba(255,250,222,.92)",r*1.6);
  ctx.save();ctx.strokeStyle=rgba(c.element,.38);ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(W/2,H/2,220,0,Math.PI*2);ctx.stroke();ctx.restore();await e.backLogo({maxWidth:235})
}

async function frontButterfly(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();let g=ctx.createLinearGradient(0,H*.60,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,255,255,.48)");ctx.fillStyle=g;ctx.fillRect(0,H*.55,W,H*.45);ctx.restore();
  butterflyIcon(ctx,76,142,72,rgba(c.element,.86),-.30);butterflyIcon(ctx,W-92,244,50,rgba(c.text,.92),.24);butterflyIcon(ctx,106,H-230,44,rgba(c.text,.80),.18);butterflyIcon(ctx,W-80,H-178,68,rgba(c.element,.82),-.20);
  strokeRound(ctx,18,18,W-36,H-36,28,"rgba(255,255,255,.60)",1.3);await e.logo({w:68,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:450,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backButterfly(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.95));butterflyIcon(ctx,100,172,78,rgba(c.element,.74),-.22);butterflyIcon(ctx,W-112,H-178,88,rgba(c.element,.68),.18);butterflyIcon(ctx,W-96,240,44,rgba(c.text,.74),.28);butterflyIcon(ctx,122,H-274,42,rgba(c.text,.70),-.28);strokeRound(ctx,20,20,W-40,H-40,28,rgba(c.element,.42),1.2);await e.backLogo({maxWidth:235})
}

async function frontCherryStrawberry(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  cherryIcon(ctx,82,134,60,"#D91E4B","#4E9B5B");strawberryIcon(ctx,W-92,170,66,"#E73F61","#4E9B5B");cherryIcon(ctx,W-86,H-198,48,"#D91E4B","#4E9B5B");strawberryIcon(ctx,96,H-190,52,"#E73F61","#4E9B5B");
  await e.logo({w:68,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:440,size:c.fontSize,font:c.font,fill:"#5B2D38",stroke:"#FFF7F3",shadow:false})
}
async function backCherryStrawberry(e){
  const {ctx,W,H,c}=e;e.backBase("#FFF7F3");
  cherryIcon(ctx,84,132,58,"#D91E4B","#4E9B5B");strawberryIcon(ctx,W-92,166,62,"#E73F61","#4E9B5B");
  strawberryIcon(ctx,102,H-166,56,"#E73F61","#4E9B5B");cherryIcon(ctx,W-94,H-136,56,"#D91E4B","#4E9B5B");
  strokeRound(ctx,22,22,W-44,H-44,28,rgba(c.element,.42),1.4);
  await e.backLogo({maxWidth:220})
}

async function frontDressingMirror(e){
  const {ctx,W,H,c}=e;e.backBase("#25211F");
  ctx.save();ctx.shadowColor="rgba(0,0,0,.55)";ctx.shadowBlur=26;ctx.shadowOffsetY=12;e.fillRound(34,28,W-68,790,24,lighten(c.element,.78));ctx.restore();
  e.fillRound(78,76,W-156,690,8,"#171717");e.photoRect(88,86,W-176,670,4);
  ctx.save();const g=ctx.createLinearGradient(88,86,W-88,756);g.addColorStop(0,"rgba(255,255,255,.13)");g.addColorStop(.35,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,255,255,.06)");ctx.fillStyle=g;ctx.fillRect(88,86,W-176,670);ctx.restore();
  dressingBulbs(ctx,W,H,c.element,14);strokeRound(ctx,34,28,W-68,790,24,rgba(c.element,.60),2);
  // frame ends at y=818; plate begins at 864, leaving a deliberate 46px breathing gap.
  ctx.save();ctx.fillStyle=lighten(c.element,.82);ctx.shadowColor="rgba(0,0,0,.35)";ctx.shadowBlur=12;ctx.beginPath();ctx.roundRect(92,864,W-184,112,18);ctx.fill();ctx.restore();
  await e.logo({w:64,effects:false});e.name({x:c.textX,y:c.textY,maxWidth:380,size:c.fontSize,font:c.font,fill:"#3B3028",stroke:"#FFFFFF",shadow:false})
}
async function backDressingMirror(e){
  const {ctx,W,H,c}=e;e.backBase("#25211F");
  // One continuous vanity mirror frame: no detached lower dark strip.
  ctx.save();ctx.shadowColor="rgba(0,0,0,.55)";ctx.shadowBlur=26;ctx.shadowOffsetY=7;e.fillRound(34,28,W-68,H-56,24,lighten(c.element,.78));ctx.restore();
  e.fillRound(78,76,W-156,H-152,10,"#B8B2AC");
  ctx.save();const g=ctx.createLinearGradient(88,86,W-88,H-86);g.addColorStop(0,"rgba(255,255,255,.72)");g.addColorStop(.42,"rgba(255,255,255,.16)");g.addColorStop(1,"rgba(55,62,68,.18)");ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(88,86,W-176,H-172,6);ctx.fill();ctx.restore();
  // Bulbs now wrap the full top, bottom, left and right perimeter.
  const left=54,right=W-54,top=56,bottom=H-56,r=12;
  for(let x=98;x<=W-98;x+=72){bulb(ctx,x,top,r,c.element);bulb(ctx,x,bottom,r,c.element)}
  for(let y=126;y<=H-126;y+=78){bulb(ctx,left,y,r,c.element);bulb(ctx,right,y,r,c.element)}
  strokeRound(ctx,34,28,W-68,H-56,24,rgba(c.element,.60),2);
  await e.backLogo({maxWidth:220,cx:c.backLogoX??W/2,cy:c.backLogoY??H/2})
}


async function frontCatPuppy(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.58,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,247,241,.66)");ctx.fillStyle=g;ctx.fillRect(0,H*.55,W,H*.45);ctx.restore();
  strokeRound(ctx,20,20,W-40,H-40,28,"rgba(255,255,255,.70)",2);
  pawPrint(ctx,78,146,58,rgba(c.element,.84),-.28);pawPrint(ctx,W-78,208,48,rgba(c.text,.84),.24);pawPrint(ctx,92,H-220,44,rgba(c.text,.76),.18);pawPrint(ctx,W-92,H-192,54,rgba(c.element,.80),-.18);
  // cute ear silhouette
  ctx.save();ctx.strokeStyle=rgba(c.element,.80);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(245,54);ctx.lineTo(274,25);ctx.lineTo(304,58);ctx.quadraticCurveTo(325,48,346,58);ctx.lineTo(376,25);ctx.lineTo(405,54);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(255,255,255,.82)";ctx.shadowColor="rgba(0,0,0,.16)";ctx.shadowBlur=10;ctx.beginPath();ctx.roundRect(102,H-158,W-204,104,34);ctx.fill();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:"#4E3C36",stroke:"#FFFFFF",shadow:false})
}
async function backCatPuppy(e){
  const {ctx,W,H,c}=e;e.backBase("#FFF7F2");for(let y=100,row=0;y<H;y+=138,row++)for(let x=78;x<W;x+=140)pawPrint(ctx,x+(row%2?70:0),y,42,rgba(c.element,.18),row%2?.22:-.22);
  strokeRound(ctx,24,24,W-48,H-48,28,rgba(c.element,.44),1.4);pawPrint(ctx,92,120,60,rgba(c.element,.72),-.18);pawPrint(ctx,W-92,H-122,60,rgba(c.element,.72),.18);await e.backLogo({maxWidth:225})
}

async function frontBubblePop(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.56,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,rgba(c.element,.24));ctx.fillStyle=g;ctx.fillRect(0,H*.48,W,H*.52);ctx.restore();
  for(const [x,y,r,a] of [[70,138,30,.46],[132,250,18,.34],[552,150,38,.42],[576,318,22,.32],[76,590,25,.34],[555,655,34,.38],[138,782,18,.32],[500,810,24,.38]])bubbleCircle(ctx,x,y,r,c.element,a);
  ctx.save();ctx.fillStyle="rgba(255,255,255,.62)";ctx.strokeStyle="rgba(255,255,255,.88)";ctx.lineWidth=2;ctx.shadowColor=rgba(c.element,.30);ctx.shadowBlur=18;ctx.beginPath();ctx.roundRect(82,H-164,W-164,104,52);ctx.fill();ctx.stroke();ctx.restore();
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backBubblePop(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.94));for(const [x,y,r,a] of [[90,130,38,.40],[220,210,22,.28],[520,170,50,.38],[106,480,26,.32],[554,480,30,.30],[170,790,44,.34],[506,840,26,.34],[338,690,18,.28]])bubbleCircle(ctx,x,y,r,c.element,a);
  strokeRound(ctx,24,24,W-48,H-48,28,"rgba(255,255,255,.74)",2);await e.backLogo({maxWidth:230})
}

async function frontGlassAcrylic(e){
  const {ctx,W,H,c}=e;
  e.backBase("#E8EEF2");
  // Acrylic slab sits on top of the chosen background colour.
  ctx.save();ctx.fillStyle="rgba(255,255,255,.26)";ctx.strokeStyle="rgba(255,255,255,.78)";ctx.lineWidth=2;ctx.shadowColor="rgba(0,0,0,.20)";ctx.shadowBlur=18;ctx.shadowOffsetY=5;ctx.beginPath();ctx.roundRect(38,38,W-76,H-76,30);ctx.fill();ctx.stroke();ctx.restore();
  // Photo is clipped strictly to the inner glass display area.
  e.photoRect(72,72,W-144,H-236,20);
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.76)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(72,72,W-144,H-236,20);ctx.stroke();ctx.restore();
  // Glass reflection stays inside the photo window.
  ctx.save();const g=ctx.createLinearGradient(72,72,W-72,H-164);g.addColorStop(0,"rgba(255,255,255,.38)");g.addColorStop(.30,"rgba(255,255,255,.05)");g.addColorStop(.66,"rgba(255,255,255,.18)");g.addColorStop(1,"rgba(255,255,255,.04)");ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(72,72,W-144,H-236,20);ctx.fill();ctx.restore();
  for(const [x,y] of [[66,66],[W-66,66],[66,H-66],[W-66,H-66]])acrylicScrew(ctx,x,y,10,c.element);
  ctx.save();ctx.fillStyle="rgba(255,255,255,.58)";ctx.strokeStyle="rgba(255,255,255,.72)";ctx.lineWidth=1.2;ctx.shadowColor="rgba(0,0,0,.14)";ctx.shadowBlur=8;ctx.beginPath();ctx.roundRect(92,H-150,W-184,84,24);ctx.fill();ctx.stroke();ctx.restore();
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:"#FFFFFF",stroke:"rgba(30,30,30,.42)",shadow:true})
}
async function backGlassAcrylic(e){
  const {ctx,W,H,c}=e;e.backBase("#E8EEF2");ctx.save();ctx.fillStyle="rgba(255,255,255,.36)";ctx.strokeStyle="rgba(255,255,255,.76)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(38,38,W-76,H-76,30);ctx.fill();ctx.stroke();ctx.restore();
  for(const [x,y] of [[66,66],[W-66,66],[66,H-66],[W-66,H-66]])acrylicScrew(ctx,x,y,10,c.element);
  await e.backLogo({maxWidth:235})
}

async function frontChrome(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();ctx.fillStyle="rgba(5,7,10,.14)";ctx.fillRect(0,0,W,H);ctx.restore();
  ctx.save();ctx.strokeStyle=chromeGradient(ctx,0,0,W,H,c.element);ctx.lineWidth=12;ctx.shadowColor=rgba(c.element,.30);ctx.shadowBlur=11;ctx.beginPath();ctx.roundRect(16,16,W-32,H-32,28);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle=chromeGradient(ctx,80,H-174,W-80,H-70,c.element);ctx.shadowColor="rgba(0,0,0,.25)";ctx.shadowBlur=10;ctx.beginPath();ctx.roundRect(80,H-170,W-160,108,24);ctx.fill();ctx.restore();
  for(const [x,y,s] of [[72,126,16],[W-72,180,22],[95,H-250,15],[W-88,H-222,18]])star(ctx,x,y,s,s*.32,mixHex("#FFFFFF",c.element,.18),.2,4);
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#1D2025",stroke:"#FFFFFF",shadow:false})
}
async function backChrome(e){
  const {ctx,W,H,c}=e;e.backBase("#171A1E");
  ctx.save();ctx.fillStyle=chromeGradient(ctx,0,0,W,H,c.element);ctx.beginPath();ctx.roundRect(24,24,W-48,H-48,26);ctx.fill();ctx.restore();
  ctx.save();ctx.fillStyle=(c.background&&c.background!=="auto")?c.background:mixHex("#24282D",c.element,.12);ctx.beginPath();ctx.roundRect(46,46,W-92,H-92,20);ctx.fill();ctx.restore();
  star(ctx,92,126,18,6,mixHex("#FFFFFF",c.element,.16),.2,4);star(ctx,W-94,H-124,22,7,mixHex("#FFFFFF",c.element,.16),.2,4);await e.backLogo({maxWidth:225})
}

async function frontRacing(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();ctx.fillStyle="rgba(7,7,9,.18)";ctx.fillRect(0,0,W,H);ctx.restore();
  speedLines(ctx,W,H,rgba(c.element,.84));checker(ctx,0,0,W,90,30,"rgba(255,255,255,.92)","rgba(20,20,22,.92)",.86);checker(ctx,0,H-90,W,90,30,"rgba(255,255,255,.92)","rgba(20,20,22,.92)",.86);
  ctx.save();ctx.fillStyle=rgba(c.element,.92);ctx.beginPath();ctx.moveTo(0,H-230);ctx.lineTo(W,H-360);ctx.lineTo(W,H-210);ctx.lineTo(0,H-80);ctx.closePath();ctx.fill();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(10,10,12,.84)";ctx.beginPath();ctx.moveTo(112,H-182);ctx.lineTo(W-68,H-282);ctx.lineTo(W-36,H-184);ctx.lineTo(138,H-88);ctx.closePath();ctx.fill();ctx.restore();
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:390,size:c.fontSize,font:c.font,fill:"#FFFFFF",stroke:"#111111",shadow:true})
}
async function backRacing(e){
  const {ctx,W,H,c}=e;e.backBase("#111214");checker(ctx,0,0,W,118,34,"#F3F3F3","#17181A",1);checker(ctx,0,H-118,W,118,34,"#F3F3F3","#17181A",1);
  ctx.save();ctx.fillStyle=rgba(c.element,.86);ctx.beginPath();ctx.moveTo(-40,260);ctx.lineTo(W+30,120);ctx.lineTo(W+30,240);ctx.lineTo(-40,380);ctx.closePath();ctx.fill();ctx.restore();speedLines(ctx,W,H,"rgba(255,255,255,.24)");await e.backLogo({maxWidth:230})
}

async function frontVarsity(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();const g=ctx.createLinearGradient(0,H*.60,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(246,241,225,.74)");ctx.fillStyle=g;ctx.fillRect(0,H*.54,W,H*.46);ctx.restore();
  ctx.save();ctx.strokeStyle=rgba(c.element,.86);ctx.lineWidth=8;ctx.beginPath();ctx.roundRect(20,20,W-40,H-40,28);ctx.stroke();ctx.strokeStyle="rgba(255,255,255,.88)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(33,33,W-66,H-66,20);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle=rgba(c.element,.88);ctx.fillRect(0,78,W,12);ctx.fillRect(0,96,W,5);ctx.fillRect(0,H-116,W,12);ctx.fillRect(0,H-98,W,5);ctx.restore();
  ctx.save();ctx.fillStyle="rgba(255,255,255,.80)";ctx.shadowColor="rgba(0,0,0,.13)";ctx.shadowBlur=8;ctx.beginPath();ctx.roundRect(92,H-168,W-184,106,18);ctx.fill();ctx.restore();
  await e.logo({w:68,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#27303A",stroke:"#FFFFFF",shadow:false})
}
async function backVarsity(e){
  const {ctx,W,H,c}=e;e.backBase("#F6F1E1");ctx.save();ctx.strokeStyle=rgba(c.element,.86);ctx.lineWidth=10;ctx.beginPath();ctx.roundRect(20,20,W-40,H-40,28);ctx.stroke();ctx.strokeStyle=rgba(c.element,.40);ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(38,38,W-76,H-76,20);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle=rgba(c.element,.12);ctx.beginPath();ctx.arc(W/2,H/2,205,0,Math.PI*2);ctx.fill();ctx.strokeStyle=rgba(c.element,.42);ctx.lineWidth=3;ctx.stroke();ctx.restore();await e.backLogo({maxWidth:225})
}

async function frontSailor(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();const g=ctx.createLinearGradient(0,H*.58,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(238,248,252,.78)");ctx.fillStyle=g;ctx.fillRect(0,H*.52,W,H*.48);ctx.restore();
  ctx.save();ctx.strokeStyle="#F6F7F4";ctx.lineWidth=10;ctx.beginPath();ctx.roundRect(18,18,W-36,H-36,28);ctx.stroke();ctx.strokeStyle=rgba(c.element,.78);ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(30,30,W-60,H-60,22);ctx.stroke();ctx.restore();
  for(let y=96;y<190;y+=24)line(ctx,0,y,W,y,rgba(c.element,.32),5);
  anchorIcon(ctx,86,H-176,70,rgba(c.element,.86));anchorIcon(ctx,W-84,152,52,"rgba(255,255,255,.84)");
  ctx.save();ctx.fillStyle="rgba(255,255,255,.82)";ctx.beginPath();ctx.roundRect(138,H-158,W-276,100,24);ctx.fill();ctx.restore();await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:360,size:c.fontSize,font:c.font,fill:"#243746",stroke:"#FFFFFF",shadow:false})
}
async function backSailor(e){
  const {ctx,W,H,c}=e;e.backBase("#EDF7FB");for(let y=70;y<H;y+=62)line(ctx,0,y,W,y,rgba(c.element,.20),4);ctx.save();ctx.strokeStyle=rgba(c.element,.70);ctx.lineWidth=5;ctx.beginPath();ctx.arc(W/2,H/2,210,0,Math.PI*2);ctx.stroke();ctx.restore();anchorIcon(ctx,W/2,H/2+8,250,rgba(c.element,.16));await e.backLogo({maxWidth:220})
}

async function frontChristmas(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();let g=ctx.createLinearGradient(0,0,0,230);g.addColorStop(0,"rgba(236,248,255,.50)");g.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,260);g=ctx.createLinearGradient(0,H-260,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(235,247,255,.72)");ctx.fillStyle=g;ctx.fillRect(0,H-280,W,280);ctx.restore();
  const flakes=[[72,122,22],[166,192,14],[548,130,24],[584,286,15],[88,520,16],[554,574,20],[126,760,16],[516,742,22]];for(let i=0;i<flakes.length;i++){const [x,y,r]=flakes[i];snowflake(ctx,x,y,r,i%2?rgba(c.element,.76):"rgba(255,255,255,.92)",i*.18)}
  ctx.save();ctx.fillStyle="rgba(255,255,255,.84)";ctx.beginPath();ctx.roundRect(96,H-166,W-192,106,28);ctx.fill();ctx.restore();tinyBow(ctx,W/2,78,42,rgba(c.element,.82));await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:"#314252",stroke:"#FFFFFF",shadow:false})
}
async function backChristmas(e){
  const {ctx,W,H,c}=e;e.backBase("#EEF7FB");for(let y=92,row=0;y<H;y+=118,row++)for(let x=72;x<W;x+=126)snowflake(ctx,x+(row%2?52:0),y,18,rgba(c.element,.30),(x+y)*.002);strokeRound(ctx,22,22,W-44,H-44,28,"rgba(255,255,255,.88)",2);tinyBow(ctx,W/2,96,44,rgba(c.element,.70));await e.backLogo({maxWidth:225})
}

async function frontHalloween(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();ctx.fillStyle="rgba(28,8,40,.22)";ctx.fillRect(0,0,W,H);let g=ctx.createLinearGradient(0,H*.58,0,H);g.addColorStop(0,"rgba(20,4,30,0)");g.addColorStop(1,"rgba(20,4,30,.72)");ctx.fillStyle=g;ctx.fillRect(0,H*.52,W,H*.48);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,28,"rgba(255,119,42,.82)",2);batIcon(ctx,92,128,62,"rgba(24,10,31,.86)",-.16);batIcon(ctx,W-92,192,46,"rgba(24,10,31,.80)",.18);batIcon(ctx,W-112,H-248,58,"rgba(24,10,31,.78)",-.14);ghostIcon(ctx,92,H-226,84,"rgba(255,255,255,.82)");
  // spider webs
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.50)";ctx.lineWidth=1;for(let r=30;r<=120;r+=30){ctx.beginPath();ctx.arc(20,20,r,0,Math.PI/2);ctx.stroke()}for(const a of [0,.25,.5,.75,1]){ctx.beginPath();ctx.moveTo(20,20);ctx.lineTo(20+Math.cos(a*Math.PI/2)*125,20+Math.sin(a*Math.PI/2)*125);ctx.stroke()}ctx.restore();
  ctx.save();ctx.fillStyle="rgba(31,9,42,.72)";ctx.beginPath();ctx.roundRect(88,H-168,W-176,104,24);ctx.fill();ctx.restore();await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:c.text,stroke:"#1E0928",shadow:true})
}
async function backHalloween(e){
  const {ctx,W,H,c}=e;e.backBase("#1E0928");for(let y=120,row=0;y<H;y+=150,row++)for(let x=90;x<W;x+=170)batIcon(ctx,x+(row%2?72:0),y,46,"rgba(255,119,42,.30)",(x+y)*.001);ghostIcon(ctx,100,180,72,"rgba(255,255,255,.16)");ghostIcon(ctx,W-110,H-170,84,"rgba(255,255,255,.14)");strokeRound(ctx,22,22,W-44,H-44,28,"rgba(255,119,42,.60)",2);await e.backLogo({maxWidth:225})
}

async function frontSakura(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();let g=ctx.createLinearGradient(0,0,0,230);g.addColorStop(0,"rgba(255,235,243,.44)");g.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,250);g=ctx.createLinearGradient(0,H-280,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,228,238,.62)");ctx.fillStyle=g;ctx.fillRect(0,H-300,W,300);ctx.restore();
  const petals=[[62,120,30,-.4],[118,188,22,.3],[540,110,28,.22],[582,236,18,-.5],[80,510,20,.6],[555,560,24,-.18],[138,720,18,.36],[516,748,26,-.32],[320,118,18,.15],[420,292,16,-.4]];
  for(const [x,y,s,a] of petals)sakuraPetal(ctx,x,y,s,rgba(c.element,.80),a);
  ctx.save();ctx.strokeStyle=rgba(c.element,.58);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-10,178);ctx.bezierCurveTo(90,102,162,120,234,70);ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(255,247,250,.80)";ctx.beginPath();ctx.roundRect(100,H-164,W-200,104,28);ctx.fill();ctx.restore();await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:"#804D61",stroke:"#FFF6FA",shadow:false})
}
async function backSakura(e){
  const {ctx,W,H,c}=e;e.backBase("#FFF1F6");for(let y=100,row=0;y<H;y+=132,row++)for(let x=70;x<W;x+=142)sakuraPetal(ctx,x+(row%2?62:0),y,24,rgba(c.element,.28),(x+y)*.002);strokeRound(ctx,22,22,W-44,H-44,28,rgba(c.element,.38),1.5);await e.backLogo({maxWidth:225})
}

async function frontSummerSoda(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);ctx.save();const g=ctx.createLinearGradient(0,H*.48,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(217,249,252,.68)");ctx.fillStyle=g;ctx.fillRect(0,H*.42,W,H*.58);ctx.restore();
  for(const [x,y,r] of [[70,140,18],[128,220,10],[554,156,24],[590,286,13],[82,560,15],[548,628,20],[126,760,11],[510,786,14]])bubbleCircle(ctx,x,y,r,"#DDFBFF",.56);
  citrusSlice(ctx,92,180,44,"#FFD85A");citrusSlice(ctx,W-82,H-206,36,"#FFD85A");
  ctx.save();ctx.fillStyle="rgba(255,255,255,.68)";ctx.strokeStyle="rgba(255,255,255,.92)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(84,H-166,W-168,104,36);ctx.fill();ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle="rgba(161,238,246,.38)";ctx.beginPath();ctx.moveTo(0,H-96);for(let x=0;x<=W;x+=40)ctx.quadraticCurveTo(x+20,H-118,x+40,H-96);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();ctx.restore();
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:420,size:c.fontSize,font:c.font,fill:"#28586A",stroke:"#FFFFFF",shadow:false})
}
async function backSummerSoda(e){
  const {ctx,W,H,c}=e;e.backBase("#DDF8FB");for(const [x,y,r] of [[88,122,24],[220,210,13],[528,164,34],[112,480,16],[548,540,22],[180,812,28],[492,842,16]])bubbleCircle(ctx,x,y,r,"#FFFFFF",.64);citrusSlice(ctx,98,H-140,48,"#FFD85A");citrusSlice(ctx,W-96,142,42,"#FFD85A");strokeRound(ctx,22,22,W-44,H-44,28,"rgba(255,255,255,.84)",2);await e.backLogo({maxWidth:225})
}

async function frontPolaroid(e){
  const {ctx,W,H,c}=e;e.fillRound(0,0,W,H,e.R,"#EEEAE2");
  ctx.save();ctx.shadowColor="rgba(0,0,0,.18)";ctx.shadowBlur=18;ctx.shadowOffsetY=7;e.fillRound(22,18,W-44,H-36,22,"#FFFDF8");ctx.restore();
  e.photoRect(48,50,W-96,730,5);
  ctx.save();ctx.strokeStyle=rgba(c.element,.7);ctx.lineWidth=1.4;ctx.strokeRect(48,50,W-96,730);ctx.restore();
  line(ctx,56,813,W-56,813,rgba(c.element,.52),1);
  await e.logo({w:70,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:390,font:c.font,size:c.fontSize});
  centeredText(ctx,"MEMORY / PHOTO CARD",W/2,956,'500 14px "Montserrat",sans-serif',rgba(c.element,.75),2.4);
  cornerMark(ctx,45,826,22,rgba(c.element,.72),1,1);cornerMark(ctx,W-45,826,22,rgba(c.element,.72),-1,1)
}
async function backPolaroid(e){
  const {ctx,W,H,c}=e;e.backBase("#F0ECE4");e.fillRound(28,26,W-56,H-52,22,"#FFFDF8");
  ctx.save();ctx.strokeStyle=rgba(c.element,.52);ctx.lineWidth=1.4;ctx.strokeRect(52,52,W-104,H-104);ctx.restore();
  await e.backLogo();centeredText(ctx,"MEMORY CARD",W/2,H-84,'500 14px "Montserrat",sans-serif',rgba(c.element,.68),3)
}

async function frontMagazine(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,0,0,250);g.addColorStop(0,"rgba(0,0,0,.42)");g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,270);ctx.restore();
  centeredText(ctx,"PORTRAIT",W/2,42,'500 13px "Montserrat",sans-serif',"rgba(255,255,255,.9)",5);
  line(ctx,38,62,W-38,62,"rgba(255,255,255,.82)",1);
  e.name({x:c.textX,y:c.textY,maxWidth:570,size:c.fontSize,font:c.font,fill:c.text,stroke:c.stroke,shadow:true});
  await e.logo({w:82,effects:true});
  ctx.save();ctx.fillStyle="rgba(255,255,255,.9)";ctx.font='500 15px "Montserrat",sans-serif';ctx.textAlign="left";
  ctx.fillText("PHOTOCARD",38,H-92);ctx.textAlign="right";ctx.fillText("SPECIAL EDITION",W-38,H-92);ctx.restore();
  line(ctx,38,H-72,W-38,H-72,"rgba(255,255,255,.78)",1.2)
}
async function backMagazine(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.91));
  ctx.save();ctx.fillStyle=rgba(c.element,.12);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(0,H);ctx.closePath();ctx.fill();ctx.restore();
  centeredText(ctx,"PORTRAIT / SPECIAL EDITION",W/2,72,'500 14px "Montserrat",sans-serif',rgba(c.element,.8),3);
  line(ctx,54,98,W-54,98,rgba(c.element,.65),1.3);line(ctx,54,H-98,W-54,H-98,rgba(c.element,.65),1.3);await e.backLogo()
}

async function frontMinimal(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.strokeStyle=rgba(c.element,.88);ctx.lineWidth=1.2;ctx.strokeRect(24,24,W-48,H-48);ctx.strokeStyle="rgba(255,255,255,.55)";ctx.strokeRect(28,28,W-56,H-56);ctx.restore();
  line(ctx,42,c.textY-34,248,c.textY-34,rgba(c.element,.95),2);
  e.name({x:c.textX,y:c.textY,maxWidth:280,size:c.fontSize,font:c.font});
  await e.logo({w:72,effects:true})
}
async function backMinimal(e){
  const {ctx,W,H,c}=e;e.backBase("#FBFBFA");ctx.save();ctx.strokeStyle=rgba(c.element,.68);ctx.lineWidth=1.2;ctx.strokeRect(26,26,W-52,H-52);ctx.restore();
  line(ctx,80,H/2,W-80,H/2,rgba(c.element,.25),1);await e.backLogo()
}

async function frontStudentId(e){
  const {ctx,W,H,c}=e;
  e.backBase("#FFFFFF");
  // top colored block modeled after the reference
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,W,505);ctx.restore();
  // lanyard slot: actual transparent hole in exported PNG
  e.punchRoundRect(W/2-78,28,156,34,17);
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.92)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(W/2-78,28,156,34,17);ctx.stroke();ctx.restore();
  centeredText(ctx,"학 생 증",W/2,118,'600 40px "Montserrat",sans-serif',"#FFFFFF",17);
  line(ctx,W/2-14,162,W/2+14,162,"rgba(255,255,255,.86)",2);
  centeredText(ctx,"STUDENT ID CARD",W/2,211,'400 20px "Montserrat",sans-serif',"rgba(255,255,255,.92)",3.2);
  // portrait overlaps color/white divide
  ctx.save();ctx.shadowColor="rgba(0,0,0,.17)";ctx.shadowBlur=15;ctx.shadowOffsetY=5;e.fillRound(144,260,362,398,2,"#FFFFFF");ctx.restore();
  e.photoRect(144,260,362,398,2);
  e.name({x:c.textX,y:c.textY,maxWidth:500,size:c.fontSize,font:c.font,fill:"#111111",stroke:"#FFFFFF",shadow:false});
  // lower band
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,855,W,149);ctx.restore();
  await e.logo({w:94,effects:false});
  centeredText(ctx,c.schoolName||"아이브고등학교",Math.max(300,Math.min(W-190,(c.frontLogoX??82)+220)),930,'600 30px "Montserrat",sans-serif',"#FFFFFF",2.3);
}
async function backStudentId(e){
  const {ctx,W,H,c}=e;e.backBase("#FFFFFF");
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,W,170);ctx.fillRect(0,H-170,W,170);ctx.restore();
  centeredText(ctx,"STUDENT ID CARD",W/2,91,'600 24px "Montserrat",sans-serif',"#FFFFFF",4);
  await e.backLogo({maxWidth:250});
  centeredText(ctx,c.schoolName||"아이브고등학교",W/2,H-88,'600 27px "Montserrat",sans-serif',"#FFFFFF",2)
}

async function frontTrump(e){
  const {ctx,W,H,c}=e,{symbol,color:baseColor}=suitInfo(c.trumpSuit),suitColor=overrideColor(c.trumpSuitColor,baseColor),rankColor=overrideColor(c.trumpRankColor,baseColor);
  e.backBase("#FFFDFC");
  ctx.save();ctx.strokeStyle="#111";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(14,14,W-28,H-28,38);ctx.stroke();ctx.restore();
  // giant suit behind portrait
  ctx.save();ctx.fillStyle=rgba(suitColor,.16);ctx.font='700 560px Georgia,serif';ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(symbol,W/2,H/2-5);ctx.restore();
  // Subject layer. AI-cutout PNG keeps the giant suit visible around the person.
  ctx.save();ctx.shadowColor="rgba(0,0,0,.22)";ctx.shadowBlur=16;ctx.shadowOffsetY=5;
  e.subjectRect(82,112,W-164,720,20);ctx.restore();
  // corner rank/suit
  const rank=String(c.trumpRank||"A").toUpperCase();
  ctx.save();ctx.textAlign="center";ctx.fillStyle=rankColor;ctx.font='500 58px "Bodoni Moda",Georgia,serif';ctx.fillText(rank,68,82);ctx.fillStyle=suitColor;ctx.font='700 52px Georgia,serif';ctx.fillText(symbol,68,139);ctx.restore();
  ctx.save();ctx.translate(W-68,H-82);ctx.rotate(Math.PI);ctx.textAlign="center";ctx.fillStyle=rankColor;ctx.font='500 58px "Bodoni Moda",Georgia,serif';ctx.fillText(rank,0,0);ctx.fillStyle=suitColor;ctx.font='700 52px Georgia,serif';ctx.fillText(symbol,0,57);ctx.restore();
  await e.logo({w:64,effects:false});
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#111111",stroke:"#FFFFFF",shadow:false})
}
async function backTrump(e){
  const {ctx,W,H,c}=e;e.backBase("#FDFDFB");
  // Classic double-border card back.
  strokeRound(ctx,16,16,W-32,H-32,34,"#111111",3);
  strokeRound(ctx,29,29,W-58,H-58,28,"#111111",1.5);
  strokeRound(ctx,54,54,W-108,H-108,18,"#111111",2.2);
  strokeRound(ctx,72,72,W-144,H-144,14,"#111111",1.2);
  // Ornamental border band: small diamonds and beads, intentionally generic rather than brand-specific.
  ctx.save();ctx.fillStyle="#111111";ctx.strokeStyle="#111111";
  for(let x=86;x<=W-86;x+=22){ctx.save();ctx.translate(x,64);ctx.rotate(Math.PI/4);ctx.fillRect(-3.2,-3.2,6.4,6.4);ctx.restore();ctx.save();ctx.translate(x,H-64);ctx.rotate(Math.PI/4);ctx.fillRect(-3.2,-3.2,6.4,6.4);ctx.restore()}
  for(let y=92;y<=H-92;y+=22){ctx.save();ctx.translate(64,y);ctx.rotate(Math.PI/4);ctx.fillRect(-3.2,-3.2,6.4,6.4);ctx.restore();ctx.save();ctx.translate(W-64,y);ctx.rotate(Math.PI/4);ctx.fillRect(-3.2,-3.2,6.4,6.4);ctx.restore()}
  ctx.restore();
  // Dense monochrome lattice in the centre.
  ctx.save();ctx.beginPath();ctx.roundRect(86,86,W-172,H-172,10);ctx.clip();ctx.strokeStyle="rgba(17,17,17,.88)";ctx.lineWidth=.9;
  for(let y=96,row=0;y<H-86;y+=13,row++)for(let x=94;x<W-86;x+=13){
    const px=x+(row%2?6.5:0);ctx.beginPath();ctx.moveTo(px,y-4);ctx.lineTo(px+4,y);ctx.lineTo(px,y+4);ctx.lineTo(px-4,y);ctx.closePath();ctx.stroke()
  }
  // subtle symmetric rosettes
  for(const [cx,cy] of [[W/2,218],[W/2,H-218]]){ctx.save();ctx.translate(cx,cy);for(let i=0;i<8;i++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.ellipse(0,-26,9,27,0,0,Math.PI*2);ctx.stroke()}ctx.restore()}
  ctx.restore();
  // Clean centre medallion so the selected group logo remains readable.
  ctx.save();ctx.fillStyle="#FDFDFB";ctx.strokeStyle="#111111";ctx.lineWidth=2.4;ctx.beginPath();ctx.ellipse(W/2,H/2,142,104,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(W/2,H/2,126,90,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  await e.backLogo({maxWidth:190,cx:W/2,cy:H/2})
}

async function frontSignature(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H-260,0,H);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.42)");ctx.fillStyle=g;ctx.fillRect(0,H-280,W,280);ctx.restore();
  await e.logo({w:72,effects:true});
  e.name({x:c.textX,y:c.textY,maxWidth:190,size:c.fontSize,font:"Montserrat"});
  if(e.signatureImage)e.signature({maxWidth:365,maxHeight:145});
  else centeredText(ctx,c.name||"",W/2+50,H-142,'400 38px "Sacramento",cursive',"rgba(255,255,255,.9)",0)
}
async function backSignature(e){
  const {ctx,W,H,c}=e;e.backBase("#FCFBFA");
  line(ctx,54,72,W-54,72,rgba(c.element,.75),1.5);line(ctx,54,H-72,W-54,H-72,rgba(c.element,.75),1.5);
  await e.backLogo();if(e.signatureImage)e.signature({cx:W/2,cy:H-160,maxWidth:300,maxHeight:105,alpha:.95,useControls:false})
}


function candyLollipop(ctx,x,y,r,color,accent,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);
  ctx.strokeStyle="rgba(255,255,255,.92)";ctx.lineWidth=Math.max(5,r*.13);ctx.lineCap="round";ctx.beginPath();ctx.moveTo(0,r*.75);ctx.lineTo(0,r*2.25);ctx.stroke();
  ctx.shadowColor=rgba(color,.35);ctx.shadowBlur=r*.28;ctx.fillStyle="#FFF9FB";ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.lineWidth=Math.max(3,r*.10);ctx.strokeStyle=color;ctx.beginPath();
  for(let a=0;a<=Math.PI*6;a+=.12){const rr=r*(a/(Math.PI*6))*.92,px=Math.cos(a)*rr,py=Math.sin(a)*rr;a===0?ctx.moveTo(px,py):ctx.lineTo(px,py)}ctx.stroke();
  ctx.fillStyle=accent;ctx.beginPath();ctx.arc(0,0,r*.18,0,Math.PI*2);ctx.fill();ctx.restore()
}
function wrappedCandy(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=rgba(color,.92);ctx.strokeStyle="rgba(255,255,255,.82)";ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-s*.72,0);ctx.lineTo(-s*1.15,-s*.42);ctx.lineTo(-s*1.12,s*.42);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(s*.72,0);ctx.lineTo(s*1.15,-s*.42);ctx.lineTo(s*1.12,s*.42);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle="#FFF8FB";ctx.beginPath();ctx.roundRect(-s*.72,-s*.46,s*1.44,s*.92,s*.34);ctx.fill();ctx.stroke();
  ctx.fillStyle=rgba(color,.78);for(let xx=-s*.44;xx<=s*.44;xx+=s*.30)ctx.fillRect(xx,-s*.43,s*.12,s*.86);ctx.restore()
}
function teddyFace(ctx,x,y,s,brown="#A36F49",cream="#F4DEC5",angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.shadowColor="rgba(0,0,0,.16)";ctx.shadowBlur=s*.12;
  ctx.fillStyle=brown;for(const dx of [-.36,.36]){ctx.beginPath();ctx.arc(s*dx,-s*.30,s*.25,0,Math.PI*2);ctx.fill()}
  ctx.beginPath();ctx.arc(0,0,s*.58,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle=cream;ctx.beginPath();ctx.ellipse(0,s*.13,s*.30,s*.24,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#3C2A22";for(const dx of [-.19,.19]){ctx.beginPath();ctx.arc(s*dx,-s*.10,s*.047,0,Math.PI*2);ctx.fill()}
  ctx.beginPath();ctx.ellipse(0,s*.08,s*.07,s*.055,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#3C2A22";ctx.lineWidth=Math.max(1.5,s*.025);ctx.beginPath();ctx.moveTo(0,s*.12);ctx.quadraticCurveTo(-s*.09,s*.20,-s*.16,s*.16);ctx.moveTo(0,s*.12);ctx.quadraticCurveTo(s*.09,s*.20,s*.16,s*.16);ctx.stroke();ctx.restore()
}
function novaBurst(ctx,x,y,r,color,alpha=1){
  ctx.save();ctx.translate(x,y);ctx.globalAlpha=alpha;ctx.shadowColor=color;ctx.shadowBlur=r*.45;
  const g=ctx.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,"#FFFFFF");g.addColorStop(.20,rgba(color,.95));g.addColorStop(.56,rgba(color,.25));g.addColorStop(1,rgba(color,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.strokeStyle=rgba(color,.75);ctx.lineCap="round";for(let i=0;i<12;i++){const a=i*Math.PI/6,len=r*(i%3===0?1.25:.78);ctx.lineWidth=i%3===0?2.4:1.2;ctx.beginPath();ctx.moveTo(Math.cos(a)*r*.18,Math.sin(a)*r*.18);ctx.lineTo(Math.cos(a)*len,Math.sin(a)*len);ctx.stroke()}
  ctx.restore()
}
function seigaiha(ctx,W,H,color,alpha=.18,step=76){
  ctx.save();ctx.strokeStyle=rgba(color,alpha);ctx.lineWidth=1.5;
  for(let y=0,row=0;y<H+step;y+=step*.48,row++)for(let x=-step;x<W+step;x+=step){
    const cx=x+(row%2?step*.5:0);for(const rr of [step*.46,step*.34,step*.22]){ctx.beginPath();ctx.arc(cx,y,rr,Math.PI,0);ctx.stroke()}
  }ctx.restore()
}
function japaneseFan(ctx,x,y,r,color,gold="#D9B76E",angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=rgba(color,.84);ctx.strokeStyle=rgba(gold,.92);ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,r,-Math.PI*.84,-Math.PI*.16);ctx.closePath();ctx.fill();ctx.stroke();
  for(let i=0;i<=8;i++){const a=-Math.PI*.84+i*(Math.PI*.68/8);line(ctx,0,0,Math.cos(a)*r,Math.sin(a)*r,rgba(gold,.72),1)}
  ctx.restore()
}
function fireworkBurst(ctx,x,y,r,color,alpha=.9){
  ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.lineCap="round";ctx.shadowColor=color;ctx.shadowBlur=r*.20;
  for(let i=0;i<20;i++){const a=i*Math.PI/10,inner=r*(.18+(i%3)*.025),outer=r*(.72+(i%4)*.08);ctx.globalAlpha=alpha*(.65+(i%3)*.13);ctx.lineWidth=i%5===0?2.6:1.5;ctx.beginPath();ctx.moveTo(Math.cos(a)*inner,Math.sin(a)*inner);ctx.lineTo(Math.cos(a)*outer,Math.sin(a)*outer);ctx.stroke();ctx.fillStyle="#FFFFFF";ctx.beginPath();ctx.arc(Math.cos(a)*outer,Math.sin(a)*outer,1.8+(i%2),0,Math.PI*2);ctx.fill()}ctx.restore()
}
function lightningSticker(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle="#FFFFFF";ctx.strokeStyle="#FFFFFF";ctx.lineWidth=9;ctx.lineJoin="round";ctx.beginPath();ctx.moveTo(-s*.12,-s*.55);ctx.lineTo(s*.28,-s*.16);ctx.lineTo(s*.04,-s*.12);ctx.lineTo(s*.18,s*.54);ctx.lineTo(-s*.30,s*.08);ctx.lineTo(-s*.03,s*.04);ctx.closePath();ctx.stroke();ctx.fill();ctx.fillStyle=color;ctx.lineWidth=2;ctx.strokeStyle=rgba(color,.85);ctx.fill();ctx.stroke();ctx.restore()
}
function gyaruSpot(ctx,x,y,s,color,angle=0){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle=rgba(color,.72);ctx.beginPath();ctx.ellipse(0,0,s*.50,s*.30,.2,0,Math.PI*2);ctx.fill();ctx.fillStyle="#FFF4FA";ctx.beginPath();ctx.ellipse(s*.05,0,s*.22,s*.11,.3,0,Math.PI*2);ctx.fill();ctx.restore()
}
function skyline(ctx,W,baseY,color,glow){
  ctx.save();let x=0,i=0;const widths=[52,38,62,44,74,36,58,48,66,42,55];
  while(x<W){const w=widths[i%widths.length],h=80+((i*47)%170);ctx.fillStyle=color;ctx.fillRect(x,baseY-h,w+2,h);
    ctx.fillStyle=rgba(glow,.72);for(let yy=baseY-h+18;yy<baseY-12;yy+=24)for(let xx=x+10;xx<x+w-6;xx+=18)if(((xx+yy+i)%3)!==0)ctx.fillRect(xx,yy,5,8);
    x+=w;i++
  }ctx.restore()
}
function retroGrid(ctx,W,H,y,color){
  ctx.save();ctx.strokeStyle=rgba(color,.34);ctx.lineWidth=1;
  for(let yy=y;yy<H;yy+=34)line(ctx,0,yy,W,yy,rgba(color,.28),1);
  for(let x=-W;x<=W*2;x+=70){ctx.beginPath();ctx.moveTo(W/2,y);ctx.lineTo(x,H);ctx.stroke()}ctx.restore()
}

async function frontCandyPop(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.55,0,H);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(255,224,240,.76)");ctx.fillStyle=g;ctx.fillRect(0,H*.50,W,H*.50);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,30,"rgba(255,255,255,.84)",5);strokeRound(ctx,29,29,W-58,H-58,24,rgba(c.element,.65),2);
  candyLollipop(ctx,76,158,43,c.element,"#FFFFFF",-.22);candyLollipop(ctx,W-82,222,36,"#FF78B7",c.element,.24);
  wrappedCandy(ctx,92,H-225,32,c.element,.20);wrappedCandy(ctx,W-90,H-192,28,"#8EDDE1",-.22);
  for(const [x,y,s] of [[152,112,13],[520,122,10],[122,475,9],[552,585,12],[165,760,10]])star(ctx,x,y,s,s*.42,"rgba(255,255,255,.90)",.2,5);
  ctx.save();ctx.fillStyle="rgba(255,255,255,.82)";ctx.shadowColor=rgba(c.element,.26);ctx.shadowBlur=14;ctx.beginPath();ctx.roundRect(104,H-164,W-208,104,46);ctx.fill();ctx.restore();
  await e.logo({w:66,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:410,size:c.fontSize,font:c.font,fill:c.text,stroke:"#FFFFFF",shadow:true})
}
async function backCandyPop(e){
  const {ctx,W,H,c}=e;e.backBase("#FFEAF4");
  for(let y=100,row=0;y<H;y+=155,row++)for(let x=82;x<W;x+=165){const xx=x+(row%2?82:0);wrappedCandy(ctx,xx,y,22,row%2?c.element:"#FF88B8",(row%3-.5)*.25)}
  candyLollipop(ctx,90,145,34,c.element,"#FFFFFF",-.25);candyLollipop(ctx,W-88,H-145,34,"#8EDDE1",c.element,.25);
  strokeRound(ctx,22,22,W-44,H-44,30,"rgba(255,255,255,.82)",3);await e.backLogo({maxWidth:225})
}

async function frontTeddyBear(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.50,0,H);g.addColorStop(0,"rgba(246,225,203,0)");g.addColorStop(1,"rgba(235,207,179,.78)");ctx.fillStyle=g;ctx.fillRect(0,H*.46,W,H*.54);ctx.restore();
  strokeRound(ctx,18,18,W-36,H-36,30,"rgba(255,249,240,.90)",7);strokeRound(ctx,31,31,W-62,H-62,24,"rgba(151,105,72,.62)",2);
  ctx.save();ctx.setLineDash([8,8]);ctx.strokeStyle="rgba(112,76,54,.48)";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(42,42,W-84,H-84,20);ctx.stroke();ctx.restore();
  teddyFace(ctx,92,160,76,"#9D6B48","#F0D4B8",-.12);teddyFace(ctx,W-86,H-214,66,"#B47C52","#F6DEC4",.12);
  tinyBow(ctx,W-104,154,42,rgba(c.element,.86));heart(ctx,110,H-295,34,rgba(c.element,.72));
  ctx.save();ctx.fillStyle="rgba(255,248,238,.88)";ctx.shadowColor="rgba(77,50,34,.18)";ctx.shadowBlur=12;ctx.beginPath();ctx.roundRect(100,H-158,W-200,98,24);ctx.fill();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:415,size:c.fontSize,font:c.font,fill:"#5A3C2C",stroke:"#FFF8EF",shadow:false})
}
async function backTeddyBear(e){
  const {ctx,W,H,c}=e;e.backBase("#F2DEC7");
  for(let y=105,row=0;y<H;y+=160,row++)for(let x=84;x<W;x+=170){const xx=x+(row%2?84:0);teddyFace(ctx,xx,y,42,row%2?"#A36F49":"#B78059","#F5DEC5",(row%3-1)*.08)}
  ctx.save();ctx.setLineDash([9,8]);ctx.strokeStyle=rgba(c.element,.48);ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(30,30,W-60,H-60,25);ctx.stroke();ctx.restore();
  e.fillRound(W/2-150,H/2-106,300,212,44,"rgba(255,248,238,.82)");await e.backLogo({maxWidth:210})
}

async function frontRisingStar(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"rgba(15,18,45,.20)");g.addColorStop(.58,"rgba(20,17,52,.06)");g.addColorStop(1,"rgba(17,18,47,.58)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  novaBurst(ctx,W*.16,H*.20,92,c.element,.92);novaBurst(ctx,W*.84,H*.31,72,"#B8D9FF",.85);novaBurst(ctx,W*.22,H*.72,58,"#FFFFFF",.72);
  for(const [x,y,s] of [[500,118,22],[142,346,14],[556,520,18],[466,704,12],[178,810,16]])star(ctx,x,y,s,s*.28,"rgba(255,255,255,.92)",.1,4);
  ctx.save();ctx.strokeStyle=rgba(c.element,.78);ctx.lineWidth=2;ctx.shadowColor=c.element;ctx.shadowBlur=13;ctx.beginPath();ctx.roundRect(20,20,W-40,H-40,30);ctx.stroke();ctx.restore();
  ctx.save();const gg=ctx.createLinearGradient(92,H-164,W-92,H-66);gg.addColorStop(0,"rgba(16,19,52,.88)");gg.addColorStop(.5,rgba(c.element,.72));gg.addColorStop(1,"rgba(38,31,76,.90)");ctx.fillStyle=gg;ctx.beginPath();ctx.roundRect(88,H-164,W-176,106,22);ctx.fill();ctx.restore();
  await e.logo({w:68,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#FFFFFF",stroke:rgba(c.element,.9),shadow:true})
}
async function backRisingStar(e){
  const {ctx,W,H,c}=e;e.backBase("#17182F");novaBurst(ctx,W/2,H/2,255,c.element,.75);novaBurst(ctx,116,166,72,"#BBD7FF",.62);novaBurst(ctx,W-106,H-170,68,"#FFFFFF",.52);
  for(let i=0;i<42;i++){const x=(i*137)%W,y=(i*223)%H,s=2+(i%4);ctx.save();ctx.fillStyle=i%3?rgba(c.element,.66):"rgba(255,255,255,.80)";ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill();ctx.restore()}
  strokeRound(ctx,22,22,W-44,H-44,30,rgba(c.element,.58),2);await e.backLogo({maxWidth:230})
}

async function frontJapanTraditional(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle="rgba(249,239,221,.14)";ctx.fillRect(0,0,W,H);ctx.restore();
  ctx.save();const g=ctx.createLinearGradient(0,H*.56,0,H);g.addColorStop(0,"rgba(248,238,218,0)");g.addColorStop(1,"rgba(247,233,210,.88)");ctx.fillStyle=g;ctx.fillRect(0,H*.50,W,H*.50);ctx.restore();
  seigaiha(ctx,W,220,"#B34E5D",.20,74);japaneseFan(ctx,92,186,92,c.element,"#D9B76E",-.24);japaneseFan(ctx,W-80,H-198,78,"#B34E5D","#D9B76E",.22);
  for(const [x,y,s] of [[130,382,22],[530,350,18],[106,660,16],[548,730,24]]){ctx.save();ctx.fillStyle=rgba("#D86B78",.72);for(let i=0;i<5;i++){ctx.save();ctx.translate(x,y);ctx.rotate(i*Math.PI*2/5);ctx.beginPath();ctx.ellipse(0,-s*.42,s*.18,s*.40,0,0,Math.PI*2);ctx.fill();ctx.restore()}ctx.restore()}
  strokeRound(ctx,18,18,W-36,H-36,30,"rgba(218,183,110,.86)",4);
  ctx.save();ctx.fillStyle="rgba(252,245,232,.90)";ctx.beginPath();ctx.roundRect(112,H-158,W-224,96,8);ctx.fill();ctx.strokeStyle="rgba(184,139,73,.70)";ctx.lineWidth=1.5;ctx.stroke();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:395,size:c.fontSize,font:c.font,fill:"#6C2D38",stroke:"#FFF8EC",shadow:false})
}
async function backJapanTraditional(e){
  const {ctx,W,H,c}=e;e.backBase("#F5E8D2");seigaiha(ctx,W,H,"#B34E5D",.20,78);
  japaneseFan(ctx,96,166,90,c.element,"#D9B76E",-.22);japaneseFan(ctx,W-94,H-164,90,"#B34E5D","#D9B76E",.22);
  strokeRound(ctx,22,22,W-44,H-44,28,"#C79A52",3);strokeRound(ctx,34,34,W-68,H-68,22,rgba("#B34E5D",.50),1.3);
  e.fillRound(W/2-152,H/2-104,304,208,12,"rgba(250,242,226,.88)");await e.backLogo({maxWidth:214})
}

async function frontFireworks(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"rgba(10,16,47,.44)");g.addColorStop(.52,"rgba(15,17,54,.12)");g.addColorStop(1,"rgba(10,12,38,.62)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  fireworkBurst(ctx,122,180,104,c.element,.92);fireworkBurst(ctx,W-116,256,88,"#FF75B8",.86);fireworkBurst(ctx,210,470,62,"#79D7FF",.74);fireworkBurst(ctx,W-145,608,72,"#FFFFFF",.68);
  for(const [x,y,s] of [[90,390,8],[522,130,7],[540,430,9],[124,690,7],[470,760,8]])star(ctx,x,y,s,s*.35,"rgba(255,255,255,.90)",.1,4);
  strokeRound(ctx,18,18,W-36,H-36,30,rgba(c.element,.58),2);
  ctx.save();ctx.fillStyle="rgba(10,14,43,.72)";ctx.shadowColor=rgba(c.element,.28);ctx.shadowBlur=12;ctx.beginPath();ctx.roundRect(100,H-158,W-200,98,24);ctx.fill();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:410,size:c.fontSize,font:c.font,fill:"#FFFFFF",stroke:rgba(c.element,.88),shadow:true})
}
async function backFireworks(e){
  const {ctx,W,H,c}=e;e.backBase("#111633");fireworkBurst(ctx,118,180,110,c.element,.88);fireworkBurst(ctx,W-112,246,92,"#FF70B6",.82);fireworkBurst(ctx,158,H-202,82,"#7AD8FF",.72);fireworkBurst(ctx,W-122,H-150,106,"#F5D679",.70);
  for(let i=0;i<28;i++){ctx.fillStyle="rgba(255,255,255,.70)";ctx.beginPath();ctx.arc((i*113)%W,(i*197)%H,1.5+(i%3),0,Math.PI*2);ctx.fill()}
  e.fillRound(W/2-155,H/2-108,310,216,40,"rgba(13,17,49,.72)");strokeRound(ctx,22,22,W-44,H-44,28,rgba(c.element,.45),2);await e.backLogo({maxWidth:225})
}

async function frontGyaru(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,H*.56,0,H);g.addColorStop(0,"rgba(255,74,158,0)");g.addColorStop(1,"rgba(255,88,166,.42)");ctx.fillStyle=g;ctx.fillRect(0,H*.48,W,H*.52);ctx.restore();
  checker(ctx,0,0,W,68,34,"rgba(255,255,255,.92)","rgba(24,19,25,.88)",.58);checker(ctx,0,H-68,W,68,34,"rgba(255,255,255,.92)","rgba(24,19,25,.88)",.58);
  for(const [x,y,s,a] of [[84,176,48,-.24],[548,212,40,.18],[120,640,34,.12],[526,704,44,-.16]])gyaruSpot(ctx,x,y,s,c.element,a);
  lightningSticker(ctx,94,312,68,c.element,-.18);star(ctx,W-94,348,36,15,"#FFFFFF",.18,5);heart(ctx,W-102,548,52,rgba(c.element,.88));tinyBow(ctx,122,H-224,48,"#FFFFFF");
  ctx.save();ctx.translate(94,488);ctx.rotate(-.16);ctx.fillStyle="#FFFFFF";ctx.strokeStyle=rgba(c.element,.92);ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-58,-28,116,56,18);ctx.fill();ctx.stroke();ctx.fillStyle="#111";ctx.font='800 18px "Montserrat",sans-serif';ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("KAWAII",0,1);ctx.restore();
  ctx.save();ctx.fillStyle="rgba(24,19,25,.80)";ctx.beginPath();ctx.roundRect(96,H-162,W-192,102,22);ctx.fill();ctx.strokeStyle=rgba(c.element,.86);ctx.lineWidth=3;ctx.stroke();ctx.restore();
  await e.logo({w:62,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:400,size:c.fontSize,font:c.font,fill:"#FFFFFF",stroke:"#111111",shadow:true})
}
async function backGyaru(e){
  const {ctx,W,H,c}=e;e.backBase("#2A1C28");checker(ctx,0,0,W,78,39,"#FFF","#19151A",.82);checker(ctx,0,H-78,W,78,39,"#FFF","#19151A",.82);
  for(const [x,y,s,t] of [[94,168,42,0],[530,178,34,1],[124,418,31,2],[530,480,40,0],[116,758,38,1],[520,808,34,2]]){
    if(t===0)heart(ctx,x,y,s,rgba(c.element,.82));else if(t===1)star(ctx,x,y,s,s*.42,"#FFFFFF",.2,5);else lightningSticker(ctx,x,y,s*1.4,c.element,.15)
  }
  e.fillRound(W/2-156,H/2-108,312,216,34,"rgba(255,255,255,.90)");strokeRound(ctx,24,24,W-48,H-48,28,rgba(c.element,.76),3);await e.backLogo({maxWidth:220})
}

async function frontCityPop(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"rgba(17,22,59,.10)");g.addColorStop(.52,"rgba(28,26,73,.15)");g.addColorStop(1,"rgba(13,19,49,.86)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore();
  ctx.save();const sun=ctx.createLinearGradient(0,580,0,760);sun.addColorStop(0,"#FF72B9");sun.addColorStop(1,"#FFB96A");ctx.fillStyle=sun;ctx.globalAlpha=.72;ctx.beginPath();ctx.arc(W-112,650,102,0,Math.PI*2);ctx.fill();ctx.restore();
  skyline(ctx,W,H-165,"#10162E",c.element);retroGrid(ctx,W,H,H-165,c.element);
  ctx.save();ctx.strokeStyle="rgba(127,225,255,.76)";ctx.lineWidth=2;ctx.shadowColor="#7FE1FF";ctx.shadowBlur=9;ctx.beginPath();ctx.roundRect(20,20,W-40,H-40,30);ctx.stroke();ctx.restore();
  centeredText(ctx,"MIDNIGHT CITY",82,110,'700 13px "Montserrat",sans-serif',"rgba(255,255,255,.84)",2.5);
  ctx.save();ctx.fillStyle="rgba(13,18,47,.78)";ctx.beginPath();ctx.roundRect(96,H-156,W-192,96,14);ctx.fill();ctx.strokeStyle=rgba(c.element,.66);ctx.lineWidth=2;ctx.stroke();ctx.restore();
  await e.logo({w:64,effects:true});e.name({x:c.textX,y:c.textY,maxWidth:405,size:c.fontSize,font:c.font,fill:c.text,stroke:"#171B42",shadow:true})
}
async function backCityPop(e){
  const {ctx,W,H,c}=e;e.backBase("#171D46");
  ctx.save();const sun=ctx.createLinearGradient(0,230,0,520);sun.addColorStop(0,"#FF67B8");sun.addColorStop(1,"#FFB96A");ctx.fillStyle=sun;ctx.globalAlpha=.88;ctx.beginPath();ctx.arc(W/2,385,154,0,Math.PI*2);ctx.fill();ctx.restore();
  skyline(ctx,W,H-250,"#0D132C",c.element);retroGrid(ctx,W,H,H-250,c.element);
  ctx.save();ctx.strokeStyle=rgba(c.element,.62);ctx.lineWidth=2;ctx.shadowColor=c.element;ctx.shadowBlur=8;ctx.beginPath();ctx.roundRect(22,22,W-44,H-44,28);ctx.stroke();ctx.restore();
  e.fillRound(W/2-154,H/2-86,308,172,20,"rgba(18,23,54,.78)");await e.backLogo({maxWidth:224})
}

const FRONT_RENDERERS={
  ribbon:frontRibbon,y2k:frontY2K,polaroid:frontPolaroid,film:frontFilm,magazine:frontMagazine,
  luxury:frontLuxury,princess:frontPrincess,gothic:frontGothic,angel:frontAngel,cyber:frontCyber,arcade:frontArcade,
  minimal:frontMinimal,editorial:frontEditorial,split:frontSplit,
  gradient_glow:frontGradientGlow,neon:frontNeon,scrapbook:frontScrapbook,diary:frontDiary,love_letter:frontLoveLetter,
  student_id:frontStudentId,concert_ticket:frontConcertTicket,album_tracklist:frontAlbumTracklist,starry_night:frontStarryNight,butterfly:frontButterfly,cherry_strawberry:frontCherryStrawberry,
  cat_puppy:frontCatPuppy,bubble_pop:frontBubblePop,glass_acrylic:frontGlassAcrylic,chrome:frontChrome,racing:frontRacing,varsity:frontVarsity,sailor:frontSailor,christmas:frontChristmas,halloween:frontHalloween,sakura:frontSakura,summer_soda:frontSummerSoda,
  trump:frontTrump,dressing_mirror:frontDressingMirror,signature:frontSignature,
  candy_pop:frontCandyPop,teddy_bear:frontTeddyBear,rising_star:frontRisingStar,japan_traditional:frontJapanTraditional,fireworks:frontFireworks,gyaru:frontGyaru,city_pop:frontCityPop
};
const BACK_RENDERERS={
  ribbon:backRibbon,y2k:backY2K,polaroid:backPolaroid,film:backFilm,magazine:backMagazine,
  luxury:backLuxury,princess:backPrincess,gothic:backGothic,angel:backAngel,cyber:backCyber,arcade:backArcade,
  minimal:backMinimal,editorial:backEditorial,split:backSplit,
  gradient_glow:backGradientGlow,neon:backNeon,scrapbook:backScrapbook,diary:backDiary,love_letter:backLoveLetter,
  student_id:backStudentId,concert_ticket:backConcertTicket,album_tracklist:backAlbumTracklist,starry_night:backStarryNight,butterfly:backButterfly,cherry_strawberry:backCherryStrawberry,
  cat_puppy:backCatPuppy,bubble_pop:backBubblePop,glass_acrylic:backGlassAcrylic,chrome:backChrome,racing:backRacing,varsity:backVarsity,sailor:backSailor,christmas:backChristmas,halloween:backHalloween,sakura:backSakura,summer_soda:backSummerSoda,
  trump:backTrump,dressing_mirror:backDressingMirror,signature:backSignature,
  candy_pop:backCandyPop,teddy_bear:backTeddyBear,rising_star:backRisingStar,japan_traditional:backJapanTraditional,fireworks:backFireworks,gyaru:backGyaru,city_pop:backCityPop
};
export async function renderTemplateFront(id,env){const t=getTemplate(id),fn=FRONT_RENDERERS[t.front]||frontRibbon;return fn(env)}
export async function renderTemplateBack(id,env){const t=getTemplate(id),fn=BACK_RENDERERS[t.back]||backRibbon;return fn(env)}
