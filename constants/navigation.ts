export const PARENT_MENU_TREE = ["general", "product", "display"].map((item, idx) => ({
  id: idx + 1,
  name: item,
  title: item,
}));

export const MENU_TREE = [
  {
    name: "category",
    title: "Category",
    parent: "general",
    url: "/category",
  },
  {
    name: "campaign",
    title: "Campaign",
    parent: "general",
    url: "/campaign",
  },
  {
    name: "main",
    title: "Main",
    parent: "display",
    url: "/main",
  },
  {
    name: "main-sub",
    title: "Main Sub",
    parent: "display",
    url: "/main-sub",
  },
  {
    name: "product",
    title: "Product",
    parent: "product",
    url: "/product",
  },
].map((item, idx) => ({ ...item, id: idx + 1 }));
