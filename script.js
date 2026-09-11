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
    text: 'Cereal e leite em pó separados dentro da mesma embalagem. A proposta é simples: adicionar água, fechar, agitar e aproveitar. Um café da manhã pensado para quem quer praticidade sem transformar a cozinha em uma operação industrial.'
  },
  MixCup: {
    title: 'MixCup',
    text: 'Uma linha de lanches rápidos da Bemmix, criada para combinar ingredientes de forma prática. Este conceito de produto pode receber diferentes sabores e combinações conforme a linha real da empresa.'
  },
  ChocoShake: {
    title: 'ChocoShake',
    text: 'Uma base para bebida cremosa de chocolate, feita para misturar e consumir com facilidade. O produto faz parte da linha experimental de bebidas da Bemmix.'
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
  e.preventDefault();
  const note = document.getElementById('formNote');
  const name = e.currentTarget.elements.name.value.trim();
  note.textContent = `Obrigado, ${name}! Sua mensagem foi preparada. Em uma versão com backend, ela será enviada à equipe Bemmix.`;
  e.currentTarget.reset();
});

document.querySelector('.social-placeholder').addEventListener('click', e => {
  e.preventDefault();
  alert('Instagram da Bemmix: @bemmix.br');
});
