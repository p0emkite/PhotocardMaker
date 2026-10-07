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
  polaroid:{
    id:"polaroid",label:"03. Polaroid",category:"photo",
    defaults:common({font:"Libre Baskerville",fontSize:33,tracking:2,textX:365,textY:887,frontLogoX:90,frontLogoY:881,frontLogoScale:76}),
    extras:[],front:"polaroid",back:"polaroid"
  },
  magazine:{
    id:"magazine",label:"05. Magazine Cover",category:"editorial",
    defaults:common({font:"Bodoni Moda",fontSize:52,tracking:2,textX:325,textY:106,backStyle:"diagonal",frontLogoX:566,frontLogoY:222,frontLogoScale:88}),
    extras:[],front:"magazine",back:"magazine"
  },
  minimal:{
    id:"minimal",label:"14. Minimal Line",category:"minimal",
    defaults:common({font:"Inter",fontSize:29,tracking:5,textX:150,textY:922,frontLogoX:575,frontLogoY:66,frontLogoScale:78}),
    extras:[],front:"minimal",back:"minimal"
  },
  student_id:{
    id:"student_id",label:"22. Student ID",category:"special",
    defaults:common({font:"Montserrat",fontSize:42,tracking:5,textX:325,textY:753,backStyle:"center",frontLogoX:82,frontLogoY:920,frontLogoScale:82,backLogoScale:100,schoolName:"아이브고등학교"}),
    extras:["schoolName"],front:"student_id",back:"student_id"
  },
  trump:{
    id:"trump",label:"23. Trump Card",category:"special",
    defaults:common({font:"Playfair Display",fontSize:34,tracking:4,textX:325,textY:910,backStyle:"center",frontLogoX:572,frontLogoY:72,frontLogoScale:72,trumpSuit:"diamond",trumpRank:"A"}),
    extras:["trumpOptions"],front:"trump",back:"trump"
  },
  signature:{
    id:"signature",label:"39. Signature",category:"special",
    defaults:common({font:"Sacramento",fontSize:30,tracking:1,textX:115,textY:942,frontLogoX:576,frontLogoY:67,frontLogoScale:78}),
    extras:["signatureImage"],front:"signature",back:"signature"
  }
};

export function getTemplate(id){return TEMPLATE_REGISTRY[id]||TEMPLATE_REGISTRY.ribbon}
export function getTemplateList(){return Object.values(TEMPLATE_REGISTRY)}

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

async function frontRibbon(e){
  e.photoRect(0,0,e.W,e.H,e.R);e.ribbonFrame(false);
  await e.logo({w:92,effects:true});e.name({x:e.c.textX,y:e.c.textY,maxWidth:380})
}
async function backRibbon(e){e.backBase(lighten(e.c.element,.93));await e.backLogo();e.ribbonFrame(true)}

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
  // lanyard slot
  ctx.save();ctx.strokeStyle="rgba(255,255,255,.8)";ctx.lineWidth=2;e.fillRound(W/2-78,28,156,34,17,"rgba(255,255,255,.05)");ctx.strokeRect(0,0,0,0);ctx.beginPath();ctx.roundRect(W/2-78,28,156,34,17);ctx.stroke();ctx.restore();
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
  centeredText(ctx,c.schoolName||"아이브고등학교",W/2+58,930,'600 30px "Montserrat",sans-serif',"#FFFFFF",2.3);
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
  // portrait card window
  ctx.save();ctx.shadowColor="rgba(0,0,0,.18)";ctx.shadowBlur=18;ctx.shadowOffsetY=5;e.fillRound(92,128,W-184,690,22,"#FFFFFF");ctx.restore();
  e.photoRect(92,128,W-184,690,22);
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
  if(e.signatureImage)e.signature({cx:W/2+38,cy:H-142,maxWidth:365,maxHeight:145});
  else centeredText(ctx,c.name||"",W/2+50,H-142,'400 38px "Sacramento",cursive',"rgba(255,255,255,.9)",0)
}
async function backSignature(e){
  const {ctx,W,H,c}=e;e.backBase("#FCFBFA");
  line(ctx,54,72,W-54,72,rgba(c.element,.75),1.5);line(ctx,54,H-72,W-54,H-72,rgba(c.element,.75),1.5);
  await e.backLogo();if(e.signatureImage)e.signature({cx:W/2,cy:H-160,maxWidth:300,maxHeight:105,alpha:.95})
}

const FRONT_RENDERERS={
  ribbon:frontRibbon,polaroid:frontPolaroid,magazine:frontMagazine,minimal:frontMinimal,
  student_id:frontStudentId,trump:frontTrump,signature:frontSignature
};
const BACK_RENDERERS={
  ribbon:backRibbon,polaroid:backPolaroid,magazine:backMagazine,minimal:backMinimal,
  student_id:backStudentId,trump:backTrump,signature:backSignature
};
export async function renderTemplateFront(id,env){const t=getTemplate(id),fn=FRONT_RENDERERS[t.front]||frontRibbon;return fn(env)}
export async function renderTemplateBack(id,env){const t=getTemplate(id),fn=BACK_RENDERERS[t.back]||backRibbon;return fn(env)}
