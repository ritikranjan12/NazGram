import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninformSchema } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccountMutation } from "@/lib/react-query/queryandmututation"
import { useUserContext } from "@/context/AuthContext"
import {Link,useNavigate} from "react-router-dom"

const SignInForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const {checkAuthUser} = useUserContext()
  const {mutateAsync:signInaccount,isPending:isloading} = useSignInAccountMutation()
  const form = useForm<z.infer<typeof SigninformSchema>>({
    resolver: zodResolver(SigninformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SigninformSchema>) {
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
        title: "Logged In Successfull. Redirecting to Home Page..."
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
        <h2 className="h3-bold md:h2-bold sm:pt-12">Sign In</h2>  
      <form onSubmit={form.handleSubmit(onSubmit) } className="flex flex-col gap-2 w-full mt-4">
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
              <FormMessage />
              </FormItem>  
          )}
        />
        <Button type="submit" className="shad-button_primary mt-4">{isloading ? (
          <div className="flex-center gap-2">
              <Loader/> Signing In...
          </div>
        ): "Sign In"}</Button>
        <p className="text-small-regular text-light-2 text-center mt-2">Don't have an Account? <Link className="text-small-semibold ml-1 text-primary-500" to={"/sign-up"}>Create Account</Link></p>
      </form>
      </div>
    </Form>
  )
}

export default SignInForm
