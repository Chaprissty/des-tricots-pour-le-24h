import {getStore} from '@netlify/blobs';
import {createHmac,timingSafeEqual} from 'node:crypto';
export const store=()=>getStore('tricots-produits');
export const defaults=[
{id:'annette',prenom:'Annette',description:'Tuque tricotée à la main en laine mérinos biologique.',photo:'/photos/Annette.jpg',vendue:false},
{id:'colette',prenom:'Colette',description:'Tuque tricotée à la main en laine mérinos biologique.',photo:'/photos/Colette.jpg',vendue:false},
{id:'odette',prenom:'Odette',description:'Tuque tricotée à la main en laine mérinos biologique.',photo:'/photos/Odette.jpg',vendue:false}
];
export async function readProducts(){return await store().get('catalogue',{type:'json',consistency:'strong'})??defaults;}
export function json(data,status=200,headers={}){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}})}
function sign(value){return createHmac('sha256',process.env.ADMIN_SECRET||'').update(value).digest('hex')}
export function isAdmin(request){if(!process.env.ADMIN_SECRET||!process.env.ADMIN_PASSWORD)return false;const cookie=request.headers.get('cookie')||'';const token=cookie.match(/(?:^|;\s*)tricots_session=([^;]+)/)?.[1];if(!token)return false;const [expiry,signature]=token.split('.');if(!expiry||!signature||Number(expiry)<Date.now())return false;const expected=sign(expiry);return signature.length===expected.length&&timingSafeEqual(Buffer.from(signature),Buffer.from(expected));}
export function sessionCookie(){const expiry=String(Date.now()+7*24*60*60*1000);return `tricots_session=${expiry}.${sign(expiry)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`}
export const forbidden=()=>json({error:'Accès administrateur requis.'},401);
