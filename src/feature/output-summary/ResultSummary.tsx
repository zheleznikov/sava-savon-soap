import {formatNumber} from "../../shared/lib/utils";

export const ResultSummary = ({ totalResultAmount }: { totalResultAmount: number }) => (
    <div>
        <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Итог</h4>
        <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-gray-800 bg-stone-100 rounded-md px-2 py-2 items-center mt-1">
            <span>Общая масса</span>
            <span className="text-center text-gray-400">—</span>
            <span className="text-center font-bold">{formatNumber(totalResultAmount)} г</span>
        </div>
    </div>
);
