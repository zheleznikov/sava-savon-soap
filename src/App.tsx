import "./index.css";
import {Calculator} from "./components2/Calculator";
import {FC} from "react";
import {SoapRecipeProvider} from "./context/SoapRecipeContext";
// import {NavBar} from "./components/NavBar";
// import {Receipts} from "./components/Receipts";

const App: FC = () => {


  return (
      <SoapRecipeProvider>
          <div className="min-h-screen bg-gradient-to-r from-pink-100 via-gray-100 to-pink-100  sm:px-4 sm:py-4 flex"
               style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%2390cdf4' stroke-width='4'/%3E%3Ccircle cx='300' cy='120' r='60' fill='none' stroke='%2390cdf4' stroke-width='3'/%3E%3Ccircle cx='200' cy='300' r='35' fill='none' stroke='%2390cdf4' stroke-width='2'/%3E%3Ccircle cx='400' cy='350' r='50' fill='none' stroke='%2390cdf4' stroke-width='4'/%3E%3Ccircle cx='150' cy='400' r='25' fill='none' stroke='%2390cdf4' stroke-width='2'/%3E%3C/svg%3E")`,
               }}
          >
              <div className="flex flex-col lg:flex-row w-full max-w-8xl mx-auto flex-grow justify-center">

                  {/* Блок калькулятора — на всю высоту */}
                  <div className="flex flex-col w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-2 sm:p-8 flex-grow">
                      <Calculator />
                  </div>

              </div>
          </div>

      </SoapRecipeProvider>



  )
}

export default App
