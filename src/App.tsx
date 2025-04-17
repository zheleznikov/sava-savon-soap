import "./index.css";
import {Calculator} from "./components2/Calculator";
import {FC} from "react";
// import {Receipts} from "./components/Receipts";

const App: FC = () => {

  return (
      <div className="min-h-screen bg-gradient-to-r from-pink-100 via-gray-100 to-pink-100  sm:px-4 sm:py-4 flex">
          <div className="flex flex-col lg:flex-row w-full max-w-8xl mx-auto flex-grow justify-center">

              {/* Блок калькулятора — на всю высоту */}
              <div className="flex flex-col w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-2 sm:p-8 flex-grow">
                  <Calculator />
              </div>

          </div>
      </div>

  )
}

export default App
