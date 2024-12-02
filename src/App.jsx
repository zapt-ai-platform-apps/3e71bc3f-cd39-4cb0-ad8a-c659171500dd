import { createSignal, For, Show, onMount } from 'solid-js';
import { VehicleSelector } from './components/VehicleSelector';
import { ServiceSelector } from './components/ServiceSelector';
import { EstimateView } from './components/EstimateView';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function App() {
  const [currentPage, setCurrentPage] = createSignal('vehicle');
  const [vehicle, setVehicle] = createSignal({ make: '', model: '' });
  const [services, setServices] = createSignal([]);
  const [selectedServices, setSelectedServices] = createSignal([]);
  const [user, setUser] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };

  onMount(checkUserSignedIn);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div class="min-h-screen bg-gray-100 text-gray-800">
      <Show when={user()} fallback={
        <div class="flex items-center justify-center min-h-screen">
          <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-6 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              view="magic_link"
              showLinks={false}
              authView="magic_link"
            />
          </div>
        </div>
      }>
        <div class="container mx-auto p-4">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Vehicle Repair Estimate Calculator</h1>
            <div>
              <button
                onClick={handleSignOut}
                class="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div class="bg-white p-6 rounded-md shadow-md">
            <Show when={currentPage() === 'vehicle'}>
              <VehicleSelector
                vehicle={vehicle}
                setVehicle={setVehicle}
                setCurrentPage={setCurrentPage}
              />
            </Show>
            <Show when={currentPage() === 'services'}>
              <ServiceSelector
                services={services}
                setServices={setServices}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                setCurrentPage={setCurrentPage}
                vehicle={vehicle}
              />
            </Show>
            <Show when={currentPage() === 'estimate'}>
              <EstimateView
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                setCurrentPage={setCurrentPage}
                vehicle={vehicle}
              />
            </Show>
          </div>
          <div class="mt-4 text-center">
            Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">ZAPT</a>
          </div>
        </div>
      </Show>
    </div>
  );
}