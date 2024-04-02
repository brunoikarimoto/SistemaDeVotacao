CREATE DATABASE IF NOT EXISTS votacao;
USE votacao;

CREATE TABLE IF NOT EXISTS Enquete(ID int AUTO_INCREMENT, Titulo varchar(255), Inicio DATE, Termino DATE, PRIMARY KEY(ID));

CREATE TABLE IF NOT EXISTS Opcoes(Opcao_Id int AUTO_INCREMENT, Opcao varchar(255), Enquete_Id int, Votos int, PRIMARY KEY(Opcao_Id), FOREIGN KEY (Enquete_Id) REFERENCES Enquete(ID));

DROP TABLE Enquete;
DROP TABLE Opcoes;

INSERT INTO Enquete(Titulo, Inicio, Termino) VALUES ("Cor mais bonita", "2022-02-10", "2022-03-15");
INSERT INTO Enquete(Titulo, Inicio, Termino) VALUES ("Melhor jogador de futebol de 2023", "2024-04-01", "2024-04-30");
INSERT INTO Enquete(Titulo, Inicio, Termino) VALUES ("Melhor jogo de 2023", "2024-05-01", "2025-05-30");
INSERT INTO Enquete(Titulo, Inicio, Termino) VALUES ("Melhor restaurante", "2024-01-12", "2025-04-11");
