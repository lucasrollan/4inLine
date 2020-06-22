# 4 in line

This is a personal project where I built a simple artifitial intelligence that can play (reasonably well) the classical connect 4 board game.

## Considerations
- this is a proof of concept and there are many points that can be improved (noted below)
- focus of the project was on building the AI, so the UI was not given much love

## Code organization
Domain driven design principles are followed.

### Model
The bulk of the logic is within the `model/` folder.
At the top level of this folder the main components of the problem domain can be found.
In this space, folders are used to keep encapsulation. Make sure to only import from folder level.
(i.e.: `import { BoardFactory } from './board'` instead of `import { BoardFactory } from './board/board-factory'`). This way, public members are declared in `index.ts` and the rest are considered private.

### Application
This is a very thin layer that helps the presentation layer interact with the model without having to know the details

### Presentation
This is where the UI lives. It uses React and Styled Components.
The presentation layer was put together pretty quickly and without love, so expect a bit of mess.

## To be improved
- UI is not covered by unit tests
- Code coverage should be calculated for unit tests
- Not enough visibility on what the AI is doing. Should add some debugging
- Should have type definitions in separate files
- Should separate UI components better
- Encapsulate dealing with the application layer in the presentation

## Opportunities
- Get the AI to run in AWS lambda
- Set up Cucumber for Behaviour Driven Tests
- Add a cache for most common game states (probably 10 initial turns)
