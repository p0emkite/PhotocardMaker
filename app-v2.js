import {FONT_REGISTRY,FONT_MAP,TEMPLATE_REGISTRY,getTemplate,getTemplateList,renderTemplateFront,renderTemplateBack} from "./templates.js?v=10";
const $=id=>document.getElementById(id);
const W=650,H=1004,R=38;
const STORAGE_KEY="photocard-maker-v2-defaults";
const TEMPLATE_DEFAULTS_KEY="photocard-maker-template-defaults-v1";
const TEMPLATE_FAVORITES_KEY="photocard-maker-template-favorites-v1";
const TEMPLATE_RECENTS_KEY="photocard-maker-template-recents-v1";
const TEMPLATE_PRESETS_KEY="photocard-maker-template-presets-v1";
const WORKSPACE_SPLIT_KEY="photocard-maker-workspace-split-v1";
const COLOR_KEY="photocard-maker-v2-custom-colors";
const PROGRESS_KEY="photocard-maker-v2-excel-progress";
const DB_NAME="photocard-maker-storage",DB_STORE="handles",DB_KEY="folder";
const COLUMNS=["템플릿","그룹","요소 컬러","텍스트 컬러","배경 컬러","이름","이미지명","저장파일명"];
const BASE_COLORS={"샴페인 골드":"#E7C68E","아이보리 골드":"#F5E5C2","벚꽃 핑크":"#F3B6C4","라일락":"#CDB8E8","로즈골드":"#D8A0A6","진주빛 아이보리":"#F4EFE3","크림 아이보리":"#F6EBD8","파우더 블루":"#B9D2E7","민트":"#B8DCCF","복숭아빛":"#F3BEA8","연핑크":"#F4BBC8","골드":"#D9B76E","실버":"#D7D9DE","화이트":"#FFFFFF","블랙":"#111111"};
const GROUPS={"":{label:"로고 없음",logo:null},"IVE":{label:"IVE",logo:"./assets/logos/ive.png"}};
const FONTS={...FONT_MAP};
const logoMaskCache=new Map();
const logoMetricsCache=new Map();
let customColors=loadJson(COLOR_KEY,{});
let photo=null,photoFile=null,originalPhotoFile=null,workingPhotoBlob=null,signatureImage=null,signatureFile=null,currentSide="front",drag=null,saveDir=null,raf=0,filenameEdited=false;
let cutoutModule=null;
const CUTOUT_CONFIG={model:"isnet",output:{format:"image/png",quality:1}};
function webGpuAvailable(){return typeof navigator!=="undefined"&&!!navigator.gpu}
let batchRows=[],batchFiles=[],excelRows=[],selectedId=null,sortCol=null,sortDesc=false,filters=Object.fromEntries(COLUMNS.map(c=>[c,""]));
let editColorName=null;
let templateBrowserFilter="all",templateThumbToken=0,templateThumbPlaceholder=null;
const templateThumbCache=new Map();
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
function defaultName(){const tid=($("templateSelect")?.value||"ribbon").toUpperCase();return sanitize((($("nameInput").value||"card").trim()||"card")+"_"+tid+"_650x1004.png")}
function maybeName(force=false){if(force||!filenameEdited)$("filenameInput").value=defaultName()}
function status(msg,err=false,ok=false){const e=$("status");e.textContent=msg;e.className="status"+(err?" error":ok?" ok":"")}
function batchStatus(msg,err=false,ok=false){const e=$("batchStatus");e.textContent=msg;e.className="status compact-status"+(err?" error":ok?" ok":"")}

function colorOptions(id,preferred){const s=$(id),old=preferred??s.value;const base=Object.keys(BASE_COLORS).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join("");const mine=Object.keys(customColors).map(k=>`<option value="${esc(k)}">★ ${esc(k)}</option>`).join("");s.innerHTML=`<optgroup label="기본 색상">${base}</optgroup>`+(mine?`<optgroup label="내 색상">${mine}</optgroup>`:"");const vals=[...s.options].map(o=>o.value);s.value=vals.includes(old)?old:(id==="elementColorSelect"?"샴페인 골드":"아이보리 골드")}
function syncPicker(kind){const isElement=kind==="element",s=$(isElement?"elementColorSelect":"textColorSelect"),p=$(isElement?"elementColorPicker":"textColorPicker");p.value=colorValue(s.value,isElement?"#E7C68E":"#F5E5C2")}
function pickerToSelect(kind){const isElement=kind==="element",s=$(isElement?"elementColorSelect":"textColorSelect"),p=$(isElement?"elementColorPicker":"textColorPicker"),v=p.value.toUpperCase();const found=Object.entries(allColors()).find(([,x])=>x.toUpperCase()===v)?.[0];if(found)s.value=found;else{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o);s.value=v}queue()}
function backgroundColorOptions(preferred="auto"){const s=$("backgroundColorSelect");if(!s)return;const old=preferred??s.value??"auto",base=Object.keys(BASE_COLORS).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join(""),mine=Object.keys(customColors).map(k=>`<option value="${esc(k)}">★ ${esc(k)}</option>`).join("");s.innerHTML=`<option value="auto">템플릿 기본값</option><optgroup label="기본 색상">${base}</optgroup>`+(mine?`<optgroup label="내 색상">${mine}</optgroup>`:"");const vals=[...s.options].map(o=>o.value);s.value=vals.includes(old)?old:"auto"}
function backgroundColorValue(v,fallback="auto"){const s=String(v??"").trim();if(!s||s==="auto"||s==="템플릿 기본값")return fallback;return colorValue(s,"#FFFFFF")}
function syncBackgroundPicker(){const s=$("backgroundColorSelect"),p=$("backgroundColorPicker");if(!s||!p)return;p.value=s.value==="auto"?"#FFFFFF":colorValue(s.value,"#FFFFFF")}
function backgroundPickerToSelect(){const s=$("backgroundColorSelect"),p=$("backgroundColorPicker"),v=p.value.toUpperCase(),found=Object.entries(allColors()).find(([,x])=>x.toUpperCase()===v)?.[0];if(found)s.value=found;else{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o);s.value=v}queue()}
function applyBackgroundColor(v){const s=$("backgroundColorSelect"),p=$("backgroundColorPicker");if(!s||!p)return;if(!v||v==="auto"||v==="템플릿 기본값"){s.value="auto";p.value="#FFFFFF";return}const x=colorValue(v,"#FFFFFF"),n=Object.entries(allColors()).find(([,q])=>q.toUpperCase()===x.toUpperCase())?.[0];if(n)s.value=n;else{let o=[...s.options].find(z=>z.value===x);if(!o){o=document.createElement("option");o.value=x;o.textContent=x;s.appendChild(o)}s.value=x}p.value=x}
function trumpBaseColor(){return ["diamond","heart"].includes($("trumpSuitSelect")?.value)?"#E6002D":"#111111"}
function trumpColorOptions(id,preferred){const s=$(id);if(!s)return;const old=preferred??s.value??"auto",base=Object.keys(BASE_COLORS).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join(""),mine=Object.keys(customColors).map(k=>`<option value="${esc(k)}">★ ${esc(k)}</option>`).join("");s.innerHTML=`<option value="auto">기본값 (문양 따라)</option><optgroup label="기본 색상">${base}</optgroup>`+(mine?`<optgroup label="내 색상">${mine}</optgroup>`:"");const vals=[...s.options].map(o=>o.value);s.value=vals.includes(old)?old:"auto"}
function trumpColorValue(v){return !v||v==="auto"?"auto":colorValue(v,trumpBaseColor())}
function syncTrumpPicker(kind){const s=$(kind==="suit"?"trumpSuitColorSelect":"trumpRankColorSelect"),p=$(kind==="suit"?"trumpSuitColorPicker":"trumpRankColorPicker");if(!s||!p)return;p.value=s.value==="auto"?trumpBaseColor():colorValue(s.value,trumpBaseColor())}
function trumpPickerToSelect(kind){const s=$(kind==="suit"?"trumpSuitColorSelect":"trumpRankColorSelect"),p=$(kind==="suit"?"trumpSuitColorPicker":"trumpRankColorPicker"),v=p.value.toUpperCase(),found=Object.entries(allColors()).find(([,x])=>x.toUpperCase()===v)?.[0];if(found)s.value=found;else{const o=document.createElement("option");o.value=v;o.textContent=v;s.appendChild(o);s.value=v}queue()}
function applyTrumpColor(kind,v){const s=$(kind==="suit"?"trumpSuitColorSelect":"trumpRankColorSelect"),p=$(kind==="suit"?"trumpSuitColorPicker":"trumpRankColorPicker");if(!s||!p)return;if(!v||v==="auto"){s.value="auto";p.value=trumpBaseColor();return}const x=colorValue(v,trumpBaseColor()),n=Object.entries(allColors()).find(([,q])=>q.toUpperCase()===x.toUpperCase())?.[0];if(n)s.value=n;else{let o=[...s.options].find(z=>z.value===x);if(!o){o=document.createElement("option");o.value=x;o.textContent=x;s.appendChild(o)}s.value=x}p.value=x}
function renderCustomColors(){const root=$("customColorList"),rows=Object.entries(customColors);root.innerHTML=rows.length?rows.map(([n,v])=>`<div class="custom-color-item"><span class="color-swatch" style="background:${esc(v)}"></span><b>${esc(n)}</b><code>${esc(v)}</code><span><button type="button" class="ghost edit-color" data-n="${esc(n)}">수정</button> <button type="button" class="ghost del-color" data-n="${esc(n)}">삭제</button></span></div>`).join(""):'<div class="empty-custom-colors">저장한 사용자 색상이 없습니다.</div>';root.querySelectorAll(".edit-color").forEach(b=>b.onclick=()=>editColor(b.dataset.n));root.querySelectorAll(".del-color").forEach(b=>b.onclick=()=>deleteColor(b.dataset.n))}
function openColorManager(){editColorName=null;$("customColorName").value="";$("customColorHex").value=$("elementColorPicker").value.toUpperCase();$("customColorPicker").value=$("elementColorPicker").value;$("addCustomColorBtn").textContent="색상 저장";renderCustomColors();$("colorManagerDialog").showModal()}
function normalizeHex(s){s=String(s||"").trim().toUpperCase();if(!s.startsWith("#"))s="#"+s;return isHex(s)?s:null}
function saveCustomColor(){const n=$("customColorName").value.trim(),v=normalizeHex($("customColorHex").value)||$("customColorPicker").value.toUpperCase();if(!n)return $("customColorName").focus();if(editColorName&&editColorName!==n)delete customColors[editColorName];customColors[n]=v;saveJson(COLOR_KEY,customColors);editColorName=null;const suitOld=$("trumpSuitColorSelect")?.value||"auto",rankOld=$("trumpRankColorSelect")?.value||"auto",bgOld=$("backgroundColorSelect")?.value||"auto";colorOptions("elementColorSelect",n);colorOptions("textColorSelect");backgroundColorOptions(bgOld);trumpColorOptions("trumpSuitColorSelect",suitOld);trumpColorOptions("trumpRankColorSelect",rankOld);syncPicker("element");syncPicker("text");syncBackgroundPicker();syncTrumpPicker("suit");syncTrumpPicker("rank");$("customColorName").value="";$("addCustomColorBtn").textContent="색상 저장";renderCustomColors();queue()}
function editColor(n){if(!customColors[n])return;editColorName=n;$("customColorName").value=n;$("customColorHex").value=customColors[n];$("customColorPicker").value=customColors[n];$("addCustomColorBtn").textContent="수정 저장";$("customColorName").focus()}
function deleteColor(n){const suitOld=$("trumpSuitColorSelect")?.value||"auto",rankOld=$("trumpRankColorSelect")?.value||"auto",bgOld=$("backgroundColorSelect")?.value||"auto";delete customColors[n];saveJson(COLOR_KEY,customColors);colorOptions("elementColorSelect");colorOptions("textColorSelect");backgroundColorOptions(bgOld);trumpColorOptions("trumpSuitColorSelect",suitOld);trumpColorOptions("trumpRankColorSelect",rankOld);syncPicker("element");syncPicker("text");syncBackgroundPicker();syncTrumpPicker("suit");syncTrumpPicker("rank");renderCustomColors();queue()}
function initColors(){colorOptions("elementColorSelect","샴페인 골드");colorOptions("textColorSelect","아이보리 골드");backgroundColorOptions("auto");trumpColorOptions("trumpSuitColorSelect","auto");trumpColorOptions("trumpRankColorSelect","auto");syncPicker("element");syncPicker("text");syncBackgroundPicker();syncTrumpPicker("suit");syncTrumpPicker("rank");renderCustomColors()}

