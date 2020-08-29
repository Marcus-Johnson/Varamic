var nParticles = 150; 
var particles = [];
var particleSize = 80; 
var maxCounter = 150;
var lines = []; 

function checkCollisions(){
    lines = [];
    for (var i=0; i<nParticles; i++) {
        for(var j=0; j<nParticles; j++){
            if(i!=j){
                var distance = p5.Vector.dist(
                    particles[i].position,
                    particles[j].position
                );
                if(distance < particleSize){
                    if(particles[i].counter == 0){
                        particles[i].direction.rotate(Math.random());
                        particles[i].counter = maxCounter; 
                    }
                   if(particles[j].counter == 0){
                        particles[j].direction.rotate(Math.random());
                        particles[j].counter = maxCounter;
                   }
                   lines.push(
                       [particles[i].position, 
                       particles[j].position,
                        distance
                    ]
                   );
                }
            }
        }
    }
}

function createParticle(){
    var particle = {};
    particle.position = createVector(
        Math.random * width,
        Math.random * height
    );
    particle.direction = createVector(
        Math.random(),
        Math.random()
    );
    particle.update = function(){
        this.position.add(this.direction);
        if(this.position.x > width || 
            this.position.x<0)
                this.position.x = width/2; 
        if(this.position.y > height || 
            this.position.y<0)
                this.position.y = height/2; 
        if(this.counter > 0)
            this.counter -= 1;
    }
        particle.counter = 0;
        return particle;
}

function setup(){
    createCanvas(1000, 1000);
    background(200);
    stroke(0, 80);
    fill(0, 90);

    for(var i=0; i<nParticles; i++){
        particles.push(createParticle());
        background(0);
    }
}

function draw(){
    background(0);
    checkCollisions();
    for(var i=0; i<nParticles; i++){
        particles[i].update();
       
    }
    for(var i=0; i<lines.length; i++){
        var color = map(lines[i][2], 0, particleSize,
                        0, 255);
        stroke(color, 60);
        line(
            lines[i][0].x, lines[i][0].y,
            lines[i][1].x, lines[i][1].y
        );
    }
}