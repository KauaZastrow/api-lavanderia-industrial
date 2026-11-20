DROP DATABASE IF EXISTS banco;
CREATE DATABASE banco;

USE banco;

CREATE TABLE servico_lavagem (
    id_servico INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200) NOT NULL,
    tipo_tecido VARCHAR(100) NOT NULL,
    valor decimal(10,2) NOT NULL
);

CREATE TABLE equipamento (
    id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    patrimonio decimal(10,2) NOT NULL,
    status_Equipamento VARCHAR(50) NOT NULL
);

CREATE TABLE colaborador (
    id_colaborador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    matricula decimal(100) NOT NULL,
    turno VARCHAR(100) NOT NULL
);