function initGroups(){const s=$("groupSelect");s.innerHTML=Object.entries(GROUPS).map(([id,g])=>`<option value="${esc(id)}">${esc(g.label)}</option>`).join("");s.value="IVE"}
function groupIdFromValue(v,fallback="IVE"){const q=String(v??"").trim();if(q in GROUPS)return q;const hit=Object.entries(GROUPS).find(([,g])=>String(g.label).trim()===q);return hit?hit[0]:fallback}
function initTemplates(){const s=$("templateSelect");s.innerHTML=getTemplateList().map(t=>`<option value="${esc(t.id)}">${esc(t.label)}</option>`).join("");if(!TEMPLATE_REGISTRY[s.value])s.value="ribbon"}
const TEMPLATE_BROWSER_FILTERS=[
  ["all","전체"],["favorite","★ 즐겨찾기"],["recent","최근 사용"],
  ["classic","클래식·포토"],["cute","큐트·감성"],["dark","다크·테크"],["sport","스포츠"],["seasonal","시즌"],["special","스페셜"]
];
function templateBrowserGroup(category){
  if(["classic","photo","editorial","luxury","minimal","modern"].includes(category))return"classic";
  if(["cute","soft","romantic","paper"].includes(category))return"cute";
  if(["dark","tech","game","glow"].includes(category))return"dark";
  if(category==="sport")return"sport";
  if(category==="seasonal")return"seasonal";
  return"special"
}
function templateFavorites(){return new Set(loadJson(TEMPLATE_FAVORITES_KEY,[]))}
function templateRecents(){return loadJson(TEMPLATE_RECENTS_KEY,[]).filter(id=>TEMPLATE_REGISTRY[id])}
function recordTemplateRecent(id){
  if(!TEMPLATE_REGISTRY[id])return;
  const list=[id,...templateRecents().filter(x=>x!==id)].slice(0,8);
  saveJson(TEMPLATE_RECENTS_KEY,list)
}
function toggleTemplateFavorite(id){
  const set=templateFavorites();set.has(id)?set.delete(id):set.add(id);saveJson(TEMPLATE_FAVORITES_KEY,[...set]);renderTemplateBrowser()
}
function templateThumbPhoto(){
  if(templateThumbPlaceholder)return templateThumbPlaceholder;
  const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#9CB8D5");g.addColorStop(.52,"#F0C8C1");g.addColorStop(1,"#D8C5EA");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle="rgba(255,255,255,.35)";for(let y=50;y<H;y+=94)for(let xx=52;xx<W;xx+=104){x.beginPath();x.arc(xx+(y%188?22:0),y,20,0,Math.PI*2);x.fill()}
  x.fillStyle="#F0D1C4";x.beginPath();x.arc(W/2,330,128,0,Math.PI*2);x.fill();
  x.fillStyle="#433A46";x.beginPath();x.arc(W/2,286,132,Math.PI,Math.PI*2);x.lineTo(W/2+126,356);x.quadraticCurveTo(W/2,246,W/2-126,356);x.closePath();x.fill();
  x.fillStyle="#5C5D7B";x.beginPath();x.moveTo(125,H);x.quadraticCurveTo(150,560,W/2,535);x.quadraticCurveTo(W-150,560,W-125,H);x.closePath();x.fill();
  templateThumbPlaceholder=c;return c
}
function renderTemplateBrowserFilters(){
  const root=$("templateFilterChips");if(!root)return;
  root.innerHTML=TEMPLATE_BROWSER_FILTERS.map(([id,label])=>`<button type="button" class="template-filter-chip${templateBrowserFilter===id?" active":""}" data-filter="${id}">${label}</button>`).join("");
  root.querySelectorAll(".template-filter-chip").forEach(b=>b.onclick=()=>{templateBrowserFilter=b.dataset.filter;renderTemplateBrowserFilters();renderTemplateBrowser()})
}
function templateBrowserItems(){
  const q=($("templateSearchInput")?.value||"").trim().toLowerCase(),fav=templateFavorites(),recent=templateRecents();
  let items=getTemplateList();
  if(templateBrowserFilter==="favorite")items=items.filter(t=>fav.has(t.id));
  else if(templateBrowserFilter==="recent")items=recent.map(id=>TEMPLATE_REGISTRY[id]).filter(Boolean);
  else if(templateBrowserFilter!=="all")items=items.filter(t=>templateBrowserGroup(t.category)===templateBrowserFilter);
  if(q)items=items.filter(t=>`${t.label} ${t.id} ${t.category}`.toLowerCase().includes(q));
  return items
}
function syncTemplateBrowserSelected(){
  const root=$("templateBrowserGrid");if(!root)return;const id=$("templateSelect")?.value;
  root.querySelectorAll(".template-browser-card").forEach(c=>c.classList.toggle("selected",c.dataset.id===id))
}
async function renderTemplateThumb(id,img,el,token){
  const t=getTemplate(id),base=ctrl(),d=templateDefaultState(id),source=photo||templateThumbPhoto();
  const sourceKey=photoFile?.name||"sample",key=[id,base.group,sourceKey,base.element,base.text,base.background].join("|");
  if(templateThumbCache.has(key)){if(token!==templateThumbToken)return;const im=document.createElement("img");im.className="template-thumb";im.alt=t.label;im.src=templateThumbCache.get(key);el.replaceChildren(im);return}
  const full=document.createElement("canvas"),c={...base,...d,template:id,name:base.name||"SAMPLE",fx:50,fy:50,zoom:100};
  try{await renderFront(full,source,c);if(token!==templateThumbToken)return;const small=document.createElement("canvas");small.width=195;small.height=301;small.getContext("2d").drawImage(full,0,0,195,301);const url=small.toDataURL("image/jpeg",.82);templateThumbCache.set(key,url);const im=document.createElement("img");im.className="template-thumb";im.alt=t.label;im.src=url;el.replaceChildren(im)}
  catch(e){if(token!==templateThumbToken)return;el.innerHTML=`<div class="template-thumb-placeholder">미리보기 오류<br>${esc(e.message)}</div>`}
}
async function renderTemplateBrowserThumbs(items){
  const token=++templateThumbToken;
  for(let i=0;i<items.length;i++){
    if(token!==templateThumbToken)return;
    const el=document.querySelector(`.template-thumb-wrap[data-thumb="${CSS.escape(items[i].id)}"]`);
    if(el)await renderTemplateThumb(items[i].id,null,el,token);
    if(i%3===2)await new Promise(requestAnimationFrame)
  }
}
function renderTemplateBrowser(){
  const root=$("templateBrowserGrid");if(!root)return;
  const items=templateBrowserItems(),fav=templateFavorites(),selected=$("templateSelect").value;
  $("templateBrowserCount").textContent=`${items.length}개 표시`;
  if(!items.length){root.innerHTML='<div class="template-browser-empty">조건에 맞는 템플릿이 없습니다.</div>';return}
  root.innerHTML=items.map(t=>`<div class="template-browser-card${selected===t.id?" selected":""}" role="button" tabindex="0" data-id="${esc(t.id)}">
    <button type="button" class="template-favorite-btn${fav.has(t.id)?" active":""}" data-favorite="${esc(t.id)}" title="즐겨찾기">${fav.has(t.id)?"★":"☆"}</button>
    <div class="template-thumb-wrap" data-thumb="${esc(t.id)}"><div class="template-thumb-placeholder">미리보기 생성 중…</div></div>
    <div class="template-card-info"><div class="template-card-title">${esc(t.label)}</div><div class="template-card-category"><span>${esc(TEMPLATE_BROWSER_FILTERS.find(x=>x[0]===templateBrowserGroup(t.category))?.[1]||t.category)}</span>${templatePresetCount(t.id)?`<span class="template-preset-count">프리셋 ${templatePresetCount(t.id)}</span>`:""}</div></div>
  </div>`).join("");
  root.querySelectorAll(".template-favorite-btn").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleTemplateFavorite(b.dataset.favorite)});
  const choose=card=>{const id=card.dataset.id;recordTemplateRecent(id);applyTemplateDefaults(id,true);$("templateBrowserDialog").close()};
  root.querySelectorAll(".template-browser-card").forEach(card=>{card.onclick=()=>choose(card);card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(card)}}});
  renderTemplateBrowserThumbs(items)
}
function openTemplateBrowser(){
  renderTemplateBrowserFilters();renderTemplateBrowser();$("templateBrowserDialog").showModal();setTimeout(()=>$("templateSearchInput").focus(),0)
}
function initFonts(){const s=$("fontSelect"),groups={serif:"Serif",sans:"Sans Serif",script:"Script",display:"Display"};s.innerHTML=Object.entries(groups).map(([cat,label])=>{const opts=FONT_REGISTRY.filter(f=>f.category===cat).map(f=>`<option value="${esc(f.name)}">${esc(f.name)}</option>`).join("");return opts?`<optgroup label="${label}">${opts}</optgroup>`:""}).join("");s.value="Playfair Display"}
function templateIdFromValue(v){const q=String(v||"").trim().toLowerCase();if(TEMPLATE_REGISTRY[q])return q;const aliases={"리본":"ribbon","ribbon classic":"ribbon","y2k":"y2k","y2k sticker":"y2k","film":"film","film frame":"film","polaroid":"polaroid","폴라로이드":"polaroid","magazine cover":"magazine","매거진":"magazine","luxury":"luxury","luxury gold":"luxury","princess":"princess","princess frame":"princess","gothic":"gothic","dark romance":"gothic","angel":"angel","heaven":"angel","cyber":"cyber","hologram":"cyber","arcade":"arcade","pixel":"arcade","minimal line":"minimal","미니멀":"minimal","editorial grid":"editorial","editorial":"editorial","split color":"split","split":"split","gradient glow":"gradient_glow","글로우":"gradient_glow","neon sign":"neon","네온":"neon","scrapbook":"scrapbook","스크랩북":"scrapbook","diary":"diary","notebook":"diary","다이어리":"diary","love letter":"love_letter","러브레터":"love_letter","student id":"student_id","학생증":"student_id","concert ticket":"concert_ticket","콘서트 티켓":"concert_ticket","album tracklist":"album_tracklist","앨범 트랙리스트":"album_tracklist","starry night":"starry_night","별밤":"starry_night","butterfly":"butterfly","나비":"butterfly","cherry strawberry":"cherry_strawberry","cherry / strawberry":"cherry_strawberry","체리":"cherry_strawberry","cat puppy":"cat_puppy","cat / puppy":"cat_puppy","고양이 강아지":"cat_puppy","bubble pop":"bubble_pop","버블":"bubble_pop","glass acrylic":"glass_acrylic","glass / acrylic":"glass_acrylic","아크릴":"glass_acrylic","chrome":"chrome","크롬":"chrome","racing":"racing","레이싱":"racing","varsity college":"varsity","varsity / college":"varsity","바시티":"varsity","sailor marine":"sailor","sailor / marine":"sailor","마린":"sailor","christmas winter":"christmas","christmas / winter":"christmas","크리스마스":"christmas","halloween":"halloween","할로윈":"halloween","sakura":"sakura","벚꽃":"sakura","summer soda":"summer_soda","서머소다":"summer_soda","trump card":"trump","트럼프":"trump","트럼프 카드":"trump","dressing room mirror":"dressing_mirror","조명거울":"dressing_mirror","대기실 거울":"dressing_mirror","signature":"signature","사인":"signature"};if(aliases[q])return aliases[q];return getTemplateList().find(t=>t.label.toLowerCase()===q)?.id||"ribbon"}
function updateTemplateExtras(){const t=getTemplate($("templateSelect").value),extras=new Set(t.extras||[]);$("schoolNameField").hidden=!extras.has("schoolName");$("signatureImageField").hidden=!extras.has("signatureImage");$("trumpOptionsField").hidden=!extras.has("trumpOptions");const trump=t.id==="trump";$("cutoutBtn").hidden=!trump;$("restorePhotoBtn").hidden=!trump}
function templateUserDefaults(){return loadJson(TEMPLATE_DEFAULTS_KEY,{})}
function templateDefaultState(id){const t=getTemplate(id),saved=templateUserDefaults()[t.id]||{};return {...(t.defaults||{}),...saved}}
function applyTemplateDefaults(id,render=true){const t=getTemplate(id),d=templateDefaultState(t.id);$("templateSelect").value=t.id;if(d.font&&FONTS[d.font])$("fontSelect").value=d.font;if(d.fontSize!=null)$("fontSizeInput").value=d.fontSize;if(d.tracking!=null)$("trackingInput").value=d.tracking;if(d.textX!=null)$("textXInput").value=d.textX;if(d.textY!=null)$("textYInput").value=d.textY;if(d.backStyle)$("backStyleSelect").value=d.backStyle;applyBackgroundColor(d.background??"auto");if(d.schoolName!=null)$("schoolNameInput").value=d.schoolName;if(d.trumpSuit)$("trumpSuitSelect").value=d.trumpSuit;if(d.trumpRank!=null)$("trumpRankInput").value=d.trumpRank;applyTrumpColor("suit",d.trumpSuitColor??"auto");applyTrumpColor("rank",d.trumpRankColor??"auto");if(d.signatureScale!=null)setLinked("signatureScale",d.signatureScale);if(d.signatureX!=null)setLinked("signatureX",d.signatureX);if(d.signatureY!=null)setLinked("signatureY",d.signatureY);if(d.logoOutline!=null)$("logoOutlineCheck").checked=!!d.logoOutline;if(d.logoShadow!=null)$("logoShadowCheck").checked=!!d.logoShadow;setLinked("frontLogoScale",d.frontLogoScale??100);setLinked("frontLogoX",d.frontLogoX??325);setLinked("frontLogoY",d.frontLogoY??60);setLinked("backLogoScale",d.backLogoScale??100);setLinked("backLogoX",d.backLogoX??325);setLinked("backLogoY",d.backLogoY??502);updateTemplateExtras();maybeName();syncTemplateBrowserSelected();refreshPresetSelect();if(render)queue()}
function allTemplatePresets(){return loadJson(TEMPLATE_PRESETS_KEY,{})}
function templatePresetsFor(id){const all=allTemplatePresets(),set=all[id];return set&&typeof set==="object"&&!Array.isArray(set)?set:{}}
function templatePresetCount(id){return Object.keys(templatePresetsFor(id)).length}
function presetStatus(msg,type=""){const e=$("presetStatus");if(!e)return;e.textContent=msg;e.className="preset-status"+(type?" "+type:"")}
function currentStylePresetPayload(){
  const c=ctrl();
  return{
    group:c.group,
    element:c.element,text:c.text,background:c.background,
    font:c.font,fontSize:c.fontSize,tracking:c.tracking,textX:c.textX,textY:c.textY,
    shadow:c.shadow,stroke:c.stroke,strokeWidth:c.strokeWidth,
    backStyle:c.backStyle,
    frontLogoScale:c.frontLogoScale,frontLogoX:c.frontLogoX,frontLogoY:c.frontLogoY,
    backLogoScale:c.backLogoScale,backLogoX:c.backLogoX,backLogoY:c.backLogoY,
    logoOutline:c.logoOutline,logoShadow:c.logoShadow,
    schoolName:c.schoolName,
    trumpSuit:c.trumpSuit,trumpRank:c.trumpRank,trumpSuitColor:c.trumpSuitColor,trumpRankColor:c.trumpRankColor,
    signatureScale:c.signatureScale,signatureX:c.signatureX,signatureY:c.signatureY
  }
}
function presetNameMatch(presets,name,ignore=""){
  const q=String(name||"").trim().toLocaleLowerCase("ko-KR");
  return Object.keys(presets).find(n=>n!==ignore&&n.toLocaleLowerCase("ko-KR")===q)||null
}
function updatePresetActions(){
  const s=$("presetSelect"),name=s?.value||"",has=!!name;
  if($("overwritePresetBtn"))$("overwritePresetBtn").disabled=!has;
  if($("renamePresetBtn"))$("renamePresetBtn").disabled=!has;
  if($("deletePresetBtn"))$("deletePresetBtn").disabled=!has;
}
function refreshPresetSelect(preferred=""){
  const s=$("presetSelect");if(!s)return;
  const id=$("templateSelect")?.value||"ribbon",presets=templatePresetsFor(id),names=Object.keys(presets).sort((a,b)=>a.localeCompare(b,"ko-KR",{numeric:true})),old=preferred||s.value;
  s.innerHTML=names.length?'<option value="">프리셋 선택…</option>'+names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join(""):'<option value="">저장된 프리셋 없음</option>';
  if(old&&names.includes(old))s.value=old;
  updatePresetActions();
  if(!names.length)presetStatus("이 템플릿에 저장된 프리셋이 없습니다.");
  else if(s.value)presetStatus(`“${s.value}” 선택됨 · 총 ${names.length}개`);
  else presetStatus(`저장된 프리셋 ${names.length}개`);
}
function savePresetStore(id,presets){
  const all=allTemplatePresets();
  if(Object.keys(presets).length)all[id]=presets;else delete all[id];
  saveJson(TEMPLATE_PRESETS_KEY,all)
}
function saveNewPreset(){
  const id=$("templateSelect").value,presets=templatePresetsFor(id),name=$("presetNameInput").value.trim();
  if(!name){presetStatus("프리셋 이름을 입력하세요.","error");$("presetNameInput").focus();return}
  const dup=presetNameMatch(presets,name);if(dup){presetStatus(`이미 “${dup}” 프리셋이 있습니다. 덮어쓰기를 사용하세요.`,"error");return}
  presets[name]={...currentStylePresetPayload(),_savedAt:new Date().toISOString()};
  savePresetStore(id,presets);refreshPresetSelect(name);$("presetNameInput").value=name;templateThumbCache.clear();
  if($("templateBrowserDialog")?.open)renderTemplateBrowser();
  presetStatus(`“${name}” 프리셋을 저장했습니다.`,"ok")
}
function applySelectedPreset(){
  const id=$("templateSelect").value,name=$("presetSelect").value,preset=templatePresetsFor(id)[name];
  if(!name||!preset){presetStatus("적용할 프리셋을 선택하세요.","error");return}
  const current=ctrl(),keep={name:current.name,fx:current.fx,fy:current.fy,zoom:current.zoom};
  applyCtrl({...current,...preset,template:id,...keep});
  $("presetSelect").value=name;$("presetNameInput").value=name;updatePresetActions();templateThumbCache.clear();
  presetStatus(`“${name}” 프리셋을 적용했습니다.`,"ok")
}
function overwriteSelectedPreset(){
  const id=$("templateSelect").value,name=$("presetSelect").value,presets=templatePresetsFor(id);
  if(!name||!presets[name])return presetStatus("덮어쓸 프리셋을 선택하세요.","error");
  presets[name]={...currentStylePresetPayload(),_savedAt:new Date().toISOString()};
  savePresetStore(id,presets);templateThumbCache.clear();refreshPresetSelect(name);
  if($("templateBrowserDialog")?.open)renderTemplateBrowser();
  presetStatus(`“${name}”을 현재 설정으로 덮어썼습니다.`,"ok")
}
function renameSelectedPreset(){
  const id=$("templateSelect").value,oldName=$("presetSelect").value,presets=templatePresetsFor(id),newName=$("presetNameInput").value.trim();
  if(!oldName||!presets[oldName])return presetStatus("이름을 바꿀 프리셋을 선택하세요.","error");
  if(!newName){presetStatus("새 프리셋 이름을 입력하세요.","error");$("presetNameInput").focus();return}
  if(newName===oldName)return presetStatus("현재 이름과 같습니다.");
  const dup=presetNameMatch(presets,newName,oldName);if(dup)return presetStatus(`이미 “${dup}” 프리셋이 있습니다.`,"error");
  presets[newName]=presets[oldName];delete presets[oldName];presets[newName]._savedAt=new Date().toISOString();
  savePresetStore(id,presets);refreshPresetSelect(newName);
  if($("templateBrowserDialog")?.open)renderTemplateBrowser();
  presetStatus(`프리셋 이름을 “${newName}”으로 변경했습니다.`,"ok")
}
function deleteSelectedPreset(){
  const id=$("templateSelect").value,name=$("presetSelect").value,presets=templatePresetsFor(id);
  if(!name||!presets[name])return presetStatus("삭제할 프리셋을 선택하세요.","error");
  if(!confirm(`“${name}” 프리셋을 삭제할까요?`))return;
  delete presets[name];savePresetStore(id,presets);$("presetNameInput").value="";refreshPresetSelect();templateThumbCache.clear();
  if($("templateBrowserDialog")?.open)renderTemplateBrowser();
  presetStatus(`“${name}” 프리셋을 삭제했습니다.`,"ok")
}
function onPresetSelectionChange(){
  const name=$("presetSelect").value;updatePresetActions();
  if(!name){$("presetNameInput").value="";refreshPresetSelect();return}
  $("presetNameInput").value=name;applySelectedPreset()
}

