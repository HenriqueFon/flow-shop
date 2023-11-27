# PIP Install - Algoritmo de Ordenação de Pacotes

## Introdução
O algoritmo de ordenação de pacotes, PIP Install, é um sistema que prioriza a eficácia do sistema, otimizando a ordem de instalação para reduzir o tempo e garantir uma instalação bem-sucedida. Ele organiza a sequência de instalação com base em critérios como dependências, tamanho do pacote e tempo médio de instalação.

## Resumo do Código
O código apresenta um algoritmo genético para resolver o problema do Flow Shop Scheduling. Ele começa com a definição de dados simulados dos pacotes, inicializa uma população e define funções para calcular o tempo total de instalação considerando dependências, tamanho do pacote, além de funções para seleção, crossover, mutação e atualização elitista da população.

## Problema do Flow Shop Scheduling
O problema consiste em determinar a sequência de operações em uma fábrica (ou máquinas) para minimizar o tempo total de conclusão de uma série de tarefas. No código fornecido, o objetivo é otimizar a ordem de instalação dos pacotes, considerando dependências, tamanho e tempo de instalação.

## Funcionalidades Principais
- **Inicialização da População:** `initialize_population` cria uma população inicial de soluções.
- **Cálculo do Tempo de Instalação:** `calculateObj` calcula o tempo total de instalação, considerando dependências, tamanho do pacote e custos de instalação em diferentes máquinas.
- **Seleção de Pais:** `selection` seleciona os pais com base no desempenho das soluções.
- **Crossover e Mutação:** `crossover` e `mutation` geram novas soluções por meio de crossover e mutação.
- **Atualização Elitista:** `elitistUpdate` mantém a melhor solução da população anterior na nova geração.
- **Encontrando a Melhor Solução:** `findBestSolution` identifica a melhor solução após todas as gerações.

## Uso
O algoritmo pode ser utilizado para organizar a instalação de pacotes de forma mais eficiente, reduzindo o tempo total de instalação e otimizando o sistema.

## Observações
- A função objetivo utiliza a média ponderada de dependências, tamanho e tempo de instalação para calcular a pontuação de uma ordem, sendo a função `calculateObj` responsável por isso.
- A mutação introduz variação na população para explorar diferentes possibilidades de ordens de pacotes.

Este algoritmo oferece uma abordagem de otimização para a sequência de instalação de pacotes, priorizando a eficácia do sistema. A estratégia genética busca encontrar a melhor ordem levando em consideração múltiplos fatores, contribuindo para uma instalação mais eficiente e organizada.

## Instalação

`https://github.com/HenriqueFon/flow-shop.git`

Abrindo o cmd digite git clone `https://github.com/HenriqueFon/flow-shop.git` para clonar o projeto para sua máquina.

`npm install`

Logo depois, abra o projeto e digite no terminal `npm install` para que seja feito a instalação de todos os pacotes usados no projeto.

`npm start`

Com todos esses passos utilize `npm start` para rodar a apliocação no ambiente localhost.


