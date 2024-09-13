let animais = [
    {
        especie: 'leao',
        tamanho: 3,
        carnivoro: true,
        biomas: ['savana']
    },
    {
        especie: 'leopardo',
        tamanho: 2,
        carnivoro: true,
        biomas: ['savana']
    },
    {
        especie: 'crocodilo',
        tamanho: 3,
        carnivoro: true,
        biomas: ['rio']
    },
    {
        especie: 'macaco',
        tamanho: 1,
        carnivoro: false,
        biomas: ['savana', 'floresta']
    },
    {
        especie: 'gazela',
        tamanho: 2,
        carnivoro: false,
        biomas: ['savana']
    },
    {
        especie: 'hipopotamo',
        tamanho: 4,
        carnivoro: false,
        biomas: ['savana', 'rio']
    }
];
let recintos = [
    {
        numero: 1,
        nome: 'savana',
        capacidade: 10,
        espacoLivre: 7,
        animaisDentro: [{ animal: 'macaco', quantidade: 3 }]
    },
    {
        numero: 2,
        nome: 'floresta',
        capacidade: 5,
        espacoLivre: 5,
        animaisDentro: [{ animal: null, quantidade: null }]
    },
    {
        numero: 3,
        nome: 'savana e rio',
        capacidade: 7,
        espacoLivre: 5,
        animaisDentro: [{ animal: 'gazela', quantidade: 1 }]
    },
    {
        numero: 4,
        nome: 'rio',
        capacidade: 8,
        espacoLivre: 8,
        animaisDentro: [{ animal: null, quantidade: null }]
    },
    {
        numero: 5,
        nome: 'savana',
        capacidade: 9,
        espacoLivre: 6,
        animaisDentro: [{ animal: 'leao', quantidade: 1 }]
    }
];


class RecintosZoo {

    analisaRecintos(animal, quantidade) {


        const animalParametro = animais.find(animalobjeto => animalobjeto.especie.toLowerCase() === animal.toLowerCase());
        if (!animalParametro) {
            return { erro: `Animal, ${animal}, Inválido, escolha uma espécie válida` };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade Inválido, necessidade de ser num número inteiro maior que 0' };
        };



        const recintosViaveis = recintos.filter(recinto => {

            const biomaAdequado = animalParametro.biomas.some(bioma => recinto.nome.includes(bioma));
            if (!biomaAdequado) { return false; };

            const espacoOcupar = animalParametro.tamanho * quantidade;
            const animaisnoBioma = recinto.animaisDentro.filter(aDentro => aDentro.animal !== null);

            if (animalParametro.carnivoro && animaisnoBioma.length > 0) {
                const outrosanimaisnorecinto = animaisnoBioma.some(aRecinto => aRecinto.animal.toLowerCase() !== animal.toLowerCase());
                if (outrosanimaisnorecinto) {
                    return false;
                }
            }
            if (animalParametro.especie.toLowerCase() === 'hipopotamo' && recinto.nome !== 'savana e rio') {
                return false;
            }
            if (animalParametro.especie.toLowerCase() === 'macaco' && quantidade >= 1 && animaisnoBioma.length >= 1) {
                return false;
            }

            const espacoJaOcupando = recinto.capacidade - recinto.espacoLivre;

            const espacoExtra = (animaisnoBioma.length > 0 && animalParametro.especie.toLowerCase() !== animaisnoBioma[0].animal.toLowerCase()) ? 1 : 0;
            const espacoTotalOcupado = espacoJaOcupando + espacoOcupar + espacoExtra;

            return espacoTotalOcupado <= recinto.capacidade;
        })

        if(recintosViaveis.length === 0){
            return { erro: `não há habitates livres para o ${animal}` }
        }return {
            recintosViaveis: recintosViaveis.map(recinto => 
                `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre - (animalParametro.tamanho * quantidade)} total: ${recinto.capacidade})`
            )
        };
        
        

    }


}

const zoo = new RecintosZoo(animais);
console.log(zoo.analisaRecintos('Leao', 2));
console.log(zoo.analisaRecintos('Macaco', 2));
console.log(zoo.analisaRecintos('Leao', 3));
console.log(zoo.analisaRecintos('Unicornio', 1));

export { RecintosZoo as RecintosZoo };
