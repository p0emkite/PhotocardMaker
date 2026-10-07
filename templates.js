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
  {name:"Sacramento",family:'"Sacramento",cursive',category:"script"}
];
export const FONT_MAP=Object.fromEntries(FONT_REGISTRY.map(x=>[x.name,x.family]));

const common=(over={})=>({
  font:"Playfair Display",fontSize:31,tracking:4,textX:325,textY:903,
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
    defaults:common({font:"Space Grotesk",fontSize:43,tracking:1,textX:438,textY:874,frontLogoX:91,frontLogoY:72,frontLogoScale:70}),
    extras:[],front:"editorial",back:"editorial"
  },
  split:{
    id:"split",label:"16. Split Color",category:"modern",
    defaults:common({font:"Poppins",fontSize:38,tracking:3,textX:155,textY:862,frontLogoX:132,frontLogoY:106,frontLogoScale:78}),
    extras:[],front:"split",back:"split"
  },
  student_id:{
    id:"student_id",label:"22. Student ID",category:"special",
    defaults:common({font:"Montserrat",fontSize:42,tracking:5,textX:325,textY:753,backStyle:"center",frontLogoX:82,frontLogoY:920,frontLogoScale:82,backLogoScale:100,schoolName:"아이브고등학교"}),
    extras:["schoolName"],front:"student_id",back:"student_id"
  },
  trump:{
    id:"trump",label:"40. Trump Card",category:"special",
    defaults:common({font:"Playfair Display",fontSize:34,tracking:4,textX:325,textY:910,backStyle:"center",frontLogoX:572,frontLogoY:72,frontLogoScale:72,trumpSuit:"diamond",trumpRank:"A",trumpSuitColor:"auto",trumpRankColor:"auto"}),
    extras:["trumpOptions"],front:"trump",back:"trump"
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
  line(ctx,122,186,W-54,186,rgba(c.element,.45),1);line(ctx,122,186,122,H-74,rgba(c.element,.45),1);await e.backLogo({maxWidth:225,cx:350,cy:520})
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
  await e.backLogo({maxWidth:230,cx:390,cy:H/2})
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
  const {ctx,W,H,c}=e,{symbol,color}=suitInfo(c.trumpSuit);
  e.backBase("#FFFDFC");
  ctx.save();ctx.strokeStyle="#111";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(14,14,W-28,H-28,38);ctx.stroke();ctx.restore();
  // giant suit behind portrait
  ctx.save();ctx.fillStyle=rgba(color,.16);ctx.font='700 560px Georgia,serif';ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(symbol,W/2,H/2-5);ctx.restore();
  // Subject layer. AI-cutout PNG keeps the giant suit visible around the person.
  ctx.save();ctx.shadowColor="rgba(0,0,0,.22)";ctx.shadowBlur=16;ctx.shadowOffsetY=5;
  e.subjectRect(82,112,W-164,720,20);ctx.restore();
  // corner rank/suit
  const rank=String(c.trumpRank||"A").toUpperCase();
  ctx.save();ctx.fillStyle=color;ctx.textAlign="center";ctx.font='500 58px "Bodoni Moda",Georgia,serif';ctx.fillText(rank,68,82);ctx.font='700 52px Georgia,serif';ctx.fillText(symbol,68,139);ctx.restore();
  ctx.save();ctx.translate(W-68,H-82);ctx.rotate(Math.PI);ctx.fillStyle=color;ctx.textAlign="center";ctx.font='500 58px "Bodoni Moda",Georgia,serif';ctx.fillText(rank,0,0);ctx.font='700 52px Georgia,serif';ctx.fillText(symbol,0,57);ctx.restore();
  await e.logo({w:64,effects:false});
  e.name({x:c.textX,y:c.textY,maxWidth:430,size:c.fontSize,font:c.font,fill:"#111111",stroke:"#FFFFFF",shadow:false})
}
async function backTrump(e){
  const {ctx,W,H,c}=e,{symbol,color}=suitInfo(c.trumpSuit);e.backBase("#FFFDFC");
  ctx.save();ctx.strokeStyle="#111";ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(14,14,W-28,H-28,38);ctx.stroke();ctx.fillStyle=color;ctx.globalAlpha=.92;
  for(let y=95,row=0;y<H;y+=112,row++)for(let x=60;x<W;x+=110){ctx.save();ctx.translate(x+(row%2?55:0),y);ctx.rotate(-Math.PI/7);ctx.font='700 58px Georgia,serif';ctx.textAlign="center";ctx.fillText(symbol,0,0);ctx.restore()}ctx.restore();
  await e.backLogo({maxWidth:210})
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

const FRONT_RENDERERS={
  ribbon:frontRibbon,y2k:frontY2K,polaroid:frontPolaroid,film:frontFilm,magazine:frontMagazine,
  luxury:frontLuxury,princess:frontPrincess,gothic:frontGothic,angel:frontAngel,cyber:frontCyber,arcade:frontArcade,
  minimal:frontMinimal,editorial:frontEditorial,split:frontSplit,
  student_id:frontStudentId,trump:frontTrump,signature:frontSignature
};
const BACK_RENDERERS={
  ribbon:backRibbon,y2k:backY2K,polaroid:backPolaroid,film:backFilm,magazine:backMagazine,
  luxury:backLuxury,princess:backPrincess,gothic:backGothic,angel:backAngel,cyber:backCyber,arcade:backArcade,
  minimal:backMinimal,editorial:backEditorial,split:backSplit,
  student_id:backStudentId,trump:backTrump,signature:backSignature
};
export async function renderTemplateFront(id,env){const t=getTemplate(id),fn=FRONT_RENDERERS[t.front]||frontRibbon;return fn(env)}
export async function renderTemplateBack(id,env){const t=getTemplate(id),fn=BACK_RENDERERS[t.back]||backRibbon;return fn(env)}
