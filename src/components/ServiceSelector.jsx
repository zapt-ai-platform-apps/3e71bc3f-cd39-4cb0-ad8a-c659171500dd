import { createSignal, onMount, For } from 'solid-js';

export function ServiceSelector(props) {
  const [availableServices, setAvailableServices] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchServices = async () => {
    setLoading(true);
    // Fetch services from an API or local data
    const servicesData = [
      { id: 1, name: 'Oil Change', description: 'Replace engine oil', cost: 50 },
      { id: 2, name: 'Brake Replacement', description: 'Replace brake pads', cost: 200 },
      { id: 3, name: 'Tire Rotation', description: 'Rotate tires', cost: 30 },
      { id: 4, name: 'Battery Replacement', description: 'Install new battery', cost: 150 },
      { id: 5, name: 'Engine Tune-Up', description: 'Complete engine tune-up', cost: 300 },
    ];
    setAvailableServices(servicesData);
    setLoading(false);
  };

  onMount(fetchServices);

  const toggleService = (service) => {
    const selected = props.selectedServices();
    const index = selected.findIndex((s) => s.id === service.id);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push({ ...service, quantity: 1 });
    }
    props.setSelectedServices([...selected]);
  };

  const proceedToEstimate = () => {
    if (props.selectedServices().length > 0) {
      props.setCurrentPage('estimate');
    } else {
      alert('Please select at least one service.');
    }
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4">Choose Repair Services</h2>
      <Show when={!loading()} fallback={<div>Loading services...</div>}>
        <div class="space-y-2">
          <For each={availableServices()}>
            {(service) => (
              <div class="flex items-center justify-between border p-2 rounded-md">
                <div>
                  <p class="font-semibold">{service.name}</p>
                  <p class="text-sm text-gray-600">{service.description}</p>
                  <p class="text-sm text-gray-800">Cost: ${service.cost}</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={props.selectedServices().some((s) => s.id === service.id)}
                    onChange={() => toggleService(service)}
                    class="cursor-pointer w-5 h-5"
                  />
                </div>
              </div>
            )}
          </For>
        </div>
        <button
          onClick={proceedToEstimate}
          class="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600"
          disabled={loading()}
        >
          View Estimate
        </button>
        <button
          onClick={() => props.setCurrentPage('vehicle')}
          class="mt-2 w-full px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600"
        >
          Back
        </button>
      </Show>
    </div>
  );
}