import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Header from './Header';
import PopUp from './PopUp';
import router from 'react-router-dom';


class App extends Component {

  state = {
    autores: [
      {
          nome: 'Paulo',
          livro: 'React',
          preco: '1000',
          id: 1
      },
      {
          nome: 'Daniel',
          livro: 'Java',
          preco: '99',
          id: 2
      },
      {
          nome: 'Marcos',
          livro: 'Design',
          preco: '150',
          id: 3
      },
      {
          nome: 'Bruno',
          livro: 'DevOps',
          preco: '100',
          id: 4
      },
      {
          nome: 'Nico',
          livro: 'Java',
          preco: '9999',
          id: 5
      }
  ],
  }

  removeAutor = index => {
    const { autores } = this.state;
    this.setState({
      autores: autores.filter((autor, posAtual) => {
        return posAtual !== index;
      }),
    })
    PopUp.exibeMensagem('error', "Autor removido com sucesso");
  }

  escutadorDeSubmit = autor => {
    this.setState({ autores: [...this.state.autores, autor] });
    PopUp.exibeMensagem('success', "Autor adicionado com sucesso");
  }
  render() {

    fetch('http://localhost:8000/api/autor')
    .then(res => res.json())
    .then(res => console.log(res.data));

    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Casa do código</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }
}

export default App;
