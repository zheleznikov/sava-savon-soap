import {formatNumber} from "../../shared/lib/utils";

export const ParametersList = ({
                                   superfatPercent,
                                   waterPercent,
                                   lyeType,
                                   totalLyeAmount,
                                   totalWaterAmount
                               }: {
    superfatPercent: number;
    waterPercent: number;
    lyeType: string;
    totalLyeAmount: number;
    totalWaterAmount: number;
}) => {
    const getRowClass = (index: number) =>
        `grid grid-cols-3 gap-2 py-1 ${index % 2 === 0 ? "bg-stone-50/90" : "bg-white"} rounded-md px-2 items-center`;

    const items = [
        { label: "Пережир", percent: Math.round(superfatPercent), gram: "—" },
        { label: "Вода", percent: Math.round(waterPercent), gram: formatNumber(totalWaterAmount) },
        { label: lyeType, percent: "—", gram: formatNumber(totalLyeAmount) }
    ];

    return (
        <div>
            <h4 className="text-md font-semibold text-emerald-700 mb-2 mt-1">Параметры ввода</h4>
            <ul className="space-y-1 mt-2">
                {items.map((item, index) => (
                    <li key={index} className={getRowClass(index)}>
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-center text-gray-800 font-medium">
                            {item.percent !== "—" ? `${item.percent}%` : "—"}
                        </span>
                        <span className="text-center text-gray-800 font-medium">
  {item.label === "Вода" || item.label === lyeType ? (
      <span className="inline-block border border-emerald-500 text-sm font-medium rounded-full px-2 py-0.5">
      {item.gram} г
    </span>
  ) : (
      <>
          {item.gram} {item.gram !== "—" ? "г" : ""}
      </>
  )}
</span>

                    </li>
                ))}
            </ul>
        </div>
    );
};
