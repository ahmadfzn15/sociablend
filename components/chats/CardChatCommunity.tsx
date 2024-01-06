"use client";

import {
  Card,
  CardBody,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { HiEllipsisVertical } from "react-icons/hi2";

export default function CardChatCommunity() {
  return (
    <>
      <Card placeholder="any" className="bg-slate-900">
        <CardBody
          placeholder="any"
          className="p-2 bg-blue-500/10 rounded-xl ring-1 ring-blue-500/30"
        >
          <div className="flex items-center">
            <Link
              href="/chats/community/javascript-club/123123/321321321"
              className="w-full"
            >
              <ListItem
                placeholder="any"
                className="px-3 py-2 hover:bg-blue-900/20 active:bg-blue-900/20 focus:bg-blue-900/2"
              >
                <ListItemPrefix placeholder="any">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-blue-600">
                      <img src="/img/user.png" alt="Photo Profile" />
                    </div>
                    <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
                  </div>
                </ListItemPrefix>
                <div className="flex flex-col justify-between">
                  <Typography
                    placeholder="any"
                    variant="paragraph"
                    color="white"
                  >
                    Javascript Club
                  </Typography>
                  <small className="text-slate-300">P....</small>
                </div>
                <ListItemSuffix placeholder="any">
                  <Chip value="1" color="blue" className="rounded-full" />
                </ListItemSuffix>
              </ListItem>
            </Link>
            <Menu>
              <MenuHandler>
                <IconButton
                  placeholder="any"
                  color="blue"
                  variant="text"
                  className="rounded-full focus:outline-none"
                >
                  <HiEllipsisVertical className="w-7 h-7" />
                </IconButton>
              </MenuHandler>
              <MenuList
                placeholder="any"
                className="bg-slate-900/60 backdrop-blur-md border-slate-700 "
              >
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  Clear Chat
                </MenuItem>
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  Mark as read
                </MenuItem>
                <MenuItem placeholder="any" className="flex items-center gap-2">
                  Exit from this community
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
