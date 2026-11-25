-- conecta ao editor as páginas que ainda não existiam no banco
-- mapa e vagas- eram rotas fixas do frontend e passam a ser páginas editáveis
-- sobre-senai-mariano-ferraz, horario-aulas e biblioteca já tinham card na homepage, mas a página não existia
-- cada insert só roda se o slug ainda não existir, então é de boa rodar de novo

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'mapa',
  'Mapa da escola',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'Mapa', 'props', JSON_OBJECT()))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'mapa'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'vagas-empregos',
  'Oportunidades de emprego',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'VagasEmprego', 'props', JSON_OBJECT()))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'vagas-empregos'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'vagas-estagios',
  'Oportunidades de estágio',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'VagasEstagio', 'props', JSON_OBJECT()))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'vagas-estagios'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'vagas-cursos',
  'Cursos',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'VagasCursos', 'props', JSON_OBJECT()))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'vagas-cursos'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'sobre-senai-mariano-ferraz',
  'Unidade Mariano Ferraz',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'LinhaSobre', 'props', JSON_OBJECT('texto', 'O conteúdo desta página será divulgado em breve.', 'nomeImagem', 'senai-mariano-ferraz.png', 'alt', 'Imagem SENAI Mariano Ferraz', 'primeiroEstilo', TRUE)))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'sobre-senai-mariano-ferraz'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'horario-aulas',
  'Horário das aulas',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'LinhaSobre', 'props', JSON_OBJECT('texto', 'O horário das aulas será divulgado em breve.', 'nomeImagem', 'senai-logo.png', 'alt', 'Logo do SENAI', 'primeiroEstilo', TRUE)))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'horario-aulas'
);

INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'biblioteca',
  'Biblioteca',
  'Totem',
  JSON_ARRAY(JSON_OBJECT('type', 'LinhaSobre', 'props', JSON_OBJECT('texto', 'As informações da biblioteca serão divulgadas em breve.', 'nomeImagem', 'senai-logo.png', 'alt', 'Logo do SENAI', 'primeiroEstilo', TRUE)))
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'biblioteca'
);
