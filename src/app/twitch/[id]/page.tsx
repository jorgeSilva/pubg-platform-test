export type IURL = {
  params: {
    id: string
  }
}

export default function PerfilTwitch({params}: IURL) {
  return (
    <div>
      <p>
        {params.id}
      </p>
    </div>
  )
}