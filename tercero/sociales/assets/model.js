'use strict';
window.SocialesModel=(()=>{
  const sameSet=(a,b)=>Array.isArray(a)&&a.length===b.length&&new Set(a).size===a.length&&a.every(v=>b.includes(v));
  function grade(q,response){
    if(['choice','fill','hotspot'].includes(q.type))return {ready:response!==null&&response!==undefined,ok:response===q.answer};
    if(q.type==='multi')return {ready:Array.isArray(response)&&response.length>0,ok:sameSet(response,q.answer)};
    if(q.type==='sort'){const ready=!!response&&q.items.every((_,i)=>q.groups.includes(response[i]));return {ready,ok:ready&&q.items.every((item,i)=>response[i]===item.group)};}
    if(q.type==='pairs'){const ready=Array.isArray(response)&&response.length===q.pairs.length&&response.every(v=>typeof v==='string')&&new Set(response).size===q.pairs.length;return {ready,ok:ready&&q.pairs.every((p,i)=>response[i]===p.right)};}
    throw Error('Tipo de actividad desconocido: '+q.type);
  }
  function expected(q){if(q.type==='sort')return Object.fromEntries(q.items.map((item,i)=>[i,item.group]));if(q.type==='pairs')return q.pairs.map(p=>p.right);return q.answer;}
  function describe(q){if(q.type==='sort')return q.items.map(i=>`${i.text} → ${i.group}`).join('; ');if(q.type==='pairs')return q.pairs.map(p=>`${p.left} → ${p.right}`).join('; ');if(q.type==='multi')return q.answer.join('; ');return q.explanation;}
  return {sameSet,grade,expected,describe};
})();
