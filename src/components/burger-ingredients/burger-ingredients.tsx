import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { BurgerIngredient } from "./burger-ingredient/burger-ingredient";
import { IngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";

function BurgerIngredients() {
  const { items } = useAppSelector(
    (state) => state.ingredients as { items: IngredientType[] },
  );

  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const toppingsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTabFromScroll, setActiveTabFromScroll] = useState<string>("bun");
  const [selectedTabByClick, setSelectedTabByClick] = useState<string | null>(
    null,
  );
  const activeTab = selectedTabByClick || activeTabFromScroll;

  const buns = items.filter((item) => item.type === "bun");
  const sauce = items.filter((item) => item.type === "sauce");
  const toppings = items.filter((item) => item.type === "main");

  const handleTabClick = (tab: string) => {
    setSelectedTabByClick(tab);
    let elementToScroll = null;
    if (tab === "bun") {
      elementToScroll = bunRef.current;
    } else if (tab === "sauce") {
      elementToScroll = sauceRef.current;
    } else {
      elementToScroll = toppingsRef.current;
    }
    if (elementToScroll && containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = elementToScroll.getBoundingClientRect().top;
      const scrollTop = containerRef.current.scrollTop;

      containerRef.current.scrollTo({
        top: scrollTop + (elementTop - containerTop),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        !containerRef.current ||
        !bunRef.current ||
        !sauceRef.current ||
        !toppingsRef.current
      ) {
        return;
      }
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const bunsPosition = bunRef.current.getBoundingClientRect().top;
      const saucePosition = sauceRef.current.getBoundingClientRect().top;
      const toppingsPosition = toppingsRef.current.getBoundingClientRect().top;

      const distanceBuns = Math.abs(bunsPosition - containerTop);
      const distanceSauce = Math.abs(saucePosition - containerTop);
      const distanceToppings = Math.abs(toppingsPosition - containerTop);

      const tabFromScroll =
        distanceBuns < distanceSauce
          ? distanceBuns < distanceToppings
            ? "bun"
            : "main"
          : distanceSauce < distanceToppings
            ? "sauce"
            : "main";
      setActiveTabFromScroll(tabFromScroll);
      setSelectedTabByClick(null);
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tab} pt-5 pb-10`}>
        <Tab
          value="bun"
          active={activeTab === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={activeTab === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соус
        </Tab>
        <Tab
          value="main"
          active={activeTab === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} className={`${styles.allIngredientsContainer} `}>
        <section ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${styles.menu} pt-6 pb-10`}>
            {buns.length > 0 ? (
              buns.map((item) => (
                <BurgerIngredient key={item._id} item={item} />
              ))
            ) : (
              <p>Булочки закончились.</p>
            )}
          </div>
        </section>

        <section ref={sauceRef} className={styles.section}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.menu} pt-6 pb-10`}>
            {sauce.length > 0 ? (
              sauce.map((item) => (
                <BurgerIngredient key={item._id} item={item} />
              ))
            ) : (
              <p>Соусы закончились.</p>
            )}
          </div>
        </section>

        <section ref={toppingsRef} className={styles.section}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.menu} pt-6 pb-10`}>
            {toppings.length > 0 ? (
              toppings.map((item) => (
                <BurgerIngredient key={item._id} item={item} />
              ))
            ) : (
              <p>Начинка закончилась.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BurgerIngredients;
