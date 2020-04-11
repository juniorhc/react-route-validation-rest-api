import validador from 'validator';

class FormValidator {

    constructor(validacoes) {
        this.validacoes = validacoes;
    }

    valida(state) {

        let validacao = this.valido();

        this.validacoes.forEach(regra => {
            const campoValor = state[regra.campo.toString()];
            const args = regra.args || [];
            const metodoValidacao = typeof regra.metodo === 'string' ? validador[regra.metodo] : regra.metodo

            if (metodoValidacao(campoValor, ...args, state) !== regra.validoQuando) {
                validacao[regra.campo] = {
                    isInvalid: true,
                    message: regra.mensagem
                }
                validacao.isValid = false;
            }
        });

        return validacao;
    }

    //set the initial state
    valido() {
        //criação do objeto
        const validacao = {};

        //populando o objeto de acordo com a quantidade de campos
        //criando a chave isInvalid e atribuindo false para cada
        //**TODOS OS CAMPOS COMEÇAM VÁLIDOS!**
        this.validacoes.map(regra => (
            validacao[regra.campo] = { isInvalid: false, message: '' }
        ));

        //retorna um grande objeto com uma chave externa isValid 
        //junto com todos os outros campos.
        return { isValid: true, ...validacao };

    }

}

export default FormValidator;