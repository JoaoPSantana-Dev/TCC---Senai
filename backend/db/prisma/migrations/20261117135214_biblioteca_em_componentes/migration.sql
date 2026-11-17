UPDATE `paginas`
SET
  `nomePagina` = 'Biblioteca SENAI "Mariano Ferraz"',
  `conteudo` = JSON_ARRAY(
    JSON_OBJECT('type', 'BlocoTitulo', 'props', JSON_OBJECT('texto', 'Sobre a Biblioteca')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'As Bibliotecas da Faculdade Senai São Paulo têm por objetivo apoiar as atividades de ensino, pesquisa e extensão do seu corpo docente e discente promovendo o acesso às diversas fontes de informações, contribuindo assim, para a formação técnica e acadêmica de seus alunos.')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Os acervos reúnem livros técnicos, monografias, teses, periódicos, normas técnicas e recursos audiovisuais, nas áreas de Alimentos e Bebidas, Automotiva, Eletroeletrônica e Eletrônica, Gráfica, Mecânica, Metalurgia e Têxtil.')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Os clientes externos (comunidade em geral) somente poderão efetuar consultas e pesquisas no recinto das bibliotecas. Não será permitido a estes o empréstimo do acervo. O acesso de cliente externo está condicionado à prévia identificação na portaria da Unidade.')),
    JSON_OBJECT('type', 'BlocoTitulo', 'props', JSON_OBJECT('texto', 'Horário de Funcionamento')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Na segunda-feira a biblioteca funciona das 7h às 13h e 14h às 16h\nDe terça feira a sexta feira a biblioteca funciona das 7h às 13h e 14h às 21h\nAos sábados funciona das 9h às 15h')),
    JSON_OBJECT('type', 'BlocoImagem', 'props', JSON_OBJECT('nomeImagem', 'horario-biblioteca.jpg', 'alt', 'Horário de funcionamento')),
    JSON_OBJECT('type', 'BibliotecaStatus', 'props', JSON_OBJECT()),
    JSON_OBJECT('type', 'BlocoTitulo', 'props', JSON_OBJECT('texto', 'Serviços Ofertados')),
    JSON_OBJECT('type', 'BlocoSubtitulo', 'props', JSON_OBJECT('texto', 'Empréstimos')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Pode-se pegar até 3 livros na biblioteca, sendo no máximo 1 de literatura e 3 técnicos. O tempo de devolução depende do tipo de livro.')),
    JSON_OBJECT('type', 'BlocoSubtitulo', 'props', JSON_OBJECT('texto', 'Softwares Disponíveis')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Os computadores da biblioteca possuem softwares específicos para o aprendizado e treinamento dos alunos. A seguir um lista de alguns dos programas disponiveis:')),
    JSON_OBJECT('type', 'BlocoLista', 'props', JSON_OBJECT('itens', 'Autocad 2D\nVisual Studio Code\nPacote Microsoft Office\nPower BI\nSolid Works')),
    JSON_OBJECT('type', 'BlocoSubtitulo', 'props', JSON_OBJECT('texto', 'Jogos e Atividades')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'A biblioteca disponibiliza alguns jogos de tabuleiro e atividades para os alunos, como:')),
    JSON_OBJECT('type', 'BlocoLista', 'props', JSON_OBJECT('itens', 'Xadrez\nDamas\nLig 4\nQuebra-Cabeças')),
    JSON_OBJECT('type', 'BlocoSubtitulo', 'props', JSON_OBJECT('texto', 'Eventos')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'A biblioteca realiza eventos durante o ano como a SELIBI, atividades culturais e palestras.')),
    JSON_OBJECT('type', 'BlocoTitulo', 'props', JSON_OBJECT('texto', 'Serviços para Alunos de Graduação e Pós')),
    JSON_OBJECT('type', 'BlocoLista', 'props', JSON_OBJECT('itens', 'EBSCO: Serviço online de periódicos científicos.\nPergamum: Pesquisa todos os acervos da rede de bibliotecas do SENAI São Paulo.\nBiblioteca Virtual Pearson: A Biblioteca Virtual Pearson está disponível para alunos da graduação e pós-graduação, para acessar solicite o acesso diretamente na Biblioteca do seu Campus.\nABNTColeção: Serviço online para disseminação do uso de normas técnicas.\nPadronização ABNT: A biblioteca auxilia alunos a padronizar seus trabalhos de conclusão de curso na formatação ABNT.')),
    JSON_OBJECT('type', 'BlocoTexto', 'props', JSON_OBJECT('texto', 'Obs.: Para mais informações vá para a biblioteca e fale com um dos funcionários presentes.', 'destaque', TRUE))
  )
WHERE `slug` = 'biblioteca'
  AND JSON_UNQUOTE(JSON_EXTRACT(`conteudo`, '$[0].props.texto')) = 'As informações da biblioteca serão divulgadas em breve.';
