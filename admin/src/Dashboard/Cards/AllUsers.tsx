import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASEURL } from "../../../BaseUrl"
import Navbar from "@/Navbar/Navbar"
import { Link } from "react-router-dom"




export default function UserCards() {
  const [users, setUsers] = useState([] as any)

  useEffect(() => {
    (async()=>{
      const {data} = await axios.get(`${BASEURL}/users`, {withCredentials : true});
      // console.log(data.users);
      setUsers(data.users)
    })()
  },[])
  const handleDelete = async (id: any) => {
    await axios.post(`${BASEURL}/user/delete`, { userId: id }, { withCredentials: true });
    setUsers((prevUsers:any) => prevUsers.filter((user:any) => user.id !== id));
  }

  return (
    <div>
      <Navbar info={'User Management'} />
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user : any) => (
          <Card key={user.id} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name?.split(' ').map((n:any) => n[0]+n[1]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Joined : {new Date(user.createdAt).toLocaleDateString()} </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to={`/user/${user.id}`}>
                <Button  className="bg-blue-400 hover:bg-blue-500" size="sm">
                  View
                </Button>
              </Link>
              <Button 
                className="bg-red-400" 
                variant="destructive" 
                size="sm"
                onClick = {() => handleDelete(user.id)}
              >
                Delete
              </Button>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}
