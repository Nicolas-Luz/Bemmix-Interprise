const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 500);
});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const productData = {
  CerealTub: {
    title: 'CerealTub',
    text: 'Cereal e leite em pó separados dentro da mesma embalagem. Adicione água, feche, agite e aproveite. Uma proposta da Bemmix para unir praticidade e sabor em uma única experiência.'
  },
  CerealTubMega: {
    title: 'CerealTub MEGA',
    text: 'Linha com copos em materiais cristais e translúcidos, proporcionando mais brilho, destaque e visibilidade ao produto. Une praticidade e um visual moderno em uma única embalagem. Valor: R$ 20,57.'
  },
  CerealTubEco: {
    title: 'CerealTub ECO',
    text: 'Linha sustentável, desenvolvida com foco em maior durabilidade e praticidade. Uma opção funcional e consciente, mantendo a qualidade e a praticidade do CerealTub. Valor: R$ 20,90.'
  }
};

const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

document.querySelectorAll('.details-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.launch-card');
    const data = productData[card.dataset.product];
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const offer = btn.dataset.offer;
    document.getElementById('contactForm').querySelector('select').value = 'Quero saber dos lançamentos';
    document.getElementById('contactForm').querySelector('textarea').value =
      `Tenho interesse na oferta: ${offer}. Gostaria de receber mais informações.`;
    document.getElementById('contato').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('modalContact').addEventListener('click', closeModal);

document.getElementById('contactForm').addEventListener('submit', e => {
  const form = e.currentTarget;
  const note = document.getElementById('formNote');
  const name = form.elements.name.value.trim();
  const button = form.querySelector('.submit');

  button.disabled = true;
  button.innerHTML = 'Enviando... <span>→</span>';
  note.textContent = 'Enviando sua mensagem para a Bemmix...';

  // O formulário é enviado pelo próprio navegador para o FormSubmit,
  // que encaminha a mensagem para o Gmail da Bemmix. O iframe evita sair da página.
  setTimeout(() => {
    note.textContent = `Obrigado, ${name}! Sua mensagem foi enviada para a Bemmix.`;
    form.reset();
    button.disabled = false;
    button.innerHTML = 'Enviar mensagem <span>→</span>';
  }, 1600);
});
