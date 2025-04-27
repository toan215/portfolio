import React, { useEffect, memo, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2">
      <Sparkles className="w-5 h-5 text-fuchsia-500" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-fuchsia-500" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex items-center justify-end sm:p-12 sm:py-0 p-0 pb-2">
    <div className="relative" data-aos="fade-up" data-aos-duration="1000">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Profile"
        className="w-32 h-32 rounded-full"
      />
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration="1300"
      className="relative group"
    >
      <div className="relative z-10 bg-white-900/50 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 overflow-hidden trasition duration-300  hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/10 group-hover:rotate-6 transition-transform">
            <Icon className="text-2xl" style={{ color: "black" }} />
          </div>
          <span
            className="text-4xl font-bold text-black/70"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>
        <div>
          <p
            className="text-sm uppercase tracking-wider text-black mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-black "
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="text-xl" style={{ color: "#A7A7A7" }} />
          </div>
        </div>
      </div>
    </div>
  )
);

const About = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects =
      JSON.parse(localStorage.getItem("totalProjects")) || "[]";
    const storedCertificates =
      JSON.parse(localStorage.getItem("totalCertificates")) || "[]";
    const startDate = new Date("2024-01-01");
    const currentDate = new Date();

    const experiences =
      currentDate.getFullYear() -
      startDate.getFullYear() -
      (currentDate <
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
        ? 1
        : 0);
    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experiences,
    };
  }, []);

  useEffect(() => {
    const intAOS = () => {
      AOS.init({
        once: false,
      });
    };

    intAOS();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(intAOS, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-indigo-500 to-blue-500",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-indigo-500 to-blue-500",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-indigo-500 to-blue-500",
        value: YearExperience,
        label: "Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );
  return (
    <div
      className="h-auto pb-[10%] text-black overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />
      
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 ">
                Hello,I'm
              </span>
              <span
                className="block my-2 text-gray-600"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Trương Công Toàn
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-justify pb-4 sm:pb-0">
              A Computer Science enthusiast with a focus on Front-End
              development. I am passionate about creating engaging digital
              experiences and always strive to deliver the best solutions in
              every project.
            </p>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="https://drive.google.com/drive/folders/1pBtEQtNO9IZEkqxzEUcSq-zyhumh3czu?usp=drive_link"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px=6 p-4 sm:py-3 rounded-lg bg-gradient-to-r from-sky-400 to bg-fuchsia-500 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 lg:justify-start shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="text-2xl sm:text-xl" /> Download CV
                </button>
              </a>
              <a href="#Portfolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px=6 p-4 sm:py-3 rounded-lg border border-gray-600/50 text-black font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 lg:justify-start hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="text-2xl sm:text-xl" /> View Project
                </button>
              </a>
            </div>
          </div>
          <ProfileImage />
        </div>

        <a href="#Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </div>
  );
};

export default About;
