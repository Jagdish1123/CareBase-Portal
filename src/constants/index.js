import { records, screening, user, apps,chat,chatbot } from "../assets";


export const navlinks = [
  {
    name: "dashboard",
    imgUrl: apps,
    link: "/",
  },
  {
    name: "records",
    imgUrl: records,
    link: "/medical-records",
  },
  {
    name: "screening",
    imgUrl: screening,
    link: "/screening-schedules",
  },
  {
    name: "profile",
    imgUrl: user,
    link: "/profile",
  },
  {
    name: "chatbot",
    imgUrl: chatbot,
    link: "/chatbot",
  },
  {
    name: "chat",
    imgUrl: chat,
    link: "/chat",
  },

];

export const navlinksDoctor = [
  {
    name: "dashboard",
    imgUrl: apps,
    link: "/doctor-dashboard",
  },
  {
    name: "profile",
    imgUrl: user,
    link: "/doctor-profile",
  },
  {
    name: "chat",
    imgUrl: chat,
    link: "/doctor-chat",
  },

];
