import { IUser } from "@/app/[id]/page";

export default function PlayerComponent(user: {user: IUser | null}){
  return (
    <h1>{user.user?.data[0].attributes.name}</h1>
  )
}