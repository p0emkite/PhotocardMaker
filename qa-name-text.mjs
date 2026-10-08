import assert from 'node:assert/strict';
import {drawNameText} from './name-text.js';
import {getTemplateList,getTemplate,migrateNamePosition,NAME_LAYOUT_VERSION} from './templates.js';

// Predictable glyph metrics reproduce the Pacifico-style descender regression.
function context(){
  const calls=[];const ctx={calls,font:'',save(){},restore(){},translate(x,y){calls.push(['origin',x,y])},rotate(a){calls.push(['angle',a])},
    measureText(ch){const size=Number.parseFloat(this.font.split(' ')[1]),scale=size/20;return {width:12*scale,actualBoundingBoxLeft:2*scale,actualBoundingBoxRight:11*scale,actualBoundingBoxAscent:10*scale,actualBoundingBoxDescent:(/[gypj]/.test(ch)?6:0)*scale}},
    fillText(ch,x,y){calls.push(['fill',ch,x,y])},strokeText(ch,x,y){calls.push(['stroke',ch,x,y])}
  };return ctx
}
const settings={name:'ABC',font:'Test',fontSize:20,tracking:0,textX:325,textY:891,strokeWidth:0,shadow:false,text:'#fff'};
let ctx=context();drawNameText(ctx,settings);assert.equal(ctx.calls.find(c=>c[0]==='fill')[3],5,'Capital ink must straddle y, not the font em-box');
ctx=context();drawNameText(ctx,{...settings,name:'gyp'});assert.equal(ctx.calls.find(c=>c[0]==='fill')[3],2,'Descenders must be included in vertical centring');
ctx=context();const long=drawNameText(ctx,{...settings,name:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',tracking:4},{maxWidth:90,maxHeight:12});assert(long.width<=90&&long.height<=12,'Long names must fit both dimensions');
ctx=context();assert.equal(drawNameText(ctx,{...settings,name:'  '}),null);assert.equal(ctx.calls.length,0);
ctx=context();drawNameText(ctx,{...settings,textX:200,textY:750},{angle:-.2});assert.deepEqual(ctx.calls[0],['origin',200,750]);assert.deepEqual(ctx.calls[1],['angle',-.2]);
for(const t of getTemplateList()){
  const a=t.nameArea;assert(a&&a.width>0&&a.height>0,`${t.id}: missing safe area`);
  assert.equal(t.defaults.textX,a.x);assert.equal(t.defaults.textY,a.y);
  const dx=(Math.abs(Math.cos(a.angle))*a.width+Math.abs(Math.sin(a.angle))*a.height)/2;
  const dy=(Math.abs(Math.sin(a.angle))*a.width+Math.abs(Math.cos(a.angle))*a.height)/2;
  assert(a.x-dx>=0&&a.x+dx<=650&&a.y-dy>=0&&a.y+dy<=1004,`${t.id}: rotated name area crosses card edge`);
  const migrated=migrateNamePosition(t.id,{...t.legacyNamePosition,font:'Custom',element:'#123456'});
  assert.equal(migrated.textX,a.x);assert.equal(migrated.textY,a.y);assert.equal(migrated.font,'Custom');assert.equal(migrated.element,'#123456');
  const custom=migrateNamePosition(t.id,{textX:201,textY:701});assert.equal(custom.textX,201);assert.equal(custom.textY,701);
  const versioned=migrateNamePosition(t.id,{...t.legacyNamePosition,nameLayoutVersion:NAME_LAYOUT_VERSION});assert.equal(versioned.textY,t.legacyNamePosition.textY,'New custom positions must never be migrated twice');
}
// Independent plate geometry catches a recurrence of the reported vertical offsets.
for(const [id,top,height] of [['candy_pop',853,76],['chrome',834,108],['arcade',832,92],['teddy_bear',846,98],['rising_star',840,106],['glass_acrylic',854,84]]){
  assert.equal(getTemplate(id).defaults.textY,top+height/2,`${id}: name is not at the plate centre`)
}
assert.equal(getTemplate('editorial').defaults.textX,366+266/2);
console.log('PASS — ink centring, descenders, fit, custom coordinates, 47 name areas and saved-position migration.');
