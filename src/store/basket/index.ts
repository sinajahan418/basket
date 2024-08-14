import { create } from "zustand";
import { Basket } from "./type";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useBasket = create(
  persist<Basket>(
    (set, get) => ({
      items: [],
      invoice: {
        totalPrice: 0,
      },
      action: {
        addToCard: (item) => {
          const alreadyExsist = get().items.some(
            (isItem) => isItem.id === item.id
          );
          if (alreadyExsist) {
            toast.success("محصول وجود دارد به تعداد محصول یکی اضافه شد");
            set((oldBasket) => ({
              invoice: {
                totalPrice: oldBasket.invoice.totalPrice + item.price,
              },
              items: oldBasket.items.map((selectItem) => {
                if (selectItem.id == item.id) {
                  return {
                    ...item,
                    quntity: selectItem.quntity + 1,
                  };
                }
                return selectItem;
              }),
            }));
          } else {
            toast.success("محول با موفقیت ااضافه شد");
            set((oldBasket) => ({
              invoice: {
                totalPrice: oldBasket.invoice.totalPrice + item.price,
              },
              items: [...oldBasket.items, { ...item, quntity: 1 }],
            }));
          }
        },
        remoweCard: (item) => {
          const shouldRemowe = item.quntity == 1;
          if (shouldRemowe) {
            return set((oldBasket) => ({
              invoice: {
                totalPrice: oldBasket.invoice.totalPrice - item.price,
              },
              items: oldBasket.items.filter(
                (isRemove) => isRemove.id !== item.id
              ),
            }));
          }

          set((oldBasket) => ({
            invoice: {
              totalPrice: oldBasket.invoice.totalPrice - item.price,
            },
            items: oldBasket.items.map((isRemove) => {
              if (isRemove.id == item.id) {
                return {
                  ...isRemove,
                  quntity: isRemove.quntity - 1,
                };
              }
              return isRemove;
            }),
          }));
        },
      },
    }),
    {
      name: "local-basket",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["action"].includes(key)
          ) as Basket
        ),
    }
  )
);
