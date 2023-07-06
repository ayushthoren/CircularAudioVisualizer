let radius
let numPoints

let song
let songIndex=-1
let songs=[]

let fft
let amplitude

let primaryOrig

let waveform

let circle

let state="START"
let title=""
let titleColor

function preload() {
	// {"Title":"","Song":loadSound("")}
	songs=[
		{"Title":"Murder in my Mind - Kordhell","Song":loadSound("murderinmymind.mp3")}, 
		{"Title":"Limbo - Freddie Dredd","Song":loadSound("limbo.mp3")}, 
		{"Title":"Highscore - Teminite & Panda Eyes","Song":loadSound("highscore.mp3")}, 
	]
}

function setup() {
	primaryOrig=color(primary[0],primary[1],primary[2])
	primary=color(primary[0],primary[1],primary[2])
	bg=color(bg[0],bg[1],bg[2])
	sArr=secondary
	secondary=color(sArr[0],sArr[1],sArr[2])
	titleColor=color(sArr[0],sArr[1],sArr[2])
	
	createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	
	radius=windowHeight/4
	
	fft=new p5.FFT()
	amplitude=new p5.Amplitude(0.85)
	waveform=fft.waveform()
	
	numPoints=waveform.length
	
	circle=new Circle(radius,numPoints)
}

function cycleSong() {
	songIndex++
	if(songIndex>=songs.length) {songIndex=0}
	if(song) {song.stop()}
	song=songs[songIndex]["Song"]
	song.loop()
	title=songs[songIndex]["Title"]
	titleColor.setAlpha(255)
	state="PLAYING"
}

function mousePressed() {
	cycleSong()
}

function drawTitle() {
	titleColor.setAlpha(alpha(titleColor)-5)
	push()
	fill(titleColor)
	textSize(100)
	textAlign(CENTER,CENTER)
	text(title, 0, 0, windowWidth, windowHeight)
	pop()
}

function drawStart() {
	push()
	fill(secondary)
	textSize(100)
	textAlign(CENTER,CENTER)
	text("Click to start music / switch song!", windowWidth/2, windowHeight/2)
	pop()
}

function drawPlaying() {
	waveform=fft.waveform()
	ampl=amplitude.getLevel()
	fft.analyze()
	bass=fft.getEnergy("bass")
	
	noStroke()
	
	background(bg)
	
	push()
	
	translate(windowWidth/2,windowHeight/2)
	
	//PULSING CIRCLES
	push()
	fill(lerpColor(bg,primary,map(bass,0,255,0,0.02549019607)))
	ellipse(0,0,map(bass,0,255,0,radius*8))
	pop()
	
	push()
	fill(lerpColor(bg,primary,map(bass,0,255,0,0.0431372549)))
	ellipse(0,0,map(bass,0,255,0,radius*7))
	pop()
	
	push()
	fill(lerpColor(bg,primary,map(bass,0,255,0,0.0862745098)))
	ellipse(0,0,map(bass,0,255,0,radius*6))
	pop()	
	
	push()
	fill(lerpColor(bg,primary,map(bass,0,255,0,0.1294117647)))
	ellipse(0,0,map(bass,0,255,0,radius*5))
	pop()
	
	push()
	fill(lerpColor(bg,primary,map(bass,0,255,0,0.1725490196)))
	ellipse(0,0,map(bass,0,255,0,radius*4))
	pop()
	
	//FPS DISPLAY
	push()
	fill(lerpColor(bg,primary,0.25))
	textSize(50)
	text(floor(1000/deltaTime)+" FPS",10-(windowWidth/2),50-(windowHeight/2))
	pop()
	
	circle.draw()
	
	pop()
	
	drawTitle()
}

function draw() {
	if(state=="START") {drawPlaying(); drawStart()}
	if(state=="PLAYING") {drawPlaying()}
}
