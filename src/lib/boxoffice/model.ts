import { z } from 'zod';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v);
export const reportInput = z.object({
  tmdbId: z.number().int().positive(), imdbId: z.string().regex(/^tt\d+$/).nullable(),
  sourceName: z.string().trim().min(1).max(160), sourceUrl: z.string().url().refine(v => ['http:', 'https:'].includes(new URL(v).protocol)),
  reportDate: date.nullable(), period: z.enum(['daily','weekend','cumulative','lifetime']),
  periodStart: date.nullable(), periodEnd: date.nullable(),
  territory: z.string().trim().min(1).max(80), currency: z.string().regex(/^[A-Z]{3}$/),
  classification: z.enum(['gross','net','distributor_share','producer_share']),
  amount: z.number().finite().nonnegative().nullable(), reportingStatus: z.enum(['reported','estimated','unknown']),
  notes: z.string().max(2000).default(''),
}).refine(v => !v.periodStart || !v.periodEnd || v.periodStart <= v.periodEnd, 'Invalid period');
export type ReportInput = z.infer<typeof reportInput>;
export type Report = ReportInput & {id:string; provider:string; retrievedAt:string; approval:'pending'|'approved'|'rejected'; revision:number};
export function scope(r:ReportInput) { return JSON.stringify([r.tmdbId,r.period,r.periodStart,r.periodEnd,r.territory,r.currency,r.classification]); }
export function fingerprint(r:ReportInput) { return JSON.stringify([scope(r),r.sourceName,r.sourceUrl,r.reportDate,r.amount,r.reportingStatus]); }
export function conflicts(r:Report, all:Report[]) { return all.filter(x => x.id !== r.id && x.approval !== 'rejected' && scope(x) === scope(r) && x.reportDate === r.reportDate && x.amount !== r.amount).map(x=>x.id); }
export function scenarioGross(r:Report) {
  if(r.approval !== 'approved' || r.classification !== 'gross' || r.territory !== 'Worldwide' || r.currency !== 'INR' || !['cumulative','lifetime'].includes(r.period) || r.amount === null) throw new Error('Select an approved worldwide INR cumulative/lifetime gross. No automatic FX or territory aggregation.');
  return r.amount / 1e7;
}
// RFC4180 quoted fields, embedded newlines and CRLF. No spreadsheet formula evaluation.
export function parseCsv(text:string): Record<string,string>[] {
  const rows:string[][]=[]; let row:string[]=[], cell='', quoted=false;
  for(let i=0;i<text.length;i++){const c=text[i]; if(c==='"'){if(quoted && text[i+1]==='"'){cell+='"';i++;}else if(quoted || !cell){quoted=!quoted;}else throw new Error('Malformed CSV quote');}
    else if(c===',' && !quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}
  if(quoted)throw new Error('Unclosed CSV quote');row.push(cell);if(row.some(Boolean))rows.push(row);
  const headers=rows.shift()?.map(h=>h.replace(/^\uFEFF/,'').trim());if(!headers || new Set(headers).size!==headers.length)throw new Error('Missing or duplicate headers');
  return rows.map((r,i)=>{if(r.length!==headers.length)throw new Error(`Column count mismatch on row ${i+2}`);return Object.fromEntries(headers.map((h,j)=>[h,r[j]??'']));});
}
