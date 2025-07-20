import GetStarted from "./GetStarted";
import Hero from "./Hero";
import Highlights from "./Highlights";

const HomePage = () => {
  const homePageSection = [<Hero />, <Highlights />];
  return (
    <main className="flex flex-col pt-16">
      {homePageSection.map((section) => (
        <section className="min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)]">
          {section}
        </section>
      ))}
      <GetStarted />
    </main>
  );
};

export default HomePage;
