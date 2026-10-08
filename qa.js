import {drawNameText} from "./name-text.js?v=1";
import { getTemplateList, renderTemplateFront, renderTemplateBack, FONT_MAP } from "./templates.js?v=15";

const W=650,H=1004,R=28;
const $=id=>document.getElementById(id);

function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function fillRound(ctx,x,y,w,h,r,color){ctx.save();ctx.fillStyle=color;rounded(ctx,x,y,w,h,r);ctx.fill();ctx.restore()}
function drawCoverRect(ctx,img,c,rx,ry,rw,rh){
  const z=Math.max(1,(c.zoom||100)/100),scale=Math.max(rw/img.width,rh/img.height)*z,dw=img.width*scale,dh=img.height*scale;
  const x=rx-(dw-rw)*Math.max(0,Math.min(1,(c.fx||50)/100)),y=ry-(dh-rh)*Math.max(0,Math.min(1,(c.fy||50)/100));
  ctx.drawImage(img,x,y,dw,dh)
}
function makePhoto(){
  const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#9bb7d4");g.addColorStop(.52,"#f0c9c1");g.addColorStop(1,"#d8c6ea");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="rgba(255,255,255,.42)";for(let y=40;y<H;y+=86)for(let xx=40;xx<W;xx+=90){x.beginPath();x.arc(xx+(y%172?20:0),y,18,0,Math.PI*2);x.fill()}
  x.fillStyle="#f0d3c6";x.beginPath();x.arc(W/2,330,128,0,Math.PI*2);x.fill();
  x.fillStyle="#443b46";x.beginPath();x.arc(W/2,285,132,Math.PI,Math.PI*2);x.lineTo(W/2+125,355);x.quadraticCurveTo(W/2,250,W/2-125,355);x.closePath();x.fill();
  x.fillStyle="#5b5b78";x.beginPath();x.moveTo(128,H);x.quadraticCurveTo(145,560,W/2,535);x.quadraticCurveTo(W-145,560,W-128,H);x.closePath();x.fill();
  return c
}
function makeLogo(){
  const c=document.createElement("canvas");c.width=360;c.height=140;const x=c.getContext("2d");x.font='800 78px Arial';x.textAlign="center";x.textBaseline="middle";x.fillStyle="#fff";x.strokeStyle="#111";x.lineWidth=8;x.strokeText("LOGO",180,70);x.fillText("LOGO",180,70);return c
}
const photo=makePhoto(),logo=makeLogo();

