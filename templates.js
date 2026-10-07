export const FONT_REGISTRY=[
  {name:"Playfair Display",family:'"Playfair Display",Georgia,serif',category:"serif"},
  {name:"Cormorant Garamond",family:'"Cormorant Garamond",Georgia,serif',category:"serif"},
  {name:"DM Serif Display",family:'"DM Serif Display",Georgia,serif',category:"serif"},
  {name:"Libre Baskerville",family:'"Libre Baskerville",Georgia,serif',category:"serif"},
  {name:"Lora",family:'"Lora",Georgia,serif',category:"serif"},
  {name:"Abril Fatface",family:'"Abril Fatface",Georgia,serif',category:"display"},
  {name:"Cinzel",family:'"Cinzel",Georgia,serif',category:"display"},
  {name:"Bodoni Moda",family:'"Bodoni Moda",Georgia,serif',category:"serif"},
  {name:"Montserrat",family:'"Montserrat",Arial,sans-serif',category:"sans"},
  {name:"Poppins",family:'"Poppins",Arial,sans-serif',category:"sans"},
  {name:"Raleway",family:'"Raleway",Arial,sans-serif',category:"sans"},
  {name:"Quicksand",family:'"Quicksand",Arial,sans-serif',category:"sans"},
  {name:"Oswald",family:'"Oswald","Arial Narrow",sans-serif',category:"sans"},
  {name:"Inter",family:'"Inter",Arial,sans-serif',category:"sans"},
  {name:"Space Grotesk",family:'"Space Grotesk",Arial,sans-serif',category:"sans"},
  {name:"Bebas Neue",family:'"Bebas Neue","Arial Narrow",sans-serif',category:"display"},
  {name:"Great Vibes",family:'"Great Vibes",cursive',category:"script"},
  {name:"Pacifico",family:'"Pacifico",cursive',category:"script"},
  {name:"Dancing Script",family:'"Dancing Script",cursive',category:"script"},
  {name:"Allura",family:'"Allura",cursive',category:"script"},
  {name:"Sacramento",family:'"Sacramento",cursive',category:"script"}
];

export const FONT_MAP=Object.fromEntries(FONT_REGISTRY.map(x=>[x.name,x.family]));

