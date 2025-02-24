let video;

let bodyPose;

let poses = [];

let lerpedhx = 0;
let lerpedhy = 0;
let lerpedkx = 0;
let lerpedky = 0;

let reps = 0;
let on = false;

function mousePressed() {
  console.log(poses);
}

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  image(video, -100, -50);
  textAlign(LEFT);
  textSize(30);
  text(reps, 10, 30);

  if (poses.length > 0) {
    let pose = poses[0];
    let hx = pose.left_hip.x - 100;
    let hy = pose.left_hip.y - 50;
    let kx = pose.left_knee.x - 100;
    let ky = pose.left_knee.y - 50;

    lerpedhx = lerp(lerpedhx, hx, 0.3);
    lerpedhy = lerp(lerpedhy, hy, 0.3);
    lerpedkx = lerp(lerpedkx, kx, 0.3);
    lerpedky = lerp(lerpedky, ky, 0.3);

    fill(255, 0, 0);
    circle(lerpedhx, lerpedhy, 20);
    fill(0, 255, 0);
    circle(lerpedkx, lerpedky, 20);

    if (hy < ky && on == true) {
      reps += 1;
      on = false;
    }
    if (hy > ky) {
      on = true;
    }
  }
}
