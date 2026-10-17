/* ==========================================================================
   Crumb & Crust - script.js
   1 Config   2 Menu data   3 Helpers   4 State   5 Modals and theme
   6 Hero showcase   7 Menu   8 Tray (cart)   9 Item popup   10 Maps
   11 Checkout   12 Live order tracking   13 Find us   14 Events and boot
   ========================================================================== */
"use strict";

/* 1. CONFIG --------------------------------------------------------------
   Everything you are likely to change lives here. */
const CONFIG = {
  branch: {
    name: "Crumb & Crust, PWD",
    // Approximate pin for PWD Housing Society. Replace with the exact numbers from
    // Google Maps (right-click the shop, then click the coordinates to copy them).
    lat: 33.565,
    lng: 73.15,
  },
  whatsapp: "923370772777",
  deliveryFee: 150, // placeholder, set your own
  freeDeliveryOver: 2000, // placeholder
  radiusKm: 8, // placeholder delivery radius
  promos: {
    // demo codes, edit or remove
    CNC10: { pct: 10, label: "10% off" },
    GOODMOOD: {
      flat: 100,
      min: 1500,
      label: "Rs. 100 off orders over Rs. 1,500",
    },
  },
  // Order tracking is simulated. speed: 20 runs the whole journey about 20x faster than real
  // time so it can be demoed in two minutes. Set speed: 1 for real time.
  sim: { speed: 20, minutesPerKm: 4 },
};

/* 2. MENU DATA ----------------------------------------------------------
   Items come straight from the printed menu. Photos live in /images and are
   matched by id (<id>.webp) unless an item sets its own img. */
const one = (p) => [["Single", p]];
const TRAD = [
  ["Small", 499],
  ["Medium", 1249],
  ["Large", 1749],
  ["Party", 2549],
];
const PREM = [
  ["Medium", 1499],
  ["Large", 1849],
  ["Party", 2849],
];
const RL = (r, l) => [
  ["Regular", r],
  ["Large", l],
];
const PCS = (a, b) => [
  ["6 pcs", a],
  ["12 pcs", b],
];
const dish = (id, name, desc, sizes, img) => ({ id, name, desc, sizes, img });

const DEALS = [
  dish(
    "d1",
    "Somewhat Super Deal 1",
    "1 Zinger Burger, 1 Regular Fries, 1 Regular Drink",
    one(559),
    "deal1",
  ),
  dish(
    "d2",
    "Somewhat Super Deal 2",
    "2 Zinger Burgers, 2 Pcs Chicken, 1 Regular Fries, 2 Regular Drinks",
    one(1449),
    "deal2",
  ),
  dish(
    "d3",
    "Somewhat Super Deal 3",
    "3 Zinger Burgers, 1 Large Fries, 2 Regular Drinks",
    one(1599),
    "deal3",
  ),
  dish(
    "d4",
    "Somewhat Super Deal 4",
    "3 Zinger Burgers, 3 Pcs Chicken, 2 Liter Drink",
    one(1799),
    "deal4",
  ),
  dish(
    "d5",
    "Small Pizza Deal",
    "6\u2033 small pizza with 1 regular drink (345 ml)",
    one(559),
    "dealpizza",
  ),
  dish(
    "d6",
    "Regular Pizza Deal",
    "9\u2033 regular pizza with 2 regular drinks (345 ml)",
    one(1399),
    "dealpizza",
  ),
  dish(
    "d7",
    "Large Pizza Deal",
    "12\u2033 large pizza with 1 liter drink",
    one(1799),
    "dealpizza",
  ),
];

