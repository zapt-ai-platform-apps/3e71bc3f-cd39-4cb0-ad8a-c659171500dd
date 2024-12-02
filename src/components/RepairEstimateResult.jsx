import { Show, For } from 'solid-js';

export default function RepairEstimateResult(props) {
  const { estimate } = props;

  return (
    <Show when={estimate()}>
      <div class="w-full max-w-xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Estimated Repair Cost</h2>
        <p class="mb-2">
          Vehicle: {estimate().vehicleInfo.make} {estimate().vehicleInfo.model} {estimate().vehicleInfo.year}
        </p>
        <ul class="mb-4">
          <For each={estimate().repairs}>
            {(repair) => (
              <li class="flex justify-between">
                <span>{repair.name}</span>
                <span>${repair.averageCost}</span>
              </li>
            )}
          </For>
        </ul>
        <div class="flex justify-between font-semibold">
          <span>Total Estimated Cost:</span>
          <span>${estimate().totalCost}</span>
        </div>
      </div>
    </Show>
  );
}