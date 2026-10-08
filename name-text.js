// Shared by the editor, PNG/batch exports and the visual QA page.
// x/y identify the visible ink centre, not the font's em-box centre.
export function drawNameText(ctx,c,{
  x=c.textX,y=c.textY??903,maxWidth=380,maxHeight=Infinity,
  size=c.fontSize,font=c.font,family=`"${font}",sans-serif`,
  fill=c.text,stroke=c.stroke,shadow=c.shadow,align="center",angle=0
}={}){
  const chars=Array.from(String(c.name||"").trim());if(!chars.length)return null;
  ctx.save();ctx.textAlign="left";ctx.textBaseline="alphabetic";
  let fs=Math.max(1,Number(size)||31),spacing=Number(c.tracking)||0;
  const outline=Math.max(0,Number(c.strokeWidth)||0);
  const effects=outline+(shadow?6:0);
  const availableWidth=Math.max(1,maxWidth-effects*2),availableHeight=Math.max(1,maxHeight-effects*2);
  const measure=()=>{
    ctx.font=`400 ${fs}px ${family}`;
    let advance=0,left=Infinity,right=-Infinity,ascent=-Infinity,descent=-Infinity;
    const glyphs=chars.map((ch,i)=>{
      const m=ctx.measureText(ch),a=Number.isFinite(m.actualBoundingBoxAscent)?m.actualBoundingBoxAscent:fs*.8,d=Number.isFinite(m.actualBoundingBoxDescent)?m.actualBoundingBoxDescent:fs*.2;
      const l=Number.isFinite(m.actualBoundingBoxLeft)?m.actualBoundingBoxLeft:0,r=Number.isFinite(m.actualBoundingBoxRight)?m.actualBoundingBoxRight:m.width;
      left=Math.min(left,advance-l);right=Math.max(right,advance+r);ascent=Math.max(ascent,a);descent=Math.max(descent,d);
      const glyph={ch,x:advance};advance+=m.width+(i<chars.length-1?spacing:0);return glyph
    });
    return {glyphs,left,right,ascent,descent,width:right-left,height:ascent+descent}
  };
  let m=measure();
  while(m.width>availableWidth&&spacing>0){spacing=Math.max(0,spacing-1);m=measure()}
  while((m.width>availableWidth||m.height>availableHeight)&&fs>1){fs=Math.max(1,fs-1);m=measure()}
  const dx=align==="left"?-m.left:align==="right"?-m.right:-(m.left+m.right)/2;
  const baseline=(m.ascent-m.descent)/2;
  ctx.translate(x,y);ctx.rotate(angle);
  if(shadow){ctx.shadowColor="rgba(0,0,0,.48)";ctx.shadowBlur=4;ctx.shadowOffsetX=1.5;ctx.shadowOffsetY=2.5}
  ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineJoin="round";ctx.lineWidth=outline*2;
  for(const g of m.glyphs){if(outline>0)ctx.strokeText(g.ch,dx+g.x,baseline);ctx.fillText(g.ch,dx+g.x,baseline)}
  ctx.restore();
  return {x,y,angle,fontSize:fs,tracking:spacing,width:m.width,height:m.height,top:y-m.height/2,bottom:y+m.height/2}
}
