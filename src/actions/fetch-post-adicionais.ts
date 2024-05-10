'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export type IAdicionais = {
  _id: string,
  fkUsuario: string,
  tipoAdicional: string,
  conteudoLiberado: any,
  preco: string,
  descricao: string,
  duracao?: string
}

let arr: any

export async function FetchPostAdicionais(formdata: FormData){
  const adicional: IAdicionais = {
    _id: "daolkdjeioaerohneougg",
    fkUsuario: ",sajbfihjfbaibIWUBWIbibib",
    tipoAdicional: formdata.get('adicional') as string,
    conteudoLiberado: formdata.get('conteudo') as File,
    preco: formdata.get('preco') as string,
    descricao: formdata.get('descricao') as string,
    duracao: formdata.get('duracao') as string
  }

  const OldValue = cookies().get("produto")?.value || ""

  if(OldValue !== undefined){
    arr = OldValue.length >= 1 && JSON.parse(OldValue) 
    console.log(arr)
    // arr?.push(adicional)
  }else{
    console.log("undefined")
  }


  // cookies().set("produto", JSON.stringify(arr), {
  //   httpOnly: true,
  //   secure: true
  // })

  // redirect("/loja/produtos")
}