import React from 'react';
import './app.css';
import data from '../../utils/data';
import BurgerIngridients from '../burger-ingredients/burger-ingridients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppHeader from '../header/header';

function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main className="main">
        <section className="sectionBurgerIngridients">
         <BurgerIngridients data = {data}/>
        </section>
        <section className="sectionBurgerConstructor p-4" >
          <BurgerConstructor data={data}/>
        </section>
      </main>

    </div>
  );
}

export default App;
