import { useEffect, useState } from 'react';

import {
  createClient,
  defineConfig,
  gemini,
  jsonRpc,
  mockProvider,
  http,
} from '@stateflowx/client';

const config = defineConfig({
  protocol: jsonRpc(),

  transport: http({
    url: 'http://localhost:3000/rpc',
  }),

  providers: [
    gemini({
      priority: 1,
    }),

    mockProvider({
      priority: 2,
    }),
  ],

  services: [
    {
      name: 'weather',

      type: 'http',

      method: 'GET',

      url: 'https://api.open-meteo.com/v1/forecast?latitude=40.7357&longitude=-74.1724&current_weather=true',
    },
  ],

  workflows: [
    {
      route: 'weather.execute',

      service: 'weather',

      provider: 'default',

      prompt: `
      Return ONLY valid JSON.

      Format this weather data into an array structure.

      Example:
      [
        {
          "city": "Newark",
          "temperature": 72,
          "condition": "Rain"
        }
      ]
      `,
    },
  ],
});

const client = createClient(config);

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        await client.connect();

        console.log('CONNECTED');

        await client.request('runtime.initialize', config);

        console.log('RUNTIME INITIALIZED');

        const result = await client.request('weather.execute');

        console.log('RAW RESPONSE:', result);

        const cleaned = result
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        const parsed = JSON.parse(cleaned);

        setResponse(parsed);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  return (
    <div
      style={{
        padding: '24px',
        fontFamily: 'Arial',
        background: '#111827',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1>StateFlowX React Demo</h1>

      <p>
        Runtime + Workflow + AI Provider + HTTP Service
      </p>

      {loading && <p>Loading...</p>}

      {!loading && (
        <pre
          style={{
            background: '#1f2937',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
