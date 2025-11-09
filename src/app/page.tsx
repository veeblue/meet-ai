'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
      const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Account created successfully")
      }
    })
  }

  if(session){
    return <div className="p-4 flex flex-col gap-4">
      <p>Logged in as {session.user.email}</p>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password"  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create Account</Button>
    </div>
  );
}
