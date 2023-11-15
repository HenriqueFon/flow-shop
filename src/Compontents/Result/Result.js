import Table from "../Table/Table"
import './Result.css';
const _ = require('lodash');


export function Result() {

    const package_info = [
        {
            "Dependencies": 3,
            "Installation_Time": 59,
            "Package": "Package_1",
            "Package_Size": 42
        },
        {
            "Dependencies": 2,
            "Installation_Time": 37,
            "Package": "Package_2",
            "Package_Size": 37
        },
        {
            "Dependencies": 4,
            "Installation_Time": 42,
            "Package": "Package_3",
            "Package_Size": 65
        },
        {
            "Dependencies": 1,
            "Installation_Time": 30,
            "Package": "Package_4",
            "Package_Size": 30
        },
        {
            "Dependencies": 5,
            "Installation_Time": 88,
            "Package": "Package_5",
            "Package_Size": 88
        }
    ]

    // Função para inicializar a população com ordens aleatórias dos pacotes
  function initialize_population(pop_size, num_packages) {
    let population = [];
    for (let i = 0; i < pop_size; i++) {
        // Shuffle embaralha os índices dos pacotes para criar uma ordem aleatória
        population.push(_.shuffle(_.range(num_packages)));
    }
    return population;
}

// Função de seleção dos pais da próxima geração
 function selection(population, num_parents) {
    let parents = [];
    for (let i = 0; i < num_parents; i++) {
        // Amostra aleatória da população para selecionar pais
        parents.push(_.sample(population));
    }
    return parents;
}

// Função de crossover para criar descendentes a partir dos pais
 function crossover(parents, num_offsprings) {
    let offsprings = [];
    for (let i = 0; i < num_offsprings; i++) {
        let parent1 = _.sample(parents);
        let parent2 = _.sample(_.without(parents, parent1));
        let child = _.clone(parent1);
        for (let gene of parent2) {
            // Realiza crossover trocando genes não repetidos entre pais
            if (!child.includes(gene)) {
                child[child.indexOf(undefined)] = gene;
            }
        }
        offsprings.push(child);
    }
    return offsprings;
}

// Função de mutação para introduzir variação em um indivíduo
 function mutation(individual, mutation_rate) {
    if (Math.random() < mutation_rate) {
        let index1 = _.random(individual.length - 1);
        let index2 = _.random(individual.length - 1);
        // Realiza a mutação trocando a posição de dois genes
        [individual[index1], individual[index2]] = [individual[index2], individual[index1]];
    }
}

// Função principal do algoritmo genético
 function genetic_algorithm(num_generations, pop_size, num_parents, num_offsprings, mutation_rate, num_packages) {
    let population = initialize_population(pop_size, num_packages);
    for (let generation = 0; generation < num_generations; generation++) {
        let parents = selection(population, num_parents);
        let offsprings = crossover(parents, num_offsprings);
        for (let offspring of offsprings) {
            mutation(offspring, mutation_rate);
        }
        population = offsprings;
    }
    // Encontra a melhor ordem com base em uma função objetivo
    let best_order = _.minBy(population, objective_function);
    return best_order;
}

// Calculando os valores máximos para normalização
 let max_dependencies = _.maxBy(package_info, 'Dependencies').Dependencies;
 let max_package_size = _.maxBy(package_info, 'Package_Size').Package_Size;
 let max_installation_time = _.maxBy(package_info, 'Installation_Time').Installation_Time;

// Função objetivo que retorna a qualidade de uma ordem
 function objective_function(individual) {
    let total_score = 0;
    for (let i of individual) {
        let pkg = package_info[i];
        // Normaliza os valores e calcula a média ponderada
        let normalized_dependencies = pkg.Dependencies / max_dependencies;
        // console.log("Numero de dependia: " + pkg.Dependencies + " / Tamanho maximo das dependencias: " + max_dependencies)
        let normalized_package_size = pkg.Package_Size / max_package_size;
        // console.log("Numero do tamanho do pacote: " + pkg.Package_Size + " / Tamanho maximo dos pacotes: " + max_package_size)
        let normalized_installation_time = pkg.Installation_Time / max_installation_time;
        // console.log("Tempo de instalação: " + pkg.Dependencies + " / Tempo maximo de instalação: " + max_installation_time)
        let score = (normalized_dependencies + normalized_package_size + normalized_installation_time) / 3;
        /*console.log("Dependencia normalizada: " + normalized_dependencies + "+ Tamanho do pacote normalizado: " 
                    + normalized_package_size + " + Tempo de instalação normalizado: " + normalized_installation_time 
                    + " = " + score)
        console.log("")*/
        total_score += score;
    }

    return -total_score;  // Retorna o valor negativo do score para minimização
}

    let num_generations = 1500;
    let pop_size = 1000;
    let num_parents = 100;
    let num_offsprings = 50;
    let mutation_rate = 0.2;
    
    // Executando o Algoritmo Genético para encontrar a melhor ordem
    let best_order = genetic_algorithm(num_generations, pop_size, num_parents, num_offsprings, mutation_rate, package_info.length);
    // console.log(best_order);
    
    // Exibindo a ordem otimizada dos pacotes
    // console.log("Ordem otimizada dos pacotes:");
    let optimized_df = _.map(best_order, i => package_info[i]);
    // console.log(optimized_df);
    
    // Convertendo o DataFrame original para JSON e imprimindo de forma identada
    // console.log("DataFrame Original em JSON:");
    let package_info_original = JSON.stringify(package_info, null, 4);
    // console.log(package_info_original);
    
    // Convertendo o DataFrame otimizado para JSON e imprimindo de forma identada
    // console.log("DataFrame Otimizado em JSON:");
    let package_info_ordenado = JSON.stringify(optimized_df, null, 4);
    // console.log(package_info_ordenado);

    // console.log(optimized_df)

    return(
        <>
        <div className = "table-display">
            <div className = "left-table">
                <h2>Inicio</h2>
                <Table data = { package_info }  />
            </div>
            <div className = "right-table">
                <h2>Otimizado</h2>
                <Table data = { optimized_df }  />
            </div>
        </div>
        </>
    )
}