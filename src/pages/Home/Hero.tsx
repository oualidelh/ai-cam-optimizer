import React from "react";

const Hero = () => {
  return (
    <main className="flex px-3 items-center">
      <div className="flex-1/2">
        <h1 className="flex flex-wrap font-bold md:text-6xl text-4xl text-foreground ">
          Optimize Your{" "}
          <span className="text-primary bg-clip-text">Security Camera</span>{" "}
          Placement
        </h1>
      </div>
      <div className="flex-1/2 px-2 items-center justify-center">
        <div className=" w-full bg-red-500 rounded-md">
          <img
            className="w-full h-full object-cover"
            src="/src/assets/hero-image.jpg"
            alt="hero-image"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
