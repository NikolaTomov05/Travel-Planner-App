var destinacii = [
  { city: 'Paris', category: 'City', flight: 180, hotel: 120, daily: 70, likes: 0, dislikes: 0, glasovi: {}, comments: [],
    images: ['slikiproekt/paris0.jpg', 'slikiproekt/paris1.webp', 'slikiproekt/paris2.jpg'] },
  { city: 'Rome', category: 'City', flight: 140, hotel: 95, daily: 60, likes: 0, dislikes: 0, glasovi: {}, comments: [],
    images: ['slikiproekt/rim1.webp', 'slikiproekt/rim2.jpg', 'slikiproekt/rim3.webp'] },
  { city: 'Barcelona', category: 'Beach', flight: 130, hotel: 85, daily: 55, likes: 0, dislikes: 0, glasovi: {}, comments: [],
    images: ['slikiproekt/barcelona1.jpg', 'slikiproekt/barcelona2.jpg', 'slikiproekt/barcelona3.webp'] },
  { city: 'Ohrid', category: 'Nature', flight: 0, hotel: 40, daily: 30, likes: 0, dislikes: 0, glasovi: {}, comments: [],
    images: ['slikiproekt/ohrid1.jpg', 'slikiproekt/ohrid2.jpg', 'slikiproekt/ohrid3.jpg'] }
];
var tekovna = 0;   
var korisnik = ''; 

function Otvori(id) {
  document.getElementById(id).classList.remove('d-none');
}
function Zatvori(id) {
  document.getElementById(id).classList.add('d-none');
}

function Total(d) {
  return d.flight + 5 * (d.hotel + d.daily);
}

function Prikazi() {
  var cat = document.getElementById('filterCategory').value;
  var budget = document.getElementById('filterBudget').value;
  var grid = '';
  for (var i = 0; i < destinacii.length; i++) {
    var d = destinacii[i];
    if (cat != 'all' && d.category != cat) continue;                 
    if (budget != '' && Total(d) > Number(budget)) continue;          
    grid += '<div class="col-md-4 mb-4"><div class="card h-100">' +
      '<img class="card-img-top" style="height:220px;object-fit:cover;" src="' + d.images[0] + '" alt="' + d.city + '">' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + d.city + '</h5>' +
      '<span class="badge badge-secondary">' + d.category + '</span>' +
      '</div>' +
      '<ul class="list-group list-group-flush">' +
      '<li class="list-group-item">Flight: €' + d.flight + '</li>' +
      '<li class="list-group-item">Hotel: €' + d.hotel + ' / night</li>' +
      '<li class="list-group-item">Daily: €' + d.daily + '</li>' +
      '<li class="list-group-item"><strong>Total (5 nights): €' + Total(d) + '</strong></li>' +
      '</ul>' +
      '<div class="card-footer">' +
      '<button class="btn btn-secondary btn-sm" onclick="OtvoriGalerija(' + i + ')">Gallery</button> ' +
      '<button class="btn btn-danger btn-sm" onclick="Izbrisi(' + i + ')">Delete</button>' +
      '<span class="float-right">👍 ' + d.likes + ' 👎 ' + d.dislikes + '</span>' +
      '</div></div></div>';
  }
  document.getElementById('cityGrid').innerHTML = grid;
}

function DodadiDestinacija() {
  var city = document.getElementById('aCity').value;
  if (city == '') return;
  destinacii.push({
    city: city,
    category: document.getElementById('aCategory').value,
    flight: Number(document.getElementById('Flight').value),
    hotel: Number(document.getElementById('Hotel').value),
    daily: Number(document.getElementById('Daily').value),
    likes: 0, dislikes: 0, glasovi: {}, comments: [],
    images: ['slikiproekt/default.png']
  });
  Zatvori('AddDestination');
  Prikazi();
}

function Izbrisi(i) {
  destinacii.splice(i, 1);
  Prikazi();
}

function OtvoriGalerija(i) {
  tekovna = i;
  var d = destinacii[i];
  document.getElementById('galTitle').innerText = d.city;
  var sliki = '';
  for (var j = 0; j < d.images.length; j++) {
    sliki += '<div class="col-4"><img src="' + d.images[j] + '" class="img-fluid mb-2" style="height:160px;width:100%;object-fit:cover;"></div>';
  }
  document.getElementById('galImages').innerHTML = sliki;
  PrikaziGalerija();
  Otvori('galleryCard');
}

function PrikaziGalerija() {
  var d = destinacii[tekovna];
  document.getElementById('likeCount').innerText = d.likes;
  document.getElementById('dislikeCount').innerText = d.dislikes;
  var html = '';
  for (var i = 0; i < d.comments.length; i++) {
    html += '<p>' + d.comments[i] + '</p>';
  }
  document.getElementById('commentList').innerHTML = html;
}

function Glasaj(tip) {
  if (korisnik == '') {
    alert('Please sign up first to like or dislike.');
    return;
  }
  var d = destinacii[tekovna];
  var prethoden = d.glasovi[korisnik];
  if (prethoden) {
    d[prethoden]--;                     
    delete d.glasovi[korisnik];
  }
  if (prethoden != tip) {                
    d[tip]++;
    d.glasovi[korisnik] = tip;
  }
  PrikaziGalerija();
  Prikazi();
}

function DodadiKomentar() {
  if (korisnik == '') {
    alert('Please sign up first to comment.');
    return;
  }
  var t = document.getElementById('comment');
  if (t.value == '') return;
  var tekst = (korisnik + ': ' + t.value);
  destinacii[tekovna].comments.push(tekst);
  t.value = '';
  PrikaziGalerija();
}

function Najava() {
  var ime = document.getElementById('username').value;
  var lozinka = document.getElementById('password').value;
  if (ime == '' || lozinka == '') {
    alert('Enter name and password.');
    return;
  }
  korisnik = ime;
  document.getElementById('btn-signup').innerText = ime;
  Zatvori('loginCard');
}

function Isprati() {
  alert('Thank you for your review!');
  return false;
}

function Sokrij() {
  var ids = ['Home', 'Destinations', 'BlogTitle', 'BlogList', 'ReviewTitle', 'ReviewForm'];
  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).classList.add('d-none');
  }
  document.getElementById('btn-destinations').classList.remove('active');
  document.getElementById('btn-blog').classList.remove('active');
  document.getElementById('btn-review').classList.remove('active');
  document.getElementById('btn-signup').classList.remove('active');
}

function PrikaziHome() {
  Sokrij();
  document.getElementById('Home').classList.remove('d-none');
  document.getElementById('Destinations').classList.remove('d-none');
  document.getElementById('btn-destinations').classList.add('active');
}

function PrikaziBlog() {
  Sokrij();
  document.getElementById('BlogTitle').classList.remove('d-none');
  document.getElementById('BlogList').classList.remove('d-none');
  document.getElementById('btn-blog').classList.add('active');
}

function PrikaziReview() {
  Sokrij();
  document.getElementById('ReviewTitle').classList.remove('d-none');
  document.getElementById('ReviewForm').classList.remove('d-none');
  document.getElementById('btn-review').classList.add('active');
}

Prikazi();
