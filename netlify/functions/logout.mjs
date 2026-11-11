import {json} from './_shared.mjs';
export default async request=>request.method==='POST'?json({ok:true},200,{'set-cookie':'tricots_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'}):json({error:'Méthode non permise'},405);
