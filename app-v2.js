const $=id=>document.getElementById(id);
const W=650,H=1004,R=38;
const STORAGE_KEY="photocard-maker-v2-defaults";
const COLOR_KEY="photocard-maker-v2-custom-colors";
const PROGRESS_KEY="photocard-maker-v2-excel-progress";
const DB_NAME="photocard-maker-storage",DB_STORE="handles",DB_KEY="folder";
const COLUMNS=["템플릿","그룹","요소 컬러","텍스트 컬러","이름","이미지명","저장파일명"];
const BASE_COLORS={"샴페인 골드":"#E7C68E","아이보리 골드":"#F5E5C2","벚꽃 핑크":"#F3B6C4","라일락":"#CDB8E8","로즈골드":"#D8A0A6","진주빛 아이보리":"#F4EFE3","크림 아이보리":"#F6EBD8","파우더 블루":"#B9D2E7","민트":"#B8DCCF","복숭아빛":"#F3BEA8","연핑크":"#F4BBC8","골드":"#D9B76E","실버":"#D7D9DE","화이트":"#FFFFFF","블랙":"#111111"};
const GROUPS={"":{label:"로고 없음",logo:null},"IVE":{label:"IVE",logo:"./assets/logos/ive.png"}};
const FONTS={
  "Playfair Display":'"Playfair Display",Georgia,serif',
  "Cormorant Garamond":'"Cormorant Garamond",Georgia,serif',
  "DM Serif Display":'"DM Serif Display",Georgia,serif',
  "Montserrat":'"Montserrat",Arial,sans-serif',
  "Great Vibes":'"Great Vibes",cursive',
  "Bebas Neue":'"Bebas Neue","Arial Narrow",sans-serif',
  "Libre Baskerville":'"Libre Baskerville",Georgia,serif',
  "Lora":'"Lora",Georgia,serif',
  "Abril Fatface":'"Abril Fatface",Georgia,serif',
  "Cinzel":'"Cinzel",Georgia,serif',
  "Poppins":'"Poppins",Arial,sans-serif',
  "Raleway":'"Raleway",Arial,sans-serif',
  "Pacifico":'"Pacifico",cursive',
  "Dancing Script":'"Dancing Script",cursive',
  "Oswald":'"Oswald","Arial Narrow",sans-serif',
  "Quicksand":'"Quicksand",Arial,sans-serif'
};
const logoMaskCache=new Map();
const logoMetricsCache=new Map();
let customColors=loadJson(COLOR_KEY,{});
let photo=null,photoFile=null,currentSide="front",drag=null,saveDir=null,raf=0,filenameEdited=false;
let batchRows=[],batchFiles=[],excelRows=[],selectedId=null,sortCol=null,sortDesc=false,filters=Object.fromEntries(COLUMNS.map(c=>[c,""]));
let editColorName=null;
const assetCache=new Map();

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
function loadJson(k,f){try{return JSON.parse(localStorage.getItem(k)||"null")??f}catch{return f}}
function saveJson(k,v){localStorage.setItem(k,JSON.stringify(v))}
function allColors(){return {...BASE_COLORS,...customColors}}
function isHex(v){return /^#[0-9a-f]{6}$/i.test(String(v||"").trim())}
function colorValue(v,f="#fff"){const s=String(v||"").trim();return isHex(s)?s.toUpperCase():(allColors()[s]||f)}
function sanitize(name,f="card.png"){let s=(name||"").trim()||f;s=s.replace(/[<>:"/\\|?*\x00-\x1F]/g,"_").replace(/[ .]+$/g,"");if(!s.toLowerCase().endsWith(".png"))s+=".png";return s}
function backName(n){return sanitize(n).replace(/\.png$/i,"_BACK.png")}
function defaultName(){return sanitize((($("nameInput").value||"card").trim()||"card")+"_RIBBON_V1_650x1004.png")}
function maybeName(force=false){if(force||!filenameEdited)$("filenameInput").value=defaultName()}
function status(msg,err=false,ok=false){const e=$("status");e.textContent=msg;e.className="status"+(err?" error":ok?" ok":"")}
function batchStatus(msg,err=false,ok=false){const e=$("batchStatus");e.textContent=msg;e.className="status compact-status"+(err?" error":ok?" ok":"")}

function colorOptions(id,preferred){const s=$(id),old=preferred??s.value;const base=Object.keys(BASE_COLORS).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join("");const mine=Object.keys(customColors).map(k=>`<option value="${esc(k)}">★ ${esc(k)}</option>`).join("");s.innerHTML=`<optgroup label="기본 색상">${base}</optgroup>`+(mine?`<optgroup label="내 색상">${mine}</optgroup>`:"");const vals=[...s.options].map(o=>o.value);s.value=vals.includes(old)?old:(id==="elementColorSelect"?"샴페인 골드":"아이보리 골드")}
function syncPicker(kind){const s=$(kind==="element"?"elementColorSelect":"textColorSelect"),p=$(kind==="element"?"elementColorPicker":"textColorPicker");p.value=colorValue(s.value,kind==="element"?"#E7C68E":"#F5E5C2")}
function pickerToSelect(kind){const s=$(kind==="element"?"elementColorSelect":"textColorSelect"),p=$(kind==="element"?"elementColorPicker":"textColorPicker"),v=p.value.toUpperCase();const found=Object.entries(allColors()).find(([,x])=>x.toUpperCase()===v)?.[0];if(found)s.value=found;else{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o);s.value=v}queue()}
function renderCustomColors(){const root=$("customColorList"),rows=Object.entries(customColors);root.innerHTML=rows.length?rows.map(([n,v])=>`<div class="custom-color-item"><span class="color-swatch" style="background:${esc(v)}"></span><b>${esc(n)}</b><code>${esc(v)}</code><span><button type="button" class="ghost edit-color" data-n="${esc(n)}">수정</button> <button type="button" class="ghost del-color" data-n="${esc(n)}">삭제</button></span></div>`).join(""):'<div class="empty-custom-colors">저장한 사용자 색상이 없습니다.</div>';root.querySelectorAll(".edit-color").forEach(b=>b.onclick=()=>editColor(b.dataset.n));root.querySelectorAll(".del-color").forEach(b=>b.onclick=()=>deleteColor(b.dataset.n))}
function openColorManager(){editColorName=null;$("customColorName").value="";$("customColorHex").value=$("elementColorPicker").value.toUpperCase();$("customColorPicker").value=$("elementColorPicker").value;$("addCustomColorBtn").textContent="색상 저장";renderCustomColors();$("colorManagerDialog").showModal()}
function normalizeHex(s){s=String(s||"").trim().toUpperCase();if(!s.startsWith("#"))s="#"+s;return isHex(s)?s:null}
function saveCustomColor(){const n=$("customColorName").value.trim(),v=normalizeHex($("customColorHex").value)||$("customColorPicker").value.toUpperCase();if(!n)return $("customColorName").focus();if(editColorName&&editColorName!==n)delete customColors[editColorName];customColors[n]=v;saveJson(COLOR_KEY,customColors);editColorName=null;colorOptions("elementColorSelect",n);colorOptions("textColorSelect");syncPicker("element");syncPicker("text");$("customColorName").value="";$("addCustomColorBtn").textContent="색상 저장";renderCustomColors();queue()}
function editColor(n){if(!customColors[n])return;editColorName=n;$("customColorName").value=n;$("customColorHex").value=customColors[n];$("customColorPicker").value=customColors[n];$("addCustomColorBtn").textContent="수정 저장";$("customColorName").focus()}
function deleteColor(n){delete customColors[n];saveJson(COLOR_KEY,customColors);colorOptions("elementColorSelect");colorOptions("textColorSelect");syncPicker("element");syncPicker("text");renderCustomColors();queue()}
function initColors(){colorOptions("elementColorSelect","샴페인 골드");colorOptions("textColorSelect","아이보리 골드");syncPicker("element");syncPicker("text");renderCustomColors()}

function initGroups(){const s=$("groupSelect");s.innerHTML=Object.entries(GROUPS).map(([id,g])=>`<option value="${esc(id)}">${esc(g.label)}</option>`).join("");s.value="IVE"}
function ctrl(){return{name:$("nameInput").value,group:$("groupSelect").value,backStyle:$("backStyleSelect").value,font:$("fontSelect").value||"Playfair Display",logoOutline:$("logoOutlineCheck").checked,logoShadow:$("logoShadowCheck").checked,element:colorValue($("elementColorSelect").value,$("elementColorPicker").value),text:colorValue($("textColorSelect").value,$("textColorPicker").value),fx:+$("focusXNumber").value||50,fy:+$("focusYNumber").value||50,zoom:+$("zoomNumber").value||100,tracking:+$("trackingInput").value||4,fontSize:+$("fontSizeInput").value||31,textX:+$("textXInput").value||325,shadow:$("shadowCheck").checked,stroke:$("strokeColorPicker").value||"#fff",strokeWidth:+$("strokeWidthInput").value||0}}
function applyCtrl(c={}){if(c.name!=null)$("nameInput").value=c.name;if(c.group in GROUPS)$("groupSelect").value=c.group;if(c.backStyle)$("backStyleSelect").value=c.backStyle;if(c.font&&FONTS[c.font])$("fontSelect").value=c.font;if(c.logoOutline!=null)$("logoOutlineCheck").checked=!!c.logoOutline;if(c.logoShadow!=null)$("logoShadowCheck").checked=!!c.logoShadow;applyColor("element",c.element);applyColor("text",c.text);setLinked("focusX",c.fx??50);setLinked("focusY",c.fy??50);setLinked("zoom",c.zoom??100);if(c.tracking!=null)$("trackingInput").value=c.tracking;if(c.fontSize!=null)$("fontSizeInput").value=c.fontSize;if(c.textX!=null)$("textXInput").value=c.textX;if(c.shadow!=null)$("shadowCheck").checked=!!c.shadow;if(c.stroke)$("strokeColorPicker").value=c.stroke;if(c.strokeWidth!=null)$("strokeWidthInput").value=c.strokeWidth;maybeName();queue()}
function applyColor(kind,v){if(!v)return;const p=$(kind==="element"?"elementColorPicker":"textColorPicker"),s=$(kind==="element"?"elementColorSelect":"textColorSelect"),x=colorValue(v,kind==="element"?"#E7C68E":"#F5E5C2");p.value=x;const n=Object.entries(allColors()).find(([,q])=>q.toUpperCase()===x.toUpperCase())?.[0];if(n)s.value=n}

function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function drawCover(ctx,img,c){const z=Math.max(1,c.zoom/100),scale=Math.max(W/img.width,H/img.height)*z,dw=img.width*scale,dh=img.height*scale,x=-(dw-W)*clamp(c.fx/100,0,1),y=-(dh-H)*clamp(c.fy/100,0,1);ctx.drawImage(img,x,y,dw,dh)}
function heart(ctx,x,y,s,color){ctx.save();ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+s*.38);ctx.bezierCurveTo(x-s*.72,y-s*.2,x-s*.46,y-s*.86,x,y-s*.44);ctx.bezierCurveTo(x+s*.46,y-s*.86,x+s*.72,y-s*.2,x,y+s*.38);ctx.fill();ctx.restore()}
function sparkle(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x,y+s);ctx.moveTo(x-s,y);ctx.lineTo(x+s,y);ctx.stroke();ctx.restore()}
function bow(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2.4;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x-s*.2,y-s*.15,x-s*.55,y-s*.25,x-s*.62,y);ctx.bezierCurveTo(x-s*.55,y+s*.25,x-s*.18,y+s*.2,x,y);ctx.bezierCurveTo(x+s*.18,y+s*.2,x+s*.55,y+s*.25,x+s*.62,y);ctx.bezierCurveTo(x+s*.55,y-s*.25,x+s*.2,y-s*.15,x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x-3,y+4);ctx.lineTo(x-12,y+s*.75);ctx.moveTo(x+3,y+4);ctx.lineTo(x+12,y+s*.75);ctx.stroke();ctx.restore()}
function drawFrame(ctx,color,back=false){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.2;rounded(ctx,15,15,W-30,H-30,28);ctx.stroke();if(back){heart(ctx,44,46,13,color);heart(ctx,W-44,46,13,color);heart(ctx,44,H-46,13,color);heart(ctx,W-44,H-46,13,color);sparkle(ctx,81,47,7,color);sparkle(ctx,W-81,47,7,color);sparkle(ctx,81,H-47,7,color);sparkle(ctx,W-81,H-47,7,color);bow(ctx,W/2,54,22,color);bow(ctx,W/2,H-55,22,color)}else{bow(ctx,49,43,27,color);heart(ctx,47,92,13,color);sparkle(ctx,78,43,7,color);heart(ctx,W-48,70,18,color);sparkle(ctx,W-31,102,7,color);heart(ctx,47,H-47,18,color);sparkle(ctx,31,H-92,7,color);heart(ctx,W-47,H-47,18,color);sparkle(ctx,W-31,H-92,7,color);bow(ctx,W/2,H-69,22,color);sparkle(ctx,176,H-102,9,color);sparkle(ctx,W-176,H-102,9,color);ctx.beginPath();ctx.moveTo(198,H-70);ctx.lineTo(298,H-70);ctx.moveTo(352,H-70);ctx.lineTo(452,H-70);ctx.stroke()}ctx.restore()}
function trackedWidth(ctx,t,sp){let w=0;for(let i=0;i<t.length;i++){w+=ctx.measureText(t[i]).width;if(i<t.length-1)w+=sp}return w}
function drawName(ctx,c){const t=String(c.name||"").trim();if(!t)return;ctx.save();let size=c.fontSize,sp=c.tracking,family=FONTS[c.font]||FONTS["Playfair Display"];while(size>22){ctx.font=`400 ${size}px ${family}`;if(trackedWidth(ctx,t,sp)<=380)break;if(sp>1)sp--;else size--}ctx.font=`400 ${size}px ${family}`;ctx.textBaseline="middle";let x=c.textX-trackedWidth(ctx,t,sp)/2,y=903;if(c.shadow){ctx.shadowColor="rgba(0,0,0,.58)";ctx.shadowBlur=4;ctx.shadowOffsetX=2;ctx.shadowOffsetY=3}ctx.fillStyle=c.text;ctx.strokeStyle=c.stroke;ctx.lineJoin="round";ctx.lineWidth=Math.max(0,c.strokeWidth*2);for(let i=0;i<t.length;i++){const ch=t[i];if(c.strokeWidth>0)ctx.strokeText(ch,x,y);ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width+(i<t.length-1?sp:0)}ctx.restore()}
function loadAsset(path){if(!path)return Promise.resolve(null);if(assetCache.has(path))return assetCache.get(path);const p=new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("로고 로드 실패"));i.src=path});assetCache.set(path,p);return p}
function logoMetrics(img){
  const key=img.src||"logo";
  if(logoMetricsCache.has(key))return logoMetricsCache.get(key);
  const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height,c=document.createElement("canvas");
  c.width=iw;c.height=ih;
  const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(img,0,0,iw,ih);
  let minX=iw,minY=ih,maxX=-1,maxY=-1,sumA=0,sumX=0,sumY=0;
  try{
    const d=x.getImageData(0,0,iw,ih).data;
    for(let py=0,i=3;py<ih;py++)for(let px=0;px<iw;px++,i+=4){
      const a=d[i];
      if(a>8){
        if(px<minX)minX=px;if(px>maxX)maxX=px;if(py<minY)minY=py;if(py>maxY)maxY=py;
        sumA+=a;sumX+=px*a;sumY+=py*a;
      }
    }
  }catch{}
  const found=maxX>=minX&&maxY>=minY;
  const m=found?{cx:sumX/sumA,cy:sumY/sumA,bw:maxX-minX+1,bh:maxY-minY+1,iw,ih}:{cx:iw/2,cy:ih/2,bw:iw,bh:ih,iw,ih};
  logoMetricsCache.set(key,m);return m
}
function logoMask(img,w,h){const key=(img.src||"logo")+"|"+Math.round(w)+"x"+Math.round(h);if(logoMaskCache.has(key))return logoMaskCache.get(key);const m=document.createElement("canvas");m.width=Math.max(1,Math.ceil(w));m.height=Math.max(1,Math.ceil(h));const x=m.getContext("2d");x.drawImage(img,0,0,m.width,m.height);x.globalCompositeOperation="source-in";x.fillStyle="rgba(0,0,0,.72)";x.fillRect(0,0,m.width,m.height);logoMaskCache.set(key,m);return m}
function drawLogoInstance(ctx,img,c,cx,cy,w,alpha=1,angle=0,applyEffects=true){
  const m=logoMetrics(img),scale=w/m.bw,dw=m.iw*scale,dh=m.ih*scale,ox=-m.cx*scale,oy=-m.cy*scale;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.globalAlpha=alpha;
  if(applyEffects){
    const mask=logoMask(img,dw,dh);
    if(c.logoShadow){
      ctx.shadowColor="rgba(0,0,0,.25)";ctx.shadowBlur=4;ctx.shadowOffsetX=0;ctx.shadowOffsetY=2;
      ctx.drawImage(img,ox,oy,dw,dh);
      ctx.shadowColor="transparent";ctx.shadowBlur=0;ctx.shadowOffsetX=0;ctx.shadowOffsetY=0
    }
    if(c.logoOutline)for(const [dx,dy] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]])ctx.drawImage(mask,ox+dx,oy+dy,dw,dh)
  }
  ctx.drawImage(img,ox,oy,dw,dh);ctx.restore()
}
function drawLogoPattern(ctx,img,c){const angle=-Math.PI/6;ctx.save();rounded(ctx,0,0,W,H,R);ctx.clip();for(let row=0,y=105;y<H+100;row++,y+=145){if(row%2===0){const w=108;for(let x=30;x<W+90;x+=132)drawLogoInstance(ctx,img,c,x+(row%4===2?55:0),y,w,1,angle,false)}else{const w=190;for(let x=55;x<W+150;x+=225)drawLogoInstance(ctx,img,c,x+(row%4===3?70:0),y,w,1,angle,false)}}ctx.restore()}
async function drawLogo(ctx,c,back=false){const g=GROUPS[c.group];if(!g?.logo)return;let img;try{img=await loadAsset(g.logo)}catch{return}if(back&&c.backStyle==="pattern"){drawLogoPattern(ctx,img,c);return}if(back&&c.backStyle==="diagonal")drawLogoInstance(ctx,img,c,W/2,H/2,390,1,-Math.PI/4,false);else if(back)drawLogoInstance(ctx,img,c,W/2,H/2,330,1,0,false);else drawLogoInstance(ctx,img,c,W/2,60,92,.95,0,true)}
function mixWhite(hex,a=.91){const s=colorValue(hex).slice(1),r=parseInt(s.slice(0,2),16),g=parseInt(s.slice(2,4),16),b=parseInt(s.slice(4,6),16),m=v=>Math.round(v*(1-a)+255*a);return `rgb(${m(r)},${m(g)},${m(b)})`}
async function ensureFont(c){const family=c.font||"Playfair Display";try{await document.fonts.load(`400 ${Math.max(24,c.fontSize||31)}px "${family}"`)}catch{}}
async function renderFront(canvas,img=photo,c=ctrl()){if(!img)return false;await ensureFont(c);canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");ctx.clearRect(0,0,W,H);ctx.save();rounded(ctx,0,0,W,H,R);ctx.clip();drawCover(ctx,img,c);ctx.restore();drawFrame(ctx,c.element,false);await drawLogo(ctx,c,false);drawName(ctx,c);return true}
async function renderBack(canvas,c=ctrl()){canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");ctx.clearRect(0,0,W,H);ctx.save();rounded(ctx,0,0,W,H,R);ctx.clip();ctx.fillStyle=mixWhite(c.element);ctx.fillRect(0,0,W,H);const grd=ctx.createRadialGradient(W/2,H*.45,30,W/2,H*.45,520);grd.addColorStop(0,"rgba(255,255,255,.95)");grd.addColorStop(1,"rgba(255,255,255,.12)");ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);ctx.restore();await drawLogo(ctx,c,true);drawFrame(ctx,c.element,true);if(!GROUPS[c.group]?.logo){ctx.fillStyle=c.element;ctx.textAlign="center";ctx.font="600 38px Georgia";ctx.fillText(c.name||"PHOTOCARD",W/2,H/2)}return true}
function queue(){if(raf)return;raf=requestAnimationFrame(async()=>{raf=0;if(currentSide==="front"&&!photo)return;await (currentSide==="front"?renderFront($("previewCanvas")):renderBack($("previewCanvas")))})}
function setLinked(p,v){$(p+"Range").value=v;$(p+"Number").value=v}
function bindRange(p,min,max){const r=$(p+"Range"),n=$(p+"Number"),sync=(a,b)=>{const v=clamp(+a.value||0,min,max);b.value=v;queue()};r.oninput=()=>sync(r,n);n.oninput=()=>sync(n,r)}
function updateGuide(){$("centerGuide").style.display=$("centerGuideCheck").checked&&currentSide==="front"?"block":"none"}
async function choosePhoto(f){if(!f)return;try{photo?.close?.();photo=await createImageBitmap(f,{imageOrientation:"from-image"});photoFile=f;$("previewStage").classList.add("has-image");$("previewHint").textContent=f.name;$("generateBtn").disabled=false;$("savePairBtn").disabled=false;queue();status("사진을 불러왔습니다. 드래그와 휠로 위치를 조정하세요.",false,true)}catch(e){status("이미지 불러오기 실패: "+e.message,true)}}
function switchSide(side){currentSide=side;$("frontTabBtn").classList.toggle("active",side==="front");$("backTabBtn").classList.toggle("active",side==="back");$("previewStage").classList.toggle("back-side",side==="back");$("previewHelp").innerHTML=side==="front"?"<b>드래그</b>: 위치 이동 · <b>마우스 휠</b>: 확대/축소":"뒷면은 그룹 로고와 프레임을 자동 배치합니다.";$("generateBtn").textContent=side==="front"?"앞면 저장":"뒷면 저장";if(side==="back"){$("previewStage").classList.add("has-image");$("previewHint").textContent="뒷면 미리보기"}else{$("previewHint").textContent=photoFile?.name||"이미지를 선택하세요";$("previewStage").classList.toggle("has-image",!!photo)}$("generateBtn").disabled=side==="front"?!photo:false;updateGuide();queue()}
function bindGestures(){const s=$("previewStage");s.onpointerdown=e=>{if(currentSide!=="front"||!photo)return;s.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY};s.classList.add("dragging")};s.onpointermove=e=>{if(!drag||currentSide!=="front")return;const r=s.getBoundingClientRect(),dx=e.clientX-drag.x,dy=e.clientY-drag.y;setLinked("focusX",clamp((+$("focusXNumber").value||50)-dx*100/r.width,0,100).toFixed(1));setLinked("focusY",clamp((+$("focusYNumber").value||50)-dy*100/r.height,0,100).toFixed(1));drag={x:e.clientX,y:e.clientY};queue()};const end=()=>{drag=null;s.classList.remove("dragging")};s.onpointerup=end;s.onpointercancel=end;s.onwheel=e=>{if(currentSide!=="front"||!photo)return;e.preventDefault();setLinked("zoom",clamp((+$("zoomNumber").value||100)+(e.deltaY<0?3:-3),100,500));queue()}}
function canvasBlob(c){return new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error("PNG 생성 실패")),"image/png"))}
function downloadBlob(b,n){const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500)}

