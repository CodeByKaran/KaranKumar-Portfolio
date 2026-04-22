import Spline from "@splinetool/react-spline";
import { Navbar } from "./components/navbar";
import Home from "./Home";
import Projects from "./Projects";
import About from "./About";
import { Route, Routes, useLocation } from "react-router-dom";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/projects", component: <Projects /> },
  { path: "/about", component: <About /> },
];

function App() {
  const location = useLocation();

  const getPositionClass = () => {
    // origin-bottom ensures it scales UP from the floor
    const baseClasses =
      "origin-bottom transition-all duration-1000 ease-in-out";

    switch (location.pathname) {
      case "/":
        // Desktop: Right side | Mobile: Small & Bottom Center
        // Added translate-y-[5%] to prevent bottom clipping on mobile
        return `${baseClasses} lg:translate-x-[25%] `;

      case "/projects":
        // Centered | Small scale to fit mobile width
        return `${baseClasses} lg:translate-x-[20%] `;

      case "/about":
        // Desktop: Left side & Flipped | Mobile: Small & Bottom Center
        return `${baseClasses} lg:translate-x-[25%] `;

      default:
        return `${baseClasses} translate-x-0 scale-100`;
    }
  };

  return (
    <main className="bg-black text-white selection:bg-purple-500 min-h-screen overflow-x-hidden">
      {/* 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-end justify-center">
        <div className={`w-full lg:h-full h-[65%]   ${getPositionClass()}`}>
          {/* 
            We use h-[100%] but inside a flex items-end container. 
            If the robot is still cropping, change h-full to h-[120vh] 
            to give the 3D camera more vertical room.
          */}
          <div className="w-full h-full pointer-events-auto">
            <Spline scene="https://prod.spline.design/1Wi4kkJ3uS6K3OMt/scene.splinecode" />
          </div>
        </div>
      </div>

      {/* UI LAYER */}
      <Navbar />

      <div className="relative z-10 pointer-events-none">
        {/* pointer-events-auto on this wrapper makes the text/buttons clickable */}
        <div className="pointer-events-auto min-h-screen">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
