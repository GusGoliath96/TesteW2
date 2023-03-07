Serviço para monitorar pasta C:/uploadcsv
A cada 5 segundos o serviço faz um scan no diretorio
Se houver um ou mais arquivos csv na pasta o serviço irá adicionar os dados relevantes no Banco de dados

Instruções:
1. No fonte main.js é necessario configurar a conexão com o banco local
2. Rodar o script CreateTable.sql no banco  de dados MariaDB local
3. utilizando o comando "node main.js" rode o serviço via terminal
4. jogue o arquivo csv na pasta e veja a magica acontecer