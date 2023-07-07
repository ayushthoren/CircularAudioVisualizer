class Circle {
	constructor(r,n) {
		this.r=r
		this.n=n
		this.LCoords=[]
		this.RCoords=[]
		this.findPointCoords()
	}
	
	findPointCoords() {
		this.LCoords=[]
		this.RCoords=[]
		let a=360/this.n
		for(let i=0; i<(this.n/2); i++) {
			let wi=map(waveform[i],-1,1,0,windowHeight/6)
			let ra=this.r+wi
			let calcX = ra*sin(a*i)
			let calcY = ra*cos(a*i)
			this.RCoords.push({"x":calcX, "y":calcY})
			this.LCoords.push({"x":calcX*-1, "y":calcY})
		}
	}

	draw() {
		this.findPointCoords()
		
		push()
		beginShape()
		let warmth=lerpColor(bg,primary,map(ampl,0,1,0,1.5))
		fill(lerpColor(bg,warmth,map(ampl,0,1,0,0.5)))
		
		stroke(lerpColor(primary,secondary,ampl))
		strokeWeight(4)
		
		this.LCoords=this.LCoords.reverse()
		this.LCoords.forEach((point,i)=>{
			curveVertex(point["x"],point["y"])
		})
		this.RCoords.forEach(point=>{
			curveVertex(point["x"],point["y"])
		})
		endShape(CLOSE)
		pop()
		
		//RIGHT
		for(let k=0; k<this.RCoords.length-2; k+=2) {
			push()
			beginShape()
			stroke(lerpColor(primary,secondary,map(((waveform[k]+waveform[k+1]+waveform[k+2])/2),-1,1,0,1)))
			strokeWeight(4)
			vertex(this.RCoords[k]["x"],this.RCoords[k]["y"])
			vertex(this.RCoords[k+1]["x"],this.RCoords[k+1]["y"])
			vertex(this.RCoords[k+2]["x"],this.RCoords[k+2]["y"])
			endShape()
			pop()
		}
		
		//LEFT
		this.LCoords=this.LCoords.reverse()
		for(let j=0; j<this.LCoords.length-2; j+=2) {
			push()
			beginShape()
			stroke(lerpColor(primary,secondary,map(((waveform[j]+waveform[j+1]+waveform[j+2])/3),-1,1,0,1)))
			strokeWeight(4)
			vertex(this.LCoords[j]["x"],this.LCoords[j]["y"])
			vertex(this.LCoords[j+1]["x"],this.LCoords[j+1]["y"])
			vertex(this.LCoords[j+2]["x"],this.LCoords[j+2]["y"])
			endShape()
			pop()
		}
	}
}
