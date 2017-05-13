export const numDots = 50;
export const distMult = .01;
export const scoreMult = 2;
export const pathBonusLength = 7;
export const dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
export const bgColor = 0xfffdf3;

function overlap(x1, y1, r1, x2, y2, r2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance <= r1 + r2) return true;
    return false;
}

function collideCircs(dot1, dot2) {
    if (overlap(dot1.d.x, dot1.d.y, dot1.rad, dot2.d.x, dot2.d.y, dot2.rad)) {
        // taken from https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
        let vf1x = dot2.d.vx;
        let vf1y = dot2.d.vy;
        let vf2x = dot1.d.vx;
        let vf2y = dot1.d.vy;

        dot1.d.vx = vf1x;
        dot1.d.vy = vf1y;
        dot2.d.vx = vf2x;
        dot2.d.vy = vf2y;
    }
}

function collideWalls(dot, wall) {
    let radius = dot.rad;
    let d = dot.d;
    let left = d.x - radius;
    let right = d.x + radius;
    let top = d.y - radius;
    let bottom = d.y + radius;

    // dot collides with left wall
    if (left < 1 ) {
        d.vx = 1;
        d.beginFill(wall.color);
        d.drawCircle(0, 0, radius);
        d.endFill();
    }

    // dot collides with right wall
    if (right > window.innerWidth-1) {
        d.vx = -1;
        d.beginFill(wall.color);
        d.drawCircle(0, 0, radius);
        d.endFill();
    }

    // dot collids with top wall
    if (top < 1 ) {
        d.vy = 1;
        d.beginFill(wall.color);
        d.drawCircle(0, 0, radius);
        d.endFill();
    }

    // dot collides with bottom wall
    if ( bottom > window.innerHeight-1) {
        d.vy = -1;
        d.beginFill(wall.color);
        d.drawCircle(0, 0, radius);
        d.endFill();
    }
}

export { collideCircs, collideWalls };
