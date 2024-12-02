import { createSignal } from 'solid-js';
import RepairEstimateForm from './components/RepairEstimateForm';
import RepairEstimateResult from './components/RepairEstimateResult';

export default function App() {
  const [vehicleInfo, setVehicleInfo] = createSignal({
    make: '',
    model: '',
    year: '',
  });

  const [selectedRepairs, setSelectedRepairs] = createSignal([]);
  const [estimate, setEstimate] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Vehicle Repair Estimate Calculator</h1>
      <RepairEstimateForm
        vehicleInfo={vehicleInfo}
        setVehicleInfo={setVehicleInfo}
        selectedRepairs={selectedRepairs}
        setSelectedRepairs={setSelectedRepairs}
        setEstimate={setEstimate}
        loading={loading}
        setLoading={setLoading}
      />
      <RepairEstimateResult estimate={estimate} />
      <div class="mt-4 text-sm text-gray-600">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer">
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}