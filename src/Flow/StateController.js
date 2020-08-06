class StateController {

	StateController() {
        this.states = new Map();
        this.running = true;
        this.curState = null;
        this.nextState = null;
        this.passedData = null;
	}
	
	addState(state) {
		states.put(state.getName(), state);
		state.controller = this;
	}
	
	changeState(name) {
		nextState = states.get(name);
	}
	
	changeState(name, passData) {
		passedData = passData;
		nextState = states.get(name);
	}
	
	start(startStateName) {
		curState = states.get(startStateName);
		curState.start(null);
		run();
	}
	
	shutdown() {
		running = false;
	}
	
	run() {
		while(running) {
			curState.run();
			if(nextState != null) {
				curState.stop();
				curState = nextState;
				nextState = null;
				curState.start(passedData);
				passedData = null;
			}
		}
	}
}