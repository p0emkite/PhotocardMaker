const $ = id => document.getElementById(id);
const W=650,H=1004,R=38;
const STORAGE_KEY="photocard-maker-web-defaults-v1";
const EXCEL_PROGRESS_KEY="photocard-maker-web-excel-progress-v1";
const DB_NAME="photocard-maker-web-storage", DB_STORE="handles", DB_KEY="save-folder";
const EXCEL_COLUMNS=["템플릿","그룹","요소 컬러","텍스트 컬러","이름","이미지명","저장파일명"];
const COLORS={
  "샴페인 골드":"#E7C68E","아이보리 골드":"#F5E5C2","벚꽃 핑크":"#F3B6C4","라일락":"#CDB8E8",
  "로즈골드":"#D8A0A6","진주빛 아이보리":"#F4EFE3","크림 아이보리":"#F6EBD8","파우더 블루":"#B9D2E7",
  "민트":"#B8DCCF","복숭아빛":"#F3BEA8","연핑크":"#F4BBC8","골드":"#D9B76E","실버":"#D7D9DE",
  "화이트":"#FFFFFF","블랙":"#111111"
};
let photo=null,photoFile=null,drag=null,raf=0,saveDirectoryHandle=null,filenameEdited=false;
let batchRows=[],batchImageFiles=[],excelRows=[],excelSort=null,excelDesc=false,selectedExcelId=null;
let excelFilters=Object.fromEntries(EXCEL_COLUMNS.map(c=>[c,""]));

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const hex=v=>/^#[0-9a-f]{6}$/i.test(String(v||"").trim())?String(v).toUpperCase():(COLORS[String(v||"").trim()]||"#FFFFFF");
function setStatus(msg,error=false,ok=false){const e=$("status");e.textContent=msg;e.className="status"+(error?" error":ok?" ok":"");}
function setBatchStatus(msg,error=false,ok=false){const e=$("batchStatus");e.textContent=msg;e.className="status compact-status"+(error?" error":ok?" ok":"");}
function sanitizeFilename(name,fallback="card.png"){let s=(name||"").trim()||fallback;s=s.replace(/[<>:"/\\|?*\x00-\x1F]/g,"_").replace(/[ .]+$/g,"");if(!s.toLowerCase().endsWith(".png"))s+=".png";return s||fallback;}
function defaultFilename(){return sanitizeFilename((($("nameInput").value||"card").trim()||"card")+"_RIBBON_V1_650x1004.png");}
function maybeFilename(force=false){if(force||!filenameEdited)$("filenameInput").value=defaultFilename();}

function populateColors(){
  for(const [id,pref] of [["elementColorSelect","샴페인 골드"],["textColorSelect","아이보리 골드"]]){
    const s=$(id);s.innerHTML=Object.keys(COLORS).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join("");s.value=pref;
  }
  syncPicker("element");syncPicker("text");
}
function syncPicker(kind){
  const s=$(kind==="element"?"elementColorSelect":"textColorSelect");
  const p=$(kind==="element"?"elementColorPicker":"textColorPicker");
  p.value=hex(s.value);
}
function pickerToSelect(kind){
  const s=$(kind==="element"?"elementColorSelect":"textColorSelect");
  const p=$(kind==="element"?"elementColorPicker":"textColorPicker");
  let label=Object.keys(COLORS).find(k=>COLORS[k].toUpperCase()===p.value.toUpperCase());
  if(!label){label=p.value.toUpperCase();const o=document.createElement("option");o.value=label;o.textContent=label;s.appendChild(o);}
  s.value=label;queueRender();
}
function controls(){return{
  name:$("nameInput").value,group:$("groupInput").value,
  element:hex($("elementColorSelect").value||$("elementColorPicker").value),
  text:hex($("textColorSelect").value||$("textColorPicker").value),
  fx:+$("focusXNumber").value||50,fy:+$("focusYNumber").value||50,zoom:+$("zoomNumber").value||100,
  tracking:+$("trackingInput").value||4,fontSize:+$("fontSizeInput").value||31,textX:+$("textXInput").value||325,
  shadow:$("shadowCheck").checked,stroke:$("strokeColorPicker").value||"#FFFFFF",strokeWidth:+$("strokeWidthInput").value||0
};}
function applyControls(c={}){
  if(c.name!=null)$("nameInput").value=c.name;if(c.group!=null)$("groupInput").value=c.group;
  if(c.element){$("elementColorPicker").value=c.element;const k=Object.keys(COLORS).find(x=>COLORS[x].toUpperCase()===c.element.toUpperCase());if(k)$("elementColorSelect").value=k;}
  if(c.text){$("textColorPicker").value=c.text;const k=Object.keys(COLORS).find(x=>COLORS[x].toUpperCase()===c.text.toUpperCase());if(k)$("textColorSelect").value=k;}
  setLinked("focusX",c.fx??50);setLinked("focusY",c.fy??50);setLinked("zoom",c.zoom??100);
  if(c.tracking!=null)$("trackingInput").value=c.tracking;if(c.fontSize!=null)$("fontSizeInput").value=c.fontSize;if(c.textX!=null)$("textXInput").value=c.textX;
  if(c.shadow!=null)$("shadowCheck").checked=!!c.shadow;if(c.stroke)$("strokeColorPicker").value=c.stroke;if(c.strokeWidth!=null)$("strokeWidthInput").value=c.strokeWidth;
  maybeFilename();queueRender();
}
function saveDefaults(){localStorage.setItem(STORAGE_KEY,JSON.stringify(controls()));setStatus("현재 설정을 이 브라우저의 기본값으로 저장했습니다.",false,true);}
function resetDefaults(){localStorage.removeItem(STORAGE_KEY);applyControls({name:"WONYOUNG",group:"",element:"#E7C68E",text:"#F5E5C2",fx:50,fy:50,zoom:100,tracking:4,fontSize:31,textX:325,shadow:true,stroke:"#FFFFFF",strokeWidth:1});setStatus("프로그램 기본값으로 되돌렸습니다.",false,true);}

function roundedPath(ctx,w,h,r=R){ctx.beginPath();ctx.moveTo(r,0);ctx.lineTo(w-r,0);ctx.quadraticCurveTo(w,0,w,r);ctx.lineTo(w,h-r);ctx.quadraticCurveTo(w,h,w-r,h);ctx.lineTo(r,h);ctx.quadraticCurveTo(0,h,0,h-r);ctx.lineTo(0,r);ctx.quadraticCurveTo(0,0,r,0);ctx.closePath();}
function drawCover(ctx,img,c){
  const z=Math.max(1,c.zoom/100),scale=Math.max(W/img.width,H/img.height)*z,dw=img.width*scale,dh=img.height*scale;
  const x=-(dw-W)*clamp(c.fx/100,0,1),y=-(dh-H)*clamp(c.fy/100,0,1);ctx.drawImage(img,x,y,dw,dh);
}
function heart(ctx,x,y,s,color){
  ctx.save();ctx.fillStyle=color;ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(x,y+s*.35);ctx.bezierCurveTo(x-s*.7,y-s*.2,x-s*.45,y-s*.85,x,y-s*.45);
  ctx.bezierCurveTo(x+s*.45,y-s*.85,x+s*.7,y-s*.2,x,y+s*.35);ctx.fill();ctx.restore();
}
function sparkle(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x,y+s);ctx.moveTo(x-s,y);ctx.lineTo(x+s,y);ctx.stroke();ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();ctx.restore();}
function bow(ctx,x,y,s,color){ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x-s*.2,y-s*.15,x-s*.55,y-s*.25,x-s*.62,y);ctx.bezierCurveTo(x-s*.55,y+s*.25,x-s*.18,y+s*.2,x,y);ctx.bezierCurveTo(x+s*.18,y+s*.2,x+s*.55,y+s*.25,x+s*.62,y);ctx.bezierCurveTo(x+s*.55,y-s*.25,x+s*.2,y-s*.15,x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x-3,y+4);ctx.lineTo(x-12,y+s*.75);ctx.moveTo(x+3,y+4);ctx.lineTo(x+12,y+s*.75);ctx.stroke();ctx.restore();}
function drawOverlay(ctx,color){
  ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2;
  for(const inset of [14,18]){roundedPath(ctx,W-2*inset,H-2*inset,26);ctx.translate(inset,inset);ctx.stroke();ctx.translate(-inset,-inset);}
  bow(ctx,50,42,28,color);heart(ctx,47,93,14,color);sparkle(ctx,72,42,8,color);
  heart(ctx,598,70,20,color);sparkle(ctx,618,96,8,color);
  heart(ctx,47,958,20,color);sparkle(ctx,31,912,8,color);
  heart(ctx,603,958,20,color);sparkle(ctx,619,912,8,color);
  bow(ctx,325,935,24,color);sparkle(ctx,178,902,10,color);sparkle(ctx,472,902,10,color);
  ctx.beginPath();ctx.moveTo(198,934);ctx.lineTo(300,934);ctx.moveTo(350,934);ctx.lineTo(452,934);ctx.stroke();
  ctx.restore();
}
function trackedWidth(ctx,text,tracking){let w=0;for(let i=0;i<text.length;i++){w+=ctx.measureText(text[i]).width;if(i<text.length-1)w+=tracking;}return w;}
function drawName(ctx,c){
  const text=String(c.name||"").trim();if(!text)return;ctx.save();let size=c.fontSize,tracking=c.tracking;
  while(size>22){ctx.font=`400 ${size}px "Times New Roman", Georgia, serif`;if(trackedWidth(ctx,text,tracking)<=380)break;if(tracking>1)tracking--;else size--;}
  ctx.font=`400 ${size}px "Times New Roman", Georgia, serif`;ctx.textBaseline="middle";ctx.textAlign="left";
  let w=trackedWidth(ctx,text,tracking),x=c.textX-w/2,y=903;
  if(c.shadow){ctx.shadowColor="rgba(0,0,0,.58)";ctx.shadowBlur=4;ctx.shadowOffsetX=2;ctx.shadowOffsetY=3;}
  ctx.fillStyle=c.text;ctx.strokeStyle=c.stroke;ctx.lineJoin="round";ctx.lineWidth=Math.max(0,c.strokeWidth*2);
  for(let i=0;i<text.length;i++){const ch=text[i];if(c.strokeWidth>0)ctx.strokeText(ch,x,y);ctx.fillText(ch,x,y);x+=ctx.measureText(ch).width+(i<text.length-1?tracking:0);}
  ctx.restore();
}
async function renderCanvas(canvas,img=photo,c=controls()){
  if(!img)return false;canvas.width=W;canvas.height=H;const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,W,H);ctx.save();roundedPath(ctx,W,H,R);ctx.clip();drawCover(ctx,img,c);ctx.restore();
  drawOverlay(ctx,c.element);drawName(ctx,c);return true;
}
function queueRender(){if(!photo||raf)return;raf=requestAnimationFrame(async()=>{raf=0;await renderCanvas($("previewCanvas"));});}
function setLinked(prefix,v){$(prefix+"Range").value=v;$(prefix+"Number").value=v;}
function bindRange(prefix,min,max){const r=$(prefix+"Range"),n=$(prefix+"Number");const f=(a,b)=>{const v=clamp(+a.value||0,min,max);b.value=v;queueRender();};r.addEventListener("input",()=>f(r,n));n.addEventListener("input",()=>f(n,r));}
function updateGuides(){
  $("centerGuide").style.display=$("centerGuideCheck").checked?"block":"none";$("faceGuide").style.display=$("faceGuideCheck").checked?"block":"none";
  const s=(+$("faceGuideRange").value||100)/100;$("faceGuide").style.width=(28*s)+"%";$("faceGuideValue").value=Math.round(s*100)+"%";
}
async function choosePhoto(file){if(!file)return;try{photo?.close?.();photo=await createImageBitmap(file,{imageOrientation:"from-image"});photoFile=file;$("previewStage").classList.add("has-image");$("previewHint").textContent=file.name;$("generateBtn").disabled=false;queueRender();setStatus("사진을 불러왔습니다. 드래그와 휠로 위치를 조정하세요.",false,true);}catch(e){setStatus("이미지 불러오기 실패: "+e.message,true);}}

