import { records, screening, user, apps } from "../assets";
import chatbot from '../assets/chatbot.png';

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
    name: "chatbot",
    imgUrl:chatbot ,
    link: "/chatbot",
  },
];
