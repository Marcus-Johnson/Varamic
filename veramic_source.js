var nParticles = 100; 
var particles = [];
var particleSize = 40; 

function checkCollisions(){
    for (var i=0; i<nParticles; i++) {
        for(var j=0; j<nParticles; j++){
            if(i!=j){
                var distance = p5.Vector.dist(
                    particles[i].position,
                    particles[j].position
                );
                if(distance < particleSize){
                    particles[i].direction.rotate(Math.random());
                    particles[j].direction.rotate(Math.random());
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
        }
        return particle;
}

function setup(){
    createCanvas(400, 400);
    background(200);
    stroke(0, 80);
    fill(0, 90);

    for(var i=0; i<nParticles; i++){
        particles.push(createParticle());
    }
}

function draw(){
    background(255);
    checkCollisions();
    for(var i=0; i<nParticles; i++){
        particles[i].update();
        ellipse(
            particles[i].position.x,
            particles[i].position.y,
            particleSize
        );
    }
}