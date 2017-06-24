function Cpu(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.w = 20;
	this.color = map(id, 0, 10, 0, 255);
	
	this.update = function(x, y) {
		this.x = x;
		this.y = y;
	}
	
	this.show = function() {
		stroke(0);
		strokeWeight(1);
		push();
		colorMode(HSB)
		fill(this.color, 255, 100);
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.w);
		pop();
		strokeWeight(4);
		point(this.x,this.y);
	}
}