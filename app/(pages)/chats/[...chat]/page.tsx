"use client";

import BubbleChat from "@/components/chats/BubbleChat";
import { IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function Chat() {
  const chat = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState<boolean>(true);

  const scrollToBottom = () => {
    chat.current?.scrollTo({
      top: chat.current.scrollHeight,
      behavior: "smooth",
    });
    setIsBottom(false);
  };
  const checkScroll = () => {
    const clientHeight = chat.current?.clientHeight!;
    const scrollHeight = chat.current?.scrollHeight!;
    const scrollTop = chat.current?.scrollTop!;
    const bottom = scrollHeight - clientHeight;

    if (scrollTop < bottom) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const clientHeight = chat.current?.clientHeight!;
    const scrollHeight = chat.current?.scrollHeight!;

    chat.current?.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });

    if (clientHeight === scrollHeight) {
      setIsBottom(false);
    } else {
      setIsBottom(true);
    }
  }, []);

  return (
    <>
      <div
        ref={chat}
        onScroll={checkScroll}
        className="h-full relative overflow-y-auto overflow-x-hidden custom-scrollbar text-slate-300 px-4"
      >
        <div className="w-full flex flex-col items-center gap-2">
          <BubbleChat time="15.30" right>
            <h1>P</h1>
          </BubbleChat>
          <BubbleChat time="15.30" right={false}>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              officiis consequatur! Possimus, ex consequuntur voluptatem vero
              iure mollitia neque earum perferendis voluptas nulla! Vero, natus,
              blanditiis dolorem voluptatibus laborum odio deserunt facilis
              optio quia eum, ut libero sunt magnam ratione ipsum sint. Labore,
              minima, quae odit impedit tempora velit mollitia consectetur amet
              autem repellat corporis enim perspiciatis laborum natus ullam!
              Blanditiis facere quibusdam architecto, ex ducimus sunt mollitia
              quam consequuntur id reprehenderit aperiam eveniet eaque numquam
              illo, molestiae quaerat. Optio corrupti beatae cumque magni quo
              dignissimos labore tempora nam, voluptatum fugiat distinctio
              adipisci itaque inventore laudantium, ex doloribus pariatur
              perferendis!
            </h1>
          </BubbleChat>
          <BubbleChat time="15.30" right={false}>
            <div className="w-full rounded-lg overflow-hidden flex justify-center items-center">
              <div className="w-[400px] h-[400px] rounded-lg overflow-hidden flex justify-center items-center">
                <Image
                  src="/img/lusi.jpeg"
                  width={400}
                  height={400}
                  alt="Image"
                />
              </div>
            </div>
          </BubbleChat>
          <BubbleChat time="15.30" right>
            <div className="w-full rounded-lg overflow-hidden flex justify-center items-center">
              <div className="w-[400px] h-[400px] rounded-lg overflow-hidden flex justify-center items-center">
                <Image
                  src="/img/ahmad.jpg"
                  width={400}
                  height={400}
                  alt="Image"
                />
              </div>
            </div>
          </BubbleChat>
        </div>
        {isBottom && (
          <div className="absolute bottom-12 w-screen md:w-[calc(100vw-30rem)] flex justify-center">
            <div className="fixed">
              <IconButton
                placeholder="any"
                color="blue"
                variant="gradient"
                className="rounded-full"
                onClick={scrollToBottom}
              >
                <HiChevronDown className="w-7 h-7" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
