import {
  HiBell,
  HiCamera,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiHome,
  HiMagnifyingGlass,
  HiOutlineBell,
  HiOutlineCamera,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export interface onHover {
  before: string;
  after: string;
}

interface Links {
  link: string;
  onHover: onHover;
  label: string;
}

export const sidebarLink: Links[] = [
  {
    link: "/home",
    onHover: {
      before: HiOutlineHome,
      after: HiHome,
    },
    label: "Home",
  },
  {
    link: "/explore",
    onHover: {
      before: HiOutlineMagnifyingGlass,
      after: HiMagnifyingGlass,
    },
    label: "Explore",
  },
  {
    link: "/post",
    onHover: {
      before: HiOutlineCamera,
      after: HiCamera,
    },
    label: "Post",
  },
  {
    link: "/chats",
    onHover: {
      before: HiOutlineChatBubbleLeftRight,
      after: HiChatBubbleLeftRight,
    },
    label: "Chats",
  },
  {
    link: "/notification",
    onHover: {
      before: HiOutlineBell,
      after: HiBell,
    },
    label: "Notification",
  },
  {
    link: "/setting",
    onHover: {
      before: HiOutlineCog6Tooth,
      after: HiCog6Tooth,
    },
    label: "Setting",
  },
];
