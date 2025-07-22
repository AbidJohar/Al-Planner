export interface NavlinkProps {
    label : string,
    link : string,
    protected?: boolean
}

export const NavRoutes : NavlinkProps[] =  [
    {
        label : "Home",
        link :  "/"
    },
    {
        label : "Dashboard",
        link :  "/dashboard",
        protected : true
    },
    {
        label : "Designs",
        link :  "/designs"
    },
    {
        label : "Contact",
        link :  "/contact"
    },
]