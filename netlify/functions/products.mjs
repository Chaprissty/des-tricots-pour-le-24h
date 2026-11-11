import {readProducts,json} from './_shared.mjs';
export default async ()=>{try{return json({products:await readProducts()})}catch(e){console.error(e);return json({error:'Catalogue temporairement indisponible.'},500)}};