function currentTemplateDefaultPayload(){const c=ctrl();return{font:c.font,fontSize:c.fontSize,tracking:c.tracking,textX:c.textX,textY:c.textY,backStyle:c.backStyle,background:c.background,frontLogoScale:c.frontLogoScale,frontLogoX:c.frontLogoX,frontLogoY:c.frontLogoY,backLogoScale:c.backLogoScale,backLogoX:c.backLogoX,backLogoY:c.backLogoY,logoOutline:c.logoOutline,logoShadow:c.logoShadow,schoolName:c.schoolName,trumpSuit:c.trumpSuit,trumpRank:c.trumpRank,trumpSuitColor:c.trumpSuitColor,trumpRankColor:c.trumpRankColor,signatureScale:c.signatureScale,signatureX:c.signatureX,signatureY:c.signatureY}}
function saveCurrentTemplateDefaults(){const id=$("templateSelect").value,all=templateUserDefaults();all[id]=currentTemplateDefaultPayload();saveJson(TEMPLATE_DEFAULTS_KEY,all);status(getTemplate(id).label+" 기본값을 저장했습니다.",false,true)}
function resetCurrentTemplateDefaults(){const id=$("templateSelect").value,all=templateUserDefaults();delete all[id];saveJson(TEMPLATE_DEFAULTS_KEY,all);applyTemplateDefaults(id,true);status(getTemplate(id).label+" 기본값을 초기화했습니다.",false,true)}

function ctrl(){return{template:$("templateSelect").value||"ribbon",name:$("nameInput").value,schoolName:$("schoolNameInput").value||"",trumpSuit:$("trumpSuitSelect").value||"diamond",trumpRank:$("trumpRankInput").value||"A",trumpSuitColor:trumpColorValue($("trumpSuitColorSelect").value),trumpRankColor:trumpColorValue($("trumpRankColorSelect").value),signatureScale:+$("signatureScaleNumber").value||100,signatureX:+$("signatureXNumber").value||363,signatureY:+$("signatureYNumber").value||862,group:$("groupSelect").value,backStyle:$("backStyleSelect").value,font:$("fontSelect").value||"Playfair Display",logoOutline:$("logoOutlineCheck").checked,logoShadow:$("logoShadowCheck").checked,frontLogoScale:+$("frontLogoScaleNumber").value||100,frontLogoX:+$("frontLogoXNumber").value||325,frontLogoY:+$("frontLogoYNumber").value||60,backLogoScale:+$("backLogoScaleNumber").value||100,backLogoX:+$("backLogoXNumber").value||325,backLogoY:+$("backLogoYNumber").value||502,element:colorValue($("elementColorSelect").value,$("elementColorPicker").value),text:colorValue($("textColorSelect").value,$("textColorPicker").value),background:backgroundColorValue($("backgroundColorSelect").value,"auto"),fx:+$("focusXNumber").value||50,fy:+$("focusYNumber").value||50,zoom:+$("zoomNumber").value||100,tracking:+$("trackingInput").value||4,fontSize:+$("fontSizeInput").value||31,textX:+$("textXInput").value||325,textY:+$("textYInput").value||903,shadow:$("shadowCheck").checked,stroke:$("strokeColorPicker").value||"#fff",strokeWidth:+$("strokeWidthInput").value||0}}
function applyCtrl(c={}){if(c.template)$("templateSelect").value=templateIdFromValue(c.template);if(c.name!=null)$("nameInput").value=c.name;if(c.schoolName!=null)$("schoolNameInput").value=c.schoolName;if(c.trumpSuit)$("trumpSuitSelect").value=c.trumpSuit;if(c.trumpRank!=null)$("trumpRankInput").value=c.trumpRank;applyTrumpColor("suit",c.trumpSuitColor??"auto");applyTrumpColor("rank",c.trumpRankColor??"auto");if(c.signatureScale!=null)setLinked("signatureScale",c.signatureScale);if(c.signatureX!=null)setLinked("signatureX",c.signatureX);if(c.signatureY!=null)setLinked("signatureY",c.signatureY);if(c.group in GROUPS)$("groupSelect").value=c.group;if(c.backStyle)$("backStyleSelect").value=c.backStyle;if(c.font&&FONTS[c.font])$("fontSelect").value=c.font;if(c.logoOutline!=null)$("logoOutlineCheck").checked=!!c.logoOutline;if(c.logoShadow!=null)$("logoShadowCheck").checked=!!c.logoShadow;setLinked("frontLogoScale",c.frontLogoScale??100);setLinked("frontLogoX",c.frontLogoX??325);setLinked("frontLogoY",c.frontLogoY??60);setLinked("backLogoScale",c.backLogoScale??100);setLinked("backLogoX",c.backLogoX??325);setLinked("backLogoY",c.backLogoY??502);applyColor("element",c.element);applyColor("text",c.text);applyBackgroundColor(c.background??"auto");setLinked("focusX",c.fx??50);setLinked("focusY",c.fy??50);setLinked("zoom",c.zoom??100);if(c.tracking!=null)$("trackingInput").value=c.tracking;if(c.fontSize!=null)$("fontSizeInput").value=c.fontSize;if(c.textX!=null)$("textXInput").value=c.textX;if(c.textY!=null)$("textYInput").value=c.textY;if(c.shadow!=null)$("shadowCheck").checked=!!c.shadow;if(c.stroke)$("strokeColorPicker").value=c.stroke;if(c.strokeWidth!=null)$("strokeWidthInput").value=c.strokeWidth;updateTemplateExtras();maybeName();queue()}
function applyColor(kind,v){if(!v)return;const p=$(kind==="element"?"elementColorPicker":"textColorPicker"),s=$(kind==="element"?"elementColorSelect":"textColorSelect"),x=colorValue(v,kind==="element"?"#E7C68E":"#F5E5C2");p.value=x;const n=Object.entries(allColors()).find(([,q])=>q.toUpperCase()===x.toUpperCase())?.[0];if(n)s.value=n}

function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function drawCover(ctx,img,c){const z=Math.max(1,c.zoom/100),scale=Math.max(W/img.width,H/img.height)*z,dw=img.width*scale,dh=img.height*scale,x=-(dw-W)*clamp(c.fx/100,0,1),y=-(dh-H)*clamp(c.fy/100,0,1);ctx.drawImage(img,x,y,dw,dh)}
function drawCoverRect(ctx,img,c,rx,ry,rw,rh){const z=Math.max(1,c.zoom/100),scale=Math.max(rw/img.width,rh/img.height)*z,dw=img.width*scale,dh=img.height*scale,x=rx-(dw-rw)*clamp(c.fx/100,0,1),y=ry-(dh-rh)*clamp(c.fy/100,0,1);ctx.drawImage(img,x,y,dw,dh)}
function fillRound(ctx,x,y,w,h,r,color){ctx.save();ctx.fillStyle=color;rounded(ctx,x,y,w,h,r);ctx.fill();ctx.restore()}

