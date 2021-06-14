import { Sync } from 'factory.ts';
import { commerce, datatype, image } from 'faker';
import { CartItem, Product } from '../models/shop';
import { ShopState } from '../models/store';

export const productFactory = Sync.makeFactory<Product>({
  id: datatype.uuid(),
  favorite: datatype.boolean(),
  image_url: image.imageUrl(),
  price: datatype.number(100),
  productDescription: commerce.productDescription(),
  productName: commerce.productName(),
  stock: datatype.number(30),
});

export const cartItemFactory = Sync.makeFactory<CartItem>({
  id: datatype.uuid(),
  quantity: datatype.number(15),
});

export const cartItemFactoryList = (
  count: number,
  products: Product[],
): CartItem[] =>
  cartItemFactory
    .buildList(count)
    .map((item, i) => ({ ...item, id: products[i].id }));

export const entityFactory = <T extends { id: string }>(
  ...initialEnitites: T[]
) => ({
  entities: (initialEnitites || []).reduce(
    (acc, v) => ({ ...acc, [v.id]: v }),
    {},
  ),
  ids: (initialEnitites || []).map(({ id }) => id),
});

export const mockShopInitialState: ShopState = {
  cart: { entities: {}, ids: [] },
  error: false,
  loading: false,
  products: { entities: {}, ids: [] },
  totalAmount: 0,
};
