import {NextRequest,NextResponse} from 'next/server';
import {createSession,verifySession,createMission,getMission,stopMission,listPublicOffers,getHealth,readPurchasedReport,requestCustomAnalysis,getResearchWallet} from '../../../../../packages/server/index';
import {validateOrganizerSource,getOrganizerInventory,saveOrganizerPolicy} from '../../../../../packages/server/organizer';
import {getSellerHistory} from '../../../../../packages/server/history';
import {EVENTS,SPORT_PACKS,getEvent,getSportPack} from '../../../../../packages/sports/src/index';
export const runtime='nodejs';export const dynamic='force-dynamic';
const cookie='sportproof_session';
function response(data:unknown,status=200){return NextResponse.json(data,{status,headers:{'Cache-Control':'private, no-store, max-age=0','X-Content-Type-Options':'nosniff'}})}
async function dispatch(req:NextRequest,ctx:{params:Promise<{path:string[]}>}){
 try{const {path}=await ctx.params;
 if(req.method==='POST'){
  const origin=req.headers.get('origin');const expected=process.env.APP_BASE_URL?new URL(process.env.APP_BASE_URL).origin:req.nextUrl.origin;
  if(origin!==expected)return response({error:'Request origin is not authorized'},403);
  if(Number(req.headers.get('content-length')??0)>16_384)return response({error:'Request too large'},413);
 }
 if(req.method==='GET'&&path[0]==='seller-history')return response(await getSellerHistory({sportId:req.nextUrl.searchParams.get('sport')??undefined}));
 if(path[0]==='health')return response(await getHealth());
 if(req.method==='GET'&&path[0]==='sports')return response(path[1]?getSportPack(path[1]):SPORT_PACKS);
 if(req.method==='GET'&&path[0]==='events')return response(path[1]?(path[2]==='topology'?{zones:getEvent(path[1]).zones,blocks:getEvent(path[1]).blocks}:getEvent(path[1])):EVENTS);
 let principal=await verifySession(req.cookies.get(cookie)?.value);
 if(req.method==='GET'&&path[0]==='offers')return response(await listPublicOffers(principal??undefined));
 let newToken:string|undefined;
 if(!principal&&req.method==='POST'&&path[0]==='missions'&&path.length===1){const session=await createSession();principal=session.principal;newToken=session.token;}
 if(!principal)return response({error:'Buyer authentication required'},401);
 let body:unknown={};if(req.method==='POST'){const raw=await req.text();if(raw.length>16_384)return response({error:'Request too large'},413);body=JSON.parse(raw)}
 let data:unknown;
 if(path[0]==='wallet'&&req.method==='GET')data=await getResearchWallet(principal);
 else if(path[0]==='missions'&&req.method==='POST'&&path.length===1)data=await createMission(principal,body);
 else if(path[0]==='missions'&&path[1]&&req.method==='GET')data=await getMission(principal,path[1]);
 else if(path[0]==='missions'&&path[1]&&path[2]==='stop'&&req.method==='POST')data=await stopMission(principal,path[1]);
 else if(path[0]==='market-orders'&&path[1]&&path[2]==='report'&&req.method==='GET')data=await readPurchasedReport(principal,path[1]);
 else if(path[0]==='custom-requests'&&req.method==='POST')data=await requestCustomAnalysis(principal,body);
 else if(path[0]==='organizer'&&path[1]==='validate'&&req.method==='POST')data=await validateOrganizerSource(principal,body);
 else if(path[0]==='organizer'&&path[1]==='policy'&&req.method==='POST')data=await saveOrganizerPolicy(principal,body);
 else if(path[0]==='organizer'&&path[1]==='inventory'&&req.method==='GET')data=await getOrganizerInventory(principal,req.nextUrl.searchParams.get('eventId')??'');
 else return response({error:'Route not found'},404);
 const res=response(data);if(newToken)res.cookies.set(cookie,newToken,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:604800});return res;
 }catch(error){const e=error as Error;const safe=/authorization|not found|not configured|missing|budget|scope|capabilit|requires|limit|unsupported|not answerable|confirmation|not purchased|not ready|origin|only|invalid|unavailable|rejected|cannot use model|key check failed/i.test(e.message);return response({error:safe?e.message:'The request could not be completed. Check service readiness.'},400)}
}
export const GET=dispatch;export const POST=dispatch;
