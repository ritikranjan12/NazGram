import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccountMutation } from "@/lib/react-query/queryandmututation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const {pathname} = useLocation()
  const { mutate: signout, isPending: issuccess } = useSignOutAccountMutation();
    const navigate = useNavigate()
    const { user } = useUserContext()
    useEffect(() => {
        if (issuccess) {
            navigate(0);
        }
    }, [issuccess])
  return (
    <nav className='leftsidebar'>
        <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
                    <img src="/assets/images/logo.png"
                        alt="logo"
                        width={70}
                        height={36} className="rounded-full border-2 border-red" />
                </Link>
                <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                  <img
                    src={user.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MTgtXpUHZ_h9s03JYE0OjHOAj4vgfgYhz_c67C1xgw&s"}
                    alt="profile"
                    className="h-14 w-14 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="body-bold">
                      {user.name}
                    </p>
                    <p className="small-regular text-light-3">@{user.username}</p>
                  </div>
                </Link>
                <ul className="flex flex-col gap-6">
                      {sidebarLinks.map((link : INavLink) => {
                        const isActive = pathname === link.route
                          return (
                            <li key={link.label} className={`leftsidebar-link h-12 p-3 group ${isActive && 'bg-primary-500'}`}>
                              <NavLink to={link.route} className="flex gap-4 items-center">
                                <img 
                                  src={link.imgURL}
                                  alt={link.label}
                                  className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                />
                              {link.label}
                              </NavLink>
                            </li>
                          )
                      })}
                </ul>
        </div>
        <div>
        <Button variant={"ghost"} className="shad-button_ghost" onClick={() => signout()}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71cP-New67ZhoSLgOuH86l8VlHupVGwDZvR1y1_N4yw&s"
                            className="h-8 w-8 rounded-full"
                            alt="logoout" />
                            <p className="small-medium lg:base-medium">Logout</p>
                    </Button>
        </div>
    </nav>
  )
}

export default LeftSidebar