function bindGestures(){
  const s=$("previewStage");s.addEventListener("pointerdown",e=>{if(!photo)return;s.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY};s.classList.add("dragging");});
  s.addEventListener("pointermove",e=>{if(!drag)return;const r=s.getBoundingClientRect();const dx=e.clientX-drag.x,dy=e.clientY-drag.y;setLinked("focusX",clamp((+$("focusXNumber").value||50)-dx*100/r.width,0,100).toFixed(1));setLinked("focusY",clamp((+$("focusYNumber").value||50)-dy*100/r.height,0,100).toFixed(1));drag={x:e.clientX,y:e.clientY};queueRender();});
  const end=()=>{drag=null;s.classList.remove("dragging");};s.addEventListener("pointerup",end);s.addEventListener("pointercancel",end);
  s.addEventListener("wheel",e=>{if(!photo)return;e.preventDefault();setLinked("zoom",clamp((+$("zoomNumber").value||100)+(e.deltaY<0?3:-3),100,500));queueRender();},{passive:false});
}
function canvasBlob(canvas){return new Promise((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error("PNG 생성 실패")),"image/png"));}
function downloadBlob(blob,name){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);}

function openDb(){return new Promise((res,rej)=>{const q=indexedDB.open(DB_NAME,1);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains(DB_STORE))q.result.createObjectStore(DB_STORE);};q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error);});}
async function storeHandle(h){const db=await openDb();await new Promise((res,rej)=>{const tx=db.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(h,DB_KEY);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});db.close();}
async function loadHandle(){try{const db=await openDb();const h=await new Promise((res,rej)=>{const tx=db.transaction(DB_STORE,"readonly"),q=tx.objectStore(DB_STORE).get(DB_KEY);q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error);});db.close();return h;}catch{return null;}}
async function permission(h,ask=true){if(!h)return false;const o={mode:"readwrite"};if(await h.queryPermission?.(o)==="granted")return true;return ask&&(await h.requestPermission?.(o)==="granted");}
function updateSavePath(){$("savePathStatus").textContent=saveDirectoryHandle?"저장 위치: "+saveDirectoryHandle.name:"저장 위치: 브라우저 기본 다운로드 폴더";}
async function chooseSaveDirectory(){if(!window.showDirectoryPicker){setStatus("이 브라우저는 저장 경로 지정 기능을 지원하지 않습니다.",true);return;}try{const h=await window.showDirectoryPicker({mode:"readwrite"});if(!await permission(h,true))return;saveDirectoryHandle=h;await storeHandle(h);updateSavePath();setStatus("저장 경로를 설정했습니다.",false,true);}catch(e){if(e.name!=="AbortError")setStatus("저장 경로 설정 실패: "+e.message,true);}}
async function saveBlob(blob,name){name=sanitizeFilename(name);if(saveDirectoryHandle&&await permission(saveDirectoryHandle,true)){try{const f=await saveDirectoryHandle.getFileHandle(name,{create:true}),w=await f.createWritable();await w.write(blob);await w.close();return "folder";}catch{}}downloadBlob(blob,name);return "download";}
async function saveCurrent(){if(!photo)return;const b=$("generateBtn");b.disabled=true;try{const c=document.createElement("canvas");await renderCanvas(c);const name=sanitizeFilename($("filenameInput").value,defaultFilename());await saveBlob(await canvasBlob(c),name);markSelectedDone();setStatus("650 × 1004 PNG 저장 완료",false,true);}catch(e){setStatus("저장 실패: "+e.message,true);}finally{b.disabled=false;}}

