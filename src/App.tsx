import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ElementryDetailPage from "./pages/elementry-detail";
import HomePage from "./pages/home";
import { APP_ROUTER } from "./consts";
import { useEffect, useRef } from "react";

const router = createBrowserRouter([
  {
    path: APP_ROUTER.HOME,
    element: <HomePage />,
  },
  {
    path: APP_ROUTER.ELEMENTRY_DETAIL,
    element: <ElementryDetailPage />,
  },
]);

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    const playAudio = async () => {
      if (isPlayedRef.current) return;

      if (audioRef.current) {
        await audioRef.current.play();
        isPlayedRef.current = true;
      }
    };
    window.addEventListener("click", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <audio ref={audioRef} autoPlay loop>
        <source src="/background-music.mp3"></source>
      </audio>
    </>
  );
}

export default App;
