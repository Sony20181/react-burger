import React, { useEffect, useState } from 'react';
import './app.css';
//import data from '../../utils/data';
import BurgerIngridients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppHeader from '../header/header';
import Modal from '../modalWindow/modal';

function App() {

  const [data, setData] = useState({ 
    productData: null,
    loading: true,
    error: null
  })

  const [isOpenModal, setIsOpenModal] = useState(false);

  function openModal(){
    setIsOpenModal(true);
  }
  function closeModal(){
    setIsOpenModal(false);
  }

  useEffect(()=>{
    const getProductData = async () => {
      try{
        setData(prev =>({...prev, loading: true, error: null}));
        const res = await fetch(`https://norma.education-services.ru/api/ingredients`);
        
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

  const modal = (
  <Modal onClose={closeModal}>
    <div>Содержимое</div>
  </Modal>);

  if (data.loading){
    return (
      <div className="app">
        <AppHeader />
        <div>Пожалуйста, подождите. Ваши бургеры загружаются...</div>
      </div>
    );
  }
  if (data.error){
    return (
      <div className="app">
        <AppHeader />
         <div>Просим прощение за неудобства,попробуйте перезагрузить страницу или вернуться позже...</div>
      </div>
    );
  }
  if (!data.productData || data.productData.length === 0) {
    return (
      <div className="app">
        <AppHeader />
        <div>Продукты закончились... Приходите позже!</div>
      </div>
    );
  }
  return (
    <div className="app">
      <AppHeader/>
      <main className="main">
        <section className="sectionBurgerIngridients">
         <BurgerIngridients data = {data.productData}/>
        </section>
        <section className="sectionBurgerConstructor p-4" >
          <BurgerConstructor data={data.productData}/>
        </section>
      </main>
      <div style={{overflow: 'hidden'}}>
          <button onClick={openModal}>Открыть модальное окно</button>
          {isOpenModal && modal }
      </div>
      
    </div>
  );
}

export default App;