function heart(ctx,x,y,s,color){ctx.save();ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y+s*.38);ctx.bezierCurveTo(x-s*.72,y-s*.2,x-s*.46,y-s*.86,x,y-s*.44);ctx.bezierCurveTo(x+s*.46,y-s*.86,x+s*.72,y-s*.2,x,y+s*.38);ctx.fill();ctx.restore()}
function sparkle(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x,y+s);ctx.moveTo(x-s,y);ctx.lineTo(x+s,y);ctx.stroke();ctx.restore()}
function bow(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2.4;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x-s*.2,y-s*.15,x-s*.55,y-s*.25,x-s*.62,y);ctx.bezierCurveTo(x-s*.55,y+s*.25,x-s*.18,y+s*.2,x,y);ctx.bezierCurveTo(x+s*.18,y+s*.2,x+s*.55,y+s*.25,x+s*.62,y);ctx.bezierCurveTo(x+s*.55,y-s*.25,x+s*.2,y-s*.15,x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x-3,y+4);ctx.lineTo(x-12,y+s*.75);ctx.moveTo(x+3,y+4);ctx.lineTo(x+12,y+s*.75);ctx.stroke();ctx.restore()}
function drawFrame(ctx,color,back=false){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.2;rounded(ctx,15,15,W-30,H-30,28);ctx.stroke();if(back){heart(ctx,44,46,13,color);heart(ctx,W-44,46,13,color);heart(ctx,44,H-46,13,color);heart(ctx,W-44,H-46,13,color);sparkle(ctx,81,47,7,color);sparkle(ctx,W-81,47,7,color);sparkle(ctx,81,H-47,7,color);sparkle(ctx,W-81,H-47,7,color);bow(ctx,W/2,54,22,color);bow(ctx,W/2,H-55,22,color)}else{bow(ctx,49,43,27,color);heart(ctx,47,92,13,color);sparkle(ctx,78,43,7,color);heart(ctx,W-48,70,18,color);sparkle(ctx,W-31,102,7,color);heart(ctx,47,H-47,18,color);sparkle(ctx,31,H-92,7,color);heart(ctx,W-47,H-47,18,color);sparkle(ctx,W-31,H-92,7,color);bow(ctx,W/2,H-69,22,color);sparkle(ctx,176,H-102,9,color);sparkle(ctx,W-176,H-102,9,color);ctx.beginPath();ctx.moveTo(198,H-70);ctx.lineTo(298,H-70);ctx.moveTo(352,H-70);ctx.lineTo(452,H-70);ctx.stroke()}ctx.restore()}
function trackedWidth(ctx,t,sp){let w=0;for(let i=0;i<t.length;i++){w+=ctx.measureText(t[i]).width;if(i<t.length-1)w+=sp}return w}
function drawName(ctx,c){const t=String(c.name||"").trim();if(!t)return;ctx.save();let size=c.fontSize,sp=c.tracking,family=FONTS[c.font]||FONTS["Playfair Display"];while(size>22){ctx.font=`400 ${size}px ${family}`;if(trackedWidth(ctx,t,sp)<=380)break;if(sp>1)sp--;else size--}ctx.font=`400 ${size}px ${family}`;ctx.textBaseline="middle";let x=c.textX-trackedWidth(ctx,t,sp)/2,y=c.textY??903;if(c.shadow){ctx.shadowColor="rgba(0,0,0,.58)";ctx.shadowBlur=4;ctx.shadowOffsetX=2;ctx.shadowOffsetY=3}ctx.fillStyle=c.text;ctx.strokeStyle=c.stroke;ctx.lineJoin="round";ctx.lineWidth=Math.max(0,c.strokeWidth*2);for(let i=0;i<t.length;i++){const ch=t[i];if(c.strokeWidth>0)ctx.strokeText(ch,x,y);ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width+(i<t.length-1?sp:0)}ctx.restore()}
function drawNameAt(ctx,c,{x=c.textX,y=c.textY??903,maxWidth=380,size=c.fontSize,font=c.font,fill=c.text,stroke=c.stroke,shadow=c.shadow,align="center"}={}){const t=String(c.name||"").trim();if(!t)return;ctx.save();let fs=size,sp=c.tracking??0,family=FONTS[font]||FONTS["Playfair Display"];while(fs>18){ctx.font=`400 ${fs}px ${family}`;if(trackedWidth(ctx,t,sp)<=maxWidth)break;if(sp>0)sp--;else fs--}ctx.font=`400 ${fs}px ${family}`;ctx.textBaseline="middle";const tw=trackedWidth(ctx,t,sp);let px=align==="left"?x:align==="right"?x-tw:x-tw/2;if(shadow){ctx.shadowColor="rgba(0,0,0,.48)";ctx.shadowBlur=4;ctx.shadowOffsetX=1.5;ctx.shadowOffsetY=2.5}ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineJoin="round";ctx.lineWidth=Math.max(0,c.strokeWidth*2);for(let i=0;i<t.length;i++){const ch=t[i];if(c.strokeWidth>0)ctx.strokeText(ch,px,y);ctx.fillText(ch,px,y);px+=ctx.measureText(ch).width+(i<t.length-1?sp:0)}ctx.restore()}
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
function drawLogoPattern(ctx,img,c,angle=-Math.PI/6){const size=Math.max(.4,(c.backLogoScale||100)/100);ctx.save();rounded(ctx,0,0,W,H,R);ctx.clip();for(let row=0,y=105;y<H+100;row++,y+=145){if(row%2===0){const w=108*size;for(let x=30;x<W+90;x+=132)drawLogoInstance(ctx,img,c,x+(row%4===2?55:0),y,w,1,angle,true)}else{const w=190*size;for(let x=55;x<W+150;x+=225)drawLogoInstance(ctx,img,c,x+(row%4===3?70:0),y,w,1,angle,true)}}ctx.restore()}
async function drawLogo(ctx,c,back=false){const g=GROUPS[c.group];if(!g?.logo)return;let img;try{img=await loadAsset(g.logo)}catch{return}const frontScale=Math.max(.4,(c.frontLogoScale||100)/100),backScale=Math.max(.4,(c.backLogoScale||100)/100);if(back&&c.backStyle==="pattern"){drawLogoPattern(ctx,img,c,-Math.PI/6);return}if(back&&c.backStyle==="pattern45"){drawLogoPattern(ctx,img,c,-Math.PI/4);return}if(back&&c.backStyle==="diagonal")drawLogoInstance(ctx,img,c,W/2,H/2,390*backScale,1,-Math.PI/4,true);else if(back)drawLogoInstance(ctx,img,c,W/2,H/2,330*backScale,1,0,true);else drawLogoInstance(ctx,img,c,W/2,60,92*frontScale,.95,0,true)}
function mixWhite(hex,a=.91){const s=colorValue(hex).slice(1),r=parseInt(s.slice(0,2),16),g=parseInt(s.slice(2,4),16),b=parseInt(s.slice(4,6),16),m=v=>Math.round(v*(1-a)+255*a);return `rgb(${m(r)},${m(g)},${m(b)})`}
async function chooseSignature(f){if(!f)return;try{signatureImage?.close?.();signatureImage=await createImageBitmap(f,{imageOrientation:"from-image"});signatureFile=f;queue();status("사인 이미지를 불러왔습니다.",false,true)}catch(e){status("사인 이미지 불러오기 실패: "+e.message,true)}}
function clearSignature(){signatureImage?.close?.();signatureImage=null;signatureFile=null;$("signatureInput").value="";queue()}
function signatureMask(img,dw,dh){const m=document.createElement("canvas");m.width=Math.max(1,Math.ceil(dw));m.height=Math.max(1,Math.ceil(dh));const x=m.getContext("2d");x.drawImage(img,0,0,m.width,m.height);x.globalCompositeOperation="source-in";x.fillStyle="rgba(0,0,0,.92)";x.fillRect(0,0,m.width,m.height);return m}
function makeTemplateEnv(ctx,c,img){
  const group=GROUPS[c.group];
  const getGroupLogo=async()=>{if(!group?.logo)return null;try{return await loadAsset(group.logo)}catch{return null}};
  return{
    ctx,W,H,R,c,signatureImage,
    fillRound:(x,y,w,h,r,color)=>fillRound(ctx,x,y,w,h,r,(x===0&&y===0&&w===W&&h===H&&c.background&&c.background!=="auto")?c.background:color),
    photoRect:(x,y,w,h,r=0)=>{if(!img)return;ctx.save();rounded(ctx,x,y,w,h,r);ctx.clip();drawCoverRect(ctx,img,c,x,y,w,h);ctx.restore()},
    subjectRect:(x,y,w,h,r=0)=>{if(!img)return;ctx.save();rounded(ctx,x,y,w,h,r);ctx.clip();drawCoverRect(ctx,img,c,x,y,w,h);ctx.restore()},
    punchRoundRect:(x,y,w,h,r)=>{ctx.save();ctx.globalCompositeOperation="destination-out";rounded(ctx,x,y,w,h,r);ctx.fillStyle="#000";ctx.fill();ctx.restore()},
    ribbonFrame:(back=false)=>drawFrame(ctx,c.element,back),
    logo:async({cx=c.frontLogoX??W/2,cy=c.frontLogoY??60,w=92,effects=true,alpha=1,angle=0}={})=>{const logo=await getGroupLogo();if(!logo)return;const scale=Math.max(.4,(c.frontLogoScale||100)/100);drawLogoInstance(ctx,logo,c,cx,cy,w*scale,alpha,angle,effects)},
    backLogo:async({maxWidth=330,cx=c.backLogoX??W/2,cy=c.backLogoY??H/2}={})=>{const logo=await getGroupLogo();if(!logo)return;const scale=Math.max(.4,(c.backLogoScale||100)/100);if(c.backStyle==="pattern"){drawLogoPattern(ctx,logo,c,-Math.PI/6);return}if(c.backStyle==="pattern45"){drawLogoPattern(ctx,logo,c,-Math.PI/4);return}if(c.backStyle==="diagonal"){drawLogoInstance(ctx,logo,c,cx,cy,Math.min(390,maxWidth*1.18)*scale,1,-Math.PI/4,true);return}drawLogoInstance(ctx,logo,c,cx,cy,maxWidth*scale,1,0,true)},
    name:(opts={})=>drawNameAt(ctx,c,opts),
    backBase:(color="#FFFFFF")=>fillRound(ctx,0,0,W,H,R,(c.background&&c.background!=="auto")?c.background:color),
    signature:({cx=c.signatureX??W/2,cy=c.signatureY??H-140,maxWidth=340,maxHeight=130,alpha=1,useControls=true}={})=>{if(!signatureImage)return;const scaleCtl=useControls?Math.max(.4,(c.signatureScale||100)/100):1,iw=signatureImage.width,ih=signatureImage.height,s=Math.min(maxWidth/iw,maxHeight/ih)*scaleCtl,dw=iw*s,dh=ih*s,px=cx-dw/2,py=cy-dh/2,mask=signatureMask(signatureImage,dw,dh);ctx.save();ctx.globalAlpha=alpha;ctx.shadowColor="rgba(0,0,0,.45)";ctx.shadowBlur=7;ctx.shadowOffsetX=2;ctx.shadowOffsetY=3;ctx.drawImage(signatureImage,px,py,dw,dh);ctx.shadowColor="transparent";ctx.shadowBlur=0;for(const [dx,dy] of [[-2,-2],[0,-2],[2,-2],[-2,0],[2,0],[-2,2],[0,2],[2,2]])ctx.drawImage(mask,px+dx,py+dy,dw,dh);ctx.drawImage(signatureImage,px,py,dw,dh);ctx.restore()}
  }
}
async function ensureFont(c){const family=c.font||"Playfair Display";try{await document.fonts.load(`400 ${Math.max(24,c.fontSize||31)}px "${family}"`)}catch{}}
async function renderFront(canvas,img=photo,c=ctrl()){if(!img)return false;await ensureFont(c);canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");ctx.clearRect(0,0,W,H);if(c.background&&c.background!=="auto")fillRound(ctx,0,0,W,H,R,c.background);await renderTemplateFront(c.template||"ribbon",makeTemplateEnv(ctx,c,img));return true}
async function renderBack(canvas,c=ctrl()){canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");ctx.clearRect(0,0,W,H);if(c.background&&c.background!=="auto")fillRound(ctx,0,0,W,H,R,c.background);await renderTemplateBack(c.template||"ribbon",makeTemplateEnv(ctx,c,null));return true}
function queue(){if(raf)return;raf=requestAnimationFrame(async()=>{raf=0;if(currentSide==="front"&&!photo)return;await (currentSide==="front"?renderFront($("previewCanvas")):renderBack($("previewCanvas")))})}
function setLinked(p,v){$(p+"Range").value=v;$(p+"Number").value=v}
function bindRange(p,min,max){const r=$(p+"Range"),n=$(p+"Number"),sync=(a,b)=>{const v=clamp(+a.value||0,min,max);b.value=v;queue()};r.oninput=()=>sync(r,n);n.oninput=()=>sync(n,r)}
function updateGuide(){$("centerGuide").style.display=$("centerGuideCheck").checked&&currentSide==="front"?"block":"none"}
async function setWorkingPhoto(blob,label="사진"){if(!blob)return;photo?.close?.();photo=await createImageBitmap(blob,{imageOrientation:"from-image"});workingPhotoBlob=blob;photoFile={name:label};$("previewStage").classList.add("has-image");$("previewHint").textContent=label;$("generateBtn").disabled=false;$("savePairBtn").disabled=false;$("cutoutBtn").disabled=false;queue()}
async function choosePhoto(f){if(!f)return;try{templateThumbCache.clear();originalPhotoFile=f;await setWorkingPhoto(f,f.name);$("restorePhotoBtn").disabled=true;status("사진을 불러왔습니다. 드래그와 휠로 위치를 조정하세요.",false,true)}catch(e){status("이미지 불러오기 실패: "+e.message,true)}}
async function doCutout(){if(!workingPhotoBlob)return;const btn=$("cutoutBtn");btn.disabled=true;try{status("AI 누끼 모델을 준비하고 있습니다. 최초 실행은 다운로드 때문에 오래 걸릴 수 있습니다.");if(!cutoutModule)cutoutModule=await import("https://esm.sh/@imgly/background-removal@1.5.6");const progress=(key,current,total)=>status(`AI 누끼 처리 중: ${key} ${Math.round((current/Math.max(1,total))*100)}%`);let out;if(webGpuAvailable()){try{status("AI 누끼: WebGPU로 처리 중...");out=await cutoutModule.removeBackground(workingPhotoBlob,{...CUTOUT_CONFIG,device:"gpu",progress})}catch(gpuError){console.warn("WebGPU 누끼 실패, CPU/WASM으로 재시도:",gpuError);status("WebGPU 처리 실패. CPU/WASM으로 자동 재시도합니다.");out=await cutoutModule.removeBackground(workingPhotoBlob,{...CUTOUT_CONFIG,device:"cpu",progress})}}else{status("WebGPU 미지원 환경입니다. CPU/WASM으로 처리합니다.");out=await cutoutModule.removeBackground(workingPhotoBlob,{...CUTOUT_CONFIG,device:"cpu",progress})}await setWorkingPhoto(out,webGpuAvailable()?"AI 누끼 적용됨 (WebGPU 우선)":"AI 누끼 적용됨");$("restorePhotoBtn").disabled=false;status("AI 누끼를 적용했습니다.",false,true)}catch(e){console.error(e);status(`AI 누끼 실패: ${e.message}. PNG 투명 배경 이미지를 직접 넣어도 됩니다.`,true)}finally{btn.disabled=false}}
async function restoreOriginalPhoto(){if(!originalPhotoFile)return;try{await setWorkingPhoto(originalPhotoFile,originalPhotoFile.name+" (원본)");$("restorePhotoBtn").disabled=true;status("원본 사진으로 복원했습니다.",false,true)}catch(e){status("원본 복원 실패: "+e.message,true)}}
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
function xlsxXmlEscape(s){return String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[ch]))}
function excelValidationXml({sqref,name,title,prompt}){
  return `<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" errorStyle="stop" errorTitle="${xlsxXmlEscape(title)}" error="${xlsxXmlEscape("목록에 있는 값을 선택해 주세요.")}" promptTitle="${xlsxXmlEscape(title)}" prompt="${xlsxXmlEscape(prompt)}" sqref="${sqref}"><formula1>${name}</formula1></dataValidation>`
}
async function sampleExcel(){
  try{
    ensureXlsx();if(!window.JSZip)throw new Error("ZIP 라이브러리가 로드되지 않았습니다.");
    const templates=getTemplateList().map(t=>t.label);
    const groups=Object.values(GROUPS).map(g=>g.label);
    const colors=Object.keys(allColors());
    const backgrounds=["템플릿 기본값",...colors];
    const sample=["01. Ribbon Classic","IVE","샴페인 골드","아이보리 골드","템플릿 기본값","WONYOUNG","wonyoung.jpg","WONYOUNG_RIBBON.png"];
    const ws=XLSX.utils.aoa_to_sheet([COLUMNS,sample]);
    ws["!cols"]=[{wch:26},{wch:16},{wch:18},{wch:18},{wch:18},{wch:20},{wch:28},{wch:34}];
    ws["!autofilter"]={ref:"A1:H501"};
    const guide=XLSX.utils.aoa_to_sheet([
      ["PhotocardMaker 일괄 생성 양식"],
      ["입력 방법","'입력' 시트의 2행부터 한 행당 포토카드 1개를 입력하세요."],
      ["템플릿","A열 셀을 클릭하면 드롭다운에서 현재 지원하는 템플릿을 선택할 수 있습니다."],
      ["그룹 / 컬러","그룹 및 요소·텍스트·배경 컬러도 드롭다운으로 선택할 수 있습니다."],
      ["배경 컬러","'템플릿 기본값'을 선택하면 해당 템플릿의 원래 배경을 사용합니다."],
      ["이미지명","선택할 이미지 폴더 안의 실제 파일명과 동일하게 입력하세요. 예: wonyoung.jpg"],
      ["저장파일명","확장자 .png는 생략해도 됩니다. 비워 두면 이름과 템플릿을 기준으로 자동 생성됩니다."],
      ["주의","열 제목은 변경하지 마세요. 목록 시트는 드롭다운 원본이므로 숨김 처리되어 있습니다."]
    ]);
    guide["!cols"]=[{wch:22},{wch:88}];
    const listRows=Math.max(templates.length,groups.length,colors.length,backgrounds.length)+1;
    const listData=[["템플릿","그룹","요소 컬러","텍스트 컬러","배경 컬러"]];
    for(let i=0;i<listRows-1;i++)listData.push([templates[i]||"",groups[i]||"",colors[i]||"",colors[i]||"",backgrounds[i]||""]);
    const lists=XLSX.utils.aoa_to_sheet(listData);
    lists["!cols"]=[{wch:32},{wch:18},{wch:20},{wch:20},{wch:20}];
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"입력");
    XLSX.utils.book_append_sheet(wb,guide,"사용안내");
    XLSX.utils.book_append_sheet(wb,lists,"목록");
    wb.Workbook=wb.Workbook||{};wb.Workbook.Sheets=wb.Workbook.Sheets||[];
    wb.Workbook.Sheets[2]={...(wb.Workbook.Sheets[2]||{}),Hidden:1};
    const raw=XLSX.write(wb,{bookType:"xlsx",type:"array",compression:true});
    const zip=await JSZip.loadAsync(raw);
    const sheetPath="xl/worksheets/sheet1.xml";
    let sheetXml=await zip.file(sheetPath).async("string");
    const validations=[
      excelValidationXml({sqref:"A2:A501",name:"TemplateList",title:"템플릿 선택",prompt:"목록에서 포토카드 템플릿을 선택하세요."}),
      excelValidationXml({sqref:"B2:B501",name:"GroupList",title:"그룹 선택",prompt:"등록된 그룹 또는 로고 없음을 선택하세요."}),
      excelValidationXml({sqref:"C2:C501",name:"ElementColorList",title:"요소 컬러 선택",prompt:"목록에서 요소 컬러를 선택하세요."}),
      excelValidationXml({sqref:"D2:D501",name:"TextColorList",title:"텍스트 컬러 선택",prompt:"목록에서 텍스트 컬러를 선택하세요."}),
      excelValidationXml({sqref:"E2:E501",name:"BackgroundColorList",title:"배경 컬러 선택",prompt:"템플릿 기본값 또는 원하는 배경 컬러를 선택하세요."})
    ];
    const validationBlock=`<dataValidations count="${validations.length}">${validations.join("")}</dataValidations>`;
    if(!sheetXml.includes("</worksheet>"))throw new Error("Excel 시트 XML을 구성하지 못했습니다.");
    sheetXml=sheetXml.replace("</worksheet>",validationBlock+"</worksheet>");
    zip.file(sheetPath,sheetXml);
    const wbPath="xl/workbook.xml";let workbookXml=await zip.file(wbPath).async("string");
    const refs=[
      ["TemplateList",templates.length,"A"],
      ["GroupList",groups.length,"B"],
      ["ElementColorList",colors.length,"C"],
      ["TextColorList",colors.length,"D"],
      ["BackgroundColorList",backgrounds.length,"E"]
    ];
    const definedNames=`<definedNames>${refs.map(([name,count,col])=>`<definedName name="${name}">&apos;목록&apos;!${col}$2:${col}${count+1}</definedName>`).join("")}</definedNames>`;
    if(workbookXml.includes("<definedNames>"))workbookXml=workbookXml.replace("</definedNames>",refs.map(([name,count,col])=>`<definedName name="${name}">&apos;목록&apos;!${col}$2:${col}${count+1}</definedName>`).join("")+"</definedNames>");
    else workbookXml=workbookXml.replace("</workbook>",definedNames+"</workbook>");
    // Force the source list sheet hidden even if a SheetJS version omits the Hidden flag.
    workbookXml=workbookXml.replace(/(<sheet\b[^>]*name="목록"[^>]*)(\/>)/,m=>m.includes(' state=')?m:m.replace(/\/>$/,' state="hidden"/>'));
    zip.file(wbPath,workbookXml);
    const blob=await zip.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",compression:"DEFLATE"});
    downloadBlob(blob,"PhotocardMaker_일괄생성_양식.xlsx");
    batchStatus("엑셀 양식을 다운로드했습니다. 템플릿·그룹·컬러 열은 셀 드롭다운으로 선택할 수 있습니다.",false,true);
    excelStatus("엑셀 양식을 다운로드했습니다. 작성 후 ‘엑셀 데이터 불러오기’로 불러오세요.");
  }catch(e){batchStatus("엑셀 양식 생성 실패: "+e.message,true);excelStatus("엑셀 양식 생성 실패: "+e.message)}
}
async function parseExcel(file){ensureXlsx();const wb=XLSX.read(await file.arrayBuffer(),{type:"array",raw:false}),ws=wb.Sheets[wb.SheetNames.includes("입력")?"입력":wb.SheetNames[0]],grid=XLSX.utils.sheet_to_json(ws,{header:1,defval:"",raw:false});let hr=-1,idx=[];for(let i=0;i<Math.min(20,grid.length);i++){const row=grid[i].map(x=>String(x).trim());if(COLUMNS.every(c=>row.includes(c))){hr=i;idx=COLUMNS.map(c=>row.indexOf(c));break}}if(hr<0)throw new Error("필요한 열을 찾지 못했습니다.");const out=[];for(let r=hr+1;r<grid.length;r++){const row={};COLUMNS.forEach((c,i)=>row[c]=String(grid[r]?.[idx[i]]??"").trim());if(COLUMNS.some(c=>row[c]))out.push({excelRow:r+1,row})}return out}
function norm(s){return String(s||"").replaceAll("\\","/").replace(/^\.\//,"").toLowerCase()}
function findBatchImage(name){const n=norm(name),base=n.split("/").pop();let a=batchFiles.filter(f=>norm(f.webkitRelativePath||f.name).endsWith(n));if(a.length===1)return a[0];a=batchFiles.filter(f=>f.name.toLowerCase()===base);return a.length===1?a[0]:null}
async function prepareBatch(){const ex=$("excelInput").files?.[0];batchFiles=[...($("imageFolderInput").files||[])];batchRows=[];$("batchBtn").disabled=true;if(!ex||!batchFiles.length)return batchStatus("Excel과 이미지 폴더를 모두 선택하세요.");try{batchRows=(await parseExcel(ex)).map(x=>({...x,state:"ready",message:""}));renderBatch();$("batchBtn").disabled=!batchRows.length;batchStatus(batchRows.length+"개 행을 읽었습니다.",false,true)}catch(e){batchStatus("Excel 읽기 실패: "+e.message,true)}}
function renderBatch(){const body=batchRows.map(x=>`<tr class="${x.state}"><td>${x.excelRow}</td><td>${esc(x.row["그룹"])}</td><td>${esc(x.row["이름"])}</td><td>${esc(x.row["이미지명"])}</td><td>${esc(x.row["저장파일명"])}</td><td>${esc(x.message||x.state)}</td></tr>`).join("");$("batchTableWrap").innerHTML=`<table class="batch-table"><thead><tr><th>행</th><th>그룹</th><th>이름</th><th>이미지</th><th>저장파일명</th><th>상태</th></tr></thead><tbody>${body}</tbody></table>`}
async function runBatch(){if(!batchRows.length)return;$("batchBtn").disabled=true;try{const zip=new JSZip();let ok=0,fail=0;for(const [i,item] of batchRows.entries()){const r=item.row;try{batchStatus(`${i+1}/${batchRows.length} 생성 중 · ${r["이름"]}`);const file=findBatchImage(r["이미지명"]);if(!file)throw new Error("이미지 없음");const bmp=await createImageBitmap(file,{imageOrientation:"from-image"}),baseCtrl=ctrl(),tid=templateIdFromValue(r["템플릿"]),td=templateDefaultState(tid),c={...baseCtrl,...td,template:tid,name:r["이름"]||baseCtrl.name,group:groupIdFromValue(r["그룹"],baseCtrl.group),element:colorValue(r["요소 컬러"],baseCtrl.element),text:colorValue(r["텍스트 컬러"],baseCtrl.text),background:backgroundColorValue(r["배경 컬러"],td.background??baseCtrl.background??"auto")},f=document.createElement("canvas"),b=document.createElement("canvas");await renderFront(f,bmp,c);await renderBack(b,c);bmp.close?.();const base=sanitize(r["저장파일명"],(r["이름"]||"card")+"_"+tid.toUpperCase()+"_650x1004.png");zip.file(base,await canvasBlob(f));zip.file(backName(base),await canvasBlob(b));item.state="done";item.message="앞·뒷면 완료";ok++}catch(e){item.state="error";item.message=e.message;fail++}renderBatch()}if(!ok)throw new Error("성공한 카드가 없습니다.");downloadBlob(await zip.generateAsync({type:"blob",compression:"DEFLATE"}),`포토카드_앞뒷면_${new Date().toISOString().slice(0,10)}.zip`);batchStatus(`완료: ${ok}개 성공${fail?` · ${fail}개 실패`:""}`,!!fail,!fail)}catch(e){batchStatus("일괄 생성 실패: "+e.message,true)}finally{$("batchBtn").disabled=false}}

function filtered(){return excelRows.filter(x=>COLUMNS.every(c=>!filters[c]||String(x.row[c]??"")===filters[c]))}
function optionsFor(c){return [...new Set(excelRows.map(x=>String(x.row[c]??"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ko-KR",{numeric:true}))}
function renderExcelHead(){const h=$("excelDataHead");h.innerHTML=`<tr class="excel-sort-row">${COLUMNS.map(c=>`<th data-col="${esc(c)}">${esc(c)}${c===sortCol?(sortDesc?" ▼":" ▲"):""}</th>`).join("")}</tr><tr class="excel-filter-row">${COLUMNS.map(c=>`<th><select data-filter="${esc(c)}"><option value="">전체</option>${optionsFor(c).map(v=>`<option value="${esc(v)}" ${v===filters[c]?"selected":""}>${esc(v)}</option>`).join("")}</select></th>`).join("")}</tr>`;h.querySelectorAll("[data-col]").forEach(th=>th.onclick=()=>sortExcel(th.dataset.col));h.querySelectorAll("[data-filter]").forEach(s=>s.onchange=e=>{filters[e.target.dataset.filter]=e.target.value;renderExcelBody();excelStatus()})}
function renderExcelBody(){const b=$("excelDataBody"),rows=filtered();b.innerHTML=rows.length?rows.map(x=>`<tr data-id="${x.id}" class="${x.done?"done":""} ${x.id===selectedId?"selected":""}">${COLUMNS.map(c=>`<td>${esc(x.row[c])}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${COLUMNS.length}">불러온 엑셀 데이터가 없습니다.</td></tr>`;b.querySelectorAll("tr[data-id]").forEach(tr=>{tr.onclick=()=>selectExcel(tr.dataset.id);tr.ondblclick=()=>toggleDone(tr.dataset.id)})}
function excelStatus(msg){$("excelDataStatus").textContent=msg||`표시 ${filtered().length}/${excelRows.length}행 · 완료 ${excelRows.filter(x=>x.done).length}행`}
function sortExcel(c){if(sortCol===c)sortDesc=!sortDesc;else{sortCol=c;sortDesc=true}excelRows.sort((a,b)=>{const n=String(a.row[c]??"").localeCompare(String(b.row[c]??""),"ko-KR",{numeric:true});return sortDesc?-n:n});renderExcelHead();renderExcelBody();excelStatus()}
function selectExcel(id){const x=excelRows.find(v=>v.id===id);if(!x)return;selectedId=id;const r=x.row;const tid=templateIdFromValue(r["템플릿"]);applyTemplateDefaults(tid,false);$("nameInput").value=r["이름"]||$("nameInput").value;$("groupSelect").value=groupIdFromValue(r["그룹"],$("groupSelect").value);applyColor("element",r["요소 컬러"]);applyColor("text",r["텍스트 컬러"]);if(String(r["배경 컬러"]||"").trim())applyBackgroundColor(r["배경 컬러"]);filenameEdited=!!r["저장파일명"];$("filenameInput").value=r["저장파일명"]?sanitize(r["저장파일명"]):defaultName();renderExcelBody();queue();excelStatus("설정 적용: "+(r["이름"]||"선택 행"))}
function toggleDone(id){const x=excelRows.find(v=>v.id===id);if(x){x.done=!x.done;renderExcelBody();excelStatus()}}
function markDone(){const x=excelRows.find(v=>v.id===selectedId);if(x){x.done=true;renderExcelBody();excelStatus()}}
async function loadExcelPanel(file){if(!file)return;try{excelRows=(await parseExcel(file)).map((x,i)=>({id:"x"+x.excelRow+"_"+i,...x,done:false}));selectedId=null;sortCol=null;sortDesc=false;filters=Object.fromEntries(COLUMNS.map(c=>[c,""]));renderExcelHead();renderExcelBody();$("excelDataHint").textContent=`${file.name} · ${excelRows.length}행 불러옴 · 클릭=설정 적용 / 더블클릭=완료 토글`;excelStatus()}catch(e){excelStatus("엑셀 데이터 불러오기 실패: "+e.message)}}
function saveProgress(){saveJson(PROGRESS_KEY,{rows:excelRows,selectedId,sortCol,sortDesc,filters,hint:$("excelDataHint").textContent});excelStatus("진행 상태를 저장했습니다.")}
function restoreProgress(){const p=loadJson(PROGRESS_KEY,null);if(!p?.rows?.length)return;excelRows=p.rows;selectedId=p.selectedId||null;sortCol=p.sortCol||null;sortDesc=!!p.sortDesc;filters={...Object.fromEntries(COLUMNS.map(c=>[c,""])),...(p.filters||{})};$("excelDataHint").textContent=p.hint||"저장된 작업 상태 복원";renderExcelHead();renderExcelBody();excelStatus("이전 작업 상태를 복원했습니다.")}

let workspaceResizeFrame=0;
function workspaceSplitEnabled(){return window.matchMedia("(min-width:1181px)").matches}
function workspaceSplitBounds(){
  const shell=document.querySelector(".page-shell"),handle=$("workspaceResizer");
  if(!shell||!handle)return{min:320,max:900,total:1220};
  const total=shell.clientWidth,divider=handle.offsetWidth||14,leftMin=620,rightMin=320;
  return{min:rightMin,max:Math.max(rightMin,total-leftMin-divider),total}
}
function defaultExcelPaneWidth(){
  const {min,max,total}=workspaceSplitBounds();
  return clamp(Math.round(total*.42),min,max)
}
function applyExcelPaneWidth(width,persist=false){
  const shell=document.querySelector(".page-shell"),handle=$("workspaceResizer");
  if(!shell||!handle)return;
  if(!workspaceSplitEnabled()){shell.style.removeProperty("--excel-pane-width");return}
  const {min,max,total}=workspaceSplitBounds(),px=clamp(Math.round(Number(width)||defaultExcelPaneWidth()),min,max);
  shell.style.setProperty("--excel-pane-width",px+"px");
  const pct=Math.round(px/Math.max(1,total)*100);
  handle.setAttribute("aria-valuenow",String(pct));
  handle.setAttribute("aria-valuetext",`Excel 영역 ${px}px · 전체의 약 ${pct}%`);
  handle.title=`Excel 데이터 영역 ${px}px · 드래그하여 조절 · 더블클릭으로 기본값 복원`;
  if(persist)saveJson(WORKSPACE_SPLIT_KEY,{excelWidth:px});
}
function restoreWorkspaceSplit(){
  const saved=loadJson(WORKSPACE_SPLIT_KEY,null);
  applyExcelPaneWidth(saved?.excelWidth??defaultExcelPaneWidth(),false)
}
function resetWorkspaceSplit(){
  localStorage.removeItem(WORKSPACE_SPLIT_KEY);
  applyExcelPaneWidth(defaultExcelPaneWidth(),false)
}
function initWorkspaceResizer(){
  const shell=document.querySelector(".page-shell"),handle=$("workspaceResizer");
  if(!shell||!handle)return;
  restoreWorkspaceSplit();
  let active=false,lastWidth=null;
  const move=e=>{
    if(!active||!workspaceSplitEnabled())return;
    const rect=shell.getBoundingClientRect();
    lastWidth=rect.right-e.clientX;
    applyExcelPaneWidth(lastWidth,false)
  };
  const end=e=>{
    if(!active)return;
    active=false;shell.classList.remove("is-resizing");
    try{handle.releasePointerCapture(e.pointerId)}catch{}
    if(lastWidth!=null)applyExcelPaneWidth(lastWidth,true)
  };
  handle.addEventListener("pointerdown",e=>{
    if(!workspaceSplitEnabled()||e.button!==0)return;
    active=true;lastWidth=null;shell.classList.add("is-resizing");handle.setPointerCapture(e.pointerId);e.preventDefault()
  });
  handle.addEventListener("pointermove",move);
  handle.addEventListener("pointerup",end);
  handle.addEventListener("pointercancel",end);
  handle.addEventListener("dblclick",e=>{e.preventDefault();resetWorkspaceSplit()});
  handle.addEventListener("keydown",e=>{
    if(!workspaceSplitEnabled())return;
    const current=parseFloat(getComputedStyle(shell).getPropertyValue("--excel-pane-width"))||defaultExcelPaneWidth();
    let next=null;
    if(e.key==="ArrowLeft")next=current+(e.shiftKey?80:24);
    if(e.key==="ArrowRight")next=current-(e.shiftKey?80:24);
    if(e.key==="Home")next=workspaceSplitBounds().max;
    if(e.key==="End")next=workspaceSplitBounds().min;
    if(next!=null){e.preventDefault();applyExcelPaneWidth(next,true)}
  });
  let resizeTimer=0;
  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{
      if(workspaceSplitEnabled()){
        const saved=loadJson(WORKSPACE_SPLIT_KEY,null);
        applyExcelPaneWidth(saved?.excelWidth??defaultExcelPaneWidth(),false)
      }else shell.style.removeProperty("--excel-pane-width")
    },80)
  })
}

function bind(){bindRange("focusX",0,100);bindRange("focusY",0,100);bindRange("zoom",100,500);bindRange("frontLogoScale",40,200);bindRange("frontLogoX",0,650);bindRange("frontLogoY",0,1004);bindRange("backLogoScale",40,200);bindRange("backLogoX",0,650);bindRange("backLogoY",0,1004);bindRange("signatureScale",40,220);bindRange("signatureX",0,650);bindRange("signatureY",0,1004);bindGestures();$("photoInput").onchange=e=>choosePhoto(e.target.files?.[0]);$("cutoutBtn").onclick=doCutout;$("restorePhotoBtn").onclick=restoreOriginalPhoto;$("nameInput").oninput=()=>{maybeName();queue()};$("templateSelect").onchange=()=>{const id=$("templateSelect").value;recordTemplateRecent(id);applyTemplateDefaults(id,true)};$("openTemplateBrowserBtn").onclick=openTemplateBrowser;$("closeTemplateBrowserBtn").onclick=()=>$("templateBrowserDialog").close();$("templateSearchInput").oninput=renderTemplateBrowser;$("schoolNameInput").oninput=queue;$("trumpSuitSelect").onchange=()=>{syncTrumpPicker("suit");syncTrumpPicker("rank");queue()};$("trumpRankInput").oninput=queue;$("trumpSuitColorSelect").onchange=()=>{syncTrumpPicker("suit");queue()};$("trumpRankColorSelect").onchange=()=>{syncTrumpPicker("rank");queue()};$("trumpSuitColorPicker").oninput=()=>trumpPickerToSelect("suit");$("trumpRankColorPicker").oninput=()=>trumpPickerToSelect("rank");$("signatureInput").onchange=e=>chooseSignature(e.target.files?.[0]);$("clearSignatureBtn").onclick=clearSignature;$("groupSelect").onchange=()=>{templateThumbCache.clear();queue()};$("backStyleSelect").onchange=queue;$("fontSelect").onchange=queue;$("logoOutlineCheck").onchange=queue;$("logoShadowCheck").onchange=queue;$("elementColorSelect").onchange=()=>{templateThumbCache.clear();syncPicker("element");queue()};$("textColorSelect").onchange=()=>{templateThumbCache.clear();syncPicker("text");queue()};$("backgroundColorSelect").onchange=()=>{templateThumbCache.clear();syncBackgroundPicker();queue()};$("elementColorPicker").oninput=()=>pickerToSelect("element");$("textColorPicker").oninput=()=>pickerToSelect("text");$("backgroundColorPicker").oninput=backgroundPickerToSelect;["trackingInput","fontSizeInput","textXInput","textYInput","shadowCheck","strokeColorPicker","strokeWidthInput"].forEach(id=>$(id).oninput=queue);$("resetCropBtn").onclick=()=>{setLinked("focusX",50);setLinked("focusY",50);setLinked("zoom",100);queue()};$("resetTextBtn").onclick=()=>{Object.assign($("trackingInput"),{value:4});$("fontSizeInput").value=31;$("textXInput").value=325;$("textYInput").value=903;$("shadowCheck").checked=true;$("strokeColorPicker").value="#FFFFFF";$("strokeWidthInput").value=1;queue()};$("centerGuideCheck").oninput=updateGuide;$("frontTabBtn").onclick=()=>switchSide("front");$("backTabBtn").onclick=()=>switchSide("back");$("filenameInput").oninput=()=>filenameEdited=true;$("generateBtn").onclick=saveCurrent;$("savePairBtn").onclick=savePair;$("savePathBtn").onclick=pickFolder;$("presetSelect").onchange=onPresetSelectionChange;$("applyPresetBtn").onclick=applySelectedPreset;$("savePresetBtn").onclick=saveNewPreset;$("overwritePresetBtn").onclick=overwriteSelectedPreset;$("renamePresetBtn").onclick=renameSelectedPreset;$("deletePresetBtn").onclick=deleteSelectedPreset;$("presetNameInput").onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();saveNewPreset()}};$("saveDefaultsBtn").onclick=saveCurrentTemplateDefaults;$("resetDefaultsBtn").onclick=resetCurrentTemplateDefaults;$("sampleExcelBtn").onclick=sampleExcel;$("excelTemplateDownloadBtn").onclick=sampleExcel;$("excelInput").onchange=prepareBatch;$("imageFolderInput").onchange=prepareBatch;$("batchBtn").onclick=runBatch;$("excelDataLoadBtn").onclick=()=>$("excelDataInput").click();$("excelDataInput").onchange=e=>loadExcelPanel(e.target.files?.[0]);$("excelProgressSaveBtn").onclick=saveProgress;$("openColorManagerBtn").onclick=openColorManager;$("addCustomColorBtn").onclick=saveCustomColor;$("customColorPicker").oninput=e=>$("customColorHex").value=e.target.value.toUpperCase();$("customColorHex").oninput=e=>{const v=normalizeHex(e.target.value);if(v)$("customColorPicker").value=v}}
async function registerModelCacheWorker(){if(!("serviceWorker" in navigator))return;try{await navigator.serviceWorker.register("./service-worker.js",{scope:"./"});await navigator.serviceWorker.ready}catch(e){console.warn("모델 캐시 서비스 워커 등록 실패:",e)}}
async function init(){registerModelCacheWorker();initWorkspaceResizer();initFonts();initTemplates();$("fontSelect").value="Playfair Display";$("logoOutlineCheck").checked=true;$("logoShadowCheck").checked=true;initColors();initGroups();updateTemplateExtras();bind();renderExcelHead();renderExcelBody();restoreProgress();const saved=loadJson(STORAGE_KEY,null);applyTemplateDefaults("ribbon",false);if(saved?.name)$("nameInput").value=saved.name;maybeName(true);saveDir=await loadHandle();pathText();switchSide("front");status("준비 완료. 사진을 선택하세요.",false,true);loadAsset(GROUPS.IVE.logo).catch(()=>{})}
init();