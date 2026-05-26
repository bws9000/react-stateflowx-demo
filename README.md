# StateFlowX React Demo

This project demonstrates using `@stateflowx/client` inside a React application with realtime workflow execution and runtime event streaming.

The demo connects to a local StateFlowX runtime host over WebSockets, initializes the runtime configuration, executes a workflow, and renders the response in the UI.

Runtime lifecycle events are also streamed in realtime from the runtime to the React client.

---

# Requirements

Before running this project, you must also run the runtime host example:

<https://github.com/bws9000/stateflowx-runtime-host-example>

---

# Start the Runtime Host

Clone the runtime host example:

```bash
git clone https://github.com/bws9000/stateflowx-runtime-host-example.git
```

Install dependencies:

```bash
npm install
```

Start the runtime host:

```bash
node main.mjs
```

The runtime host should now be running locally on:

```txt
ws://localhost:3000
```

---

# Start the React Demo

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

# Current Runtime Configuration

StateFlowX V1 currently standardizes on:

- JSON-RPC
- WebSocket transport
- realtime runtime event streaming

HTTP transport support exists internally, but realtime runtime events currently require WebSockets.

---

# What This Demo Shows

This demo demonstrates:

- `@stateflowx/client`
- runtime initialization
- realtime runtime event streaming
- JSON-RPC communication
- WebSocket transport
- workflow execution
- provider fallback configuration
- AI-driven response formatting
- React integration
- realtime orchestration connectivity

---

# Runtime Events

The React client currently logs runtime lifecycle events including:

- `workflow.started`
- `workflow.completed`
- `workflow.failed`
- `runtime.message.received`

These events are streamed from the runtime host over WebSockets.

---

# Architecture Flow

```txt
React App
    ->
@stateflowx/client
    ->
WebSocket Transport
    ->
JSON-RPC Protocol
    ->
StateFlowX Runtime Host
    ->
Workflow Execution
    ->
Providers / Services
    ->
Runtime Events
    ->
Realtime Client Observability
```

---

# Example Runtime Event Flow

```txt
workflow.started
    ->
service.execute
    ->
provider.generate
    ->
workflow.completed
    ->
React runtime event stream
```

---

# Related Projects

- <https://github.com/bws9000/stateflowx-runtime-host-example>
- <https://github.com/NewJerseySoftware/stateflowx>