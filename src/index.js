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

const style = { font: "bold 32px monospace", fill: "#f0f", boundsAlignH: "center", boundsAlignV: "middle" };
const possiveisYAparicoesNPC = [619, 459, 299, 139];
const possiveisXPosicoesNPC = [124, 88, 52, 16];
const pisosElevadorY = [560, 400, 240, 80];
let npcsPisos = [];
let jogador = {
  piso: 0,
  novoPiso: 0,
  ocupado: false
};
let gameOverText;

let exemploNPC = {
  pisoAtual: numeroAleatorio(4),
  objetivo: numeroAleatorio(4),
  noElevador: false
};

let textPiso;


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

  this.add.text(365, 485, "0", style);
  this.add.text(365, 325, "1", style);
  this.add.text(365, 165, "2", style);
  this.add.text(365, 5, "3", style);
  // gameOverText = this.add.text(200, 320, "Game Over", style);

  jogador.sprite = this.add.image(250, pisosElevadorY[0], "elevador");


  exemploNPC.sprite = this.add.image(possiveisXPosicoesNPC[0], possiveisYAparicoesNPC[exemploNPC.pisoAtual], "npc");

  textPiso = this.add.text(0, 0, exemploNPC.objetivo, style);
  textPiso.x = Math.floor(exemploNPC.sprite.x - exemploNPC.sprite.width / 2);
  textPiso.y = Math.floor(exemploNPC.sprite.y - exemploNPC.sprite.height / 2);
}

function update() {
  // for (let i = 0; i < npcsPisos.length; i++) {
  //   this.add.image(possiveisXPosicoesNPC[0], possiveisYAparicoesNPC[i], "npc");

  //   this.textPiso.x = Math.floor(npcsPisos[i].x + npcsPisos[i].width / 2);
  //   this.textPiso.y = Math.floor(npcsPisos[i].y + npcsPisos[i].height / 2);
  //   this.textPiso.setText(npcsPisos[i]);
  // }

  animacaoElevador();
  animacaoNPCElevador();
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

  // let criarNovoNPC = true;
  // for (let i = 0; i < npcsPisos.length; i++) {
  //   if (npcsPisos[i].pisoAtual === npc.pisoAtual) criarNovoNPC = false;
  // }
  // if (criarNovoNPC) npcsPisos.push(npc);
  exemploNPC.pisoAtual = npc.pisoAtual;
  exemploNPC.objetivo = npc.objetivo;
}, 2000);

document.addEventListener("keydown", (e) => moverJogador(e));
function moverJogador(e) {
  const keyCode = e.keyCode;
  let novoPiso = 0;
  if (keyCode === 48) novoPiso = 0;
  if (keyCode === 49) novoPiso = 1;
  if (keyCode === 50) novoPiso = 2;
  if (keyCode === 51) novoPiso = 3;

  if (jogador.piso !== novoPiso) jogador.novoPiso = novoPiso;
}

function animacaoElevador() {
  const { piso, novoPiso } = jogador;
  if (piso !== novoPiso) {
    if (jogador.sprite.y > pisosElevadorY[novoPiso]) jogador.sprite.y--;
    if (jogador.sprite.y < pisosElevadorY[novoPiso]) jogador.sprite.y++;
    if (jogador.sprite.y === pisosElevadorY[novoPiso]) jogador.piso = novoPiso;
  }
}

function animacaoNPCElevador() {
  if (jogador.piso === exemploNPC.pisoAtual) {
    exemploNPC.noElevador = true;
    exemploNPC.sprite.x = jogador.sprite.x;
  }
  if (exemploNPC.noElevador) exemploNPC.sprite.y = jogador.sprite.y;
  if (jogador.piso === exemploNPC.objetivo) {
    exemploNPC.noElevador = false;
    exemploNPC.sprite.x++;
    if (exemploNPC.sprite.x > 400) {
      exemploNPC.sprite.destroy();
    }
  }
}