"use client";

import CardChat from "@/components/chats/CardChat";
import CardChatCommunity from "@/components/chats/CardChatCommunity";
import SettingChat from "@/components/chats/SettingChat";
import {
  Button,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  List,
  ListItem,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiPlus,
  HiUserGroup,
  HiXMark,
} from "react-icons/hi2";

export default function Chats() {
  const [active, setActive] = useState("Chat");
  const [dialogNewChat, setDialogNewChat] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
        <Tabs value="Chat">
          <TabsHeader
            placeholder="any"
            className="bg-slate-500 p-2 fixed max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-19rem)] w-full z-50"
            indicatorProps={{ className: "bg-blue-400" }}
          >
            <Tab
              placeholder="any"
              value="Chat"
              onClick={() => setActive("Chat")}
            >
              <div className="flex items-center gap-2 text-white font-semibold">
                <HiChatBubbleLeftRight className="w-5 h-5" />
                Chat
              </div>
            </Tab>
            <Tab
              placeholder="any"
              value="Community"
              onClick={() => setActive("Community")}
            >
              <div className="flex items-center gap-2 text-white font-semibold">
                <HiUserGroup className="w-5 h-5" />
                Community
              </div>
            </Tab>
            <Tab
              placeholder="any"
              value="Setting"
              onClick={() => setActive("Setting")}
            >
              <div className="flex items-center gap-2 text-white font-semibold">
                <HiCog6Tooth className="w-5 h-5" />
                Setting
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody
            placeholder="any"
            animate={{
              unmount: { y: 100, opacity: 0 },
              mount: { y: 0, opacity: 1 },
            }}
            className="min-h-[85vh] mt-12"
          >
            {active === "Chat" && (
              <TabPanel value="Chat">
                <CardChat />
              </TabPanel>
            )}
            {active === "Community" && (
              <TabPanel value="Community">
                <CardChatCommunity />
              </TabPanel>
            )}
            {active === "Setting" && (
              <TabPanel value="Setting">
                <SettingChat />
              </TabPanel>
            )}
          </TabsBody>
        </Tabs>
      </div>
      <div className="fixed bottom-20 md:bottom-5 right-5">
        <Tooltip content="New Chat">
          <IconButton
            placeholder="any"
            color="blue"
            variant="gradient"
            className="rounded-full p-8"
            size="lg"
            onClick={() => setDialogNewChat(!dialogNewChat)}
          >
            <HiPlus className="w-10 h-10" strokeWidth={1} />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={dialogNewChat}
        handler={setDialogNewChat}
        animate={{
          unmount: { scale: 0, opacity: 0 },
          mount: { scale: 1, opacity: 1 },
        }}
        placeholder="any"
        className="bg-slate-900/70 divide-y divide-slate-700 border border-slate-800"
      >
        <DialogHeader
          placeholder="any"
          className="flex flex-col items-start gap-3 text-slate-300"
        >
          <h1>Search Your Friend</h1>
          <Input
            crossOrigin
            type="search"
            label="Search"
            color="blue"
            className="text-slate-300"
          />
        </DialogHeader>
        <DialogBody
          placeholder="any"
          className="h-72 overflow-y-auto flex flex-col gap-1 items-center"
        >
          <Button
            color="blue"
            variant="text"
            placeholder="any"
            fullWidth
            className="p-2 flex items-center justify-between bg-blue-900/20"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
                  <img src="/img/lusi.jpeg" alt="Photo Profile" />
                </div>
                <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
              </div>
              <h1>Lusi Kuraisin</h1>
            </div>
            <Chip color="blue" value="Chat" size="lg" />
          </Button>
          <Button
            color="blue"
            variant="text"
            placeholder="any"
            fullWidth
            className="p-2 flex items-center justify-between bg-blue-900/20"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
                  <img src="/img/user.png" alt="Photo Profile" />
                </div>
                <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500 ring-1 ring-white"></div>
              </div>
              <h1>Ahmad Fauzan</h1>
            </div>
            <Chip color="blue" value="Chat" size="lg" />
          </Button>
        </DialogBody>
        <DialogFooter placeholder="any" className="flex justify-end">
          <Button
            placeholder="any"
            color="green"
            variant="gradient"
            onClick={() => setDialogNewChat(!dialogNewChat)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
