export function handleDias(temp: any){
  const dias = (temp / 86400)
  const horas = ((temp % 86400) / 3600)
  const minutos = (((temp % 86400) % 3600) / 60)
  const segundos = (((temp % 86400) % 3600) % 60)
  return `${dias.toFixed(0)} dias ${ horas < 1  ? 0 : horas.toFixed(0)}h:${minutos.toFixed(0)}m:${segundos.toFixed(0)}s`
}

export function handleMinutos(temp: any){
  const minutos = temp / 60
  const segundos = temp % 60
  return `${minutos.toFixed(0)}m:${segundos}s`
}

export function handleMetros(metros: any){
  const km = metros / 1000
  const m = metros % 1000
  return `${ km < 1 ? '' : (km.toFixed(0)+'km')} ${m.toFixed(0)}m`
}