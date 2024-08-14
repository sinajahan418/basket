import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useBasket } from "./store/basket";

function App() {
  const totalPrice = useBasket((state) => state.invoice.totalPrice);
  const items = useBasket((state) => state.items);
  const { addToCard, remoweCard } = useBasket((state) => state.action);
  return (
    <div className=" flex justify-between  ">
      <main className="space-y-2 w-[30%] dark h-screen bg-background mx-auto mt-2 text-white">
        <div className="flex justify-between items-center text-2xl px-2">
          <h1 className="text-2xl">محصولات:</h1>
        </div>

        <div className="space-y-2">
          {PRODUCTS_DATA.map((product) => (
            <Card key={product.id}>
              <CardHeader>{product.title}</CardHeader>
              <CardContent>{product.price}تومان</CardContent>
              <CardFooter>
                {/* {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
                ) : (
                <Button onClick={() => addProduct(product)} variant="default">
                  Add to Cart
                </Button>
                )} */}
                <Button onClick={() => addToCard(product)} variant="default">
                  افزودن به سبد 
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <main className="space-y-2 dark h-screen bg-background w-[30%] mx-auto mt-2 text-white">
        <div className="flex justify-between items-center text-2xl px-2">
          <h1 className="text-2xl">سبد خرید:</h1>
          <span>قیمت کل:{totalPrice} </span>
        </div>
        <div className="space-y-2">
          {items.length === 0 && (
            <div className="text-2xl text-center mt-20 rounded-2xl py-2 shadow-xl bg-sky-950">
             هیچ محصولی وجود ندارد
            </div>
          )}
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>{item.title}</CardHeader>
              <div className=" flex justify-between items-center">
                <CardContent>{item.price}$</CardContent>
                <CardContent>{item.quntity}</CardContent>
              </div>
              <CardFooter className="gap-6">
                <Button
                  onClick={() => remoweCard(item)}
                  className="text-red-950 font-bold"
                  variant="default"
                >
                  remowe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