function openDb(){return new Promise((res,rej)=>{const q=indexedDB.open(DB_NAME,1);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains(DB_STORE))q.result.createObjectStore(DB_STORE)};q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function loadHandle(){try{const db=await openDb(),h=await new Promise((res,rej)=>{const tx=db.transaction(DB_STORE),q=tx.objectStore(DB_STORE).get(DB_KEY);q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error)});db.close();return h}catch{return null}}
async function storeHandle(h){const db=await openDb();await new Promise((res,rej)=>{const tx=db.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(h,DB_KEY);tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});db.close()}
async function perm(h,ask=true){if(!h)return false;const o={mode:"readwrite"};if(await h.queryPermission?.(o)==="granted")return true;return ask&&(await h.requestPermission?.(o)==="granted")}
function pathText(){$("savePathStatus").textContent=saveDir?"저장 위치: "+saveDir.name:"저장 위치: 브라우저 기본 다운로드 폴더"}
async function pickFolder(){if(!window.showDirectoryPicker)return status("이 브라우저는 저장 경로 지정을 지원하지 않습니다.",true);try{const h=await showDirectoryPicker({mode:"readwrite"});if(!await perm(h,true))return;saveDir=h;await storeHandle(h);pathText();status("저장 경로를 설정했습니다.",false,true)}catch(e){if(e.name!=="AbortError")status("저장 경로 설정 실패: "+e.message,true)}}
async function saveBlob(b,n){n=sanitize(n);if(saveDir&&await perm(saveDir,true)){try{const fh=await saveDir.getFileHandle(n,{create:true}),w=await fh.createWritable();await w.write(b);await w.close();return}catch{}}downloadBlob(b,n)}
async function saveCurrent(){if(currentSide==="front"&&!photo)return;const c=document.createElement("canvas"),base=sanitize($("filenameInput").value,defaultName());if(currentSide==="front")await renderFront(c);else await renderBack(c);await saveBlob(await canvasBlob(c),currentSide==="front"?base:backName(base));markDone();status((currentSide==="front"?"앞면":"뒷면")+" 저장 완료",false,true)}
async function savePair(){if(!photo)return;try{const z=new JSZip(),base=sanitize($("filenameInput").value,defaultName()),f=document.createElement("canvas"),b=document.createElement("canvas");await renderFront(f);await renderBack(b);z.file(base,await canvasBlob(f));z.file(backName(base),await canvasBlob(b));await saveBlob(await z.generateAsync({type:"blob",compression:"DEFLATE"}),base.replace(/\.png$/i,"_FRONT_BACK.zip"));markDone();status("앞·뒷면 ZIP 저장 완료",false,true)}catch(e){status("앞·뒷면 저장 실패: "+e.message,true)}}

