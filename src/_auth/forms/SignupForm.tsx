import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupformSchema } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateuserAccountMutation, useSignInAccountMutation } from "@/lib/react-query/queryandmututation"
import { useUserContext } from "@/context/AuthContext"
import {Link,useNavigate} from "react-router-dom"
const SignupForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const {checkAuthUser} = useUserContext()
  const {isPending:isloading,mutateAsync: createuseraccount} = useCreateuserAccountMutation();

  const {mutateAsync:signInaccount} = useSignInAccountMutation()
  const form = useForm<z.infer<typeof SignupformSchema>>({
    resolver: zodResolver(SignupformSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof SignupformSchema>) {
    // create the user
    const newUser = await createuseraccount(values)
    if (!newUser) {
      return toast({
        title: "Sign Up failed. Plese try again! "
      })
    }
    const session = await signInaccount({
      email: values.email,
      password: values.password
    })
    if (!session) {
      return toast({
        title: "Sign In failed. Plese try again! "
      })
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      toast({
        title: "Account Created. Redirecting to Home Page..."
      })
      form.reset();
      navigate("/")
    } else {
      return toast({
        variant: "default",
        title: "Sign In failed. Plese try again! "
      })
    }
  }
  return (
    
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col ">
          <div className="flex-center justify-between flex-row">
          <img className="rounded-full w-12 border-2 border-red" src="/assets/images/logo.png" alt="logo"/>
          <span className="font-bold text-3xl mx-3 ">NazGram</span>
          </div>
        <h2 className="h3-bold md:h2-bold sm:pt-12">Create a New Account</h2>  
        <p className="text-light-3 small-medium md:base-regular mt-2">To use NazGram enter your account details</p>
        
      <form onSubmit={form.handleSubmit(onSubmit) } className="flex flex-col gap-2 w-full mt-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
              
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
              
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
              
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormDescription>
                Password must be of minimum 8 characters
              </FormDescription>
              <FormMessage />
              </FormItem>  
          )}
        />
        <Button type="submit" className="shad-button_primary">{isloading ? (
          <div className="flex-center gap-2">
              <Loader/> Creating Account...
          </div>
        ): "Sign Up"}</Button>
        <p className="text-small-regular text-light-2 text-center mt-2">Already have an Account? <Link className="text-small-semibold ml-1 text-primary-500" to={"/sign-in"}>Log In</Link></p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm
