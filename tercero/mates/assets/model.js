'use strict';
window.MatesModel=(()=>{
  const integer=value=>/^\d+$/.test(String(value).trim().replace(/[.\s]/g,''))?Number(String(value).trim().replace(/[.\s]/g,'')):null;
  function operationMatches(text,step){
    const parts=String(text).replace(/\s/g,'').replace(/[−–]/g,'-').split('=');
    if(parts.length>2||!/^\d+(?:[+-]\d+)+$/.test(parts[0]))return false;
    const nums=parts[0].split(/[+-]/).map(Number),ops=parts[0].match(/[+-]/g);
    const wanted=step.op==='−'?'-':'+';
    if(ops.some(o=>o!==wanted)||nums.length!==step.operands.length)return false;
    const actual=wanted==='+'?[...nums].sort((a,b)=>a-b):nums;
    const expected=wanted==='+'?[...step.operands].sort((a,b)=>a-b):step.operands;
    if(actual.some((n,i)=>n!==expected[i]))return false;
    return parts.length===1||(integer(parts[1])===step.answer);
  }
  const expression=step=>step.operands.join(` ${step.op} `);
  function subtractionSteps(a,b){
    const width=String(a).length,top=String(a).padStart(width,'0').split('').reverse().map(Number),bottom=String(b).padStart(width,'0').split('').reverse().map(Number),lines=[];
    const names=['unidad','decena','centena','unidad de millar'],plurals=['unidades','decenas','centenas','unidades de millar'];
    for(let i=0;i<width;i++){
      if(top[i]<bottom[i]){
        let j=i+1;while(top[j]===0)j++;
        for(;j>i;j--){top[j]--;top[j-1]+=10;lines.push(`Cambia 1 ${names[j]} por 10 ${plurals[j-1]}.`);}
      }
      lines.push(`${['Unidades','Decenas','Centenas','Millares'][i]}: ${top[i]} − ${bottom[i]} = ${top[i]-bottom[i]}.`);
    }
    lines.push(`Comprueba: ${a-b} + ${b} = ${a}.`);return lines;
  }
  function additionSteps(nums){let carry=0,lines=[],width=Math.max(...nums).toString().length;for(let i=0;i<width;i++){const ds=nums.map(n=>Math.floor(n/10**i)%10);const sum=ds.reduce((a,b)=>a+b,0)+carry;lines.push(`${['Unidades','Decenas','Centenas','Millares'][i]}: ${ds.join(' + ')}${carry?` + ${carry} de llevada`:''} = ${sum}. Escribe ${sum%10}${sum>=10?` y lleva ${Math.floor(sum/10)}`:''}.`);carry=Math.floor(sum/10);}if(carry)lines.push(`Escribe la llevada ${carry} a la izquierda.`);return lines;}
  const clockAngles=(hour,minute)=>({hour:(hour%12)*30+minute/2,minute:minute*6});
  const clockWords=(hour,minute)=>{const names=['doce','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce'];const h=minute===45?hour%12+1:hour;return `${h===1?'la':'las'} ${names[h]} ${minute===0?'en punto':minute===15?'y cuarto':minute===30?'y media':'menos cuarto'}`;};
  function clockSvg(hour,minute){const angle=clockAngles(hour,minute);const marks=Array.from({length:60},(_,i)=>{const r=i%5?110:106,a=i*Math.PI/30;return `<line x1="${140+Math.sin(a)*r}" y1="${140-Math.cos(a)*r}" x2="${140+Math.sin(a)*115}" y2="${140-Math.cos(a)*115}" stroke="#66527e" stroke-width="${i%5?1:3}"/>`;}).join('');const numbers=Array.from({length:12},(_,i)=>{const n=i+1,a=n*Math.PI/6;return `<text x="${140+Math.sin(a)*88}" y="${140-Math.cos(a)*88+8}" text-anchor="middle" fill="#33244a" font-size="23" font-family="sans-serif">${n}</text>`;}).join('');return `<svg class="clock-svg" viewBox="0 0 280 280" role="img" aria-label="Reloj analógico con aguja corta de horas y larga de minutos"><circle cx="140" cy="140" r="125" fill="#fffef9" stroke="#7651a5" stroke-width="7"/>${marks}${numbers}<line x1="140" y1="140" x2="140" y2="80" stroke="#bd623b" stroke-width="9" stroke-linecap="round" transform="rotate(${angle.hour} 140 140)"/><line x1="140" y1="140" x2="140" y2="44" stroke="#087e95" stroke-width="6" stroke-linecap="round" transform="rotate(${angle.minute} 140 140)"/><circle cx="140" cy="140" r="7" fill="#33244a"/></svg>`;}
  function polygonPoints(kind){const regular=n=>Array.from({length:n},(_,i)=>[180+90*Math.sin(i*2*Math.PI/n),135-90*Math.cos(i*2*Math.PI/n)]);return {rectangle:[[70,60],[290,60],[290,210],[70,210]],square:[[105,60],[255,60],[255,210],[105,210]],triangle:[[180,40],[290,210],[70,210]],rhombus:[[180,30],[250,135],[180,240],[110,135]],trapezoid:[[120,60],[240,60],[295,210],[65,210]],house:[[180,30],[290,100],[290,210],[70,210],[70,100]],pentagon:regular(5),hexagon:regular(6)}[kind];}
  function shapeSvg(kind,sides){if(kind==='circle')return '<svg class="shape-svg" viewBox="0 0 360 270" role="img" aria-label="Figura de borde curvo"><circle cx="180" cy="135" r="90" fill="#eee5fa" stroke="#7651a5" stroke-width="4"/></svg>';const points=polygonPoints(kind);let labels='';if(sides)labels=points.map((p,i)=>{const next=points[(i+1)%points.length],mx=(p[0]+next[0])/2,my=(p[1]+next[1])/2,dist=Math.hypot(mx-180,my-135)||1;return `<text x="${mx+(mx-180)/dist*22}" y="${my+(my-135)/dist*22+7}" text-anchor="middle" font-size="22" fill="#33244a" font-family="sans-serif">${sides[i]}</text>`;}).join('');return `<svg class="shape-svg" viewBox="0 0 360 275" role="img" aria-label="Figura geométrica${sides?', con la medida de cada lado escrita junto al borde':''}"><polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="#eee5fa" stroke="#7651a5" stroke-width="4"/>${labels}</svg>`;}
  return {integer,operationMatches,expression,subtractionSteps,additionSteps,clockAngles,clockWords,clockSvg,polygonPoints,shapeSvg};
})();