function ensureXlsx(){if(!window.XLSX)throw new Error("Excel 라이브러리가 로드되지 않았습니다.")}
function sampleExcel(){try{ensureXlsx();const ws=XLSX.utils.aoa_to_sheet([COLUMNS,["리본","IVE","샴페인 골드","아이보리 골드","WONYOUNG","wonyoung.jpg","WONYOUNG_RIBBON.png"]]),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"입력");XLSX.writeFile(wb,"포카_일괄생성_샘플.xlsx")}catch(e){batchStatus(e.message,true)}}
async function parseExcel(file){ensureXlsx();const wb=XLSX.read(await file.arrayBuffer(),{type:"array",raw:false}),ws=wb.Sheets[wb.SheetNames.includes("입력")?"입력":wb.SheetNames[0]],grid=XLSX.utils.sheet_to_json(ws,{header:1,defval:"",raw:false});let hr=-1,idx=[];for(let i=0;i<Math.min(20,grid.length);i++){const row=grid[i].map(x=>String(x).trim());if(COLUMNS.every(c=>row.includes(c))){hr=i;idx=COLUMNS.map(c=>row.indexOf(c));break}}if(hr<0)throw new Error("필요한 열을 찾지 못했습니다.");const out=[];for(let r=hr+1;r<grid.length;r++){const row={};COLUMNS.forEach((c,i)=>row[c]=String(grid[r]?.[idx[i]]??"").trim());if(COLUMNS.some(c=>row[c]))out.push({excelRow:r+1,row})}return out}
function norm(s){return String(s||"").replaceAll("\\","/").replace(/^\.\//,"").toLowerCase()}
function findBatchImage(name){const n=norm(name),base=n.split("/").pop();let a=batchFiles.filter(f=>norm(f.webkitRelativePath||f.name).endsWith(n));if(a.length===1)return a[0];a=batchFiles.filter(f=>f.name.toLowerCase()===base);return a.length===1?a[0]:null}
async function prepareBatch(){const ex=$("excelInput").files?.[0];batchFiles=[...($("imageFolderInput").files||[])];batchRows=[];$("batchBtn").disabled=true;if(!ex||!batchFiles.length)return batchStatus("Excel과 이미지 폴더를 모두 선택하세요.");try{batchRows=(await parseExcel(ex)).map(x=>({...x,state:"ready",message:""}));renderBatch();$("batchBtn").disabled=!batchRows.length;batchStatus(batchRows.length+"개 행을 읽었습니다.",false,true)}catch(e){batchStatus("Excel 읽기 실패: "+e.message,true)}}
function renderBatch(){const body=batchRows.map(x=>`<tr class="${x.state}"><td>${x.excelRow}</td><td>${esc(x.row["그룹"])}</td><td>${esc(x.row["이름"])}</td><td>${esc(x.row["이미지명"])}</td><td>${esc(x.row["저장파일명"])}</td><td>${esc(x.message||x.state)}</td></tr>`).join("");$("batchTableWrap").innerHTML=`<table class="batch-table"><thead><tr><th>행</th><th>그룹</th><th>이름</th><th>이미지</th><th>저장파일명</th><th>상태</th></tr></thead><tbody>${body}</tbody></table>`}
async function runBatch(){if(!batchRows.length)return;$("batchBtn").disabled=true;try{const zip=new JSZip();let ok=0,fail=0;for(const [i,item] of batchRows.entries()){const r=item.row;try{batchStatus(`${i+1}/${batchRows.length} 생성 중 · ${r["이름"]}`);const file=findBatchImage(r["이미지명"]);if(!file)throw new Error("이미지 없음");const bmp=await createImageBitmap(file,{imageOrientation:"from-image"}),baseCtrl=ctrl(),c={...baseCtrl,name:r["이름"]||baseCtrl.name,group:(r["그룹"] in GROUPS)?r["그룹"]:baseCtrl.group,element:colorValue(r["요소 컬러"],baseCtrl.element),text:colorValue(r["텍스트 컬러"],baseCtrl.text)},f=document.createElement("canvas"),b=document.createElement("canvas");await renderFront(f,bmp,c);await renderBack(b,c);bmp.close?.();const base=sanitize(r["저장파일명"],(r["이름"]||"card")+"_RIBBON_V1_650x1004.png");zip.file(base,await canvasBlob(f));zip.file(backName(base),await canvasBlob(b));item.state="done";item.message="앞·뒷면 완료";ok++}catch(e){item.state="error";item.message=e.message;fail++}renderBatch()}if(!ok)throw new Error("성공한 카드가 없습니다.");downloadBlob(await zip.generateAsync({type:"blob",compression:"DEFLATE"}),`포토카드_앞뒷면_${new Date().toISOString().slice(0,10)}.zip`);batchStatus(`완료: ${ok}개 성공${fail?` · ${fail}개 실패`:""}`,!!fail,!fail)}catch(e){batchStatus("일괄 생성 실패: "+e.message,true)}finally{$("batchBtn").disabled=false}}

function filtered(){return excelRows.filter(x=>COLUMNS.every(c=>!filters[c]||String(x.row[c]??"")===filters[c]))}
function optionsFor(c){return [...new Set(excelRows.map(x=>String(x.row[c]??"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ko-KR",{numeric:true}))}
function renderExcelHead(){const h=$("excelDataHead");h.innerHTML=`<tr class="excel-sort-row">${COLUMNS.map(c=>`<th data-col="${esc(c)}">${esc(c)}${c===sortCol?(sortDesc?" ▼":" ▲"):""}</th>`).join("")}</tr><tr class="excel-filter-row">${COLUMNS.map(c=>`<th><select data-filter="${esc(c)}"><option value="">전체</option>${optionsFor(c).map(v=>`<option value="${esc(v)}" ${v===filters[c]?"selected":""}>${esc(v)}</option>`).join("")}</select></th>`).join("")}</tr>`;h.querySelectorAll("[data-col]").forEach(th=>th.onclick=()=>sortExcel(th.dataset.col));h.querySelectorAll("[data-filter]").forEach(s=>s.onchange=e=>{filters[e.target.dataset.filter]=e.target.value;renderExcelBody();excelStatus()})}
function renderExcelBody(){const b=$("excelDataBody"),rows=filtered();b.innerHTML=rows.length?rows.map(x=>`<tr data-id="${x.id}" class="${x.done?"done":""} ${x.id===selectedId?"selected":""}">${COLUMNS.map(c=>`<td>${esc(x.row[c])}</td>`).join("")}</tr>`).join(""):'<tr><td colspan="7">불러온 엑셀 데이터가 없습니다.</td></tr>';b.querySelectorAll("tr[data-id]").forEach(tr=>{tr.onclick=()=>selectExcel(tr.dataset.id);tr.ondblclick=()=>toggleDone(tr.dataset.id)})}
function excelStatus(msg){$("excelDataStatus").textContent=msg||`표시 ${filtered().length}/${excelRows.length}행 · 완료 ${excelRows.filter(x=>x.done).length}행`}
function sortExcel(c){if(sortCol===c)sortDesc=!sortDesc;else{sortCol=c;sortDesc=true}excelRows.sort((a,b)=>{const n=String(a.row[c]??"").localeCompare(String(b.row[c]??""),"ko-KR",{numeric:true});return sortDesc?-n:n});renderExcelHead();renderExcelBody();excelStatus()}
function selectExcel(id){const x=excelRows.find(v=>v.id===id);if(!x)return;selectedId=id;const r=x.row;$("nameInput").value=r["이름"]||$("nameInput").value;if(r["그룹"] in GROUPS)$("groupSelect").value=r["그룹"];applyColor("element",r["요소 컬러"]);applyColor("text",r["텍스트 컬러"]);filenameEdited=!!r["저장파일명"];$("filenameInput").value=r["저장파일명"]?sanitize(r["저장파일명"]):defaultName();renderExcelBody();queue();excelStatus("설정 적용: "+(r["이름"]||"선택 행"))}
function toggleDone(id){const x=excelRows.find(v=>v.id===id);if(x){x.done=!x.done;renderExcelBody();excelStatus()}}
function markDone(){const x=excelRows.find(v=>v.id===selectedId);if(x){x.done=true;renderExcelBody();excelStatus()}}
async function loadExcelPanel(file){if(!file)return;try{excelRows=(await parseExcel(file)).map((x,i)=>({id:"x"+x.excelRow+"_"+i,...x,done:false}));selectedId=null;sortCol=null;sortDesc=false;filters=Object.fromEntries(COLUMNS.map(c=>[c,""]));renderExcelHead();renderExcelBody();$("excelDataHint").textContent=`${file.name} · ${excelRows.length}행 불러옴 · 클릭=설정 적용 / 더블클릭=완료 토글`;excelStatus()}catch(e){excelStatus("엑셀 데이터 불러오기 실패: "+e.message)}}
function saveProgress(){saveJson(PROGRESS_KEY,{rows:excelRows,selectedId,sortCol,sortDesc,filters,hint:$("excelDataHint").textContent});excelStatus("진행 상태를 저장했습니다.")}
function restoreProgress(){const p=loadJson(PROGRESS_KEY,null);if(!p?.rows?.length)return;excelRows=p.rows;selectedId=p.selectedId||null;sortCol=p.sortCol||null;sortDesc=!!p.sortDesc;filters={...Object.fromEntries(COLUMNS.map(c=>[c,""])),...(p.filters||{})};$("excelDataHint").textContent=p.hint||"저장된 작업 상태 복원";renderExcelHead();renderExcelBody();excelStatus("이전 작업 상태를 복원했습니다.")}

function bind(){bindRange("focusX",0,100);bindRange("focusY",0,100);bindRange("zoom",100,500);bindGestures();$("photoInput").onchange=e=>choosePhoto(e.target.files?.[0]);$("nameInput").oninput=()=>{maybeName();queue()};$("groupSelect").onchange=queue;$("backStyleSelect").onchange=queue;$("fontSelect").onchange=queue;$("logoOutlineCheck").onchange=queue;$("logoShadowCheck").onchange=queue;$("elementColorSelect").onchange=()=>{syncPicker("element");queue()};$("textColorSelect").onchange=()=>{syncPicker("text");queue()};$("elementColorPicker").oninput=()=>pickerToSelect("element");$("textColorPicker").oninput=()=>pickerToSelect("text");["trackingInput","fontSizeInput","textXInput","shadowCheck","strokeColorPicker","strokeWidthInput"].forEach(id=>$(id).oninput=queue);$("resetCropBtn").onclick=()=>{setLinked("focusX",50);setLinked("focusY",50);setLinked("zoom",100);queue()};$("resetTextBtn").onclick=()=>{Object.assign($("trackingInput"),{value:4});$("fontSizeInput").value=31;$("textXInput").value=325;$("shadowCheck").checked=true;$("strokeColorPicker").value="#FFFFFF";$("strokeWidthInput").value=1;queue()};$("centerGuideCheck").oninput=updateGuide;$("frontTabBtn").onclick=()=>switchSide("front");$("backTabBtn").onclick=()=>switchSide("back");$("filenameInput").oninput=()=>filenameEdited=true;$("generateBtn").onclick=saveCurrent;$("savePairBtn").onclick=savePair;$("savePathBtn").onclick=pickFolder;$("saveDefaultsBtn").onclick=()=>{saveJson(STORAGE_KEY,ctrl());status("현재 설정을 기본값으로 저장했습니다.",false,true)};$("resetDefaultsBtn").onclick=()=>{localStorage.removeItem(STORAGE_KEY);applyCtrl({name:"WONYOUNG",group:"IVE",backStyle:"center",font:"Playfair Display",logoOutline:true,logoShadow:true,element:"#E7C68E",text:"#F5E5C2",fx:50,fy:50,zoom:100,tracking:4,fontSize:31,textX:325,shadow:true,stroke:"#FFFFFF",strokeWidth:1})};$("sampleExcelBtn").onclick=sampleExcel;$("excelInput").onchange=prepareBatch;$("imageFolderInput").onchange=prepareBatch;$("batchBtn").onclick=runBatch;$("excelDataLoadBtn").onclick=()=>$("excelDataInput").click();$("excelDataInput").onchange=e=>loadExcelPanel(e.target.files?.[0]);$("excelProgressSaveBtn").onclick=saveProgress;$("openColorManagerBtn").onclick=openColorManager;$("addCustomColorBtn").onclick=saveCustomColor;$("customColorPicker").oninput=e=>$("customColorHex").value=e.target.value.toUpperCase();$("customColorHex").oninput=e=>{const v=normalizeHex(e.target.value);if(v)$("customColorPicker").value=v}}
async function init(){$("fontSelect").value="Playfair Display";$("logoOutlineCheck").checked=true;$("logoShadowCheck").checked=true;initColors();initGroups();bind();renderExcelHead();renderExcelBody();restoreProgress();const saved=loadJson(STORAGE_KEY,null);if(saved)applyCtrl(saved);else maybeName(true);saveDir=await loadHandle();pathText();switchSide("front");status("준비 완료. 사진을 선택하세요.",false,true);loadAsset(GROUPS.IVE.logo).catch(()=>{})}
init();