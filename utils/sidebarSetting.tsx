import {
  HiBell,
  HiPencil,
  HiQuestionMarkCircle,
  HiShieldCheck,
  HiUser,
} from "react-icons/hi2";

interface Links {
  link: string;
  icon: string;
  label: string;
}

export const sidebarSetting: Links[] = [
  {
    link: "/setting/edit-profile",
    icon: HiPencil,
    label: "Edit Profile",
  },
  {
    link: "/setting/account",
    icon: HiUser,
    label: "Account",
  },
  {
    link: "/setting/privacy-security",
    icon: HiShieldCheck,
    label: "Privacy & Security",
  },
  {
    link: "/setting/notification",
    icon: HiBell,
    label: "Notification",
  },
  {
    link: "/setting/help",
    icon: HiQuestionMarkCircle,
    label: "Help",
  },
];
