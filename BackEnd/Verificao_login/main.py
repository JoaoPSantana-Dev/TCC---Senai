from buscar_login import buscar_login

email = "joao@gmail.com"
senha = "123"

if buscar_login(email,senha):
    print("Ir para a homepage")

else:
    print("Usuário ou senha inválidos!")