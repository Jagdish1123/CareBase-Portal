<<<<<<< HEAD
import { records, screening, user, apps } from "../assets";
import chatbot from '../assets/chatbot.png';
import journal from '../assets/image.png'; 
import share from '../assets/share.png'; 
=======
import { records, screening, user, apps,chat,chatbot } from "../assets";


>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
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
<<<<<<< HEAD
=======
  {
    name: "chat",
    imgUrl: chat,
    link: "/chat",
  },

>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
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
<<<<<<< HEAD
    name: "chatbot",
    imgUrl: chatbot,
    link: "/chatbot",
=======
    name: "chat",
    imgUrl: chat,
    link: "/doctor-chat",
>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
  },

];
