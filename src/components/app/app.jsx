import { useEffect, useState } from 'react';
import styles from './app.module.css'
//import data from '../../utils/data';
import BurgerIngridients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppHeader from '../header/header';

function App() {
  const address = `https://norma.education-services.ru/api/ingredients`;
  const [data, setData] = useState({ 
    productData: null,
    loading: true,
    error: null
  })

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [numberOrder, setNumberOrder] = useState(null);

  function openIngredientModal(ingredient) {
    setSelectedIngredient(ingredient);
    setIsIngredientModalOpen(true);
  }

  function closeIngredientModal() {
    setIsIngredientModalOpen(false);
    setSelectedIngredient(null);
  }

  function openOrderModal(numOrder) {
    setIsOrderModalOpen(true);
    setNumberOrder(numOrder);

  }

  function closeOrderModal() {
    setIsOrderModalOpen(false);
    setNumberOrder(null);
  }

  useEffect(()=>{
    const getProductData = async () => {
      try{
        setData(prev =>({...prev, loading: true, error: null}));
        const res = await fetch(address);
        
        if (!res.ok){
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result  = await res.json();
        console.log("При загрузке страницы result",result);
        setData({ productData: result.data, loading: false, error:null });
      }
      catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setData(prev => ({...prev, error: err.message || 'Ошибка при загрузке данных'}));
      }
      
    }

    getProductData();
  },[])

  if (data.loading){
    return (
      <div className="styles.app">
        <AppHeader />
        <div>Пожалуйста, подождите. Ваши бургеры загружаются...</div>
      </div>
    );
  }
  if (data.error){
    return (
      <div className="styles.app">
        <AppHeader />
         <div>Просим прощение за неудобства,попробуйте перезагрузить страницу или вернуться позже...</div>
      </div>
    );
  }
  if (!data.productData || data.productData.length === 0) {
    return (
      <div className="styles.app">
        <AppHeader />
        <div>Продукты закончились... Приходите позже!</div>
      </div>
    );
  }
  return (
    <div className="styles.app">
      <AppHeader/>
      <main className="styles.main">
        <section className="styles.sectionBurgerIngridients">
         <BurgerIngridients isOpenModal = {isIngredientModalOpen} closeModal = {closeIngredientModal} openModal={openIngredientModal} selectedIngredient={selectedIngredient} data = {data.productData}/>
        </section>
        <section className="styles.sectionBurgerConstructor p-4" >
          <BurgerConstructor isOpenModal = {isOrderModalOpen} closeModal = {closeOrderModal} openModal={openOrderModal} numberOrder = {numberOrder} data={data.productData}/>
        </section>
      </main>      
    </div>
  );
}

export default App;
