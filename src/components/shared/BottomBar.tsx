import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccountMutation } from "@/lib/react-query/queryandmututation";
import { useEffect } from "react";
import { bottombarLinks } from "@/constants";


const BottomBar = () => {
  const { pathname } = useLocation()
  const { isPending: issuccess } = useSignOutAccountMutation();
  const navigate = useNavigate()
  useEffect(() => {
    if (issuccess) {
      navigate(0);
    }
  }, [issuccess])
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route
        return (
          
            <Link to={link.route} key={link.label} className={`${isActive && 'bg-primary-500 rounded-[10px] '} flex-center flex-col gap-1 p-2 transition`}>
              <img
                src={link.imgURL}
                alt={link.label}
                className={`${isActive && 'invert-white'}`}
                width={16}
                height={16}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          
        )
      })}
    </section>
  )
}

export default BottomBar
