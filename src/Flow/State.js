 class State {
	
	State(name) {
        this.name = name;// unique identifier
        this.controller = controller;
	}
	
	getName() {
		return this.name;
    }
    
    showOption
	
	// called before the first run(), the input acc is
	// any the Account the last state has passed along
	start(acc) {throw new Error("FYI: Instance of Abstract class cannot be instantiated");}
	
	// called every loop until this.controller.changeState
	// is called from within
	run() {throw new Error("FYI: Instance of Abstract class cannot be instantiated");}
	
	// called after run() returns a non-null value, before the
	// next state starts
	stop() {throw new Error("FYI: Instance of Abstract class cannot be instantiated");}
}
