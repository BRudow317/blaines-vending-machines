# Blaine's Vending Machine

## Contact
- [jacob.smith@yourmoneyline.com](mailto:jacob.smith@yourmoneyline.com)

## Doc links
- [React useState docs](https://react.dev/reference/react/useState)
- [TypeScript Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Vitest Docs](https://vitest.dev/api/)

## How To
```shell
npm install
npx vitest run ./tests.ts
npx vitest run ./claude.test.ts
npm run build # or just `npm run dev`
npm run preview
```

## Dependencies
```shell
npm list
```
blaines-vending-machines@1.0.0 Q:\HomeLab\projects\blaines-vending-machines
├── @eslint/js@9.39.2
├── @types/node@24.10.13
├── @types/react-dom@19.2.3
├── @types/react@19.2.14
├── @vitejs/plugin-react-swc@4.2.3
├── eslint-plugin-react-hooks@7.0.1
├── eslint-plugin-react-refresh@0.4.26
├── eslint@9.39.2
├── globals@16.5.0
├── react-dom@19.2.4
├── react@19.2.4
├── tree-node-cli@1.6.0
├── typescript-eslint@8.55.0
├── typescript@5.9.3
├── vite@7.3.1
└── vitest@4.0.18

## Final Project Structure
```shell
npx tree-node-cli -I "node_modules|dist" 
```
blaines-vending-machines
├── README-Blaines-vending-machine.md
├── README-Original.md
├── blaines-vending-machines.code-workspace
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── VendingMachineApp.tsx
│   ├── claude.test.ts
│   ├── index.css
│   ├── main.tsx
│   ├── tests.ts
│   └── vending.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts

## Architectural Choices
- I chose a quick React build with Vite and TypeScript to put together a quick front end for the vending machine.
  - I ran the quick and easy Vite + SWC + React + TypeScript.
  - I also utilized some existing config files from other projects to save some time on setup.
- ### State Management
  - I went with the tried and true `useState` for state management in the React app. This is a simple application, so `useState` is sufficient for managing the state of the vending machine, balance, and vending box messages.
  - If I'd had more time I might utilize `useReducer` or `useSyncExternalStore`
- I chose **Vitest** for testing
  - 1. Because it looked like your test class was built for it
  - 2. Vitest is the easiest test framework I've used with typescript and React.
- I instantiated the vending machine in the `VendingMachineApp.tsx` file and managed it with React state. 

## AI usage output
### My prompt to Claude Sonnet
```text
I need to set up some tests for my vending machine

I want to include automated tests I can run with vitest
The project is a frontend only build and is to demonstrate a mvp in a time constraint.

Tests I want you to generate: 
unit tests on each of the functions in either file
test the input and output of each function
test to see if state can be broken by an unhandled exception I did not anticipate
test to see that the thrown error values match the anticipated test error value

What did I miss?
What other tests would be important to run?
```

## Addtional Bonus Points
    If you find yourself done and still have some time left (within the 60-90 minute window), think about what other features you could add:
- What would change about this system if it were handling many different vending machines and had to implement networking / distributed scale?
  - **External Data repository**
  - **Logging**
  - **Monitoring/telemetry**
  - **Network communication protocols**
- How would a "pay by phone" work in practice? What additional programming interfaces would be needed, what infrastructure would you use?

- How would you handle localization or allowing people to pay with different currencies? What problems would that introduce?
- How would you put a React front-end around this? What sort of usability concerns would you have? How would you secure the API?
  - **I did put a simple React front end around this!** 
  - **But there's a LOT of things I would do differently without the MVP time constraint.** 

# Blaines Additions 

## Times 
I spent a little longer than the 90 minutes, but I spent a chunk of that tinkering with the front end styling and building the simple UI.
- 10:45 AM Unzipped
- 12:25 PM Done
- Completing the notes and findings.

## Edge Cases Detailed
- whats the max stock of each item?
- what's the current inventory of change/cash in the machine?
- what happens if the machine is errored out and needs to self heal?
- what happens if the machine is vandalized or broken into?
- what happens if the user tries to cancel a transaction?
- what happens if the user tries to purchase an item that is out of stock?
- what happens if the user tries to purchase an item that is too expensive?
- what happens if the user tries to insert money that is not accepted by the machine?
- what if the vending machine is connected to a network for credit cards?
- what if the vending machine is connected to a network for inventory management?
- what if the vending machine is connected to a network for remote monitoring and maintenance?
- what security controls can I implement if my build is on the frontend only?
