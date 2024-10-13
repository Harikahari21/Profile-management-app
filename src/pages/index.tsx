import { ProfileForm } from "@/components";
import React from "react";

const HomePage = () => {
  return (
    <section className="">
      <section className="bg-primary/10 flex justify-center items-center h-screen pb-8 lg:pb-16 2xl:pb-24 lg:py-20">
        <aside className="main-container flex justify-between lg:h-[40rem] md:max-h-fit">
          <div className="hidden w-full lg:flex flex-col items-center justify-center gap-4 text-white bg-primary rounded-l-3xl px-12">
            <img src="/profile-bg.jpg" alt="" className="h-72 rounded-lg" />
            <h3 className="w-full lg:w-3/4 text-center font-semibold text-xl md:text-2xl lg:text-3xl pt-8">
              Get Started by Creating Your Profile
            </h3>
          </div>

          <div className="w-full bg-white px-12 flex flex-col justify-center items-center rounded-r-3xl rounded-l-3xl lg:rounded-l-none py-12">
            <h2 className="font-semibold text-3xl py-5">
              Create Your Personalized Profile !
            </h2>
            <div className="  w-full">
              <ProfileForm />
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
};

export default HomePage;
