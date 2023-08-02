import avatar from "/avatar.png";
import dribble from "/dribble.png";
import youtube from "/youtube.png";
import twitter from "/twitter.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../util/useMediaQuery";

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const itemMotionDesktop = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 1, x: 0 },
};

const navlinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About", href: "/about" },
  { id: 3, name: "Contact", href: "/contact" },
];

const NavLinks = ({
  isMobile,
  className,
}: {
  isMobile: boolean;
  className: string;
}) => {
  return (
    <div className={className}>
      {navlinks.map(({ name, href, id }) => {
        return (
          <motion.a
            key={id}
            variants={isMobile ? itemMotion : itemMotionDesktop}
            href={href}
          >
            {name}
          </motion.a>
        );
      })}
    </div>
  );
};

export default function Nav() {
  const [toggled, setToggled] = useState(false);
  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <nav className="relative mx-8 mb-24 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -25 }}
        transition={{ delay: 1, duration: 0.75 }}
        className="flex gap-12"
      >
        <img src={avatar} alt="Profile picture" />
        <motion.div className="hidden xl:flex items-center gap-12">
          <img src={dribble} alt={dribble} />
          <img src={youtube} alt={youtube} />
          <img src={twitter} alt={twitter} />
        </motion.div>
      </motion.div>
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width="250"
        height={4}
        viewBox="0 0 250 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          animate={{ pathLength: 1, opacity: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          transition={{ delay: 1, duration: 0.75 }}
          d="M2 2L428 2"
          strokeWidth={2}
          stroke="#282828"
          strokeLinecap="round"
        />
      </svg>

      {/* Title */}
      <h1 className="text-lg font-bold">
        <a href="/">Daniel Tran</a>
      </h1>

      {!matches && (
        <div
          className="space-y-1.5 z-40 cursor-pointer xl:hidden"
          onClick={() => setToggled((prev) => !prev)}
        >
          <motion.span
            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
            className="block h-0.5 w-8 bg-black"
          ></motion.span>
          <motion.span
            animate={{ width: toggled ? 0 : 24 }}
            className=" block h-0.5 w-6 bg-black"
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toggled ? -45 : 0,
              y: toggled ? -8 : 0,
              width: toggled ? 32 : 16,
            }}
            className="block h-0.5 w-4 bg-black"
          ></motion.span>
        </div>
      )}

      {toggled && (
        <motion.div
          variants={navMotion}
          animate="visible"
          initial="hidden"
          className="fixed top-0 left-0 bg-white h-screen w-full flex justify-center items-center z-10"
        >
          <NavLinks isMobile={true} className="flex flex-col gap-24 text-lg" />
        </motion.div>
      )}

      <motion.div
        variants={navMotion}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 25 }}
        className="hidden xl:flex justify-center xl:gap-12 xl:text-lg xl:items-center"
      >
        <NavLinks isMobile={false} className="flex gap-12" />
      </motion.div>
    </nav>
  );
}
