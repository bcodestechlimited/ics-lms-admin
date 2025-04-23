import { useState } from "react";
import { Button } from "../button";
import { X } from "lucide-react";
import ModalContainer from "./modalcontainer";
import CloseModalIcon from "../close-modal-icon";

export const ChartEditorModal = ({
  isOpen,
  onClose,
  chartType,
  initialData,
  onSave,
}) => {
  const [seriesData, setSeriesData] = useState(() => {
    if (chartType === "pie") {
      return initialData.series.map((value, index) => ({
        value,
        label: initialData.options.labels[index],
      }));
    }
    return initialData.series.map((series, seriesIndex) => ({
      name: series.name,
      data: series.data.map((value, index) => ({
        value,
        category: initialData.options.xaxis.categories[index],
      })),
    }));
  });

  const handleSave = () => {
    let newChartData;
    if (chartType === "pie") {
      newChartData = {
        series: seriesData.map((item) => Number(item.value)),
        options: {
          ...initialData.options,
          labels: seriesData.map((item) => item.label),
        },
      };
    } else {
      newChartData = {
        series: seriesData.map((series) => ({
          name: series.name,
          data: series.data.map((item) => Number(item.value)),
        })),
        options: {
          ...initialData.options,
          xaxis: {
            categories: seriesData[0].data.map((item) => item.category),
          },
        },
      };
    }
    onSave(newChartData);
    onClose();
  };

  const addDataPoint = () => {
    if (chartType === "pie") {
      setSeriesData([...seriesData, { value: 0, label: `New Item` }]);
    } else {
      const newSeriesData = seriesData.map((series) => ({
        ...series,
        data: [
          ...series.data,
          { value: 0, category: `Category ${series.data.length + 1}` },
        ],
      }));
      setSeriesData(newSeriesData);
    }
  };

  const removeDataPoint = (seriesIndex, dataIndex) => {
    if (chartType === "pie") {
      setSeriesData(seriesData.filter((_, i) => i !== dataIndex));
    } else {
      const newSeriesData = seriesData.map((series, sIndex) => ({
        ...series,
        data: series.data.filter((_, i) => i !== dataIndex),
      }));
      setSeriesData(newSeriesData);
    }
  };

  // const addSeries = () => {
  //   if (chartType !== "pie") {
  //     setSeriesData([
  //       ...seriesData,
  //       {
  //         name: `Series ${seriesData.length + 1}`,
  //         data: seriesData[0].data.map((item) => ({ ...item, value: 0 })),
  //       },
  //     ]);
  //   }
  // };

  return (
    <ModalContainer>
      <div className="max-w-2xl bg-white px-8 py-4 rounded-xl border relative space-y-4 max-h-[500px] overflow-auto">
        <CloseModalIcon handleClose={onClose} />
        <div className="relative">
          <h3>Edit Chart Data</h3>
        </div>

        <div className="space-y-4">
          {/* {chartType !== "pie" && (
            <div>
              <Button onClick={addSeries} variant="outline">
                Add Series
              </Button>
            </div>
          )} */}

          {seriesData.map((series, seriesIndex) => (
            <div key={seriesIndex} className="space-y-2">
              {chartType !== "pie" && (
                <div>
                  <label className="block mb-2">Series Name:</label>
                  <input
                    type="text"
                    value={series.name}
                    onChange={(e) => {
                      const newData = [...seriesData];
                      newData[seriesIndex].name = e.target.value;
                      setSeriesData(newData);
                    }}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}

              {series.data.map((item, dataIndex) => (
                <div key={dataIndex} className="flex gap-x-4 items-center">
                  {chartType === "pie" ? (
                    <>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const newData = [...seriesData];
                          newData[dataIndex].label = e.target.value;
                          setSeriesData(newData);
                        }}
                        placeholder="Label"
                        className="flex-1 p-2 border rounded-md"
                      />
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => {
                          const newData = [...seriesData];
                          newData[dataIndex].value = e.target.value;
                          setSeriesData(newData);
                        }}
                        placeholder="Value"
                        className="w-24 p-2 border rounded-md"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const newData = [...seriesData];
                          newData[seriesIndex].data[dataIndex].category =
                            e.target.value;
                          setSeriesData(newData);
                        }}
                        placeholder="Category"
                        className="flex-1 p-2 border rounded-md"
                      />
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => {
                          const newData = [...seriesData];
                          newData[seriesIndex].data[dataIndex].value =
                            e.target.value;
                          setSeriesData(newData);
                        }}
                        placeholder="Value"
                        className="w-24 p-2 border rounded-md"
                      />
                    </>
                  )}
                  <button
                    onClick={() => removeDataPoint(seriesIndex, dataIndex)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}

          <Button onClick={addDataPoint} variant="outline">
            Add Data Point
          </Button>
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <button onClick={onClose} className="outline-0 underline">
            Cancel
          </button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </ModalContainer>
  );
};
