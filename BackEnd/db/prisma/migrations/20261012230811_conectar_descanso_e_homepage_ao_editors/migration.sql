INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'descanso',
  'Tela de descanso',
  'Totem',
  JSON_ARRAY(
    JSON_OBJECT(
      'type', 'TelaDescanso',
      'props', JSON_OBJECT(
        'titulo', 'Bem vindo ao SENAI Mariano Ferraz!',
        'nomeImagem', 'senai-logo.png',
        'alt', 'Imagem do logo SENAI',
        'textoBotao', 'Clique para começar',
        'destino', '/homepage'
      )
    )
  )
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'descanso'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'homepage',
  'Bem-vindo ao totem do SENAI Mariano Ferraz!',
  'Totem',
  JSON_ARRAY(
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Sobre o SENAI', 'href', '/sobre', 'icone', 'info')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Sobre o SENAI Mariano Ferraz', 'href', '/sobre-senai-mariano-ferraz', 'icone', 'predio')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Horário das aulas', 'href', '/horario-aulas', 'icone', 'relogio')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Mapa da escola', 'href', '/mapa', 'icone', 'mapa')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Vagas de emprego', 'href', '/vagas-empregos', 'icone', 'emprego')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Vagas de estágio', 'href', '/vagas-estagios', 'icone', 'estagio')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Cursos', 'href', '/vagas-cursos', 'icone', 'curso')),
    JSON_OBJECT('type', 'CartaoMenu', 'props', JSON_OBJECT('titulo', 'Biblioteca', 'href', '/biblioteca', 'icone', 'biblioteca'))
  )
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'homepage'
);