const MENU = [
  {
    id: "special",
    name: "C&C Special Treat",
    tag: "Somewhat Premium",
    showTier: true,
    items: [
      dish(
        "sq",
        "C&C Special Square Pizza",
        "Loaded with cheese, signature sauce, two types of special chicken, onion, capsicum and green olives.",
        PREM,
      ),
      dish(
        "crown",
        "Crown Crust Pizza",
        "Signature sauce, mozzarella and Mughlai tikka, all crowned with capsicum, onion and black olives.",
        PREM,
      ),
      dish(
        "extreme",
        "Chicken Extreme Pizza",
        "Signature sauce and mozzarella mixed with onions, mushrooms, green olives and three special flavors of topping.",
        PREM,
      ),
      dish(
        "stuffcrust",
        "Stuff Crust Pizza",
        "Signature sauce, kabab dip and mozzarella with onion, capsicum, mushrooms, green olives and three mouth-watering toppings.",
        PREM,
      ),
      dish(
        "malai",
        "Malai Boti Pizza",
        "Signature sauce and mozzarella with onion and capsicum, topped with delicious malai boti.",
        PREM,
      ),
      dish(
        "beharikabab",
        "Behari Kabab Pizza",
        "Loaded with mozzarella, onion, jalapenos and signature sauce, garnished with tikka and juicy seekh kabab.",
        PREM,
      ),
      dish(
        "peri",
        "Peri Peri Pizza",
        "Loaded with cheese, signature sauce, two types of chicken and jalapenos, finished with peri peri sauce.",
        PREM,
      ),
    ],
  },
  {
    id: "trad",
    name: "Somewhat Traditional",
    tag: "Pizza classics",
    showTier: true,
    items: [
      dish(
        "tikka",
        "Chicken Tikka",
        "Pizza sauce and mozzarella topped with tasty tikka and onion for a delightful experience.",
        TRAD,
      ),
      dish(
        "fajita",
        "Chicken Fajita",
        "An authentic taste of fajita marinated chicken, onion, cheese, pizza sauce and bell peppers.",
        TRAD,
      ),
      dish(
        "supreme",
        "Chicken Supreme",
        "Smoky chicken tikka, fajita, onion, capsicum, mushrooms, pizza sauce, black olives and mozzarella.",
        TRAD,
      ),
      dish(
        "bbq",
        "Smoke B.B.Q",
        "Smoked B.B.Q chicken, jalapeno and tomato with pizza sauce on a bed of mozzarella.",
        TRAD,
      ),
      dish(
        "pepperoni",
        "Chicken Pepperoni",
        "A delectable topping of mozzarella and chicken pepperoni on pizza sauce.",
        TRAD,
      ),
      dish(
        "tandoori",
        "Chicken Tandoori",
        "Sizzling tandoori flavor with pizza sauce, cheese and tikka, topped with onion, jalapenos and black olives.",
        TRAD,
      ),
      dish(
        "cheese",
        "Cheese Lover",
        "A cheesy delight with a luscious blend of pizza sauce and mozzarella.",
        TRAD,
      ),
      dish(
        "mexican",
        "Mexican",
        "A delight of mozzarella, tikka and fajita chicken, jalapenos and pizza sauce.",
        TRAD,
      ),
      dish(
        "irish",
        "Original Irish",
        "A cheesy blend of pizza sauce and mozzarella, topped with sausages.",
        TRAD,
      ),
    ],
  },
  {
    id: "light",
    name: "Light Eats",
    items: [
      dish(
        "garlic",
        "Garlic Bread (4 pcs)",
        "Freshly baked, buttery garlic bread topped with coriander.",
        one(299),
      ),
      dish(
        "chunks",
        "Stuffed Chunks",
        "4 pcs stuffed calzone chunks served with sauce and fries.",
        one(949),
      ),
      dish(
        "cheesestick",
        "Cheese Stick",
        "Freshly baked bread filled with the yummiest cheese, served with sauce.",
        one(399),
      ),
      dish(
        "ccstick",
        "Chicken Cheese Stick",
        "Freshly baked bread filled with the yummiest cheese and chicken, served with sauce.",
        one(499),
      ),
      dish(
        "bakedwings",
        "Oven Baked Wings",
        "Fresh oven baked wings served with dip sauce.",
        PCS(499, 999),
      ),
      dish(
        "flamingwings",
        "Flaming Wings",
        "Fresh oven baked wings tossed in hot peri peri sauce, served with dip sauce.",
        PCS(519, 1039),
      ),
      dish(
        "arabic",
        "Arabic Roll",
        "4 pcs rolls stuffed with the yummiest mix, served with dip sauce.",
        one(449),
      ),
      dish(
        "behari",
        "Behari Roll",
        "4 pcs rolls stuffed with the yummiest mix, served with dip sauce.",
        one(549),
      ),
      dish(
        "bbqroll",
        "BAR B.Q Roll",
        "4 pcs rolls stuffed with the yummiest mix, served with dip sauce.",
        one(499),
      ),
      dish(
        "nuggets",
        "Nuggets",
        "Crispy golden chicken nuggets, tender and juicy inside with a deliciously crunchy coating.",
        one(449),
      ),
      dish(
        "pizzafries",
        "Pizza Fries",
        "Crispy fries loaded with cheesy pizza toppings and melted cheese.",
        RL(349, 649),
      ),
      dish(
        "fries",
        "French Fries",
        "A mixture of crisp and crunch for the yummiest taste.",
        RL(179, 299),
      ),
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      dish("zinger", "Zinger Burger", "", one(459)),
      dish("zingercheese", "Zinger Cheese Burger", "", one(519)),
      dish("smash", "C&C Smash Burger", "", one(699)),
      dish("double", "Double Patty Smash Burger", "", one(899)),
      dish("kid", "Kid Burger", "", one(349)),
    ],
  },
  {
    id: "platters",
    name: "C&C Platters",
    items: [
      dish(
        "pspecial",
        "C&C Special Platter",
        "4 pcs Behari rolls and 6 pcs oven baked wings, served with fries and dip sauce.",
        one(1099),
      ),
      dish(
        "pclassic",
        "C&C Classic Platter",
        "4 pcs Behari rolls and 4 pcs Arabic rolls, served with fries and dip sauce.",
        one(1099),
      ),
    ],
  },
  {
    id: "sandwiches",
    name: "C&C Sandwiches",
    items: [
      dish(
        "sspecial",
        "C&C Special Sandwich",
        "Black pepper chicken with fresh tomatoes, cucumber, sweet corn, lettuce and dip sauce in a soft, crispy bun, served with fries.",
        one(749),
      ),
      dish(
        "seuro",
        "C&C Euro Sandwich",
        "Chicken tikka with signature sauce, cheese, lettuce and pineapple in a soft and crispy bun, served with fries and loaded happiness.",
        one(749),
      ),
      dish(
        "stacker",
        "Pizza Stacker",
        "A unique blend of delicious sauce, crispy chicken and pizza crust.",
        one(749),
      ),
    ],
  },
  {
    id: "pastas",
    name: "C&C Pastas",
    items: [
      dish(
        "crispypasta",
        "C&C Crispy Pasta",
        "Yummiest macaroni pasta with white sauce, topped with crispy chicken and cheese.",
        RL(399, 799),
      ),
      dish(
        "alfredo",
        "Fettuccine Alfredo Pasta",
        "Fettuccine pasta tossed in creamy white sauce with mushrooms and chicken chunks.",
        RL(499, 999),
      ),
    ],
  },
  {
    id: "broast",
    name: "C&C Injected Broast",
    items: [
      dish("junior", "Junior Box", "", one(449), false),
      dish("quarter", "Quarter Broast", "", one(599), false),
      dish("half", "Half Broast", "", one(999), false),
      dish("full", "Full Broast", "", one(1499), false),
    ],
  },
  {
    id: "drinks",
    name: "Just Chill",
    items: [
      dish(
        "softdrink",
        "Soft Drink",
        "Served ice cold.",
        [
          ["Regular", 95],
          ["1 Liter", 175],
          ["1.5 Liter", 200],
        ],
        "drinks",
      ),
      dish("water", "Mineral Water", "", one(60), false),
    ],
  },
];

