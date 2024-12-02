import { createSignal } from 'solid-js';

const repairsList = [
  { id: 1, name: 'Oil Change', averageCost: 50 },
  { id: 2, name: 'Brake Pads Replacement', averageCost: 200 },
  { id: 3, name: 'Battery Replacement', averageCost: 150 },
  { id: 4, name: 'Tire Rotation', averageCost: 40 },
  { id: 5, name: 'Engine Tune-Up', averageCost: 300 },
  // Add more repairs as needed
];

export default function RepairEstimateForm(props) {
  const { vehicleInfo, setVehicleInfo, selectedRepairs, setSelectedRepairs, setEstimate, loading, setLoading } = props;

  const handleVehicleInfoChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo({ ...vehicleInfo(), [name]: value });
  };

  const handleRepairSelection = (e) => {
    const { value, checked } = e.target;
    const repairId = parseInt(value);
    if (checked) {
      setSelectedRepairs([...selectedRepairs(), repairId]);
    } else {
      setSelectedRepairs(selectedRepairs().filter((id) => id !== repairId));
    }
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedRepairDetails = repairsList.filter((repair) => selectedRepairs().includes(repair.id));
    const totalCost = selectedRepairDetails.reduce((sum, repair) => sum + repair.averageCost, 0);

    setTimeout(() => {
      // Simulate API call delay
      setEstimate({
        vehicleInfo: vehicleInfo(),
        repairs: selectedRepairDetails,
        totalCost,
      });
      setLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={calculateEstimate} class="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Vehicle Information</h2>
      <div class="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={vehicleInfo().make}
          onInput={handleVehicleInfoChange}
          required
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={vehicleInfo().model}
          onInput={handleVehicleInfoChange}
          required
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={vehicleInfo().year}
          onInput={handleVehicleInfoChange}
          required
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h2 class="text-xl font-semibold mb-4 text-gray-800">Select Repairs Needed</h2>
      <div class="mb-6 grid grid-cols-1 gap-2">
        {repairsList.map((repair) => (
          <label class="flex items-center space-x-3" key={repair.id}>
            <input
              type="checkbox"
              value={repair.id}
              onChange={handleRepairSelection}
              class="cursor-pointer"
            />
            <span class="text-gray-700">{repair.name} (${repair.averageCost})</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        class={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50`}
        disabled={selectedRepairs().length === 0 || loading()}
      >
        {loading() ? 'Calculating...' : 'Calculate Estimate'}
      </button>
    </form>
  );
}