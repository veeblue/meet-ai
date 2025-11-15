 "use client"
import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useState } from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
export const SignUpView = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit =  (data: z.infer<typeof formSchema>) => {
        setError(null)

        authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                callbackURL: '/',
            }, {
                onSuccess: () => {
                    setPending(false)
                    router.push("/")
                },
                onError: ({ error }) => {
                    setPending(false)
                    setError(error.message)
                }
            })
       
    }

    const onSocial = (provider: "github" | "google") => {
        setError(null)
        setPending(true)
        authClient.signIn.social({
            provider,
            callbackURL: '/',
        },
        {
            onSuccess: () => {
                setPending(false)
                // router.push("/")
            },
            onError: ({ error }) => {
                setPending(false)
                setError(error.message)
            }
        })  
    }
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}> 
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold text-white"> 
                                        Let&apos;s Get Started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create your account to continue
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control} 
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                type="text"
                                                placeholder="Enter your name"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control} 
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                type="email"
                                                placeholder="m@example.com"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                 <div className="grid gap-3">
                                    <FormField
                                    control={form.control} 
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control} 
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                type="password"
                                                placeholder="Enter your confirm password"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                                { !!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>Invalid credentials</AlertTitle>
                                        <AlertDescription>
                                            The email or password you entered is incorrect. Please try again.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2" >Or continue with</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="w-full cursor-pointer" disabled={pending} onClick={() => onSocial("google")}>
                                        <FaGoogle className="h-4 w-4" />
                                        Google
                                    </Button>
                                    <Button variant="outline" className="w-full cursor-pointer" disabled={pending} onClick={() => onSocial("github")}>
                                        <FaGithub className="h-4 w-4" />
                                        GitHub
                                    </Button>
                                </div>
                                <div className="text-center text-sm text-muted-foreground">
                                    Already have an account? {" "}
                                    <Link href="/sign-in" className="underline underline-offset-4 text-[#5731d5]">
                                    Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/Mark.svg" alt="logo" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white"> Meet.AI</p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *[a]:underline-offset-4">
                By clicking continue, you agree to our {" "}
                <Link href="/terms" className="underline underline-offset-4 cursor-pointer">
                Terms of Service
                </Link>{" "}
                and {" "}
                <Link href="/privacy" className="underline underline-offset-4 cursor-pointer">
                Privacy Policy
                </Link>
            </div>
        </div>
    )
}