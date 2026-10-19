INSERT INTO `paginas` (`slug`, `nomePagina`, `tipoPagina`, `conteudo`)
SELECT
  'sobre',
  'Sobre o SENAI Mariano Ferraz',
  'Totem',
  JSON_ARRAY(
    JSON_OBJECT(
      'type', 'LinhaSobre',
      'props', JSON_OBJECT(
        'texto', 'Bom dia',
        'nomeImagem', 'senai-mariano-ferraz.png',
        'alt', 'Imagem SENAI',
        'primeiroEstilo', TRUE
      )
    ),
    JSON_OBJECT(
      'type', 'LinhaSobre',
      'props', JSON_OBJECT(
        'texto', 'Boa tarde',
        'nomeImagem', 'senai-mariano-ferraz.png',
        'alt', 'Imagem SENAI',
        'primeiroEstilo', FALSE
      )
    ),
    JSON_OBJECT(
      'type', 'LinhaSobre',
      'props', JSON_OBJECT(
        'texto', 'Boa noite',
        'nomeImagem', 'senai-mariano-ferraz.png',
        'alt', 'Imagem SENAI',
        'primeiroEstilo', TRUE
      )
    )
  )
WHERE NOT EXISTS (
  SELECT 1 FROM `paginas` WHERE `slug` = 'sobre'
);