import {formatNumber} from "../../shared/lib/utils";
import {TOil} from "../../entities/oil/model/oil.types";

export const OilsList = ({
                             selectedOils,
                             totalOilAmount
                         }: {
    selectedOils: TOil[];
    totalOilAmount: number;
}) => {
    const getRowClass = (index: number) =>
        `grid grid-cols-3 gap-2 py-1 ${index % 2 === 0 ? "bg-stone-50/90" : "bg-white"} rounded-md px-2 items-center`;

    const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

    return (
        <div>
            <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Масла</h4>
            <ul className="space-y-1">
                {selectedOils.map((oil, index) => (
                    <li key={oil.id} className={getRowClass(index)}>
                        <span className="text-gray-700 whitespace-normal break-words">{oil.name_rus}</span>
                        <span className="text-center text-gray-800 font-medium">
                            {formatNumber(oil.percent, 0)}%
                        </span>
                        <span className="text-center text-gray-800 font-medium">
                            {formatNumber(oil.gram, 0)} г
                        </span>
                    </li>
                ))}
            </ul>

            <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center mt-1">
                <span className="font-medium">Масса масел</span>
                <span className="text-center text-gray-800 font-medium">
                    {formatNumber(totalPercent, 0)}%
                </span>
                <span className="text-center font-semibold">
                    {formatNumber(totalOilAmount, 0)} г
                </span>
            </div>
        </div>
    );
};