function drawLogo(ctx,c,{cx=W/2,cy=60,w=92,effects=true,alpha=1,angle=0}={}){
  const ratio=logo.height/logo.width,dw=w,dh=w*ratio;ctx.save();ctx.globalAlpha=alpha;ctx.translate(cx,cy);ctx.rotate(angle);
  if(effects){ctx.shadowColor="rgba(0,0,0,.48)";ctx.shadowBlur=6;ctx.shadowOffsetY=3}
  ctx.drawImage(logo,-dw/2,-dh/2,dw,dh);ctx.restore()
}
function makeEnv(ctx,t){
  const c={template:t.id,name:"wonyoung",schoolName:"QA HIGH SCHOOL",trumpSuit:"heart",trumpRank:"A",trumpSuitColor:"auto",trumpRankColor:"auto",element:"#D7A4C5",text:"#FFF3D6",background:"auto",stroke:"#FFFFFF",strokeWidth:1,shadow:true,logoOutline:true,logoShadow:true,fx:50,fy:50,zoom:100,...t.defaults};
  return {
    ctx,W,H,R,c,signatureImage:null,
    fillRound:(x,y,w,h,r,color)=>fillRound(ctx,x,y,w,h,r,(x===0&&y===0&&w===W&&h===H&&c.background!=="auto")?c.background:color),
    photoRect:(x,y,w,h,r=0)=>{ctx.save();rounded(ctx,x,y,w,h,r);ctx.clip();drawCoverRect(ctx,photo,c,x,y,w,h);ctx.restore()},
    subjectRect:(x,y,w,h,r=0)=>{ctx.save();rounded(ctx,x,y,w,h,r);ctx.clip();drawCoverRect(ctx,photo,c,x,y,w,h);ctx.restore()},
    punchRoundRect:(x,y,w,h,r)=>{ctx.save();ctx.globalCompositeOperation="destination-out";rounded(ctx,x,y,w,h,r);ctx.fill();ctx.restore()},
    ribbonFrame:(back=false)=>{ctx.save();ctx.strokeStyle=c.element;ctx.lineWidth=8;rounded(ctx,16,16,W-32,H-32,24);ctx.stroke();ctx.restore()},
    logo:async(opts={})=>drawLogo(ctx,c,{cx:c.frontLogoX??W/2,cy:c.frontLogoY??60,w:92*(c.frontLogoScale||100)/100,effects:true,...opts}),
    backLogo:async({maxWidth=330,cx=c.backLogoX??W/2,cy=c.backLogoY??H/2}={})=>drawLogo(ctx,c,{cx,cy,w:maxWidth*(c.backLogoScale||100)/100,effects:true}),
    name:(opts={})=>drawNameText(ctx,c,{...opts,family:FONT_MAP[opts.font||c.font],maxWidth:Math.min(opts.maxWidth??380,t.nameArea.width),maxHeight:t.nameArea.height,angle:t.nameArea.angle}),
    backBase:(color="#fff")=>fillRound(ctx,0,0,W,H,R,c.background!=="auto"?c.background:color),
    signature() {}
  }
}
function nonBlank(canvas){
  const x=canvas.getContext("2d"),d=x.getImageData(0,0,canvas.width,canvas.height).data;let count=0;
  for(let i=3;i<d.length;i+=1600)if(d[i]>8)count++;
  return count>20
}
function thumb(source){
  const c=document.createElement("canvas");c.width=195;c.height=301;c.getContext("2d").drawImage(source,0,0,c.width,c.height);return c
}
async function renderOne(t,side){
  const c=document.createElement("canvas");c.width=W;c.height=H;const ctx=c.getContext("2d");ctx.clearRect(0,0,W,H);const env=makeEnv(ctx,t);
  if(side==="front")await renderTemplateFront(t.id,env);else await renderTemplateBack(t.id,env);
  if(!nonBlank(c))throw new Error(`${side} canvas appears blank`);
  return thumb(c)
}
async function run(){
  const grid=$("grid"),summary=$("summary");grid.innerHTML="";summary.innerHTML='<span class="pill">검사 중…</span>';
  const templates=getTemplateList();
  await Promise.all(templates.map(t=>document.fonts.load(`400 ${t.defaults.fontSize}px "${t.defaults.font}"`)));
  let ok=0,failed=0;
  for(const t of templates){
    const card=document.createElement("div");card.className="card";const title=document.createElement("div");title.className="title";title.textContent=t.label;card.appendChild(title);
    const wrap=document.createElement("div");wrap.className="canvases";const errors=[];
    for(const side of ["front","back"]){
      const box=document.createElement("div");
      try{const c=await renderOne(t,side);box.appendChild(c);const lab=document.createElement("div");lab.className="side";lab.textContent=side==="front"?"앞면":"뒷면";box.appendChild(lab)}
      catch(e){errors.push(`${side}: ${e.message}`);const lab=document.createElement("div");lab.className="error";lab.textContent=e.stack||e.message;box.appendChild(lab)}
      wrap.appendChild(box)
    }
    card.appendChild(wrap);if(errors.length){failed++;card.classList.add("fail-card");const e=document.createElement("div");e.className="error";e.textContent=errors.join("\n");card.appendChild(e)}else ok++;grid.appendChild(card)
  }
  summary.innerHTML=`<span class="pill ${failed?"fail":"pass"}">${failed?"FAIL":"PASS"}</span><span class="pill">템플릿 ${templates.length}</span><span class="pill">정상 ${ok}</span><span class="pill">오류 ${failed}</span><span class="pill">렌더 ${templates.length*2}면</span>`;
  document.title=`${failed?"FAIL":"PASS"} · PhotocardMaker Template QA`;
}
$("runBtn").onclick=run;
run();