/* 3. HELPERS ------------------------------------------------------------ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => "Rs. " + Math.round(n).toLocaleString("en-US");
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const ico = (n) =>
  `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;

const ALL = [...DEALS, ...MENU.flatMap((c) => c.items)];
const byId = Object.fromEntries(ALL.map((i) => [i.id, i]));
const priceOf = (it, size) =>
  (it.sizes.find((s) => s[0] === size) || it.sizes[0])[1];
const fromPrice = (it) => Math.min(...it.sizes.map((s) => s[1]));
const img = (it) =>
  it.img === false ? "logo.webp" : `${it.img || it.id}.webp`;
const BR = () => ({ lat: CONFIG.branch.lat, lng: CONFIG.branch.lng });

const toRad = (d) => (d * Math.PI) / 180;
function km(a, b) {
  const h =
    Math.sin(toRad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(toRad(b.lng - a.lng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const store = {
  get(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage unavailable */
    }
  },
};

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

/* A photo that fails to load falls back to the logo. */
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG" && !e.target.dataset.fb) {
      e.target.dataset.fb = 1;
      e.target.src = "logo.webp";
    }
  },
  true,
);

/* 4. STATE -------------------------------------------------------------- */
const state = {
  type: store.get("cc_type", "delivery"),
  cart: store.get("cc_cart", []).filter((l) => byId[l.id]),
  favs: new Set(store.get("cc_favs", [])),
  customer: store.get("cc_customer", {}),
  orders: store.get("cc_orders", []),
  active: store.get("cc_active", null),
  promo: null,
  promoMsg: null,
  q: "",
  sort: "menu",
  onlyFavs: false,
};
const saveCart = () => store.set("cc_cart", state.cart);

/* 5. MODALS AND THEME --------------------------------------------------- */
function openModal(el) {
  el.classList.add("open");
  el.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  if (el.classList.contains("drawer")) $("#scrim").classList.add("show");
}
function closeModal(el) {
  if (!el) return;
  el.classList.remove("open");
  el.setAttribute("aria-hidden", "true");
  if (el.classList.contains("drawer")) $("#scrim").classList.remove("show");
  if (!$(".modal.open, .drawer.open")) document.body.classList.remove("lock");
}
/* The site opens in light mode. The header button switches to night mode and
   remembers the choice. */
function syncTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  $("#themeLabel").textContent = dark ? "Day mode" : "Night mode";
  $("#themeBtn").setAttribute("aria-pressed", dark);
  $("#themeBtn").setAttribute(
    "aria-label",
    dark ? "Switch to day mode" : "Switch to night mode",
  );
  $("meta[name=theme-color]").content = dark ? "#190e07" : "#f26a10";
}
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  store.set("cc_theme", t);
  syncTheme();
}

/* 6. HERO SHOWCASE ------------------------------------------------------ */
const SHOWCASE = [
  "double",
  "crown",
  "stuffcrust",
  "pspecial",
  "flamingwings",
  "alfredo",
];
function initHero() {
  const stage = $("#stage"),
    dots = $("#heroDots");
  let i = 0,
    timer;
  dots.innerHTML = SHOWCASE.map(
    (id) =>
      `<button type="button" aria-label="Show ${esc(byId[id].name)}"></button>`,
  ).join("");
  const show = (n) => {
    i = (n + SHOWCASE.length) % SHOWCASE.length;
    const it = byId[SHOWCASE[i]];
    $("#heroImg").src = img(it);
    $("#heroImg").alt = it.name;
    $("#heroName").textContent = it.name;
    $("#heroPrice").textContent =
      (it.sizes.length > 1 ? "from " : "") + money(fromPrice(it));
    $("#heroOrder").dataset.add = it.id;
    stage.classList.remove("swap");
    void stage.offsetWidth; // restart the pop animation
    stage.classList.add("swap");
    $$("button", dots).forEach((d, k) => d.classList.toggle("on", k === i));
  };
  const auto = () => {
    clearInterval(timer);
    timer = setInterval(() => show(i + 1), 4200);
  };
  $("#heroPrev").onclick = () => {
    show(i - 1);
    auto();
  };
  $("#heroNext").onclick = () => {
    show(i + 1);
    auto();
  };
  dots.onclick = (e) => {
    const b = e.target.closest("button");
    if (b) {
      show($$("button", dots).indexOf(b));
      auto();
    }
  };
  stage.onmouseenter = () => clearInterval(timer);
  stage.onmouseleave = auto;
  show(0);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) auto();
}

/* 7. MENU --------------------------------------------------------------- */
function renderDeals() {
  $("#dealGrid").innerHTML = DEALS.map(
    (d) => `
    <article class="coupon">
      <div class="coupon-art"><img src="${img(d)}" alt="${esc(d.name)}" loading="lazy"></div>
      <div class="coupon-body"><h3>${esc(d.name)}</h3><p>${esc(d.desc)}</p>
        <div class="coupon-foot"><strong>${money(d.sizes[0][1])}</strong><button class="btn btn-dark sm" type="button" data-add="${d.id}">Add</button></div>
      </div>
    </article>`,
  ).join("");
}

function card(it) {
  const multi = it.sizes.length > 1,
    fav = state.favs.has(it.id);
  return `
    <article class="card">
      <button class="fav ${fav ? "on" : ""}" type="button" data-fav="${it.id}" aria-pressed="${fav}" aria-label="Favourite ${esc(it.name)}">${ico("heart")}</button>
      <div class="card-art"><img src="${img(it)}" alt="${esc(it.name)}" loading="lazy"></div>
      <div class="card-body">
        <h3>${esc(it.name)}</h3>${it.desc ? `<p>${esc(it.desc)}</p>` : ""}
        <div class="card-foot">
          <span class="price">${multi ? "<small>from</small> " : ""}${money(fromPrice(it))}</span>
          <button class="add" type="button" data-add="${it.id}" aria-label="${multi ? "Choose size for" : "Add"} ${esc(it.name)}">${multi ? "Choose" : ico("plus")}</button>
        </div>
      </div>
    </article>`;
}

function renderMenu() {
  const q = state.q.trim().toLowerCase();
  const cats = MENU.map((c) => {
    let items = c.items.filter(
      (i) =>
        (!q || `${i.name} ${i.desc}`.toLowerCase().includes(q)) &&
        (!state.onlyFavs || state.favs.has(i.id)),
    );
    if (state.sort !== "menu")
      items = [...items].sort(
        (a, b) =>
          (fromPrice(a) - fromPrice(b)) * (state.sort === "low" ? 1 : -1),
      );
    return { ...c, items };
  }).filter((c) => c.items.length);

  $("#menuList").innerHTML = cats.length
    ? cats
        .map(
          (c) => `
      <section class="cat" id="cat-${c.id}">
        <h3>${esc(c.name)}</h3>${c.tag ? `<p class="cat-tag">${esc(c.tag)}</p>` : ""}
        ${c.showTier ? `<ul class="tier">${c.items[0].sizes.map(([l, p]) => `<li>${l} ${money(p)}</li>`).join("")}</ul>` : ""}
        <div class="grid">${c.items.map(card).join("")}</div>
      </section>`,
        )
        .join("")
    : `<p class="empty">${state.onlyFavs && !state.favs.size ? "Tap the heart on any dish to save it here." : "Nothing matches your search. Try “pizza” or “wings”."}</p>`;
  $("#dock").innerHTML = cats
    .map((c) => `<a href="#cat-${c.id}" data-cat="${c.id}">${esc(c.name)}</a>`)
    .join("");
  watchCategories();
}

/* Highlight the dock link of the category that is on screen. */
let catObserver;
function watchCategories() {
  catObserver?.disconnect();
  if (!("IntersectionObserver" in window)) return;
  catObserver = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e) => {
          $$("#dock a").forEach((a) => {
            const on = a.dataset.cat === e.target.id.slice(4);
            a.classList.toggle("on", on);
            if (on)
              $("#dock").scrollTo({
                left: a.offsetLeft - 40,
                behavior: "smooth",
              });
          });
        });
    },
    { rootMargin: "-35% 0px -60% 0px" },
  );
  $$(".cat").forEach((s) => catObserver.observe(s));
}

function toggleFav(btn) {
  const id = btn.dataset.fav;
  state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
  store.set("cc_favs", [...state.favs]);
  btn.classList.toggle("on", state.favs.has(id));
  btn.setAttribute("aria-pressed", state.favs.has(id));
  if (state.onlyFavs) renderMenu();
}

/* Single-size items go straight into the tray, others open the size popup. */
function onAdd(id) {
  const it = byId[id];
  it.sizes.length > 1 ? openItem(id) : addLine(id, it.sizes[0][0], 1, "");
}

/* 8. TRAY (CART) -------------------------------------------------------- */
function addLine(id, size, qty, note) {
  const line = state.cart.find(
    (l) => l.id === id && l.size === size && l.note === note,
  );
  line ? (line.qty += qty) : state.cart.push({ id, size, qty, note });
  saveCart();
  renderCart();
  const btn = $("#cartBtn");
  btn.classList.remove("bump");
  void btn.offsetWidth;
  btn.classList.add("bump");
  toast(`${byId[id].name} added to your tray`);
}
function changeQty(i, d) {
  const l = state.cart[i];
  if (!l) return;
  l.qty += d;
  if (l.qty < 1) state.cart.splice(i, 1);
  saveCart();
  renderCart();
}
function removeLine(i) {
  state.cart.splice(i, 1);
  saveCart();
  renderCart();
}

function totals() {
  const sub = state.cart.reduce(
    (s, l) => s + priceOf(byId[l.id], l.size) * l.qty,
    0,
  );
  const promo = state.promo && CONFIG.promos[state.promo];
  let disc = 0;
  if (promo && sub >= (promo.min || 0))
    disc = promo.pct ? Math.round((sub * promo.pct) / 100) : promo.flat;
  const fee =
    state.type === "delivery" && sub > 0 && sub < CONFIG.freeDeliveryOver
      ? CONFIG.deliveryFee
      : 0;
  return { sub, disc, fee, total: Math.max(0, sub - disc + fee) };
}

function applyPromo() {
  const code = ($("#promoInput").value || "").trim().toUpperCase();
  if (!code) return;
  const p = CONFIG.promos[code],
    sub = totals().sub;
  if (!p) {
    state.promo = null;
    state.promoMsg = ["That code isn’t valid.", false];
  } else if (p.min && sub < p.min) {
    state.promo = null;
    state.promoMsg = [
      `Spend ${money(p.min - sub)} more to use ${code}.`,
      false,
    ];
  } else {
    state.promo = code;
    state.promoMsg = [`${code} applied: ${p.label}.`, true];
  }
  renderCart();
}

const typeButtons = () =>
  ["delivery", "pickup"]
    .map(
      (t) =>
        `<button type="button" data-type="${t}" aria-pressed="${state.type === t}">${t === "delivery" ? "Delivery" : "Pickup"}</button>`,
    )
    .join("");

const sumRows = (t) => `
  <div class="sum-row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
  ${t.disc ? `<div class="sum-row"><span>Promo (${esc(state.promo)})</span><span>− ${money(t.disc)}</span></div>` : ""}
  ${state.type === "delivery" ? `<div class="sum-row"><span>Delivery</span><span>${t.fee ? money(t.fee) : "Free"}</span></div>` : ""}
  <div class="sum-row total"><span>Total</span><span>${money(t.total)}</span></div>`;

const lineHTML = (l, i) => {
  const it = byId[l.id];
  const sub = [it.sizes.length > 1 ? l.size : "", l.note ? `“${l.note}”` : ""]
    .filter(Boolean)
    .map(esc)
    .join(" · ");
  return `
    <li class="line">
      <img src="${img(it)}" alt="">
      <div><b>${esc(it.name)}</b><small>${sub}</small>
        <div class="stepper sm">
          <button type="button" data-line="${i}" data-d="-1" aria-label="One less">${ico("minus")}</button><output>${l.qty}</output>
          <button type="button" data-line="${i}" data-d="1" aria-label="One more">${ico("plus")}</button>
        </div>
      </div>
      <div class="line-r"><strong>${money(priceOf(it, l.size) * l.qty)}</strong>
        <button class="link" type="button" data-rm="${i}" aria-label="Remove ${esc(it.name)}">${ico("trash")}</button></div>
    </li>`;
};

function emptyCart() {
  const recent = state.orders.slice(0, 3);
  return `
    <div class="cart-empty"><img src="logo.webp" alt=""><h3>Your tray is empty</h3><p>Pick something delicious from the menu.</p>
      <button class="btn btn-primary" type="button" data-close data-goto="#menu">Browse the menu</button></div>
    ${
      recent.length
        ? `<div class="recent"><h4>Recent orders</h4>${recent
            .map(
              (o) => `
      <div class="recent-row"><div><b>${esc(o.id)}</b><small>${o.items.map((i) => `${i.qty}× ${esc(i.name)}`).join(", ")}</small></div>
      <button class="btn btn-ghost sm" type="button" data-reorder="${esc(o.id)}">Reorder</button></div>`,
            )
            .join("")}</div>`
        : ""
    }`;
}

function renderCart() {
  const n = state.cart.reduce((s, l) => s + l.qty, 0),
    t = totals();
  $("#cartCount").textContent = n;
  const body = $("#cartBody"),
    foot = $("#cartFoot");
  if (!n) {
    body.innerHTML = emptyCart();
    foot.innerHTML = "";
    renderSummary();
    return;
  }

  const promo = state.promo && CONFIG.promos[state.promo];
  const unmet = promo && t.sub < (promo.min || 0);
  const free = CONFIG.freeDeliveryOver;
  const promoText = unmet
    ? `Spend ${money(promo.min - t.sub)} more to use ${state.promo}.`
    : state.promoMsg
      ? state.promoMsg[0]
      : "Have a promo code? Enter it above.";
  body.innerHTML = `
    <ul class="lines">${state.cart.map(lineHTML).join("")}</ul>
    <div class="promo"><input id="promoInput" placeholder="Promo code" aria-label="Promo code" value="${esc(state.promo || "")}"><button class="btn btn-ghost sm" type="button" id="promoApply">Apply</button></div>
    <p class="promo-msg ${state.promoMsg && state.promoMsg[1] && !unmet ? "ok" : ""}">${esc(promoText)}</p>
    ${state.type === "delivery" ? `<div class="freebar">${t.sub >= free ? "You’ve unlocked free delivery." : `Add ${money(free - t.sub)} more for free delivery.`}<div class="meter"><span style="width:${Math.min(100, (t.sub / free) * 100)}%"></span></div></div>` : ""}`;
  foot.innerHTML = `
    <div class="seg seg-lg" role="group" aria-label="Order type">${typeButtons()}</div>
    ${sumRows(t)}
    <button class="btn btn-primary" style="width:100%;margin-top:.8rem" type="button" id="toCheckout">Checkout · ${money(t.total)}</button>`;
  renderSummary();
}

function reorder(id) {
  const o = state.orders.find((x) => x.id === id);
  if (!o) return;
  o.items.forEach((i) => {
    if (byId[i.id]) addLine(i.id, i.size, i.qty, i.note || "");
  });
  closeModal($("#trackModal"));
  openModal($("#cartDrawer"));
}

function setType(t) {
  state.type = t;
  store.set("cc_type", t);
  syncType();
  renderCart();
  if (t === "delivery" && $("#checkoutModal").classList.contains("open"))
    initPicker();
}
function syncType() {
  $$("[data-type]").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.type === state.type),
  );
  $("#deliveryFields").hidden = state.type !== "delivery";
  $("#pickupInfo").hidden = state.type === "delivery";
}

/* 9. ITEM POPUP --------------------------------------------------------- */
let current = null;
function openItem(id) {
  const it = byId[id];
  current = { it, size: it.sizes[0][0], qty: 1 };
  $("#itemImg").src = img(it);
  $("#itemImg").alt = it.name;
  $("#itemName").textContent = it.name;
  $("#itemDesc").textContent = it.desc || "";
  $("#itemNote").value = "";
  $("#itemSizes").innerHTML =
    `<legend>Choose a size</legend>` +
    it.sizes
      .map(
        ([l, p], k) =>
          `<label class="size"><input type="radio" name="size" value="${esc(l)}" ${k === 0 ? "checked" : ""}><span>${esc(l)}<small>${money(p)}</small></span></label>`,
      )
      .join("");
  updateItem();
  openModal($("#itemModal"));
}
function updateItem() {
  $("#itemQty").textContent = current.qty;
  $("#itemTotal").textContent = money(
    priceOf(current.it, current.size) * current.qty,
  );
}

/* 10. MAPS (Leaflet + OpenStreetMap) ------------------------------------ */
function makeMap(el, center, zoom) {
  if (!window.L) {
    el.innerHTML =
      '<p class="empty">The map could not load. Check your connection.</p>';
    return null;
  }
  const map = L.map(el, { scrollWheelZoom: false }).setView(
    [center.lat, center.lng],
    zoom,
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  return map;
}
const pinIcon = (html, size, cls = "") =>
  L.divIcon({
    html,
    className: "pin-wrap " + cls,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
const branchIcon = () =>
  pinIcon('<div class="pin"><img src="logo.webp" alt=""></div>', 48);
const meIcon = () => pinIcon(`<div class="pin me">${ico("pin")}</div>`, 38);
const riderIcon = () =>
  pinIcon(`<div class="pin rider">${ico("scooter")}</div>`, 46);

function locate(onOk) {
  if (!navigator.geolocation)
    return toast("Location isn’t available on this device.");
  navigator.geolocation.getCurrentPosition(
    (p) => onOk({ lat: p.coords.latitude, lng: p.coords.longitude }),
    () =>
      toast(
        "We couldn’t get your location. Please allow access and try again.",
      ),
    { enableHighAccuracy: true, timeout: 10000 },
  );
}

/* A gently curved path from the kitchen to the customer for the rider to follow. */
function routePoints(a, b, n = 60) {
  const c = {
    lat: (a.lat + b.lat) / 2 - (b.lng - a.lng) * 0.18,
    lng: (a.lng + b.lng) / 2 + (b.lat - a.lat) * 0.18,
  };
  return Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n,
      u = 1 - t;
    return [
      u * u * a.lat + 2 * u * t * c.lat + t * t * b.lat,
      u * u * a.lng + 2 * u * t * c.lng + t * t * b.lng,
    ];
  });
}

/* 11. CHECKOUT ---------------------------------------------------------- */
const PREP_MIN = 22; // minutes from order to the rider leaving (see PREP_STAGES)
const rideMin = (d) => Math.max(6, d * CONFIG.sim.minutesPerKm);

let pickMap, pickPin;
function initPicker() {
  if (!pickMap) {
    pickMap = makeMap($("#pickMap"), BR(), 14);
    if (!pickMap) return;
    L.marker([BR().lat, BR().lng], { icon: branchIcon() }).addTo(pickMap);
    pickMap.on("click", (e) =>
      setDest({ lat: e.latlng.lat, lng: e.latlng.lng }),
    );
    if (state.customer.lat) setDest(state.customer, true);
  }
  setTimeout(() => pickMap.invalidateSize(), 300);
}
function setDest(p, quiet) {
  state.customer.lat = p.lat;
  state.customer.lng = p.lng;
  store.set("cc_customer", state.customer);
  if (pickMap) {
    pickPin
      ? pickPin.setLatLng([p.lat, p.lng])
      : (pickPin = L.marker([p.lat, p.lng], { icon: meIcon() }).addTo(pickMap));
    if (!quiet) pickMap.panTo([p.lat, p.lng]);
  }
  const d = km(p, BR());
  $("#pickInfo").textContent =
    `${d.toFixed(1)} km from our PWD kitchen · about ${Math.round(PREP_MIN + rideMin(d))} min` +
    (d > CONFIG.radiusKm ? " · outside our usual delivery area" : "");
}
const destination = () =>
  state.customer.lat
    ? { lat: state.customer.lat, lng: state.customer.lng }
    : { lat: BR().lat + 0.012, lng: BR().lng + 0.014 };

function renderSummary() {
  const el = $("#coSummary");
  el.innerHTML =
    state.cart
      .map((l) => {
        const it = byId[l.id];
        return `<div class="sum-row"><span>${l.qty}× ${esc(it.name)}${it.sizes.length > 1 ? ` (${esc(l.size)})` : ""}</span><span>${money(priceOf(it, l.size) * l.qty)}</span></div>`;
      })
      .join("") + sumRows(totals());
}

function openCheckout() {
  if (!state.cart.length) return toast("Your tray is empty.");
  closeModal($("#cartDrawer"));
  const c = state.customer;
  $("#fName").value = c.name || "";
  $("#fPhone").value = c.phone || "";
  $("#fAddress").value = c.address || "";
  $("#coErr").textContent = "";
  syncType();
  renderSummary();
  openModal($("#checkoutModal"));
  if (state.type === "delivery") initPicker();
}

function validate() {
  const name = $("#fName").value.trim(),
    phone = $("#fPhone").value.replace(/[\s-]/g, ""),
    addr = $("#fAddress").value.trim();
  let err = "";
  if (!state.cart.length) err = "Your tray is empty.";
  else if (name.length < 2) err = "Please enter your name.";
  else if (!/^(?:\+?92|0)?\d{10}$/.test(phone))
    err = "Please enter a valid phone number.";
  else if (state.type === "delivery" && addr.length < 6)
    err = "Please add your delivery address.";
  $("#coErr").textContent = err;
  return !err;
}

function placeOrder() {
  if (!validate()) return;
  const order = {
    id: "CC-" + (1000 + Math.floor(Math.random() * 9000)),
    type: state.type,
    createdAt: Date.now(),
    totals: totals(),
    dest: state.type === "delivery" ? destination() : null,
    items: state.cart.map((l) => ({
      id: l.id,
      size: l.size,
      qty: l.qty,
      note: l.note,
      name: byId[l.id].name,
      price: priceOf(byId[l.id], l.size),
    })),
    customer: {
      name: $("#fName").value.trim(),
      phone: $("#fPhone").value.trim(),
      address: $("#fAddress").value.trim(),
    },
    pay: $("input[name=pay]:checked").value,
    note: $("#fNote").value.trim(),
  };
  Object.assign(state.customer, order.customer);
  store.set("cc_customer", state.customer);
  state.orders = [order, ...state.orders].slice(0, 10);
  state.active = order.id;
  store.set("cc_orders", state.orders);
  store.set("cc_active", state.active);
  state.cart = [];
  state.promo = state.promoMsg = null;
  saveCart();
  renderCart();
  closeModal($("#checkoutModal"));
  startTracking(order, true);
  toast(`Order ${order.id} placed. Thank you!`);
}

function whatsappOrder() {
  if (!validate()) return;
  const t = totals();
  const lines = state.cart.map((l) => {
    const it = byId[l.id];
    return `• ${l.qty}× ${it.name}${it.sizes.length > 1 ? ` (${l.size})` : ""}: ${money(priceOf(it, l.size) * l.qty)}`;
  });
  const text = [
    `Hi Crumb & Crust! I’d like to order for ${state.type}:`,
    ...lines,
    `Total: ${money(t.total)}`,
    `Name: ${$("#fName").value.trim()}`,
    `Phone: ${$("#fPhone").value.trim()}`,
    state.type === "delivery" ? `Address: ${$("#fAddress").value.trim()}` : "",
    state.type === "delivery" && state.customer.lat
      ? `Map pin: https://maps.google.com/?q=${state.customer.lat},${state.customer.lng}`
      : "",
    $("#fNote").value.trim() ? `Notes: ${$("#fNote").value.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  window.open(
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener",
  );
}

/* 12. LIVE ORDER TRACKING ----------------------------------------------- */
/* The journey is simulated from the time the order was placed, so it keeps
   going after a page reload. To use real updates, replace progress() with a call
   to your order system. */
const PREP_STAGES = [
  ["placed", "Order placed", "We’ve got your order.", 1],
  ["confirmed", "Order confirmed", "The PWD kitchen has accepted it.", 2],
  ["prep", "Preparing", "Fresh dough, fresh toppings.", 10],
  ["bake", "In the oven", "Baked with passion.", 9],
];
function stagesFor(o) {
  const list = PREP_STAGES.map(([key, title, note, min]) => ({
    key,
    title,
    note,
    min,
  }));
  if (o.type === "delivery") {
    list.push({
      key: "ride",
      title: "On the way",
      note: "Your rider is heading to you.",
      min: rideMin(km(BR(), o.dest)),
    });
    list.push({
      key: "done",
      title: "Delivered",
      note: "Enjoy! Good food, good mood.",
      min: 0,
    });
  } else {
    list.push({
      key: "done",
      title: "Ready for pickup",
      note: "Come to the PWD counter and quote your order number.",
      min: 0,
    });
  }
  return list.map((s) => ({ ...s, sec: (s.min * 60) / CONFIG.sim.speed }));
}
function progress(o) {
  const st = stagesFor(o),
    el = (Date.now() - o.createdAt) / 1000,
    total = st.reduce((s, x) => s + x.sec, 0);
  let acc = 0;
  for (let i = 0; i < st.length; i++) {
    if (el < acc + st[i].sec || i === st.length - 1)
      return {
        st,
        i,
        el,
        total,
        p: st[i].sec ? Math.min(1, (el - acc) / st[i].sec) : 1,
      };
    acc += st[i].sec;
  }
}
const isDone = (o) => {
  const p = progress(o);
  return p.i === p.st.length - 1 && p.el >= p.total;
};

const trk = {
  order: null,
  map: null,
  layers: {},
  route: [],
  timer: null,
  last: -1,
};

function startTracking(o, openNow) {
  trk.order = o;
  trk.last = -1;
  $("#trkCode").textContent =
    `Order ${o.id} · ${o.type === "delivery" ? "Delivery" : "Pickup"}`;
  $("#trkDemo").textContent =
    CONFIG.sim.speed > 1 ? `Live demo · ${CONFIG.sim.speed}× speed` : "Live";
  $("#trkSteps").innerHTML = stagesFor(o)
    .map(
      (s) =>
        `<li><i>${ico("check")}</i><b>${esc(s.title)}</b><small>${esc(s.note)}</small></li>`,
    )
    .join("");
  $("#trkItems").innerHTML =
    o.items
      .map(
        (i) =>
          `<div><span>${i.qty}× ${esc(i.name)}</span><span>${money(i.price * i.qty)}</span></div>`,
      )
      .join("") + `<div><b>Total</b><b>${money(o.totals.total)}</b></div>`;
  $("#trackPill").hidden = isDone(o);
  clearInterval(trk.timer);
  trk.timer = setInterval(tick, 500);
  if (openNow) openTracker();
  tick();
}

function openTracker() {
  openModal($("#trackModal"));
  buildTrackMap();
  setTimeout(() => trk.map?.invalidateSize(), 300);
}

function buildTrackMap() {
  const o = trk.order;
  if (!o) return;
  if (!trk.map) trk.map = makeMap($("#trkMap"), BR(), 14);
  const m = trk.map;
  if (!m) return;
  Object.values(trk.layers).forEach((l) => l.remove());
  trk.layers = {
    branch: L.marker([BR().lat, BR().lng], { icon: branchIcon() }).addTo(m),
  };
  if (o.type === "delivery") {
    trk.route = routePoints(BR(), o.dest);
    trk.layers.route = L.polyline(trk.route, {
      color: "#f26a10",
      weight: 5,
      opacity: 0.35,
      dashArray: "2 10",
    }).addTo(m);
    trk.layers.done = L.polyline([], { color: "#f26a10", weight: 5 }).addTo(m);
    trk.layers.dest = L.marker([o.dest.lat, o.dest.lng], {
      icon: meIcon(),
    }).addTo(m);
    trk.layers.rider = L.marker([BR().lat, BR().lng], {
      icon: riderIcon(),
      opacity: 0,
    }).addTo(m);
    m.fitBounds(L.latLngBounds(trk.route), { padding: [60, 60] });
  } else {
    m.setView([BR().lat, BR().lng], 16);
  }
  tick();
}

function tick() {
  const o = trk.order;
  if (!o) return;
  const { st, i, el, total, p } = progress(o),
    cur = st[i],
    last = i === st.length - 1;
  const minLeft = Math.max(
    0,
    Math.ceil(((total - el) * CONFIG.sim.speed) / 60),
  );
  $("#trkTitle").textContent = cur.title;
  $("#trkNote").textContent = cur.note;
  $("#trkEta").textContent = last
    ? o.type === "delivery"
      ? "Arrived"
      : "Ready now"
    : `${minLeft} min`;
  $("#trkBar").style.width = Math.min(100, (el / total) * 100) + "%";
  $("#trackPillText").textContent = last
    ? "Delivered"
    : `${cur.title} · ${minLeft} min`;
  $$("#trkSteps li").forEach((li, k) => {
    li.className = k < i || (last && k === i) ? "done" : k === i ? "now" : "";
  });

  const rider = trk.layers.rider;
  if (rider && o.type === "delivery") {
    const n = trk.route.length - 1,
      idx = cur.key === "ride" ? Math.round(p * n) : last ? n : 0;
    rider.setLatLng(trk.route[idx]);
    rider.setOpacity(["bake", "ride", "done"].includes(cur.key) ? 1 : 0);
    trk.layers.done.setLatLngs(trk.route.slice(0, idx + 1));
  }
  if (i !== trk.last) {
    if (trk.last >= 0)
      toast(last ? `${cur.title}! Enjoy your meal.` : cur.title);
    trk.last = i;
  }
  if (last && el >= total) {
    clearInterval(trk.timer);
    trk.timer = null;
    if (state.active === o.id) {
      state.active = null;
      store.set("cc_active", null);
    }
    setTimeout(() => {
      $("#trackPill").hidden = true;
    }, 20000);
  }
}

/* Pick the tracker back up after a page reload. */
function resumeTracking() {
  const o = state.orders.find((x) => x.id === state.active);
  if (o && !isDone(o)) startTracking(o, false);
}

/* 13. FIND US ----------------------------------------------------------- */
function initFind() {
  const map = makeMap($("#branchMap"), BR(), 15);
  if (!map) return;
  L.marker([BR().lat, BR().lng], { icon: branchIcon() })
    .addTo(map)
    .bindPopup(
      `<b>${esc(CONFIG.branch.name)}</b><br>Main Entrance Barrier, PWD,<br>near Fresco Sweets`,
    );
  L.circle([BR().lat, BR().lng], {
    radius: CONFIG.radiusKm * 1000,
    color: "#f26a10",
    weight: 2,
    dashArray: "6 8",
    fillColor: "#ffd60a",
    fillOpacity: 0.08,
  }).addTo(map);

  let me;
  $("#locBtn").onclick = () =>
    locate((pos) => {
      const d = km(pos, BR());
      me
        ? me.setLatLng([pos.lat, pos.lng])
        : (me = L.marker([pos.lat, pos.lng], { icon: meIcon() }).addTo(map));
      map.fitBounds(
        L.latLngBounds([
          [pos.lat, pos.lng],
          [BR().lat, BR().lng],
        ]),
        { padding: [60, 60], maxZoom: 16 },
      );
      $("#findOut").textContent =
        d <= CONFIG.radiusKm
          ? `You’re ${d.toFixed(1)} km away, inside our delivery area. Expect about ${Math.round(PREP_MIN + rideMin(d))} minutes to your door.`
          : `You’re ${d.toFixed(1)} km away, a little outside our usual delivery area. Call us on 0304 87 72 777 and we’ll see what we can do.`;
    });
}

/* 14. EVENTS AND BOOT --------------------------------------------------- */
document.addEventListener("click", (e) => {
  const t = e.target;
  let el;
  if ((el = t.closest("[data-goto]")))
    $(el.dataset.goto)?.scrollIntoView({ behavior: "smooth" });
  if ((el = t.closest("[data-close]"))) {
    closeModal(el.closest(".modal, .drawer"));
    return;
  }
  if (t.classList.contains("modal")) return closeModal(t);
  if (t.id === "scrim") return $$(".drawer.open").forEach(closeModal);
  if ((el = t.closest("[data-add]"))) return onAdd(el.dataset.add);
  if ((el = t.closest("[data-fav]"))) return toggleFav(el);
  if ((el = t.closest("[data-type]"))) return setType(el.dataset.type);
  if ((el = t.closest("[data-line]")))
    return changeQty(+el.dataset.line, +el.dataset.d);
  if ((el = t.closest("[data-rm]"))) return removeLine(+el.dataset.rm);
  if ((el = t.closest("[data-reorder]"))) return reorder(el.dataset.reorder);
  if (t.closest("#promoApply")) return applyPromo();
  if (t.closest("#toCheckout")) return openCheckout();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $$(".modal.open, .drawer.open").forEach(closeModal);
  if (e.key === "Enter" && e.target.id === "promoInput") applyPromo();
});

$("#cartBtn").onclick = () => openModal($("#cartDrawer"));
$("#themeBtn").onclick = () =>
  setTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
  );
$("#trackPill").onclick = openTracker;
$("#trkReorder").onclick = () => trk.order && reorder(trk.order.id);
$("#q").oninput = (e) => {
  state.q = e.target.value;
  renderMenu();
};
$("#sort").onchange = (e) => {
  state.sort = e.target.value;
  renderMenu();
};
$("#favOnly").onclick = (e) => {
  state.onlyFavs = !state.onlyFavs;
  e.currentTarget.setAttribute("aria-pressed", state.onlyFavs);
  renderMenu();
};
$("#itemSizes").addEventListener("change", (e) => {
  current.size = e.target.value;
  updateItem();
});
$("#qtyMinus").onclick = () => {
  current.qty = Math.max(1, current.qty - 1);
  updateItem();
};
$("#qtyPlus").onclick = () => {
  current.qty = Math.min(20, current.qty + 1);
  updateItem();
};
$("#itemAdd").onclick = () => {
  addLine(
    current.it.id,
    current.size,
    current.qty,
    $("#itemNote").value.trim(),
  );
  closeModal($("#itemModal"));
};
$("#useLoc").onclick = () => locate(setDest);
$("#waOrder").onclick = whatsappOrder;
$("#checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  placeOrder();
});

syncTheme();
renderDeals();
renderMenu();
initHero();
renderCart();
syncType();
/* A map problem must never stop the rest of the site from working. */
try {
  initFind();
} catch (err) {
  console.warn("The map could not start:", err);
}
resumeTracking();
