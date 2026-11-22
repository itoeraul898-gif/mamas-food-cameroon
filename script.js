const MENU = [
  {id:'ndole',name:'Ndolé with plantain',description:'Ndolé with your choice of fried or boiled plantain, meat, fish and miyondor.',price:7500,category:'meals',tag:'Cameroonian favourite',options:['Fried plantain','Boiled plantain']},
  {id:'koki',name:'Koki & boiled plantain',description:'Koki served with boiled plantain.',price:8000,category:'meals',tag:'Traditional'},
  {id:'achu',name:'Achu soup',description:'Achu soup with beef and other proteins.',price:7500,category:'meals',tag:'Traditional',options:['Add a protein request']},
  {id:'okok',name:'Okok',description:'Okok with fish or bush meat. Choose bobolo or cassava.',price:5000,category:'meals',tag:'Traditional',options:['Fish','Bush meat','Bobolo','Cassava']},
  {id:'cornchaff',name:'Cornchaff',description:'Cornchaff with fish, meat and condiments.',price:5500,category:'meals',tag:'Hearty'},
  {id:'katikati',name:'Kati-Kati',description:'Vegetables, corn fufu and 2–3 slices of chicken.',price:15000,category:'meals',tag:'Large portion'},
  {id:'kwacoco',name:'Kwacoco Bible',description:'A filling traditional Cameroonian favourite.',price:6555,category:'meals',tag:'Traditional'},
  {id:'pouletdg',name:'Poulet DG',description:'Chicken and vegetables, prepared fresh.',price:6500,category:'meals',tag:'Popular'},
  {id:'jollof',name:'Jollof rice & chicken',description:'Jollof rice served with chicken.',price:2500,category:'meals',tag:'Popular'},
  {id:'fufu-eru',name:'Fufu & eru',description:'Fufu and eru with meat and condiments.',price:5000,category:'meals',tag:'Cameroonian favourite'},
  {id:'eru-soup',name:'Eru soup & fufu',description:'Eru soup with meat and condiments, served with fufu.',price:8500,category:'meals',tag:'Traditional'},
  {id:'sea-okro',name:'Sea okro',description:'Sea okro with your choice of gari or fufu.',price:5000,category:'meals',tag:'Choose your side',options:['Gari','Fufu']},
  {id:'sondisheh',name:'Sondisheh fish sauce',description:'Fish sauce served with boiled plantain.',price:700,category:'meals',tag:'Traditional'},
  {id:'egusi',name:'Egusi soup',description:'Egusi soup with your choice of fufu or gari.',price:7000,category:'meals',tag:'Choose your side',options:['Fufu','Gari']},
  {id:'potato',name:'Potato porridge',description:'Comforting potato porridge, made fresh.',price:5000,category:'meals',tag:'Home-style'},
  {id:'ekwang',name:'Ekwang',description:'A much-loved traditional meal.',price:1000,category:'meals',tag:'Traditional'},
  {id:'spaghetti',name:'Spaghetti & stew',description:'Spaghetti served with flavourful stew.',price:2500,category:'meals',tag:'Home-style'},
  {id:'folere',name:'Foléré',description:'Refreshing foléré drink. Per bottle.',price:250,category:'drinks',tag:'Per bottle'},
  {id:'yogurt',name:'Natural yogurt',description:'Natural yogurt. Per bottle.',price:1000,category:'drinks',tag:'Per bottle'},
  {id:'juice',name:'Fruit juice',description:'Fruit juice. Per bottle.',price:1500,category:'drinks',tag:'Fresh'},
  {id:'icecream',name:'Ice cream',description:'A cool treat to finish your meal.',price:2500,category:'drinks',tag:'Treat'},
  {id:'softdrink',name:'Soft drinks',description:'Fanta, Sprite and other available drinks. Ask for availability.',price:null,category:'drinks',tag:'Ask for price'},
  {id:'snacks',name:'Biscuits, chips & snacks',description:'Small snacks, around 500 XAF or less. Selection may vary.',price:null,category:'snacks',tag:'From 500 XAF'},
];
const OWNER_PHONE='237671561515';
const cart=new Map();
let activeCategory='all';
const grid=document.querySelector('#menu-grid');
const search=document.querySelector('#menu-search');
const drawer=document.querySelector('#cart-drawer');
const backdrop=document.querySelector('#drawer-backdrop');
const toast=document.querySelector('#toast');
const formatPrice=value=>new Intl.NumberFormat('fr-FR').format(value)+' XAF';
function renderMenu(){
  const query=search.value.trim().toLocaleLowerCase();
  const items=MENU.filter(item=>(activeCategory==='all'||item.category===activeCategory)&&`${item.name} ${item.description}`.toLocaleLowerCase().includes(query));
  if(!items.length){grid.innerHTML='<p class="empty-search">No matching items. Try another search or request a custom meal.</p>';return;}
  grid.innerHTML=items.map(item=>`<article class="menu-card"><div class="card-top"><span class="meal-category">${item.tag}</span><span class="meal-price">${item.price===null?'Ask us':formatPrice(item.price)}</span></div><h3>${item.name}</h3><p>${item.description}</p><div class="card-bottom"><span class="portion">${item.category==='meals'?'Large portion':item.category==='drinks'?'Drinks':'Snacks'}</span><button class="add-button" type="button" data-add="${item.id}">${item.price===null?'Request':'Add +'}</button></div></article>`).join('');
}
function addItem(id){const item=MENU.find(entry=>entry.id===id);if(!item)return;if(item.price===null){showToast(`${item.name}: ask us for today’s selection and price.`);openCart();return;}const key=id;if(cart.has(key))cart.get(key).qty+=1;else cart.set(key,{...item,qty:1,choice:''});renderCart();showToast(`${item.name} added to your order.`);}
function subtotal(){return [...cart.values()].reduce((sum,item)=>sum+item.price*item.qty,0);}
function renderCart(){const entries=[...cart.entries()];document.querySelector('#cart-count').textContent=entries.reduce((sum,[,item])=>sum+item.qty,0);document.querySelector('#cart-items').innerHTML=entries.map(([key,item])=>`<article class="cart-line"><div><h3>${item.name}</h3><p>${item.description}</p>${item.options?.length?`<label class="cart-option">Choice <select data-choice="${key}"><option value="">Choose / add in instructions</option>${item.options.map(option=>`<option ${item.choice===option?'selected':''}>${option}</option>`).join('')}</select></label>`:''}<div class="quantity"><button type="button" data-qty="-1" data-key="${key}" aria-label="Remove one ${item.name}">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-key="${key}" aria-label="Add one ${item.name}">+</button></div></div><span class="cart-line-price">${formatPrice(item.price*item.qty)}</span></article>`).join('');document.querySelector('#cart-empty').hidden=entries.length>0;document.querySelector('#checkout').hidden=entries.length===0;document.querySelector('#subtotal').textContent=formatPrice(subtotal());document.querySelector('#deposit').textContent=formatPrice(Math.ceil(subtotal()/2));}
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');backdrop.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>document.querySelector('#close-cart').focus(),50);}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');backdrop.hidden=true;document.body.style.overflow='';document.querySelector('#open-cart').focus();}
let toastTimer;function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);}
function sendOrder(event){event.preventDefault();if(!cart.size){showToast('Add a meal to your order first.');return;}const form=new FormData(event.currentTarget);const lines=[...cart.values()].map(item=>`• ${item.qty} x ${item.name}${item.choice?` (${item.choice})`:''} — ${formatPrice(item.price*item.qty)}`);const total=subtotal();const message=[`Hello MAMA’s FOOD, I would like to place an order.`,``,`Name: ${form.get('customerName')}`,`Phone: ${form.get('phone')}`,`Location: ${form.get('location')}`,`Timing: ${form.get('timing')}`,`Payment preference: ${form.get('payment')}`,``,`Order:`,...lines,``,`Food subtotal: ${formatPrice(total)}`,`Estimated 50% food deposit: ${formatPrice(Math.ceil(total/2))}`,`Delivery fee: please confirm based on my location.`,`Special instructions: ${form.get('instructions')||'None'}`,``,`Please confirm availability, delivery fee and payment details.`].join('\n');window.open(`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');showToast('WhatsApp opened. Please send your order and wait for confirmation.');}
grid.addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(button)addItem(button.dataset.add);});
document.querySelector('.category-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;document.querySelectorAll('.category-tab').forEach(tab=>tab.classList.toggle('active',tab===button));renderMenu();});
search.addEventListener('input',renderMenu);
document.querySelector('#cart-items').addEventListener('click',event=>{const button=event.target.closest('[data-qty]');if(!button)return;const item=cart.get(button.dataset.key);if(!item)return;item.qty+=Number(button.dataset.qty);if(item.qty<=0)cart.delete(button.dataset.key);renderCart();});
document.querySelector('#cart-items').addEventListener('change',event=>{const select=event.target.closest('[data-choice]');if(select&&cart.has(select.dataset.choice)){cart.get(select.dataset.choice).choice=select.value;}});
document.querySelector('#open-cart').addEventListener('click',openCart);document.querySelector('#close-cart').addEventListener('click',closeCart);backdrop.addEventListener('click',closeCart);document.querySelector('#continue-shopping').addEventListener('click',closeCart);document.querySelector('#order-form').addEventListener('submit',sendOrder);
document.querySelector('#custom-request-button').addEventListener('click',()=>{openCart();setTimeout(()=>{document.querySelector('[name="instructions"]').value='Custom meal request: ';document.querySelector('[name="instructions"]').focus();},100);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer.classList.contains('open'))closeCart();});document.querySelector('#year').textContent=new Date().getFullYear();renderMenu();renderCart();
