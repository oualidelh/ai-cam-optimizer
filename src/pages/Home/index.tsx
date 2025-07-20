import GetStarted from "./GetStarted";
import Hero from "./Hero";
import Highlights from "./Highlights";

const HomePage = () => {
  const homePageSection = [<Hero />, <Highlights />, <GetStarted />];
  return (
    <main className="flex flex-col pt-16">
      {homePageSection.map((section) => (
        <section className="h-[calc(100vh-64px)]">{section}</section>
      ))}
    </main>
  );
};

export default HomePage;
