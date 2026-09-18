from conexao import criarConexao

def buscar_login(email, senha):
    conexao = criarConexao()
    cursor = conexao.cursor()

    try:
        comando_sql = """
        SELECT *
        FROM USUARIOS
        WHERE EMAIL = %s and senha = %s
        LIMIT 1;
        """

        values=(email,senha)

        cursor.execute(comando_sql,values)
        login = cursor.fetchall()

        if login:
            return True

        return False

    except Exception as erro:
        print("Erro ao buscar o login")
        return False

    finally:
        cursor.close()
        conexao.close()




