import { Camera } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const routingPaths = [
    { name: "Home", path: "/" },
    { name: "Analyses", path: "/analyses" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed z-50 px-3 top-0 right-0 left-0 backdrop-blur-md h-16 border-b borderbor flex items-center justify-between">
      <Link to="/" className="flex items-center gap-1.5">
        <div className="bg-primary rounded-xl flex items-center justify-center text-white h-10 w-10">
          <Camera />
        </div>

        <span className="text-xl font-bold text-foreground">CamOptimizer</span>
      </Link>
      <div className="flex items-center  gap-8">
        {routingPaths.map((route) => (
          <Link
            className={`text-sm font-medium rounded-md px-3 py-2  transition-colors duration-200 ${
              isActive(route.path)
                ? " text-primary bg-primary/10 "
                : " text-muted-foreground hover:text-foreground hover:bg-secondary "
            } `}
            to={route.path}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
