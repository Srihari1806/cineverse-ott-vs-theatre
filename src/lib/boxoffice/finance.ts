export function calculateScenario(v:{production:number;marketing:number;distribution:number;gross:number;share:number;digital:number;satellite:number;other:number}) {
  if(Object.values(v).some(n=>!Number.isFinite(n)||n<0)||v.share>100)throw new Error('Invalid scenario assumptions');
  const cost=v.production+v.marketing+v.distribution;
  const rights=v.digital+v.satellite+v.other;
  const revenue=v.gross*v.share/100+rights;
  const profit=revenue-cost;
  return {cost,rights,revenue,profit,roi:cost?profit/cost*100:null,breakEvenGross:v.share?Math.max(0,cost-rights)/(v.share/100):null};
}
