## Welcome to VendCo!

### Your #1 place for refreshments and snacks

Welcome, engineer! We here at VendCo are proud to welcome you to our vending machine empire.

We just got a rush order of 1,000 new vending machines to be installed in Kohl's changing rooms around the continental US. I don't undertand it, but that's what the order slip says, so we've got to get to it!

Only thing is, the firmware is not done. We need you to help us write the firmware and display system so we can make sure to ship this on time.

### Business Rules

We sell the following items:

Candy Bar: $1
Soda: $1.50
Coffee: $3
Plush Keychain: $37
Old non-winning scratch off ticket: $0

All money within the system is handled in integer cents -i.e., `insertMoney(150) ## $1.50`

We expect the vending machine to be instantiated with:

10 Candy Bars
12 Sodas
300 Coffees
4 Plush Keychains
17 Old non-winning scratch off tickets

At the end of the exercise, you should be able to:

Instantiate a vending machine instance
Check its stock
Purchase items
Be told to put in more money if you don't have enough to pay for an item
Ensure items are in inventory before dispensing them

### Interface

Our tests expect a class called `VendingMachine` to be exported from `vending.ts`. We've made some stub functions that you can use to build out your own implementation. You don't have to, they exist only to start you on a path. Within the class, you can choose to model state however you see fit: variables, state machines, functional programming or something else entirely. You can model it however you think is appropriate (there's no right answer, but we will ask why you chose one option over another, when the others might be a better fit, etc.)

The tests do not fully capture the set of requirements - please think through missing requirements and add additional tests.

** Include a short note (5–10 sentences) explaining your state model choice and any assumptions you made. **

### Expectations

We hope you spend roughly 60-90 minutes on this task. Please feel free to write your own unit tests, refactor to use another library, etc.

_We are more concerned with how you think about a problem and model a solution than the actual code that is produced._

To that end, we do not disallow AI tools (we use them daily to great effect ourselves). However, at YML, each engineer is 100% responsible for the code that they commit - we expect an engineer to drive the architectural decisions, evaluate all code before it goes to production, etc. So, if you use AI tools, please include a copy of the transcript to show the type of prompts you use, how you work with the tools, etc.

If you find yourself done and still have some time left (within the 60-90 minute window), think about what other features you could add:

- What would change about this system if it were handling many different vending machines and had to implement networking / distributed scale?
- How would a "pay by phone" work in practice? What additional programming interfaces would be needed, what infrastructure would you use?
- How would you handle localization or allowing people to pay with different currencies? What problems would that introduce?
- How would you put a React front-end around this? What sort of usability concerns would you have? How would you secure the API?

These are all just to get you thinking; there is no "right answer", do not answer all of them, just pick one (or come up with your own!) way that you would extend this. You DO NOT need to implement anything extra, this is just a thought exercise to see how you would take a relatively simple set of work and extend it to handle more and more complex use cases.

We hope this is a fun exercise; none of this is meant to be a "gotcha" or a pass/fail. We are simply trying to reduce some of the complexities that we work with on a day-to-day basis to something that can be reasonably accomplished in 60-90 minutes and lead to a discussion with our engineers about tradeoffs, design choices, and programming patterns.

** Include a short note (5–10 sentences) explaining your state model choice and any assumptions you made. **

If you have any questions, feel free to email jacob.smith@yourmoneyline.com
