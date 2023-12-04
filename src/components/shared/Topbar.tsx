import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queryandmututation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
    const { mutate: signout, isPending: issuccess } = useSignOutAccountMutation();
    const navigate = useNavigate()
    const { user } = useUserContext()
    useEffect(() => {
        if (issuccess) {
            navigate(0);
        }
    }, [issuccess])
    return (
        <section className='topbar'>
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img src="/assets/images/logo.png"
                        alt="logo"
                        width={30}
                        height={25} 
                        className="rounded-full border-2 border-red"/>
                </Link>
                <div className="flex gap-4">
                    <Button variant={"ghost"} className="shad-button_ghost" onClick={() => signout()}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71cP-New67ZhoSLgOuH86l8VlHupVGwDZvR1y1_N4yw&s"
                            className="h-8 w-8 rounded-full"
                            alt="logoout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img
                            src={user.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MTgtXpUHZ_h9s03JYE0OjHOAj4vgfgYhz_c67C1xgw&s'}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar
