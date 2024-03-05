import { CartItemType } from '../types/types';

export const findCartItemIndex = (items: Array<CartItemType>, id: string): number =>
  items.findIndex((item) => item.id === id);
