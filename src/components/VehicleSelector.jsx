import { createSignal, onMount } from 'solid-js';

export function VehicleSelector(props) {
  const [makes, setMakes] = createSignal([]);
  const [models, setModels] = createSignal([]);
  const [loadingModels, setLoadingModels] = createSignal(false);

  const fetchMakes = async () => {
    // Fetch vehicle makes from an API or local data
    setMakes(['Toyota', 'Ford', 'Honda', 'Chevrolet', 'Nissan']);
  };

  const fetchModels = async (make) => {
    setLoadingModels(true);
    // Fetch models based on make from an API or local data
    const makeModels = {
      Toyota: ['Camry', 'Corolla', 'RAV4'],
      Ford: ['F-150', 'Mustang', 'Explorer'],
      Honda: ['Civic', 'Accord', 'CR-V'],
      Chevrolet: ['Silverado', 'Malibu', 'Equinox'],
      Nissan: ['Altima', 'Sentra', 'Rogue'],
    };
    setModels(makeModels[make] || []);
    setLoadingModels(false);
  };

  onMount(fetchMakes);

  const proceedToServices = () => {
    if (props.vehicle().make && props.vehicle().model) {
      props.setCurrentPage('services');
    } else {
      alert('Please select both make and model.');
    }
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4">Select Your Vehicle</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-700">Make</label>
          <select
            value={props.vehicle().make}
            onInput={(e) => {
              props.setVehicle({ ...props.vehicle(), make: e.target.value, model: '' });
              fetchModels(e.target.value);
            }}
            class="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select Make --</option>
            <For each={makes()}>{(make) => <option value={make}>{make}</option>}</For>
          </select>
        </div>
        <div>
          <label class="block text-gray-700">Model</label>
          <select
            value={props.vehicle().model}
            onInput={(e) => props.setVehicle({ ...props.vehicle(), model: e.target.value })}
            class="w-full p-2 border border-gray-300 rounded-md"
            disabled={!props.vehicle().make || loadingModels()}
          >
            <option value="">-- Select Model --</option>
            <For each={models()}>{(model) => <option value={model}>{model}</option>}</For>
          </select>
        </div>
        <button
          onClick={proceedToServices}
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}