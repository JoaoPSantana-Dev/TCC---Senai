<<<<<<< HEAD
import mysql.connector  


def criarConexao():
    conexao = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "root",
        database = "SENAI"
    )

    return conexao



conexao = criarConexao()
=======
import mysql.connector  


def criarConexao():
    conexao = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "root",
        database = "SENAI"
    )

    return conexao



conexao = criarConexao()
>>>>>>> 2c0979a7f234883246727bfb33b4f1dd160818b5
