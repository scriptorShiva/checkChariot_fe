import knightBgImg from "../assets/images/knight.jpeg";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const joinGame = () => {
    navigate("/board");
  };

  return (
    <>
      <div className=" h-screen bg-gradient-to-r  from-slate-800 to bg-slate-950 grid grid-cols-2 px-20 place-content-center">
        <div className="grid place-content-center gap-1">
          <div className="text-6xl font-bold text-white">CHECK CHARIOT</div>
          <div className="text-2xl italic text-white">
            Don't let your opponent know your next move!
          </div>
          <span className="w-1/2 h-1 bg-gradient-to-r from-yellow-600 to  bg-yellow-300"></span>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                onClick={joinGame}
                className="w-full hover:bg-white hover:text-black"
              >
                Create Online
              </Button>
              <Button className="bg-white text-black hover:text-white">
                Watch Online
              </Button>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <img
            src={knightBgImg}
            alt="bg-img"
            className="h-auto rounded-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </>
  );
};
