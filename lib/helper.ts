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

export const roomStyles = [
  { label: "Living Room", value: "living_room" },
  { label: "Bedroom", value: "bedroom" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Dining Room", value: "dining_room" },
  { label: "Kids Room", value: "kids_room" },
  { label: "Guest Room", value: "guest_room" },
  { label: "Balcony", value: "balcony" },
  { label: "Hallway", value: "hallway" },
];

export const aiStyle = [
  { label: "Modern", value: "modern" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Scandinavian", value: "scandinavian" },
  { label: "Industrial", value: "industrial" },
  { label: "Traditional", value: "traditional" },
  { label: "Bohemian", value: "bohemian" },
  { label: "Rustic", value: "rustic" },
  { label: "Contemporary", value: "contemporary" },
  { label: "Luxury", value: "luxury" },
  { label: "Eclectic", value: "eclectic" }
]