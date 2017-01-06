## Helicopter

### Background

Helicopter is a classic game that calls for the user to control a helicopter and dodge obstacles. Fly the helicopter as far as you can.

### Functionality & MVP

With Helicopter, users will be able to:
- [ ] Instructions Modal to explain directions and rules
- [ ] Navigate through the sky to avoid obstacles like birds and other airplanes.
- [ ] High scores will be saved in database.
- [ ] Production README

### Wireframes

The app will be a single screen with links to the Github repo, my LinkedIn, portfolio, and the Instructions modal.

![JSGame][/game-wireframe.png]

### Architecture & Technologies

This project will be implemented using the following technologies:

- Vanilla JavaScript
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and serve various scripts

Scripts:
`moving_object.js`
`helicopter.js`
`game.js`
`game_view.js`

### Implementation Timeline

**Day 1**
- Setup Node modules and webpack and install `Easel.js`
- Create basic entry file with all of the necessary script skeletons
- Learn how to use `Easel` and refresh on `Canvas` to figure out logic for rendering an object and being able to move the environment as well as the object.

**Day 2**
- Build out the `game`, `game_view`, `moving_object`, `helicopter`
- Have environment move at constant speed to the left
- Collisions logic
- Be able to move the ship up and down

**Day 3**
- Increase the number of obstacles at a logarithmic rate.
- Implement backend for saving high scores
- Implement 'instructions' modal
- Style the frontend

**Day 4**
- Debug & Finish styling
