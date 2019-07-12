
    var sketchProc = function(processingInstance) {
     with (processingInstance) {
        size(600, 600);
        frameRate(50);
        /**
     *Zombie Arena 2!!! Have fun!!
     *

    the harder modes have SMALLER BATTLEFIELDS!!


    There are 30 waves. Survival Mode has infinite waves.
    *
    *
    *

    */
    //Credit to Flame Runner(KC#1) for continuous support and helpful advice!
    //His Profile: https://www.khanacademy.org/profile/Studio.D/
    //Credit to Malnox for suggesting Megasplitter.
    //https://www.khanacademy.org/profile/Malnox.malnox/


    var money = 100           ;
    var pagil = 500; //agility of the player
    var life = 300; //life


    /**Below are some utility variables. No use tampering with them.:P*/
    var phealthcost = 100;

    var armor = 10;
    var launchspeed = 10; //speed of bullet
    var reloadspeed = 0.07; //basically rate of fire(no use messing with it)
    var damage = 7; //bullet's damage(no use messing with it)
    var currentwave = 0;
    var arenalength = 700;
    var reload = 0;
    var px = 100;
    var py = 440;
    var screenx = 300;
    var pr = 0;
    var scene = "menu";
    var mode = "";
    var modes = ["easy", "medium", "hard", "survival"];
    var gun = 1;

    var tower = 1;
    var gunreco = 1;
    var firing = false;
    var keys = [];
    var diffic;
    var dam;
    var pause = false;
    textAlign(CORNER);
    textFont(createFont("impact"));

    var distf = function(x1,y1,x2,y2,range){
    return sq(y2-y1) + sq(x2-x1) <= range*range;
    };

    var nmz = function(r,g,b,ey) {
        var img = createGraphics(120,120,P2D);try{img.background(0, 0, 0,0);} catch(e) {}
        img.scale(2);
    img.fill(r,g,b);
    img.bezier(10,32,5,40,9,50,44,40);
    img.bezier(10,32,5,40,9,45,40,44);
    img.bezier(10,-32+50,5,-40+50,9,-50+50,44,-40+50);
    img.bezier(10,-32+50,5,-40+50,9,-45+50,40,-44+50);
    img.noStroke();
    img.bezier(10,-32+50,5,-40+50,9,-45+50,40,-36+50);
    img.bezier(10,32,5,40,9,45,40,36);
    img.stroke(48, 48, 48);
    img.ellipse(15,25,25,20);
    img.fill(255, 0, 0);img.stroke(84, 84, 84);img.strokeWeight(0.2);
        img.ellipse(18,29,3,4);img.ellipse(18,21,3,4);
        if (ey) {
            img.ellipse(12, 28, 3, 4);
            img.ellipse(12, 20, 3, 4);
        }
        if (ey==='in') {try{img.background(0, 0, 0,0);} catch(e) {}
        }
    return img;
    };
    var zim=nmz(60,60,60);
    var bim=nmz(0,0,0);
    var spim=nmz(255,255,173,true);
    var boim=nmz(255,0,0);
    var boss=nmz(255,255,255);
    var invz=nmz(255,255,255,'in');
    var mouseIsPressed = false;

    /**These are the objects for the various types of zombies*/
    var normalz = {
        life: 40,
        speed: 1.2,
        damage: 1,
        size: 1,
        reward: 30,
        image: zim
    };
    var bigz = {
        life: 100,
        speed: 0.9,
        damage: 2.4,
        size: 2,
        reward: 50,
        image: zim
    };
    var fastz = {
        life: 20,
        speed: 3,
        damage: 0.8,
        size: 0.8,
        reward: 30,
        image: zim
    };
    var bombz = {
        life: 40,
        speed: 1.5,
        damage: 80,
        size: 1.2,
        reward: 40,
        image: boim
    };
    var splitz = {
        life: 80,
        speed: 1.5,
        damage: 2.4,
        size: 1.5,
        reward: 50,
        image: spim
    };
    var bossz = {
        life: 160,
        speed: 1,
        damage: 4,
        size: 2.7,
        reward: 90,
        image: bim
    };
    var swarmz = {
        life: 30,
        speed: 5,
        damage: 2.4,
        size: 0.4,
        reward: 20,
        image: bim
    };
    var invisibz = {
        life: 50,
        speed: 1.4,
        damage: 3,
        size: 2,
        reward: 40,
    };
    var megasplitz = {
        life: 150,
        speed: 2,
        damage: 5,
        size: 3,
        reward: 140,
        image: spim
    };
    var megabossz = {
        life: 500,
        speed: 1,
        damage: 15,
        size: 3,
        reward: 1000,
        image: bossz
    };


    /**These are the objects for the guns!*/
    var blaster = {
        rtf: 0.07,
        damage: 7,
        reco: 1,
        spd: 9,
        cost: 0,
        upgrade: {
            rtf: 0.1,
            damage: 9,
            cost: 600,
        },
        upgrade2: {
            rtf: 0.13,
            damage: 10,
            cost: 1000,
        }
    };
    var dualblaster = {
        rtf: 0.04,
        damage: 8,
        reco: 1.1,
        spd: 8,
        cost: 1000,
        upgrade: {
            rtf: 0.07,
            damage: 11,
            cost: 1000,
        },
        upgrade2: {
            rtf: 0.09,
            damage: 11,
            cost: 1400,
        }
    };
    var shotgun = {
        rtf: 0.03,
        damage: 4.5,
        reco: 1.1,
        spd: 8,
        cost: 1000,
        upgrade: {
            rtf: 0.05,
            damage: 5.5,
            cost: 1000,
        },
        upgrade2: {
            rtf: 0.07,
            damage: 6.5,
            cost: 1200,
        }
    };
    var xploblaster = {
        rtf: 0.03,
        damage: 10,
        reco: 1.1,
        spd: 7,
        cost: 2500,
        upgrade: {
            rtf: 0.04,
            damage: 14,
            cost: 1500,
        },
        upgrade2: {
            rtf: 0.05,
            damage: 18,
            cost: 2000,
        }
    };
    var minigun = {
        rtf: 0.4,
        damage: 9,
        reco: 1.1,
        spd: 9,
        cost: 3500,
        upgrade: {
            rtf: 0.5,
            damage: 14,
            cost: 2000,
        },
        upgrade2: {
            rtf: 0.55,
            damage: 17,
            cost: 2500,
        },
    };
    var guns = [blaster, dualblaster, shotgun, xploblaster, minigun];
    var gunsbought = [true, false, false, false, false, ];
    var gunsupgrade = [false, false, false, false, false, ];
    var gunsupgrade2 = [false, false, false, false, false, ];
    var towernum = [0, 0, 0, 0, 0];
    var towercost = [70, 100, 850, 1000, 1000]; //cost of buying towers



    var gunflame = function(firing, x, y, s, sy) { //lil flame when gun fires
        if (firing === true) {
            pushMatrix();
            translate(x, y + 3);
            scale(s, sy);
            noStroke();
            fill(255, 255, 255);
            beginShape();
            vertex(0, 0);
            vertex(11, 5);
            vertex(3, 4);
            vertex(8, 12);
            vertex(3, 9);
            vertex(0, 29);
            vertex(-3, 9);
            vertex(-8, 12);
            vertex(-3, 4);
            vertex(-11, 5);
            endShape();
            fill(255, 255, 0);
            triangle(2, 0, -2, 0, 0, 12);
            popMatrix();
        }
    };
    var recoil = 0;

    /**This function draws the gun barrel*/
    var barrel = function(f, gun, recoil) {
        strokeWeight(0.3);
        switch (gun) {
            case 1:
                fill(230, 230, 230);
                stroke(0, 0, 0);
                rect(f * 15, -12 - recoil * 5 * gunreco - damage / 20, 4 + damage / 10, 20 + damage / 10);

                fill(200);
                rect(f * 15, -28 - recoil * 4 * gunreco, 6 + damage / 10, 9);
                line(f * 13, -28 - recoil * 4 * gunreco, f * 18, -28 - recoil * 5 * gunreco);
                line(f * 13, -25 - recoil * 4 * gunreco, f * 18, -25 - recoil * 5 * gunreco);
                line(f * 13, -30 - recoil * 4 * gunreco, f * 18, -30 - recoil * 5 * gunreco);
                break;
            case 2:
                fill(230, 230, 230);
                stroke(0, 0, 0);
                rect(f * 14, -12 - recoil * 5 * gunreco - damage / 20, 4 + damage / 10, 20 + damage / 10);
                rect(f * 14, -25 - recoil * 5 * gunreco, 4 + damage / 10, 3);
                rect(f * 18, -12 - recoil * 5 * gunreco - damage / 20, 4 + damage / 10, 20 + damage / 10);
                rect(f * 18, -25 - recoil * 5 * gunreco, 4 + damage / 10, 3);

                break;
            case 3:
                fill(180);
                stroke(0, 0, 0);
                rect(f * 15, -12 - recoil * 5 * gunreco - damage / 20, 5 + damage / 10, 20 + damage / 10);
                fill(200);
                rect(f * 15, -28 - recoil * 5 * gunreco, 7 + damage / 10, 9);
                line(f * 13, -28 - recoil * 5 * gunreco, f * 18, -28 - recoil * 5 * gunreco);
                line(f * 13, -25 - recoil * 5 * gunreco, f * 18, -25 - recoil * 5 * gunreco);
                line(f * 13, -30 - recoil * 5 * gunreco, f * 18, -30 - recoil * 5 * gunreco);

                break;
            case 4:
                fill(230, 230, 230);
                stroke(0, 0, 0);
                rect(f * 16, -12 - recoil * 5 * gunreco - damage / 20, 10 + damage / 10, 20 + damage / 10);
                rect(f * 16, -25 - recoil * 5 * gunreco, 10 + damage / 10, 3);

                break;
            case 5:
                fill(128, 128, 128);
                stroke(0, 0, 0);
                rect(f * 13, -14 - recoil * 5, 3, 40);
                rect(f * 19, -14 - recoil * 5, 3, 40);
                rect(f * 16, -14 - recoil * 5, 3, 40);
                if (mousePressed) {
                    rect(f * 13 + f * (millis() * 0.3) % 7, -14 - recoil * 5, 3, 40);
                    rect(f * 13 + f * ((millis() - 100) * 0.3) % 7, -14 - recoil * 5, 3, 40);
                }

                rect(f * 16, -27 - recoil * 5, 10, 10);

                break;
        }
    };

    /**THE PLAYER FUNCTION!*/
    var backpx = px;
    var backpy = py;
    var player = function(a) {
        if (py < 55) {
            py = 55;
        }
        if (py > 565) {
            py = 565;
        }
        pushMatrix();
        strokeWeight(0.3);
        translate(px, py);
        fill(230, 230, 230);
        stroke(0, 0, 0);
        rect(0, 0, 24, 24);
        rotate(pr);
        strokeWeight(0.3);
        rectMode(CENTER);

        pushMatrix();
        translate(0, 3 - recoil * 1.52);
        pushMatrix();
        if (dist(mouseX, mouseY, px, py) < 400) {
            rotate(radians(-10 + dist(mouseX, mouseY, px, py) / 40));
        }
        barrel(1, a, recoil);
        fill(230, 230, 230);
        stroke(0, 0, 0);
        beginShape();
        vertex(2, 4);
        vertex(12, 6);
        vertex(13, 9);
        vertex(20, 10);
        vertex(22, 7);
        vertex(22, -7);
        vertex(18, -14);
        vertex(11, -8);
        endShape();
        noStroke();
        fill(209, 209, 209);
        quad(22, 7, 22, -7, 18, -14, 20, 10);
        rotate(radians(-180));
        if (gun === 1 || gun === 3) {
            gunflame(firing, -15, 26, 1 + damage / 50, 1 + damage / 50);
        } else if (gun === 2) {
            gunflame(firing, -14, 26, 1 + damage / 50, 1 + damage / 50);
            gunflame(firing, -18, 26, 1 + damage / 50, 1 + damage / 50);
        } else if (gun === 5) {
            gunflame(firing, -15, 33, 1 + damage / 50, 1 + damage / 50);
        }
        popMatrix();
        pushMatrix();
        if (dist(mouseX, mouseY, px, py) < 400) {
            rotate(radians(10 - dist(mouseX, mouseY, px, py) / 40));
        }
        barrel(-1, a, recoil);
        beginShape();
        fill(230, 230, 230);
        stroke(0, 0, 0);
        vertex(-2, 4);
        vertex(-12, 6);
        vertex(-13, 9);
        vertex(-20, 10);
        vertex(-22, 7);
        vertex(-22, -7);
        vertex(-18, -14);
        vertex(-11, -8);
        endShape();
        noStroke();
        fill(209, 209, 209);
        quad(-22, 7, -22, -7, -18, -14, -20, 10);
        rotate(radians(-180));
        if (gun === 1 || gun === 3) {
            gunflame(firing, 15, 26, 1 + damage / 50, 1 + damage / 50);
        } else if (gun === 2) {
            gunflame(firing, 14, 26, 1 + damage / 50, 1 + damage / 50);
            gunflame(firing, 18, 26, 1 + damage / 50, 1 + damage / 50);
        } else if (gun === 5) {
            gunflame(firing, 15, 33, 1 + damage / 50, 1 + damage / 50);
        }
        popMatrix();

        popMatrix();
        fill(250, 250, 250);
        noStroke();
        beginShape();
        vertex(-10, 10);
        vertex(0, 13);
        vertex(10, 10);
        vertex(10, -10);
        vertex(0, -17);
        vertex(-10, -10);
        endShape();

        fill(230, 230, 230);
        stroke(156);
        quad(0, -17, -10, -10, -10, 5, 0, -2);
        quad(0, -17, 10, -10, 10, 5, 0, -2);
        if (reload < 1) {
            recoil = reload;
        }
        noStroke();
        fill(0, 20, 240);
        pushMatrix();
        translate(2, -4);
        scale(0.5, 0.3);
        quad(0, -17, 10, -10, 10, 5, 0, -2);

        popMatrix();
        pushMatrix();
        translate(-2, -4);
        scale(0.5, 0.3);
        quad(0, -17, -10, -10, -10, 5, 0, -2);
        popMatrix();
        stroke(0, 0, 0);
        popMatrix();
        py+=(keys[UP] || keys[87]? -pagil / 100:keys[DOWN] || keys[83]?pagil / 100:0);
        px-= (px > 100 && keys[LEFT] || px > 100 && keys[65]? pagil / 100:0);
        screenx+=(keys[LEFT] && screenx < 385 && px < 101 || keys[65] && screenx < 400 && px < 101? pagil / 100:0);
        px+= (keys[RIGHT] && px < 400 || keys[68] && px < 400?pagil / 100:0);
        screenx-=(keys[RIGHT] && px > 398 && screenx > -arenalength + 500 || keys[68] && px > 398&& screenx > -arenalength + 500?pagil / 100:0);
        pr = atan2(mouseY - py, mouseX - px) + radians(90);
    };

    /**These are just the dark walls around the field*/
    var border = createGraphics(1200, 50, P2D);
    for (var i = 0; i < 15; i++) {
        border.fill(61, 61, 61);
        border.stroke(54, 54, 54);
        border.rect(i * 80, 0, 80, 40, 4);
        border.fill(54, 54, 54);
        border.stroke(38, 38, 38);
        border.quad(0 + i * 80, 40, 80 + i * 80, 40, 100 + i * 80, 50, 10 + i * 80, 50);
    }
    var borderim=border;
    var leftborder = createGraphics(150, 600, P2D);
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 8; j++) {
            leftborder.fill(61, 61, 61);
            leftborder.stroke(48, 48, 48);
            leftborder.rect(60 + i * 80, j * 80, 80,80, 2);
            leftborder.fill(54, 54, 54);
            leftborder.quad(140, 0 + j * 80, 140, 80 + j * 80, 150, 100 + j * 80, 150, 20 + j * 80);
        }
    }
    var leftb=leftborder;

    var rightborder = createGraphics(170, 600, P2D);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 8; j++) {
            rightborder.fill(66, 66, 66);
            rightborder.stroke(48, 48, 48);
            rightborder.rect( + i * 80, j * 80, 80, 80, 2);
        }
    }
    var rightb=rightborder;




    var bullet = function(x, y, type, r) {
        this.x = x;
        if (type !== "") {
            this.gun = gun;
        } else {
            this.gun = 1;
        }
        if (this.gun === 3) {
            this.a = random(-6, 6);
        } else {
            this.a = 0;
        }
        this.y = y;
        this.type = type;
        this.outer=(distf(mouseX, mouseY, px, py,400)?true:false);
        var dis=dist(mouseX, mouseY, px, py) / 40;
        var pr90= pr + radians(this.a - 90);
        if (type === "right") {
            if (this.outer) {
                this.r = pr90 + radians(- 10 + dis);
            } else {
                this.r = pr90;
            }
        } else if (type === "left") {
            if (this.outer) {
                this.r = pr90 + radians(10 -dis);
            } else {
                this.r = pr90;
            }
        } else if (type === "") {
            this.r = r;
        }
        this.speed = launchspeed;
        this.exi = true;
        this.exp = false;
        this.explo = 0;
    };
    var blimg=createGraphics(12,12,P2D);
    try {
        blimg.background(0, 0, 0, 0);
    } catch (e) {}
    blimg.fill(255, 255, 255);
    blimg.stroke(255, 255, 255);
    blimg.ellipse(6, 6, 10, 3);
    blimg=blimg.get();
    var shimg=createGraphics(4,4,P2D);
    try {
        shimg.background(0, 0, 0, 0);
    } catch (e) {}
    shimg.fill(255, 255, 255);
    shimg.stroke(255, 255, 255);
    shimg.ellipse(2, 2, 2, 2);
    shimg=shimg.get();

    var bulletdraw = function(obj) {

        pushMatrix();
        translate(obj.x, obj.y);
        rotate(obj.r);
        if (obj.exi) {
            if (obj.gun === 1 || obj.gun === 2 || obj.gun === 5) {
                image(blimg,-6,-6);
            } else if (obj.gun === 3) {
                image(shimg,-6,-6);
            } else if (obj.gun === 4 && obj.explo === 0) {
                fill(255 - cos(millis() * 2) * 255, 225, 255);
                ellipse(0, 0, 10, 10);
            }
        }
        popMatrix();
        if (obj.explo === 0) {
            obj.x += cos(obj.r) * obj.speed;
            obj.y += sin(obj.r) * obj.speed;
        }
        if (obj.x - screenx > 990 || obj.x - screenx < -290 || obj.y < 30 ||   obj.y > 690||obj.explo > 101) {
            obj.exi = false;
        }

            if (obj.exp) {
                obj.explo += 12;
                noStroke();
                fill(255, 255, 255, 100 - obj.explo);
                ellipse(obj.x, obj.y, obj.explo, obj.explo);
            }
            if (obj.explo > 101) {
                obj.exi = false;
            }

    };
    bullet.prototype.hit = function(z) {

        if (this.gun !== 4) {
            if (z.life > 0 && this.exi && distf(this.x, this.y, z.x + screenx, z.y, 40 * z.size)) {
                this.exi = false;
                z.shot = 60;
                z.life -= dam;
                var z7= 7 / z.size;
                z.x -= cos(z.r) *z7;
                z.y -= sin(z.r) *z7;
            }
        } else {

        var expld=(z.life > 0 && distf(this.x, this.y, z.x + screenx, z.y,100 *z.size)? true:false);
            if (expld) {
                this.exp = true;
            }
            if (this.exp) {
                   this.explo += 2;
                if (this.explo < 100 &&expld) {
                    var a = atan2(z.y - this.y, z.x + screenx - this.x);
                    z.x += cos(a) * 10 / this.explo;
                    z.y += sin(a) * 10 / this.explo;
                    z.life -= dam;
                }
            }
        }
    };
    var bullets = [];



    /**Below are all the images and functions of the towers*/
    var wallimage = createGraphics(60, 60, P2D);
    try {
        wallimage.background(0, 0, 0, 0);
    } catch (e) {}
    wallimage.noStroke();
    wallimage.fill(240, 240, 240);
    wallimage.rect(15, 15, 30, 30);
    wallimage.fill(219, 219, 219);
    wallimage.quad(-15 + 30, -15 + 30, 15 + 30, -15 + 30, 10 + 30, -10 + 30, -10 + 30, -10 + 30);
    wallimage.fill(179, 179, 179);
    wallimage.quad(-15 + 30, 15 + 30, 15 + 30, 15 + 30, 10 + 30, 10 + 30, -10 + 30, 10 + 30);
    wallimage.quad(-15 + 30, -15 + 30, -10 + 30, -10 + 30, -10 + 30, 10 + 30, -15 + 30, 15 + 30);
    wallimage.fill(219, 219, 219);
    wallimage.quad(15 + 30, -15 + 30, 10 + 30, -10 + 30, 10 + 30, 10 + 30, 15 + 30, 15 + 30);

    var wall = function(x, y) {
        this.x = x;
        this.y = y;
        this.life = 300;
    };
    wall.prototype.draw = function() {
        pushMatrix();
        translate(this.x + screenx, this.y);
        image(wallimage, -30, -30);
        stroke(90);
        strokeWeight(1);
        if (this.life < 240) {
            line(0, 0, 10, 10);
        }
        if (this.life < 180) {
            line(-6, 8, 5, 5);
        }
        if (this.life < 120) {
            line(5, -7, 2, 2);
        }
        if (this.life < 60) {
            line(-5, -2, 0, 0);
        }
        popMatrix();
        if (px > 100) {
            if (dist(this.y, 0, py, 0) < 25 && px < this.x + screenx + 25 && px > this.x + screenx + 10) {
                px = this.x + screenx + 25;
            }
        }
        if (px < 101) {
            if (dist(this.y, 0, py, 0) < 25 && px < this.x + screenx + 25 && px > this.x + screenx + 10) {
                screenx -= pagil / 100;
            }
        }
        if (px < 400) {
            if (dist(this.y, 0, py, 0) < 25 && px > this.x + screenx - 25 && px < this.x + screenx - 10) {
                px = this.x + screenx - 25;
            }
        }
        if (px > 398) {
            if (dist(this.y, 0, py, 0) < 25 && px > this.x + screenx - 25 && px < this.x + screenx - 10) {
                screenx += pagil / 100;
            }
        }
        if (dist(this.x + screenx, 0, px, 0) < 25 && py < this.y + 25 && py > this.y + 10) {
            py = this.y + 25;
        }
        if (dist(this.x + screenx, 0, px, 0) < 25 && py > this.y - 25 && py < this.y - 10) {
            py = this.y - 25;
        }

    };
    wall.prototype.hit = function(z) {
        var yinrange=this.y>z.y-10&&this.y<z.y+10;
        var xinrange=this.x>z.x-10&&this.x<z.x+10;
        if (yinrange && z.x < this.x + 20 && z.x > this.x + 10) {
            z.x = this.x + 20;
            this.life -= z.damage;
        }
        if (yinrange && z.x > this.x - 20 && z.x < this.x - 10) {
            z.x = this.x - 20;
            this.life -= z.damage;
        }
        if (xinrange && z.y < this.y + 20 && z.y > this.y + 10) {
            z.y = this.y + 20;
            this.life -= z.damage;
        }
        if (xinrange && z.y > this.y - 20 && z.y < this.y - 10) {
            z.y = this.y - 20;
            this.life -= z.damage;
        }
    };
    wall.prototype.bul = function(z) {
        if (z.y>this.y-11&&z.y<this.y+11  && z.x>this.x+screenx-11&&z.x<this.x+screenx+11) {
            z.exi = false;
        }
    };
    var walls = [];


    var mineimage = createGraphics(60, 60, P2D);
    try {
        mineimage.background(0, 0, 0, 0);
    } catch (e) {}
    mineimage.strokeWeight(0.3);
    mineimage.stroke(255, 0, 0);
    mineimage.line(30, 0, 30, 63);
    mineimage.line(0, 32, 60, 32);
    mineimage.noStroke();
    mineimage.fill(74, 74, 74);
    mineimage.ellipse(30, 34, 30, 30);
    mineimage.ellipse(30, 32, 30, 30);
    mineimage.fill(181, 181, 181);
    mineimage.ellipse(30, 30, 30, 30);
    var mineimg=mineimage.get();
    var mine = function(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 90;
        this.exp = false;
        this.explo = 0;
    };
    mine.prototype.draw = function() {
        if (this.explo === 0) {
            pushMatrix();
            translate(this.x + screenx, this.y);
            image(mineimg, -30, -30);
            fill(round(cos(millis() / 4) * 255), 0, 0);
            ellipse(0, 0, 10, 10);
            popMatrix();
        }
    };
    mine.prototype.hit = function(z) {
        if (distf(z.x, z.y, this.x, this.y,30) && this.explo < 100 && z.life > 0) {
            z.life -= this.damage;
            this.exp = true;
        }
        if (this.exp) {
            this.explo += 2;
            noStroke();
            fill(255, 255, 255, 100 - this.explo);
            ellipse(this.x + screenx, this.y, this.explo, this.explo);
            if (this.explo < 100 && z.life > 0 && dist(this.x, this.y, z.x + screenx, z.y) < 50 * z.size) {
                var a = atan2(z.y - this.y, z.x + screenx - this.x);
                z.x += cos(a) * 10 / this.explo;
                z.y += sin(a) * 10 / this.explo;
            }
        }
    };
    var mines = [];


    var freezetowerimage = createGraphics(60, 60, P2D);
    try {
        freezetowerimage.background(0, 0, 0, 0);
    } catch (e) {}
    freezetowerimage.noStroke();
    freezetowerimage.fill(4, 150, 179);
    freezetowerimage.ellipse(30, 34, 30, 30);
    freezetowerimage.ellipse(30, 32, 30, 30);
    freezetowerimage.fill(181, 181, 181);
    freezetowerimage.ellipse(30, 30, 30, 30);
    var frzimg=freezetowerimage.get();
    var freezetower = function(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 0.1;
        this.r=0;
    };
    freezetower.prototype.draw = function() {
        var r=(millis() / 8) % 150;
        pushMatrix();
        translate(this.x + screenx, this.y);
        noStroke();
        fill(0, 251, 255, 70);
        ellipse(0, 0, r,r);
        image(frzimg, -30, -30);
        popMatrix();
    };
    freezetower.prototype.hit = function(z) {
        if (distf(z.x, z.y, this.x, this.y, z.size * 10 + (millis() / 8) % 120) && z.life > 0) {
            z.life -= this.damage;
            z.speed = z.type.speed / 2;
        }
    };
    var freezetowers = [];

    var lightningtowerimage = createGraphics(60, 60, P2D);
    try {
        lightningtowerimage.background(0, 0, 0, 0);
    } catch (e) {}
    lightningtowerimage.noStroke();
    lightningtowerimage.fill(64, 64, 64);
    lightningtowerimage.ellipse(30, 34, 10, 10);
    lightningtowerimage.ellipse(30, 35, 10, 10);
    lightningtowerimage.ellipse(30, 36, 10, 10);
    lightningtowerimage.fill(0, 217, 255);
    lightningtowerimage.ellipse(30, 32, 10, 10);
    lightningtowerimage.fill(181, 181, 181);
    lightningtowerimage.ellipse(30, 30, 10, 10);
    var lnt=lightningtowerimage.get();
    var lightningtower = function(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 0.4;
        this.r = 0;
    };
    lightningtower.prototype.draw = function() {

        pushMatrix();
        translate(this.x + screenx, this.y);
        if (this.x + screenx > -20 && this.x + screenx < 620) {
            image(lnt, -30, -30);
            var nods = [random(-3, 3), random(-6, 6), random(-9, 9), random(-9, 9), random(-9, 9), ];
            var nody = [random(5, 15), random(15, 25), random(25, 35), random(35, 45), random(45, 55), ];
            stroke(255, 255, 255);
            strokeWeight(1);
            rotate(this.r);
            this.r = random(360);
            line(0, 0, nody[0], nods[0]);
            line(nody[0], nods[0], nody[1], nods[1]);
            line(nody[1], nods[1], nody[2], nods[2]);
            line(nody[3], nods[3], nody[2], nods[2]);
            line(nody[3], nods[3], nody[4], nods[4]);
        }
        popMatrix();
    };
    lightningtower.prototype.hit = function(z) {
        if (distf(z.x, z.y, this.x, this.y, 60 + z.size * 5)  && z.life > 0) {
            z.life -= this.damage / sqrt(sqrt(currentwave * 2));
            z.x += random(-1, 1);
            z.y += random(-1, 1);
        }
    };
    var lightningtowers = [];
    var guntowerimage = createGraphics(60, 60, P2D);
    try {
        guntowerimage.background(0, 0, 0, 0);
    } catch (e) {}
    guntowerimage.stroke(120, 120, 120);
    guntowerimage.fill(230, 230, 230);
    guntowerimage.ellipse(30, 30, 30, 30);
    guntowerimage.fill(245, 245, 245);
    guntowerimage.rectMode(CENTER);
    guntowerimage.rect(30, 35, 20, 24);
    guntowerimage.fill(0, 4, 255);
    guntowerimage.rect(26, 30, 6, 4);
    guntowerimage.rect(34, 30, 6, 4);
    var guntower = function(x, y) {
        this.x = x;
        this.y = y;
        this.damage = 0.12;
        this.r = 90;
        this.reload = 0;
        this.reloadspd = 1.9;
    };
    guntower.prototype.draw = function() {
        pushMatrix();
        translate(this.x + screenx, this.y);
        rotate(this.r);
        if (this.x + screenx > -20 && this.x + screenx < 620) {
            image(guntowerimage, -30, -30);
            barrel(0, 1, 1);
            if (this.reload < 3 && this.r !== 90) {
                rotate(180);
                gunflame(true, 0, 32, 1, 1);
            }
        }
        popMatrix();
        this.reload += this.reloadspd;

    };
    guntower.prototype.hit = function(z) {
        if (distf(z.x, z.y, this.x, this.y,500 + z.size * 5)         && z.life > 0 && life > 0) {
            if (this.reload > 15) {
                this.reload = 0;
                bullets.push(new bullet(this.x + screenx, this.y, "", atan2(z.y - this.y, z.x - this.x)));
            }
        }
    };
    guntower.prototype.dir = function(z) {
        if (distf(z.x, z.y, this.x + screenx, this.y,15) &&dist(z.x, z.y, this.x + screenx, this.y) >= 5 && z.type === "") {
            this.r = atan2(z.y - this.y, z.x - this.x - screenx) + 90;
        }
    };
    var guntowers = [];



    /**This is the base that you protect*/
    var baselife = 800;
    var barmor = 10;
    var bhealthcost = 250;
    var basex = -200;
    var basey = 300;
    var base = function() {
        pushMatrix();
        translate(basex + screenx, basey);
        fill(217, 217, 217);
        strokeWeight(5);
        stroke(115, 115, 115);
        rect(0, 0, 80, 80, 4);
        fill(31, 31, 31, 69);
        noStroke();
        rect(random(-35, 35), random(-35, 35), 5, 5);
        textSize(30);
        text(round(baselife), 0, 0);
        popMatrix();
    };





    var zombies = [];
    var zombie = function(type, x, y) {

        var lol=type.speed * (1.2 + currentwave / (mode === "hard" || mode === "survival" ? 50: 60));
        return {
        x:x,
        y : y,
        r : 0,
        type : type,
        life :type.life,
        speed : lol,
        gspeed : lol,
        damage : type.damage,
        size : type.size/2,
        reward :type.reward,
        inscreen : false,
        explode                : 0,
        explodable : false,
        target : "base",
        shot : 0,
        image:type.image,
        };
    };
    var zombiedraw = function(obj) {
        if (obj.life > 0) {
            pushMatrix();
            if (obj.x + screenx < 640 + obj.size * 10 && obj.x + screenx > -40 + obj.size * 10) {
            translate(obj.x + screenx, obj.y);
            scale(obj.size);
                rotate(obj.r);
                if (obj.type !== invisibz) {
                strokeWeight(0.3);
                fill(59);
                var fot=cos(millis() / 1.6 * obj.speed) * 25;
                rect(2 + fot, 5, 12, 12);
                rect(2 - fot, -5, 12, 12);
                }
                image(obj.image, -28,-50);
            }
            popMatrix();

            if (distf(obj.x + screenx, obj.y, px, py, 27 * obj.size) && life > 0) {
                life -= (obj.damage / 3) * (10 / armor);
            }
            if (obj.type === bombz && distf(obj.x + screenx, obj.y, px, py,73) ) {
                obj.life = -1;
                life -= obj.damage;
            }
            if (millis() % 1000 < 10) {
                obj.speed = obj.gspeed;
            }

            if (obj.target === "player") {
                obj.r = atan2(py - obj.y, px - screenx - obj.x);
                if (dist(obj.x, obj.y, px - screenx, py) > 16) {
                    obj.x += cos(obj.r) * obj.speed;
                    obj.y += sin(obj.r) * obj.speed;
                } else {
                    obj.x += random(-2, 2);
                    obj.y += random(-2, 2);
                }
            } else {
                obj.r = atan2(basey - obj.y, basex - obj.x);
                if (dist(obj.x, obj.y, basex, basey) > 46) {
                    obj.x += cos(obj.r) * obj.speed;
                    obj.y += sin(obj.r) * obj.speed;
                } else {
                    obj.x += random(-2, 2);
                    obj.y += random(-2, 2);
                }
            }
            if (distf(obj.x, obj.y, px - screenx, py,200)) {
                obj.target = "player";
            } else if (obj.shot > 0) {
                obj.target = "player";
            } else {
                obj.target = "base";
            }
            obj.shot--;

        }
        if (obj.life < 1 && obj.life > -100 && obj.type !== bombz) {
            money += obj.reward;
            obj.life = -300;
            obj.explodable = true;
        } else if (obj.life < 1 && obj.life > -100 && obj.type === bombz) {
            money += obj.reward;
            obj.life = -299;
            obj.explodable = true;
        }
        if (obj.type === bombz && obj.explodable) {
            if (obj.explode < 80) {
                obj.explode += 6;
                fill(255, 255, 255, 250 - obj.explode * 3);
                noStroke();
                ellipse(obj.x + screenx, obj.y, obj.explode, obj.explode);
            }
            if (obj.explode > 73) {
                obj.life = -300;
            }
        }
    };



    var wavem = 0;
    var messages = ["Wave 1\nnormal zombies", "Wave 2\nmore zombies", "Wave 3\nFast zombies!", "Wave 4", "Wave 5\nMega zombies!", "Wave 6", "Wave 7", "Wave 8", "Wave 9\nBomb zombies!\ndon't get close!", "Wave 10!", "Wave 11!", "Wave 12!\n Mega throng!", "Wave 13!\nSplitters!\nsplits into multiple\nzombies upon death", "Wave 14", "Wave 15!\nA boss", "Wave 16!", "Wave 17!!", "Wave 18...\nSwarm zombies", "Wave 19!", "Wave 20", "Wave 21\nA throng of bosses!", "Wave 22\nMegasplitter!", "Wave 23", "Wave 24", "Wave 25\nAn invisible enemy", "Wave 26\nA throng of invisibles", "Wave 27", "Wave 28", "Wave 29\nA swarm of swarm zombies", "Final Wave! THE Boss!"];

    var waves = [

        [normalz, normalz, normalz, normalz, normalz, normalz],
        [normalz, normalz, normalz, normalz, normalz, normalz, normalz, normalz, normalz, normalz, normalz, normalz, ],
        [normalz, normalz, fastz, normalz, fastz, normalz, fastz],
        [fastz, fastz, fastz, fastz, fastz, normalz, normalz, normalz, normalz, fastz, fastz],
        [normalz, normalz, bigz, normalz, normalz, bigz, normalz, normalz, ],
        [normalz, fastz, bigz, normalz, normalz, fastz, bigz, normalz],
        [normalz, fastz, bigz, normalz, normalz, normalz, fastz, bigz, normalz],
        [normalz, normalz, fastz, fastz, fastz, fastz, fastz, fastz, fastz, fastz, fastz, fastz, ],
        [normalz, normalz, normalz, bombz, bombz, normalz, normalz, bombz],
        [normalz, normalz, bombz, bigz, fastz, normalz, normalz, normalz, bombz, fastz], //wave 10
        [normalz, fastz, fastz, bigz, normalz, bombz, bigz, fastz, normalz, normalz, normalz, bombz, fastz, ],
        [bigz, bigz, bigz, bigz, bigz, normalz, normalz, normalz],
        [splitz, normalz, fastz, normalz, fastz, bombz, bigz, splitz, ],
        [splitz, bigz, splitz, bombz, normalz, bigz, normalz, fastz, normalz, normalz, normalz],
        [bossz], //wave 15
        [bossz, normalz, bigz, normalz, splitz, normalz, fastz, bossz, bigz, normalz, fastz, fastz, splitz, normalz, normalz, bossz, splitz],
        [splitz, normalz, bigz, splitz, bossz, normalz, fastz, splitz, bossz, bombz, splitz, splitz, ],
        [swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz],
        [bossz, normalz, fastz, splitz, bossz, swarmz, swarmz, swarmz, bossz, swarmz, normalz, bigz, swarmz, swarmz, bombz, normalz, normalz, ],
        [splitz, normalz, fastz, splitz, bossz, splitz, swarmz, swarmz, normalz, swarmz, normalz, bigz, splitz, swarmz, bombz, splitz, normalz, normalz, ], //wave 20
        [bossz, bossz, bossz, bossz, bossz, bossz, bossz, ],
        [megasplitz, splitz, normalz, bossz, normalz, ],
        [normalz, bigz, fastz, swarmz, swarmz, megasplitz, swarmz, swarmz, normalz, megasplitz, bombz, bossz, normalz, normalz, fastz],
        [normalz, bossz, megasplitz, normalz, swarmz, swarmz, bigz, swarmz, swarmz, bombz, swarmz, swarmz, swarmz, swarmz, ],
        [invisibz], //wave 25
        [invisibz, invisibz, invisibz, invisibz, invisibz],
        [bossz, normalz, invisibz, normalz, normalz, swarmz, swarmz, bigz, swarmz, swarmz, megasplitz, splitz, swarmz, swarmz, normalz, normalz, ],
        [megasplitz, normalz, normalz, megasplitz, megasplitz, bossz, bombz, normalz, bigz, megasplitz],
        [swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz, swarmz],
        [megabossz, bossz, bossz],
    ];

    var but = function(x, y) {
        fill(255, 255, 255);
        if (mouseX > x && mouseX < x + 96 && mouseY > y - 25 && mouseY < y) {
            fill(184, 184, 184);
        }
        text("Upgrade", x, y);
    };



    var load=0;
    var menu = function() {
        load++;
        if (load<6){
            if (load===1){normalz.image=zim.get();
            bigz.image=zim.get();
            }
            if (load===2){fastz.image=zim.get();
            bombz.image=boim.get();
            }
            if (load===3){splitz.image=spim.get();
            bossz.image=bim.get();
            }
            if (load===4){megasplitz.image=spim.get();
            swarmz.image=bim.get();
            }
            if (load===5){megabossz.image=boss.get();
            invisibz.image=invz.get();
            }
        }
        scene = "menu";
        player(gun);
                    for (var i=0;i<zombies.length;i++){
                        zombiedraw(zombies[i]);
                    }
        textAlign(CENTER);
        textSize(139);
        fill(89, 89, 89);
        text("ZOMBIE\nARENA", 235, 130);
        fill(255, 0, 0);
        text("ZOMBIE\nARENA", 250, 135);
        textSize(179);
        text("2", 510, 300);
        textSize(78);
        fill(89);
        text("By Tegoon", 300, 375);
        textSize(78);
        fill(255, 255, 255);
        text("By Tegoon", 309, 380);
        fill(255, 255, 255);
        if (dist(mouseX, mouseY, 300, 295 + 150) < 70) {
            fill(255, 0, 4);
        }
        textSize(60);
        text("PLAY", 300, 315 + 150);
        if (reload > 1) {
            bullets.push(new bullet(px-cos(pr)*15, py-sin(pr)*15, "left"));
            bullets.push(new bullet(px+cos(pr)*15, py+sin(pr)*15,  "right"));
            reload = 0;
        }
        if (reload < 0.2) {
            firing = true;
        } else {
            firing = false;
        }
        for (var i = 0; i < bullets.length; i++) {
            bulletdraw(bullets[i]);
            if (!bullets[i].exi) {
                bullets.splice(i, 1);
            }
        }
        if (keys[32]) {
            firing = true;
        }
        if (frameCount%10===0 && zombies.length < 40){
                    zombies.push(zombie(normalz, 300, random(150, 520)));
                    zombies.push(zombie(splitz, 300, random(150, 520)));
                    zombies.push(zombie(bossz, 300, random(150, 520)));
        }
    };

    var how = function() {
        scene = "how";
        textAlign(CENTER);
        textSize(48);
        fill(225, 0, 0);
        text("HOW TO PLAY", 300, 138);
        textSize(24);
        text("WASD or arrow keys to move.\nMouse to shoot", 300, 270);
        fill(255, 255, 255);
        textSize(22);
    textFont(createFont('Arial'));
        text("This is your base.\nProtect it!", 120, 430);
        text("Zombies attack\nfrom the right.", 479, 352);
        textSize(20);
        text("Num keys to\nswitch between\nweapons. 1-5\nare guns. 6-0\nare towers.\nRed num are the\nnum of towers\nyou have.", 500, 103);
    textFont(createFont("impact"));
        fill(255, 255, 255);
        if (dist(mouseX, mouseY, 300, 315) < 30) {
            fill(255, 0, 4);
        }
        textSize(35);
        fill(255, 255, 255);
        if (mouseY > 460 && mouseY < 500) {
            fill(179, 179, 179);
        }
        player(gun);
        base();
        stroke(255, 0, 0);
        strokeWeight(3);
        line(440, 300, 550, 300);
        line(520, 280, 550, 300);
        line(520, 320, 550, 300);
        line(100, 319, 150, 400);
        line(100, 319, 132, 328);
        line(100, 319, 90, 343);
        line(380, 59, 470, 79);
        for (var i = 0; i < 10; i++) {
            fill(0, 0, 0, 60);
            if (gun === i + 1) {
                fill(255, 255, 255, 90);
            }
            if (tower === i - 4) {
                fill(255, 255, 255, 90);
            }
            noStroke();
            rect(20 + i * 38, 59, 33, 33, 5);
            fill(255, 255, 255);
            textSize(19);
            text(i + 1, 12 + i * 38, 62);
            textSize(19);
            fill(255, 0, 0);
            text(towernum[i], 26 + (i + 5) * 38, 75);}
        strokeWeight(5);
        stroke(112, 112, 112);
        for (var i = 0; i < 4; i++) {
            fill(189, 189, 189);
            if (mouseX > 300 - 75 && mouseX < 300 + 75 && mouseY > 360 - 25 + i * 60 && mouseY < 360 + 25 + i * 60) {
                fill(158, 158, 158);
            }
            rect(300, 360 + i * 60, 150, 50, 15);
        }
        fill(225, 0, 0);
        textSize(40);
        text("Easy", 300, 376);
        text("Medium", 300, 436);
        text("Hard", 300, 496);
        text("Survival", 300, 556);
    };

    var shopscene = 2;
    var shopgun = 1;
    var shoptower = 1;
    var gundes = ["Standard Blaster\n\nMedium fire rate\nMedium Damage\n\n", "Dual Blaster\n\nLow fire rate\nHigh Damage\nShoots 4 bullets\nat a time!!", "Shotgun\n\nLow fire rate\nFires multiple\npellets!", "Xploblaster\n\nFires explosive\nballs!\nHigh damage!\nLow fire rate", "Minigun\n\nVery high rate of \nfire!\nFires standard\nbullets. "];
    var towerdes = ["Wall\n\nBlocks zombies\nNo damage", "Mine\n\nDetonates when\nzombie is near", "Freeze Tower\n\nSlows down\nenemies.\nLow Damage", "Lightning Tower\n\nZaps nearby\nzombies. \nHigh damage.", "Gun Tower\n\nFires bullets at\nzombies. \nLarge range."];
    var shop = function() {
        textAlign(CORNER);
        background(130);
        scene = "shop";
        textSize(54);
        fill(255, 255, 255);
        text("SHOP", 240, 73);
        textSize(30);
        fill(255, 0, 0);
        text("Money: $" + money, 211, 125);
        text("Press e to return", 211, 525);
        for (var i = 0; i < 3; i++) {
            if (shopscene === i + 1) {
                fill(80);
            } else {
                fill(100);
            }
            noStroke();
            rect(80 + i * 140, 180, 140, 35, 10);
        }
        fill(80);
        rect(330, 344, 640, 300);
        fill(255, 0, 0);
        text("Armor         Weapons       Towers", 40, 190);
        switch (shopscene) {
            case 1:
                fill(255);
                text("Player\n+100 Health:\nArmor Upgrade", 40, 240);
                text("Base\n+100 Health:\nArmor Upgrade", 40, 380);
                but(480, 280);
                but(480, 315);
                but(480, 420);
                but(480, 455);
                fill(255, 0, 0);
                text("\nCost: $" + phealthcost + "\nCost: $" + armor * 15, 280, 240);
                text("\nCost: $" + bhealthcost + "\nCost: $" + barmor * 20, 280, 380);
                break;
            case 2:
                px = 0;
                py = 0;
                pushMatrix();
                translate(200, 200);
                scale(2);
                player(shopgun);
                popMatrix();
                noFill();
                strokeWeight(5);
                stroke(160);
                rect(200, 316, 200, 200, 16);
                noStroke();
                fill(161, 161, 161);
                if (mouseX > 40 && mouseX < 80 && mouseY > 280 && mouseY < 360) {
                    fill(120);
                }
                if (shopgun > 1) {
                    triangle(40, 320, 80, 280, 80, 360);
                }
                fill(161, 161, 161);
                if (mouseX > 550 && mouseX < 590 && mouseY > 280 && mouseY < 360) {
                    fill(120);
                }
                if (shopgun < 5) {
                    triangle(590, 320, 550, 280, 550, 360);
                }
                fill(255, 255, 255);
                text(gundes[shopgun - 1], 325, 241);
                if (!gunsbought[shopgun - 1]) {
                    text("COST: $" + guns[shopgun - 1].cost, 120, 468);
                } else if (gunsbought[shopgun - 1] && !gunsupgrade[shopgun - 1]) {
                    text("COST: $" + guns[shopgun - 1].upgrade.cost, 120, 468);
                } else if (gunsupgrade[shopgun - 1] && !gunsupgrade2[shopgun - 1]) {
                    text("COST: $" + guns[shopgun - 1].upgrade2.cost, 120, 468);
                }
                text("Num\nkey:\n" + shopgun, 30, 240);
                strokeWeight(5);
                stroke(160);
                fill(255, 255, 255, 30);
                if (mouseX > 420 - 62 && mouseX < 420 + 62 && mouseY > 436 && mouseY < 480) {
                    fill(255, 255, 255, 70);
                }
                rect(420, 458, 120, 40, 8);

                if (money >= guns[shopgun - 1].cost && !gunsupgrade[shopgun - 1] && !gunsbought[shopgun - 1]) {
                    fill(247, 247, 247);
                } else if (money >= guns[shopgun - 1].upgrade.cost && !gunsupgrade[shopgun - 1] && gunsbought[shopgun - 1]) {
                    fill(247, 247, 247);
                } else if (money >= guns[shopgun - 1].upgrade2.cost && !gunsupgrade2[shopgun - 1] && gunsupgrade[shopgun - 1]) {
                    fill(247, 247, 247);
                } else {
                    fill(147);
                }
                if (!gunsbought[shopgun - 1] && !gunsupgrade[shopgun - 1]) {
                    text("Buy", 398, 469);
                } else
                if (gunsbought[shopgun - 1] && !gunsupgrade[shopgun - 1] || gunsupgrade[shopgun - 1] && !gunsupgrade2[shopgun - 1]) {
                    text("Upgrade", 370, 469);
                }

                break;
            case 3:
                switch (shoptower) {
                    case 1:
                        image(wallimage, 340, 260, 120, 120);
                        break;
                    case 2:
                        image(mineimage, 355, 270, 90, 90);
                        fill(round(cos(millis() / 4) * 255), 0, 0);
                        ellipse(400, 315, 20, 20);
                        break;
                    case 3:
                        noStroke();
                        fill(0, 251, 255, 70);
                        ellipse(400, 315, (millis() / 8) % 135, (millis() / 8) % 135);
                        image(freezetowerimage, 355, 270, 90, 90);
                        break;
                    case 4:
                        image(lightningtowerimage, 355, 270, 90, 90);
                        pushMatrix();
                        translate(400, 315);
                        scale(1.5);
                        var nods = [random(-3, 3), random(-6, 8), random(-9, 9), random(-9, 9), ];
                        var nody = [random(5, 15), random(15, 25), random(25, 35), random(45, 45), ];
                        stroke(255, 255, 255);
                        strokeWeight(1);
                        rotate(random(360));
                        line(0, 0, nody[0], nods[0]);
                        line(nody[0], nods[0], nody[1], nods[1]);
                        line(nody[1], nods[1], nody[2], nods[2]);
                        line(nody[3], nods[3], nody[2], nods[2]);
                        popMatrix();
                        break;
                    case 5:
                        pushMatrix();
                        translate(400, 340);
                        scale(1.5);
                        image(guntowerimage, -30, -30);
                        barrel(0, 1, 1);
                        popMatrix();
                }
                fill(255, 255, 255, 0);
                if (mouseX < 505 && mouseX > 295 && mouseY > 230 && mouseY < 440) {
                    fill(235);
                    textSize(60);
                    textAlign(CENTER);
                    text("BUY", 400, 408);
                    fill(255, 255, 255, 40);
                }
                strokeWeight(5);
                stroke(160);
                rect(400, 336, 200, 200, 16);
                noStroke();
                fill(161, 161, 161);
                if (mouseX > 40 && mouseX < 80 && mouseY > 280 && mouseY < 360) {
                    fill(120);
                }
                if (shoptower > 1) {
                    triangle(40, 320, 80, 280, 80, 360);
                }

                fill(161, 161, 161);
                if (mouseX > 550 && mouseX < 590 && mouseY > 280 && mouseY < 360) {
                    fill(120);
                }
                if (shoptower < 5) {
                    triangle(590, 320, 550, 280, 550, 360);
                }
                fill(255, 255, 255);
                textSize(30);
                textAlign(CORNER);
                text(towerdes[shoptower - 1], 95, 241);
                text("Number:" + towernum[shoptower - 1], 95, 450);
                text("Cost: $" + towercost[shoptower - 1], 340, 475);
                text("Num\nkey:\n" + (shoptower + 5), 30, 240);
        }
    };


    var udonthavit = 50;
    var udonthavenuff = 50;
    var lastsurvivedwave=0;
    var game = function() {
        scene = "game";
        base();

        dam =damage / (1.2 * sqrt((currentwave + 1) / (1 / diffic)));

        for (var i = 0; i < mines.length; i++) {
            mines[i].draw();
            if (mines[i].explo >= 100) {
                mines.splice(i, 1);
            }
        }
        for (var i = 0; i < freezetowers.length; i++) {
            freezetowers[i].draw();
        }
        for (var i = 0; i < guntowers.length; i++) {
            guntowers[i].draw();
            for (var j = 0; j < bullets.length; j++) {
                guntowers[i].dir(bullets[j]);
            }
        }

        for (var i = 0; i < walls.length; i++) {
            walls[i].draw();
            for (var j = 0; j < zombies.length; j++) {
                walls[i].hit(zombies[j]);
            }

            for (var j = 0; j < bullets.length; j++) {
                walls[i].bul(bullets[j]);
            }
        }
        for (var i = 0; i < walls.length; i++) {
            if (walls[i].life < 0) {
                walls.splice(i, 1);
            }
        }
        noStroke();
        if (life > 0 && baselife > 0) {
            for (var i = 0; i < bullets.length; i++) {
                bulletdraw(bullets[i]);
                if (!bullets[i].exi) {
                    bullets.splice(i, 1);
                }
            }
            player(gun);
        }
        gunreco = guns[gun - 1].reco;
        launchspeed = guns[gun - 1].spd;
        if (!gunsupgrade[gun - 1]) {
            damage = guns[gun - 1].damage;
            reloadspeed = guns[gun - 1].rtf;
        } else if (gunsupgrade[gun - 1] && !gunsupgrade2[gun - 1]) {
            damage = guns[gun - 1].upgrade.damage;
            reloadspeed = guns[gun - 1].upgrade.rtf;
        } else if (gunsupgrade2[gun - 1]) {
            damage = guns[gun - 1].upgrade2.damage;
            reloadspeed = guns[gun - 1].upgrade2.rtf;
        }
        cursor(ARROW);
        for (var i = 0; i < zombies.length; i++) {
            if (zombies[i].x>arenalength+100){zombies[i].x-=zombies[i].speed;

            } else if (zombies[i].life > -300) {
                zombiedraw(zombies[i]);
            }

            for (var j = 0; j < mines.length; j++) {
                mines[j].hit(zombies[i]);
            }
            for (var j = 0; j < freezetowers.length; j++) {
                freezetowers[j].hit(zombies[i]);
            }
            for (var j = 0; j < lightningtowers.length; j++) {
                lightningtowers[j].hit(zombies[i]);
            }
            for (var j = 0; j < guntowers.length; j++) {
                guntowers[j].hit(zombies[i]);
            }
            var readonly=zombies[i];
            if (readonly.type !== bombz && readonly.life > 0 && baselife > 0 && abs(readonly.x - basex) < 40 + readonly.size * 10&& abs(readonly.y - basey) < 40 + readonly.size * 10) {
                baselife -= (zombies[i].damage * 30) * (10 / barmor);
                zombies[i].life = -300;
            }
            else if ( readonly.type === bombz && readonly.life > 0 && baselife > 0 && abs(readonly.x - basex) < 40 + readonly.size * 10&& abs(readonly.y - basey) < 40 + readonly.size * 10) {
                baselife -= (readonly.damage) * (10 / barmor);
                zombies[i].life = -300;
            }
            if (readonly.type === bombz && readonly.explodable) {
                if (zombies[i].explode < 80) {
                    zombies[i].explode += 6;
                    fill(255, 255, 255, 250 - zombies[i].explode * 3);
                    noStroke();
                    ellipse(readonly.x, readonly.y, zombies[i].explode, zombies[i].explode);
                }
            }
            else if (readonly.type === splitz && readonly.life < 2 && readonly.life > -301) {
                for (var n = 0; n < 3; n++) {
                    zombies.push(zombie(normalz, readonly.x - random(-12, 12), readonly.y - random(-12, 12)));
                    zombies[i].life = -500;
                }
            }
            else if (readonly.type === megasplitz && readonly.life < 2 && readonly.life > -301) {
                for (var n = 0; n < 3; n++) {
                    zombies.push(zombie(splitz, readonly.x - random(-29, 29), readonly.y - random(-29, 29)));
                    zombies[i].life = -500;
                }
            }
            else if (readonly.type === bossz && readonly.life > 0 && life > 0 && readonly.x < 1500) {
                var m = millis() % 2000;
                if (m < 10) {
                    zombies.push(zombie(fastz, zombies[i].x, zombies[i].y));
                }
            }
            else if (readonly.type === megabossz && readonly.life > 0 && life > 0 && readonly.x < 1500) {
                var m = millis() % 200;
                if (m < 10) {
                    zombies.push(zombie(swarmz, readonly.x, readonly.y));
                }
            }
            if (readonly.life > 0) {
                if (life > 0&&readonly.x + screenx < 690 && readonly  .x + screenx > -90) {
                    for (var j = 0; j < bullets.length; j++) {
                        bullets[j].hit(zombies[i]);
                    }
                }
            }
        }
        for (var i = 0; i < zombies.length; i++) {
            if (zombies[i].life <= -300) {
                zombies.splice(i, 1);
            }
        }
        for (var i = 0; i < lightningtowers.length; i++) {
            lightningtowers[i].draw();
        }
        if (reload < 0.2) {
            firing = true;
        } else {
            firing = false;
        }

        if (reload > 1 && mouseIsPressed) {
            var cx=cos(pr);
            var cy=sin(pr);
            switch (gun) {
                case 1:
                    bullets.push(new bullet(px-cx*15, py-cy*15, "left"));
                    bullets.push(new bullet(px+cx*15, py+cy*15, "right"));
                    reload = 0;
                    break;
                case 2:
                    bullets.push(new bullet(px-cx*14, py-cy*14, "left"));
                    bullets.push(new bullet(px+cx*14, py+cy*14, "right"));
                    reload = 0;
                    bullets.push(new bullet(px-cx*18, py-cy*18, "left"));
                    bullets.push(new bullet(px+cx*18, py+cy*18, "right"));
                    reload = 0;
                    break;
                case 3:
                    for (var i = 0; i < 4; i++) {
                    bullets.push(new bullet(px-cx*15, py-cy*15, "left"));
                    bullets.push(new bullet(px+cx*15, py+cy*15, "right"));
                        reload = 0;
                    }
                    break;
                case 4:
                    bullets.push(new bullet(px-cx*15, py-cy*15, "left"));
                    bullets.push(new bullet(px+cx*15, py+cy*15, "right"));
                    reload = 0;
                    break;
                case 5:
                    bullets.push(new bullet(px-cx*15, py-cy*15, "left"));
                    bullets.push(new bullet(px+cx*15, py+cy*15, "right"));
                    reload = 0;
                    break;
            }
        }


        image(borderim, -300 + screenx, 570);
        image(rightb, arenalength - 50 + screenx, 0);
        fill(255, 0, 0);
        textSize(30);
        textAlign(CORNER);
        text("Life:" + round(life), 20, 33);
        textAlign(RIGHT);
        text("Money: $" + round(money) , 592, 33);
        fill(219, 219, 219);
        textSize(24);
        if (zombies.length === 0 && currentwave < 30) {
        var flash=round(cos(millis() / 100)) * 255;
            fill(255, flash , flash);
        }
        if (zombies.length<=3) {lastsurvivedwave=currentwave;}
        if (keys[ENTER]) {
            fill(161, 161, 161);
        }
        textAlign(CORNER);
        text("Press enter for next wave", 160, 29);
        fill(255, 0, 0);
        textSize(19);
        text("Press e for shop", 442, 590);
        text("Press Spacebar to plant towers", 12, 590);
        for (var i = 0; i < 10; i++) {
            fill(0, 0, 0, 60);
            if (gun === i + 1) {
                fill(255, 255, 255, 90);
            }
            if (tower === i - 4) {
                fill(255, 255, 255, 90);
            }
            noStroke();
            rect(20 + i * 38, 59, 33, 33, 5);
            fill(255, 255, 255);
            textSize(19);
            text(i + 1, 12 + i * 38, 62);
            textSize(19);
            fill(255, 0, 0);
            text(towernum[i], 26 + (i + 5) * 38, 75);
        }
        fill(255, 0, 0);
        wavem++;
        udonthavit++;
        udonthavenuff++;
        textSize(57);
        textAlign(CENTER);
        if (life <= 0 && baselife > 0) {
            life = 0;
            textSize(30);
            text("Click anywhere to pay\n$500 for a respawn.\nThat is, if you have $500.", 300, 432);
        } else if (baselife <= 0 && mode !== "survival") {
            baselife = 0;
            life = 0;
            textSize(57);
            text("You Lose!", 300, 300);
        }
        if (life > 0 && baselife > 0 && currentwave === 30 && zombies.length === 0 && mode !== "survival") {
            text("YOU WIN!", 300, 300);
        }
        if (wavem < 60 && mode !== "survival") {
            text(messages[currentwave - 1], 300, 300);
        }
        if (wavem < 60 && mode === "survival" && currentwave > 0) {
            text("Wave " + currentwave, 300, 300);
        } else if (wavem < 100 && mode === "survival" && currentwave === 0) {
            text("Survival mode:\nHow many waves\ncan you survive?", 300, 200);
        }
        if (mode === "survival" && life <= 0 && money < 500 || mode === "survival" && baselife <= 0) {
            textSize(57);
            text("You survived " + lastsurvivedwave + " waves!", 300, 300);
        }
        if (udonthavit < 50) {
            textSize(30);
            text("You don't own this gun yet", 300, 300);
        }
        if (udonthavenuff < 50) {
            textSize(30);
            text("You don't have any towers\nof this type.", 300, 300);
        }
    };

    draw = function() {
        switch (mode) {
            case "easy":
                diffic = 0.4;
                break;
            case "medium":
                diffic = 0.6;
                arenalength = 630;
                break;
            case "hard":
                diffic = 1;
                arenalength = 550;
                break;
            case "survival":
                diffic = 0.8;
                arenalength =550;
        }
        rectMode(CENTER);
        background(130);
        stroke(112, 112, 112);
        strokeWeight(0.8);
        noFill();
        for (var i=0;i<10;i+=2){
            rect(i*100+screenx,200,100,300);
            rect(i*100+screenx+100,500,100,300);
        }
        noStroke();
        image(leftb, -445 + screenx, 0);
        image(borderim, -300 + screenx, 0);
        switch (scene) {
            case "menu":
                menu();
                break;
            case "how":
                how();
                break;
            case "game":
                if (!pause) {
                    game();
                } else {
                    text("Press P to resume ", 300, 300);
                }
                backpx = px;
                backpy = py;
                break;
            case "shop":
                shop();
                break;
        }

        reload += reloadspeed;
    };

    mouseClicked = function() {
        if (scene === "menu" && dist(mouseX, mouseY, 300, 315 + 150) < 70) {
            zombies.length=0;
            how();
            life=300;
            rightb=rightborder.get();
            py = 350;
            px = 170;
            for (var j = 0; j < bullets.length; j++) {
                bullets[j].x = -1000;
            }
        } else if (scene === "how") {
            for (var i = 0; i < 4; i++) {
                if (mouseX > 300 - 75 && mouseX < 300 + 75 && mouseY > 360 - 25 + i * 60 && mouseY < 360 + 25 + i * 60) {
                    mode = modes[i];
                    game();
                    borderim=border.get();
                    leftb=leftborder.get();
                }
            }
        }

        if (scene === "game" && life <= 0 && money >= 500) {
            life = 300;
            money -= 500;
            if (py < 300) {
                py = 340;
            } else if (py > 300) {
                py = 60;
            }
            if (px < 300) {
                px = 340;
            } else if (px > 300) {
                px = 60;
            }
        }
        if (scene === "shop") {
            if (mouseY > 180 - 18 && mouseY < 180 + 18) {
                if (mouseX > 20 && mouseX < 160) {
                    shopscene = 1;
                } else if (mouseX > 160 && mouseX < 300) {
                    shopscene = 2;
                } else if (mouseX > 300 && mouseX < 440) {
                    shopscene = 3;
                }
            }
            switch (shopscene) {
                case 1:
                    if (money >= phealthcost && mouseX > 480 && mouseX < 480 + 96 && mouseY > 280 - 25 && mouseY < 280) {
                        money -= phealthcost;
                        life += 100;
                    }
                    if (money >= armor * 15 && mouseX > 480 && mouseX < 480 + 96 && mouseY > 315 - 25 && mouseY < 315) {
                        money -= armor * 15;
                        armor += 2;
                    }
                    if (money >= bhealthcost && mouseX > 480 && mouseX < 480 + 96 && mouseY > 420 - 25 && mouseY < 420) {
                        money -= bhealthcost;
                        baselife += 100;
                    }
                    if (money >= barmor * 20 && mouseX > 480 && mouseX < 480 + 96 && mouseY > 455 - 25 && mouseY < 455) {
                        money -= barmor * 20;
                        barmor += 2;
                    }
                    break;
                case 2:
                    if (mouseX > 550 && mouseX < 590 && mouseY > 280 && mouseY < 360 && shopgun < 5) {
                        shopgun++;
                    } else if (mouseX > 40 && mouseX < 80 && mouseY > 280 && mouseY < 360 && shopgun > 1) {
                        shopgun--;
                    }
                    if (mouseX > 420 - 62 && mouseX < 420 + 62 && mouseY > 436 && mouseY < 480) {
                        if (!gunsupgrade[shopgun - 1] && !gunsbought[shopgun - 1] && money >= guns[shopgun - 1].cost) {
                            gunsbought[shopgun - 1] = true;
                            money -= guns[shopgun - 1].cost;
                        } else if (!gunsupgrade[shopgun - 1] && gunsbought[shopgun - 1] && money >= guns[shopgun - 1].upgrade.cost) {
                            gunsupgrade[shopgun - 1] = true;
                            money -= guns[shopgun - 1].upgrade.cost;
                        } else if (gunsupgrade[shopgun - 1] && !gunsupgrade2[shopgun - 1] && money >= guns[shopgun - 1].upgrade2.cost) {
                            gunsupgrade2[shopgun - 1] = true;
                            money -= guns[shopgun - 1].upgrade2.cost;
                        }
                    }
                    break;
                case 3:
                    if (mouseX > 550 && mouseX < 590 && mouseY > 280 && mouseY < 360 && shoptower < 5) {
                        shoptower++;
                    } else if (mouseX > 40 && mouseX < 80 && mouseY > 280 && mouseY < 360 && shoptower > 1) {
                        shoptower--;
                    }
                    if (mouseX < 505 && mouseX > 295 && mouseY > 230 && mouseY < 440 && money >= towercost[shoptower - 1]) {

                        towernum[shoptower - 1]++;
                        money -= towercost[shoptower - 1];
                    }
            }
        }
    };

    var zombietypesForSurvival = [normalz];


    keyPressed = function() {
        keys[keyCode] = true;
        for (var i = 0; i < 5; i++) {
            if (keys[49 + i] && gunsbought[i] || keys[97 + i] && gunsbought[i]) {
                gun = 1 + i;
            }
            if (((keys[49 + i] && !gunsbought[i])) || ((keys[97 + i] && !gunsbought[i]))) {
                udonthavit = 0;
            }
        }
        for (var i = 0; i < 4; i++) {
            if (keys[54 + i] || keys[102 + i]) {
                tower = 1 + i;
            }
        }
        if (keys[48] || keys[96]) {
            tower = 5;
        }
        if (keys[32] && towernum[tower - 1] > 0) {
            towernum[tower - 1] -= 1;
            switch (tower) {
                case 1:
                    walls.push(new wall(px - screenx, py));
                    break;
                case 2:
                    mines.push(new mine(px - screenx, py));
                    break;
                case 3:
                    freezetowers.push(new freezetower(px - screenx, py));
                    break;
                case 4:
                    lightningtowers.push(new lightningtower(px - screenx, py));
                    break;
                case 5:
                    guntowers.push(new guntower(px - screenx, py));
                    break;
            }
        } else if (keys[32] && towernum[tower - 1] === 0) {
            udonthavenuff = 0;
        }
        if (life > 0) {
            if (scene === "game" && keys[69] || scene === "how" && keys[69]) {
                shop();
            } else if (scene === "shop" && keys[69]) {
                game();
                px = backpx;
                py = backpy;
            }
        }
        if (scene === "game" && keys[ENTER]) {
            currentwave++;
            wavem = 0;
            if (mode !== "survival") {
                for (var i = 0; i < waves[currentwave - 1].length; i++) {
                    zombies.push(zombie(waves[currentwave - 1][i], arenalength + i * random(40 + currentwave * 0.25, 60 + currentwave * 2.5), random(80, 520)));
                }
            } else {
                if (currentwave <= 35) {
                    for (var i = 0; i < round((currentwave) * 0.7) + 4; i++) {
                        zombies.push(zombie(zombietypesForSurvival[round(random(0, zombietypesForSurvival.length - 1))], arenalength + i * random(30 + currentwave * 0.25, 50 + currentwave * 2), random(80, 520)));
                    }
                } else {
                    for (var i = 0; i < 32; i++) {
                        zombies.push(zombie(zombietypesForSurvival[round(random(0, zombietypesForSurvival.length - 1))], arenalength + i * random(30 + currentwave * 0.25, 50 + currentwave * 2), random(80, 520)));
                    }
                }
                switch (currentwave) {
                    case 2:
                        zombietypesForSurvival.push(fastz);
                        zombietypesForSurvival.push(normalz);
                        break;
                    case 4:
                        zombietypesForSurvival.push(bigz);
                        zombietypesForSurvival.push(normalz);
                        break;
                    case 7:
                        zombietypesForSurvival.push(bombz);
                        break;
                    case 10:
                        zombietypesForSurvival.push(splitz);
                        zombietypesForSurvival.push(normalz);
                        break;
                    case 13:
                        zombietypesForSurvival.push(bossz);
                        break;
                    case 16:
                        zombietypesForSurvival.push(swarmz);
                        break;
                    case 20:
                        zombietypesForSurvival.push(invisibz);
                        break;
                    case 24:
                        zombietypesForSurvival.push(megasplitz);
                        break;
                    case 26:
                        zombietypesForSurvival.push(megabossz);zombietypesForSurvival.push(normalz);zombietypesForSurvival.push(bigz);zombietypesForSurvival.push(invisibz);
                        break;
                }
            }
        }
        if (keys[80]) {
            if (pause) {
                pause = false;
            } else if (!pause) {
                pause = true;
            }
        }
    };
    keyReleased = function() {
        keys[keyCode] = false;
    };

    mousePressed = function() {
      mouseIsPressed = true;
    };

    mouseReleased = function() {
      mouseIsPressed = false;
    };
    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas");
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc);
