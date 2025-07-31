import { records, screening, user, apps } from "../assets";
import chatbot from '../assets/chatbot.png';
import journal from '../assets/image.png'; 
import share from '../assets/share.png'; 
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
    name: "journal",
    imgUrl: journal,
    link: "/health-journal",
  },
    {
    name: "share",
    imgUrl: share,
    link: "/share-records",
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
    imgUrl: chatbot,
    link: "/chatbot",
  },
];
