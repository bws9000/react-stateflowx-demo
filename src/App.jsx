import { useEffect, useState } from 'react';

import {
  createClient,
  defineConfig,
  gemini,
  http,
  jsonRpc,
  mockProvider,
  websocket,
} from '@stateflowx/client';

const config = defineConfig({
  protocol: jsonRpc(),

  //
  // Runtime transport
  //
  // HTTP:
  //   - Request / response
  //
  // WebSocket:
  //   - Request / response
  //   - Realtime runtime events
  //

  // transport: websocket({
  //   url: 'ws://localhost:3001',
  // }),

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

      //
      // Demo-safe deterministic mock
      //
      url: 'mock://weather',
    },
  ],

  flows: [
  {
    name: 'Weather Analysis',

    route: 'weather.execute',

    actions: [
      {
        id: 'weather-service',

        type: 'service',

        service: 'weather',

        outputConnectors: [
          {
            actionId:
              'weather-provider',
          },
        ],
      },
      {
        id: 'weather-provider',

        type: 'provider',

        provider: 'gemini',

        prompt: `
          Return ONLY valid JSON.

          Return exactly one array item.

          Schema:

          [
            {
              "city": string,
              "temperature": number,
              "condition": string
            }
          ]

          Use the supplied weather data from {{weather-service}}
        `,

        output: true,

        //
        // Optional MySQL persistence
        //
        // Uncomment this connector and the
        // weather-store action below.
        //
        // The runtime host must use:
        // STORE_TYPE=mysql
        //
        // outputConnectors: [
        //   {
        //     actionId:
        //       'weather-store',
        //   },
        // ],
      },

      //
      // Optional MySQL store action
      //
      // {
      //   id: 'weather-store',
      //
      //   type: 'store',
      //
      //   store: 'mysql',
      //
      //   operation: 'set',
      //
      //   key: 'weather:last-result',
      //
      //   log: true,
      //
      //   output: true,
      // },
    ],
  },
],
});

const client = createClient(config);

function App() {

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function run() {

      try {

        //
        // Optional runtime event logging.
        //
        // Runtime events are emitted when using
        // the WebSocket transport.
        //
        client.onRuntimeEvent((event) => {
          console.log(
            '[RUNTIME EVENT]',
            event
          );
        });

        client.onConnect(() => {
          console.log(
            '[CLIENT] Connected'
          );
        });

        client.onDisconnect(() => {
          console.log(
            '[CLIENT] Disconnected'
          );
        });

        await client.connect();

        await client.precheck(config);

        console.log(
          '[CLIENT] Precheck passed'
        );

        await client.request(
          'runtime.initialize',
          config
        );

        console.log(
          '[CLIENT] Runtime initialized'
        );

        const result =
          await client.request(
            'weather.execute'
          );

        console.log(
          '[WORKFLOW RESULT]',
          result
        );

        const cleaned =
          result
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const parsed =
          JSON.parse(cleaned);

        setResponse(parsed);

      } catch (error) {

        console.error(
          '[WORKFLOW ERROR]',
          error
        );

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
      <h1>
        StateFlowX React Demo
      </h1>

    <p>
      Configurable Flow + AI Provider + Optional MySQL Storage
    </p>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading && (
        <pre
          style={{
            background: '#1f2937',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
          }}
        >
          {JSON.stringify(
            response,
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}

export default App;
