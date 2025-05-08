import React, { useEffect, useState, useCallback, memo } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  Github,
  Linkedin,
  Mail,
  Sparkle,
  ExternalLink,
  Facebook,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(() => (
  <div
    className="inline-block lg:mx-0 "
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-fuchsia-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-black/10">
        <span className="bg-gradient-to-r from-sky-400 to-fuchsia-500 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkle className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTile = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-duration="600">
    <div className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-fuchsia-500 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-black/90 via-gray-700 to-slate-600 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-sky-400 to-fuchsia-500 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </div>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-black/5 backdrop-blur-sm border border-white/10 text-sm text-gray-600 hover:bg-black/10 transition-colors">
    {tech}
  </div>
));

const CTAButtons = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-fuchsia-500 rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-black/70 backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute indent-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-sky-400/20 to-fuchsia-500/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-white  ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Network & Software Student", "Enjoy Tech"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/toan215" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/truong-cong-toan-2ba793364/" },
  { icon: Facebook, link: "https://www.facebook.com/toan.congtoan.14" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  // Optimize typing effect
  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  // Optimize typing and erasing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/dc1a272b-c928-4607-8c76-10eb8b2bfce6/XvZeHM6DM3.lottie",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`,
  };

  return (
    <div className="min-h-screen overflow-hidden " id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* left */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0 "
              data-aos="fade-right"
              data-aos-duration="200"
            >
              <div className="space-y-4 md:space-y-6">
                <StatusBadge />
                <MainTile />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Creating Innovative, Functional, and User-Friendly Websites
                  for Digital Solutions.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}

                  {/* CTA Buttons */}
                  <div
                    className="flex flex-row gap-3 w-full justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButtons
                      href="#Portfolio"
                      text="Projects"
                      icon={ExternalLink}
                    />
                    <CTAButtons href="#Contact" text="Contact" icon={Mail} />
                  </div>
                  {/* Social Links */}
                  <div
                    className="hidden sm:flex gap-4 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1600"
                  >
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Optimized Lottie Animation */}
            <div
              className=" w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0 "
              onMouseOver={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-sky-400 to-fuchsia-500 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering
                      ? "opacity-50 scale-105 "
                      : "opacity-20 scale-100"
                  }`}
                ></div>
                <div
                  className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  <DotLottieReact {...lottieOptions} />
                </div>
                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
