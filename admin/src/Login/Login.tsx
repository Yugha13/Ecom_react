import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASEURL } from "../../BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUser from "@/store/adminState";

export default function Login() { 
  const { login } = useUser() as any
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleAuth = async () => {
    try {
      const {data} = await axios.post(`${BASEURL}/login`, {
          email,
          password,
      }, {withCredentials: true});
      toast.success("Successfully logged in!");
      console.log("Response:", data.data);
      login(data.data);

      if (data?.data) {
        navigate("/dashboard");
      } else {
        console.error("URL not found in response");
      }
    } catch (err) {
      setError("Email or Password is incorrect");
      toast.error("Email or Password is incorrect");
      console.error(err);
    }
  };


  return (
    <div>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="hidden bg-muted lg:block">
          <img
            src="https://images.pexels.com/photos/6214386/pexels-photo-6214386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Login image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
            style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground">Enter your email and password to sign in.</p>
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <Card>
              <CardContent className="space-y-4">
                <div className="space-y-2 mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mysab@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="****"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAuth}>
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