export const TEMPLATE_REGISTRY={
  ribbon:{
    id:"ribbon",label:"01. Ribbon Classic",category:"classic",
    defaults:{font:"Playfair Display",fontSize:31,tracking:4,textX:325,backStyle:"center"},
    extras:[],front:"ribbon",back:"ribbon"
  },
  polaroid:{
    id:"polaroid",label:"03. Polaroid",category:"photo",
    defaults:{font:"Libre Baskerville",fontSize:34,tracking:2,textX:325,backStyle:"center"},
    extras:[],front:"polaroid",back:"polaroid"
  },
  magazine:{
    id:"magazine",label:"05. Magazine Cover",category:"editorial",
    defaults:{font:"Bodoni Moda",fontSize:52,tracking:2,textX:325,backStyle:"diagonal"},
    extras:[],front:"magazine",back:"magazine"
  },
  minimal:{
    id:"minimal",label:"14. Minimal Line",category:"minimal",
    defaults:{font:"Inter",fontSize:29,tracking:5,textX:325,backStyle:"center"},
    extras:[],front:"minimal",back:"minimal"
  },
  student_id:{
    id:"student_id",label:"22. Student ID",category:"special",
    defaults:{font:"Montserrat",fontSize:34,tracking:2,textX:325,backStyle:"center",schoolName:"아이브고등학교"},
    extras:["schoolName"],front:"student_id",back:"student_id"
  },
  signature:{
    id:"signature",label:"39. Signature",category:"special",
    defaults:{font:"Sacramento",fontSize:30,tracking:1,textX:325,backStyle:"center"},
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

function line(ctx,x1,y1,x2,y2,color,width=1){
  ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore()
}
function cornerMark(ctx,x,y,s,color,flipX=1,flipY=1){
  line(ctx,x,y,x+s*flipX,y,color,1.5);line(ctx,x,y,x,y+s*flipY,color,1.5)
}

async function frontRibbon(e){
  e.photoRect(0,0,e.W,e.H,e.R);
  e.ribbonFrame(false);
  await e.logo({cx:e.W/2,cy:60,w:92,effects:true});
  e.name({x:e.c.textX,y:903,maxWidth:380});
}
async function backRibbon(e){
  e.backBase(lighten(e.c.element,.93));
  await e.backLogo();
  e.ribbonFrame(true)
}

async function frontPolaroid(e){
  const {ctx,W,H,c}=e;
  e.fillRound(0,0,W,H,e.R,"#FBFAF6");
  ctx.save();ctx.shadowColor="rgba(0,0,0,.18)";ctx.shadowBlur=12;ctx.shadowOffsetY=4;
  e.fillRound(20,20,W-40,H-40,26,"#FFFFFF");ctx.restore();
  e.photoRect(42,42,W-84,748,8);
  line(ctx,42,812,W-42,812,rgba(c.element,.6),1);
  await e.logo({cx:92,cy:880,w:70,effects:true});
  e.name({x:355,y:885,maxWidth:400,font:c.font,size:c.fontSize,align:"center"});
  cornerMark(ctx,42,824,20,rgba(c.element,.75),1,1);
  cornerMark(ctx,W-42,824,20,rgba(c.element,.75),-1,1)
}
async function backPolaroid(e){
  const {ctx,W,H,c}=e;e.backBase("#F7F4EC");
  e.fillRound(30,30,W-60,H-60,22,"#FFFFFF");
  ctx.save();ctx.strokeStyle=rgba(c.element,.65);ctx.lineWidth=1.5;ctx.strokeRect(52,52,W-104,H-104);ctx.restore();
  await e.backLogo()
}

async function frontMagazine(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle="rgba(0,0,0,.14)";ctx.fillRect(0,0,W,190);ctx.restore();
  line(ctx,34,34,W-34,34,"rgba(255,255,255,.85)",1.5);
  line(ctx,34,171,W-34,171,"rgba(255,255,255,.65)",1);
  e.name({x:c.textX,y:105,maxWidth:560,size:Math.max(c.fontSize,46),font:c.font,fill:c.text,stroke:c.stroke,shadow:true});
  await e.logo({cx:W-78,cy:218,w:82,effects:true});
  line(ctx,36,H-74,W-36,H-74,rgba(c.text,.85),1.5);
  line(ctx,36,H-55,210,H-55,rgba(c.text,.7),1)
}
async function backMagazine(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.9));
  ctx.save();ctx.fillStyle=rgba(c.element,.12);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(0,H);ctx.closePath();ctx.fill();ctx.restore();
  line(ctx,52,70,W-52,70,rgba(c.element,.7),2);
  line(ctx,52,H-70,W-52,H-70,rgba(c.element,.7),2);
  await e.backLogo()
}

async function frontMinimal(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.strokeStyle=rgba(c.element,.9);ctx.lineWidth=1.4;ctx.strokeRect(24,24,W-48,H-48);ctx.restore();
  line(ctx,42,H-118,240,H-118,rgba(c.element,.9),2);
  e.name({x:150,y:H-82,maxWidth:260,size:c.fontSize,font:c.font,align:"center"});
  await e.logo({cx:W-72,cy:64,w:72,effects:true})
}
async function backMinimal(e){
  const {ctx,W,H,c}=e;e.backBase("#FBFBFA");
  ctx.save();ctx.strokeStyle=rgba(c.element,.7);ctx.lineWidth=1.2;ctx.strokeRect(26,26,W-52,H-52);ctx.restore();
  await e.backLogo()
}

