const plateau = document.getElementById("plateau");
let serpent = [];
let pomme = null;
let direction = "droite";
let gameOver = false;
let affichageScore = document.getElementById('score');
let score = 0;

function genereSerpent() {
    for (let i = 0; i < 5; i++) {
        serpent.push({ x: i, y: 0 });
    }
}

function dessineSerpent() {
    serpent.forEach((unit) => {
        let carreSerpent = document.createElement("div");
        carreSerpent.style.left = unit.x * 10 + "px";
        carreSerpent.style.top = unit.y * 10 + "px";
        carreSerpent.classList.add("carre-serpent");
        plateau.appendChild(carreSerpent);
    });
}

function generePomme() {
    pomme = {
        x: Math.floor(Math.random() * 50),
        y: Math.floor(Math.random() * 50),
    };
}

function dessinePomme() {
    let carrePomme = document.createElement("div");
    carrePomme.style.left = pomme.x * 10 + "px";
    carrePomme.style.top = pomme.y * 10 + "px";
    carrePomme.style.backgroundColor = "red";
    carrePomme.style.width = "10px";
    carrePomme.style.height = "10px";
    carrePomme.style.position = "absolute";
    carrePomme.style.borderRadius = "2px";
    plateau.appendChild(carrePomme);
}

function update() {
    let nextX = serpent[0].x;
    let nextY = serpent[0].y;

    if (direction === "droite") {
        ++nextX;
    } else if (direction === "gauche") {
        --nextX;
    } else if (direction === "haut") {
        --nextY;
    } else if (direction === "bas") {
        ++nextY;
    }

    if (nextX == pomme.x && nextY == pomme.y) {
        //rajouter la tete du serpent (pour le faire avancer)
        //et on enleve pas la queue du serpent quand il mange une pomme
        serpent.unshift({ x: nextX, y: nextY });
        //On regénère une pomme
        generePomme();
        dessinePomme();
        ++score;
    } else {
        //enlever la queue du serpent (sinon le serpend deviens de plus en plus long)
        serpent.pop();
        //rajouter la tete du serpent (pour le faire avancer)
        serpent.unshift({ x: nextX, y: nextY });
    }

    //vérifier une collision avec le corps du serpent
    if (serpent[0].x != 0 && serpent[0].y != 0) {
        for (let i = 1; i < serpent.length; i++) {
            if (serpent[0].x == serpent[i].x && serpent[0].y == serpent[i].y) {
                gameOver = true;
                alert("Game Over!");
                stop();
            }
        }
    }

    //vérifier une collision avec les bords du plateau
    if (serpent[0].x == 50 || serpent[0].y == 50 || serpent[0].x == -1 || serpent[0].y == -1) {
        gameOver = true;
        alert("Game Over!");
        stop();
    }

    affichageScore.innerHTML = score;
    plateau.innerHTML = "";
    dessineSerpent();
    dessinePomme();
}


document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            direction = "gauche";
            break;
        case 38:
            direction = "haut";
            break;
        case 39:
            direction = "droite";
            break;
        case 40:
            direction = "bas";
            break;
    }
};

function droite() {
    direction = "droite";
}

function gauche() {
    direction = "gauche";
}

function haut() {
    direction = "haut";
}

function bas() {
    direction = "bas";
}

document.getElementById("btn-reset").disabled = true;


document.getElementById("btn-start").addEventListener("click", function () {
    this.disabled = true;
});

function jeu() {
    genereSerpent();
    dessineSerpent();
    generePomme();
    dessinePomme();
    setInterval(update, 80);
    document.getElementById("btn-reset").disabled = false;
}

function reset() {
    serpent = [];
    for (let i = 0; i < 5; i++) {
        serpent.push({ x: i, y: 0 });
    }
    direction = "droite";
    dessineSerpent();
    generePomme();
    dessinePomme();
    score = 0;
}


function stop() {
    serpent = [];
    pomme = null;
}