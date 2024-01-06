"use client";

import {
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import {
  HiEllipsisVertical,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineChatBubbleBottomCenterText,
  HiShare,
} from "react-icons/hi2";

export default function CardPost({
  photoProfile,
  name,
  time,
  content,
  description,
}: {
  photoProfile: string;
  name: string;
  time: string;
  content: string;
  description: string;
}) {
  return (
    <>
      <Card
        placeholder="any"
        className="bg-slate-950 backdrop-blur-lg ring-1 ring-blue-600/50 text-slate-300"
      >
        <CardBody placeholder="any" className="space-y-5 pb-2">
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center ring-4 ring-blue-600">
                <img src={photoProfile} alt="" />
              </div>
              <div className="">
                <Link href="/lusi">
                  <Typography placeholder="any" variant="lead">
                    {name}
                  </Typography>
                </Link>
                <small>{time}</small>
              </div>
            </div>
            <Menu>
              <MenuHandler>
                <IconButton placeholder="any" variant="text" color="blue-gray">
                  <HiEllipsisVertical className="w-8 h-8" />
                </IconButton>
              </MenuHandler>
              <MenuList
                placeholder="any"
                className="bg-slate-900 backdrop-blur-md border-slate-700 "
              >
                <MenuItem placeholder="any">Option 1</MenuItem>
                <MenuItem placeholder="any">Option 2</MenuItem>
                <MenuItem placeholder="any">Option 3</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src={content} alt="" />
          </div>
        </CardBody>
        <CardFooter placeholder="any" className="flex flex-col pt-0">
          <div className="flex gap-1 self-end">
            <div className="flex flex-col items-center gap-0.5">
              <IconButton placeholder="any" variant="text" color="white">
                <HiHeart className="w-8 h-8 text-red" />
              </IconButton>
              <small>100</small>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <IconButton placeholder="any" variant="text" color="white">
                <HiOutlineChatBubbleBottomCenterText className="w-8 h-8 text-white" />
              </IconButton>
              <small>10</small>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <IconButton placeholder="any" variant="text" color="white">
                <HiShare className="w-8 h-8 text-white" />
              </IconButton>
              <small>5</small>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <IconButton placeholder="any" variant="text" color="white">
                <HiOutlineBookmark className="w-8 h-8 text-white" />
              </IconButton>
              <small>20</small>
            </div>
          </div>
          <div className="">
            <h1 className="">{description}</h1>
          </div>
          {/* <div className="p-2 space-y-2 bg-slate-300 rounded-md"> */}
          {/* <Accordion className="w-full">
                  <AccordionHeader>
                    <h1 className="text-black">1 Comment</h1>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="space-y-1">
                      <div>
                        <Tooltip content={<Profile />} className="p-3">
                          <h1 className="text-blue-600 w-min whitespace-nowrap cursor-pointer">
                            Ahmad Fauzan
                          </h1>
                        </Tooltip>
                        <Typography variant="small" color="black">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Perspiciatis cumque harum, placeat expedita
                          assumenda exercitationem fugiat enim. Tenetur, itaque
                          quisquam!
                        </Typography>
                      </div>
                      <div>
                        <Tooltip content={<Profile />} className="p-3">
                          <h1 className="text-blue-600 w-min whitespace-nowrap cursor-pointer">
                            Ahmad Fauzan
                          </h1>
                        </Tooltip>
                        <Typography variant="small" color="black">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Delectus, sit.
                        </Typography>
                      </div>
                    </div>
                  </AccordionBody>
                </Accordion> */}
          {/* </div> */}
        </CardFooter>
      </Card>
    </>
  );
}

function Profile() {
  return (
    <>
      <div className="flex gap-5">
        <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-blue-600">
          <img src="/img/lusi.jpeg" alt="" />
        </div>
        <div className="">
          <Typography placeholder="any" variant="small">
            Ahmad Fauzan
          </Typography>
          <small>1 Minute Ago</small>
        </div>
      </div>
    </>
  );
}
