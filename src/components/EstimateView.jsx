import { For } from 'solid-js';

export function EstimateView(props) {
  const totalCost = () =>
    props.selectedServices().reduce((total, service) => total + service.cost * service.quantity, 0);

  const adjustQuantity = (serviceId, delta) => {
    const services = props.selectedServices().map((service) => {
      if (service.id === serviceId) {
        const newQuantity = service.quantity + delta;
        return { ...service, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return service;
    });
    props.setSelectedServices(services);
  };

  return (
    <div>
      <h2 class="text-xl font-bold mb-4">Estimate for {props.vehicle().make} {props.vehicle().model}</h2>
      <div class="space-y-2">
        <For each={props.selectedServices()}>
          {(service) => (
            <div class="flex items-center justify-between border p-2 rounded-md">
              <div>
                <p class="font-semibold">{service.name}</p>
                <p class="text-sm text-gray-600">{service.description}</p>
                <p class="text-sm text-gray-800">Cost per unit: ${service.cost}</p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  onClick={() => adjustQuantity(service.id, -1)}
                  class="px-2 py-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
                >
                  –
                </button>
                <span>{service.quantity}</span>
                <button
                  onClick={() => adjustQuantity(service.id, 1)}
                  class="px-2 py-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="mt-4">
        <p class="text-xl font-bold">Total Estimate: ${totalCost()}</p>
        <p class="text-sm text-gray-600">* Taxes and additional fees may apply.</p>
      </div>
      <button
        onClick={() => props.setCurrentPage('services')}
        class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
      >
        Modify Selection
      </button>
    </div>
  );
}