function ensureXlsx(){if(!window.XLSX)throw new Error("Excel 라이브러리가 로드되지 않았습니다.");}
function ensureZip(){if(!window.JSZip)throw new Error("ZIP 라이브러리가 로드되지 않았습니다.");}
function downloadSampleExcel(){
  try{ensureXlsx();const rows=[EXCEL_COLUMNS,["리본","","샴페인 골드","아이보리 골드","WONYOUNG","wonyoung.jpg","WONYOUNG_RIBBON.png"]];const ws=XLSX.utils.aoa_to_sheet(rows),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"입력");XLSX.writeFile(wb,"포카_일괄생성_샘플.xlsx");}catch(e){setBatchStatus(e.message,true);}
}
async function parseExcel(file){
  ensureXlsx();const wb=XLSX.read(await file.arrayBuffer(),{type:"array",raw:false});const ws=wb.Sheets[wb.SheetNames.includes("입력")?"입력":wb.SheetNames[0]],grid=XLSX.utils.sheet_to_json(ws,{header:1,defval:"",raw:false});
  let hi=-1,idx=[];for(let i=0;i<Math.min(20,grid.length);i++){const l=grid[i].map(v=>String(v).trim());if(EXCEL_COLUMNS.every(c=>l.includes(c))){hi=i;idx=EXCEL_COLUMNS.map(c=>l.indexOf(c));break;}}
  if(hi<0)throw new Error("필요한 열을 찾지 못했습니다: "+EXCEL_COLUMNS.join(" | "));
  const out=[];for(let r=hi+1;r<grid.length;r++){const row={};EXCEL_COLUMNS.forEach((c,i)=>row[c]=String(grid[r]?.[idx[i]]??"").trim());if(!EXCEL_COLUMNS.some(c=>row[c]))continue;out.push({excelRow:r+1,row});}return out;
}
function normalize(s){return String(s||"").replaceAll("\\","/").replace(/^\.\//,"").toLowerCase();}
function findImage(name){const n=normalize(name);if(!n)return null;let a=batchImageFiles.filter(f=>normalize(f.webkitRelativePath||f.name).endsWith(n));if(a.length===1)return a[0];const base=n.split("/").pop();a=batchImageFiles.filter(f=>f.name.toLowerCase()===base);return a.length===1?a[0]:null;}
async function prepareBatch(){
  const ex=$("excelInput").files?.[0];batchImageFiles=[...($("imageFolderInput").files||[])];batchRows=[];$("batchBtn").disabled=true;
  if(!ex||!batchImageFiles.length){setBatchStatus("Excel과 이미지 폴더를 모두 선택하세요.");return;}
  try{batchRows=(await parseExcel(ex)).map(x=>({...x,state:"ready",message:""}));renderBatchTable();$("batchBtn").disabled=!batchRows.length;setBatchStatus(batchRows.length+"개 행을 읽었습니다.",false,true);}catch(e){setBatchStatus("Excel 읽기 실패: "+e.message,true);}
}
function renderBatchTable(){const body=batchRows.map(x=>`<tr class="${x.state}"><td>${x.excelRow}</td><td>${esc(x.row["이름"])}</td><td>${esc(x.row["이미지명"])}</td><td>${esc(x.row["저장파일명"])}</td><td>${esc(x.message||x.state)}</td></tr>`).join("");$("batchTableWrap").innerHTML=`<table class="batch-table"><thead><tr><th>행</th><th>이름</th><th>이미지</th><th>저장파일명</th><th>상태</th></tr></thead><tbody>${body}</tbody></table>`;}
async function runBatch(){
  if(!batchRows.length)return;$("batchBtn").disabled=true;try{ensureZip();const zip=new JSZip();let ok=0,fail=0;
    for(let i=0;i<batchRows.length;i++){const item=batchRows[i],r=item.row;try{
      setBatchStatus(`${i+1} / ${batchRows.length} 생성 중 · ${r["이름"]}`);
      const f=findImage(r["이미지명"]);if(!f)throw new Error("이미지를 찾을 수 없음: "+r["이미지명"]);const bmp=await createImageBitmap(f,{imageOrientation:"from-image"});
      const base=controls(),c={...base,name:r["이름"]||base.name,group:r["그룹"]||"",element:hex(r["요소 컬러"]||base.element),text:hex(r["텍스트 컬러"]||base.text)};
      const cv=document.createElement("canvas");await renderCanvas(cv,bmp,c);bmp.close?.();const blob=await canvasBlob(cv);zip.file(sanitizeFilename(r["저장파일명"],(r["이름"]||"card")+"_RIBBON_V1_650x1004.png"),blob);
      item.state="done";item.message="완료";ok++;
    }catch(e){item.state="error";item.message=e.message;fail++;}renderBatchTable();}
    if(!ok)throw new Error("성공한 포토카드가 없습니다.");downloadBlob(await zip.generateAsync({type:"blob",compression:"DEFLATE"}),`포토카드_일괄생성_${new Date().toISOString().slice(0,10)}.zip`);setBatchStatus(`완료: ${ok}개 성공${fail?` · ${fail}개 실패`:""}`,!!fail,!fail);
  }catch(e){setBatchStatus("일괄 생성 실패: "+e.message,true);}finally{$("batchBtn").disabled=false;}
}

function filteredRows(){return excelRows.filter(x=>EXCEL_COLUMNS.every(c=>!excelFilters[c]||String(x.row[c]??"")===excelFilters[c]));}
function filterOptions(c){return[...new Set(excelRows.map(x=>String(x.row[c]??"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ko-KR",{numeric:true}));}
function renderExcelHead(){
  const head=$("excelDataHead"),top=`<tr class="excel-sort-row">${EXCEL_COLUMNS.map(c=>`<th data-col="${esc(c)}">${esc(c)}${c===excelSort?(excelDesc?" ▼":" ▲"):""}</th>`).join("")}</tr>`;
  const filters=`<tr class="excel-filter-row">${EXCEL_COLUMNS.map(c=>`<th><select data-filter="${esc(c)}"><option value="">전체</option>${filterOptions(c).map(v=>`<option value="${esc(v)}" ${v===excelFilters[c]?"selected":""}>${esc(v)}</option>`).join("")}</select></th>`).join("")}</tr>`;
  head.innerHTML=top+filters;head.querySelectorAll("[data-col]").forEach(th=>th.onclick=()=>sortExcel(th.dataset.col));head.querySelectorAll("[data-filter]").forEach(s=>s.onchange=e=>{excelFilters[e.target.dataset.filter]=e.target.value;renderExcelBody();updateExcelStatus();});
}
function renderExcelBody(){
  const b=$("excelDataBody"),rows=filteredRows();if(!rows.length){b.innerHTML=`<tr><td colspan="7">불러온 엑셀 데이터가 없습니다.</td></tr>`;return;}
  b.innerHTML=rows.map(x=>`<tr data-id="${x.id}" class="${x.done?"done":""} ${x.id===selectedExcelId?"selected":""}">${EXCEL_COLUMNS.map(c=>`<td>${esc(x.row[c])}</td>`).join("")}</tr>`).join("");
  b.querySelectorAll("tr[data-id]").forEach(tr=>{tr.onclick=()=>selectExcel(tr.dataset.id);tr.ondblclick=e=>{e.preventDefault();toggleDone(tr.dataset.id);};});
}
function updateExcelStatus(msg=""){if(msg){$("excelDataStatus").textContent=msg;return;}$("excelDataStatus").textContent=`표시 ${filteredRows().length}/${excelRows.length}행 · 완료 ${excelRows.filter(x=>x.done).length}행`;}
function sortExcel(c){if(excelSort===c)excelDesc=!excelDesc;else{excelSort=c;excelDesc=true;}excelRows.sort((a,b)=>{const n=String(a.row[c]??"").localeCompare(String(b.row[c]??""),"ko-KR",{numeric:true});return excelDesc?-n:n;});renderExcelHead();renderExcelBody();updateExcelStatus();}
function selectExcel(id){const x=excelRows.find(v=>v.id===id);if(!x)return;selectedExcelId=id;renderExcelBody();const r=x.row;$("nameInput").value=r["이름"]||$("nameInput").value;$("groupInput").value=r["그룹"]||"";if(r["요소 컬러"]){$("elementColorPicker").value=hex(r["요소 컬러"]);pickerToSelect("element");}if(r["텍스트 컬러"]){$("textColorPicker").value=hex(r["텍스트 컬러"]);pickerToSelect("text");}filenameEdited=!!r["저장파일명"];$("filenameInput").value=r["저장파일명"]?sanitizeFilename(r["저장파일명"]):defaultFilename();queueRender();updateExcelStatus("설정 적용: "+(r["이름"]||"선택 행"));}
function toggleDone(id){const x=excelRows.find(v=>v.id===id);if(x){x.done=!x.done;renderExcelBody();updateExcelStatus();}}
function markSelectedDone(){const x=excelRows.find(v=>v.id===selectedExcelId);if(x){x.done=true;renderExcelBody();updateExcelStatus();}}
async function loadExcelPanel(file){if(!file)return;try{excelRows=(await parseExcel(file)).map((x,i)=>({id:"x"+x.excelRow+"_"+i,...x,done:false}));excelSort=null;excelDesc=false;selectedExcelId=null;excelFilters=Object.fromEntries(EXCEL_COLUMNS.map(c=>[c,""]));renderExcelHead();renderExcelBody();$("excelDataHint").textContent=`${file.name} · ${excelRows.length}행 불러옴 · 클릭=설정 적용 / 더블클릭=완료 토글`;updateExcelStatus();}catch(e){updateExcelStatus("엑셀 데이터 불러오기 실패: "+e.message);}}
function saveExcelProgress(){localStorage.setItem(EXCEL_PROGRESS_KEY,JSON.stringify({rows:excelRows,selectedExcelId,excelSort,excelDesc,excelFilters,hint:$("excelDataHint").textContent}));updateExcelStatus("진행 상태를 이 브라우저에 저장했습니다.");}
function restoreExcelProgress(){try{const p=JSON.parse(localStorage.getItem(EXCEL_PROGRESS_KEY)||"null");if(!p?.rows?.length)return;excelRows=p.rows;selectedExcelId=p.selectedExcelId||null;excelSort=p.excelSort||null;excelDesc=!!p.excelDesc;excelFilters={...Object.fromEntries(EXCEL_COLUMNS.map(c=>[c,""])),...(p.excelFilters||{})};$("excelDataHint").textContent=p.hint||"저장된 작업 상태 복원";renderExcelHead();renderExcelBody();updateExcelStatus("이전 작업 상태를 복원했습니다.");}catch{}}

function bind(){
  bindRange("focusX",0,100);bindRange("focusY",0,100);bindRange("zoom",100,500);bindGestures();
  $("photoInput").onchange=e=>choosePhoto(e.target.files?.[0]);$("nameInput").oninput=()=>{maybeFilename();queueRender();};$("groupInput").oninput=queueRender;
  $("elementColorSelect").onchange=()=>{syncPicker("element");queueRender();};$("textColorSelect").onchange=()=>{syncPicker("text");queueRender();};
  $("elementColorPicker").oninput=()=>pickerToSelect("element");$("textColorPicker").oninput=()=>pickerToSelect("text");
  ["trackingInput","fontSizeInput","textXInput","shadowCheck","strokeColorPicker","strokeWidthInput"].forEach(id=>$(id).oninput=queueRender);
  $("resetCropBtn").onclick=()=>{setLinked("focusX",50);setLinked("focusY",50);setLinked("zoom",100);queueRender();};
  $("resetTextBtn").onclick=()=>{Object.assign($("trackingInput"),{value:4});$("fontSizeInput").value=31;$("textXInput").value=325;$("shadowCheck").checked=true;$("strokeColorPicker").value="#FFFFFF";$("strokeWidthInput").value=1;queueRender();};
  ["centerGuideCheck","faceGuideCheck","faceGuideRange"].forEach(id=>$(id).oninput=updateGuides);
  $("filenameInput").oninput=()=>filenameEdited=true;$("generateBtn").onclick=saveCurrent;$("savePathBtn").onclick=chooseSaveDirectory;
  $("saveDefaultsBtn").onclick=saveDefaults;$("resetDefaultsBtn").onclick=resetDefaults;$("sampleExcelBtn").onclick=downloadSampleExcel;
  $("excelInput").onchange=prepareBatch;$("imageFolderInput").onchange=prepareBatch;$("batchBtn").onclick=runBatch;
  $("excelDataLoadBtn").onclick=()=>$("excelDataInput").click();$("excelDataInput").onchange=e=>loadExcelPanel(e.target.files?.[0]);$("excelProgressSaveBtn").onclick=saveExcelProgress;
}
async function init(){
  populateColors();bind();updateGuides();renderExcelHead();renderExcelBody();restoreExcelProgress();
  const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(saved)applyControls(saved);else maybeFilename(true);
  saveDirectoryHandle=await loadHandle();updateSavePath();setStatus("준비 완료. 사진을 선택하세요.",false,true);
}
init();