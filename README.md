# StateFlowX React Demo

This project demonstrates using `@stateflowx/client` inside a React application.

The demo connects to a local StateFlowX runtime host, initializes the runtime configuration, executes a workflow, and renders the response in the UI.

---

# Requirements

Before running this project, you must also run the runtime host example:

https://github.com/bws9000/stateflowx-runtime-host-example

---

# Start the Runtime Host

Clone the runtime host example:

```bash
git clone https://github.com/bws9000/stateflowx-runtime-host-example.git
```

Install dependencies:

```bash
yarn
```

Start the runtime host:

```bash
node main.mjs
```

The runtime host should now be running locally on:

```txt
http://localhost:3000
```

---

# Start the React Demo

Install dependencies:

```bash
yarn
```

Run the React application:

```bash
yarn dev
```

Open:

```txt
http://localhost:5173
```

---

# What This Demo Shows

This demo demonstrates:

- `@stateflowx/client`
- runtime initialization
- JSON-RPC communication
- HTTP transport
- workflow execution
- provider fallback configuration
- AI-driven response formatting
- React integration

---

# Architecture Flow

```txt
React App
    ->
@stateflowx/client
    ->
Transport Layer (HTTP / JSON-RPC)
    ->
StateFlowX Runtime Host
    ->
Workflow Execution
    ->
Provider + Service Resolution
    ->
Response Returned to Client
```

---

# Related Projects

- <https://github.com/bws9000/stateflowx-runtime-host-example>
- <https://github.com/NewJerseySoftware/stateflowx>
