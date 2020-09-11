import Phaser from "phaser";
import { numeroAleatorio } from "./JS/utils";

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 640,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
const game = new Phaser.Game(config);

const possiveisYAparicoesNPC = [619, 459, 299, 139];
const possiveisXPosicoesNPC = [124, 88, 52, 16];
const pisosElevadorY = [560, 400, 240, 80];
let npcsPisos = [[], [], [], []];
let elevador = {
  piso: 0,
  lugares: []
};
let gameOverText;


function preload() {
  console.log("preload");
  this.load.image('fundo', './src/assets/Fundo.png');
  this.load.image('linha', './src/assets/Linha.png');
  this.load.image('npc', './src/assets/NPC.png');
  this.load.image('elevador', './src/assets/Elevador.png');
}

function create() {
  console.log("create");
  this.add.image(200, 320, "fundo");
  this.add.image(200, 0, "linha");
  this.add.image(200, 160, "linha");
  this.add.image(200, 320, "linha");
  this.add.image(200, 480, "linha");
  this.add.image(200, 640, "linha");

  const style = { font: "bold 32px monospace", fill: "#f0f", boundsAlignH: "center", boundsAlignV: "middle" };
  this.add.text(365, 485, "0", style);
  this.add.text(365, 325, "1", style);
  this.add.text(365, 165, "2", style);
  this.add.text(365, 5, "3", style);
  gameOverText = this.add.text(200, 320, "Game Over", style);

  let elevador = this.add.image(250, pisosElevadorY[0], "elevador");
}

function update() {
  for (let i = 0; i < npcsPisos.length; i++) {
    for (let j = 0; j < npcsPisos[i].length; j++) {
      this.add.image(possiveisXPosicoesNPC[j], possiveisYAparicoesNPC[i], "npc");
    }
  }
}

let createNPC = setInterval(() => {
  let npc = {
    pisoAtual: numeroAleatorio(4),
    objetivo: numeroAleatorio(4),
  };

  do {
    npc = {
      pisoAtual: numeroAleatorio(4),
      objetivo: numeroAleatorio(4),
    };
  } while (npc.objetivo === npc.pisoAtual);

  npcsPisos[npc.pisoAtual].push(npc);

  if (npcsPisos[npc.pisoAtual].length > 4) {
    console.log("Game Over");
    clearTimeout(createNPC);
  }
}, 2500);

document.addEventListener("keydown", (e) => moverJogador(e));
function moverJogador(e) {
  const keyCode = e.keyCode;
  if (keyCode === 48) console.log("0");
  if (keyCode === 49) console.log("1");
  if (keyCode === 50) console.log("2");
  if (keyCode === 51) console.log("3");
}