async function frontStudentId(e){
  const {ctx,W,H,c}=e;
  e.fillRound(0,0,W,H,e.R,lighten(c.element,.92));
  e.fillRound(18,18,W-36,H-36,28,"#FFFFFF");
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(18,18,W-36,112);ctx.restore();
  await e.logo({cx:76,cy:74,w:86,effects:false});
  ctx.save();ctx.fillStyle="#FFFFFF";ctx.textBaseline="middle";ctx.font='600 27px "Montserrat",Arial,sans-serif';
  ctx.fillText(c.schoolName||"아이브고등학교",136,75,440);ctx.restore();
  e.photoRect(58,170,W-116,610,18);
  ctx.save();ctx.fillStyle=rgba(c.element,.12);ctx.fillRect(58,808,W-116,116);ctx.restore();
  e.name({x:W/2,y:854,maxWidth:480,size:Math.max(32,c.fontSize),font:c.font,fill:c.text});
  line(ctx,122,896,W-122,896,rgba(c.element,.65),1.5);
  cornerMark(ctx,42,150,20,c.element,1,1);cornerMark(ctx,W-42,150,20,c.element,-1,1)
}
async function backStudentId(e){
  const {ctx,W,H,c}=e;e.backBase(lighten(c.element,.9));
  ctx.save();ctx.fillStyle=c.element;ctx.fillRect(0,0,W,118);ctx.restore();
  await e.logo({cx:78,cy:59,w:88,effects:false});
  ctx.save();ctx.fillStyle="#FFFFFF";ctx.textBaseline="middle";ctx.font='600 28px "Montserrat",Arial,sans-serif';
  ctx.fillText(c.schoolName||"아이브고등학교",142,60,430);ctx.restore();
  await e.backLogo({maxWidth:285});
  line(ctx,72,H-120,W-72,H-120,rgba(c.element,.6),1.5)
}

async function frontSignature(e){
  const {ctx,W,H,c}=e;e.photoRect(0,0,W,H,e.R);
  ctx.save();ctx.fillStyle="rgba(0,0,0,.08)";ctx.fillRect(0,H-210,W,210);ctx.restore();
  await e.logo({cx:W-70,cy:64,w:72,effects:true});
  e.name({x:115,y:H-62,maxWidth:190,size:Math.min(c.fontSize,32),font:"Montserrat",align:"center"});
  if(e.signatureImage)e.signature({cx:W/2+32,cy:H-132,maxWidth:360,maxHeight:140});
  else{
    ctx.save();ctx.fillStyle="rgba(255,255,255,.8)";ctx.font='400 22px "Sacramento",cursive';ctx.textAlign="center";
    ctx.fillText(c.name||"",W/2+40,H-128);ctx.restore()
  }
}
async function backSignature(e){
  const {ctx,W,H,c}=e;e.backBase("#FCFBFA");
  line(ctx,54,72,W-54,72,rgba(c.element,.75),1.5);
  line(ctx,54,H-72,W-54,H-72,rgba(c.element,.75),1.5);
  await e.backLogo();
  if(e.signatureImage)e.signature({cx:W/2,cy:H-160,maxWidth:300,maxHeight:105,alpha:.95})
}

const FRONT_RENDERERS={
  ribbon:frontRibbon,polaroid:frontPolaroid,magazine:frontMagazine,
  minimal:frontMinimal,student_id:frontStudentId,signature:frontSignature
};
const BACK_RENDERERS={
  ribbon:backRibbon,polaroid:backPolaroid,magazine:backMagazine,
  minimal:backMinimal,student_id:backStudentId,signature:backSignature
};

export async function renderTemplateFront(id,env){
  const t=getTemplate(id),fn=FRONT_RENDERERS[t.front]||frontRibbon;return fn(env)
}
export async function renderTemplateBack(id,env){
  const t=getTemplate(id),fn=BACK_RENDERERS[t.back]||backRibbon;return fn(env)
}
